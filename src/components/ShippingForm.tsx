import { useEffect } from "react";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { usaStates } from "typed-usa-states";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateToZIP } from "../features/toZIP/toZIPSlice";
import { updateShipForm } from "../features/ship/shipSlice";

import { zipCodePattern } from "../validationPatterns/patterns";

import { useForm, SubmitHandler } from "react-hook-form";
import { getUserAccounts, getUserAddress } from "../features/user/userAction";
import { setSelectedAccount } from "../features/user/userSlice";

type ShippingFormFields = {
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientEmail: string;
};
export type Address = {
  city: string;
  state: string;
  street: string;
  street_2: string;
  zip: string;
};

const ShippingForm = () => {
  const ship = useAppSelector((state) => state.ship);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useAppSelector((state) => state.auth.email);
  const username = useAppSelector((state) => state.auth.username);
  const userAccounts = useAppSelector((state) => state.user.accounts);
  const userAddress = useAppSelector((state) => state.user.address);
  const selectedAccount = useAppSelector((state) => state.user.selectedAccount);

  useEffect(() => {
    dispatch(getUserAccounts(username!));
  }, [username, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormFields>();

  const onSubmit: SubmitHandler<ShippingFormFields> = async () => {
    navigate("/ship-details");
  };

  const dispatchToStore = (
    target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)
  ) => {
    dispatch(updateShipForm({ value: target.value, name: target.name }));
  };

  const handleAccountSelection = (target: EventTarget & HTMLLIElement) => {
    const { value } = target.dataset;
    dispatch(setSelectedAccount(value!));
    dispatch(getUserAddress(value!));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={8}>
        <Grid xs={6}>
          <TextField
            select
            fullWidth
            id="account"
            variant="outlined"
            label="User Account"
            value={selectedAccount}
          >
            {userAccounts.map(({ accountNumber }) => (
              <MenuItem
                key={accountNumber}
                value={accountNumber}
                onClick={({ currentTarget }) =>
                  handleAccountSelection(currentTarget)
                }
              >
                {accountNumber}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container columnSpacing={8} rowSpacing={8}>
        <Grid xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              label="Your Name"
              type="text"
              variant="standard"
              id="your_name"
              value={username}
              fullWidth
              disabled
            />
            <TextField
              label="Street Address"
              id="address_from"
              type="text"
              variant="standard"
              value={userAddress.street}
              fullWidth
              disabled
            />
            <TextField
              label="Apt, Floor, Suite, etc."
              id="address_2_from"
              type="text"
              variant="standard"
              name="shipperAddress2"
              value={userAddress.street_2 ? userAddress.street_2 : ""}
              fullWidth
              disabled
            />
            <TextField
              label="ZIP"
              id="ZIP_from"
              type="text"
              variant="standard"
              value={userAddress.zip}
              fullWidth
              disabled
            />
            <TextField
              label="City"
              id="city_from"
              type="text"
              variant="standard"
              value={userAddress.city}
              fullWidth
              disabled
            />
            <TextField
              fullWidth
              label="State"
              id="state_from"
              variant="standard"
              value={userAddress.state}
              disabled
            ></TextField>
            <TextField
              label="Email"
              id="email_from"
              type="email"
              variant="standard"
              value={email}
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
              label="Street Address"
              id="address_to"
              type="text"
              variant="standard"
              value={ship.recipientAddress}
              {...register("recipientAddress", {
                required: "Address required",
              })}
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
              {...register("recipientZip", {
                required: "Zip required",
                pattern: zipCodePattern,
              })}
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
              {...register("recipientCity", { required: "City required" })}
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
              {...register("recipientState", { required: "State required" })}
              error={errors?.recipientState?.type ? true : false}
              variant="standard"
              helperText={errors.recipientState?.message}
              autoComplete="off"
              onInput={({ target }) => {
                dispatchToStore(target.value);
              }}
              onChange={({ target }) => dispatchToStore(target)}
            >
              {usaStates.map(({ abbreviation, name }) => (
                <MenuItem key={abbreviation + "_2"} value={abbreviation}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Email"
              id="email_to"
              type="email"
              variant="standard"
              value={ship.recipientEmail}
              {...register("recipientEmail", { required: "Email required" })}
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
