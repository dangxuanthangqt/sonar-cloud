import { Check, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { forEach, isEmpty, omit, some } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { updateDataRequest } from 'services/data-request-service';
import { useNavigate } from 'react-router-dom';
import { dataSourceStateAtom } from '@/recoil/atom/data-source-state';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import MainLayout from '@/components/main-layout';
import BackdropLoading from '@/components/backdrop-loading';
import FormGroup from './components/FormGroup';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { steps } from '@/components/horizontal-stepper/constant';
import { StepperInfo } from '@/components/stepper-info';

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
}));

function DataSources({ isLoading }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();

  const [dataSourceState, setDataSourceState] =
    useRecoilState(dataSourceStateAtom);
  const {
    data: { dataSourceSection, id: dataRequestId },
  } = dataRequestStateValue || {};

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

  useEffect(() => {
    if (!isEmpty(dataSourceState) && !isLoading) {
      reset(dataSourceState);
      return;
    }
    if (dataSourceSection) {
      reset({ formGroups: dataSourceSection.dataSourceGroups });
    }
  }, [dataSourceSection, dataSourceState]);

  const { mutate, isLoading: updateDataRequestLoading } = useMutation(
    ['updateDataRequest'],
    (data) => updateDataRequest({ requestId: 255, data })
  );

  const isDataSourceSectionDisabled = useMemo(
    () => dataSourceSection?.permission?.readOnlyControl,
    [dataSourceSection]
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

  const onSubmit = (data) => {
    const { formGroups } = data;
    const payload = {
      id: dataRequestId,
      formSections: [
        {
          id: dataSourceSection?.id,
          name: dataSourceSection?.title,
          formGroups: formGroups.map((group) => ({
            ...omit(group, ['value', 'helpText']),
          })),
        },
      ],
    };
    mutate(payload);
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
  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      setDataToRecoilStore={setDataSourceState}
      breadcrumbs={{
        trailing: [
          { label: t('breadcrumbs.create_new_request') },
          { label: t('sidebar.data_sources') },
        ],
        moreAction: !isDataSourceSectionDisabled && !isLoading && (
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
            <LoadingButton
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
            </LoadingButton>
          </div>
        ),
      }}
    >
      <BackdropLoading open={isLoading} />
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
                disabled={
                  isDataSourceSectionDisabled ||
                  restField.permission?.readOnlyControl ||
                  updateDataRequestLoading
                }
                groupIdx={idx}
                setValue={setValue}
              />
            </Grid>
          ))}
      </Grid>
      <Button
        onClick={() => {
          setDataSourceState(getValues());
          setActiveStep((prevActiveStep) => {
            navigate(steps[activeStep + 1].path);
            return prevActiveStep + 1;
          });
        }}
        sx={{
          width: '123px',
          height: '40px',
          backgroundColor: '#0F81C0',
          color: '#FFFFFF',
          mt: '30px',
        }}
        variant="contained"
      >
        Next
      </Button>
    </MainLayout>
  );
}

export default DataSources;
