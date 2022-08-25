import { useQuery } from 'react-query';
import { getRequestView, getRequestViewData } from 'services/requests-service';

export const useGetRequestViewSchema = ({ options, key }) =>
  useQuery(['getRequestView', key], () => getRequestView(), {
    select: (res) => res.data,
    ...options,
  });

export const useGetRequestViewData = ({ options, key }) =>
  useQuery(['getRequestViewData', key], () => getRequestViewData(), {
    select: (res) => res.data,
    ...options,
  });
