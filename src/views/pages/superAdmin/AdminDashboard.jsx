import { useEffect, useState } from 'react'

// material-ui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// project imports
import EarningCard from '../../dashboard/EarningCard'
import PopularCard from '../../dashboard/PopularCard'
import TotalOrderLineChartCard from '../../dashboard/TotalOrderLineChartCard'
import TotalIncomeDarkCard from '../../dashboard/TotalIncomeDarkCard'
import TotalIncomeLightCard from '../../dashboard/TotalIncomeLightCard'
import TotalGrowthBarChart from '../../dashboard/TotalGrowthBarChart'

import { gridSpacing } from 'store/constant'

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'

// ==============================|| ADMIN DASHBOARD ||============================== //

const AdminDashboard = () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Grid container spacing={gridSpacing}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          Welcome Admin
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here;s an overview of your account
        </Typography>
      </Grid>
    </Grid>
  )
}

export default AdminDashboard
