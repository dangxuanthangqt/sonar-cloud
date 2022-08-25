import { Search } from '@mui/icons-material';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
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
    '& .MuiAutocomplete-listbox .MuiAutocomplete-option ': {
      fontSize: 14,
    },
  },
});

const FixedMultipleValueLookup = React.forwardRef(
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
      isHideValue,
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
      ['getDataByCommonCode', url, name, 'FixedMultipleValueLookup'],
      () => getDataByCode({ ...parameters }, url),
      {
        select: (res) => (handleOptions ? handleOptions(res.data) : res.data),
      }
    );

    useEffect(() => {
      extendOnChange?.(field.value);
    }, [field.value]);

    return (
      <Autocomplete
        multiple
        id="fix-single-value-lookup"
        getOptionLabel={(option) =>
          getOptionLabel ? getOptionLabel(option) : option?.label || ''
        }
        options={options || []}
        onChange={(e, v) => {
          field.onChange({ target: { value: v || null } });
          setInputValue('');
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.value === value?.value;
        }}
        value={field.value || []}
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
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option?.label}
              {...getTagProps({ index })}
              color={
                !(disabled || permission?.readOnlyControl)
                  ? 'primary'
                  : 'secondary'
              }
              className={classNames('text-sm font-medium mr-1 mt-[3px]', {
                hidden: isHideValue,
              })}
              disabled={isFetching || disabled || permission?.readOnlyControl}
            />
          ))
        }
      />
    );
  }
);

export default FixedMultipleValueLookup;
