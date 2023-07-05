import { UserRoles } from '../../types/userTypes'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useRecoilState } from 'recoil'
import { userDataState } from 'src/context/AuthContext'

const navigation = (): VerticalNavItemsType => {
  // const [userData, setUserData] = useRecoilState(userDataState)
  // const role = userData?.username as UserRoles
  const role = JSON.parse(window.localStorage.getItem('userData')!).username as UserRoles

  if (role === 'admin') {
    return [
      {
        title: '직원 목록',
        path: '/user-list',
        icon: 'mdi:user-outline'
      },
      {
        title: '수수료 관리',
        icon: 'material-symbols:attach-money',
        children: [
          {
            title: '견인',
            path: '/invoice/list/tractions'
          }
          // },
          // {
          //   title: '고장'
          // },
          // {
          //   title: '사고'
          // }
        ]
      },
      {
        title: '업무 목록',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: '견인',
            path: '/jobs/list'
          }
          // },
          // {
          //   title: '고장'
          // },
          // {
          //   title: '사고'
          // }
        ]
      }
      // {
      //   title: '근태 관리',
      //   icon: 'mdi:access-time',
      //   children: [
      //     {
      //       title: '견인',
      //       path: '/attendance/list'
      //     },
      //     {
      //       title: '고장'
      //     },
      //     {
      //       title: '사고'
      //     }
      //   ]
      // }
    ]
  } else if (role === 'company_admin' || role === 'company_staff') {
    return [
      {
        title: '직원 목록',
        path: '/user-list',
        icon: 'mdi:user-outline'
      },
      {
        title: '수수료 관리',
        icon: 'material-symbols:attach-money',
        children: [
          {
            title: '견인',
            path: '/invoice/list/tractions'
          }
          // },
          // {
          //   title: '고장'
          // },
          // {
          //   title: '사고'
          // }
        ]
      },
      {
        title: '업무 목록',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: '견인',
            path: '/jobs/list'
          }
          // },
          // {
          //   title: '고장'
          // },
          // {
          //   title: '사고'
          // }
        ]
      }
      // {
      //   title: '근태 관리',
      //   icon: 'mdi:access-time',
      //   children: [
      //     {
      //       title: '견인',
      //       path: '/attendance/list'
      //     },
      //     {
      //       title: '고장'
      //     },
      //     {
      //       title: '사고'
      //     }
      //   ]
      // }
    ]
  }

  return [
    {
      title: '수수료 관리',
      icon: 'material-symbols:attach-money',
      children: [
        {
          title: '견인',
          path: '/invoice/list/tractions'
        }
        // },
        // {
        //   title: '고장'
        // },
        // {
        //   title: '사고'
        // }
      ]
    },
    {
      title: '업무 목록',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: '견인',
          path: '/jobs/list'
        }
        // },
        // {
        //   title: '고장'
        // },
        // {
        //   title: '사고'
        // }
      ]
    }
    // {
    //   title: '근태 관리',
    //   icon: 'mdi:access-time',
    //   children: [
    //     {
    //       title: '견인',
    //       path: '/attendance/list'
    //     },
    //     {
    //       title: '고장'
    //     },
    //     {
    //       title: '사고'
    //     }
    //   ]
    // }
  ]
}

export default navigation
