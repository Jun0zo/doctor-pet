// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
interface Props {
  buttonAction: any
  selectedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  kind: string
  id: number
}

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = (props: Props) => {
  const { id, kind, buttonAction, selectedState } = props
  const [selectedIsCanceled, setSelectedIsCanceled] = selectedState

  const handleIsCanceledChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSelectedIsCanceled(isChecked => !isChecked)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {kind === 'add' ? (
              <Button
                onClick={buttonAction}
                fullWidth
                sx={{ mb: 3.5 }}
                variant='contained'
                startIcon={<Icon icon='mdi:add-circle-outline' />}
              >
                업무 추가
              </Button>
            ) : (
              <Button
                onClick={() => buttonAction(id)}
                fullWidth
                sx={{ mb: 3.5 }}
                variant='contained'
                startIcon={<Icon icon='mdi:edit' />}
              >
                업무 수정
              </Button>
            )}
            <Button fullWidth component={Link} sx={{ mb: 3.5 }} variant='outlined' href='/jobs/list'>
              취소
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <OptionsWrapper sx={{ mb: 1 }}>
          <InputLabel
            htmlFor='invoice-add-payment-terms'
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
          >
            취소건
          </InputLabel>
          <Switch
            disabled={kind === 'add' ? false : true}
            id='invoice-add-payment-terms'
            onChange={handleIsCanceledChange}
          />
        </OptionsWrapper>
      </Grid>
    </Grid>
  )
}

export default AddActions