/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CalendarTodayOutlined } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Popover,
} from '@mui/material';
import { useController } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getDateFormatString } from '@/common/utils';

const useStyles = makeStyles({
  button: {
    display: 'block',
    marginRight: 26,
    textTransform: 'none',
  },
  container: {},
  dateRangePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .rdrDefinedRangesWrapper': {
      display: 'none',
    },
    '& .rdrDayNumber': {
      fontSize: 14,
      fontWeight: 400,
    },
    '& .rdrDayPassive': {
      '& .rdrInRange': {
        '& + .rdrDayNumber': {
          '& > span': {
            color: '#d5dce0 !important',
          },
        },
        '& + span': {
          '& + .rdrDayNumber': {
            '& > span': {
              color: '#d5dce0 !important',
            },
          },
        },
      },
    },
    '& .rdrInRange': {
      top: 2,
      bottom: 2,
      backgroundColor: '#0F81C029',
      '& + .rdrDayNumber': {
        '& > span': {
          color: '#000 !important',
        },
      },
      '& + span': {
        '& + .rdrDayNumber': {
          '& > span': {
            color: '#000 !important',
          },
        },
      },
    },
    '& .rdrStartEdge, .rdrEndEdge': {
      backgroundColor: '#0F81C0',
      top: 2,
      bottom: 2,
    },
  },
});

export default function DateRangeControl({
  control,
  name,
  startLabel,
  endLabel,
  disabled,
}) {
  const classes = useStyles();
  const startInputRef = useRef();
  const endInputRef = useRef();
  const dateFormat = getDateFormatString();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    !disabled && setAnchorEl(startInputRef?.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-rang-control' : undefined;
  const [state, setState] = useState({
    startDate: field.value?.startDate || null,
    endDate: field.value?.endDate || null,
    key: 'selection',
  });

  const previousDataRef = useRef({
    startDate: field.value?.startDate || null,
    endDate: field.value?.endDate || null,
    key: 'selection',
  });

  useEffect(() => {
    setState({
      startDate: field.value?.startDate || null,
      endDate: field.value?.endDate || null,
      key: 'selection',
    });
  }, [field.value]);

  const handleCancel = useCallback(() => {
    setState(previousDataRef.current);
    field.onChange(previousDataRef.current);
    handleClose();
  }, [field.value]);

  const handleApply = useCallback(() => {
    previousDataRef.current = field.value;
    handleClose();
  }, [field.value]);
  // useEffect(() => {
  //   field.onChange(state);
  // }, [state]);

  return (
    <div className={classNames('items-start flex', classes.container)}>
      <FormControl>
        <FormLabel
          className={classNames('text-base text-[#12293E] mb-[6px]', {
            'opacity-[0.38]': disabled,
          })}
        >
          {startLabel || 'From'}
        </FormLabel>
        <TextField
          value={state?.startDate ? format(state?.startDate, dateFormat) : ''}
          inputRef={startInputRef}
          label=""
          hiddenLabel
          error={!!error?.message}
          helperText={error?.message}
          inputProps={{
            placeholder: 'Enter date',
            className: 'text-sm font-medium py-[14px] pl-[9px]',
          }}
          onClick={handleClick}
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    handleClick();
                  }}
                  size="small"
                  disabled={disabled}
                >
                  <CalendarTodayOutlined fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Box
        sx={{ mx: 2, my: 'auto', transform: 'translateY(10px)' }}
        className={{ 'opacity-[0.38]': disabled }}
      >
        &#9866;
      </Box>
      <FormControl>
        <FormLabel
          className={classNames('text-base text-[#12293E] mb-[6px]', {
            'opacity-[0.38]': disabled,
          })}
        >
          {endLabel || 'To'}
        </FormLabel>
        <TextField
          value={state.endDate ? format(state.endDate, dateFormat) : ''}
          hiddenLabel
          label=""
          inputRef={endInputRef}
          error={!!error?.message}
          helperText={error?.message}
          inputProps={{
            placeholder: 'Enter date',
            className: 'text-sm font-medium py-[14px] pl-[9px]',
          }}
          onClick={handleClick}
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    handleClick();
                  }}
                  size="small"
                  disabled={disabled}
                >
                  <CalendarTodayOutlined fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.dateRangePickerContainer}
      >
        <DateRangePicker
          onChange={(item) => {
            setState(item.selection);
            field.onChange(item.selection);
          }}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          months={2}
          ranges={[state]}
          direction="horizontal"
          dateDisplayFormat={dateFormat}
          weekdayDisplayFormat="EEEEE"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: '14px',
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            className={classes.button}
          >
            Apply
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
