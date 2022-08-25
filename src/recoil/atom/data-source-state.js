import { atom } from 'recoil';

export const dataSourceStateKey = 'DataSourceStateKey';

export const dataSourceStateAtom = atom({
  key: dataSourceStateKey,
  default: null,
});
