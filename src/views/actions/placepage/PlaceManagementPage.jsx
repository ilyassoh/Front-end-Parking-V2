import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlaceService from '../service/PlaceService';

function PlaceManagementPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);
  const fetchPlaces = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await PlaceService.findAll(token);
      if (Array.isArray(response)) {
        setPlaces(response);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching parkings:', error);
    }
  };
  const deletePlace = async (placeId) => {
    try {
      const token = localStorage.getItem('token');
      const confirmDelete = window.confirm('Are you sure you want to delete this place?');
      if (confirmDelete) {
        await PlaceService.deletePlace(placeId, token);
        fetchPlaces();
      }
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  return (
    <div className="place-management-container">
      <h2>Place Management Page</h2>
      <button className="reg-button">
        <Link to="/add-place" className="color-button">Add Place</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map(place => (
            <tr key={place.id}>
              <td>{place.id}</td>
              <td>{place.status}</td>
              <td>{place.type}</td>
              <td>
                <button className="delete-button" onClick={() => deletePlace(place.id)}>Delete</button>
                <Link to={`/update-place/${place.id}`} className="white-link">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlaceManagementPage;
