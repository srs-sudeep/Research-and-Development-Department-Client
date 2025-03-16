import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { useEffect, useState } from 'react'

import registerProject from 'api/superadmin/registerProject'
import { getAllUsers } from 'api'

const RegisterProjectPage = () => {
  const [professors, setProfessors] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getAllUsers()
      const professor = response.results
        .filter((user) => user.role === 'professor')
        .map((user) => ({
          name: user.name,
          ldap: user.ldap,
        }))
      setProfessors(professor)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    PI: '', // Now a single value, not an array
    coPI: [],
    startDate: '',
    endDate: '',
    staffList: [],
    fund: 0,
    isCompleted: 'false', // Updated to string 'false' by default for radio buttons
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = 'Project name is required'
    }
    if (!formData.projectId) {
      newErrors.projectId = 'Project ID is required'
    }
    if (!formData.PI) {
      newErrors.PI = 'PI is required' // Now checking for a single value
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (!formData.fund) {
      newErrors.fund = 'Project fund is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await registerProject(formData)
        console.log('Form submitted:', formData)
        alert('Project registered successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to register project')
      }
    } else {
      console.log('Form validation failed')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePIChange = (event) => {
    const { value } = event.target
    setFormData((prev) => ({
      ...prev,
      PI: value, // Set PI to a single value
    }))
  }

  const handleCoPIChange = (event) => {
    const { value } = event.target
    setFormData((prev) => ({
      ...prev,
      coPI: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleIsCompletedChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      isCompleted: event.target.value, // Set the project completion status
    }))
  }

  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Project ID"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              error={!!errors.projectId}
              helperText={errors.projectId}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>PI</InputLabel>
              <Select
                name="PI"
                value={formData.PI}
                onChange={handlePIChange}
                input={<OutlinedInput label="PI" />}>
                {professors.map((professor) => (
                  <MenuItem key={professor.ldap} value={professor.ldap}>
                    {professor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>CoPI</InputLabel>
              <Select
                multiple
                name="coPI"
                value={formData.coPI}
                onChange={handleCoPIChange}
                input={<OutlinedInput label="Co-PI" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selected.map((ldap) => {
                      const professor = professors.find(
                        (prof) => prof.ldap === ldap,
                      )
                      return (
                        <Chip
                          key={ldap}
                          label={professor ? professor.name : ldap}
                          sx={{ m: 0.5 }}
                        />
                      )
                    })}
                  </Box>
                )}>
                {professors.map((professor) => (
                  <MenuItem key={professor.ldap} value={professor.ldap}>
                    {professor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={!!errors.startDate}
              helperText={errors.startDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              error={!!errors.endDate}
              helperText={errors.endDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Project Fund"
              name="fund"
              value={formData.fund}
              onChange={handleChange}
              error={!!errors.fund}
              helperText={errors.fund}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Completion Status
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="isCompleted"
                value={formData.isCompleted}
                onChange={handleIsCompletedChange}>
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Completed"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Not Completed"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}>
              Register Project
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default RegisterProjectPage
