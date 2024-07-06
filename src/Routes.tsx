import { createBrowserRouter, Outlet } from 'react-router-dom';
import CollectionPage from './CollectionPage';
import HomePage from './HomePage';
import App from './App';

const AppFallback = () => {
  return <App />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <AppFallback />, // Add errorElement property
  },
  {
    path: '/collection',
    element: <CollectionPage />,
    errorElement: <AppFallback />, // Add errorElement property
  },
]);

export default router;