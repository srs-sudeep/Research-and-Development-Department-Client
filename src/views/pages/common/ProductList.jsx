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
  CardMedia,
} from '@mui/material'
import { getAllVendors, getVendorProducts } from 'api' // Assuming API functions are imported

const ProductList = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [products, setProducts] = useState([]) // State for products of the selected vendor
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState([])

  // Fetch all vendors on component mount
  useEffect(() => {
    const loadVendors = async () => {
      const data = await getAllVendors()
      console.log(data)
      setVendors(data) // Assume 'results' contains the list of vendors
      if (data.length > 0) {
        setSelectedVendor(data[0]._id) // Set the first vendor's _id as default
      }
    }
    loadVendors()
  }, [])

  // Fetch products whenever a vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      const fetchProducts = async () => {
        const productsData = await getVendorProducts(selectedVendor) // Backend API call
        setProducts(productsData)
      }
      fetchProducts()
    }
  }, [selectedVendor])

  // Handle dialog for orders (optional, depends on your actual structure)
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
        Vendor Products
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Vendor</InputLabel>
        <Select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)} // Ensure _id is selected
        >
          {vendors.map((vendor) => (
            <MenuItem key={vendor._id} value={vendor._id}>
              {vendor.userDetails.name}{' '}
              {/* Display vendor name from userDetails */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                {/* Add CardMedia to display the image */}
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl} // Assuming imageUrl is the field with image URL
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Product: {product.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Quantity:</strong> {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ width: '100%' }}>
            No products available for the selected vendor.
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
