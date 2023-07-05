import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

type Props = {
  open: boolean
  title: string
  desc: string
  textConfirm?: string
  textDismiss?: string
  handleConfirm?: () => void
  handleClose: () => void
}

const AttendanceDialog = ({
  open,
  title,
  desc,
  handleClose,
  handleConfirm,
  textConfirm = '확인',
  textDismiss = '취소'
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{desc}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{textDismiss}</Button>
        <Button onClick={handleConfirm} autoFocus>
          {textConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceDialog
