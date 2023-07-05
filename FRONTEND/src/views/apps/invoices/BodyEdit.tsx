import _ from 'lodash'
import styled from '@emotion/styled'
import {
  Box,
  BoxProps,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableCellBaseProps,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import useInvoice from 'src/hooks/useInvoice'
import DeleteIcon from '@mui/icons-material/Delete'
import { InvoicePostType, InvoiceTypeSingle } from 'src/types/userTypes'

interface ThisProps {
  id: number | string
  type: 'edit' | 'view'
  invoice: InvoiceTypeSingle
  loading: boolean
  dateBuilt: string
  setInvoice: Dispatch<SetStateAction<InvoiceTypeSingle>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const popDate = (ds: string) => {
  return ds.slice(0, -2).replace('-', '년').replace('-', '월')
}

const BodyEdit = ({ id, type, invoice, loading, dateBuilt, setInvoice, setLoading }: ThisProps) => {
  const vat = invoice?.include_vat ? Math.round(invoice?.calculate_amount * 0.1) : 0

  const sumBenefits = () => {
    const { benefit_list } = invoice
    let total = 0

    if (!benefit_list) return 0

    benefit_list.forEach(item => {
      total += item.price
    })

    return total
  }

  const renderBenefitList = () => {
    const { benefit_list } = invoice

    const onClickAppendBenefit = () => {
      let res = _.cloneDeep(benefit_list)
      res.push({ name: '새 수당', price: 2000 })
      setInvoice(state => ({ ...state, benefit_list: res }))
    }

    return (
      <>
        {benefit_list.map(({ name, price }, index) => {
          const onChangeBenefitName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            let res = _.cloneDeep(benefit_list)
            res[index].name = e.target.value
            setInvoice(state => ({ ...state, benefit_list: res }))
          }

          const onChangeBenefitPrice = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            let res = _.cloneDeep(benefit_list)
            const newPrice = Number(e.target.value)
            res[index].price = newPrice
            if (newPrice > 10000000) {
              res[index].price = 10000000
            } else if (newPrice < -10000000) {
              res[index].price = -10000000
            }
            setInvoice(state => ({ ...state, benefit_list: res }))
          }

          const onClickBenefitDelete = () => {
            let res = _.cloneDeep(benefit_list)
            res = res.filter((item, i) => i !== index)
            setInvoice(state => ({ ...state, benefit_list: res }))
          }

          return (
            <Card key={index} sx={{ '&:not(:first-child)': { mt: 1 } }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <TextField fullWidth size='small' label='제목' value={name} onChange={onChangeBenefitName} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      size='small'
                      label='금액(원)'
                      value={price}
                      type='number'
                      onChange={onChangeBenefitPrice}
                    />
                  </Grid>
                  <Grid item xs={2} textAlign='center'>
                    <IconButton onClick={onClickBenefitDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )
        })}
        <Button variant='contained' onClick={onClickAppendBenefit} sx={{ mt: 2 }}>
          수당 추가
        </Button>
      </>
    )
  }

  /* 다시다시계산 */
  useEffect(() => {
    const { sales_amount, commission_rate, plate_fee } = invoice
    setInvoice(state => ({
      ...state,
      commission_rate: Number(commission_rate.toFixed(1)),
      plate_fee: Math.floor(plate_fee)
    }))
    if (commission_rate < 0.1) {
      setInvoice(state => ({ ...state, commission_rate: 0.1 }))
    } else if (commission_rate > 99.9) {
      setInvoice(state => ({ ...state, commission_rate: 99.9 }))
    }

    if (plate_fee < 1) {
      setInvoice(state => ({
        ...state,
        plate_fee: 1
      }))
    } else if (plate_fee > 10000000) {
      setInvoice(state => ({
        ...state,
        plate_fee: 10000000
      }))
    }

    // const res: { [key in keyof InvoiceTypeSingle]?: InvoiceTypeSingle[key] } = {
    const maintenance_cost = Math.round(sales_amount * (commission_rate / 100))
    const calculate_amount = sales_amount - maintenance_cost

    // console.log('재계산', res)
    setInvoice(state => ({ ...state, maintenance_cost, calculate_amount }))
  }, [invoice.commission_rate, invoice.plate_fee])
  /* 다시다시계산 */

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <Typography variant='h6'>급여</Typography>
        </Grid>
        <Grid item sx={{ textAlign: 'right' }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            #{id}
          </Typography>
          <Typography variant='body2'>{popDate(invoice?.start_date)}</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Box sx={{ mt: 5 }}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <FormGroup>
              <FormControlLabel
                checked={invoice?.include_vat}
                control={<Switch onChange={e => setInvoice(state => ({ ...state, include_vat: e.target.checked }))} />}
                label='부가세 포함'
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>매출액</Typography>
              </Grid>
              <Grid item>
                <Typography>{Number(invoice?.sales_amount).toLocaleString('en-us')} ₩</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>관리비 공제율</Typography>
              </Grid>
              <Grid item textAlign='right'>
                <OutlinedInput
                  type='number'
                  size='small'
                  sx={{ width: '100%' }}
                  inputProps={{ min: 0.1, max: 99.9, style: { textAlign: 'right' } }}
                  endAdornment={<InputAdornment position='end'>%</InputAdornment>}
                  value={invoice?.commission_rate}
                  onChange={e => setInvoice(state => ({ ...state, commission_rate: Number(e.target.value) }))}
                />
                <Typography component='p' variant='body2'>
                  {` ${Number(invoice?.maintenance_cost).toLocaleString('en-us')}`} ₩
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>정산액</Typography>
              </Grid>
              <Grid item>
                <Typography>{Number(invoice?.calculate_amount).toLocaleString('en-us')} ₩</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>부가세</Typography>
              </Grid>
              <Grid item>
                <Typography>{vat.toLocaleString('en-us')} ₩</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>지입료</Typography>
              </Grid>
              <Grid item>
                <OutlinedInput
                  type='number'
                  size='small'
                  sx={{ width: 200 }}
                  inputProps={{ min: 0, style: { textAlign: 'right' } }}
                  endAdornment={<InputAdornment position='end'>₩</InputAdornment>}
                  value={invoice?.plate_fee}
                  onChange={e => setInvoice(state => ({ ...state, plate_fee: Number(e.target.value) }))}
                />
                {/* <Typography>{Number(invoice?.plate_fee).toLocaleString('en-us')} ₩</Typography> */}
              </Grid>
            </Grid>
            <Divider />
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>소계:</Typography>
              </Grid>
              <Grid item>
                <Typography fontWeight='bold'>
                  {Number(invoice?.calculate_amount + vat - invoice?.plate_fee).toLocaleString('en-us')} ₩
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Typography sx={{ p: 2 }} variant='body2' fontWeight='bold'>
        수당
      </Typography>
      <Divider />
      {renderBenefitList()}
      <Divider />

      <Box>
        <Grid container>
          <Grid item xs={12} md={7}></Grid>
          <Grid item xs={12} md={5}>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography>수당합계</Typography>
              </Grid>
              <Grid item>
                <Typography>{sumBenefits().toLocaleString('en-us')} ₩</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography
                  color={
                    Number(invoice?.calculate_amount + vat - invoice?.plate_fee + sumBenefits()) < 0
                      ? 'error.main'
                      : undefined
                  }
                >
                  최종 지급액:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontWeight='bold'
                  color={
                    Number(invoice?.calculate_amount + vat - invoice?.plate_fee + sumBenefits()) < 0
                      ? 'error.main'
                      : undefined
                  }
                >
                  {Number(invoice?.calculate_amount + vat - invoice?.plate_fee + sumBenefits()).toLocaleString('en-us')}{' '}
                  ₩
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default BodyEdit
