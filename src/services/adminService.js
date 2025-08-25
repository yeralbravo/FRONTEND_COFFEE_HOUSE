import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Obtiene las estadísticas del dashboard principal del administrador.
 * @param {string} range - 'day', 'week', 'month', 'year', 'all'.
 */
export const getDashboardStats = async (range) => {
    try {
        const response = await api.get(`/stats?range=${range}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener las estadísticas del dashboard');
    }
};

/**
 * Obtiene las estadísticas de la página de Ventas.
 */
export const fetchSalesStats = async (range) => {
    try {
        const response = await api.get(`/stats/sales?range=${range}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener estadísticas de ventas');
    }
};

/**
 * Obtiene las estadísticas de la página de Productos.
 */
export const fetchProductStats = async (range) => {
    try {
        const response = await api.get(`/stats/products?range=${range}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener estadísticas de productos');
    }
};

/**
 * Obtiene las estadísticas de la página de Usuarios.
 */
export const fetchUserStats = async (range) => {
    try {
        const response = await api.get(`/stats/users?range=${range}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener estadísticas de usuarios');
    }
};

/**
 * Obtiene las estadísticas de la página de Pedidos.
 */
export const fetchOrderStats = async (range) => {
    try {
        const response = await api.get(`/stats/orders?range=${range}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener estadísticas de pedidos');
    }
};