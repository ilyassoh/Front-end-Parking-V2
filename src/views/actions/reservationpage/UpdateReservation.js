import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReservationService from 'src/components/service/ReservationService';
import ParkingService from 'src/components/service/ParkingService';
import PlaceService from 'src/components/service/PlaceService';
import ClientService from 'src/components/service/ClientService';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow
} from '@coreui/react';

function UpdateReservation() {
    const navigate = useNavigate();
    const { reservationId } = useParams();

    const [reservationData, setReservationData] = useState({
        status: '',
        placeId: '',
        parkingId: '',
        clientId: ''
    });

    const [places, setPlaces] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchReservationDataById(reservationId);
        fetchPlaces();
        fetchParkings();
        fetchClients();
    }, [reservationId]);

    const fetchReservationDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ReservationService.getReservationById(id, token);
            const { status, placeId, parkingId, clientId } = response;
            setReservationData({ status, placeId, parkingId, clientId });
        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    };

    const fetchPlaces = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await PlaceService.findAll(token);
            setPlaces(response);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    const fetchParkings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ParkingService.findAll(token);
            setParkings(response);
        } catch (error) {
            console.error('Error fetching parkings:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ClientService.getAllClients(token);
            setClients(response);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData((prevReservationData) => ({
            ...prevReservationData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this reservation?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ReservationService.editReservation(reservationId, reservationData, token);
                console.log(res);
                navigate("/reservations");
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Error updating reservation: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <CContainer className="auth-container">
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <h2>Update Reservation</h2>
                                <CForm onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Status:</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="status"
                                            value={reservationData.status}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Place:</CFormLabel>
                                        <CFormSelect
                                            name="placeId"
                                            value={reservationData.placeId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Place</option>
                                            {places.map((place) => (
                                                <option key={place.id} value={place.id}>{place.id}</option>
                                            ))}
                                        </CFormSelect>
                                    </div>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Parking:</CFormLabel>
                                        <CFormSelect
                                            name="parkingId"
                                            value={reservationData.parkingId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Parking</option>
                                            {parkings.map((parking) => (
                                                <option key={parking.id} value={parking.id}>{parking.nom}</option>
                                            ))}
                                        </CFormSelect>
                                    </div>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Client:</CFormLabel>
                                        <CFormSelect
                                            name="clientId"
                                            value={reservationData.clientId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Client</option>
                                            {clients.map((client) => (
                                                <option key={client.id} value={client.id}>{client.nom}</option>
                                            ))}
                                        </CFormSelect>
                                    </div>
                                    <CButton type="submit" color="primary">Update Reservation</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default UpdateReservation;
