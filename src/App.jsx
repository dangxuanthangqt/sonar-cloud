import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  RecoilRoot,
  // eslint-disable-next-line camelcase
  useRecoilTransactionObserver_UNSTABLE,
} from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from 'layouts/baseStyle';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { dataRequestStateAtom } from '@/recoil/atom/data-request-state';
import { vehicleStateAtom } from '@/recoil/atom/vehicle-state';
import { keywordsStateAtom } from './recoil/atom/keywords-state';
import { dataSourceStateAtom } from './recoil/atom/data-source-state';
import { salesCodeStateAtom } from './recoil/atom/sales-code-state';
import { lopsAndPartsStateAtom } from './recoil/atom/lops-and-parts-state';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function DebugObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    // eslint-disable-next-line no-underscore-dangle
    window._APP_STATE = {
      dataRequestState: snapshot.getLoadable(dataRequestStateAtom).contents,
      dataSourceState: snapshot.getLoadable(dataSourceStateAtom).contents,
      keywordsState: snapshot.getLoadable(keywordsStateAtom).contents,
      vehicleState: snapshot.getLoadable(vehicleStateAtom).contents,
      saleCodeState: snapshot.getLoadable(salesCodeStateAtom).contents,
      lopsAndPartState: snapshot.getLoadable(lopsAndPartsStateAtom).contents,
    };
  });
  return null;
}

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RecoilRoot>
              <AppRoutes />
              <DebugObserver />
            </RecoilRoot>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
