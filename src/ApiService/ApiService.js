import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMedicals = async () => {
  try {
    const response = await apiService.get('/api/medicals');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicals:', error);
    throw error;
  }
};

export const fetchBills = async (medicalId) => {
  try {
    const response = await apiService.get(`/api/medicals/${medicalId}/bills`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bills for medical ${medicalId}:`, error);
    throw error;
  }
};

export const fetchBrands = async () => {
  try {
    const response = await apiService.get('/api/brands');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const fetchCities = async () => {
  try {
    const response = await apiService.get('/api/cities');
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
export const fetchMedicalsByCity = async (cityId) => {
    try {
      const response = await apiService.get(`/api/cities/${cityId}/medicals`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medicals for city ${cityId}:`, error);
      throw error;
    }
  };
  