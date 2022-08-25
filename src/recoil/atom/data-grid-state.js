import { atom } from 'recoil';

export const dataGridStateAtom = atom({
  key: 'dataGridStateKey',
  default: {
    dataSchema: null,
    data: {
      dataGridSection: null,
    },
  },
});
