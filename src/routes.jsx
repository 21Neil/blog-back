import App from './App';
import PostForm from './pages/PostForm/PostForm';
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
      {
        path: '/add-post',
        element: <PostForm />,
      },
      {
        path: '/edit-post',
        element: <PostForm />,
      }
    ],
  },
];
