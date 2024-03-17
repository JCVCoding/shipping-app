import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Container } from '@mui/material';
import App from './App.tsx';
import ShipPage from './pages/ship.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import ShipDetails from './pages/shipDetails.tsx';
import Payment from './pages/payment.tsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/payment', element: <Payment /> },
  { path: '/ship', element: <ShipPage /> },
  { path: '/ship-details', element: <ShipDetails /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container maxWidth={'lg'}>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
