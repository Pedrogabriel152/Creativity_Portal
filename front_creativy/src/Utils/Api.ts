import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.defaults.withCredentials = true;

export {api};