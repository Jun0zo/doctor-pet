import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { toast } from 'react-hot-toast'
import useInvoice from 'src/hooks/useInvoice'
import useUser, { getErrorMessage } from 'src/hooks/useUser'

interface Props {
  open: boolean
  invoiceId: number
  handleClose: () => void
}

const InvoiceDeleteDialog = ({ open, invoiceId, handleClose }: Props) => {
  const { deleteInvoice } = useUser()

  const handleConfirm = () => {
    const promiseConfirm = async () => {
      try {
        const res = await deleteInvoice(invoiceId)
        if (res.status! >= 400) {
          throw res
        }
      } finally {
        handleClose()
      }
    }

    toast.promise(promiseConfirm(), {
      loading: '삭제 중입니다...',
      success: '삭제 되었습니다.',
      error: res => getErrorMessage(res)
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>정산내역 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>해당 정산 내역을 삭제합니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          취소
        </Button>
        <Button onClick={handleConfirm} color='error'>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InvoiceDeleteDialog
