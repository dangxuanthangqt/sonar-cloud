/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { ChevronLeft } from '@mui/icons-material';

import { Box, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isEmpty } from 'lodash';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import MainLayout from '@/components/main-layout';
import RequestTitle from './components/RequestTitle';
import AdditionalOptionalField from './components/AdditionalOptionalFields';
import Keyword from './components/Keywords';
import Vehicle from './components/Vehicles';
import SalesCode from './components/SalesCode';
import Dates from './components/Dates';
import LOPParts from './components/LOPParts';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import DataSourceSummary from '@/components/data-source-summary';

const useStyles = makeStyles((theme) => ({
  step: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 700,
    marginBlock: 6,
  },
  heading: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
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
  label: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
  additional_label: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
  },
  data_source: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  load_in: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 18,
    marginTop: 7,
  },
  multiInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      '&:hover': {
        border: 'none',
      },
    },
  },
  data_source_1: {
    padding: 10,
    backgroundColor: theme.palette.secondary.tab_bg,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
    marginBlock: 2,
  },
  keyword: {
    backgroundColor: theme.palette.secondary.ligt_bg,
    borderRadius: 6,
  },
  keyword_bolts: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 600,
  },
  keyword_heading: {
    backgroundColor: theme.palette.primary.light,
    padding: 9,
    fontSize: 11,
    borderRadius: 4,
    fontWeight: 400,
  },
  keyword_applied: {
    color: theme.colors.gray,
    fontSize: 14,
    fontWeight: 400,
  },
  inner_box: {
    paddingLeft: 18,
  },
  next_button: {
    marginTop: 50,
    width: '10%',
    marginBottom: 50,
  },
}));

function Summary({ isLoading }) {
  const { t } = useTranslation();
  const [completed, setCompleted] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(8);

  const classes = useStyles();

  return (
    <MainLayout
      isShowSideBarStepper
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Summary' },
        ],
      }}
    >
      <RequestTitle />
      <Typography className={classes.step}>Step 8</Typography>
      {/* <AdditionalOptionalField /> */}
      <Keyword />
      <Vehicle />
      <SalesCode />
      <Dates />
      <LOPParts />
      <LoadingButton
        variant="contained"
        color="primary"
        className={classes.next_button}
      >
        {t('buttons.submit')}
      </LoadingButton>
    </MainLayout>
  );
}

export default Summary;
