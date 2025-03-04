import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import registerStaff from 'api/superadmin/registerStaff'
import { getAllProjects } from 'api'

const RegisterStaffPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    ldap: '',
    idNumber: '',
    upto: '',
    dob: '',
    projectId: '',
    salary: 0,
    addr1: '',
    addr2: '',
    doj: '',
    employmenttype: '',
    gender: '',
  })

  const [errors, setErrors] = useState({})
  const [projects, setProjects] = useState([]) // State for storing fetched projects

  const genderOptions = ['Male', 'Female', 'Other']
  const employmentTypes = ['Permanent', 'Contractual', 'Visiting']

  // Fetch all projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects()
        setProjects(fetchedProjects) // Update the state with fetched projects
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    fetchProjects()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // if (!passwordRegex.test(formData.password)) {
    //   newErrors.password =
    //     'Password must be at least 8 characters with one letter and one number'
    // }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && formData[key] !== 0) {
        newErrors[key] = 'This field is required'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        registerStaff(formData)
        console.log('Form submitted:', formData)
        alert('Staff registered successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to register staff')
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

  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Staff Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
              required>
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option.toLowerCase()}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Employment Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="LDAP ID"
              name="ldap"
              value={formData.ldap}
              onChange={handleChange}
              error={!!errors.ldap}
              helperText={errors.ldap}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ID Number"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              error={!!errors.idNumber}
              helperText={errors.idNumber}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Valid Upto"
              name="upto"
              value={formData.upto}
              onChange={handleChange}
              error={!!errors.upto}
              helperText={errors.upto}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Joining"
              name="doj"
              value={formData.doj}
              onChange={handleChange}
              error={!!errors.doj}
              helperText={errors.doj}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Project"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              error={!!errors.projectId}
              helperText={errors.projectId}
              required>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project._id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addr1"
              value={formData.addr1}
              onChange={handleChange}
              error={!!errors.addr1}
              helperText={errors.addr1}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addr2"
              value={formData.addr2}
              onChange={handleChange}
              error={!!errors.addr2}
              helperText={errors.addr2}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Employment Type"
              name="employmenttype"
              value={formData.employmenttype}
              onChange={handleChange}
              error={!!errors.employmenttype}
              helperText={errors.employmenttype}
              required>
              {employmentTypes.map((type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default RegisterStaffPage
