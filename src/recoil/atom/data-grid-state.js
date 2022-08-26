import { atom } from 'recoil';

export const dataGridStateAtom = atom({
  key: 'dataGridStateKey',
  default: {
    data: {
      dataGridSection: null,
    },
  },
});
