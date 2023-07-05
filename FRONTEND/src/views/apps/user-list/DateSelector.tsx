import { FormControl, InputLabel, MenuItem, Select, SxProps, Theme } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

export interface DateSelectorFilter {
  year: number
  month: number
}

interface DateSelectorProps {
  filter: DateSelectorFilter
  setFilter: Dispatch<SetStateAction<DateSelectorFilter>>
  sx?: SxProps<Theme>
}

export const buildDateString = (filter: DateSelectorFilter) => {
  const { year, month } = filter
  return `${year}-${month.toString().padStart(2, '0')}-01 00:00:00`
}

export const onEffectDateSelector = (
  filter: DateSelectorFilter,
  setFilter: Dispatch<SetStateAction<DateSelectorFilter>>,
  onRefreshable: () => void
) => {
  const date = new Date()
  let isRefreshable = true

  if (filter.year >= date.getFullYear()) {
    if (filter.month > date.getMonth() + 1) {
      isRefreshable = false
      setFilter(state => ({ ...state, month: date.getMonth() + 1 }))
    }
  }

  if (isRefreshable) {
    onRefreshable()
  }
}

const DateSelector = (props: DateSelectorProps) => {
  const { filter, setFilter, sx } = props
  return (
    <>
      <FormControl sx={{ maxWidth: 100, mr: 2 }}>
        <InputLabel id='invoice-filter-year' sx={{ pl: 5 }}>
          년
        </InputLabel>
        <Select
          fullWidth
          value={filter.year}
          id='invoice-filter-year'
          label='년'
          labelId='invoice-filter-year'
          onChange={e =>
            setFilter(state => ({
              ...state,
              year: e.target.value as number
            }))
          }
          size='small'
          sx={{ mb: 2, ml: 4 }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300
              }
            }
          }}
        >
          {(function () {
            const date = new Date()
            return Array.from(Array(date.getFullYear() - 1999).keys()).map((i, index) => {
              const value: number = i + 2000
              return (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              )
            })
          })()}
        </Select>
      </FormControl>

      <FormControl sx={{ maxWidth: 60, mr: 4 }}>
        <InputLabel id='invoice-filter-year' sx={{ pl: 5 }}>
          월
        </InputLabel>
        <Select
          fullWidth
          value={filter.month}
          id='invoice-filter-month'
          label='월'
          labelId='invoice-filter-month'
          onChange={e =>
            setFilter(state => ({
              ...state,
              month: e.target.value as number
            }))
          }
          size='small'
          sx={{ mb: 2, ml: 4 }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300
              }
            }
          }}
        >
          {(function () {
            const date = new Date()
            const now = date.getFullYear() * 12 + date.getMonth()

            return Array.from(Array(12).keys()).map(i => {
              const value = i + 1
              const disabled = now < i + filter.year * 12
              return (
                <MenuItem key={i} value={value} disabled={disabled}>
                  {value}
                </MenuItem>
              )
            })
          })()}
        </Select>
      </FormControl>
    </>
  )
}

export default DateSelector
