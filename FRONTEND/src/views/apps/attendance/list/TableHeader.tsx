// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'

interface TableHeaderProps {
  selectedRows: GridRowId[]
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { selectedRows } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button sx={{ mb: 2 }} component={Link} variant='contained' href='/attendance/add'>
          근태 추가
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
