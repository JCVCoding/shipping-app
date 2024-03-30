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
    console.log(data);
    navigate("/");
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

export default SignupForm;
