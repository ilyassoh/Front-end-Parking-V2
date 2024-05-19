import React, { useState, useEffect } from 'react';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CContainer,
    CRow,
    CCol

} from '@coreui/react';
import { Link } from 'react-router-dom';
import ClientService from 'src/components/service/ClientService';


const ClientComponent = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace with your actual auth token
                const response = await fetch('http://localhost:1010/api/client', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                } else {
                    throw new Error('Failed to fetch clients');
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const deleteClient = async (clientId) => {
        try {
            const token = localStorage.getItem('token');
            const confirmDelete = window.confirm('Are you sure you want to delete this client?');
            if (confirmDelete) {
                await ClientService.deleteClient(clientId, token);
                fetchClients();
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return (
        <div>
            <CContainer className="client-management-container">
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        <h2>Clients Management Page</h2>
                        <CButton color="primary" className="reg-button" as={Link} to="/actions/add-client">
                            Add Client
                        </CButton>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Nom</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">numeroMatricule</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">numeroTelephone</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">age</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {clients.map(client => (
                                    <CTableRow key={client.id}>
                                        <CTableDataCell>{client.id}</CTableDataCell>
                                        <CTableDataCell>{client.nom}</CTableDataCell>
                                        <CTableDataCell>{client.email}</CTableDataCell>
                                        <CTableDataCell>{client.numeroMatricule}</CTableDataCell>
                                        <CTableDataCell>{client.numeroTelephone}</CTableDataCell>
                                        <CTableDataCell>{client.age}</CTableDataCell>
                                        <CTableDataCell >
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton className="me-md-2 delete-button" color="danger" shape="rounded-pill" onClick={() => deleteClient(client.id)}>Delete</CButton>
                                                <CButton color="danger" shape="rounded-pill"><Link to={`/actions/update-client/${client.id}`} className="white-link">Update</Link></CButton>
                                            </div>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default ClientComponent;
