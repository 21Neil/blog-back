import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ChakraProvider value={defaultSystem}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </StrictMode>
);
