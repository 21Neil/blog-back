import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes.jsx';
import LoadingProvider from './context/Loading/LoadingProvider.jsx';
import AuthProvider from './context/Auth/AuthProvider.jsx';
import { MantineProvider } from '@mantine/core';
import theme from './theme.jsx';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>
);
