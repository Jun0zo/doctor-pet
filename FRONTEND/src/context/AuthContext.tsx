// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  UserDataTypeWithoutSecures,
} from "./types";

// ** 우리의 커스텀 서버
import server from "./server";
import { atom, useRecoilState } from "recoil";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

export const userDataState = atom<UserDataTypeWithoutSecures | null>({
  key: "userDataState",
  default: null,
});

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [userData, setUserData] = useRecoilState(userDataState);

  // ** Hooks
  const router = useRouter();

  // 임시!
  const FAKE_USER_DATA = {
    id: 1,
    role: "admin",
    fullName: "홍 길동",
    username: "길동길동홍길동",
    email: "admin@materio.com",
    // password: 'admin'
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;
      if (storedToken) {
        setLoading(true);
        await server
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then(async (response) => {
            setLoading(false);
            // setUser({ ...FAKE_USER_DATA })
            setUserData({ ...FAKE_USER_DATA });
          })
          .catch(() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            if (
              /*authConfig.onTokenExpiration === 'logout' &&*/ !router.pathname.includes(
                "login"
              )
            ) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    server
      .post(authConfig.loginEndpoint, params)
      .then(async (response) => {
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          response.data.access_token
        );

        const returnUrl = router.query.returnUrl;

        // setUser({ ...FAKE_USER_DATA })
        setUserData({ ...FAKE_USER_DATA });
        window.localStorage.setItem("userData", JSON.stringify(FAKE_USER_DATA));

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        console.log(returnUrl, redirectURL);
        router.replace(redirectURL as string);
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
