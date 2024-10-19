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

const StaffDashboard = () => {
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
          Here's an overview of the system's performance.
        </Typography>
      </Grid>

      {/* First Row of Cards */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: 203,
                    label: 'Total Income',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Second Row of Graphs */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StaffDashboard
