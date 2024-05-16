import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "src/components/service/UserService";

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'



function UpdateUser() {
    const navigate = useNavigate();
    const { userId } = useParams();


    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        city: ''
    });

    useEffect(() => {
        fetchUserDataById(userId); // Pass the userId to fetchUserDataById
    }, [userId]); //wheen ever there is a chane in userId, run this

    const fetchUserDataById = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
            const { name, email, role, city } = response.ourUsers;
            setUserData({ name, email, role, city });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                const res = await UserService.updateUser(userId, userData, token);
                console.log(res)
                // Redirect to profile page or display a success message
                navigate("/admin/user-management")
            }

        } catch (error) {
            console.error('Error updating user profile:', error);
            alert(error)
        }
    };

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleSubmit}>
                                    <h1>Register</h1>
                                    <p className="text-body-secondary">Update user account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Username" autoComplete="username" value={userData.name} onChange={handleInputChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Email" autoComplete="email" value={userData.email} onChange={handleInputChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Role" autoComplete="role" value={userData.role} onChange={handleInputChange} />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton type="submit" color="info">Update</CButton>
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

export default UpdateUser;