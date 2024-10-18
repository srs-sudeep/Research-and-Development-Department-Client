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
import { getAllVendors } from 'api'; // API call for fetching vendors

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [totalVendors, setTotalVendors] = useState(0); // For pagination
  const [selectedVendor, setSelectedVendor] = useState(null); // For modal
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

      const data = await getAllVendors(); // Fetch vendors from API
      const { results, totalResults } = data;
      console.log(results)
      setVendors(results);
      setTotalVendors(totalResults);
    } catch (error) {
      console.error('Error fetching vendors:', error.message);
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

  const handleRowClick = (vendor) => {
    setSelectedVendor(vendor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVendor(null);
  };

  return (
    <MainCard title="Vendor List">
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
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}>
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'ldap'}
                    direction={orderBy === 'ldap' ? order : 'asc'}
                    onClick={() => handleRequestSort('ldap')}>
                    Ldap
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
              {vendors.map((vendor) => (
                <TableRow
                  key={vendor._id}
                  hover
                  onClick={() => handleRowClick(vendor)}>
                  <TableCell>{vendor.userDetails.name}</TableCell>
                  <TableCell>{vendor.userDetails.ldap}</TableCell>
                  <TableCell>{vendor.userDetails.email}</TableCell>
                  <TableCell>{vendor.userDetails.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalVendors} // Total count of all vendor entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying vendor details */}
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
            {selectedVendor && (
              <>
                <Typography variant="h1" gutterBottom>
                  Vendor Details
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedVendor.userDetails.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Ldap:</strong> {selectedVendor.userDetails.ldap}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedVendor.userDetails.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong>{' '}
                  {selectedVendor.userDetails.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Joined At:</strong>{' '}
                  {new Date(selectedVendor.joinedAt).toLocaleString()}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  );
};

export default VendorList;
