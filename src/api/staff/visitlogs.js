import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/visitlogs'

export const getVisitLogsForStaff = async (date) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/staff`, {
      params: {
        date,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses')
  }
}
