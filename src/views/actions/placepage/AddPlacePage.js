import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceService from 'src/components/service/PlaceService';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';

function AddPlacePage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        status: '',
        type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await PlaceService.createPlace(formData, token);
            setFormData({
                status: '',
                type: ''
            });
            alert('Place added successfully');
            navigate('/admin/place-management');
        } catch (error) {
            console.error('Error adding place:', error);
            alert('An error occurred while adding the place');
        }
    };
    return (
        <div className="auth-container">
            <CContainer className="auth-container">
            <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                        <CCardBody className="p-4">
                            <CForm onSubmit={handleSubmit}>
                                <h2>Add Place</h2>
                                <div className="form-group mb-3">
                                    <CFormLabel>Status:</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <CFormLabel>Type:</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <CButton type="submit" color="primary">
                                        Add Place
                                    </CButton>
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

export default AddPlacePage;
