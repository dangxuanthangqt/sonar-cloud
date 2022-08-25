import { FormControl, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetValuesByLookUpCodeQuery } from 'hooks/queries/use-get-values-by-code';
import { filter } from 'lodash';
import React, { useEffect, useImperativeHandle, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
      // fontWeight: 500,
    },
  },
  selectCustom: {
    width: 220,
  },
}));

const CommonMultiValueLookup = React.forwardRef(
  (
    {
      placeholder,
      defaultOptions = [],
      onChange,
      id,
      disabled,
      permission,
      lookUpCode,
      defaultSelected,
    },
    ref
  ) => {
    const classes = useStyles();
    const [options, setOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useGetValuesByLookUpCodeQuery({
      params: { lookUpCode },
      options: {
        onSuccess: (res) => setOptions(res?.data),
        enabled: !!lookUpCode,
      },
    });

    const handleChange = (e) => {
      setOptions((prev) => filter(prev, (el) => el !== e.target.value));
      setSelectedValues((prev) => [...prev, e.target.value]);
    };

    useEffect(() => {
      onChange(selectedValues);
    }, [selectedValues, onChange]);

    useEffect(() => {
      setSelectedValues(defaultSelected);
    }, [defaultSelected]);

    useImperativeHandle(ref, () => ({
      setOptions,
      setSelectedValues,
    }));

    return (
      <FormControl
        variant="outlined"
        hiddenLabel
        size="small"
        classes={{ root: classes.root }}
        className={classes.selectCustom}
        disabled={disabled || permission?.readOnlyControl}
      >
        <Select id={id} displayEmpty value="" onChange={handleChange}>
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
);

export default CommonMultiValueLookup;
