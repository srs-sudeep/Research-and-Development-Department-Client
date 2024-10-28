import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/professors'

const registerProfessor = async (body = {}) => {
  try {
    const response = await apiClient.post(API_ENDPOINT, body)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register professor',
    )
  }
}

export default registerProfessor
