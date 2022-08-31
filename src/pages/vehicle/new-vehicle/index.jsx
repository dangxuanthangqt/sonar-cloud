import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty, omit, last } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import { STEPS } from 'mocks/requests-view/mockData';
import { Box } from '@mui/system';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import makeStyles from '@mui/styles/makeStyles';
import MainLayout from '@/components/main-layout';
import BackdropLoading from '@/components/backdrop-loading';
import Plant from './components/Plant';
import VehicleList from './components/VehicleList';
import { conditions, vehicleSchema } from './validationSchemas';
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import { vehicleStateAtom } from '@/recoil/atom/vehicle-state';
import { propertiesVehicle, vehicleDefaultItemValue } from '../constant';
import { StepperInfo } from '@/components/stepper-info';
import { activeStepStateAtom } from '@/recoil/atom/layout-state';
import { steps } from '@/components/horizontal-stepper/constant';
import DataSourceSummary from '@/components/data-source-summary';
import RequestTitle from '@/pages/summary/components/RequestTitle';
import { requestTitleStateAtom } from '@/pages/data-sources/stores/request-title-state';

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '70px',
    marginTop: '30px',
  },
  btnPrevious: {
    width: '123px',
    height: '40px',
    color: '#0F81C0',
    marginTop: '30px',
    border: '1px solid #0F81C0',
    '&:hover': {
      border: '1px solid #0F81C0',
    },
  },
  btnNext: {
    width: '123px',
    height: '40px',
    color: '#FFFFFF',
    marginTop: '30px',
    marginBottom: '20px',
    pointerEvents: 'all !important',
  },
}));

function NewVehicle({ isLoading }) {
  const classes = useStyles();

  const { t } = useTranslation('vehicles');
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [vehicleState, setVehicleState] = useRecoilState(vehicleStateAtom);
  const [requestTitleState, setRequestTitleState] = useRecoilState(
    requestTitleStateAtom
  );
  const handleErrorRequestTitle = (message = '') => {
    setRequestTitleState({
      ...requestTitleState,
      error: message,
    });
  };

  const {
    data: { vehicleSection },
  } = dataRequestStateValue || {};

  const { control, reset, setValue, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      plantGroup: {
        plant: null,
      },
      vehicles: [
        {
          ...vehicleDefaultItemValue,
        },
      ],
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(vehicleSchema),
    context: {
      schema: conditions,
      t,
    },
  });

  const { fields, append } = useFieldArray({ control, name: 'vehicles' });

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (!isEmpty(vehicleState) && !isLoading) {
      reset(vehicleState);
      return;
    }
    if (vehicleSection) {
      const dataForm = {
        plantGroup: {
          ...vehicleSection?.plantGroup,
          plant: {
            ...vehicleSection?.plantGroup?.plant,
            value:
              vehicleSection?.plantGroup?.plant?.values?.map((p) => ({
                value: p,
                label: p,
              })) || [],
          },
        },
        vehicles:
          vehicleSection?.vehicleCriteriaGroup?.vehicleCriteriaList?.map(
            (v) => {
              const r = {};
              Object.keys(v).forEach((key) => {
                r[key] = { ...v[key] };
                if (
                  !['fromYear', 'toYear', 'bodyDescription', 'id'].includes(key)
                ) {
                  r[key].value = {
                    value: v[key].value,
                    label: v[key].value,
                  };
                }
              });
              return r;
            }
          ),
      };
      reset(dataForm);
    }
  }, [vehicleSection, vehicleState]);

  const watchFieldArray = watch('vehicles');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const allDisabled = useMemo(
    () => vehicleSection?.permission?.readOnlyControl,
    [vehicleSection]
  );

  const plantGroupDisabled = useMemo(
    () =>
      allDisabled || vehicleSection?.plantGroup?.permission?.readOnlyControl,
    [allDisabled, vehicleSection]
  );

  const vehicleSectionDisabled = useMemo(
    () =>
      allDisabled ||
      vehicleSection?.vehicleCriteriaGroup?.permission?.readOnlyControl,
    [allDisabled, vehicleSection]
  );

  const onSubmit = (data) => {
    // TODO: call API to submit data
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  const handleAppendNewRow = () => {
    const lastRow = last(controlledFields);
    const newRow = {};
    Object.keys(omit(lastRow, ['id'])).forEach((key) => {
      newRow[key] = {
        ...lastRow[key],
        value: '',
        // value: typeof lastRow[key].value === 'string' ? '' : null,
      };
    });
    append(newRow);
  };

  const dataSourceSummary = useDataSourceSummary(STEPS.VEHICLES);

  return (
    <MainLayout
      isShowSideBarStepper
      handleSubmit={handleSubmit}
      setDataToRecoilStore={setVehicleState}
      errors={errors}
      step={STEPS.VEHICLES}
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: t('common:sidebar.vehicle') },
        ],
        moreAction: !allDisabled && (
          <LoadingButton
            variant="contained"
            color="primary"
            className="save-button"
            onClick={handleSubmit(onSubmit)}
          >
            {t('common:buttons.save_parameters')}
          </LoadingButton>
        ),
      }}
    >
      <BackdropLoading open={isLoading} />
      <RequestTitle />
      <DataSourceSummary dataSummary={dataSourceSummary} />
      <StepperInfo step={3} name="Vehicles" />
      <Plant
        plant={vehicleSection?.plantGroup?.plant}
        disabled={plantGroupDisabled}
        title={vehicleSection?.plantGroup?.title}
        control={control}
        setValue={setValue}
      />
      <VehicleList
        requiredFields={conditions.required}
        properties={propertiesVehicle}
        // properties={omit(properties, ['id'])}
        control={control}
        fields={controlledFields}
        t={t}
        setValue={setValue}
        title={vehicleSection?.vehicleCriteriaGroup?.title}
        disabled={vehicleSectionDisabled}
        append={handleAppendNewRow}
      />
      <Box className={classes.btnContainer}>
        <Button
          onClick={() => {
            handleSubmit(() => {
              if (requestTitleState?.value) {
                handleErrorRequestTitle('');
                setVehicleState(getValues());
                setActiveStep((prevActiveStep) => {
                  navigate(steps[activeStep - 1].path);
                  return prevActiveStep - 1;
                });
              } else {
                handleErrorRequestTitle('Request title is required');
              }
            })();
          }}
          className={classes.btnPrevious}
          variant="outlined"
          startIcon={<SkipPreviousRoundedIcon />}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            handleSubmit(() => {
              if (requestTitleState?.value) {
                handleErrorRequestTitle('');
                setVehicleState(getValues());
                setActiveStep((prevActiveStep) => {
                  navigate(steps[activeStep + 1].path);
                  return prevActiveStep + 1;
                });
              } else {
                handleErrorRequestTitle('Request title is required');
              }
            })();
          }}
          className={classes.btnNext}
          sx={{
            backgroundColor: !isEmpty(errors)
              ? 'rgba(0, 0, 0, 0.38)'
              : '#0F81C0',
            '&:hover': {
              cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
            },
          }}
          variant="contained"
          disabled={!isEmpty(errors)}
          endIcon={<SkipNextRoundedIcon />}
        >
          {dataSourceSummary?.required?.length ? 'Next' : 'Skip'}
        </Button>
      </Box>
    </MainLayout>
  );
}

export default NewVehicle;
