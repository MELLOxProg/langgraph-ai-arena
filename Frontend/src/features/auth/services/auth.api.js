import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`
const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true })
export const register = async (payload) => (await api.post('/api/auth/register', payload)).data
export const login = async (payload) => (await api.post('/api/auth/login', payload)).data
export const getMe = async () => (await api.get('/api/auth/get-me')).data
export const logout = async () => (await api.get('/api/auth/logout')).data