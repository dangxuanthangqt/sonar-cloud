import { atom } from 'recoil';

export const globalKey = 'globalKey';

export const globalStateAtom = atom({
  key: globalKey,
  default: null,
});
