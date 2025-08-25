import React, { useState, useEffect, useCallback } from 'react';
import { getAllRequests, updateRequestStatus } from '../services/supplierRequestService';
import { useAlerts } from '../hooks/useAlerts';
import { FiCheck, FiX } from 'react-icons/fi';
import '../style/UserList.css';
import '../style/AdminPanel.css';

const SupplierRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const { showSuccessAlert, showErrorAlert, showConfirmDialog } = useAlerts();

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllRequests(filter);
            if (response.success) {
                setRequests(response.data);
            }
        } catch (error) {
            showErrorAlert(error.message);
        } finally {
            setLoading(false);
        }
    }, [filter, showErrorAlert]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleUpdateStatus = (request, newStatus) => {
        const action = newStatus === 'approved' ? 'aprobar' : 'rechazar';
        showConfirmDialog({
            title: `¿Estás seguro?`,
            text: `Vas a ${action} la solicitud de ${request.company_name}.`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateRequestStatus(request.id, newStatus);
                    showSuccessAlert(response.message);
                    fetchRequests();
                } catch (error) {
                    showErrorAlert(error.message);
                }
            }
        });
    };

    return (
        <>
            <header className="admin-header">
                <h1>Solicitudes de Proveedores</h1>
                <div className="filter-tabs">
                    <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pendientes</button>
                    <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Aprobadas</button>
                    <button onClick={() => setFilter('rejected')} className={filter === 'rejected' ? 'active' : ''}>Rechazadas</button>
                </div>
            </header>

            {loading ? <p>Cargando solicitudes...</p> : (
                <div className="list-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Contacto</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Fecha de Solicitud</th>
                                {filter === 'pending' && <th>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map(req => (
                                    <tr key={req.id}>
                                        <td>{req.company_name}</td>
                                        <td>{req.contact_person}</td>
                                        <td>{req.email}</td>
                                        <td>{req.phone}</td>
                                        <td>{new Date(req.created_at).toLocaleDateString()}</td>
                                        {filter === 'pending' && (
                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={() => handleUpdateStatus(req, 'approved')} className="action-btn approve-btn" title="Aprobar"><FiCheck /></button>
                                                    <button onClick={() => handleUpdateStatus(req, 'rejected')} className="action-btn delete-btn" title="Rechazar"><FiX /></button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={filter === 'pending' ? 6 : 5} style={{ textAlign: 'center', padding: '2rem' }}>
                                        No hay solicitudes en la bandeja de "{filter}".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default SupplierRequestsPage;