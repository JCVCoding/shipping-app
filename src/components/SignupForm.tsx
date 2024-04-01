import { useState } from "react";
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

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const submitSignupForm: SubmitHandler<SignupFormValues> = (data) => {
    fetch("http://localhost:3000/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Box component={"section"} maxWidth={"sm"} margin={"0 auto"}>
      <form onSubmit={handleSubmit(submitSignupForm)}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
              })}
              error={errors.firstName?.type ? true : false}
              helperText={errors.firstName?.message}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is required",
              })}
              error={errors.lastName?.type ? true : false}
              helperText={errors.lastName?.message}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.type ? true : false}
              helperText={errors.email?.message}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box component={"p"} textAlign={"center"} marginTop={4}>
        <span>Already have a USPDS account? </span>
        <MUILink component={Link} to="/login">
          Login now
        </MUILink>
      </Box>
    </Box>
  );
};

export default SignupForm;
