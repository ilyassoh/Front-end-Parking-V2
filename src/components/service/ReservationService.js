import axios from "axios";


class ReservationService{
    static BASE_URL = "http://localhost:1010"

    // static async login(email, password){
    //     try{
    //         const response = await axios.post(`${ReservationService.BASE_URL}/auth/login`, {email, password})
    //         return response.data;

    //     }catch(err){
    //         throw err;
    //     }
    // }

    // static async register(userData, token){
    //     try{
    //         const response = await axios.post(`${ReservationService.BASE_URL}/auth/register`, userData, 
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }

    static async getAllReservation(token){
        try{
            const response = await axios.get(`${ReservationService.BASE_URL}/api/reservation`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    // static async getYourProfile(token){
    //     try{
    //         const response = await axios.get(`${ReservationService.BASE_URL}/adminuser/get-profile`, 
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }

    // static async getUserById(userId, token){
    //     try{
    //         const response = await axios.get(`${ReservationService.BASE_URL}/admin/get-users/${userId}`, 
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }

    static async deleteReservation(userId, token){
        try{
            const response = await axios.delete(`${ReservationService.BASE_URL}/api/reservation${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    // static async updateUser(userId, userData, token){
    //     try{
    //         const response = await axios.put(`${ReservationService.BASE_URL}/admin/update/${userId}`, userData,
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err){
    //         throw err;
    //     }
    // }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default ReservationService;