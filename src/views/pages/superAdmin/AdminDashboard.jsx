import { useEffect, useState } from 'react'

// material-ui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// project imports

import { gridSpacing } from 'store/constant'

// assets

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
