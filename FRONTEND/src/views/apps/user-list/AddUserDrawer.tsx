import * as yup from 'yup'
import * as React from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FormControl, FormHelperText, IconButton, styled, TextField, Typography } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import server from 'src/context/server'
import toast from 'react-hot-toast'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface Props {
  open: boolean
  onClose: () => void
}

interface UserData {
  [key: string]: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const AddUserDrawer = ({ open, onClose }: Props) => {
  const defaultValues = {
    email: ''
  }

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onInviteSubmit = (data: UserData) => {
    const fetchData = async () => {
      const res = await server.post('/초대장보내는주소', {
        data: {
          email: data.email
        }
      })

      if (res.data) {
        onclose()
      }
    }

    toast.promise(fetchData(), {
      loading: '전송 중...',
      success: '해당 메일로 초대장을 보냈습니다.',
      error: '알 수 없는 오류가 발생했습니다.'
    })
  }

  React.useEffect(() => {
    if (open) reset()
  }, [open])

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box
        sx={{ width: { xs: 300, sm: 400 } }}
        role='form'
        // onClick={onClose}
      >
        <Header>
          <Typography variant='h6'>Add User</Typography>
          <IconButton size='small' onClick={onClose} sx={{ color: 'text.primary' }}>
            <IconifyIcon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit(onInviteSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='E-mail'
                    onChange={onChange}
                    placeholder='example@gmail.com'
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                초대하기
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={onClose}>
                취소
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddUserDrawer
