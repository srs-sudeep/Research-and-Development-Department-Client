import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getAllStaff } from 'api'; // Change to getAllStaff

const StaffList = () => {
  const [staff, setStaff] = useState([]); // Change professors to staff
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [totalStaff, setTotalStaff] = useState(0); // For pagination
  const [selectedStaff, setSelectedStaff] = useState(null); // For modal
  const [open, setOpen] = useState(false); // Modal open state

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchTerm, order, orderBy]);

  const fetchData = async () => {
    try {
      const params = {
        page: page + 1, // API expects a 1-based page index
        limit: rowsPerPage,
        searchTerm, // Pass the search term for filtering
      };

      const data = await getAllStaff(); // Fetch staff from API
      const { results, totalResults } = data;
      setStaff(results); // Set staff instead of professors
      setTotalStaff(totalResults); // Update total count for staff
    } catch (error) {
      console.error('Error fetching staff:', error.message); // Update error message
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (staff) => { // Update parameter to staff
    setSelectedStaff(staff); // Set selected staff instead of professor
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null); // Reset selected staff
  };

  return (
    <MainCard title="Staff List"> {/* Update title */}
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
                    active={orderBy === 'firstName'}
                    direction={orderBy === 'firstName' ? order : 'asc'}
                    onClick={() => handleRequestSort('firstName')}>
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lastName'}
                    direction={orderBy === 'lastName' ? order : 'asc'}
                    onClick={() => handleRequestSort('lastName')}>
                    Last Name
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
              {staff.map((staffMember) => ( // Update mapping
                <TableRow
                  key={staffMember._id}
                  hover
                  onClick={() => handleRowClick(staffMember)}> {/* Update parameter */}
                  <TableCell>{staffMember.firstName}</TableCell>
                  <TableCell>{staffMember.lastName}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalStaff} // Update total count
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
            {selectedStaff && ( // Update selected staff
              <>
                <Typography variant="h1" gutterBottom>
                  Staff Details {/* Update title */}
                </Typography>
                <Typography variant="body1">
                  <strong>First Name:</strong> {selectedStaff.firstName}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {selectedStaff.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedStaff.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong>{' '}
                  {selectedStaff.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Joined At:</strong>{' '}
                  {new Date(selectedStaff.joinedAt).toLocaleString()}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  );
};

export default StaffList;
