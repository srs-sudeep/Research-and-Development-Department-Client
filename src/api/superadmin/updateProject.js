import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/projects'

const updateProject = async (id, projectData) => {
  try {
    const response = await apiClient.patch(`${API_ENDPOINT}/${id}`, projectData)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch staff details',
    )
  }
}

export default updateProject
