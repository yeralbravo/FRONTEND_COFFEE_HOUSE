import axios from 'axios';

// === RUTA UNIFICADA: Usa VITE_REACT_APP_API_URL ===
// El valor de VITE_REACT_APP_API_URL debe ser la URL de tu API de Render (sin el /api).
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/search`;
// ================================================

export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${API_URL}?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al buscar productos');
    }
};