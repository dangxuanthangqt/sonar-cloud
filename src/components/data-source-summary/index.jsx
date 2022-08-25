/* eslint-disable react/destructuring-assignment */
import { ExpandMore } from '@mui/icons-material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { Box, Collapse, Grid, ListItemButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '15px',
  },
  customIcon: {
    fontSize: 20,
    borderRadius: '50%',
    backgroundColor: '#0F81C0',
    color: '#FFFFFF',
  },
  customItem: {
    height: '30px',
    width: 'fit-content',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 10px',
    marginLeft: '10px',
    marginBottom: '10px',
    borderRadius: '3px',
  },
  customItemRequired: {
    backgroundColor: 'rgba(139, 207, 244, 0.2)',
    color: '#0F81C0',
  },
  customItemOptional: {
    backgroundColor: 'rgba(15, 192, 86, 0.2)',
    color: '#0FC056',
  },
  customNotApplicable: {
    backgroundColor: 'rgba(124, 124, 124, 0.2)',
    color: '#7C7C7C',
  },
}));
export default function DataSourceSummary(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { dataSummary = {}, child } = props;
  const formattedData = [
    {
      name: 'Required',
      data: dataSummary?.required,
    },
    {
      name: 'Optional',
      data: dataSummary?.optional,
    },
    {
      name: 'Not Applicable',
      data: dataSummary?.notApplicable,
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const renderRow = (name, data) => {
    return (
      <Grid
        container
        sx={{
          borderBottom: '1px solid #E0E0E0',
          minHeight: '50px',
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(186, 186, 186, 0.2)',
            paddingLeft: '15px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              fontWeight: '700',
            }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            paddingBottom: 0,
          }}
        >
          {data?.map((item, index) => {
            return (
              <Typography
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={classNames(classes.customItem, {
                  [classes.customItemRequired]: name === 'Required',
                  [classes.customItemOptional]: name === 'Optional',
                  [classes.customNotApplicable]: name === 'Not Applicable',
                })}
              >
                {item}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={classes.container}>
      <ListItemButton
        sx={{
          backgroundColor: '#EDF4FB',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        {open ? (
          <ExpandLessRoundedIcon className={classes.customIcon} />
        ) : (
          <ExpandMore className={classes.customIcon} />
        )}
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#0F81C0',
            marginLeft: '10px',
          }}
        >
          Data sources
        </Typography>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {formattedData?.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {renderRow(item.name, item.data)}
            </React.Fragment>
          );
        })}
      </Collapse>
      {child}
    </Box>
  );
}

const mockData = [
  {
    name: 'Required',
    data: [
      'Uncodable Claim Narrative (UCN)',
      'Straight Time Claim Narrative (STN)',
      'PE and Lease Vehicle Narrative (LSE)',
      'Dealer Problem sampling System (DPS)',
      'Digital Imaging Pre-Auth (DPA)',
      'Fast Feedback Narrative (FAS)',
      'CAGRIS Field Concern Report (CAG)',
    ],
  },
  {
    name: 'Optional',
    data: [
      'Customer assistance Inquiry Reports',
      'Dealer Repair Orders',
      'Recall Data (Only Launched Recalls)',
      'Star Report',
    ],
  },
  {
    name: 'Not  Applicable',
    data: [
      'Customer Promoter Score (CPS)',
      'Continuous Quality Insight (CQI)',
      'Vehicle Volume (Production)',
      'Warranty Claims',
    ],
  },
];
