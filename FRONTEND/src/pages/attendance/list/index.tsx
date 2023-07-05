// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// Recoil Imports
import { useRecoilValue, useRecoilState } from 'recoil'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridRowId, GridColDef, GridCellParams } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { toast } from 'react-hot-toast'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/attendance/list/TableHeader'
import AttendanceDialog from 'src/views/apps/attendance/AttendanceDialog'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { AttendanceType, AttendanceRowType, AttendanceFilterType } from 'src/types/attendanceTypes'
import { UserType, MeType } from 'src/types/userTypes'

// ** Selctors

// ** Hooks

import { userDataState } from 'src/context/AuthContext'

type DateType = Date | null | undefined

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: AttendanceType
}

interface TransactionRow {
  id: number
  date: string
  car_id: string
  car_number: string
  user: string
  price: number
  createdAt: string
  updatedAt: string
  memo: string
  isCancled: boolean
}

interface QueryType {
  dates: Date[]
  status: Array<string>
  user: string
  limit: number
  offset: number
}
interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

interface StatusType {
  is_pending: boolean
  is_accepted: boolean
  is_rejected: boolean
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'yyyy-MM-dd') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'yyyy-MM-dd')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
  return (
    <TextField
      inputRef={ref}
      fullWidth
      {...props}
      label={props.label || ''}
      sx={{ width: '100%' }}
      error={props.error}
    />
  )
})

