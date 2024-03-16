import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FormEvent } from "react";

const ShippingForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6}>
          <TextField
            label="Your Name"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField label="Address" type="text" variant="standard" fullWidth />
          <TextField label="ZIP" type="text" variant="standard" fullWidth />
          <TextField label="City" type="text" variant="standard" fullWidth />
          <Box>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField label="To" type="text" variant="standard" fullWidth />
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"center"}>
          <Button sx={{ width: 1 / 2 }} variant="contained" type="submit">
            Get Quotes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ShippingForm;
