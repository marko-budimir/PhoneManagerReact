import axios from "axios";

const BASE_URL = "https://localhost:44359/api/shop";

export async function getShops() {
    try {
        const response = await axios.get(`${BASE_URL}`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
};