const AttendanceList = () => {
  let today = new Date()
  let last_month = new Date(today)
  last_month.setMonth(today.getMonth() - 1)

  // ** State
  // pagination states
  const [rows, setRows] = useState<AttendanceType[]>([])
  const [page, setPage] = useState<number>(0)
  const [dates, setDates] = useState<Date[]>([last_month, today])
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)

  const [rejectDialogOpen, setRejectDialogOpen] = useState<boolean>(false)
  const [rejectAttendanceId, setRejectAttendanceId] = useState<number>(-1)

  const [acceptDialogOpen, setAcceptDialogOpen] = useState<boolean>(false)
  const [acceptAttendanceId, setAcceptAttendanceId] = useState<number>(-1)

  // filter states
  const [statusValue, setStatusValue] = useState<StatusType>({ is_accepted: true, is_pending: true, is_rejected: true })
  const [userFilterValue, setUserFilterValue] = useState<string>('all')
  const [endDateRange, setEndDateRange] = useState<DateType>(today)
  const [startDateRange, setStartDateRange] = useState<DateType>(last_month)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const userList: UserType[] = useRecoilValue(userAtom)

  const { getAllJob } = useJob()
  const { createInsurance } = useInsurance()
  const { getAttendance, getAttendances, updateAttendance, deleteAttendance } = useAttendance()

  const me: MeType = useRecoilValue(meAtom)

  const check = (params: any) => {
    params.user_id = Number(params.user_id)

    if (!params.memo) {
      delete params['memo']
    }
    return params
  }

  const handleRejectDialogClose = () => {
    setRejectDialogOpen(v => !v)
  }

  const handleAcceptDialogClose = () => {
    setAcceptDialogOpen(v => !v)
  }

  const handleRejectAttendanceDialog = async (id: number) => {
    setRejectDialogOpen(v => !v)
    setRejectAttendanceId(id)
  }

  const handleAcceptAttendanceDialog = async (id: number) => {
    setAcceptDialogOpen(v => !v)
    setAcceptAttendanceId(id)
  }

  const GetColumns = () => {
    const [userData, setUserData] = useRecoilState(userDataState)

    const getActionButtons = (row: AttendanceType) => {
      if (!userData === null || userData?.role !== 'admin') {
        return null
      }
      if (row.status === 'pending') {
        return (
          <>
            <Tooltip title='해당 일정 승인'>
              <IconButton size='small' onClick={() => handleAcceptAttendanceDialog(row.id)}>
                <Icon icon='mdi:check-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='해당 일정 수정'>
              <IconButton size='small' component={Link} href={`/attendance/edit/${row.id}`}>
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='해당 일정 거절'>
              <IconButton size='small' onClick={() => handleRejectAttendanceDialog(row.id)}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            </Tooltip>
          </>
        )
      } else {
        return null
      }
    }

    const defaultColumns: GridColDef[] = [
      {
        flex: 0.1,
        field: 'name',
        minWidth: 150,
        headerName: '이름',
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }: CellType) => {
          return <Typography variant='body2'>{row.user_name}</Typography>
        }
      },
      {
        flex: 0.1,
        field: 'startDate',
        minWidth: 90,
        headerName: '시작날짜',
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }: CellType) => {
          const [date, time] = row.start_date.split('T')
          return <Typography variant='body2'>{`${date} ${time}`}</Typography>
        }
      },

      {
        flex: 0.1,
        minWidth: 90,
        field: 'endDate',
        headerName: '종료날짜',
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }: CellType) => {
          const [date, time] = row.end_date.split('T')
          return <Typography variant='body2'>{`${date} ${time}`}</Typography>
        }
      },
      {
        flex: 0.15,
        minWidth: 200,
        field: 'memo',
        headerName: '메모',
        sortable: false,
        renderCell: ({ row }: CellType) => {
          // let user: UserType = userList.filter(user => user.id === row.user_id)[0]
          // let user_name = user.name
          return <Typography variant='body2'>{row.memo}</Typography>
        }
      },
      {
        flex: 0.15,
        minWidth: 200,
        field: 'status',
        headerName: '상태',
        sortable: false,
        renderCell: ({ row }: CellType) => {
          // let user: UserType = userList.filter(user => user.id === row.user_id)[0]
          // let user_name = user.name
          return row.status === 'accepted' ? (
            <Chip label='수락됨' color='success' size='small' />
          ) : row.status === 'pending' ? (
            <Chip label='승인대기' color='warning' size='small' />
          ) : (
            <Chip label='거절됨' color='error' size='small' />
          )
        }
      }
    ]

    const columns: GridColDef[] = [
      ...defaultColumns,
      {
        flex: 0.1,
        minWidth: 130,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        disableColumnMenu: true,
        renderCell: ({ row }: CellType) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {getActionButtons(row)}
          </Box>
        )
      }
    ]

    return columns
  }

  const fetchData = async (query: QueryType) => {
    let { dates, status, user, limit, offset } = query

    if (dates[0] == null || dates[1] == null) return
    let [start_date, end_date] = [format(dates[0], 'yyyy-MM-dd HH:mm'), format(dates[1], 'yyyy-MM-dd HH:mm')]

    let filters: AttendanceFilterType = {
      status,
      start_date,
      end_date,
      //   order_method: 'desc',
      //   order_by: 'created_at',
      limit,
      offset
    }

    if (user && user !== 'all') filters['user_id'] = Number(user)

    let { total_length, content } = await getAttendances(filters)
    setRows(content)
    setRowCount(total_length)
  }

  const handleRejectAttendance = async () => {
    let attendanceObj = await getAttendance(rejectAttendanceId)
    attendanceObj.status = 'rejected'
    attendanceObj = check(attendanceObj)

    await toast.promise(updateAttendance(rejectAttendanceId, attendanceObj), {
      loading: '변경 중...',
      success: '변경되었습니다.',
      error: err => {
        return err.message ? err.message : '알 수 없는 오류가 발생하였습니다.'
      }
    })
  }

  const handleAcceptAttendance = async () => {
    let attendanceObj = await getAttendance(rejectAttendanceId)
    attendanceObj.status = 'accepted'
    attendanceObj = check(attendanceObj)

    await toast.promise(updateAttendance(rejectAttendanceId, attendanceObj), {
      loading: '변경 중...',
      success: '변경되었습니다.',
      error: err => {
        return err.message ? err.message : '알 수 없는 오류가 발생하였습니다.'
      }
    })
  }

  useEffect(() => {
    const status = Object.entries(statusValue)
      .filter(kv => {
        return kv[1] === true
      })
      .map(kv => kv[0].replace('is_', ''))
    fetchData({
      dates,
      status,
      user: userFilterValue,
      limit: pageSize,
      offset: page
    })
  }, [dates, statusValue, userFilterValue, page, pageSize])

  const handleStatusValue = (e: SelectChangeEvent) => {
    const statusName: string = e.target.value
    setStatusValue(prevState => {
      return {
        ...prevState,
        [statusName]: !prevState[statusName as 'is_pending' | 'is_rejected' | 'is_accepted']
      }
    })
  }

  const handleUserFilterValue = (e: SelectChangeEvent) => {
    setUserFilterValue(e.target.value)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  return (
    <>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='근태 관리' />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={3}>
                    {/* <FormLabel component='legend'>Label placement</FormLabel> */}
                    <FormGroup aria-label='position' row>
                      <FormControlLabel
                        value='is_pending'
                        control={<Checkbox checked={statusValue.is_pending} onChange={handleStatusValue} />}
                        label='대기중'
                        labelPlacement='top'
                        checked
                      />
                      <FormControlLabel
                        value='is_accepted'
                        control={<Checkbox checked={statusValue.is_accepted} onChange={handleStatusValue} />}
                        label='승인됨'
                        labelPlacement='top'
                        checked
                      />
                      <FormControlLabel
                        value='is_rejected'
                        control={<Checkbox checked={statusValue.is_rejected} onChange={handleStatusValue} />}
                        label='거절됨'
                        labelPlacement='top'
                        checked
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    {me && me.role_name !== 'company_user' ? (
                      <FormControl fullWidth>
                        <InputLabel id='name'>담당자명</InputLabel>

                        <Select
                          fullWidth
                          value={userFilterValue}
                          sx={{ mr: 4, mb: 2 }}
                          label='name'
                          onChange={handleUserFilterValue}
                          labelId='name-select'
                        >
                          <MenuItem key={0} value={'all'}>
                            {'전체'}
                          </MenuItem>
                          {userList && userList?.length > 0
                            ? userList?.map((user: UserType, index: number) => (
                                <MenuItem key={index} value={String(user.id)}>
                                  {user.name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <DatePicker
                      selectsStart
                      id='event-start-date'
                      endDate={endDateRange}
                      selected={startDateRange}
                      startDate={startDateRange}
                      showTimeSelect={true}
                      dateFormat={'yyyy-MM-dd hh:mm'}
                      customInput={<PickersComponent label='Start Date' registername='startDate' />}
                      onChange={(date: Date) => {
                        handleOnChangeRange([new Date(date), endDateRange])
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <DatePicker
                      selectsStart
                      id='event-end-date'
                      endDate={endDateRange}
                      selected={endDateRange}
                      startDate={startDateRange}
                      showTimeSelect={true}
                      dateFormat={'yyyy-MM-dd hh:mm'}
                      customInput={<PickersComponent label='End Date' registername='endDate' />}
                      onChange={(date: Date) => {
                        handleOnChangeRange([startDateRange, new Date(date)])
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <TableHeader selectedRows={selectedRows} />
              <DataGrid
                autoHeight
                pagination
                rows={rows}
                columns={GetColumns()}
                disableSelectionOnClick
                disableColumnFilter
                paginationMode='server'
                rowCount={rowCount}
                pageSize={Number(pageSize)}
                rowsPerPageOptions={[10, 25, 50]}
                onSelectionModelChange={rows => setSelectedRows(rows)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                onPageChange={page => setPage(page)}
                sx={{
                  '& .MuiTablePagination-selectLabel': { display: 'none !important' },
                  '& .super-app': {
                    justifyContent: 'flex-end'
                  }
                  // '& .MuiTablePagination-selectLabel:after': { content: 'good' }
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </DatePickerWrapper>

      <AttendanceDialog
        open={rejectDialogOpen}
        title={'경고'}
        desc={'정말 거절하시겠습니까?'}
        handleClose={handleRejectDialogClose}
        handleConfirm={handleRejectAttendance}
      />

      <AttendanceDialog
        open={acceptDialogOpen}
        title={'경고'}
        desc={'정말 승인하시겠습니까?'}
        handleClose={handleAcceptDialogClose}
        handleConfirm={handleAcceptAttendance}
      />
    </>
  )
}

export default AttendanceList
