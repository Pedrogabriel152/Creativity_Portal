import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost/api/'
});

api.defaults.withCredentials = true;

export {api};