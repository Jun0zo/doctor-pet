// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect, Suspense } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports

//** Third Party Imports
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
// import { ko } from 'date-fns/esm/locale'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types Imports
import { JobProps, DateType, AffiliatedType } from 'src/types/jobTypes'
import { MeType, UserType } from 'src/types/userTypes'
import { InsuranceType } from 'src/types/insuranceTypes'

// ** Types
interface CustomProps {
  label?: string
  date?: DateType | number
}

interface Props {
  selectedStates: JobProps
  userList: UserType[] | undefined
  insuranceList: InsuranceType[] | undefined
  affiliatedList: AffiliatedType[] | undefined
  me: MeType
  kind: string
  isInsurance: boolean
  handleIsInsurance: (newStatus: boolean) => void
}

const CustomInput = forwardRef(({ ...props }: CustomProps) => {
  let value = props.date instanceof Date ? format(props.date, 'yyyy-MM-dd') : ''
  return <TextField size='small' sx={{ width: { sm: '250px', xs: '170px' } }} {...props} value={value} />
})

// ** styles Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const re1 = new RegExp('^[가-힣][1-9]d{3}$')
const re2 = new RegExp('^[0-9]{2,3}[가-힣][1-9]d{3}$|^\\[0-9]{2}[가-힣][1-9]d{3}$')
const re3 = new RegExp('^외교[0-9]{3}-?[0-9]{3}$|^외교[1-9]d{6}$')

