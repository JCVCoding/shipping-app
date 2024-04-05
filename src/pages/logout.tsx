import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { updateLoggedInState } from "../features/loggedIn/loggedInSlice";

import { Box, LinearProgress } from "@mui/material";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    fetch("http://localhost:3000/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          window.sessionStorage.removeItem("token");
          dispatch(updateLoggedInState(false));
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  });
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default Logout;
