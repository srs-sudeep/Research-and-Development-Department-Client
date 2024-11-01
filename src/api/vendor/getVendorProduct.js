import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/vendors'

const getVendorProducts = async (vendorId) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/${vendorId}/products`)
    console.log('This is the vendor product', response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create orders')
  }
}

export default getVendorProducts
