import axios from 'axios';

// Usar una variable clara y simple (se inyecta en build time por Vite)
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

// DEBUG: para verificar en navegador (quítalo cuando funcione)
console.log('VITE_API_URL =>', import.meta.env.VITE_API_URL, ' | API_BASE =>', API_BASE);

// Base concreta para las rutas de supplier-requests
const SUPPLIER_BASE = `${API_BASE.replace(/\/$/, '')}/api/supplier-requests`;

const api = axios.create({
    baseURL: SUPPLIER_BASE,
});

// Interceptor para añadir token si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- VALIDACIÓN EN TIEMPO REAL (email/phone) ---
export const validateField = async (field, value) => {
    try {
        const response = await axios.post(`${SUPPLIER_BASE}/validate`, { field, value });
        return response.data;
    } catch (error) {
        // Si axios no tiene response, enviar mensaje genérico
        throw new Error(error.response?.data?.error || 'Error al validar el campo');
    }
};

export const getAllRequests = async (status) => {
    try {
        const response = await api.get(`/admin?status=${encodeURIComponent(status ?? '')}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener las solicitudes');
    }
};

export const updateRequestStatus = async (requestId, status) => {
    try {
        const response = await api.put(`/admin/${requestId}/status`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al actualizar la solicitud');
    }
};
