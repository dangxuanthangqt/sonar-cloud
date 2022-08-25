import { useRecoilState } from 'recoil';
import { useMemo } from 'react';
import { find } from 'lodash';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import usePrevious from './common/usePrevious';

export const useDataSourceSummary = (step = '') => {
  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  const computedDataSource = useMemo(() => {
    const { formGroups = [] } = dataSourceState || {};
    const initialData = {
      required: [],
      optional: [],
      notApplicable: [],
    };

    formGroups?.forEach((formGroup) => {
      formGroup?.dataSources?.forEach((dataSource) => {
        if (
          dataSource?.value &&
          find(dataSource?.requiredFor, (item) => item === step)
        ) {
          initialData.required.push(dataSource?.title);
        }
        if (
          dataSource?.value &&
          find(dataSource?.optionalFor, (item) => item === step)
        ) {
          initialData.optional.push(dataSource?.title);
        }
        if (
          dataSource?.value &&
          find(dataSource?.notApplicableFor, (item) => item === step)
        ) {
          initialData.notApplicable.push(dataSource?.title);
        }
      });
    });
    return initialData;
  }, [dataSourceState]);
  return { ...computedDataSource };
};
