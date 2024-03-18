import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Container } from '@mui/material';
import Home from './pages/home.tsx';
import ShipPage from './pages/ship.tsx';
import ShipDetails from './pages/shipDetails.tsx';
import Payment from './pages/payment.tsx';
import ConfirmationPage from './pages/confirmation.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import store from './store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/payment', element: <Payment /> },
  { path: '/ship', element: <ShipPage /> },
  { path: '/ship-details', element: <ShipDetails /> },
  { path: '/confirmation', element: <ConfirmationPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Container maxWidth={'lg'}>
        <RouterProvider router={router} />
      </Container>
    </Provider>
  </React.StrictMode>
);
