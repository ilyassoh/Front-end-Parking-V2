import axios from "axios";

class ClientService {
    static BASE_URL = "http://localhost:1010/api/client";

    static async getAllClients(token) {
        try {
            const response = await axios.get(ClientService.BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createClient(clientData, token) {
        try {
            const response = await axios.post(ClientService.BASE_URL, clientData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateClient(id, clientData, token) {
        try {
            const response = await axios.put(`${ClientService.BASE_URL}/${id}`, clientData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteClient(id, token) {
        try {
            const response = await axios.delete(`${ClientService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getClientById(id, token) {
        try {
            const response = await axios.get(`${ClientService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ClientService;
