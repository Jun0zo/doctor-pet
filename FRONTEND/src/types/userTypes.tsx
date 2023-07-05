export type UserType = {
  id: number
  email: string
  name: string
  role_name: string
  created_at: string
  updated_at: string
  is_active: boolean
  is_deleted: boolean
}

export type InvoiceType = {
  id?: number
  include_vat: boolean
  sales_amount: number
  commission_rate: number
  maintenance_cost: number
  plate_fee: number
  affiliated_fee: number
  total_job_amount: number
  canceled_job_amount: number
  total_cancel_fee: number
  calculate_amount: number
  sub_total_amount: number
  total_amount: number
  user_id: number
  user_name: string
  user_email: string
  is_calculated: boolean
  date?: string
  start_date: string
  end_date: string
  estimated_fee?: number
  extra_benefits?: number
  insurance_sales_amount: number
}

export type InvoiceDetailType = {
  is_calculated: boolean
  insurance_companies: { [key: string]: string }[]
  total_length: number
  contents: {
    date: string
    insurance_commission_fees: { [key: string]: string }
    affiliated_fees: number
    canceled_fees: number
    day_total: number
  }[]
}

export type InvoiceDetailTitleType = {
  date: string
  affiliated_fees: number
  canceled_fees: number
  day_total: number

  [key: string]: string | number | undefined
}

export type InvoiceDetailBodyType = {
  [key: string]: string | number | undefined
}

export type InvoiceTypeSingle = {
  id?: number
  include_vat: boolean
  sales_amount: number
  commission_rate: number
  maintenance_cost: number
  plate_fee: number
  total_job_amount: number
  canceled_job_amount: number
  total_cancel_fee: number
  benefit_list: { name: string; price: number }[]
  calculate_amount: number
  sub_total_amount: number
  total_amount: number
  date?: string
  start_date: string
  end_date: string
}

export type InvoicePostType = {
  user_id: number
  include_vat: boolean
  commission_rate: number
  plate_fee: number
  benefit_list: { name: string; price: number }[]
  date: string
}
export type AttendanceType = {
  user_id: number
  user_name: string
  user_email: string
  working_days: number
  working_hours: number
  last_date?: string
}

export type MeType = {
  id: number
  email: string
  name: string
  role_name: string
  created_at: string
  updated_at: string
  is_active: boolean
  is_deleted: boolean
}

export type UserRoles = 'admin' | 'company_admin' | 'company_staff' | 'company_user' | 'deleted_user'

export type UserRoleObjProps = { [key in UserRoles]: { icon: string; color: string } }

export type GridRenderCellUser = { row: UserType }

export type GridRenderCellAttendance = { row: AttendanceType }

export type GridRenderCellInvoice = { row: InvoiceType }

export type FetchQuery = {
  name?: string | null
  email?: string | null
}

export type ConfigType = {
  id: number
  company_id: number
  company_name: string
  is_auto_accept_attendance: boolean
  default_commission_rate: number
  default_plate_fee: number
}

export type CompanyConfigType = {
  id: number
  company_id: number
  company_name: string
  is_auto_accept_attendance: boolean
  default_commission_rate: number
  default_plate_fee: number
}
