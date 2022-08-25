import { useQuery } from 'react-query';
import { getRequestViewDataGrid } from 'services/requests-service';

export const useGetRequestDataGrid = ({ options, params }) =>
  useQuery(
    ['getRequestViewDataGrid', params],
    () => getRequestViewDataGrid(params),
    {
      select: (res) => res.data,
      ...options,
    }
  );
