import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppPage from './app/AppPage';
import LoginPage from './login/LoginPage';
import Protected from './protected/ProtectedPage';
import RegistrationPage from './registration/RegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <AppPage />
      </Protected>
    ),
    // children: [
    //   {
    //     path: '/room/:roomId',
    //     element: <Chat />,
    //   },
    // ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  { path: '*', element: <Navigate to={'/'} /> },
]);

export default router;
