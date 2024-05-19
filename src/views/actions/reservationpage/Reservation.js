// Import statements remain the same
import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const ReservationComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your actual auth token
        const response = await fetch('http://localhost:1010/api/reservation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const deleteReservation = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1010/api/reservation/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setReservations(reservations.filter(reservation => reservation.id !== id));
        console.log(`Deleted reservation with ID: ${id}`);
      } else {
        throw new Error('Failed to delete reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token'); // Replace with your actual auth token
      const response = await fetch(`http://localhost:1010/api/reservation/${id}/updateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        // Update the reservation status locally
        setReservations(prevState =>
          prevState.map(reservation =>
            reservation.id === id ? { ...reservation, status } : reservation
          )
        );
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Display an error message to the user
    }
  };

  // const getClientName = async (clientId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`http://localhost:1010/api/client/${clientId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.nom; // Assuming 'nom' is the client name property
  //     } else {
  //       throw new Error('Failed to fetch client');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching client:', error);
  //     return 'Unknown'; // Return a default value if client fetch fails
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Date Entrée</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Date Sortie</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Place ID</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Parking ID</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Client Name</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reservations.map(reservation => (
            <CTableRow key={reservation.id}>
              <CTableHeaderCell scope="row">{reservation.id}</CTableHeaderCell>
              <CTableDataCell>{reservation.date_entree}</CTableDataCell>
              <CTableDataCell>{reservation.date_sortie}</CTableDataCell>
              <CTableDataCell>{reservation.status}</CTableDataCell>
              <CTableDataCell>{reservation.placeId}</CTableDataCell>
              <CTableDataCell>{reservation.parkingId}</CTableDataCell>
              <CTableDataCell>{reservation.clientId}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select"
                    value={reservation.status}
                    onChange={(e) => updateStatus(reservation.id, e.target.value)}
                  >
                    <option value="confirmée">Confirmée</option>
                    <option value="en_attente">En attente</option>
                    <option value="annulée">Annulée</option>
                  </select>
                  <CButton className="me-md-2 delete-button" color="danger" shape="rounded-pill" onClick={() => deleteReservation(reservation.id)}>Delete</CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ReservationComponent;
