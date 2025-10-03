import App from './App';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Error } from './pages/Error/Error';
import { Login } from './pages/Login/Login';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
];
