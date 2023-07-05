import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Container } from '@mui/material'

const HomeComponent = () => {
  const router = useRouter()

  return (
    <Container style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      메인 페이지입니다.
      <Box component='span'>
        <Button onClick={() => router.push('/inquiry')}>도입문의</Button>
        <Button onClick={() => router.push('/home')}>로그인</Button>
      </Box>
    </Container>
  )
}

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const homeRoute = '/home'
    router.replace(homeRoute)
  }, [router, router.isReady])

  if (!router.isReady) {
    return <Spinner />
  }

  return <HomeComponent />
}

export default Home

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Home.authGuard = false
