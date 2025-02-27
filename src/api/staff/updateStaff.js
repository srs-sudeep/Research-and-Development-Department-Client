import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/staffs'

const updateStaff = async (staffId, staffData) => {
  try {
    const response = await apiClient.put(`${API_ENDPOINT}/${staffId}`,staffData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch staff details')
  }
}

export default updateStaff