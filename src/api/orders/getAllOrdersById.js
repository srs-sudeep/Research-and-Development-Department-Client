import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/orders'

const getAllOrdersById = async () => {
    const response = await apiClient.get(`${API_ENDPOINT}/user/1`)
    console.log("This is the response: ", response);
    return response.data
}

export default getAllOrdersById
