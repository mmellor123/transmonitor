import axios from "axios";
const BASE_URL = "https:/s2.transactionmonitor.co.uk"

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    HEADERS: {'Content-Type': 'application/json'},
    withCredentials: true
});