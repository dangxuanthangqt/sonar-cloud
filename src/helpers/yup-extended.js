/* eslint-disable func-names */
import * as yup from 'yup';

yup.addMethod(yup.string, 'vehicleString', function (field) {
  return this.test(field, '', (value, ctx) => {
    const {
      options: {
        context: { schema, t },
      },
      createError,
    } = ctx;
    const { required, properties } = schema || {};
    if (!value && required.includes(field)) {
      return createError({
        message: `${t(`vehicle_form.fields.${field}`)} is required`,
      });
    }
    if (!value) return true;
    if (properties?.[field]?.minLength > value.length) {
      return createError({
        message: `${t(`vehicle_form.fields.${field}`)} must be at least ${
          properties?.[field]?.maxLength
        } characters`,
      });
    }
    if (properties?.[field]?.maxLength < value.length) {
      return createError({
        message: `${t(
          `vehicle_form.fields.${field}`
        )} must be less than or equal to ${
          properties?.[field]?.maxLength
        } characters`,
      });
    }
    return true;
  });
});

yup.addMethod(yup.object, 'vehicleObject', function (field) {
  return this.test(field, '', (value, ctx) => {
    const {
      options: {
        context: { schema, t },
      },
      createError,
    } = ctx;
    const { required, properties } = schema || {};
    if (!value && required.includes(field)) {
      return createError({
        message: `${t(`vehicle_form.fields.${field}`)} is required`,
      });
    }
    if (!value) return true;
    if (properties?.[field]?.minLength > value.value?.length) {
      return createError({
        message: `${t(`vehicle_form.fields.${field}`)} must be at least ${
          properties?.[field]?.maxLength
        } characters`,
      });
    }
    if (properties?.[field]?.maxLength < value.value?.length) {
      return createError({
        message: `${t(
          `vehicle_form.fields.${field}`
        )} must be less than or equal to ${
          properties?.[field]?.maxLength
        } characters`,
      });
    }
    return true;
  });
});

export default yup;
