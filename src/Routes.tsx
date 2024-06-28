import { createBrowserRouter } from 'react-router-dom';
import CollectionPage from './CollectionPage';
import HomePage from './HomePage';
import App from './App';




const router = createBrowserRouter([
    { path: `neuron_app_v1/`, element: <HomePage /> },
    { path: `neuron_app_v1/collection`, element: <CollectionPage /> },
  ]);
  
  export default router;
  
