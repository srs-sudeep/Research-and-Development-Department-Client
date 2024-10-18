import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

// Mock function to simulate fetching vendors and their transaction data from an API
const fetchVendorsAndTransactions = async () => {
  return [
    {
      id: 1,
      name: 'Vendor A',
      transactions: [
        {
          id: 1,
          date: '2024-10-10',
          amount: 300,
          orders: [
            { id: 1, product: 'Product 1', quantity: 2 },
            { id: 2, product: 'Product 2', quantity: 1 },
          ],
        },
        {
          id: 2,
          date: '2024-10-15',
          amount: 500,
          orders: [
            { id: 3, product: 'Product 3', quantity: 3 },
            { id: 4, product: 'Product 4', quantity: 2 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Vendor B',
      transactions: [
        {
          id: 3,
          date: '2024-10-12',
          amount: 400,
          orders: [
            { id: 5, product: 'Product 5', quantity: 5 },
            { id: 6, product: 'Product 6', quantity: 4 },
          ],
        },
      ],
    },
  ]
}

const ProductList = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [transactions, setTransactions] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVendorsAndTransactions()
      setVendors(data)
      if (data.length > 0) {
        setSelectedVendor(data[0].id) // Set the first vendor as default
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (selectedVendor) {
      const vendor = vendors.find((v) => v.id === selectedVendor)
      setTransactions(vendor ? vendor.transactions : [])
    }
  }, [selectedVendor, vendors])

  const handleTransactionClick = (orders) => {
    setSelectedOrders(orders)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedOrders([])
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vendor Transactions
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Vendor</InputLabel>
        <Select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(Number(e.target.value))}>
          {vendors.map((vendor) => (
            <MenuItem key={vendor.id} value={vendor.id}>
              {vendor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Grid item xs={12} sm={6} md={4} key={transaction.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Date: {transaction.date}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Transaction Amount:</strong> ${transaction.amount}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleTransactionClick(transaction.orders)}
                    sx={{ mt: 2 }}>
                    View Orders
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ width: '100%' }}>
            No transactions available for the selected vendor.
          </Typography>
        )}
      </Grid>

      {/* Dialog for displaying selected orders */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Orders</DialogTitle>
        <DialogContent>
          {selectedOrders.length > 0 ? (
            selectedOrders.map((order) => (
              <Typography key={order.id}>
                {order.product} (Quantity: {order.quantity})
              </Typography>
            ))
          ) : (
            <Typography>No orders available for this transaction.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductList
