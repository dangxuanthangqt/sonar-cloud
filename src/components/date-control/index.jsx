import { FormControl, FormLabel, Popover } from '@mui/material';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { Calendar } from 'react-date-range';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { getDateFormatString } from '@/common/utils';

const useDateControlStyles = makeStyles({});

export default function DateControl({ control, name, label, disabled }) {
  const classes = useDateControlStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState(null);
  const dateFormat = getDateFormatString();

  const handleClick = (e) => {
    !disabled && setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-control' : undefined;

  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  useEffect(() => {
    field.value && setDate(field.value);
  }, [field.value]);

  return (
    <>
      <FormControl>
        <FormLabel
          className={classNames('text-base text-[#12293E] mb-[6px]', {
            'opacity-[0.38]': disabled,
          })}
        >
          {label || 'Date'}
        </FormLabel>
        <TextField
          error={!!error?.message}
          helperText={error?.message}
          inputProps={{
            placeholder: 'Enter date',
            className: 'text-sm font-medium py-[14px] pl-[9px]',
          }}
          onClick={handleClick}
          value={date ? format(date, dateFormat) : ''}
        />
      </FormControl>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.dateRangePickerContainer}
      >
        <Calendar
          onChange={(item) => setDate(item)}
          date={date}
          dateDisplayFormat={dateFormat}
          weekdayDisplayFormat="EEEEE"
        />
      </Popover>
    </>
  );
}
