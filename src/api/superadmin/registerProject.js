import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/projects'

const registerProject = async (body = {}) => {
  try {
    const response = await apiClient.post(API_ENDPOINT, body)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register project',
    )
  }
}

export default registerProject
