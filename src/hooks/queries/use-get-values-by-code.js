import { useQuery } from 'react-query';
import { getValuesByLookUpCode } from 'services/requests-service';

export const useGetValuesByLookUpCodeQuery = ({ params, options }) =>
  useQuery(
    ['getValuesByLookUpCode', params],
    () => getValuesByLookUpCode(params),
    {
      select: (res) => res.data,
      ...options,
    }
  );
