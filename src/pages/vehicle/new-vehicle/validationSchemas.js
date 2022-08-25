import yup from 'helpers/yup-extended';

export const vehicleSchema = yup.object().shape({
  vehicles: yup.array().of(
    yup.object().shape({
      fromYear: yup.object().shape({
        value: yup
          .mixed()
          .nullable()
          .test('fromYear', 'fromYear', (value, ctx) => {
            const {
              options: {
                context: { schema },
              },
              createError,
            } = ctx;

            const { required } = schema || {};
            if (!value && required.includes('fromYear')) {
              return createError({ message: 'From Year is required' });
            }
            return true;
          }),
      }),
      toYear: yup.object().shape({
        value: yup
          .mixed()
          .nullable()
          .test('toYear', 'toYear', (value, ctx) => {
            const {
              options: {
                context: { schema },
              },
              createError,
            } = ctx;

            const { required } = schema || {};
            if (!value && required.includes('toYear')) {
              return createError({ message: 'To Year is required' });
            }
            return true;
          }),
      }),
      family: yup.object().shape({
        value: yup.object().nullable().vehicleObject('family'),
      }),
      line: yup.object().shape({
        value: yup.object().nullable().vehicleObject('line'),
      }),
      series: yup.object().shape({
        value: yup.object().nullable().vehicleObject('series'),
      }),
      style: yup.object().shape({
        value: yup.object().nullable().vehicleObject('style'),
      }),
      bodyDescription: yup.object().shape({
        value: yup.string().vehicleString('bodyDescription'),
      }),
    })
  ),
});

export const conditions = {
  required: [
    'bodyDescription',
    'family',
    'fromYear',
    'toYear',
    'line',
    'series',
    'style',
  ],
  properties: {
    family: {
      minLength: 2,
      maximum: 2,
    },
    fromYear: {
      minimum: 1995,
      maximum: 2022,
    },
    line: {
      minLength: 2,
      maximum: 2,
    },
    series: {
      minLength: 2,
      maximum: 2,
    },
    style: {
      minLength: 1,
      maximum: 1,
    },
    toYear: {
      minimum: 2000,
      maximum: 2022,
    },
  },
};
