import apiClient from './client';

export async function planTrip(payload) {
  const response = await apiClient.post('/trips/plan/', payload);
  return response.data;
}

export async function listTrips() {
  const response = await apiClient.get('/trips/');
  return response.data;
}

export async function getTrip(id) {
  const response = await apiClient.get(`/trips/${id}/`);
  return response.data;
}
