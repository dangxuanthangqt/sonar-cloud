import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/main-layout';
import CairDetailed from './components/CairDetailed';

export default function Cair() {
  const { t } = useTranslation();

  return (
    <MainLayout
      breadcrumbs={{
        trailing: [
          { label: t('top_bar.reports') },
          { label: 'CAIR Categorization' },
        ],
      }}
      isShowSidebar
    >
      {/* <Typography variant="h4">Cair page</Typography> */}
      <Routes>
        <Route path="cair-detailed-report" element={<CairDetailed />} />
      </Routes>
      <Routes>
        <Route
          path="cair-production-detailed"
          element={<div>cairProductionDetailed</div>}
        />
      </Routes>
      <Routes>
        <Route
          path="cair-detailed-redacted"
          element={<div>cairDetailedRedacted</div>}
        />
      </Routes>
      <Routes>
        <Route
          path="cair-no-address-redacted"
          element={<div>cairNoAddressRedacted</div>}
        />
      </Routes>
    </MainLayout>
  );
}
