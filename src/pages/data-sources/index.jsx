import { Check, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { forEach, isEmpty, omit, some } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  dataSourceStateAtom,
  dataSourceResponseStateAtom,
} from '@/recoil/atom/data-source-state';
import MainLayout from '@/components/main-layout';
import BackdropLoading from '@/components/backdrop-loading';
import FormGroup from './components/FormGroup';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { steps } from '@/components/horizontal-stepper/constant';
import { StepperInfo } from '@/components/stepper-info';
import RequestTitle from '../summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

import {
  createDataSourceRequest,
  getAllDataSources,
} from '../../services/datasource-service';

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-label': {
      fontWeight: 600,
    },
    '& .save-button': {
      marginLeft: theme.spacing(2),
    },
  },
  selectAllBtnRoot: {
    textTransform: 'none',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    marginBottom: '70px',
  },
  btnCancel: {
    width: '123px',
    height: '40px',
    color: '#FD4747',
    marginTop: '30px',
    border: '1px solid #FD4747',
    '&:hover': {
      border: '1px solid #FD4747',
    },
  },
  btnNext: {
    width: '123px',
    height: '40px',
    backgroundColor: '#0F81C0',
    color: '#FFFFFF',
    marginTop: '30px',
  },
}));

function DataSources() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const [responseDatasource, setResponseDatasource] = useRecoilState(
    dataSourceResponseStateAtom
  );

  const navigate = useNavigate();

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);

  /** Fetch all data sources master */
  const { data: dataSourceMaster, isLoading } = useQuery(
    ['getAllDataSources'],
    () => getAllDataSources(),
    {
      select: (res) => res.data,
    }
  );

  const { control, reset, getValues, setValue, handleSubmit, watch } = useForm({
    defaultValues: { formGroups: [] },
  });

  const { fields } = useFieldArray({ control, name: 'formGroups' });

  /** Controlled filed array */
  const watchFieldArray = watch('formGroups');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  useEffect(() => {
    if (!isEmpty(dataSourceState) && !isLoading) {
      reset(dataSourceState);
      return;
    }
    if (dataSourceMaster) {
      reset({ formGroups: dataSourceMaster.dataSourceGroups });
    }
  }, [dataSourceMaster, dataSourceState]);

  const {
    data: responseDataSources,
    mutate: mutateDataSourceRequest,
    isLoading: createDataSourceLoading,
  } = useMutation(['createDataSources'], (payload) =>
    createDataSourceRequest('hererer', payload)
  );

  const handleSelectAll = (isAll) => {
    setIsAllSelected((prev) => !prev);
    forEach(getValues('formGroups'), (el, idx) => {
      if (el.permission?.readOnlyControl) return;
      forEach(el.dataSources, (dataSource, dataSourceIdx) => {
        if (dataSource.permission?.readOnlyControl) return;
        setValue(`formGroups.${idx}.dataSources.${dataSourceIdx}.value`, isAll);
      });
    });
  };

  const watchFormGroups = useWatch({ name: 'formGroups', control });

  const mutateCreation = ({ onSuccess, payload }) => {
    return mutateDataSourceRequest(payload, { onSuccess });
  };

  const formatDataSubmitted = (values) => {
    const dataSourceGroupFormatted = values?.formGroups.reduce((acc, item) => {
      const dataSources = item?.dataSources
        ?.filter((item1) => item1.value)
        ?.map((item2) => ({ id: item2.id }));
      if (dataSources?.length > 0)
        return [
          ...acc,
          {
            id: item?.id,
            dataSources,
          },
        ];
      return acc;
    }, []);
    return {
      title: requestTitleState?.value,
      dataSourceGroups: dataSourceGroupFormatted,
    };
  };

  useEffect(() => {
    if (
      some(
        watchFormGroups,
        (el) => !el.permission?.readOnlyControl && !el.value
      )
    ) {
      setIsAllSelected(false);
      return;
    }
    setIsAllSelected(true);
  }, [watchFormGroups]);

  useEffect(() => {
    setResponseDatasource(responseDataSources?.data);
  }, [responseDataSources]);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      mutateCreation={mutateCreation}
      formatDataSubmitted={formatDataSubmitted}
      setDataToRecoilStore={setDataSourceState}
      breadcrumbs={{
        trailing: [
          { label: t('breadcrumbs.create_new_request') },
          { label: t('sidebar.data_sources') },
        ],
        moreAction: !isLoading && (
          <div className={classes.actionContainer}>
            <Button
              variant={!isAllSelected ? 'outlined' : 'contained'}
              color="primary"
              startIcon={<Check />}
              classes={{ root: classes.selectAllBtnRoot }}
              onClick={() => handleSelectAll(!isAllSelected)}
            >
              {!isAllSelected
                ? t('buttons.select_all')
                : t('buttons.unselect_all')}
            </Button>
            {/* <LoadingButton
              variant="contained"
              color="primary"
              className="save-button"
              onClick={handleSubmit(onSubmit)}
              loading={updateDataRequestLoading}
              {...(updateDataRequestLoading && {
                loadingPosition: 'start',
                startIcon: <Save />,
              })}
            >
              {updateDataRequestLoading
                ? t('buttons.in_progress')
                : t('buttons.save_parameters')}
            </LoadingButton> */}
          </div>
        ),
      }}
    >
      <BackdropLoading open={isLoading || createDataSourceLoading} />
      <RequestTitle title="Create New Request" />
      <StepperInfo step={1} name="Data Sources" />
      <Grid container className={classes.body} spacing={3}>
        {!isLoading &&
          controlledFields?.map(({ id, ...restField }, idx) => (
            <Grid item xs={12} lg={idx === 0 ? 12 : 3} key={id}>
              <FormGroup
                control={control}
                formGroup={restField}
                name={`formGroups.${idx}.value`}
                key={id}
                label={restField.title}
                isFirst={idx === 0}
                // disabled={
                //   isDataSourceSectionDisabled ||
                //   restField.permission?.readOnlyControl ||
                //   updateDataRequestLoading
                // }
                groupIdx={idx}
                setValue={setValue}
              />
            </Grid>
          ))}
      </Grid>
      <Box className={classes.btnContainer}>
        <Button
          onClick={() => {
            handleErrorRequestTitle('');
            reset({ formGroups: dataSourceMaster?.dataSourceGroups });
            setDataSourceState({
              formGroups: dataSourceMaster?.dataSourceGroups,
            });
          }}
          className={classes.btnCancel}
          variant="outlined"
          startIcon={<CancelOutlinedIcon />}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (requestTitleState?.value) {
              handleErrorRequestTitle('');
              handleSubmit((values) => {
                mutateDataSourceRequest(formatDataSubmitted(values), {
                  onSuccess: () => {
                    setDataSourceState(values);
                    setActiveStep((prevActiveStep) => {
                      navigate(steps[activeStep + 1].path);
                      return prevActiveStep + 1;
                    });
                  },
                });
              })();
            } else {
              handleErrorRequestTitle('Request title is required');
            }
          }}
          className={classes.btnNext}
          variant="contained"
          endIcon={<SkipNextRoundedIcon />}
        >
          Next
        </Button>
      </Box>
    </MainLayout>
  );
}

export default DataSources;
