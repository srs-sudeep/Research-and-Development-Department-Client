import apiClient from 'core/api/apiConfig'

const getIndiHospital = async () => {
  try {
    const response = await apiClient.get('/hospitals/indi') // Endpoint without ID
    console.log('response', response.data)
    return response.data // Directly return the response data as it's already the desired format
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error fetching hospital beds',
    )
  }
}

export default getIndiHospital
