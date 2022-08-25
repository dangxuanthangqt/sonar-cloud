import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TEXT_COLOR } from '@/layouts/constant';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  inputNumber: {
    marginLeft: '8px',
    width: '50px',
    height: '30px',
    '& .MuiOutlinedInput-input': {
      padding: '4px',
    },
  },
  currentPage: {
    fontWeight: 700,
    color: TEXT_COLOR.BLUE.BLUE2,
  },
}));

export default function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
  inputValue,
  setInputValue,
}) {
  const classes = useStyles();

  const handleOnChangePage = (number) => {
    if (number === 1) {
      if (currentPage < totalPage)
        setCurrentPage(Number(currentPage) + Number(number));
    } else if (currentPage > 1)
      setCurrentPage(Number(currentPage) + Number(number));
  };

  const handleOnChange = (type) => {
    if (type === 'first') setCurrentPage(1);
    else setCurrentPage(totalPage);
  };

  const handleOnChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const jumpToPage = (number) => {
    if (number <= totalPage && number >= 1) {
      setCurrentPage(number);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography sx={{ color: TEXT_COLOR.BLUE.BLUE1, fontSize: 14 }}>
        Go to Report
      </Typography>
      <TextField
        className={classes.inputNumber}
        value={inputValue}
        onChange={handleOnChangeInput}
        type="number"
        sx={{
          '& input': {
            fontSize: 14,
          },
        }}
        InputProps={{
          inputProps: {
            max: totalPage,
            min: 1,
          },
        }}
      />
      <Button
        sx={{
          ml: 1,

          height: '28px',
          width: '40px',
          color: 'white',
          minWidth: '40px',
          backgroundColor: TEXT_COLOR.BLUE.BLUE2,
          px: 0,
          '&:hover': { backgroundColor: TEXT_COLOR.BLUE.BLUE2 },
        }}
        onClick={() => jumpToPage(inputValue)}
      >
        Go
      </Button>
      <IconButton
        sx={{
          ml: '16px',
          mr: 2,
          p: '0px',
          border: `2px solid ${TEXT_COLOR.BLUE.BLUE1}`,
        }}
        onClick={() => handleOnChange('first')}
      >
        <KeyboardDoubleArrowLeftRoundedIcon
          sx={{ fontSize: 20, color: TEXT_COLOR.BLUE.BLUE1 }}
        />
      </IconButton>
      <IconButton
        sx={{ p: '0px', border: `2px solid ${TEXT_COLOR.BLUE.BLUE2}` }}
        onClick={() => handleOnChangePage(-1)}
      >
        <KeyboardArrowLeftRoundedIcon
          sx={{ fontSize: 20, color: TEXT_COLOR.BLUE.BLUE2 }}
        />
      </IconButton>
      <Box sx={{ mx: 1, display: 'flex' }}>
        <Typography className={classes.currentPage}>{currentPage}</Typography>
        <Typography sx={{ color: TEXT_COLOR.BLUE.BLUE2 }}>/</Typography>
        <Typography sx={{ color: TEXT_COLOR.BLUE.BLUE1 }}>7</Typography>
      </Box>
      <IconButton
        sx={{ mr: 2, p: '0px', border: `2px solid ${TEXT_COLOR.BLUE.BLUE2}` }}
        onClick={() => handleOnChangePage(1)}
      >
        <KeyboardArrowRightRoundedIcon
          sx={{ fontSize: 20, color: TEXT_COLOR.BLUE.BLUE2 }}
        />
      </IconButton>
      <IconButton
        sx={{ p: '0px', border: `2px solid ${TEXT_COLOR.BLUE.BLUE1}` }}
        onClick={() => handleOnChange('last')}
      >
        <KeyboardDoubleArrowRightRoundedIcon
          sx={{ fontSize: 20, color: TEXT_COLOR.BLUE.BLUE1 }}
        />
      </IconButton>
    </Box>
  );
}
