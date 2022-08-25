import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewVehicle from '@/pages/vehicle/new-vehicle';

function VehiclesRoutes() {
  return (
    <Routes>
      <Route path="new" element={<NewVehicle />} />
    </Routes>
  );
}

export default VehiclesRoutes;
