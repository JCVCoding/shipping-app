import { Button, MenuItem, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { usaStates } from "typed-usa-states";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateFromZIP } from "../features/fromZIP/fromZIPSlice";
import { updateToZIP } from "../features/toZIP/toZIPSlice";
import { updateShipForm } from "../features/ship/shipSlice";

import { useForm, SubmitHandler } from "react-hook-form";

type ShippingFormFields = {
  shipperName: string;
  shipperAddress: string;
  shipperCity: string;
  shipperState: string;
  shipperZip: string;
  shipperEmail: string;
  recipientName: string;
  recipientCountry: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientEmail: string;
};

const ShippingForm = () => {
  const ship = useAppSelector((state) => state.ship);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const fromZIP = useAppSelector((state) => state.fromZIP.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormFields>();

  const onSubmit: SubmitHandler<ShippingFormFields> = async (data) => {
    console.log(data);
    navigate("/ship-details");
  };

  const dispatchToStore = (
    target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)
  ) => {
    dispatch(updateShipForm({ value: target.value, name: target.name }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={8} rowSpacing={8}>
        <Grid xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              label="Your Name"
              type="text"
              variant="standard"
              id="your_name"
              {...register("shipperName", { required: "Name required" })}
              error={errors.shipperName?.type ? true : false}
              helperText={errors.shipperName?.message}
              value={ship.shipperName}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              select
              fullWidth
              label="Country"
              id="country_from"
              defaultValue={ship.shipperCountry}
              name="shipperCountry"
              onInput={({ target }) => dispatchToStore(target)}
              variant="standard"
            >
              <MenuItem value={"US"}>United States of America</MenuItem>
            </TextField>
            <TextField
              label="Street Address"
              id="address_from"
              type="text"
              variant="standard"
              value={ship.shipperAddress}
              {...register("shipperAddress", { required: "Address required" })}
              error={errors.shipperAddress?.type ? true : false}
              helperText={errors.shipperAddress?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="Apt, Floor, Suite, etc."
              id="address_2_from"
              type="text"
              variant="standard"
              value={ship.shipperAddress2}
              name="shipperAddress2"
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="ZIP"
              id="ZIP_from"
              type="text"
              variant="standard"
              value={fromZIP}
              {...register("shipperZip", { required: "Zip Code required" })}
              error={errors.shipperZip?.type ? true : false}
              helperText={errors.shipperZip?.message}
              onInput={({ target }) => dispatch(updateFromZIP(target.value))}
              fullWidth
            />
            <TextField
              label="City"
              id="city_from"
              type="text"
              variant="standard"
              value={ship.shipperCity}
              {...register("shipperCity", { required: "City required" })}
              error={errors.shipperCity?.type ? true : false}
              helperText={errors.shipperCity?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              select
              fullWidth
              label="State"
              id="state_from"
              variant="standard"
              value={ship.shipperState}
              {...register("shipperState", { required: "State required" })}
              error={errors.shipperState?.type ? true : false}
              helperText={errors.shipperState?.message}
              onInput={({ target }) => dispatchToStore(target)}
            >
              {usaStates.map(({ abbreviation, name }) => (
                <MenuItem key={abbreviation} value={abbreviation}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Phone (Optional)"
              id="phone_from"
              type="tel"
              variant="standard"
              value={ship.shipperPhone}
              name="shipperPhone"
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="Email"
              id="email_from"
              type="email"
              variant="standard"
              value={ship.shipperEmail}
              {...register("shipperEmail", { required: "Email required" })}
              error={errors.shipperEmail?.type ? true : false}
              helperText={errors.shipperEmail?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              label="Recipient Name"
              id="recipient_name"
              type="text"
              variant="standard"
              value={ship.recipientName}
              {...register("recipientName", { required: "Name required" })}
              error={errors.recipientName?.type ? true : false}
              helperText={errors.recipientName?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              select
              fullWidth
              label="Country"
              id="country_to"
              defaultValue={ship.recipientCountry}
              {...register("recipientCountry", { required: "Name required" })}
              error={errors.recipientCountry?.type ? true : false}
              helperText={errors.recipientCountry?.message}
              onChange={({ target }) => dispatchToStore(target)}
              variant="standard"
            >
              <MenuItem value={"US"}>United States of America</MenuItem>
            </TextField>
            <TextField
              label="Street Address"
              id="address_to"
              type="text"
              variant="standard"
              value={ship.recipientAddress}
              {...register("recipientAddress", { required: "Name required" })}
              error={errors.recipientAddress?.type ? true : false}
              helperText={errors.recipientAddress?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="Apt, Floor, Suite, etc."
              id="address_2_to"
              type="text"
              variant="standard"
              value={ship.recipientAddress2}
              name="recipientAddress2"
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="ZIP"
              id="ZIP_to"
              type="text"
              variant="standard"
              value={toZIP}
              onInput={({ target }) => dispatch(updateToZIP(target.value))}
              {...register("recipientZip", { required: "Name required" })}
              error={errors.recipientZip?.type ? true : false}
              helperText={errors.recipientZip?.message}
              fullWidth
            />
            <TextField
              label="City"
              id="city_to"
              type="text"
              variant="standard"
              value={ship.recipientCity}
              {...register("recipientCity", { required: "Name required" })}
              error={errors.recipientCity?.type ? true : false}
              helperText={errors.recipientCity?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              select
              fullWidth
              label="State"
              id="state_to"
              value={ship.recipientState}
              {...register("recipientState", { required: "Name required" })}
              error={errors.recipientState?.type ? true : false}
              helperText={errors.recipientState?.message}
              onInput={({ target }) => dispatchToStore(target)}
              variant="standard"
            >
              {usaStates.map(({ abbreviation, name }) => (
                <MenuItem key={abbreviation + "_2"} value={abbreviation}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Phone (Optional)"
              id="phone_to"
              type="tel"
              variant="standard"
              value={ship.recipientPhone}
              name="recipientPhone"
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
            <TextField
              label="Email"
              id="email_to"
              type="email"
              variant="standard"
              value={ship.recipientEmail}
              {...register("recipientEmail", { required: "Name required" })}
              error={errors.recipientEmail?.type ? true : false}
              helperText={errors.recipientEmail?.message}
              onInput={({ target }) => dispatchToStore(target)}
              fullWidth
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 4 }}
        xs={12}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button sx={{ width: 1 / 2 }} variant="contained" type="submit">
          Continue
        </Button>
      </Grid>
    </form>
  );
};

export default ShippingForm;
