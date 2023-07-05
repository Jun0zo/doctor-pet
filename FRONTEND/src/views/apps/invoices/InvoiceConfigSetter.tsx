import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import useConfig from 'src/hooks/useConfig'
import { ConfigType } from 'src/types/userTypes'
import DateSelector from 'src/views/apps/user-list/DateSelector'

interface ThisProps {
  configState: ConfigType
  setConfigState: Dispatch<SetStateAction<ConfigType>>
  defaultConfigState: { [key in keyof ConfigType]?: ConfigType[key] }
}

const InvoiceConfigSetter = (props: ThisProps) => {
  const { configState, setConfigState, defaultConfigState } = props
  const { setConfig } = useConfig()

  const onClickReset = () => {
    setConfigState(v => ({ ...v, ...defaultConfigState }))
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='기본값 관리' />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                type='number'
                fullWidth
                size='small'
                label='기본 수수료(%)'
                value={configState.default_commission_rate}
                onChange={e => setConfigState(state => ({ ...state, default_commission_rate: Number(e.target.value) }))}
                onBlur={e =>
                  setConfigState(state => ({
                    ...state,
                    default_commission_rate: Number(state.default_commission_rate.toFixed(1))
                  }))
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type='number'
                fullWidth
                size='small'
                label='기본 지입료(원)'
                value={configState.default_plate_fee}
                onChange={e => setConfigState(state => ({ ...state, default_plate_fee: Number(e.target.value) }))}
                onBlur={e =>
                  setConfigState(state => ({
                    ...state,
                    default_plate_fee: Math.floor(state.default_plate_fee)
                  }))
                }
              />
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={configState.is_auto_accept_attendance}
                      onChange={e =>
                        setConfigState(state => ({ ...state, is_auto_accept_attendance: e.target.checked }))
                      }
                    />
                  }
                  label='출석 자동 허용'
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Typography>기본 수수료는 0.1 ~ 99.9(%) 사이의 값을 입력하세요.</Typography>
          <Typography>기본 지입료는 1 ~ 10,000,000(원) 사이의 값을 입력하세요.</Typography>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button fullWidth variant='outlined' onClick={onClickReset}>
                초기화
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant='contained'
                onClick={async () => {
                  const { is_auto_accept_attendance, default_commission_rate, default_plate_fee } = configState
                  const res = await setConfig({
                    is_auto_accept_attendance,
                    default_commission_rate,
                    default_plate_fee
                  })

                  if (res) {
                    toast.success('저장 완료')
                  }
                }}
              >
                저장
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default InvoiceConfigSetter
