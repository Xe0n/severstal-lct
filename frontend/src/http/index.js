import axios from 'axios'

export const API_URL = `http://87.242.92.136:8000/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
}) 

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})
$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            console.log('refresh token get')
            const refresh = localStorage.getItem('refreshToken')
            const response = await axios.post(`${API_URL}token/refresh/`, {refresh})
            localStorage.setItem('accessToken', response.data.access)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error
})

export default $api