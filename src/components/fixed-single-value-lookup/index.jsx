import { Search } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getDataByCode } from 'services/requests-service';

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      fontSize: 12,
      fontWeight: 500,
    },
  },
  paper: {
    width: 300,
  },
});

const FixedSingleValueLookup = React.forwardRef(
  (
    {
      control,
      helpText,
      id,
      permission,
      title,
      required,
      disabled,
      name,
      url,
      extendOnChange,
      getOptionLabel,
      handleOptions,
      parameters = {},
      placeholder,
    },
    ref
  ) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');

    const {
      field,
      fieldState: { error },
    } = useController({ control, name, rules: { required } });

    const { data: options, isFetching } = useQuery(
      ['getDataByCommonCode', url, name, 'FixedSingleValueLookup'],
      () => getDataByCode({ ...parameters }, url),
      {
        enabled: !!url,
        select: (res) => (handleOptions ? handleOptions(res.data) : res.data),
      }
    );

    useEffect(() => {
      setInputValue(field.value?.label || '');
    }, [field.value]);

    return (
      <Autocomplete
        id="fix-single-value-lookup"
        getOptionLabel={(option) =>
          getOptionLabel ? getOptionLabel(option) : option?.label || ''
        }
        options={options || []}
        onChange={(e, v) => {
          field.onChange({ target: { value: v || null } });
          extendOnChange?.(v);
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.value === value?.value;
        }}
        value={field.value || ''}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        disableClearable
        classes={{ paper: classes.paper }}
        disabled={isFetching || disabled || permission?.readOnlyControl}
        renderInput={(params) => (
          <TextField
            // {...field}
            {...params}
            label={title}
            fullWidth
            size="small"
            classes={{ root: classes.root }}
            type="text"
            required={required}
            error={!!error?.message}
            helperText={error?.message}
            disabled={disabled || permission?.readOnlyControl}
            InputProps={{
              ...params.InputProps,
              endAdornment: <Search />,
            }}
            placeholder={placeholder}
          />
        )}
      />
    );
  }
);

export default FixedSingleValueLookup;
