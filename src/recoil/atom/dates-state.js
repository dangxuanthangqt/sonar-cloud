import { atom } from 'recoil';

export const datesStateKey = 'DatesStateKey';

export const datesStateAtom = atom({
  key: datesStateKey,
  default: null,
});
