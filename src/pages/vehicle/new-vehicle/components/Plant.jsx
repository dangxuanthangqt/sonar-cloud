import { Chip, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { filter } from 'lodash';
import FixedMultipleValueLookup from '@/components/fixed-multiple-value-lookup';

const useStyles = makeStyles((theme) => ({
  root: {},
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  },
  body: {
    paddingLeft: theme.spacing(2),
    paddingBottom: 12,
    '& .MuiAutocomplete-root': {
      '& .MuiOutlinedInput-root': {
        width: 200,
        borderRadius: 4,
      },
    },
  },
}));

function Plant({ plant: plantData, disabled, title, control, setValue }) {
  const classes = useStyles();
  const [selectedPlants, setSelectedPlants] = useState([]);

  const watchPlant = useWatch({ control, name: 'plantGroup.plant.value' });

  const handleDelete = (plantSelected) => {
    setValue(
      'plantGroup.plant.value',
      filter(watchPlant, (plant) => plant.value !== plantSelected.value)
    );
  };

  return (
    <Paper className="rounded-lg overflow-hidden">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <div className={classes.body}>
        <FixedMultipleValueLookup
          control={control}
          name="plantGroup.plant.value"
          placeholder="Select Plant"
          extendOnChange={(v) => {
            setSelectedPlants(v);
          }}
          id="plant-select-outlined"
          disabled={disabled}
          handleOptions={(options) => options?.items}
          {...plantData}
          isHideValue
        />
        <div className={classes.chipContainer}>
          {selectedPlants?.map((plant, idx) => (
            <Chip
              label={plant?.label}
              onDelete={() => handleDelete(plant)}
              color="primary"
              key={plant?.value || idx}
              disabled={disabled}
              className="text-sm font-medium"
            />
          ))}
        </div>
      </div>
    </Paper>
  );
}

export default Plant;
