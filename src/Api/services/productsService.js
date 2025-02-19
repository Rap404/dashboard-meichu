import axiosInstance from "../axiosConfig";

export const productsService = {
    getAllData: async () => {
        try {
            const response = await axiosInstance.get('products');
            return response.data;
        } catch (error){
            throw error;
        }
    },

    searchProducts: async (query) => {
        try {
            const response = await axiosInstance.get(`products/search?query=${query}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProducts: async (data) => {
        try {
            const response = await axiosInstance.post('/products',  data);
            return response.data;
        } catch(error){
            throw error;
        }
    },

    updateProducts: async (id, data) => {
        try {
            const response = await axiosInstance.put(`products/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteProducts: async (id) => {
        try {
            const response = await axiosInstance.delete(`products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}