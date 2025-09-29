import axios from 'axios';

// === RUTA ADAPTADA: Usa VITE_REACT_APP_API_URL ===
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/contact`;
// ================================================

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const sendContactMessage = async (contactData) => {
    try {
        // Usa API_URL con la ruta corregida
        const response = await axios.post(API_URL, contactData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al enviar el mensaje');
    }
};

// --- FUNCIÓN MODIFICADA ---
export const fetchAllMessages = async (status = 'pending') => {
    try {
        const response = await api.get(`/admin?status=${status}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener los mensajes de soporte');
    }
};

export const replyToMessage = async (messageId, replyMessage) => {
    try {
        const response = await api.post(`/admin/${messageId}/reply`, { replyMessage });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al enviar la respuesta');
    }
};