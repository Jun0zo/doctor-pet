import { ReactNode, useState } from 'react'
import * as yup from 'yup'

import { Card, CardContent, CardHeader } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

import Icon from 'src/@core/components/icon'
import server from 'src/context/server'
import { AxiosError } from 'axios'

const defaultValues = {
    subject: '도입 문의합니다.',
    purpose: '도입 문의합니다. 회신 기다리겠습니다.',
    company_name: 'Temp',
    email: 'temp@temp.com',
    name: '홍길동'
}

interface FormData {
    subject: string
    purpose: string
    company_name: string
    email: string
    name: string
}

const schema = yup.object().shape({
    subject: yup.string().min(2).max(50).required('입력란이 비었습니다.'),
    purpose: yup.string().min(10).max(1000).required('입력란이 비었습니다.'),
    company_name: yup.string().min(2).max(20).required('입력란이 비었습니다.'),
    email: yup.string().required('입력란이 비었습니다.'),
    name: yup.string().required('입력란이 비었습니다.')
})

const Welcome = () => {
    const [inquirySubmitErrorMessage, setInquirySubmitErrorMessage] = useState<string>('')

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        server
            .post('/api/inquiries', {
                data: data
            })
            .then(res => console.log(res))
            .catch((err: AxiosError) => {
                const { data } = err.response
                setInquirySubmitErrorMessage(data.message)
            })
    }

    interface inputsList {
        name: 'subject' | 'purpose' | 'company_name' | 'email' | 'name'
        label: string
        icon: string
    }

    const inputs: inputsList[] = [
        {
            name: 'subject',
            label: '제목',
            icon: 'mdi:account-outline'
        },
        {
            name: 'company_name',
            label: '회사명',
            icon: 'carbon:location-company'
        },
        {
            name: 'name',
            label: '성함',
            icon: 'fluent-mdl2:rename'
        },
        {
            name: 'email',
            label: '이메일',
            icon: 'mdi:email-outline'
        },
        {
            name: 'purpose',
            label: '도입 목적',
            icon: 'mdi:message-outline'
        }
    ]

    return (
        <div style={{ width: 'calc(100% - 12rem)' }}>
            <Card>
                <CardHeader title='Contact Us' />
                <CardContent>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        {inputs.map((i: inputsList, index) => {
                            return (
                                <FormControl key={index} fullWidth sx={{ mb: 4 }}>
                                    <Controller
                                        name={i.name}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <TextField
                                                value={value}
                                                onBlur={onBlur}
                                                label={i.label}
                                                onChange={onChange}
                                                placeholder={i.label}
                                                error={Boolean(errors[i.name])}
                                                minRows={i.name === 'purpose' ? 3 : 1}
                                                multiline={i.name === 'purpose' && true}
                                                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <Icon icon={i.icon} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                    {errors[i.name] && (
                                        <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors[i.name]!.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )
                        })}
                        <Button type='submit' variant='contained' size='large'>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

Welcome.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Welcome.guestGuard = true

export default Welcome
