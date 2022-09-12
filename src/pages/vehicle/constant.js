export const vehicleDefaultItemValue = {
  fromYear: {
    value: '',
  },
  toYear: {
    value: '',
  },
  family: {
    value: '',
  },
  line: {
    value: '',
  },
  series: {
    value: '',
  },
  style: {
    value: '',
  },
  bodyDescription: {
    value: '',
  },
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
    url: '/api/families',
  },
  line: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 2,
    maximum: 2,
    url: '/api/lines',
  },
  series: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 2,
    maximum: 2,
    url: '/api/series',
  },
  style: {
    originalRef: 'DynamicSingleValueLookup',
    minLength: 1,
    maximum: 1,
    url: '/api/styles',
  },
  bodyDescription: {
    originalRef: 'StringControl',
  },
};
