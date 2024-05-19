import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientService from 'src/components/service/ClientService';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

function UpdateClient() {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const [clientData, setClientData] = useState({
        numeroMatricule: '',
        numeroTelephone: '',
        adresse: '',
        nom: '',
        email: '',
        genre: '',
        age: 0
    });

    useEffect(() => {
        fetchClientDataById(clientId);
    }, [clientId]);

    const fetchClientDataById = async (clientId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ClientService.getClientById(clientId, token);
            const { numeroMatricule, numeroTelephone, adresse, nom, email, genre, age } = response.client_model;
            setClientData({ numeroMatricule, numeroTelephone, adresse, nom, email, genre, age });
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevClientData) => ({
            ...prevClientData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this client?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ClientService.updateClient(clientId, clientData, token);
                console.log(res);
                // Redirect to profile page or display a success message
                navigate("/admin/client-management");
            }
        } catch (error) {
            console.error('Error updating client profile:', error);
            alert('Error updating client: ' + error.message);
        }
    };

    return (
        <CContainer className="auth-container">
            <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                        <CCardBody className="p-4">
                            <h2>Update Client</h2>
                            <CForm onSubmit={handleSubmit}>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Matricule</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="numeroMatricule"
                                        value={clientData.numeroMatricule}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Telephone</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="numeroTelephone"
                                        value={clientData.numeroTelephone}
                                        onChange={handleInputChange}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Adresse</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="adresse"
                                        value={clientData.adresse}
                                        onChange={handleInputChange}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Nom</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="nom"
                                        value={clientData.nom}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Email</CInputGroupText>
                                    <CFormInput
                                        type="email"
                                        name="email"
                                        value={clientData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Genre</CInputGroupText>
                                    <CFormInput
                                        type="text"
                                        name="genre"
                                        value={clientData.genre}
                                        onChange={handleInputChange}
                                    />
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>Age</CInputGroupText>
                                    <CFormInput
                                        type="number"
                                        name="age"
                                        value={clientData.age}
                                        onChange={handleInputChange}
                                    />
                                </CInputGroup>
                                <div className="d-grid">
                                    <CButton type="submit" color="info">Update Client</CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default UpdateClient;
