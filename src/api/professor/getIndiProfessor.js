import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/professors'

const getIndiProfessor = async (professorId) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/${professorId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch professorw details')
  }
}

export default getIndiProfessor
