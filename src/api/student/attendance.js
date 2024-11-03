import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/attendance'

export const getAttendanceByDateForStudent = async (date, courseCode) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}/student/date`, {
      params: {
        date,
        ...(courseCode && { courseCode }),
      },
    })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch attendance',
    )
  }
}
