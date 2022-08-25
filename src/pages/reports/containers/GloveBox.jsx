import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/main-layout';

export default function GloveBox() {
  const { t } = useTranslation();
  return (
    <MainLayout
      breadcrumbs={{
        trailing: [{ label: t('top_bar.reports') }, { label: 'TSB DOCS' }],
      }}
      isShowSidebar
    >
      TSB DOCS
    </MainLayout>
  );
}
