// ** Type import
import { useRecoilState } from 'recoil'
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { userDataState } from 'src/context/AuthContext'
import { UserRoles } from 'src/types/userTypes'

const navigation = (): HorizontalNavItemsType => {
  // const [userData, setUserData] = useRecoilState(userDataState)
  // const role = userData?.username as UserRoles
  const role = JSON.parse(window.localStorage.getItem('userData')!).username as UserRoles

  if (role === 'admin') {
    return [
      {
        path: '/home',
        action: 'read',
        subject: 'acl-page',
        title: '홈',
        icon: 'mdi:home-outline'
      },
      {
        title: '사용자 목록',
        path: '/user-list',
        icon: 'mdi:user-outline'
      },
      {
        title: '업무 목록',
        path: '/jobs/list',
        icon: 'mdi:file-document-outline'
      },
      {
        title: '근태 관리',
        path: '/attendance/list',
        icon: 'mdi:access-time'
      },
      {
        path: '/inquiries',
        title: '대기열',
        icon: 'material-symbols:list-alt-outline'
      }
    ]
  } else if (role === 'company_admin' || role === 'company_staff') {
    return [
      {
        path: '/home',
        action: 'read',
        subject: 'acl-page',
        title: '홈',
        icon: 'mdi:home-outline'
      },
      {
        title: '사용자 목록',
        path: '/user-list',
        icon: 'mdi:user-outline'
      },
      {
        title: '업무 목록',
        path: '/jobs/list',
        icon: 'mdi:file-document-outline'
      },
      {
        title: '근태 관리',
        path: '/attendance/list',
        icon: 'mdi:access-time'
      }
    ]
  }

  return [
    {
      path: '/home',
      action: 'read',
      subject: 'acl-page',
      title: '홈',
      icon: 'mdi:home-outline'
    }
  ]
}

export default navigation
