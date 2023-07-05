const API = {
  users: '/api/users',
  usersDelete: (targetUserId: string | number) => `/api/users/${targetUserId}`,
  USERS: {
    TOKEN: {
      token: (token: string) => `/api/users/token/${token}`
    },
    company: '/api/users/company',
    invite: '/api/users/invite',
    me: '/api/users/me',
    userId: (userId: string | number) => `/api/users/${userId}`,
    roles: (targetUserId: string | number) => `/api/users/roles/${targetUserId}`,
    ROLES: {
      transfer: (targetUserId: string | number) => `/api/users/roles/transfer/${targetUserId}`
    },
    active: (targetUserId: string | number) => `/api/users/active/${targetUserId}`
  },
  job: '/api/jobs',
  JOB: {
    TOKEN: {
      token: (token: string) => `/api/users/token/${token}`
    },
    list: '/api/jobs/list',
    jobId: (jobId: string | number) => `/api/jobs/${jobId}`,
    affiliated: '/api/jobs/affiliated'
  },
  insurances: '/api/insurances',
  INSURANCES: {
    TOKEN: {
      token: (token: string) => `/api/insurances/token/${token}`
    },
    insuranceId: (insuranceId: string | number) => `/api/insurances/${insuranceId}`
  },

  AUTH: {
    login: '/api/auth/login',
    refresh: '/api/auth/refresh'
  },
  ROLE: {
    ROLES: {
      role: '/api/roles/role',
      priority: '/api/roles/role/priority',
      roleId: (roleId: string) => `/api/roles/role/${roleId}`,
      resource: '/api/roles/role/resource',
      RESOURCE: {
        resourceId: (resourceId: string) => `/api/roles/role/resource/${resourceId}`
      }
    }
  },
  inquiries: '/api/inquiries',
  INQUIRIES: {
    inquiryId: (inquiryId: string) => `/api/inquiries/${inquiryId}`,
    issue: (inquiryId: string | number) => `/api/inquiries/${inquiryId}/issue`
  },
  attendances: '/api/attendances',
  ATTENDANCES: {
    TOKEN: {
      token: (token: string) => `/api/attendances/token/${token}`
    },
    me: '/api/attendances/me',
    statistics: `/api/attendances/statistics/all`,
    attendanceId: (attendanceId: string | number) => `/api/attendances/${attendanceId}`
  },
  invoices: `/api/invoices`,
  INVOICES: {
    recently: `/api/invoices/expected`,
    detail: `/api/invoices/detail`,
    profitLoss: `/api/invoices/profit-loss`,
    PROFITLOSS: {
      expected: `/api/invoices/profit-loss/expected`
    },
    EXCEL: {
      overall: `/api/invoices/excel/overall`,
      detail: `/api/invoices/excel/detail`,
      profitLoss: `/api/invoices/excel/profit-loss`
    }
  },
  config: `/api/config`
}

export default API

// API REFERENCES OF BARA-LS
