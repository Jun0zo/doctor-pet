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
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import React, { MouseEvent, ReactNode, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userDataState } from 'src/context/AuthContext'
import convertedRole from 'src/configs/roles'
import { UserRoleObjProps, UserRoles, UserType } from 'src/types/userTypes'

interface RoleOptionsProps {
  id: number | string
  row: UserType
  userRoleObj: UserRoleObjProps
  disabled: boolean
  currentRole: UserRoles
  button?: ReactNode
  handleAppoint: (id: number, appointTo: UserRoles) => void
}

const RoleOptions = ({ id, row, userRoleObj, disabled, currentRole, button, handleAppoint }: RoleOptionsProps) => {
  // ** State
  const [userData, setUserData] = useRecoilState(userDataState)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    disabled || setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        fullWidth
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& svg': { mr: 3, color: userRoleObj[row.role_name as keyof UserRoleObjProps].color }
        }}
        style={{ justifyContent: 'space-between' }}
        onClick={handleRowOptionsClick}
        disabled={disabled}
      >
        <Icon icon={userRoleObj[row.role_name as keyof UserRoleObjProps].icon} fontSize={20} />
        <Typography noWrap sx={{ color: disabled ? 'text.secondary' : 'text.primary', textTransform: 'capitalize' }}>
          {convertedRole(row.role_name as UserRoles)}
        </Typography>
        <Icon icon='material-symbols:arrow-drop-down' fontSize='large' />
      </Button>
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
        {userData?.username === 'company_admin' && (
          <MenuItem
            onClick={() => {
              handleAppoint(Number(id), 'company_admin')
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='material-symbols:admin-panel-settings-outline' fontSize={20} />
            <strong>{convertedRole('company_admin')}</strong>양도하기
          </MenuItem>
        )}
        {currentRole !== 'company_staff' && (
          <MenuItem
            onClick={() => {
              handleAppoint(Number(id), 'company_staff')
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='mdi:account-outline' fontSize={20} />
            <strong>{convertedRole('company_staff')}</strong>(으)로 임명
          </MenuItem>
        )}
        {currentRole !== 'company_user' && (
          <MenuItem
            onClick={() => {
              handleAppoint(Number(id), 'company_user')
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='mdi:account-outline' fontSize={20} />
            <strong>{convertedRole('company_user')}</strong>(으)로 임명
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default RoleOptions
