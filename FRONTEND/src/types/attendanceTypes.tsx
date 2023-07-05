type DateType = Date | null | undefined

export type AttendanceType = {
  id: number
  user_id: number
  user_name: string
  user_email: string
  start_date: string
  end_date: string
  memo: string
  status: string
}

export type AttendanceProps = {
  user: [string, React.Dispatch<React.SetStateAction<string>>]
  startDate: [DateType, React.Dispatch<React.SetStateAction<DateType>>]
  endDate: [DateType, React.Dispatch<React.SetStateAction<DateType>>]
  memo: [string, React.Dispatch<React.SetStateAction<string>>]
}

export type AttendanceRowType = {
  id: number
  user_name: string
  user_email: string
  start_date: string
  end_date: string
  memo: string
  is_accepted: boolean
}

export type AttendanceFilterType = {
  status: Array<string>
  start_date: string
  end_date: string
  limit?: number
  offset?: number
  user_id?: string | number
}
