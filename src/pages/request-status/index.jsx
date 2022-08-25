import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/main-layout';

function RequestStatus() {
  const { t } = useTranslation();
  return (
    <MainLayout
      breadcrumbs={{
        trailing: [
          { label: t('top_bar.reports') },
          { label: 'Request status' },
        ],
      }}
    >
      Request status
    </MainLayout>
  );
}

export default RequestStatus;
