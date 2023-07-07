// ** React Imports
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {
    Divider,
    FormControl,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import server from 'src/context/server'

export interface Inquiry {
    company_name: string
    created_at: string
    email: string
    id: number
    is_created: boolean
    name: string
    purpose: string
    subject: string
    updated_at: string
}

const Inquiries = () => {
    const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)
    const [acceptConfirm, setAcceptConfirm] = useState<boolean>(false)
    const [acceptId, setAcceptId] = useState<number>(-1)
    const [inquiryElement, setInquiryElement] = useState<Inquiry>()
    const [pageSize, setPageSize] = useState<number>(7)
    const [rows, setRows] = useState<Inquiry[]>([])

    const DefaultNotify = (message: string) =>
        toast.loading(message, {
            position: 'bottom-center',
            duration: 2000
        })

    const columns: GridColDef[] = [
        {
            flex: 0.1,
            minWidth: 50,
            field: 'id',
            headerName: '순번',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return <div onClick={() => alert(row.purpose)}>{row.id}</div>
            }
        },
        {
            flex: 0.75,
            minWidth: 300,
            field: 'subject',
            headerName: '제목',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            const fetchData = async () => {
                                const res = await server.get(`/api/inquiries/${row.id}`, {
                                    headers: {
                                        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`
                                    }
                                })
                                if (res) {
                                    setIsDialogOpened(true)
                                    setInquiryElement({ ...res.data })
                                }
                            }

                            const callPromise = fetchData()

                            toast.promise(
                                callPromise,
                                {
                                    loading: '전문 불러오는 중...',
                                    error: '불러오는데 실패하였습니다.',
                                    success: '성공'
                                },
                                {
                                    position: 'bottom-center'
                                }
                            )
                        }}
                    >
                        {row.subject}
                    </p>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 75,
            field: 'is_created',
            headerName: '승인여부',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Button
                        variant='text'
                        fullWidth
                        disabled={row.is_created}
                        onClick={() => {
                            if (!row.is_created) {
                                setAcceptConfirm(true)
                                setAcceptId(row.id)
                            }
                        }}
                    >
                        {row.is_created ? '승인됨' : '승인'}
                    </Button>
                )
            }
        }
    ]

    useEffect(() => {
        const initPage = async () => {
            const res = await server.get('/api/inquiries', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`
                },
                params: {
                    limit: 100,
                    offset: 0
                }
            })

            if (res.data) {
                setRows(res.data.content)
            }
        }

        initPage()
    }, [])

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='도입 요청 목록' />

                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            disableSelectionOnClick
                            rowsPerPageOptions={[7, 10, 25, 50]}
                            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Dialog
                open={isDialogOpened}
                onClose={() => setIsDialogOpened(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogTitle id='alert-dialog-title'>{inquiryElement?.subject}</DialogTitle>

                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        <strong>기엄명: </strong>
                        <b>{inquiryElement?.company_name}</b>
                        <br />
                        <strong>작성자: </strong>
                        {inquiryElement?.name}
                        <br />
                        <strong>이메일: </strong>
                        {inquiryElement?.email}
                        <br />
                        <strong>작성일: </strong>
                        {inquiryElement?.created_at.replace('T', ' | ')}
                        <Divider />
                        {inquiryElement?.purpose}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpened(false)} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={acceptConfirm}
                onClose={() => setAcceptConfirm(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogTitle id='alert-dialog-title'>도입승인</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>해당 기업의 도입을 승인합니다.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAcceptConfirm(false)} autoFocus>
                        취소
                    </Button>
                    <Button
                        onClick={() => {
                            setAcceptConfirm(false)
                            const fetchData = async () => {
                                const res = await server.post(`/api/inquiries/${acceptId}/issue`, {
                                    headers: {
                                        Authorization: `${window.localStorage.getItem('accessToken')}`
                                    }
                                })
                            }

                            fetchData()
                            // toast.promise(
                            //     fetchData(),
                            //     {
                            //         loading: '승인 중...',
                            //         error: '승인에 실패하였습니다...',
                            //         success: '성공'
                            //     },
                            //     {
                            //         position: 'bottom-center'
                            //     }
                            // )
                        }}
                    >
                        승인
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Inquiries
