import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { getCoursesForProfessor } from 'api/professor/courses'
import { getAttendanceForCourseByDate } from 'api/professor/attendance'

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  ) // Current date
  const [selectedCourseCode, setSelectedCourseCode] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    fetchCourses()
    fetchAttendance()
  }, [selectedDate, selectedCourseCode])

  const fetchCourses = async () => {
    try {
      const data = await getCoursesForProfessor()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error.message)
    }
  }

  const fetchAttendance = async () => {
    try {
      const data = await getAttendanceForCourseByDate(
        selectedDate,
        selectedCourseCode,
      )
      setAttendanceData(data)
    } catch (error) {
      console.error('Error fetching attendance:', error.message)
    }
  }

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value)
    setPage(0) // Reset to the first page on date change
  }

  const handleChangeCourseCode = (event) => {
    setSelectedCourseCode(event.target.value)
    setPage(0) // Reset to the first page on course code change
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to the first page on rows per page change
  }

  return (
    <MainCard title="Attendance Page">
      <Paper>
        <TextField
          label="Select Date"
          type="date"
          variant="outlined"
          value={selectedDate}
          onChange={handleChangeDate}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Course Code</InputLabel>
          <Select
            value={selectedCourseCode}
            onChange={handleChangeCourseCode}
            label="Course Code">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.code} value={course.code}>
                {course.code} - {course.title}{' '}
                {/* Assuming courses have code and title */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((attendanceRecord) => (
                  <TableRow key={attendanceRecord.id}>
                    <TableCell>{attendanceRecord.idNum}</TableCell>
                    <TableCell>{attendanceRecord.name}</TableCell>
                    <TableCell>{attendanceRecord.status}</TableCell>{' '}
                    {/* Present or Absent */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={attendanceData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainCard>
  )
}

export default AttendancePage
