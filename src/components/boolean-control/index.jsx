import React from 'react';
import CheckboxController from '../checkbox-controller';

function BooleanControl({ control, name, label, disabled, permission }) {
  return (
    <CheckboxController
      control={control}
      name={name}
      label={label}
      // disabled={disabled || permission?.readOnlyControl}
      disabled={
        label === 'Dealer Problem sampling System (DPS)' ||
        label === 'Star Report'
      }
    />
  );
}

export default BooleanControl;
