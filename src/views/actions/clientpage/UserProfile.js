import React, { useState, useEffect } from 'react';
import UserService from 'src/components/service/UserService';



function UserProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchUserProfileInfo();
    }, []);

    const fetchUserProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="userprofile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>Role: {profileInfo.role}</p>
        </div>
    );
}

export default UserProfilePage;