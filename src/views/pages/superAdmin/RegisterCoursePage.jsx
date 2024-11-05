import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  OutlinedInput,
  Chip,
} from '@mui/material'
import { useEffect, useState } from 'react'

import registerCourse from 'api/superadmin/registerCourse'
import getAllProfessors from 'api/superadmin/getAllProfessors'
import getAllStudents from 'api/superadmin/getAllStudents'

const RegisterStudentPage = () => {
  const [professors, setProfessors] = useState([])
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    professorId: '',
    courseName: '',
    courseCode: '',
    semester: '',
    students: [],
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getAllProfessors().then((data) => setProfessors(data))
    getAllStudents().then((data) => setStudents(data))
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Required field validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && formData[key] !== 0) {
        newErrors[key] = 'This field is required'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStudentChange = (event) => {
    const { value } = event.target
    setFormData((prev) => ({
      ...prev,
      students: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        registerCourse(formData)
        setFormData({
          professorId: '',
          courseName: '',
          courseCode: '',
          semester: '',
          students: [],
        })
        console.log('Form submitted:', formData)
        alert('Course registered successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to register course')
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
    console.log(formData)
  }

  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Typography variant="h4" className="mb-6" gutterBottom>
        Course Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              error={!!errors.courseName}
              helperText={errors.courseName}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Course Code"
              name="courseCode"
              type="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              error={!!errors.courseCode}
              helperText={errors.courseCode}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              error={!!errors.semester}
              helperText={errors.semester}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Professor"
              name="professorId"
              value={formData.professorId}
              onChange={handleChange}
              error={!!errors.professorId}
              helperText={errors.professorId}
              required>
              {professors?.map((professor) => (
                <MenuItem key={professor._id} value={professor._id}>
                  {professor.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="students-label">Students</InputLabel>
            <Select
              labelId="students-label"
              id="students"
              multiple
              fullWidth
              value={formData.students}
              onChange={handleStudentChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Students" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={
                        students.find((student) => student._id === value)?.name
                      }
                    />
                  ))}
                </Box>
              )}
              error={!!errors.students}
              required>
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}>
              Register Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default RegisterStudentPage
