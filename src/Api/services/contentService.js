import axiosInstance from "../axiosConfig"

export const frontImageService =  {
    getAllImages: async () => {
        try {
            const response = await axiosInstance.get('/banner-images');
            return response.data;
        } catch (error){
            throw error;
        }
    },

    createImage: async (imageData) => {
        try {
            const response = await axiosInstance.post('/banner-images',  { data: { image: imageData } });
            return response.data;
        } catch(error){
            throw error;
        }
    },

    updateImage: async (id, imageData) => {
        try {
            const response = await axiosInstance.put(`banner-images/${id}`, { data: { image: imageData }});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`banner-images/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const customImageService = {
    
    getAllImages: async () => {
        try {
            const response = await axiosInstance.get('/custom-images');
            return response.data;
        } catch (error){
            throw error;
        }
    },

    createImage: async (imageData) => {
        try {
            const response = await axiosInstance.post('/custom-images',  { data: { image: imageData } });
            return response.data;
        } catch(error){
            throw error;
        }
    },

    updateImage: async (id, imageData) => {
        try {
            const response = await axiosInstance.put(`custom-images/${id}`, { data: { image: imageData }});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`custom-images/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}