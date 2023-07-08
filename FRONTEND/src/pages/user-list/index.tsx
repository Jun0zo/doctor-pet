import _ from 'lodash'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { CSSProperties, MouseEvent, useEffect, useState } from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import AddUserDrawer from 'src/views/apps/user-list/AddUserDrawer'
import UserListDialog from 'src/views/apps/user-list/UserListDialog'
import server from 'src/context/server'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface UsersRow {
  [key: string]: string | number | boolean
}

const UserList = () => {
  const [rows, setRows] = useState<UsersRow[]>([
    { id: 1, name: '홍길동', email: 'temp@temp.com', role: '회사 관리자', status: true }
  ])
  const [filteredRows, setFilteredRows] = useState<UsersRow[]>(_.cloneDeep(rows))
  const [role, setRole] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [stringFilter, setStringFilter] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [showDialogUserDelete, setShowDialogUserDelete] = useState<boolean>(false)
  const [targetUser, setTargetUser] = useState<number>(-1)

  const RowOptions = ({ id }: { id: number | string }) => {
    // ** Hooks
    // const dispatch = useDispatch<AppDispatch>()

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = (id: number) => {
      // dispatch(deleteUser(id))
      setTargetUser(id)
      setShowDialogUserDelete(true)
      handleRowOptionsClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          {/* <MenuItem
                        component={Link}
                        sx={{ '& svg': { mr: 2 } }}
                        onClick={handleRowOptionsClose}
                        href='/apps/user/view/overview/'
                    >
                        <Icon icon='mdi:eye-outline' fontSize={20} />
                        보기
                    </MenuItem> */}
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            수정
          </MenuItem>
          <MenuItem onClick={() => handleDelete(Number(id))} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
            삭제
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: '사용자명',
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Typography noWrap variant='body2'>
            {row.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: '이메일',
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 150,
      headerName: '역할군',
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 3, color: userRoleObj.admin.color }
            }}
          >
            <Icon icon={userRoleObj.admin.icon} fontSize={20} />
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.role}
            </Typography>
          </Box>
        )
      }
    },
    // {
    //     flex: 0.15,
    //     field: 'currentPlan',
    //     minWidth: 120,
    //     headerName: 'Plan',
    //     renderCell: ({ row }: GridRenderCellParams) => {
    //         return (
    //             <Typography noWrap sx={{ textTransform: 'capitalize' }}>
    //                 {row.currentPlan}
    //             </Typography>
    //         )
    //     }
    // },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: '활동상태',
      renderCell: ({ row }: GridRenderCellParams) => {
        const moreStyles: CSSProperties = {
          backgroundColor: '#333',
          padding: '2px 10px',
          borderRadius: '100px',
          color: '#f4f4f4'
        }

        return (
          <Typography noWrap variant='body2' style={{ ...moreStyles }}>
            {row.status ? '활성' : '대기'}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: '편집',
      renderCell: ({ row }: GridRenderCellParams) => <RowOptions id={row.id} />
    }
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      stringFilter.length > 0
        ? setFilteredRows(_.cloneDeep(rows.filter(i => i.name.indexOf(stringFilter) > -1)))
        : setFilteredRows(_.cloneDeep(rows))
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [stringFilter])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='검색 필터' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='role-select'>역할군</InputLabel>
                    <Select
                      fullWidth
                      value={role}
                      id='select-role'
                      label='Select Role'
                      labelId='role-select'
                      onChange={e => setRole(e.target.value)}
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value=''>모두</MenuItem>
                      <MenuItem value='company_admin'>사업자</MenuItem>
                      <MenuItem value='company_user'>기업인</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                p: 5,
                pb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                sx={{ mr: 4, mb: 2 }}
                color='secondary'
                variant='outlined'
                startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
              >
                CSV 내보내기
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size='small'
                  value={stringFilter}
                  sx={{ mr: 4, mb: 2 }}
                  placeholder='사용자 검색'
                  onChange={e => setStringFilter(e.target.value)}
                />

                <Button sx={{ mb: 2 }} onClick={() => setAddUserOpen(!addUserOpen)} variant='contained'>
                  사원 초대
                </Button>
              </Box>
            </Box>

            <DataGrid
              autoHeight
              rows={filteredRows}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>

        <AddUserDrawer open={addUserOpen} onClose={() => setAddUserOpen(false)} />
      </Grid>

      <UserListDialog
        open={showDialogUserDelete}
        title='사용자 삭제'
        desc='확인을 누르면 해당 사용자를 목록에서 삭제합니다.'
        handleClose={() => setShowDialogUserDelete(false)}
        handleConfirm={() => {
          server.delete('/사용자삭제', { data: { id: targetUser } })
        }}
      />
    </>
  )
}

export default UserList
