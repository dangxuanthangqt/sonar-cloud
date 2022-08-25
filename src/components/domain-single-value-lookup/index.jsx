import { Search } from '@mui/icons-material';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getDataByCode } from 'services/requests-service';
import debounce from 'lodash/debounce';

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

function DomainSingleValueLookup({
  control,
  helpText,
  id,
  permission,
  title,
  value,
  required,
  disabled,
  name,
  url,
  extendOnChange,
  getOptionLabel,
  handleOptions,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');

  const [inputValue, setInputValue] = useState('');

  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules: { required } });

  const { isFetching } = useQuery(
    ['getDataByCode', url, search, name],
    () => getDataByCode({ q: search }, url),
    {
      enabled: open,
      select: (res) => res.data.data,
      onSuccess: (res) => setOptions(handleOptions ? handleOptions(res) : res),
    }
  );

  useEffect(() => {
    setInputValue(field.value || '');
  }, [field.value]);

  const handleInputChange = useCallback(
    debounce((e, v) => setSearch(v), 300),
    []
  );

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      open={open}
      onOpen={() => {
        setOpen(true);
        setSearch(inputValue);
      }}
      onClose={() => {
        setOpen(false);
        setOptions([]);
      }}
      getOptionLabel={(option) =>
        getOptionLabel ? getOptionLabel(option) : option?.label || ''
      }
      options={options}
      loading={open && isFetching}
      inputValue={inputValue}
      filterOptions={(x) => x}
      onChange={(e, v) => {
        field.onChange({ target: { value: v?.value || '' } });
        setInputValue(v?.value || '');
        extendOnChange?.(v);
      }}
      onBlur={() => {
        setInputValue(field.value || '');
      }}
      disableClearable
      onInputChange={handleInputChange}
      classes={{ paper: classes.paper }}
      disabled={disabled || permission?.readOnlyControl}
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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching && <CircularProgress size={20} color="inherit" />}
                <Search />
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default DomainSingleValueLookup;
