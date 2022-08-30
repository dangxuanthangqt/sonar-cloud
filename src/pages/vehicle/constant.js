export const vehicleDefaultItemValue = {
  fromYear: {
    value: '',
  },
  toYear: {
    value: '',
  },
  family: {},
  line: {},
  series: {},
  style: {},
  bodyDescription: {},
};

export const propertiesVehicle = {
  fromYear: {
    originalRef: 'IntegerControl',
    minimum: 1995,
    maximum: 2022,
  },
  toYear: {
    originalRef: 'IntegerControl',
    minimum: 2000,
    maximum: 2022,
  },
  family: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 2,
    maximum: 2,
  },
  line: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 2,
    maximum: 2,
  },
  series: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 2,
    maximum: 2,
  },
  style: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 1,
    maximum: 1,
  },
  bodyDescription: {
    originalRef: 'StringControl',
  },
};
