import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientService from 'src/components/service/ClientService';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';

function AddClientPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        numeroMatricule: '',
        numeroTelephone: '',
        adresse: '',
        nom: '',
        email: '',
        genre: '',
        age: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await ClientService.createClient(formData, token);
            // Clear the form fields after successful registration
            setFormData({
                numeroMatricule: '',
                numeroTelephone: '',
                adresse: '',
                nom: '',
                email: '',
                genre: '',
                age: 0
            });
            alert('Client added successfully');
            navigate('/admin/client-management');

        } catch (error) {
            console.error('Error adding client:', error);
            alert('An error occurred while adding the client');
        }
    };

    return (
        <div>
            <CContainer className="auth-container">
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <h2>Add Client</h2>
                                <CForm onSubmit={handleSubmit}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Matricule</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            name="numeroMatricule"
                                            value={formData.numeroMatricule}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Telephone</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            name="numeroTelephone"
                                            value={formData.numeroTelephone}
                                            onChange={handleInputChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Adresse</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleInputChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Nom</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Email</CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Genre</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleInputChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Age</CInputGroupText>
                                        <CFormInput
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton type="submit" color="primary">Add Client</CButton>
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

export default AddClientPage;
