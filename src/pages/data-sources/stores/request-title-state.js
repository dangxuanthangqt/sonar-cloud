import { atom } from 'recoil';

export const requestTitleStateKey = 'requestTitleStateKey';

export const requestTitleStateAtom = atom({
  key: requestTitleStateKey,
  default: {
    value: '',
    error: '',
  },
});
