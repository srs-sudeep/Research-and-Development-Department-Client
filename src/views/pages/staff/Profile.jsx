import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Grid,
  Paper,
  useTheme,
} from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { getIndiUser } from 'api'

const StaffProfile = () => {
  const theme = useTheme()
  const [StaffProfile, setStaffProfile] = useState({})
  const [role, setRole] = useState('')

  useEffect(() => {
    fetchStaffProfile()
  }, [])
  
  const fetchStaffProfile = async () => {
    try {
      const response = await getIndiUser(localStorage.getItem('id'))
      setStaffProfile(response)
    } catch (error) {
      console.error('Error fetching staff details:', error.message)
    }
  }

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    if (userRole) {
      const formattedRole =
        userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()
      setRole(formattedRole)
    }
  }, [])

  return (
    <MainCard title={`${role} Profile`}>
      <Paper
        elevation={3}
        sx={{ maxWidth: 900, margin: 'auto', padding: 3, my: 5, borderRadius: 3 }}
      >
        <Card sx={{ padding: 3 }}>
          <CardContent>
            <Grid container spacing={4} alignItems="center">
              {/* Profile Picture */}
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: 'auto',
                    border: `4px solid ${theme.palette.primary.main}`,
                  }}
                  src={StaffProfile.avatar || '/path-to-default-avatar.jpg'}
                  alt={StaffProfile.name || 'Profile Picture'}
                />
                <Typography
                  variant="h6"
                  sx={{ mt: 2, fontWeight: 500, color: theme.palette.primary.main }}
                >
                  {StaffProfile.name || 'Staff Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {role || 'Role'}
                </Typography>
              </Grid>

              {/* Profile Details */}
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="body1">
                    <strong>Name:</strong> {StaffProfile.name || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>ID:</strong> {StaffProfile.idNumber || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {StaffProfile.email || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>LDAP:</strong> {StaffProfile.ldap || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone Number:</strong> {StaffProfile.phoneNumber || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </MainCard>
  )
}

export default StaffProfile
