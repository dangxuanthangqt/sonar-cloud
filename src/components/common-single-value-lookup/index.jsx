import { FormControl, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  selectCustom: {
    width: 220,
  },
}));

function CommonSingleValueLookup({
  placeholder,
  options,
  onChange,
  id,
  disabled,
  permission,
  lookUpCode,
}) {
  const classes = useStyles();
  return (
    <FormControl
      variant="outlined"
      hiddenLabel
      size="small"
      classes={{ root: classes.root }}
      className={classes.selectCustom}
      disabled={disabled || permission?.readOnlyControl}
    >
      <Select id={id} displayEmpty value="" onChange={onChange}>
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options?.map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CommonSingleValueLookup;
