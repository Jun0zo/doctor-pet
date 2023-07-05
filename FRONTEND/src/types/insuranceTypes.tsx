export type InsuranceType = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

type _GetParamsType = {}

type _UpdateParamsType = {}

type _DeleteParamsType = {}

type _CreatParamsType = {
  name: string
}

export type InsuranceParamsType = {
  props: _GetParamsType | _UpdateParamsType | _DeleteParamsType | _CreatParamsType
}
