import { Navigate, Route, Routes } from 'react-router-dom';
import DataSources from '@/pages/data-sources';
import Dates from '@/pages/dates';
import Keywords from '@/pages/keywords';
import Lops from '@/pages/lops';
import MuiGrid from '@/pages/mui-grid';
import Summary from '@/pages/summary';
import SalesCodes from '@/pages/sales-codes';
import NewVehicle from '@/pages/vehicle/new-vehicle';
import { dataRequestRoutes } from './constants';

function DataRequestRoutes() {
  return (
    <Routes>
      <Route path={dataRequestRoutes.dataSources} element={<DataSources />} />
      <Route path={dataRequestRoutes.vehicles} element={<NewVehicle />} />
      <Route path={dataRequestRoutes.keywords} element={<Keywords />} />
      <Route path={dataRequestRoutes.saleCodes} element={<SalesCodes />} />
      <Route path={dataRequestRoutes.dates} element={<Dates />} />
      <Route path={dataRequestRoutes.summary} element={<Summary />} />
      <Route path={dataRequestRoutes.muiGrid} element={<MuiGrid />} />
      <Route path={dataRequestRoutes.lops} element={<Lops />} />
      <Route path="*" element={<Navigate to="data-sources" replace />} />
    </Routes>
  );
}

export default DataRequestRoutes;
