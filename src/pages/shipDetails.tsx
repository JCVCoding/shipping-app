import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Edit, EditOff } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { numberPatternValidation } from "../validationPatterns/patterns";
import { updatePackageDetails } from "../features/quote/quoteSlice";
import { selectQuote } from "../features/selectedQuote/selectedQuoteSlice";

type packageDetails = {
  length: string;
  width: string;
  height: string;
  weight: string;
};

const ShipDetails = () => {
  const dispatch = useAppDispatch();
  const today = dayjs();
  const shipDetails = useAppSelector((state) => state.ship);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const quoteDetails = useAppSelector((state) => state.quote);
  const selectedQuoteData = useAppSelector((state) => state.selectedQuote);
  const username = useAppSelector((state) => state.auth.username);
  const accountNumber = useAppSelector((state) => state.user.selectedAccount);
  const userAddress = useAppSelector((state) => state.user.address);

  const [editPackageDetails, setEditPackageDetails] = useState(false);

  const navigate = useNavigate();

  const serviceData = [
    {
      service: "Ground Shipping",
      deliveryDate: `${today.add(5, "d").format("MM-DD-YYYY")}`,
      price: "$10",
    },
    {
      service: "Ground Expedited Shipping",
      deliveryDate: `${today.add(4, "d").format("MM-DD-YYYY")}`,
      price: "$15",
    },
    {
      service: "Express Shipping",
      deliveryDate: `${today.add(3, "d").format("MM-DD-YYYY")}`,
      price: "$23",
    },
    {
      service: "2 Day Air Shipping",
      deliveryDate: `${today.add(2, "d").format("MM-DD-YYYY")}`,
      price: "$30",
    },
    {
      service: "Next Day Shipping",
      deliveryDate: `${today.add(1, "d").format("MM-DD-YYYY")}`,
      price: "$45",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<packageDetails>();

  const onSubmit: SubmitHandler<packageDetails> = async () => {
    const packageDimensionsSum =
      Number(quoteDetails.height) +
      Number(quoteDetails.length) +
      Number(quoteDetails.width);
    if (packageDimensionsSum > 130) {
      setError("root", {
        type: "custom",
        message:
          "Max dimensions exceeded. Total package dimensions cannot be more than 130 inches.",
      });
    } else {
      clearErrors("root");
    }
    navigate("/payment");
  };

  const handleServiceSelection = (target) => {
    serviceData.forEach((service) => {
      if (service.service === target.textContent) {
        dispatch(
          selectQuote({
            ...service,
          })
        );
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          <h2>Shipper Details</h2>
          <p>Account Number: {accountNumber}</p>
          <p>{username}</p>
          <p>{userAddress.street}</p>
          {userAddress.street_2 ? <p>{userAddress.street_2}</p> : null}
          <p>
            {userAddress.city}, {userAddress.state} {userAddress.zip}
          </p>
          <h2>Receiver Details</h2>
          <p>{shipDetails.recipientName}</p>
          <p>{shipDetails.recipientAddress}</p>
          {shipDetails.recipientAddress2 ? (
            <p>{shipDetails.recipientAddress2}</p>
          ) : null}
          <p>
            {shipDetails.recipientCity}, {shipDetails.recipientState} {toZIP}
          </p>
          <Grid xs={12} sm={6} container gap={4} alignItems={"center"}>
            <h2>Package Details</h2>
            <IconButton
              onClick={() => setEditPackageDetails(!editPackageDetails)}
            >
              {editPackageDetails ? <EditOff /> : <Edit />}
            </IconButton>
          </Grid>
          <Grid container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid xs={12}>
                {!editPackageDetails ? (
                  <p>Length: {quoteDetails.length} in.</p>
                ) : (
                  <TextField
                    label="Length"
                    variant="standard"
                    value={quoteDetails.length}
                    {...register("length", {
                      required: "Length is required",
                      pattern: numberPatternValidation,
                    })}
                    error={errors.length?.type ? true : false}
                    helperText={errors.length?.message}
                    onChange={({ target }) =>
                      dispatch(
                        updatePackageDetails({
                          value: target.value,
                          name: target.name,
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">in.</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
              <Grid xs={12}>
                {!editPackageDetails ? (
                  <p>Width: {quoteDetails.width} in.</p>
                ) : (
                  <TextField
                    label="Width"
                    variant="standard"
                    value={quoteDetails.width}
                    {...register("width", {
                      required: "Width is required",
                      pattern: numberPatternValidation,
                    })}
                    error={errors.width?.type ? true : false}
                    helperText={errors.width?.message}
                    onChange={({ target }) =>
                      dispatch(
                        updatePackageDetails({
                          value: target.value,
                          name: target.name,
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">in.</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
              <Grid xs={12}>
                {!editPackageDetails ? (
                  <p>Height: {quoteDetails.height} in.</p>
                ) : (
                  <TextField
                    label="Height"
                    variant="standard"
                    value={quoteDetails.height}
                    {...register("height", {
                      required: "Height is required",
                      pattern: numberPatternValidation,
                    })}
                    error={errors.height?.type ? true : false}
                    helperText={errors.height?.message}
                    onChange={({ target }) =>
                      dispatch(
                        updatePackageDetails({
                          value: target.value,
                          name: target.name,
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">in.</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
              <Grid xs={12}>
                {!editPackageDetails ? (
                  <p>Weight: {quoteDetails.weight} lbs.</p>
                ) : (
                  <TextField
                    label="Weight"
                    type="text"
                    variant="standard"
                    value={quoteDetails.weight}
                    {...register("weight", {
                      required: "Weight is required",
                      pattern: numberPatternValidation,
                      max: {
                        value: 150,
                        message:
                          "Package weight cannot be more than 150 pounds",
                      },
                    })}
                    error={errors.weight?.type ? true : false}
                    helperText={errors.weight?.message}
                    onChange={({ target }) =>
                      dispatch(
                        updatePackageDetails({
                          value: target.value,
                          name: target.name,
                        })
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">lbs.</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>

              <h2>Package Pick Up Date</h2>
              <DatePicker defaultValue={dayjs()} />
              <p>Selected Service: {selectedQuoteData.service}</p>
              <TextField
                select
                value={selectedQuoteData.service}
                sx={{ minWidth: "230px" }}
              >
                {serviceData.map(({ service }) => (
                  <MenuItem
                    key={service}
                    value={service}
                    onClick={({ target }) => handleServiceSelection(target)}
                  >
                    {service}
                  </MenuItem>
                ))}
              </TextField>
              <p>Delivery Date and Time: {selectedQuoteData.deliveryDate}</p>
              <p>Price: {selectedQuoteData.price}</p>
              <Button variant="contained" type="submit">
                Continue to Payment
              </Button>
            </form>
          </Grid>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default ShipDetails;
