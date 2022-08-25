import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/main-layout';
import MuiDataGrid from './components/MuiDataGrid';

function MuiGrid({ isLoading }) {
  const { t } = useTranslation();
  return (
    <MainLayout
      isShowSideBarStepper
      breadcrumbs={{
        trailing: [
          { label: t('common:breadcrumbs.create_new_request') },
          { label: 'Mui Grid' },
        ],
        moreAction: !isLoading && (
          <LoadingButton
            variant="contained"
            color="primary"
            className="save-button"
            // onClick={handleSubmit(onSubmit)}
          >
            {t('common:buttons.save_parameters')}
          </LoadingButton>
        ),
      }}
    >
      <MuiDataGrid isLoading={isLoading} />
    </MainLayout>
  );
}

export default MuiGrid;
