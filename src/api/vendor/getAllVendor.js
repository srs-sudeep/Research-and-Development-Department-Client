import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/vendors'

const getAllVendors = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create orders')
  }
}

export default getAllVendors
