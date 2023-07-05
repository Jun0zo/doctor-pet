import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  Grid,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useInvoice from 'src/hooks/useInvoice'
import { getErrorMessage } from 'src/hooks/useUser'
import DateSelector, { buildDateString } from '../user-list/DateSelector'
import { DateSelectorFilter } from '../user-list/DateSelector'

interface ThisProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>]
  initialDate: DateSelectorFilter
  onSaveSuccess?: () => void
}

const ExporttoExcelRecipt = ({ openState, initialDate, onSaveSuccess }: ThisProps) => {
  const [open, setopen] = openState

  const { exportToExcel } = useInvoice()

  const [type, setType] = useState<'overall' | 'detail' | 'profitLoss'>('overall')
  const [dateFilterFrom, setDateFilterFrom] = useState<DateSelectorFilter>({
    ...initialDate
  })
  const [dateFilterTo, setDateFilterTo] = useState<DateSelectorFilter>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  })
  const [generated, setGenerated] = useState({
    file_name: '',
    file_contents: '',
    file_type: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setGenerated({
      file_name: '',
      file_contents: '',
      file_type: ''
    })
  }, [dateFilterFrom, dateFilterTo, type])

  useEffect(() => {
    const { year: yf, month: mf } = dateFilterFrom
    const { year: yt, month: mt } = dateFilterTo

    let deltaFrom = yf * 12 + mf
    let deltaTo = yt * 12 + mt

    if (deltaFrom >= deltaTo) {
      deltaFrom = deltaTo - 1

      const year = Math.floor(deltaFrom % 12 === 0 ? deltaFrom / 12 - 1 : deltaFrom / 12)
      const month = deltaFrom % 12 === 0 ? 12 : deltaFrom % 12
      console.log({ deltaFrom, deltaTo, year, month })
      setDateFilterFrom({ year, month })
    }
  }, [dateFilterFrom, dateFilterTo])

  return (
    <Modal open={open} onClose={() => setopen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 800,
          width: 'calc(100% - 8rem)',
          maxHeight: 'calc(100% - 8rem)'
          //   overflowY: 'scroll'
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ m: 2 }}>
              <Typography>
                <span style={{ fontSize: 32 }}>EXCEL</span>로 내보내기
              </Typography>
              <Divider />

              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ pb: 2 }}>출력 대상:</Typography>
                  <ToggleButtonGroup
                    size='small'
                    value={type}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setType(newValue)
                      }
                    }}
                    exclusive
                  >
                    <ToggleButton value='overall'>전체 정산 내역</ToggleButton>
                    <ToggleButton value='detail'>세부 정산 내역</ToggleButton>
                    <ToggleButton value='profitLoss'>수입 지출 내역</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ pb: 2 }}>기간 선택:</Typography>
                  <DateSelector filter={dateFilterFrom} setFilter={setDateFilterFrom} />
                  <br />
                  <DateSelector filter={dateFilterTo} setFilter={setDateFilterTo} />
                </Grid>
              </Grid>

              <Divider />
              {generated.file_contents.length > 0 ? (
                <>
                  <Typography variant='body2' textAlign='center' sx={{ pb: 2 }}>
                    아래 버튼을 클릭하여 파일을 다운로드 하세요.
                  </Typography>
                  <Button
                    fullWidth
                    variant='contained'
                    href={`data:${generated.file_type};base64,${generated.file_contents}`}
                    download={generated.file_name}
                  >
                    Excel 다운로드
                  </Button>
                </>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  onClick={async () => {
                    setIsGenerating(true)
                    console.log({ dateFilterFrom, dateFilterTo })
                    const res = await exportToExcel(
                      type,
                      buildDateString(dateFilterFrom),
                      buildDateString(
                        // (function () {
                        //   let year = dateFilterFrom.year
                        //   let month = dateFilterFrom.month
                        //   month += 1
                        //   if (month > 12) {
                        //     month -= 12
                        //     year += 1
                        //   }
                        //   return { year, month }
                        // })()
                        dateFilterTo
                      )
                    )

                    if (res.status! > 400) {
                      toast.error(getErrorMessage(res.data))
                    } else if (res.status === 200) {
                      setGenerated(res.data)
                    }

                    setIsGenerating(false)
                  }}
                  disabled={isGenerating}
                >
                  {isGenerating ? '생성 중...' : '엑셀 생성하기'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default ExporttoExcelRecipt
