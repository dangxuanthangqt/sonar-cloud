import { Autocomplete, Chip, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isEmpty, last, omit } from 'lodash';
import React, { useMemo } from 'react';
import { useController } from 'react-hook-form';

const useNumberMultipleStyles = makeStyles({
  inputRoot: {
    '&.MuiOutlinedInput-root': {
      minHeight: 44,
      paddingTop: '0px !important',
      paddingBottom: '3px !important',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: 14,
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

function NumberMultipleValueControl({
  control,
  helpText,
  id,
  permission,
  title,
  value,
  required,
  disabled,
  name,
  extendOnChange,
  defaultValue,
  placeholder,
  minLength,
  maxLength,
  setError,
  hideLabel,
  clearErrors,
}) {
  const classes = useNumberMultipleStyles();

  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: { required } });

  const isControlDisabled = useMemo(
    () => disabled || permission?.readOnlyControl,
    [disabled, permission]
  );

  return (
    <>
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={field.value || defaultValue || []}
        onChange={(event, newValue) => {
          if (
            !isEmpty(newValue) &&
            (last(newValue).length > maxLength ||
              last(newValue).length < minLength)
          ) {
            setError(name, {
              message:
                minLength !== maxLength
                  ? `${title} must be between ${minLength} and ${maxLength} characters`
                  : `${title} must be ${minLength} characters`,
            });
            return;
          }
          field.onChange(newValue);
        }}
        onInputChange={() => clearErrors(name)}
        limitTags={5}
        size="small"
        options={[]}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              color={!isControlDisabled ? 'primary' : 'secondary'}
              className="text-sm font-medium mr-1 mt-[3px]"
              disabled={isControlDisabled}
            />
          ))
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        disabled={isControlDisabled}
        classes={{ inputRoot: classes.inputRoot }}
        renderInput={(params) => (
          <TextField
            {...omit(field, ['onChange'])}
            {...params}
            {...(!hideLabel ? { label: title } : {})}
            fullWidth
            size="small"
            required={required}
            error={!!error?.message}
            helperText={error?.message}
            placeholder={placeholder || "Type keywords then press 'Enter'"}
            type="number"
          />
        )}
        open={false}
        openOnFocus={false}
        freeSolo
      />
      <div />
    </>
  );
}

export default NumberMultipleValueControl;
