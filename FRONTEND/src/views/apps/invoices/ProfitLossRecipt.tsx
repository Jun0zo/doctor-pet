import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useInvoice from 'src/hooks/useInvoice'

import DeleteIcon from '@mui/icons-material/Delete'

interface ThisProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>]
  dateString: string
  onSaveSuccess: () => void
}

export type ProfitLossExpectedType = {
  total_sales_amount: number
  total_paid_commission_fee: number
  total_plate_fee_income: number
}

export type NewElement = { name: string; price: number }

const ProfitLossRecipt = ({ openState, dateString, onSaveSuccess }: ThisProps) => {
  // hooks
  const { getProfitLossExpected, postProfitLoss } = useInvoice()

  // parameter state
  const [open, setOpen] = openState

  // inner state
  const [disabled, setDisabled] = useState(false)
  const [expected, setExpected] = useState<ProfitLossExpectedType>({
    total_sales_amount: -1,
    total_paid_commission_fee: -1,
    total_plate_fee_income: -1
  })

  const [newCommissionFees, setNewCommissionFees] = useState<NewElement[]>([])
  const [newPlateFees, setNewPlateFees] = useState<NewElement[]>([])

  // effects
  useEffect(() => {
    const init = async () => {
      const res = await getProfitLossExpected(dateString)
      console.log(res)
      if (res.status === 400) {
        toast.error(res.data.message!)
      } else if (res.status === 200) {
        setExpected(res.data)
      }
    }

    init()
  }, [])

  // functions
  const fix = (min: number, max: number, value: number) => {
    if (value < min) return min
    if (value > max) return max
    return value
  }

  const getTotalNewVATs = () => {
    return newCommissionFees.reduce(function (total, element) {
      return total + element.price
    }, 0)
  }

  const getTotalNewExtras = () => {
    return newPlateFees.reduce(function (total, element) {
      return total + element.price
    }, 0)
  }

  // renders
  const renderNewCommissionFees = () => {
    // 추가 지출
    return newCommissionFees.map(({ name, price }, index) => {
      const onChangeName = (value: string) => {
        let res = structuredClone(newCommissionFees)
        res[index].name = value
        setNewCommissionFees([...res])
      }

      const onChangePrice = (value: string) => {
        let res = structuredClone(newCommissionFees)
        let reValue = (res[index].price = fix(-10000000, -1, Number(value)))
        setNewCommissionFees([...res])
      }

      const handleDeleteElement = () => {
        // console.log('이 추가 항목 삭제 로직')
        let res = structuredClone(newCommissionFees)
        res.splice(index, 1)
        setNewCommissionFees([...res])
      }

      return (
        <Card key={index} sx={{ '&:not(:first-child)': { mt: 1 } }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  size='small'
                  label='제목'
                  value={name}
                  onChange={e => onChangeName(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  size='small'
                  label='금액(원)'
                  value={price}
                  type='number'
                  onChange={e => onChangePrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} textAlign='center'>
                <IconButton onClick={handleDeleteElement}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )
    })
  }

  const renderNewPlateFees = () => {
    // 추가 수입
    return newPlateFees.map(({ name, price }, index) => {
      const onChangeName = (value: string) => {
        let res = structuredClone(newPlateFees)
        res[index].name = value
        setNewPlateFees([...res])
      }

      const onChangePrice = (value: string) => {
        let res = structuredClone(newPlateFees)
        res[index].price = fix(1, 10000000, Number(value))
        setNewPlateFees([...res])
      }

      const handleDeleteElement = () => {
        // console.log('이 추가 항목 삭제 로직')
        let res = structuredClone(newPlateFees)
        res.splice(index, 1)
        setNewPlateFees([...res])
      }

      return (
        <Card key={index} sx={{ '&:not(:first-child)': { mt: 1 } }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  size='small'
                  label='제목'
                  value={name}
                  onChange={e => onChangeName(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  size='small'
                  label='금액(원)'
                  value={price}
                  type='number'
                  onChange={e => onChangePrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} textAlign='center'>
                <IconButton onClick={handleDeleteElement}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )
    })
  }

  const renderExpressions = (items: [string, number][]) => {
    return items.map((item, index) => {
      return (
        <Grid container justifyContent='space-between' key={index}>
          <Grid item>
            <Typography>{item[0]}:</Typography>
          </Grid>
          <Grid item>
            <Typography>{item[1].toLocaleString()} ₩</Typography>
          </Grid>
        </Grid>
      )
    })
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 800,
          width: 'calc(100% - 8rem)',
          maxHeight: 'calc(100% - 8rem)',
          overflowY: 'scroll'
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ m: 2 }}>
              <Typography>
                <span style={{ fontSize: 32 }}>{Number(dateString.split('-')[1])}월</span>의 계산서
              </Typography>

              <Divider />
              <Typography variant='body1' sx={{ pl: 1 }}>
                추가 지출
              </Typography>
              <Divider />
              {renderNewCommissionFees()}
              <Button
                variant='contained'
                onClick={() => {
                  setNewCommissionFees(state => [...state, { name: '새 항목', price: -2000 }])
                }}
                sx={{ mt: 2 }}
                disabled={disabled}
              >
                추가
              </Button>

              <Divider />
              <Typography variant='body1' sx={{ pl: 1 }}>
                추가 수입
              </Typography>
              <Divider />
              {renderNewPlateFees()}
              <Button
                variant='contained'
                onClick={() => {
                  setNewPlateFees(state => [...state, { name: '새 항목', price: 2000 }])
                }}
                sx={{ mt: 2 }}
                disabled={disabled}
              >
                추가
              </Button>
              <Divider />
              <Grid container>
                <Grid item xs={0} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  {renderExpressions([
                    ['매출액', expected.total_sales_amount],
                    ['지급 수수료', expected.total_paid_commission_fee],
                    ['지입료 수입', expected.total_plate_fee_income],
                    ['추가 지출', getTotalNewVATs()],
                    ['추가 수입', getTotalNewExtras()]
                  ])}
                  <Divider />
                  {renderExpressions([
                    [
                      '예상 수익',
                      (function (): number {
                        return (
                          expected.total_sales_amount +
                          expected.total_paid_commission_fee +
                          expected.total_plate_fee_income +
                          getTotalNewVATs() +
                          getTotalNewExtras()
                        )
                      })()
                    ]
                  ])}
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{ height: '100%' }}
                    onClick={async () => {
                      setDisabled(true)
                      const res = await postProfitLoss([...newCommissionFees, ...newPlateFees], dateString)

                      if (res.status === 200) {
                        onSaveSuccess()
                        setOpen(false)
                      } else if (Math.floor(res.status! % 100) === 4) {
                        toast.error(res.data.message!)
                        setDisabled(false)
                      }
                    }}
                    disabled={disabled}
                  >
                    저장
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    fullWidth
                    color='error'
                    onClick={() => setOpen(false)}
                    disabled={disabled}
                  >
                    저장하지 않고 닫기
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default ProfitLossRecipt
