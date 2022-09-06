import React from 'react';
import CheckboxController from '../checkbox-controller';

function BooleanControl({ control, name, label, disabled, permission }) {
  return (
    <CheckboxController
      control={control}
      name={name}
      label={label}
      // disabled={disabled || permission?.readOnlyControl}
    />
  );
}

export default BooleanControl;
