import { atom } from 'recoil';

export const lopsAndPartsStateKey = 'LopsAndPartsStateKey';

export const lopsAndPartsStateAtom = atom({
  key: lopsAndPartsStateKey,
  default: null,
});
