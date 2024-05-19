import axios from "axios";

class ParkingService {
    static BASE_URL = "http://localhost:1010/api/parking";

    static async getParkingById(id, token) {
        try {
            const response = await axios.get(`${ParkingService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAll(token) {
        try {
            const response = await axios.get(ParkingService.BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getAllStatus(token) {
        try {
            const response = await axios.get(`${ParkingService.BASE_URL}/status`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findByEmplacement(emplacement,token) {
        try {
            const response = await axios.get(`${ParkingService.BASE_URL}/emplacement/${emplacement}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findByNom(nom,token) {
        try {
            const response = await axios.get(`${ParkingService.BASE_URL}/nom/${nom}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async createParking(parkingData,token) {
        try {
            const response = await axios.post(ParkingService.BASE_URL, parkingData , {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async updateParking(id, parkingData, token) {
        try {
            const response = await axios.put(`${ParkingService.BASE_URL}/${id}`, parkingData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async deleteParking(id,token) {
        try {
            const response = await axios.delete(`${ParkingService.BASE_URL}/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default ParkingService;
