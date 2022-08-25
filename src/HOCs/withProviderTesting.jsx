import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from 'layouts/baseStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function withProviderTesting(WrappedComponent) {
  function CompositionComponent() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <Router>
                <WrappedComponent />
              </Router>
            </RecoilRoot>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  return CompositionComponent;
}

export default withProviderTesting;
