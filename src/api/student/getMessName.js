import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/mess/name'

export const getMessName = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch mess name',
    )
  }
}
