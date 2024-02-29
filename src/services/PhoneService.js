import axios from 'axios';

const BASE_URL = 'https://localhost:44359/api/mobilephone';

export async function getMobilePhones(query) {
    try {
        const response = await axios.get(`${BASE_URL}${query}`);
        if(response.status === 200){
            return [response.data.items, response.data.totalPages];
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export async function deleteMobilePhone(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.status;
    } catch (error) {
        throw error;
    }
};

export async function addMobilePhone(phone) {
    try {
        const response = await axios.post(BASE_URL, phone);
        return response.status;
    } catch (error) {
        throw error;
    }
}

export async function updateMobilePhone(id, phone) {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, phone);
        return response.status;
    } catch (error) {
        throw error;
    }
}