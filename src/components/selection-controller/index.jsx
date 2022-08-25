import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useController } from 'react-hook-form';

const useStyles = makeStyles({
  root: {
    // '& .MuiSelect-outlined': {
    //   borderRadius: 0,
    // },
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      fontSize: 14,
      fontWeight: 500,
    },
  },
});

function SelectionController({
  control,
  name,
  options,
  required,
  disabled,
  isVehicleStep,
}) {
  const classes = useStyles();

  const {
    field,
    fieldState: { error },
    formState: { errors },
  } = useController({ control, name });
  const { vehicles = [] } = errors;
  /** If at vehicle step, we get errors messages from formState */
  const secondString = name?.replaceAll('.', '?.')?.concat('?.message');

  // eslint-disable-next-line no-eval
  const errorMessage = isVehicleStep ? eval(secondString) : error?.message;

  return (
    <FormControl
      variant="outlined"
      hiddenLabel
      fullWidth
      size="small"
      classes={{ root: classes.root }}
      required={required}
      error={!!errorMessage}
      disabled={disabled}
    >
      <Select {...field} id={`${name}-select-outlined`}>
        <MenuItem sx={{ fontSize: 14 }} value="">
          <em>None</em>
        </MenuItem>
        {options?.map((el) => (
          <MenuItem value={el.value} key={el.value} sx={{ fontSize: 14 }}>
            {el.label}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default SelectionController;
