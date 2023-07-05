// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios, { AxiosError, AxiosResponse } from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  UserDataTypeWithoutSecures
} from './types'

// ** 우리의 커스텀 서버
import server from './server'
import { atom, useRecoilState } from 'recoil'
import API from 'src/configs/api'
import { toast } from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

export const userDataState = atom<UserDataTypeWithoutSecures | null>({
  key: 'userDataState',
  default: null
})

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [userData, setUserData] = useRecoilState(userDataState)

  // ** Hooks
  const router = useRouter()

  // 임시!
  const FAKE_USER_DATA = {
    id: 1,
    role: 'admin',
    fullName: '홍 길동',
    username: '길동길동홍길동',
    email: 'admin@materio.com'
    // password: 'admin'
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem('accessToken')!
      const refreshToken = localStorage.getItem('refreshToken')!

      const handleSuccess = (res: AxiosResponse) => {
        const { created_at, email, id, is_active, name, role_name, updated_at } = res.data
        const result = { id, role: 'admin', fullName: name, username: role_name, email, password: '0000' }

        setLoading(false)
        setUser({ ...result })
        setUserData({ ...result })
      }

      if (storedToken) {
        setLoading(true)
        await server
          .get(API.USERS.me, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            handleSuccess(response)
          })
          .catch(() => {
            if (refreshToken) {
              server
                .post(API.AUTH.refresh, { refresh_token: refreshToken })
                .then(res => {
                  const brandNewAccessToken: string = res.data.access_token!

                  localStorage.setItem('accessToken', brandNewAccessToken)
                  server
                    .get(API.USERS.me, {
                      headers: {
                        Authorization: `Bearer ${brandNewAccessToken}`
                      }
                    })
                    .then(async response => {
                      handleSuccess(response)
                    })
                })
                .catch(err => {
                  // refreshToken또한 만료된 경우
                  // toast.error('세션이 만료되었습니다. 다시 로그인 해주세요.')
                  localStorage.removeItem('userData')
                  localStorage.removeItem('refreshToken')
                  localStorage.removeItem('accessToken')
                  setUser(null)
                  setLoading(false)
                  if (!router.pathname.includes('login')) {
                    router.replace('/login')
                  }
                })
            } else {
              // toast.error('세션이 만료되었습니다. 다시 로그인 해주세요.')
              localStorage.removeItem('userData')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('accessToken')
              setUser(null)
              setLoading(false)
              if (!router.pathname.includes('login')) {
                router.replace('/login')
              }
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    server
      .post(API.AUTH.login, params)
      .then(async response => {
        window.localStorage.setItem('accessToken', response.data.access_token)
        if (params.rememberMe === true) window.localStorage.setItem('refreshToken', response.data.refresh_token)
        server
          .get(API.USERS.me, {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`
            }
          })
          .then(res => {
            const returnUrl = router.query.returnUrl
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            const { created_at, email, id, is_active, name, role_name, updated_at } = res.data
            const result = {
              id,
              role: 'admin',
              fullName: name,
              username: role_name,
              email,
              password: '0000'
            }

            setUser({ ...result })
            setUserData({ ...result })
            window.localStorage.setItem('userData', JSON.stringify(result))
            router.replace(redirectURL as string)
          })
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = (alertSessionExpired?: boolean) => {
    if (alertSessionExpired === undefined) alertSessionExpired = false

    if (alertSessionExpired) {
      toast.error('세션이 만료되었습니다. 다시 로그인 해주세요.')
    }
    setUser(null)
    setUserData(null)
    setLoading(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
