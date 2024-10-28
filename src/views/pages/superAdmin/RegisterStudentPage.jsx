import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import registerStudent from 'api/superadmin/registerStudent'

const RegisterStudentPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    ldap: '',
    idNumber: '',
    program: '',
    department: '',
    validupto: '',
    dob: '',
    emergencyphone: '',
    bloodgroup: '',
    signature_filename: '',
    issuerauthority: '',
    addr1: '',
    addr2: '',
    aadhar: '',
    doj: '',
    studenttype: '',
    photo_filename: '',
    gender: '',
    uid: '',
    totalAmount: '',
  })

  const [errors, setErrors] = useState({})

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const genderOptions = ['Male', 'Female', 'Other']
  const studentTypes = ['B.Tech', 'M.Tech', 'M.Sc', 'PhD']

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password validation (minimum 8 characters, at least one number and one letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with one letter and one number'
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }
    if (!phoneRegex.test(formData.emergencyphone)) {
      newErrors.emergencyphone = 'Emergency phone number must be 10 digits'
    }

    // Aadhar validation
    if (formData.aadhar.length !== 12 || !/^\d+$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar number must be 12 digits'
    }

    // Required field validation
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
        registerStudent(formData)
        console.log('Form submitted:', formData)
        alert('Student registered successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to register student')
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
        Student Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Personal Information */}
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
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Academic Information
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
              label="Program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              error={!!errors.program}
              helperText={errors.program}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Valid Upto"
              name="validupto"
              value={formData.validupto}
              onChange={handleChange}
              error={!!errors.validupto}
              helperText={errors.validupto}
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

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Emergency Phone"
              name="emergencyphone"
              value={formData.emergencyphone}
              onChange={handleChange}
              error={!!errors.emergencyphone}
              helperText={errors.emergencyphone}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Blood Group"
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
              error={!!errors.bloodgroup}
              helperText={errors.bloodgroup}
              required>
              {bloodGroups.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              label="Aadhar Number"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              error={!!errors.aadhar}
              helperText={errors.aadhar}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Total Amount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              error={!!errors.totalAmount}
              helperText={errors.totalAmount}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Student Type"
              name="studenttype"
              value={formData.studenttype}
              onChange={handleChange}
              error={!!errors.studenttype}
              helperText={errors.studenttype}
              required>
              {studentTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="UID"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              error={!!errors.uid}
              helperText={errors.uid}
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

          {/* File Uploads */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Photo Filename"
              name="photo_filename"
              value={formData.photo_filename}
              onChange={handleChange}
              error={!!errors.photo_filename}
              helperText={errors.photo_filename}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Signature Filename"
              name="signature_filename"
              value={formData.signature_filename}
              onChange={handleChange}
              error={!!errors.signature_filename}
              helperText={errors.signature_filename}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}>
              Register Student
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default RegisterStudentPage
