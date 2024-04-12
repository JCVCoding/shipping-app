import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  IconButton,
  Link as MUILink,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { loginUser } from "../features/auth/authAction";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { error, success } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();

  useEffect(() => {
    if (error) {
      switch (error) {
        case "1":
          setError("username", {
            type: "custom",
            message: "Username or email not found",
          });
          break;
        case "2":
          setError("password", {
            type: "custom",
            message: "Password is incorrect",
          });
          break;
        default:
          break;
      }
    } else if (success) {
      navigate("/");
    }
  }, [error, setError, navigate, success]);

  const submitLoginForm: SubmitHandler<LoginFormValues> = (data) => {
    dispatch(loginUser(data));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Box component={"section"} maxWidth={"sm"} margin={"0 auto"}>
      <form onSubmit={handleSubmit(submitLoginForm)}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              placeholder="Username or Email"
              {...register("username", {
                required: "Username or Email is required",
              })}
              error={errors.username?.type ? true : false}
              helperText={errors.username?.message}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              placeholder="Password"
              type={passwordVisibility ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              error={errors.password?.type ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton disableRipple onClick={togglePasswordVisibility}>
                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid xs={12} display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              variant="outlined"
              sx={{ maxWidth: { sm: "12rem" } }}
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box component={"p"} textAlign={"center"} marginTop={4}>
        <span>Don't have a USPDS account? </span>
        <MUILink component={Link} to="/signup">
          Sign up now
        </MUILink>
      </Box>
    </Box>
  );
};

export default LoginForm;
