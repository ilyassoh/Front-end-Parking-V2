import axios from "axios";

class PlaceService {
    static BASE_URL = "http://localhost:1010/api/place";

    static async getPlaceById(id, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAll(token) {
        try {
            const response = await axios.get(PlaceService.BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getAllStatus(token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/status`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAllByType(type, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/type/${type}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAllByStatus(status, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/type/${status}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getAllTypes(token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/types`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
static async createPlace(placeData, token) {
    try {
        const response = await axios.post(PlaceService.BASE_URL, placeData , {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
    }
    static async editPlace(id, placeData, token) {
        try {
            const response = await axios.put(`${PlaceService.BASE_URL}/${id}`, placeData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async deletePlace(id, token) {
        try {
            const response = await axios.delete(`${PlaceService.BASE_URL}/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async countEmptyUnreservedPlaces(token) {
        try {
            const response = await this.axiosInstance(token).get('/empty-unreserved-count');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("Access forbidden: Token may be invalid or expired.");
            }
            throw error;
        }
    }
}

export default PlaceService;
