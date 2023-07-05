export type DateType = Date | null | undefined

export interface JobProps {
  date: [DateType, React.Dispatch<React.SetStateAction<DateType>>]
  insurance: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
  affiliated_name: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
  carNumber: [string, React.Dispatch<React.SetStateAction<string>>]
  carName: [string, React.Dispatch<React.SetStateAction<string>>]
  user: [string, React.Dispatch<React.SetStateAction<string>>]
  price: [string, React.Dispatch<React.SetStateAction<string>>]
  isCanceled: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  cancelFee: [string, React.Dispatch<React.SetStateAction<string>>]
  memo: [string, React.Dispatch<React.SetStateAction<string>>]
}

export type JobRowType = {
  id: number
  user: string
  insurance: string
  date: string
  car_number: string
  car_name: string
  price: number
  memo: string
  is_canceled: true
  cancel_fee: number
}

export type JobType = {
  id: number
  user_id: number
  insurance_id: number | null
  affiliated_name: string | null
  date: string
  car_number: string
  car_name: string
  price: number
  memo: string
  is_canceled: true
  cancel_fee: number
  created_at: string
  updated_at: string
}

export type JobRequestType = {
  user_id: string
  insurance_id?: string | null
  affiliated_name?: string | null
  car_number: string
  car_name: string
  price: string
  memo: string
  is_canceled: boolean
  canceled_fee?: string
  date: string
}

export type JobFilterType = {
  canceled_type: string
  user_id?: number | string
  insurance_id?: number | string | null
  affiliated_name?: string | null
  start_date: string
  end_date: string
  order_method: string
  order_by: string
  limit: number | string
  offset: number | string
  is_insurance: boolean
}

type _GetParamsType = {}

type _UpdateParamsType = {}

type _DeleteParamsType = {}

type _CreatParamsType = {}

export type JobParamsType = {
  props: _GetParamsType | _UpdateParamsType | _DeleteParamsType | _CreatParamsType
}

export type AffiliatedType = string
