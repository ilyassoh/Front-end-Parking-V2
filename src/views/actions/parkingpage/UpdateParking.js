import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParkingService from 'src/components/service/ParkingService';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow
  } from '@coreui/react';

function UpdateParking() {
    const navigate = useNavigate();
    const { parkingId } = useParams();

    const [parkingData, setParkingData] = useState({
        nom: '',
        emplacement: '',
        capaciteTotale: 0,
        placesDisponibles: 0,
        status: ''
    });

    useEffect(() => {
        fetchParkingDataById(parkingId);
    }, [parkingId]);

    const fetchParkingDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ParkingService.getParkingById(id, token);
            const { nom, emplacement, capaciteTotale, placesDisponibles, status } = response;
            setParkingData({ nom, emplacement, capaciteTotale, placesDisponibles, status });
        } catch (error) {
            console.error('Error fetching parking data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParkingData((prevParkingData) => ({
            ...prevParkingData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this parking?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ParkingService.updateParking(parkingId, parkingData, token);
                console.log(res);
                // Redirect to parking management page or display a success message
                navigate("/admin/parking-management");
            }
        } catch (error) {
            console.error('Error updating parking:', error);
            alert('Error updating parking: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <CContainer className="update-parking-container">
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard>
                            <CCardBody>
                                <h2>Update Parking</h2>
                                <CForm onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="nom">Nom:</CFormLabel>
                                        <CFormInput type="text" id="nom" name="nom" value={parkingData.nom} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="emplacement">Emplacement:</CFormLabel>
                                        <CFormInput type="text" id="emplacement" name="emplacement" value={parkingData.emplacement} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="capaciteTotale">Capacité Totale:</CFormLabel>
                                        <CFormInput type="number" id="capaciteTotale" name="capaciteTotale" value={parkingData.capaciteTotale} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="placesDisponibles">Places Disponibles:</CFormLabel>
                                        <CFormInput type="number" id="placesDisponibles" name="placesDisponibles" value={parkingData.placesDisponibles} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="status">Status:</CFormLabel>
                                        <CFormInput type="text" id="status" name="status" value={parkingData.status} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CButton type="submit" color="primary">Update Parking</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default UpdateParking;
