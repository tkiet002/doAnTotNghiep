import { Box } from '@mui/material'
import Header from '../../components/Header'

export default function Dashboard() {
  return (
    <Box m={"20px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Header title="DASHBOARD" subtitle="Chào mừng bạn đến với dashboard"></Header>
        </Box>
    </Box>
  )
}
