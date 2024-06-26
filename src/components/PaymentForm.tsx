import { ForwardedRef, forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks";

import {
  Button,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { usaStates } from "typed-usa-states";
import { IMaskInput } from "react-imask";

import American from "../assets/icons8-american-express-32.png";
import Discover from "../assets/icons8-discover-card-32.png";
import Mastercard from "../assets/icons8-mastercard-32.png";
import Visa from "../assets/icons8-visa-32.png";
import { updateBilling } from "../features/billing/billingSlice";

import { PaymentFormPayload } from "../features/billing/billingSlice";
import dayjs from "dayjs";

export type PaymentFormTypes = {
  cardNumber: string;
  cardName: string;
  expiration?: string;
  cvc?: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
};

type CardNumberProps = {
  cardtype: string;
};

const CardNumberMask = forwardRef(function CardNumberMask(
  props: CardNumberProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { cardtype, ...other } = props;
  const amexFormat = cardtype.includes("american");

  return (
    <IMaskInput
      {...other}
      mask={amexFormat ? "@### ###### #####" : "@### #### #### ####"}
      definitions={{ "#": /[0-9]/, "@": /[2-6]/ }}
      inputRef={ref}
      overwrite
    />
  );
});

const ExpirationMask = forwardRef(function ExpirationMask(
  props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={"##/##"}
      definitions={{ "#": /[0-9]/ }}
      inputRef={ref}
      overwrite
    />
  );
});

const generateRandomNumber = (lengthOfNum: number): string => {
  let num = "";
  for (let i = 0; i < lengthOfNum; i++) {
    num += Math.floor(Math.random() * 9);
  }
  return num;
};

const createTrackingNumber = (accountNumber: string, serviceLevel: string) => {
  const rand = generateRandomNumber(8);
  return `2Z${accountNumber}${serviceLevel}${rand}`;
};

const PaymentForm = () => {
  const billing = useAppSelector((state) => state.billing);
  const accountNumber = useAppSelector((state) => state.user.selectedAccount);
  const deliveryDate = useAppSelector(
    (state) => state.selectedQuote.deliveryDate
  );
  const dispatch = useAppDispatch();
  const [cardType, setCardType] = useState<string>("");
  const [paymentRadio, setPaymentRadio] = useState("same");
  const [showAddress2, setAddress2] = useState(false);
  const navigate = useNavigate();

  const getCreditCardType = (number: string) => {
    const firstChar = number[0];
    switch (firstChar) {
      case "2":
        setCardType(Mastercard);
        break;
      case "3":
        setCardType(American);
        break;
      case "4":
        setCardType(Visa);
        break;
      case "5":
        setCardType(Mastercard);
        break;
      case "6":
        setCardType(Discover);
        break;
      default:
        setCardType("");
        break;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormTypes>();

  const submitPayment: SubmitHandler<PaymentFormTypes> = async () => {
    const trackNumber = createTrackingNumber(accountNumber, "1478");
    try {
      const res = await fetch("http://localhost:3000/ship", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackNumber,
          accountNumber,
          deliveryDate,
          shipDate: dayjs().toDate().toLocaleDateString(),
          status: "Ready for Pickup",
        }),
      });
      if (res.ok) {
        navigate("/confirmation", { state: { trackNumber } });
      }
    } catch (err) {
      console.error();
    }
  };

  const dispatchToStore = (
    target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)
  ) => {
    dispatch(
      updateBilling({
        value: target.value,
        name: target.name as PaymentFormPayload["name"],
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(submitPayment)}>
      <Grid
        container
        spacing={1}
        sx={{ px: { xs: 2, sm: 10, md: 20, lg: 40 } }}
      >
        <p>Card Information</p>
        <Grid xs={12}>
          <TextField
            inputProps={{ cardtype: cardType }}
            type="text"
            variant="outlined"
            placeholder="Card Number"
            {...register("cardNumber", {
              required: "Card Number is required",
              minLength: {
                value: cardType !== American ? 19 : 17,
                message: `Card Number must have a minimum of ${
                  cardType !== American ? 16 : 15
                } integers`,
              },
            })}
            error={errors.cardNumber?.type ? true : false}
            helperText={errors.cardNumber?.message}
            onInput={({ target }) => {
              getCreditCardType(target.value);
              dispatchToStore(target);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {cardType === "" ? (
                    <CreditCardIcon />
                  ) : (
                    <Icon sx={{ width: 32, height: 32 }}>
                      <img src={cardType} height={32} width={32}></img>
                    </Icon>
                  )}
                </InputAdornment>
              ),
              inputComponent: CardNumberMask as any,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction={"row"} spacing={2}>
            <TextField
              type="text"
              variant="outlined"
              label="Expiration"
              placeholder="MM/YY"
              {...register("expiration", {
                required: "Expiration month and year is required",
                minLength: {
                  value: 4,
                  message: "Invalid expiration month / year",
                },
              })}
              error={errors.expiration?.type ? true : false}
              helperText={errors.expiration?.message}
              InputProps={{
                inputComponent: ExpirationMask as any,
              }}
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              placeholder="CVC"
              {...register("cvc", {
                required: "CVC is required",
                minLength: {
                  value: cardType !== American ? 3 : 4,
                  message: "Invalid CVC",
                },
                maxLength: {
                  value: cardType !== American ? 3 : 4,
                  message: "Invalid CVC",
                },
              })}
              error={errors.cvc?.type ? true : false}
              helperText={errors.cvc?.message}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid xs={12}>
          <TextField
            type="text"
            variant="outlined"
            label="Name on Card"
            {...register("cardName", { required: "Name is required" })}
            error={errors.cardName?.type ? true : false}
            helperText={errors.cardName?.message}
            value={billing.cardName}
            onInput={({ target }) => dispatchToStore(target)}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <RadioGroup
              defaultValue={paymentRadio}
              value={paymentRadio}
              onChange={({ target }) => {
                setPaymentRadio(target.value);
              }}
            >
              <FormControlLabel
                value={"same"}
                control={<Radio />}
                label="Same as shipping address"
              />
              <FormControlLabel
                value={"different"}
                control={<Radio />}
                label="My billing address is different"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {paymentRadio === "different" ? (
          <Grid xs={12} container rowSpacing={2}>
            <Grid xs={12}>
              <TextField
                label="Street Address"
                {...register("billingAddress", {
                  required: "Billing address is required",
                })}
                error={errors.billingAddress?.type ? true : false}
                helperText={errors.billingAddress?.message}
                value={billing.billingAddress}
                onChange={({ target }) => {
                  dispatchToStore(target);
                }}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <Stack direction={"row"} alignItems={"center"} columnGap={0.5}>
                {!showAddress2 ? (
                  <>
                    <IconButton
                      aria-label="add more address information"
                      onClick={() => setAddress2(true)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <p>Add Apt number, suite, unit, building, floor, etc.</p>
                  </>
                ) : (
                  <TextField
                    label="Apartment, Suite, Unit, Building, Floor, Etc."
                    fullWidth
                  />
                )}
              </Stack>
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                label="City"
                {...register("billingCity", {
                  required: "Billing city is required",
                })}
                error={errors.billingCity?.type ? true : false}
                helperText={errors.billingCity?.message}
                value={billing.billingCity}
                onChange={({ target }) => {
                  dispatchToStore(target);
                }}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="State"
                id="state_from"
                defaultValue={""}
                {...register("billingState", {
                  required: "Billing state is required",
                })}
                error={errors.billingState?.type ? true : false}
                helperText={errors.billingState?.message}
                value={billing.billingState}
                onChange={({ target }) => {
                  dispatchToStore(target);
                }}
              >
                {usaStates.map(({ abbreviation, name }) => (
                  <MenuItem key={abbreviation} value={abbreviation}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                label="ZIP Code"
                {...register("billingZip", {
                  required: "Billing zip code is required",
                })}
                error={errors.billingZip?.type ? true : false}
                helperText={errors.billingZip?.message}
                value={billing.billingZip}
                onChange={({ target }) => {
                  dispatchToStore(target);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        ) : null}
        <Grid xs={12} display={"flex"} justifyContent={"center"} sx={{ mt: 1 }}>
          <Button fullWidth variant="contained" type="submit">
            Pay
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentForm;

// Cards starting with 3 = American Express
// Cards starting with 4 = Visa
// Cards starting with 5 = Mastercard
// Cards starting with 6 = Discover
