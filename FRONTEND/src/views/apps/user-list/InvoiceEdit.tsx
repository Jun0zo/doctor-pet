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
import BodyEdit from '../invoices/BodyEdit'
import BodyView from '../invoices/BodyView'

interface ThisProps {
  id: number | string
  type: 'edit' | 'view'
  invoice: InvoiceTypeSingle
  loading: boolean
  dateBuilt: string
  setInvoice: Dispatch<SetStateAction<InvoiceTypeSingle>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const InvoiceEdit = (props: ThisProps) => {
  const { id, type, invoice, loading, dateBuilt, setInvoice, setLoading } = props

  const { getInvoice } = useInvoice()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [dynamics, setDynamics] = useState<{
    include_vat: boolean
    commission_rate: number
    plate_fee: number
    benefit_list: { name: string; price: number }[]
    date: string
  }>({
    include_vat: false,
    commission_rate: 0,
    plate_fee: 0,
    benefit_list: [],
    date: '2000-01-01 00:00:00'
  })

  /* invoice에서 수정가능한 목록 추출 */
  useEffect(() => {
    const { include_vat, commission_rate, plate_fee, benefit_list, date } = invoice

    if (invoice) {
      setDynamics(state => ({
        include_vat,
        commission_rate,
        plate_fee,
        benefit_list,
        date: date ? date : state.date
      }))
    }
  }, [invoice])

  /* 메인 이펙트 */
  useEffect(() => {
    const init = async () => {
      const res = await getInvoice(id, dateBuilt)
      console.log(res)
      if (res) {
        setInvoice(res)
        setLoading(false)
      }
    }

    init()
  }, [])

  if (type === 'edit') {
    return <BodyEdit {...props} />
  } else if (type === 'view') {
    return <BodyView {...props} />
  } else {
    return (
      <Box>
        <Typography>알 수 없는 오류가 발생하였습니다.</Typography>
        <Typography>팝업을 닫은 후 다시 열어주세요.</Typography>
      </Box>
    )
  }
}

export default InvoiceEdit