const AddCard = (props: Props) => {
  // ** Props
  let { kind, selectedStates, userList, insuranceList, affiliatedList, me, isInsurance, handleIsInsurance } = props

  // ** States
  const [selectedDate, setSelectedDate] = selectedStates.date

  const [selectedInsurance, setSelectedInsurance] = selectedStates.insurance // number
  const [selectedAffiliatedName, setSelectedAffiliatedName] = selectedStates.affiliated_name // number
  const [selectedCarNumber, setSelectedCarNumber] = selectedStates.carNumber
  const [selectedCarName, setSelectedCarName] = selectedStates.carName

  const [selectedUser, setSelectedUser] = selectedStates.user // number
  const [selectedPrice, setSelectedPrice] = selectedStates.price // number
  const [selectedIsCanceled, setSelectedIsCanceled] = selectedStates.isCanceled
  const [selectedCancelFee, setSelectedCancelFee] = selectedStates.cancelFee // number

  const [selectedMemo, setSelectedMemo] = selectedStates.memo

  // ** Hook
  const theme = useTheme()

  useEffect(() => {
    if (kind == 'add') {
      setSelectedUser(String(me.id))
    }
  }, [me, kind, setSelectedUser])

  const handleAffiliatedNameChange = (event: SelectChangeEvent) => {
    let string_value = event.target.value
    if (string_value) {
      // Nan check
      setSelectedAffiliatedName(string_value)
    }
  }

  const handleIsInsuranceSwitch = (e: SelectChangeEvent, checked: boolean) => {
    if (checked) {
      setSelectedAffiliatedName(null)
    } else {
      setSelectedInsurance(null)
    }
    handleIsInsurance(checked)
  }

  const handleInsuranceChange = (event: SelectChangeEvent) => {
    let string_value = event.target.value
    let number_value = Number(string_value)
    if (number_value) {
      // Nan check
      setSelectedInsurance(string_value)
    }
  }

  // const handleCarNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   let string_value = event.target.value
  //   let numer_value = Number(string_value)
  //   if (string_value === '' || numer_value) {
  //     // Nan check
  //     setSelectedCarNumber(string_value)
  //   }
  // }

  const handleCarNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let string_value = event.target.value
    if (string_value === '' || string_value) {
      setSelectedCarNumber(string_value)
    }
  }

  const handleCarNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let string_value = event.target.value
    if (string_value === '' || string_value) {
      setSelectedCarName(string_value)
    }
  }

  const handleUserChange = (event: SelectChangeEvent) => {
    let string_value = event.target.value
    let number_value = Number(string_value)
    if (number_value) {
      // Nan check
      setSelectedUser(string_value)
    }
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let string_value = event.target.value
    let number_value = Number(string_value)
    if (string_value === '' || number_value) {
      // Nan check
      setSelectedPrice(string_value)
    }
  }

  const handleCancelFeeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let string_value = event.target.value
    let number_value = Number(string_value)
    if (string_value === '' || number_value) {
      // Nan check
      setSelectedCancelFee(string_value)
    }
  }

  const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let string_value = event.target.value
    if (string_value === '' || string_value) {
      setSelectedMemo(string_value)
    }
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <svg
                    width={30}
                    height={25}
                    version='1.1'
                    viewBox='0 0 30 23'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                      <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                        <g id='logo' transform='translate(95.000000, 50.000000)'>
                          <path
                            id='Combined-Shape'
                            fill={theme.palette.primary.main}
                            d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                            transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                            transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.15'
                            fill={theme.palette.common.white}
                            d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.35'
                            fill={theme.palette.common.white}
                            transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                            d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Typography
                    variant='h6'
                    sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    {themeConfig.templateName}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={6} xs={12}>
              <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}
                >
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 3, width: '50px' }}>
                      업무일
                    </Typography>
                    <DatePicker
                      id='date'
                      selected={selectedDate}
                      customInput={<CustomInput date={selectedDate} />}
                      onChange={(date: Date) => setSelectedDate(date)}
                    />
                  </Box>
                </Box>
              </DatePickerWrapper>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
              <div>
                <Switch id='invoice-add-payment-terms' checked={isInsurance} onChange={handleIsInsuranceSwitch} />
                {isInsurance === true ? '보험사' : '제휴사'}
              </div>
              {isInsurance === true ? (
                <div>
                  <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                    보험사
                  </Typography>
                  <Select
                    size='small'
                    value={selectedInsurance ? selectedInsurance : ''}
                    placeholder={'삼성화재'}
                    onChange={handleInsuranceChange}
                    sx={{ mb: 4, maxWidth: '90%' }}
                  >
                    {insuranceList && insuranceList?.length > 0
                      ? insuranceList?.map((insurance: InsuranceType, index: number) => (
                          <MenuItem key={index} value={String(insurance.id)}>
                            {insurance.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
              ) : (
                <div>
                  <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                    제휴사
                  </Typography>
                  <Select
                    size='small'
                    value={selectedAffiliatedName ? selectedAffiliatedName : ''}
                    placeholder={'제휴사1'}
                    onChange={handleAffiliatedNameChange}
                    sx={{ mb: 4, maxWidth: '90%' }}
                  >
                    {affiliatedList && affiliatedList?.length > 0
                      ? affiliatedList?.map((affiliated_name: AffiliatedType, index: number) => (
                          <MenuItem key={index} value={affiliated_name}>
                            {affiliated_name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
              )}

              <div>
                <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                  담당자
                </Typography>
                {me && me.role_name === 'company_user' ? (
                  <Select
                    size='small'
                    value={selectedUser}
                    onChange={handleUserChange}
                    autoWidth={true}
                    sx={{ mb: 4, minWidth: '120px', width: '200px' }}
                  >
                    <MenuItem key={0} value={me.id}>
                      {me.name}
                    </MenuItem>
                  </Select>
                ) : (
                  <Select
                    size='small'
                    value={selectedUser}
                    onChange={handleUserChange}
                    sx={{ mb: 4, minWidth: '180px', maxWidth: '90%' }}
                  >
                    {userList && userList?.length > 0
                      ? userList?.map((user: UserType, index: number) => (
                          <MenuItem key={index} value={String(user.id)}>
                            {user.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
              <div>
                <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                  차량번호
                </Typography>
                <TextField
                  size='small'
                  value={selectedCarNumber}
                  placeholder={'12가1234'}
                  onChange={handleCarNumberChange}
                  sx={{ mb: 3.5, maxWidth: '80%' }}
                />
              </div>

              <div>
                <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                  차종
                </Typography>
                <TextField
                  value={selectedCarName}
                  placeholder={'그랜저'}
                  size='small'
                  onChange={handleCarNameChange}
                  sx={{ mb: 3.5, maxWidth: '80%' }}
                />
              </div>
              {selectedIsCanceled === false ? (
                <div>
                  <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                    금액
                  </Typography>
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>₩</InputAdornment>
                    }}
                    value={selectedPrice}
                    placeholder={'125000'}
                    onChange={handlePriceChange}
                    size='small'
                    sx={{ mb: 3.5, maxWidth: '80%' }}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {selectedIsCanceled === true ? (
                <div>
                  <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                    취소수수료
                  </Typography>
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>₩</InputAdornment>
                    }}
                    value={selectedCancelFee}
                    onChange={handleCancelFeeChange}
                    size='small'
                    sx={{ maxWidth: '200px' }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </Grid>

            <Grid item xs={12} sm={4} sx={{ mb: { lg: 0, xs: 4 } }}>
              <div>
                <Typography variant='body2' sx={{ mb: 3.5, color: 'text.primary', fontWeight: 600 }}>
                  비고
                </Typography>
                <TextField
                  value={selectedMemo}
                  placeholder={'비상급유/휘발유'}
                  onChange={handleMemoChange}
                  sx={{ minWidth: '180px', maxWidth: '200px' }}
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Suspense>
  )
}

export default AddCard
