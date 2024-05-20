import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function AddParkingPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        emplacement: '',
        capaciteTotale: 0,
        placesDisponibles: 0,
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await ParkingService.createParking(formData, token);
            // Clear the form fields after successful addition
            setFormData({
                nom: '',
                emplacement: '',
                capaciteTotale: 0,
                placesDisponibles: 0,
                status: ''
            });
            alert('Parking added successfully');
            navigate('/admin/parking-management');
        } catch (error) {
            console.error('Error adding parking:', error);
            alert('An error occurred while adding the parking');
        }
    };

    return (
        <div className="auth-container">
            <CContainer className="add-parking-container">
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard>
                            <CCardBody>
                                <h2>Add Parking</h2>
                                <CForm onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="nom">Nom:</CFormLabel>
                                        <CFormInput type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="emplacement">Emplacement:</CFormLabel>
                                        <CFormInput type="text" id="emplacement" name="emplacement" value={formData.emplacement} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="capaciteTotale">Capacité Totale:</CFormLabel>
                                        <CFormInput type="number" id="capaciteTotale" name="capaciteTotale" value={formData.capaciteTotale} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="placesDisponibles">Places Disponibles:</CFormLabel>
                                        <CFormInput type="number" id="placesDisponibles" name="placesDisponibles" value={formData.placesDisponibles} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CFormLabel htmlFor="status">Status:</CFormLabel>
                                        <CFormInput type="text" id="status" name="status" value={formData.status} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <CButton type="submit" color="primary">Add Parking</CButton>
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

export default AddParkingPage;
