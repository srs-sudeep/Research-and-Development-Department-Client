import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/wallet/balance'

export const getBalance = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT)
    return response.data.balance
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch balance')
  }
}
