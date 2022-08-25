import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useController } from 'react-hook-form';

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      fontSize: 12,
      fontWeight: 500,
    },
    '& input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
    /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
});

function InputController({
  endAdornment,
  type,
  control,
  name,
  required,
  disabled,
  extendOnChange,
  ...rest
}) {
  const classes = useStyles();

  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: { required } });

  return (
    <TextField
      {...field}
      id={`${name}-input-outlined`}
      variant="outlined"
      fullWidth
      size="small"
      classes={{ root: classes.root }}
      InputProps={{
        endAdornment,
      }}
      type={type || 'text'}
      required={required}
      error={!!error?.message}
      helperText={error?.message}
      disabled={disabled}
      onChange={(e) => {
        field.onChange(e);
        extendOnChange?.(e.target.value);
      }}
      {...rest}
    />
  );
}

export default InputController;
