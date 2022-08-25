import { atom } from 'recoil';

export const vehicleStateKey = 'VehicleStateKey';

export const vehicleStateAtom = atom({
  key: vehicleStateKey,
  default: null,
});
