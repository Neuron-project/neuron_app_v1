import { createBrowserRouter } from 'react-router-dom';
import CollectionPage from './CollectionPage';
import HomePage from './HomePage';
import App from './App';

const router = createBrowserRouter([
  { path: `/`, element: <HomePage /> },
  { path: `/collection`, element: <CollectionPage /> },
  { path: '/*', element: <App /> }, // Add this catch-all route
]);

export default router;