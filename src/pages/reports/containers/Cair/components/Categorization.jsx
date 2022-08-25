import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { findIndex, remove } from 'lodash';
import { useEffect, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import CategorizationList from './CategorizationList';
import { uuidv4 } from '../../../../../common/utils/index';

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    boxShadow:
      '0px 0.830724px 1.66145px rgba(0, 0, 0, 0.1), 0px 0.830724px 1.66145px rgba(0, 0, 0, 0.1)',
    background: '#EDF4FB',
    fontSize: '13px',

    borderRadius: '6px 6px 0px 0px',
  },
  header: {
    borderRadius: '6px 6px 0px 0px',
    padding: '0px 14px',
    backgroundColor: '#0F81C0',
    color: '#FFFFFF',
    fontSize: '14px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  },
  body: {
    padding: '0px 16px',
    overflowY: 'scroll',
    height: `calc(60vh)`,
  },
  checkBox13: {
    height: '32px',
    '& .MuiFormControlLabel-label': {
      fontSize: '13px',
    },
  },
  inputSmall: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      width: '55px',
      height: '27px',
      '& input': {
        fontSize: '13px',
      },
    },
  },
  inputSearch: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '37px',
    },
  },
  line: {
    margin: '23px 0px',
    marginTop: '13px',
    marginBottom: '20px',
    border: '1px solid #A7A6A6',
  },
}));

