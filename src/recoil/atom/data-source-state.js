import { atom } from 'recoil';

export const dataSourceStateKey = 'DataSourceStateKey';
export const dataSourceResponseStateKey = 'DataSourceResponseStateKey';

export const dataSourceStateAtom = atom({
  key: dataSourceStateKey,
  default: null,
});

export const dataSourceResponseStateAtom = atom({
  key: 'DataSourceResponseStateKey',
  default: null,
});
