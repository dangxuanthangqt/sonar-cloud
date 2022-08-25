import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { useController } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
    '&:hover': {
      color: '#0F81C0',
    },
  },
  checkedLabel: {
    color: '#0F81C0',
  },
}));

function CheckboxController({
  control,
  name,
  disabled,
  isRequired,
  label,
  onCheckboxChange,
  indeterminate,
}) {
  const classes = useStyles();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: isRequired },
    defaultValue: false,
  });
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            checked={field.value || false}
            name={name}
            color="primary"
            disabled={disabled}
            required={isRequired}
            onChange={(e) => {
              field.onChange(e);
              onCheckboxChange?.(e);
            }}
            indeterminate={indeterminate}
          />
        }
        label={label}
        color="primary"
        classes={{ label: classes.label }}
        className={classNames({
          [classes.checkedLabel]: field.value,
        })}
      />
      {error?.message && <FormHelperText>{error.message}</FormHelperText>}
    </>
  );
}

export default CheckboxController;
