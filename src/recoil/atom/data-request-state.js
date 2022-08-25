import { atom } from 'recoil';

export const dataRequestStateAtom = atom({
  key: 'dataRequestStateKey',
  default: {
    dataSchema: null,
    data: {
      keyWordSection: null,
      vehicleSection: null,
      salesCodesSection: null,
      dataSourceSection: null,
      datesSection: null,
      lopAndPartsSection: null,
    },
  },
});
