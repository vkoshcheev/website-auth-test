import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import materialUiTheme from './materialUiTheme';
import { LoginStepProvider } from './context';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={materialUiTheme}>
        <LoginStepProvider>
          <App />
        </LoginStepProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
