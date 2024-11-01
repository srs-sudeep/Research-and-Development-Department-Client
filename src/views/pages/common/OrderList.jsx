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
import { getAllOrdersById } from '../../../api'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('createdAt')
  const [totalOrders, setTotalOrders] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [page, rowsPerPage, searchTerm, order, orderBy])

  // Simulate fetch data from API
  const fetchOrders = async () => {
    const responseData = await getAllOrdersById()
    console.log("This is the respons: ", responseData);
    setOrders(responseData)
    setTotalOrders(responseData.length)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFC107'
      case 'confirmed':
        return '#4CAF50'
      case 'failed':
        return '#F44336'
      default:
        return '#000'
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRowClick = (order) => {
    setSelectedOrder(order)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedOrder(null)
  }

  return (
    <MainCard title="Order List">
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
                    active={orderBy === 'userName'}
                    direction={orderBy === 'userName' ? order : 'asc'}
                    onClick={() => handleRequestSort('userName')}>
                    User Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'totalAmount'}
                    direction={orderBy === 'totalAmount' ? order : 'asc'}
                    onClick={() => handleRequestSort('totalAmount')}>
                    Total Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}>
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'createdAt'}
                    direction={orderBy === 'createdAt' ? order : 'asc'}
                    onClick={() => handleRequestSort('createdAt')}>
                    Created At
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    onClick={() => handleRowClick(order)}>
                    <TableCell>{order.userId.name}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color: getStatusColor(order.status),
                          fontWeight: 'bold',
                        }}>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                    {selectedOrder && selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() :  new Date(Date.now).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalOrders}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Modal for displaying order details */}
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
            {selectedOrder && (
              <>
                <Typography variant="h1" gutterBottom>
                  Order Details
                </Typography>
                <Typography variant="body1">
                  <strong>User Name:</strong> {selectedOrder.userName}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Amount:</strong> {selectedOrder.totalAmount}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedOrder.status}
                </Typography>
                <Typography variant="body1">
                  <strong>Created At:</strong>{' '}
                  {selectedOrder && selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'Date not available'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Items:</strong>
                </Typography>
                {selectedOrder.items.map((item, index) => (
                  <Typography key={index} variant="body2">
                    {`Product ID: ${item.productName}, Quantity: ${item.quantity}, Price: ${item.price}`}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  )
}

export default OrderList
