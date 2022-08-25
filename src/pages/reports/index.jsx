import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import MainLayout from '@/components/main-layout';
import { reportsRoutes } from '@/routes/constants';

function Reports() {
  const { t } = useTranslation();
  return (
    <MainLayout
      breadcrumbs={{
        trailing: [{ label: t('top_bar.reports') }, { label: 'Reports' }],
      }}
      isShowSidebar
    >
      <Typography variant="h4">Reports page</Typography>
      <Routes>
        <Route path="glove-box" element={<div>Glove box</div>} />
        <Route path="tsb-document" element={<div>TSB Docs</div>} />
        <Route path="cherwell" element={<div>cherwell</div>} />
        <Route path="repair-order" element={<div>repair-order</div>} />
      </Routes>
    </MainLayout>
  );
}

export default Reports;
