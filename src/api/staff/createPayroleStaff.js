import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/payrole'

const createPayrole = async (data) => {
  try {
    const response = await apiClient.post(`${API_ENDPOINT}`,data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch staff details')
  }
}

export default createPayrole