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
} from '@mui/material'

// Mock function to simulate fetching vendors and products data from an API
const fetchVendorsAndProducts = async () => {
  return [
    {
      id: 1,
      name: 'Vendor A',
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          quantity: 10,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Product 2',
          price: 200,
          quantity: 5,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
    {
      id: 2,
      name: 'Vendor B',
      products: [
        {
          id: 3,
          name: 'Product 3',
          price: 150,
          quantity: 8,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          name: 'Product 4',
          price: 250,
          quantity: 12,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
  ]
}

const ProductList = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVendorsAndProducts()
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
      setFilteredProducts(vendor ? vendor.products : [])
    }
  }, [selectedVendor, vendors])

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '4px',
                    }}
                  />
                  <Typography variant="h6" color="primary">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Quantity:</strong> {product.quantity}
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
    </Box>
  )
}

export default ProductList
