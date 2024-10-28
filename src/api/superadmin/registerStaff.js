import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/staffs'

const registerStaff = async (body = {}) => {
  try {
    const response = await apiClient.post(API_ENDPOINT, body)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register staff')
  }
}

export default registerStaff
