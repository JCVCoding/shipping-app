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
import Login from "./pages/login.tsx";
import SignupForm from "./components/SignupForm.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import store from "./store.ts";
import { Provider } from "react-redux";

import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { logout } from "./features/auth/authSlice.ts";
import Error from "./pages/error.tsx";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth={"xl"}>
          <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
            <Box>
              <Button color="inherit" component={Link} to="/">
                <Typography variant="h5" component={"div"}>
                  US Package Delivery Service
                </Typography>
              </Button>
              {loggedIn ? (
                <>
                  <Button color="inherit" component={Link} to="/ship">
                    Ship
                  </Button>
                  <Button color="inherit" component={Link} to="/account">
                    Account
                  </Button>
                </>
              ) : null}
            </Box>
            {!loggedIn ? (
              <Button color="inherit" component={Link} to={"/login"}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={"lg"} sx={{ margin: "2rem auto" }}>
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
      { path: "/login", element: <Login /> },
      { path: "/payment", element: <Payment /> },
      { path: "/ship", element: <ShipPage /> },
      { path: "/ship-details", element: <ShipDetails /> },
      { path: "/signup", element: <SignupForm /> },
      { path: "/confirmation", element: <ConfirmationPage /> },
      { path: "/error", element: <Error /> },
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
