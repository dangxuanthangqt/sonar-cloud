import { atom } from 'recoil';

export const salesCodeStateKey = 'SalesCodeStateKey';

export const salesCodeStateAtom = atom({
  key: salesCodeStateKey,
  default: null,
});
