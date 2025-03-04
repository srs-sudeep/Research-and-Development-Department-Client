import apiClient from 'core/api/apiConfig'

const API_ENDPOINT = '/auth/login'

export const loginApi = async (phone, password) => {
  try {
    // Send the phone and password to the backend for authentication
    const response = await apiClient.post(API_ENDPOINT, {
      phone,
      password,
    })
    const { user, tokens } = response.data
    localStorage.setItem('refreshToken', tokens.refresh.token)
    localStorage.setItem('accessToken', tokens.access.token)
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('user', user.name)
    localStorage.setItem('id', user.id)
    console.log(user)
    if (user.role === 'student') {
      localStorage.setItem('program', user.program)
    }
    return { user, tokens }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
};