function Categorization({
  checkBoxRecursive,
  setCheckboxRecursive,
  checkBoxList,
  setCheckBoxList,
  radioList,
  setRadioList,
}) {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      // eslint-disable-next-line prefer-destructuring
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

  const handleOnchangeRadio = (value) => {
    setRadioValue(value);
    setRadioList({
      ...radioList,
      selected: value,
    });
  };

  const handleCheckboxListChange = (value) => {
    const composedData = {
      ...checkBoxList,
      selected: checkBoxList?.selected?.includes(value)
        ? checkBoxList?.selected?.filter((item) => item !== value)
        : [...checkBoxList?.selected, value],
    };
    setCheckBoxList(composedData);
  };

  const handleAddNewParent = () => {
    setCheckboxRecursive({
      ...checkBoxRecursive,
      dataMaster: [
        ...checkBoxRecursive.dataMaster,
        {
          key: uuidv4(),
          value: '',
          label: '',
          isAddNewParent: true,
          child: [
            {
              value: '',
              key: uuidv4(),
              label: '',
              isAddNewChild: true,
            },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    const { dataMaster } = checkBoxRecursive;
    const newDataMaster = dataMaster.map((item) => {
      const regex = new RegExp(searchValue, 'i');

      if (!searchValue) {
        return { ...item, hidden: false };
      }
      if (searchValue && regex.test(item.value)) {
        return {
          ...item,
          hidden: false,
        };
      }
      return {
        ...item,
        hidden: true,
      };
    });

    const composedData = {
      ...checkBoxRecursive,
      dataMaster: newDataMaster,
    };
    setCheckboxRecursive(composedData);
  }, [searchValue]);

  const handleAddNewChild = ({ keyUnique }) => {
    const { dataMaster } = checkBoxRecursive;
    const temp = dataMaster.map((item) => {
      if (item.key === keyUnique) {
        return {
          ...item,
          child: [
            ...item.child,
            {
              value: '',
              key: uuidv4(),
              label: '',
              isAddNewChild: true,
            },
          ],
        };
      }
      return item;
    });

    setCheckboxRecursive({
      ...checkBoxRecursive,
      dataMaster: [...temp],
    });
  };

  const handleOnChangeInput = ({
    parentIndex,
    value,
    parentData,
    keyUnique,
    keyUniqueChild,
    isParent,
  }) => {
    let temp = checkBoxRecursive.dataMaster;
    if (isParent) {
      temp = checkBoxRecursive?.dataMaster?.map((item, index) => {
        if (keyUnique === item?.key) {
          return {
            ...item,
            value,
            label: value,
          };
        }
        return item;
      });
      setCheckboxRecursive({ ...checkBoxRecursive, dataMaster: temp });
    } else {
      temp = checkBoxRecursive?.dataMaster?.map((item) => {
        if (keyUnique === item?.key) {
          return {
            ...item,
            child: item?.child?.map((childItem) => {
              if (keyUniqueChild === childItem?.key) {
                return {
                  ...childItem,
                  value,
                  label: value,
                };
              }
              return childItem;
            }),
          };
        }
        return item;
      });

      setCheckboxRecursive({ ...checkBoxRecursive, dataMaster: temp });
    }
  };

  const handleOnChangeCheckbox = ({
    parentData,
    childValue,
    parentIndex,
    isParent,
  }) => {
    const index = findIndex(
      checkBoxRecursive?.selected?.[parentData.value],
      (item) => item === childValue
    );

    let currentCheckboxList =
      checkBoxRecursive?.selected?.[parentData.value] || [];
    if (isParent) {
      if (!currentCheckboxList?.length) {
        currentCheckboxList = checkBoxRecursive?.dataMaster?.[
          parentIndex
        ]?.child?.map((item) => item.value);
      } else {
        currentCheckboxList = [];
      }
    } else if (index === -1) {
      currentCheckboxList.push(childValue);
    } else {
      remove(currentCheckboxList, (item) => item === childValue);
    }

    const formattedData = {
      ...checkBoxRecursive,
      selected: {
        ...checkBoxRecursive?.selected,
        [parentData.value]: currentCheckboxList,
      },
    };

    setCheckboxRecursive({ ...formattedData });
  };

  return (
    <div className={classNames('', classes.wrapper)}>
      <div className={classNames('', classes.header)}>Categorization</div>
      <div className={classNames('', classes.body)}>
        <div
          className={classNames('flex justify-between flex-wrap', classes.row)}
          style={{ marginTop: '12px' }}
        >
          {checkBoxList?.dataMaster?.map((item, index) => {
            return (
              <div className="flex items-center" key={uuidv4()}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={item?.value}
                      checked={checkBoxList?.selected?.includes(item?.value)}
                      onChange={(e) => handleCheckboxListChange(e.target.value)}
                    />
                  }
                  label={item?.label}
                  className={classes.checkBox13}
                />
                {item?.hasInput && (
                  <TextField
                    className={classNames(classes.inputSmall, 'text-sm')}
                    id="outlined-basic"
                    sx={{
                      fontSize: '13px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className={classNames('flex justify-between')}
          style={{ marginTop: '12px' }}
        >
          <FormControl className={classNames('')}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={radioValue}
              onChange={(e) => handleOnchangeRadio(e.target.value)}
              defaultValue="Responsive"
            >
              {radioList?.dataMaster?.map((item, index) => {
                return (
                  <FormControlLabel
                    className={classes.checkBox13}
                    value={item?.value}
                    control={<Radio />}
                    label={item?.label}
                    key={uuidv4()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classNames('', classes.line)} />
        <div
          className={classNames('flex justify-between', classes.row)}
          style={{ marginBottom: '22px' }}
        >
          <TextField
            className={classNames('', classes.inputSearch)}
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: <SearchIcon position="start" />,
            }}
          />
        </div>
        <div className={classNames('', classes.row)}>
          <Container
            onDrop={(e) =>
              setCheckboxRecursive({
                ...checkBoxRecursive,
                dataMaster: applyDrag(checkBoxRecursive?.dataMaster, e),
              })
            }
          >
            {checkBoxRecursive?.dataMaster?.map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Draggable key={index}>
                  <CategorizationList
                    item={item}
                    index={index}
                    keyUnique={item?.key}
                    className="flex flex-col"
                    name="groups"
                    handleOnChangeCheckbox={handleOnChangeCheckbox}
                    handleAddNewChild={handleAddNewChild}
                    handleOnChangeInput={handleOnChangeInput}
                    selected={checkBoxRecursive?.selected?.[item?.value]}
                    applyDrag={applyDrag}
                    checkBoxRecursive={checkBoxRecursive}
                    setCheckboxRecursive={setCheckboxRecursive}
                  />
                </Draggable>
              );
            })}
          </Container>
          <Button
            onClick={handleAddNewParent}
            sx={{ textTransform: 'none', height: 40 }}
            className="flex align-center"
            startIcon={<AddCircleIcon color="primary" />}
          >
            <Typography sx={{ fontSize: 14 }}> Add New</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Categorization;
