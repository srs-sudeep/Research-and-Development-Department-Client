import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/staffs'

const updateProject = async (id, projectData) => {
  try {
    const response = await apiClient.put(`${API_ENDPOINT}/${id}`,projectData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch staff details')
  }
}

export default updateProject