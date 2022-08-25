import {
  useGetRequestViewData,
  useGetRequestViewSchema,
} from 'hooks/queries/use-requests-view';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import DataSources from '@/pages/data-sources';
import Dates from '@/pages/dates';
import Keywords from '@/pages/keywords';
import Lops from '@/pages/lops';
import MuiGrid from '@/pages/mui-grid';
import Summary from '@/pages/summary';
import SalesCodes from '@/pages/sales-codes';
import NewVehicle from '@/pages/vehicle/new-vehicle';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import { dataRequestRoutes } from './constants';

function DataRequestRoutes() {
  const setDataRequestState = useSetRecoilState(dataRequestStateAtom);
  const { isFetching: getRequestViewSchemaLoading } = useGetRequestViewSchema({
    keyword: 'DataRequestRoutes',
    options: {
      onSuccess: (res) =>
        setDataRequestState((prev) => ({ ...prev, dataSchema: res })),
    },
  });

  const { isFetching } = useGetRequestViewData({
    options: {
      onSuccess: (res) =>
        setDataRequestState((prev) => ({ ...prev, data: res })),
    },
    key: 'DataRequestRoutes',
  });
  return (
    <Routes>
      <Route
        path={dataRequestRoutes.dataSources}
        element={
          <DataSources isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.vehicles}
        element={
          <NewVehicle isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.keywords}
        element={
          <Keywords isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.saleCodes}
        element={
          <SalesCodes isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.dates}
        element={
          <Dates isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.summary}
        element={
          <Summary isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.muiGrid}
        element={
          <MuiGrid isLoading={getRequestViewSchemaLoading || isFetching} />
        }
      />
      <Route
        path={dataRequestRoutes.lops}
        element={<Lops isLoading={getRequestViewSchemaLoading || isFetching} />}
      />
      <Route path="*" element={<Navigate to="data-sources" replace />} />
    </Routes>
  );
}

export default DataRequestRoutes;
