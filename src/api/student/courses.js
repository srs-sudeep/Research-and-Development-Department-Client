import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/courses'

export const getCoursesForStudent = async () => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/student`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses')
  }
}
