import styled from '@emotion/styled'
import {
  Box,
  BoxProps,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
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
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import useInvoice from 'src/hooks/useInvoice'
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

const BodyView = ({ id, type, invoice, loading, dateBuilt, setInvoice, setLoading }: ThisProps) => {
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

    if (!benefit_list || benefit_list.length === 0) {
      return (
        <Grid container justifyContent='center' sx={{ px: 2 }}>
          <Grid item>
            <Typography variant='body2'>없음</Typography>
          </Grid>
        </Grid>
      )
    }

    return benefit_list.map(({ name, price }, index) => {
      return (
        <Grid key={index} container justifyContent='space-between' sx={{ px: 2 }}>
          <Grid item>
            <Typography variant='body2'>{name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>{Number(price).toLocaleString('en-us')} ₩</Typography>
          </Grid>
        </Grid>
      )
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <Typography variant='h6'>급여</Typography>
        </Grid>
        <Grid item sx={{ textAlign: 'right' }}>
          {/* <Typography variant='h6' sx={{ mb: 2 }}>
            #{id}
          </Typography> */}
          <Typography variant='h6' /*variant='body2'*/>{popDate(invoice?.start_date)}</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Box sx={{ mt: 5 }}>
        <Grid container>
          <Grid item xs={12} md={7}></Grid>
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
                <Typography>관리비 공제율 ({invoice?.commission_rate} %)</Typography>
              </Grid>
              <Grid item>
                <Typography>{` ${Number(invoice?.maintenance_cost).toLocaleString('en-us')}`} ₩</Typography>
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
                <Typography>{Number(invoice?.plate_fee).toLocaleString('en-us')} ₩</Typography>
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
                <Typography>최종 지급액:</Typography>
              </Grid>
              <Grid item>
                <Typography fontWeight='bold'>
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

export default BodyView
