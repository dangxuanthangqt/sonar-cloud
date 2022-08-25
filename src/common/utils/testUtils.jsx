import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from 'layouts/baseStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { render as rtlRender } from '@testing-library/react';

function AllTheProviders({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Router>{children}</Router>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
};

export { render };
export * from '@testing-library/react';
