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

function NewVehicle({ isLoading }) {
  const { t } = useTranslation('vehicles');
  const [activeStep, setActiveStep] = useRecoilState(activeStepStateAtom);
  const navigate = useNavigate();
  const dataRequestStateValue = useRecoilValue(dataRequestStateAtom);
  const [vehicleState, setVehicleState] = useRecoilState(vehicleStateAtom);
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
      <StepperInfo step={3} name="Vehicles" />
      <DataSourceSummary dataSummary={dataSourceSummary} />
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

      <Button
        onClick={() => {
          handleSubmit(() => {
            setVehicleState(getValues());
            setActiveStep((prevActiveStep) => {
              navigate(steps[activeStep + 1].path);
              return prevActiveStep + 1;
            });
          })();
        }}
        sx={{
          width: '123px',
          height: '40px',
          backgroundColor: !isEmpty(errors) ? 'rgba(0, 0, 0, 0.38)' : '#0F81C0',
          color: '#FFFFFF',
          mt: '30px',
          mb: '20px',
          textTransform: 'none',
          '&:hover': {
            cursor: !isEmpty(errors) ? 'not-allowed' : 'pointer',
          },
          pointerEvents: 'all !important',
        }}
        variant="contained"
        disabled={!isEmpty(errors)}
      >
        {dataSourceSummary?.required?.length ? 'Next' : 'Skip'}
      </Button>
    </MainLayout>
  );
}

export default NewVehicle;
