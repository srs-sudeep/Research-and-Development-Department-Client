import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/payrole'

const updatePayrole = async (payroleId, updateData) => {
  const response = await apiClient.put(
    `${API_ENDPOINT}/${payroleId}`,
    updateData,
  )
  return response.data
}
export default updatePayrole
