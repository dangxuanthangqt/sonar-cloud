import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/main-layout';
import MuiDataGrid from '../mui-grid/components/MuiDataGrid';

function Dashboard() {
  const { t } = useTranslation('dashboard');
  return (
    <MainLayout
      breadcrumbs={{
        trailing: [
          { label: t('breadcrumbs.create_new_request') },
          { label: t('sidebar.data_sources') },
        ],
      }}
    >
      <MuiDataGrid />
    </MainLayout>
  );
}

export default Dashboard;
