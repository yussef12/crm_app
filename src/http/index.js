// apiService.js
import axios from 'axios';
import store from '@/store/store'
import {GET_USER_TOKEN_DATA} from "@/store/constants";

// Function to create an Axios instance with dynamic base URL
const createApiClient = (baseURL) => {


    const apiClient = axios.create({
        baseURL: baseURL, // Dynamic base URL
        headers: {
            'Content-Type': 'application/json',
        },
    });

    createApiClient.interceptors.request.use(
        (config) => {
            const token = store.getters[`auth/${GET_USER_TOKEN_DATA}`]; // Fetch token from store
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // // Add a request interceptor to include the Bearer token
    // apiClient.interceptors.request.use(
    //     (config) => {
    //         // Get the token from local storage or any storage mechanism you're using
    //         const token =store.getters[`auth/${GET_USER_TOKEN_DATA}`]
    //
    //         if (token) {
    //             config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzE4NjQ1NzY4LCJleHAiOjE3MTg2NDkzNjgsIm5iZiI6MTcxODY0NTc2OCwianRpIjoiUTN1bnBWN1kwc0tVMXh6WSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.cSNNROLmmPov3nEtLBd-C1UKU4mqpdZYlrowmxitGZs';
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    return apiClient;
};

// Create the API service methods
const apiService = {

    get(baseURL, resource) {
        const apiClient = createApiClient(baseURL);
        return apiClient.get(resource);
    },

    post(baseURL, resource, data) {
        const apiClient = createApiClient(baseURL);
        return apiClient.post(resource, data);
    },

    put(baseURL, resource, data) {
        const apiClient = createApiClient(baseURL);
        return apiClient.put(resource, data);
    },

    delete(baseURL, resource) {
        const apiClient = createApiClient(baseURL);
        return apiClient.delete(resource);
    },
};

export default apiService;
