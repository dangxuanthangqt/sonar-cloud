import { Autocomplete, Chip, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { omit } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';

const useStyles = makeStyles({
  inputRoot: {
    '&.MuiOutlinedInput-root': {
      minHeight: 44,
      paddingTop: '0px !important',
      paddingBottom: '3px !important',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: (props) => (props.noBorder ? 'none' : '1px solid #ccc'),
    },
  },
});

function StringMultipleValueControl({
  className,
  control,
  helpText,
  id,
  permission,
  summary,
  title,
  value,
  required,
  noBorder,
  disabled,
  viewOnly,
  name,
  extendOnChange,
  defaultValue,
  sx,
}) {
  const classes = useStyles({ disabled: true, noBorder });
  const [valueState, setValueState] = useState(defaultValue);

  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: { required } });

  useEffect(() => {
    field.onChange(valueState);
  }, [valueState]);

  const isControlDisabled = useMemo(
    () => disabled || permission?.readOnlyControl,
    [disabled, permission]
  );

  return (
    <>
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={valueState || defaultValue || []}
        onChange={(event, newValue) => {
          setValueState(newValue);
        }}
        limitTags={5}
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
              color={!isControlDisabled || summary ? 'primary' : 'secondary'}
              className="text-sm font-medium mr-1 mt-[3px]"
              disabled={!isControlDisabled ? summary : true}
            />
          ))
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        disabled={isControlDisabled}
        classes={{ inputRoot: classes.inputRoot, input: className }}
        renderInput={(params) => (
          <TextField
            {...omit(field, ['onChange'])}
            {...params}
            label={title}
            fullWidth
            size="small"
            type="text"
            required={required}
            error={!!error?.message}
            helperText={error?.message}
            placeholder={!field.value ? "Type keywords then press 'Enter'" : ''}
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

export default StringMultipleValueControl;
