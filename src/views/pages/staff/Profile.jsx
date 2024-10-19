import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
} from '@mui/material'
import { getIndiStudent } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const StaffProfile = () => {
  const [studentDetails, setStudentDetails] = useState({})
  const theme = useTheme()

  useEffect(() => {
    fetchStudentDetails()
  }, [])

  const fetchStudentDetails = async () => {
    try {
      const response = await getIndiStudent()
      setStudentDetails(response)
    } catch (error) {
      console.error('Error fetching student details:', error.message)
    }
  }

  return (
    <MainCard title="Student Profile">
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
                <strong>Name:</strong> {studentDetails.name}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Roll Number:</strong> {studentDetails.rollNumber}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Email:</strong> {studentDetails.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Student ID:</strong> {studentDetails.id}{' '}
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
                <strong>Phone Number:</strong> {studentDetails.phoneNumber}{' '}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                }}>
                <strong>Course:</strong> {studentDetails.course}{' '}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MainCard>
  )
}

export default StaffProfile
