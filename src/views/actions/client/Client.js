import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';

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

    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell>Nom</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>numeroMatricule</CTableHeaderCell>
                        <CTableHeaderCell>numeroTelephone</CTableHeaderCell>
                        <CTableHeaderCell>age</CTableHeaderCell>
                        
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
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default ClientComponent;
