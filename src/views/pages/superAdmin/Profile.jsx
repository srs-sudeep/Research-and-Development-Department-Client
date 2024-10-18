import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
} from '@mui/material'
import { getIndiAdmin } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const Profile = () => {
  const [adminDetails, setAdminDetails] = useState({})
  const theme = useTheme()

  useEffect(() => {
    fetchAdminDetails()
  }, [])

  const fetchAdminDetails = async () => {
    try {
      const response = await getIndiAdmin()
      setAdminDetails(response)
    } catch (error) {
      console.error('Error fetching admin details:', error.message) // Changed to operator
    }
  }

  return (
    <MainCard title="Operator Profile">
      <Card sx={{ maxWidth: 800, margin: 'auto', padding: 3, mt: 5 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 2,
              [theme.breakpoints.up('md')]: {
                flexDirection: 'row',
              },
            }}>
            {/* Left Column */}
            <Box
              sx={{
                flex: 1,
                paddingRight: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Name:</strong> {adminDetails.name}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Phone Number:</strong> {adminDetails.phoneNumber}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Email</strong>{' '}
                {adminDetails.email}
                
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Operator ID:</strong> {adminDetails.id}{' '}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Right Column */}
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Contact:</strong> {adminDetails.phoneNumber}{' '}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MainCard>
  )
}

export default Profile