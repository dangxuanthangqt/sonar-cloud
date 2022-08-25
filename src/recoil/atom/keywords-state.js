import { atom } from 'recoil';

export const keywordsStateKey = 'KeywordsStateKey';

export const keywordsStateAtom = atom({
  key: keywordsStateKey,
  default: null,
});
