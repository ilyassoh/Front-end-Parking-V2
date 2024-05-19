import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from "src/components/service/UserService";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'



function UsersCrud() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (

    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary ">Name</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
      {users.map(user => (
        <CTableRow key={user.id}>
          <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
          <CTableDataCell>{user.name}</CTableDataCell>
          <CTableDataCell>{user.email}</CTableDataCell>
          <CTableDataCell >
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton className="me-md-2 delete-button" color="danger" shape="rounded-pill"  onClick={() => deleteUser(user.id)}>Delete</CButton>
            <CButton color="danger" shape="rounded-pill"><Link to={`/actions/userspage/${user.id}`}>Update</Link></CButton>
          </div>
            </CTableDataCell>
        </CTableRow>
      ))}
      </CTableBody>
    </CTable>

  )
}

export default UsersCrud;