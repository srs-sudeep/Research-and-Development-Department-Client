import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/courses'

const registerCourse = async (body = {}) => {
  try {
    const response = await apiClient.post(API_ENDPOINT, body)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register course',
    )
  }
}

export default registerCourse
