import App from './App';
import PostForm from './pages/PostForm/PostForm';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Error } from './pages/Error/Error';
import { Login } from './pages/Login/Login';
import CommentsDashboard from './pages/CommentsDashboard/CommentsDashboard';

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
        path: '/edit-post/:id',
        element: <PostForm />,
      },
      {
        path: '/comments-dashboard/:id',
        element: <CommentsDashboard />,
      },
      {
        path: '/password',
        element: <Login />,
      },
    ],
  },
];
