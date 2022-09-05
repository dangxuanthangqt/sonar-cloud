/* eslint-disable react/no-array-index-key */
import {
  Button,
  FormLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { AddCircle } from '@mui/icons-material';
import IntegerControl from '@/components/integer-control';
import StringControl from '@/components/string-control';
import DynamicSingleValueLookup from '@/components/dynamic-single-value-lookup';

const useStyles = makeStyles((theme) => ({
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
  },
  rootTableHeader: {
    '& .MuiFormLabel-root': {
      color: theme.palette.secondary.main,
      fontWeight: 500,
    },
  },
  rootTableBody: {
    '& .MuiTableCell-body': {
      border: 'none',
    },
  },
}));

function FieldRendering({ type, isVehicleStep, ...props }) {
  if (type === 'StringControl') return <StringControl {...props} />;

  if (type === 'DynamicSingleValueLookup')
    return (
      <DynamicSingleValueLookup
        {...props}
        getOptionLabel={(o) => `${o.value} - ${o.label}`}
        handleOptions={(options) => options?.data || []}
      />
    );

  if (type === 'IntegerControl')
    return <IntegerControl isVehicleStep={isVehicleStep} {...props} />;

  return <StringControl {...props} />;
}

function VehicleList({
  properties,
  requiredFields,
  t,
  control,
  fields,
  setValue,
  title,
  disabled,
  append,
}) {
  const classes = useStyles();
  return (
    <Paper className="mt-4 rounded-lg overflow-hidden">
      <div className={classes.header}>
        <Typography>{title}</Typography>
      </div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead classes={{ root: classes.rootTableHeader }}>
            <TableRow>
              {Object.keys(properties || {})?.map((el) => (
                <TableCell
                  style={{ ...(el !== 'bodyDescription' && { width: 150 }) }}
                  key={el}
                >
                  <FormLabel className="text-xs font-medium">
                    {t(`vehicle_form.fields.${el}`)}
                  </FormLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody classes={{ root: classes.rootTableBody }}>
            {fields.map(({ id, ...restField }, idx) => {
              return (
                <TableRow key={id}>
                  {Object.keys(properties || {})?.map((el) => (
                    <TableCell component="th" scope="row" key={`${el}-${id}`}>
                      <FieldRendering
                        isVehicleStep
                        control={control}
                        name={`vehicles[${idx}].${el}.value`}
                        required={requiredFields.includes(el)}
                        disabled={disabled}
                        permissions={restField?.[el]?.permission}
                        {...restField[el]}
                        maxLength={properties[el]?.maxLength}
                        minLength={properties[el]?.minLength}
                        minimum={properties[el]?.minimum}
                        url={properties[el]?.url}
                        maximum={properties[el]?.maximum}
                        type={properties[el].originalRef}
                        placeholder={t(`vehicle_form.fields.${el}`)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="text"
        startIcon={
          <AddCircle fontSize="inherit" sx={{ width: 32, height: 32 }} />
        }
        size="large"
        onClick={append}
        className="ml-4 pl-0 hover:bg-transparent capitalize font-[700]"
      >
        Add New Row
      </Button>
    </Paper>
  );
}

export default VehicleList;
