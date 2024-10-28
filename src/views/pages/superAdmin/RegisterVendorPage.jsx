import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import registerVendor from 'api/superadmin/registerVendor'

const RegisterVendorPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    idNumber: '',
    ldap: '',
    phoneNumber: '',
    issuerauthority: '',
    addr1: '',
    addr2: '',
    businessRegistrationNumber: '',
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with one letter and one number'
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }
    if (!phoneRegex.test(formData.emergencyphone)) {
      newErrors.emergencyphone = 'Emergency phone number must be 10 digits'
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
        registerVendor(formData)
        console.log('Form submitted:', formData)
        alert('Vendor registered successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to register vendor')
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
        Vendor Registration
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
              label="Issuer Authority"
              name="issuerauthority"
              value={formData.issuerauthority}
              onChange={handleChange}
              error={!!errors.issuerauthority}
              helperText={errors.issuerauthority}
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

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}>
              Register Vendor
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default RegisterVendorPage
