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
import { getAllProfessors } from 'api' // Change the API import to fetch professor data

const ProfessorList = () => {
  const [professors, setProfessors] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('firstName')
  const [totalProfessors, setTotalProfessors] = useState(0) // For pagination
  const [selectedProfessor, setSelectedProfessor] = useState(null) // For modal
  const [open, setOpen] = useState(false) // Modal open state

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getAllProfessors() // Fetch professors from API
      setProfessors(data)
      setTotalProfessors(data.length)
    } catch (error) {
      console.error('Error fetching professors:', error.message)
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

  const handleRowClick = (professor) => {
    setSelectedProfessor(professor)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProfessor(null)
  }

  return (
    <MainCard title="Professor List">
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
              {professors.map((professor) => (
                <TableRow
                  key={professor.userId}
                  hover
                  onClick={() => handleRowClick(professor)}>
                  <TableCell>{professor.idNumber}</TableCell>
                  <TableCell>{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalProfessors} // Total count of all professor entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying professor details */}
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
            {selectedProfessor && (
              <>
                <Typography variant="h1" gutterBottom>
                  Professor Details
                </Typography>
                <Typography variant="body1">
                  <strong>ID Number:</strong>
                  {selectedProfessor.idNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedProfessor.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedProfessor.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {selectedProfessor.phoneNumber}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  )
}

export default ProfessorList
