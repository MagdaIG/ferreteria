import axios from "axios";

const API_BASE_URL = "https://raw.githubusercontent.com/shaka0241/ferreteria_Api/main/";

export const getAuthData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}login.json`);
        return response.data.login;
    } catch (error) {
        console.error("Error fetching authentication data:", error);
        throw error;
    }
};

export const registerUser = async () => {
    try {
        return await axios.get(`${API_BASE_URL}registroreq.json`);
    } catch (error) {
        console.error("Error fetching registration data:", error);
        throw error;
    }
};

export const getRegisterConfirmation = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}registroresp.json`);
        return response.data.respuestaRegistro;
    } catch (error) {
        console.error("Error fetching registration confirmation data:", error);
        throw error;
    }
};

export const getHomeData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}home.json`);
        return response.data;
    } catch (error) {
        console.error("Error fetching home data:", error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}productos.json`);
        return response.data.productos;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};