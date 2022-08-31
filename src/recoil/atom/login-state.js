import { atom } from 'recoil';

const loginUserDetailKey = 'LoginUserDetailKey';

export const loginUserDetailAtom = atom({
  key: loginUserDetailKey,
  default: null,
});
