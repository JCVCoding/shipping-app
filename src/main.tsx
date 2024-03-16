import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Container } from '@mui/material';
import App from './App.tsx';
import ShipPage from './pages/ship.tsx';

import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/ship', element: <ShipPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container maxWidth={'lg'}>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
