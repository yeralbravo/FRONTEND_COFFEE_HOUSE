    import axios from 'axios';

    // === BASE URL ===
    const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    if (!API_BASE_URL) {
    console.warn("⚠️ No se encontró VITE_REACT_APP_API_URL, usando localhost (solo para desarrollo).");
    }

    const API_URL = `${API_BASE_URL || 'http://localhost:5000'}/api/supplier-requests`;
    // ======================

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

    // --- Validación en tiempo real ---
    export const validateField = async (field, value) => {
    try {
        const response = await axios.post(`${API_URL}/validate`, { field, value });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al validar el campo');
    }
    };

    // --- Obtener todas las solicitudes (solo admin) ---
    export const getAllRequests = async (status) => {
    try {
        const response = await api.get(`/admin?status=${status}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener las solicitudes');
    }
    };

    // --- Cambiar estado de una solicitud ---
    export const updateRequestStatus = async (requestId, status) => {
    try {
        const response = await api.put(`/admin/${requestId}/status`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al actualizar la solicitud');
    }
    };
