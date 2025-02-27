import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/payrole'

const getPayroleProfessor = async () => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/professor`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses')
  }
}
export default getPayroleProfessor;