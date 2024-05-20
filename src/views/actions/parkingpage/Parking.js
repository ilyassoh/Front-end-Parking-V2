import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParkingService from 'src/components/service/ParkingService';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';

function ParkingManagementPage() {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await ParkingService.findAll(token);
      if (Array.isArray(response)) {
        setParkings(response);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching parkings:', error);
    }
  };

  const deleteParking = async (parkingId) => {
    try {
      const token = localStorage.getItem('token');
      const confirmDelete = window.confirm('Are you sure you want to delete this parking?');
      if (confirmDelete) {
        await ParkingService.deleteParking(parkingId, token);
        fetchParkings();
      }
    } catch (error) {
      console.error('Error deleting parking:', error);
    }
  };

  return (
    <div className="parking-management-container">
      <CContainer className="parking-management-container">
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCard>
              <CCardBody>
                <h2>Parking Management Page</h2>
                <CButton color="primary" className="reg-button" as={Link} to="/add-parking">
                  Add Parking
                </CButton>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Location</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Total Capacity</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Available Spaces</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {parkings.map(parking => (
                      <CTableRow key={parking.id}>
                        <CTableDataCell>{parking.id}</CTableDataCell>
                        <CTableDataCell>{parking.nom}</CTableDataCell>
                        <CTableDataCell>{parking.emplacement}</CTableDataCell>
                        <CTableDataCell>{parking.capaciteTotale}</CTableDataCell>
                        <CTableDataCell>{parking.placesDisponibles}</CTableDataCell>
                        <CTableDataCell>{parking.status}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton className="me-md-2 delete-button" color="danger" shape="rounded-pill" onClick={() => deleteParking(parking.id)}>Delete</CButton>
                            <CButton 
                            color="info" shape="rounded-pill" as={Link} to={`/actions/update-parking/${parking.id}`}>Update
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default ParkingManagementPage;
