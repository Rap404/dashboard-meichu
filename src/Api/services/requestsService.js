import axiosInstance from "../axiosConfig";

export const requestsService = {
    getAllData: async () => {
        try {
            const response = await axiosInstance.get('requests');
            return response.data;
        } catch (error){
            throw error;
        }
    },

    searchRequests: async (query) => {
        try {
            const response = await axiosInstance.get(`requests/search?query=${query}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRequests: async (data) => {
        try {
            const response = await axiosInstance.post('/requests',  data);
            return response.data;
        } catch(error){
            throw error;
        }
    },

    updateRequests: async (id, data) => {
        try {
            const response = await axiosInstance.put(`requests/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteRequests: async (id) => {
        try {
            const response = await axiosInstance.delete(`requests/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}