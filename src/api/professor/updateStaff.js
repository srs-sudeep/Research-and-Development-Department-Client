import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/professors'

const updateProfessor = async (professorId, professorData) => {
  try {
    const response = await apiClient.patch(`${API_ENDPOINT}/${professorId}`,professorData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch professor details')
  }
}

export default updateProfessor