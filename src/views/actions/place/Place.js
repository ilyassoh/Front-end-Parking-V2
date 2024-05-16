import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';

const PlaceComponent = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace with your actual auth token
                const response = await fetch('http://localhost:1010/api/place', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPlaces(data);
                } else {
                    throw new Error('Failed to fetch places');
                }
            } catch (error) {
                console.error('Error fetching places:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
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
                        <CTableHeaderCell>Date Creation</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Type</CTableHeaderCell>
                        {/* Add more headers as needed */}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {places.map(place => (
                        <CTableRow key={place.id}>
                            <CTableDataCell>{place.id}</CTableDataCell>
                            <CTableDataCell>{place.dateCreation}</CTableDataCell>
                            <CTableDataCell>{place.status}</CTableDataCell>
                            <CTableDataCell>{place.type}</CTableDataCell>
                            {/* Add more cells for other place properties */}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default PlaceComponent;
