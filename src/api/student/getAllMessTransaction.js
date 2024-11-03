import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/messTransactions/studentId'

const getAllMessTransaction = async () => {
  try {
    const response = await apiClient.get(`${API_ENDPOINT}`)
    console.log('All Mess Transaction', response.data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch professors',
    )
  }
}

export default getAllMessTransaction
