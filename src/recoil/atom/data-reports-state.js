import { atom } from 'recoil';

export const dataReportsAtom = atom({
  key: 'datReportStateKey',
  default: {
    data: null,
  },
});
