import axiosInstance from "../axiosConfig";

export const customCategoryService = {
        getAllData: async () => {
            try {
                const response = await axiosInstance.get('custom-categories');
                return response.data;
            } catch (error){
                throw error;
            }
        },

        getCategory: async (uuid) => {
            try {
                const response = await axiosInstance.get(`custom-categories/${uuid}`);
                return response.data;
            } catch (error){
                throw error;
            }
        },

        searchCategories: async (query) => {
            try {
                const response = await axiosInstance.get(`custom-categories/search?query=${query}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    
        createCategory: async (data) => {
            try {
                const response = await axiosInstance.post('/custom-categories',  data);
                return response.data;
            } catch(error){
                throw error;
            }
        },
    
        updateCategory: async (id, data) => {
            try {
                const response = await axiosInstance.put(`custom-categories/${id}`, data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    
        deleteCategory: async (id) => {
            try {
                const response = await axiosInstance.delete(`custom-categories/${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
    }
}