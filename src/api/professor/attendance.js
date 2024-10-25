import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/attendance'

export const getAttendanceForProfessor = async (
  selectedDate,
  selectedCourseCode,
) => {
  if (!selectedCourseCode) {
    return []
  }

  try {
    const response = await apiClient.get(`${API_ENDPOINT}/professor/date`, {
      params: {
        date: selectedDate,
        courseCode: selectedCourseCode,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses')
  }
}
