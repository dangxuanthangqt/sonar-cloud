import { useQuery } from 'react-query';
import {
  getDataReports,
  getRequestViewDataGrid,
} from 'services/requests-service';

export const useGetDataReports = ({ options, params }) =>
  useQuery(['getRequestViewDataGrid', params], () => getDataReports(params), {
    select: (res) => res.data,
    ...options,
  });
