// export default {
//   admin: '시스템 관리자',
//   company_admin: '최고 관리자',
//   comapny_staff: '중간 관리자',
//   company_user: '사용자'
// }

const convertedRole = (str: 'admin' | 'company_admin' | 'company_staff' | 'company_user' | 'deleted_user') => {
  switch (str) {
    case 'admin':
      return '시스템 관리자'
    case 'company_admin':
      return '최고 관리자'
    case 'company_staff':
      return '중간 관리자'
    case 'company_user':
      return '사용자'
    case 'deleted_user':
      return '탈퇴한 사용자'
    default:
      return ''
  }
}

export default convertedRole
