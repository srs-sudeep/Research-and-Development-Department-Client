import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import { getVisitLogsForStaff } from 'api/staff/visitlogs'
import { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    fetchAttendance()
  }, [selectedDate])

  const fetchAttendance = async () => {
    try {
      const data = await getVisitLogsForStaff(selectedDate)
      setAttendanceData(data)
    } catch (error) {
      console.error('Error fetching attendance:', error.message)
    }
  }

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value)
    setPage(0) // Reset to the first page on date change
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
                <TableCell>In Time</TableCell>
                <TableCell>Out Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((attendanceRecord) => (
                  <TableRow key={attendanceRecord.id}>
                    <TableCell>{attendanceRecord.inTime}</TableCell>
                    <TableCell>{attendanceRecord.outTime}</TableCell>{' '}
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
