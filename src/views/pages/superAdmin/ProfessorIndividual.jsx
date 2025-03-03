import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  Stack,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { getIndiProfessor, updateProfessor } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const ProfessorIndividual = () => {
  const { id } = useParams()
  const [professorData, setProfessorData] = useState({
    name: '',
    email: '',
    idNumber: '',
    ldap: '',
    phoneNumber: '',
    dob: '',
    designation: '',
    department: '',
    gender: '',
    addr1: '',
    addr2: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    fetchProfessorDetails()
  }, [id])

  const fetchProfessorDetails = async () => {
    try {
      setLoading(true)
      const data = await getIndiProfessor(id)
      const formattedData = {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
      }
      setProfessorData(formattedData[0])
      setOriginalData(formattedData[0])
    } catch (error) {
      console.error('Error fetching professor details:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create a new variable for only the required fields
  const requiredProfessorData = {
    name: professorData.name,
    password: professorData.password,
    email: professorData.email,
    idNumber: professorData.idNumber,
    ldap: professorData.ldap,
    phoneNumber: professorData.phoneNumber,
    dob: professorData.dob,
    designation: professorData.designation,
    department: professorData.department,
    gender: professorData.gender,
    addr1: professorData.addr1,
    addr2: professorData.addr2,
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfessorData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      console.log(requiredProfessorData)
      await updateProfessor(id, requiredProfessorData) // Send only required fields
      setIsEditing(false)
      fetchProfessorDetails()
    } catch (error) {
      console.error('Error updating professor details:', error)
    }
  }

  const handleCancel = () => {
    setProfessorData(originalData)
    setIsEditing(false)
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <MainCard title="Professor Profile">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">{professorData.name}'s Profile</Typography>
          <Stack direction="row" spacing={1}>
            {isEditing ? (
              <>
                <IconButton onClick={handleSave} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={() => setIsEditing(true)} color="primary">
                <EditIcon />
              </IconButton>
            )}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={requiredProfessorData.name || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={requiredProfessorData.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={requiredProfessorData.phoneNumber || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={requiredProfessorData.dob || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Gender"
                name="gender"
                value={requiredProfessorData.gender || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Professional Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="LDAP ID"
                name="ldap"
                value={requiredProfessorData.ldap || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="ID Number"
                name="idNumber"
                value={requiredProfessorData.idNumber || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Department"
                name="department"
                value={requiredProfessorData.department || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Designation"
                name="designation"
                value={requiredProfessorData.designation || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Address Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Address Line 1"
                name="addr1"
                value={requiredProfessorData.addr1 || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Address Line 2"
                name="addr2"
                value={requiredProfessorData.addr2 || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  )
}

export default ProfessorIndividual
