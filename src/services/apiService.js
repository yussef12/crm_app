import axiosInstance from './axios'
import {GET_USER_TOKEN_DATA} from "@/store/constants";
import  store from '@/store/store'

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getters[ `auth/${GET_USER_TOKEN_DATA}`]
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const apiService = {


    get(resource) {
        return axiosInstance.get(resource);
    },

    post(resource, data) {
        return axiosInstance.post(resource, data);
    },

    put(resource, data) {
        return axiosInstance.put(resource, data);
    },

    delete(resource) {
        return axiosInstance.delete(resource);
    },
};

export default apiService;
