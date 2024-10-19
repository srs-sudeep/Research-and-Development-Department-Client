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

// Mock functions to simulate API calls
const getCoursesScheduledForToday = () => {
  return new Promise((resolve) => {
    const mockCourses = [
      { code: 'CS101', title: 'Introduction to Computer Science' },
      { code: 'CS102', title: 'Data Structures' },
      { code: 'CS103', title: 'Algorithms' },
      { code: 'CS104', title: 'Web Development' },
      { code: 'CS105', title: 'Database Management Systems' },
    ]
    resolve(mockCourses)
  })
}

const getAttendanceByDate = (selectedDate, selectedCourseCode) => {
  return new Promise((resolve) => {
    // Mock attendance data based on selected course
    const mockAttendanceData = [
      {
        id: 1,
        courseCode: 'CS101',
        roomNo: '10/12/24',
        inTime: '9:00 AM',
        outTime: '10:00 AM',
      },
      {
        id: 2,
        courseCode: 'CS102',
        roomNo: '10/12/24',
        inTime: '10:00 AM',
        outTime: '11:00 AM',
      },
      {
        id: 3,
        courseCode: 'CS104',
        roomNo: '10/12/24',
        inTime: '11:00 AM',
        outTime: '12:00 PM',
      },
      {
        id: 4,
        courseCode: 'CS104',
        roomNo: '10/12/24',
        inTime: '1:00 PM',
        outTime: '2:00 PM',
      },
      {
        id: 5,
        courseCode: 'CS104',
        roomNo: '10/12/24',
        inTime: '2:00 PM',
        outTime: '3:00 PM',
      },
      {
        id: 6,
        courseCode: 'CS105',
        roomNo: '10/12/24',
        inTime: '3:00 PM',
        outTime: '4:00 PM',
      },
    ];

    // Filter by course code if selected
    const filteredData = selectedCourseCode
      ? mockAttendanceData.filter(
          (record) => record.courseCode === selectedCourseCode,
        )
      : mockAttendanceData

    resolve(filteredData)
  })
}

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
      const data = await getCoursesScheduledForToday()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error.message)
    }
  }

  const fetchAttendance = async () => {
    try {
      const data = await getAttendanceByDate(selectedDate, selectedCourseCode)
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>In Time</TableCell>
                <TableCell>Out Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((attendanceRecord) => (
                  <TableRow key={attendanceRecord.id}>
                    <TableCell>{attendanceRecord.roomNo}</TableCell>
                    <TableCell>{attendanceRecord.inTime}</TableCell>
                    <TableCell>{attendanceRecord.outTime}</TableCell>{' '}
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
