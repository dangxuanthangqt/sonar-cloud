/* eslint-disable react/no-array-index-key */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import makeStyles from '@mui/styles/makeStyles';
import { difference } from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { TEXT_COLOR } from '@/layouts/constant';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
    color: TEXT_COLOR.BLUE.BLUE1,
  },
  input: {
    '& .MuiInput-root': {
      '& input': {
        fontSize: 14,
      },
    },
  },
}));

function Item({
  isParent = false,
  selected = [],
  parentData,
  childData,
  openCollapse,
  setOpenCollapse,
  hasCollapse = false,
  parentIndex,
  handleOnChangeCheckbox,
  handleOnChangeInput,
  keyUnique,
  keyUniqueChild,
}) {
  const classes = useStyles();

  const getSelectedValue = () => {
    if (!isParent) {
      return selected && !!selected?.includes(childData?.value);
    }
    return (
      difference(
        parentData?.child?.map((i) => i.value),
        selected
      ).length === 0
    );
  };

  const [inputValue, setInputValue] = useState(
    isParent ? parentData?.value : childData?.value
  );
  const handleOnChangeInputItem = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    handleOnChangeInput({
      parentIndex,
      keyUnique,
      value: inputValue,
      parentData,
      isParent,
      keyUniqueChild,
    });
  }, [inputValue]);

  const getLabel = () => {
    if (parentData?.isAddNewParent || childData?.isAddNewChild) return '';
    return isParent ? parentData?.label : childData?.label;
  };

  const renderInput = () => {
    return (
      <TextField
        variant="standard"
        value={isParent ? parentData?.value : childData?.value}
        className={classes.input}
        sx={{ ml: -2 }}
        onChange={handleOnChangeInputItem}
      />
    );
  };

  return (
    <ListItemButton
      sx={{ pl: isParent ? 0 : 4, py: 0, height: '30px' }}
      className="flex justify-between items-center"
      role="button"
    >
      <div className="flex justify-between items-center">
        <MenuIcon
          className="mr-2"
          sx={{
            color: TEXT_COLOR.GRAY.GRAY1,
            fontSize: 20,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={isParent ? parentData?.value : childData?.value}
              color="primary"
              checked={getSelectedValue()}
              onChange={(e) => {
                handleOnChangeCheckbox({
                  parentData,
                  childValue: e.target.value,
                  parentIndex,
                  isParent,
                });
              }}
            />
          }
          label={getLabel()}
          color="primary"
          classes={{ label: classes.label }}
        />
        {(parentData?.isAddNewParent || childData?.isAddNewChild) &&
          renderInput()}
      </div>
      {hasCollapse && (
        <div>
          <span>
            <IconButton
              onClick={() => setOpenCollapse(!openCollapse)}
              aria-label="expand row"
              size="small"
            >
              {openCollapse ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </span>
        </div>
      )}
    </ListItemButton>
  );
}

function CategorizationList({
  item,
  index,
  handleOnChangeCheckbox,
  selected,
  handleAddNewChild,
  handleOnChangeInput,
  applyDrag,
  keyUnique,
  checkBoxRecursive,
  setCheckboxRecursive,
}) {
  const [openCollapse, setOpenCollapse] = React.useState(true);

  const handleDragDropChild = (e) => {
    const tempData = {
      ...item,
      child: applyDrag(item?.child, e),
    };
    setCheckboxRecursive({
      ...checkBoxRecursive,
      dataMaster: checkBoxRecursive?.dataMaster.map((itemChild) => {
        if (itemChild.key === keyUnique)
          return {
            ...itemChild,
            child: applyDrag(itemChild?.child, e),
          };
        return itemChild;
      }),
    });
  };

  return (
    <div
      style={{
        display: item?.hidden ? 'none' : 'block',
      }}
    >
      <Item
        isParent
        parentData={item}
        parentIndex={index}
        selected={selected}
        openCollapse={openCollapse}
        setOpenCollapse={setOpenCollapse}
        hasCollapse
        handleOnChangeCheckbox={handleOnChangeCheckbox}
        handleOnChangeInput={handleOnChangeInput}
        keyUnique={keyUnique}
      />
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Container onDrop={(e) => handleDragDropChild(e)}>
            {item?.child?.map((itemChild, index1) => {
              return (
                <Draggable key={itemChild.key}>
                  <Item
                    childData={itemChild}
                    parentData={item}
                    selected={selected}
                    openCollapse={openCollapse}
                    setOpenCollapse={setOpenCollapse}
                    handleOnChangeCheckbox={handleOnChangeCheckbox}
                    handleOnChangeInput={handleOnChangeInput}
                    keyUniqueChild={itemChild?.key}
                    keyUnique={keyUnique}
                  />
                </Draggable>
              );
            })}
          </Container>
        </List>
        <Button
          sx={{ textTransform: 'none', ml: '56px', height: '30px', mt: '3px' }}
          className="flex align-center"
          onClick={() => handleAddNewChild({ keyUnique })}
          startIcon={
            <AddCircleIcon
              sx={{ fontSize: 20, color: TEXT_COLOR.GRAY.GRAY1 }}
            />
          }
        >
          <Typography
            sx={{
              color: TEXT_COLOR.GRAY.GRAY1,
              fontSize: 12,
            }}
          >
            Add Subgroup
          </Typography>
        </Button>
      </Collapse>
    </div>
  );
}

export default CategorizationList;
