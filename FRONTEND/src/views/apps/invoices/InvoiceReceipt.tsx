import { Button, Grid, Modal } from '@mui/material'
import { Box, SxProps } from '@mui/system'
import React, { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useUser, { getErrorMessage } from 'src/hooks/useUser'
import { InvoiceTypeSingle } from 'src/types/userTypes'
import InvoiceEdit from '../user-list/InvoiceEdit'

interface Props {
  open: boolean
  type: 'view' | 'edit'
  invoiceId: number
  invoice: InvoiceTypeSingle
  dateBuilt: string
  setInvoice: (value: SetStateAction<InvoiceTypeSingle>) => void
  setOpen: Dispatch<
    SetStateAction<{
      [key: string]: boolean
    }>
  >
  fetchData: () => Promise<void>
}

const buttonStyles: SxProps = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }

const InvoiceReceipt = ({ open, type, invoiceId, invoice, dateBuilt, setOpen, setInvoice, fetchData }: Props) => {
  const { postInvoice } = useUser()

  /* state */
  const [loading, setLoading] = useState(true)

  const onClickSave = () => {
    const { include_vat, commission_rate, plate_fee, benefit_list, date, start_date, end_date } = invoice

    const handlePostInvoice = async () => {
      const res = await postInvoice({
        user_id: invoiceId,
        include_vat,
        commission_rate,
        plate_fee,
        benefit_list,
        date: dateBuilt
      })

      // console.log(res)
      if (res.status! >= 400) {
        throw res
      }

      setOpen(state => ({ ...state, receipt: false }))
      fetchData()
    }

    let hasInvalid = false
    // 포스트
    if (hasInvalid) {
      toast.error('기타 혹은 수당 목록에 빈 입력란이 있습니다.')
    } else {
      toast.promise(handlePostInvoice(), {
        loading: '저장 중입니다...',
        success: '저장되었습니다!',
        error: res => getErrorMessage(res)
      })
    }
  }

  useEffect(() => {
    if (open) setLoading(true)
  }, [open])

  return (
    <Modal
      open={open}
      disableEscapeKeyDown={type === 'edit'}
      onClose={type === 'view' ? () => setOpen(state => ({ ...state, receipt: false })) : undefined}
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 8rem)',
          maxWidth: 800,
          maxHeight: 'calc(100% - 8rem)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none'
          // overflowY: 'scroll'
        }}
      >
        <Box
          sx={{
            height: 600,
            overflow: 'hidden scroll',
            mb: 2
          }}
        >
          <InvoiceEdit
            id={invoiceId}
            type={type}
            invoice={invoice}
            setInvoice={setInvoice}
            loading={loading}
            setLoading={setLoading}
            dateBuilt={dateBuilt}
          />
        </Box>

        {type === 'edit' ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={onClickSave} variant='contained' fullWidth sx={buttonStyles} disabled={loading}>
                저장
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setOpen(state => ({ ...state, receipt: false }))}
                color='error'
                fullWidth
                variant='contained'
                sx={buttonStyles}
              >
                저장하지 않고 닫기
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button onClick={() => setOpen(state => ({ ...state, receipt: false }))} variant='text' fullWidth>
            닫기
          </Button>
        )}
      </Box>
    </Modal>
  )
}

export default InvoiceReceipt
