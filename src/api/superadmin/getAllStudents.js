import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/students'

const getAllStudents = async (params = {}) => {
  try {
    const response = await apiClient.get(API_ENDPOINT, { params })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch students',
    )
  }
}

export default getAllStudents
