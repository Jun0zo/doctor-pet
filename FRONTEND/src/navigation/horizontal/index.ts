// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
    {
        title: '홈',
        path: '/home',
        icon: 'mdi:home-outline'
    },
    // {
    //     title: '두번째 페이지',
    //     path: '/second-page',
    //     icon: 'mdi:email-outline'
    // },
    {
        path: '/inquiries',
        action: 'read',
        subject: 'acl-page',
        title: '대기열',
        icon: 'mdi:shield-outline'
    }
]

export default navigation
