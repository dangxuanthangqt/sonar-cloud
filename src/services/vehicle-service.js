import request from './request';

export const getVehicleSchema = () => request.get('/api/v1/vehicles/schema');

export const getVehicles = () => request.get('/api/v1/vehicles');

export const getPlants = () => request.get('/api/v1/plants');
