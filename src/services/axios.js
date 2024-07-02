import axios from 'axios';
const baseURL = process.env.VUE_APP_BASE_API ||"http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
    baseURL: baseURL, // Your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;