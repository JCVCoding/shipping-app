import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Home from "./pages/home.tsx";
import ShipPage from "./pages/ship.tsx";
import ShipDetails from "./pages/shipDetails.tsx";
import Payment from "./pages/payment.tsx";
import ConfirmationPage from "./pages/confirmation.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import store from "./store.ts";
import { Provider } from "react-redux";

export const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth={"lg"}>
          <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
            <Box>
              <Button color="inherit" component={Link} to="/">
                <Typography variant="h5" component={"div"}>
                  US Package Delivery Service
                </Typography>
              </Button>
              <Button color="inherit" component={Link} to="/ship">
                Ship
              </Button>
            </Box>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={"lg"}>
        <Outlet />
      </Container>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/payment", element: <Payment /> },
      { path: "/ship", element: <ShipPage /> },
      { path: "/ship-details", element: <ShipDetails /> },
      { path: "/confirmation", element: <ConfirmationPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
