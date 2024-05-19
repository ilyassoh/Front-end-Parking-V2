import React, { useState, useEffect } from 'react';
import { CButton, CCol, CContainer, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Link } from 'react-router-dom';


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

    const deletePlace = async (placeId) => {
        try {
          const token = localStorage.getItem('token');
          const confirmDelete = window.confirm('Are you sure you want to delete this place?');
          if (confirmDelete) {
            await PlaceService.deletePlace(placeId, token);
            fetchPlaces();
          }
        } catch (error) {
          console.error('Error deleting place:', error);
        }
      };

    return (
        <div>
                    <CContainer className="places-management-container">
            <CRow className="justify-content-center">
                <CCol md={12}>
                    <h2>Places Management Page</h2>
                    <CButton color="primary" className="reg-button" as={Link} to="/actions/add-place">
                        Add Place
                    </CButton>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Date Creation</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Type</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
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
                                    <CTableDataCell>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <CButton className="me-md-2 delete-button" color="danger" shape="rounded-pill" onClick={() => deletePlace(place.id)}>Delete</CButton>
                                            <CButton color="primary" shape="rounded-pill" as={Link} to={`/actions/update-place/${place.id}`} className="white-link">Update</CButton>
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

export default PlaceComponent;
