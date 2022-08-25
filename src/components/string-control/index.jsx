import React from 'react';
import { TextareaAutosize } from '@mui/material';
import InputController from '../input-controller';

function StringControl({
  control,
  helpText,
  id,
  permission,
  title,
  value,
  required,
  disabled,
  name,
  minLength,
  maxLength,
  placeholder,
}) {
  if (maxLength > 100) {
    return (
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder={placeholder}
        style={{ width: 200 }}
      />
    );
  }
  return (
    <InputController
      control={control}
      name={name}
      required={required}
      disabled={disabled || permission?.readOnlyControl}
      label={title}
      placeholder={placeholder || title}
    />
  );
}

export default StringControl;
