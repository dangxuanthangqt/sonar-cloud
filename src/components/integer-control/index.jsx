import React, { useMemo } from 'react';
import InputController from '../input-controller';
import SelectionController from '../selection-controller';

function IntegerControl({
  name,
  control,
  permission,
  disabled,
  exclusiveMaximum,
  exclusiveMinimum,
  maximum,
  minimum,
  variant,
  required,
  title,
  placeholder,
  isVehicleStep,
}) {
  const options = useMemo(
    () =>
      Array.from(
        {
          length: maximum - minimum + 1 || 100,
        },
        (v, k) => ({
          value: k + (minimum || 2000),
          label: k + (minimum || 2000),
        })
      ),
    [maximum, minimum]
  );
  if (variant === 'input') {
    return (
      <InputController
        control={control}
        name={name}
        required={required}
        disabled={disabled || permission?.readOnlyControl}
        label={title}
        placeholder={placeholder || title}
        type="number"
      />
    );
  }
  return (
    <SelectionController
      control={control}
      name={name}
      options={options}
      disabled={disabled || permission?.readOnlyControl}
      isVehicleStep={isVehicleStep}
    />
  );
}

export default IntegerControl;
