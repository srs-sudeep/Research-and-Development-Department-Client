import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/users'

const getIndiStaff = async (id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user details',
    )
  }
}

export default getIndiStaff
