import { Typography, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Typography>
      Oops. You don't have access to this page. Please{" "}
      <MUILink component={Link} to="/login">
        login
      </MUILink>{" "}
      to your account to gain access.
    </Typography>
  );
};

export default Error;
