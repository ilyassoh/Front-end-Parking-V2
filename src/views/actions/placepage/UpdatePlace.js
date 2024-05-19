import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaceService from 'src/components/service/PlaceService';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';

function UpdatePlace() {
    const navigate = useNavigate();
    const { placeId } = useParams();

    const [placeData, setPlaceData] = useState({
        status: '',
        type: ''
    });

    useEffect(() => {
        fetchPlaceDataById(placeId);
    }, [placeId]);

    const fetchPlaceDataById = async (placeId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await PlaceService.getPlaceById(placeId, token);
            const { status, type } = response.place_model;
            setPlaceData({ status, type });
        } catch (error) {
            console.error('Error fetching place data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlaceData((prevPlaceData) => ({
            ...prevPlaceData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this place?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                await PlaceService.editPlace(placeId, placeData, token);
                alert('Place updated successfully');
                navigate("/admin/place-management");
            }
        } catch (error) {
            console.error('Error updating place:', error);
            alert('An error occurred while updating the place');
        }
    };

    return (
        <div>
            <CContainer className="auth-container">
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleSubmit}>
                                    <h2>Update Place</h2>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Status:</CFormLabel>
                                        <CFormInput
                                            placeholder="status"
                                            type="text"
                                            name="status"
                                            autoComplete="status"
                                            value={placeData.status}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <CFormLabel>Type:</CFormLabel>
                                        <CFormInput
                                            placeholder="type"
                                            type="text"
                                            name="type"
                                            autoComplete="type"
                                            value={placeData.type}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <CButton type="submit" color="info">
                                            Update Place
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

export default UpdatePlace;
