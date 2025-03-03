import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/payrole/staff'

const getPayroleStaff = async () => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch staff details',
    )
  }
}

export default getPayroleStaff
