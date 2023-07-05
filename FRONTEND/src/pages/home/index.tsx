import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Container } from '@mui/material'

const HomeComponent = () => {
  useEffect(()=> {
    alert('!!start')
  }, [])
  return (
    <Container style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      메인 페이지입니다.
    </Container>
  )
}

const Home = () => {
  const router = useRouter()

  return <HomeComponent />

}

export default Home

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
