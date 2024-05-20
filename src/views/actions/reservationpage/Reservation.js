import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReservationService from 'src/components/service/ReservationService';
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


function ReservationManagementPage() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ReservationService.getAllReservations('', token);
            if (Array.isArray(response)) {
                setReservations(response);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const deleteReservation = async (reservationId) => {
        try {
            const token = localStorage.getItem('token');
            const confirmDelete = window.confirm('Are you sure you want to delete this reservation?');
            if (confirmDelete) {
                await ReservationService.deleteReservation(reservationId, token);
                fetchReservations();
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div className="reservation-management-container">
            <CContainer className="reservations-management-container">
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        <h2>Reservations Management Page</h2>
                        <CButton color="primary" className="reg-button" as={Link} to="/actions/add-reservation">
                            Add Reservation
                        </CButton>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Date Entrée</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Date Sortie</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Place ID</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Parking ID</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Client ID</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {reservations.map(reservation => (
                                    <CTableRow key={reservation.id}>
                                        <CTableDataCell>{reservation.id}</CTableDataCell>
                                        <CTableDataCell>{reservation.date_entree}</CTableDataCell>
                                        <CTableDataCell>{reservation.date_sortie}</CTableDataCell>
                                        <CTableDataCell>{reservation.status}</CTableDataCell>
                                        <CTableDataCell>{reservation.placeId}</CTableDataCell>
                                        <CTableDataCell>{reservation.parkingId}</CTableDataCell>
                                        <CTableDataCell>{reservation.clientId}</CTableDataCell>
                                        <CTableDataCell className="text-end">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton
                                                    className="me-md-2 delete-button"
                                                    color="danger"
                                                    shape="rounded-pill"
                                                    onClick={() => deleteReservation(reservation.id)}
                                                >
                                                    Delete
                                                </CButton>
                                                <CButton 
                                                color="info" shape="rounded-pill" as={Link} to={`/actions/update-reservation/${reservation.id}`}>Update
                                                </CButton>
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
}

export default ReservationManagementPage;

