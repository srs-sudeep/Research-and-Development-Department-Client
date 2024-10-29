import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/visitlogs'

export const getVisitLogsForDate = async (date) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}`, {
      params: {
        date,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch visit logs',
    )
  }
}
