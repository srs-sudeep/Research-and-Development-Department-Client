import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/staffs'

const getIndiStaff = async (staffId) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/${staffId}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch staff details',
    )
  }
}

export default getIndiStaff
