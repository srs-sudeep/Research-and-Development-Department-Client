import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  TableSortLabel,
  Modal,
  Box,
  Fade,
  Typography,
  Backdrop,
} from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { getAllStaff } from 'api' // Change the API import to fetch staff data

const StaffList = () => {
  const [staff, setStaff] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('firstName')
  const [totalStaff, setTotalStaff] = useState(0) // For pagination
  const [selectedStaff, setSelectedStaff] = useState(null) // For modal
  const [open, setOpen] = useState(false) // Modal open state

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getAllStaff() // Fetch staff from API
      setStaff(data)
      setTotalStaff(data.length)
    } catch (error) {
      console.error('Error fetching staff:', error.message)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0) // Reset to first page when searching
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page when changing rows per page
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRowClick = (staff) => {
    setSelectedStaff(staff)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedStaff(null)
  }

  return (
    <MainCard title="Staff List">
      <Paper>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'idNumber'}
                    direction={orderBy === 'idNumber' ? order : 'asc'}
                    onClick={() => handleRequestSort('idNumber')}>
                    ID Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}>
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}>
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'phoneNumber'}
                    direction={orderBy === 'phoneNumber' ? order : 'asc'}
                    onClick={() => handleRequestSort('phoneNumber')}>
                    Phone Number
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map((staff) => (
                <TableRow
                  key={staff.userId}
                  hover
                  onClick={() => handleRowClick(staff)}>
                  <TableCell>{staff.idNumber}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalStaff} // Total count of all staff entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying staff details */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #white',
              boxShadow: 24,
              p: 4,
            }}>
            {selectedStaff && (
              <>
                <Typography variant="h1" gutterBottom>
                  Staff Details
                </Typography>
                <Typography variant="body1">
                  <strong>ID Number:</strong> {selectedStaff.idNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedStaff.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedStaff.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {selectedStaff.phoneNumber}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  )
}

export default StaffList
