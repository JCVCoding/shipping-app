import { Button, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateForm } from "../features/quote/quoteSlice";
import { updateFromZIP } from "../features/fromZIP/fromZIPSlice";
import { updateToZIP } from "../features/toZIP/toZIPSlice";
import { useForm, SubmitHandler } from "react-hook-form";

import { red } from "@mui/material/colors";

type QuoteFormFields = {
  fromZip: string;
  toZip: string;
  weight: string;
  length: string;
  width: string;
  height: string;
};

const QuoteForm = ({ getCards }) => {
  const quote = useAppSelector((state) => state.quote);
  const fromZIP = useAppSelector((state) => state.fromZIP.value);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<QuoteFormFields>();

  const onSubmit: SubmitHandler<QuoteFormFields> = async () => {
    const packageDimensionsSum =
      Number(quote.height) + Number(quote.length) + Number(quote.width);
    if (packageDimensionsSum > 130) {
      setError("root", {
        type: "custom",
        message:
          "Max dimensions exceeded. Total package dimensions cannot be more than 130 inches.",
      });
    } else {
      clearErrors("root");
      getCards(true);
    }
  };

  const numberPatternValidation = {
    value: /^[0-9]*$/,
    message: "Zip Code can only contain numbers",
  };

  const zipCodePattern = {
    value: /^[0-9]{5}(?:-[0-9]{4})?$/,
    message: "Zip Code format incorrect",
  };

  const zipCodeValidation = {
    required: "Zip Code is required",
    minLength: {
      value: 5,
      message: "Zip Code needs a minimum length of 5 numbers",
    },
    pattern: zipCodePattern,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6}>
          <TextField
            label="From"
            placeholder="ZIP Code"
            type="text"
            variant="standard"
            // name="fromZIP"
            value={fromZIP}
            {...register("fromZip", zipCodeValidation)}
            error={errors.fromZip?.type ? true : false}
            helperText={errors.fromZip?.message}
            onChange={({ target }) => dispatch(updateFromZIP(target.value))}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            label="To"
            placeholder="ZIP Code"
            type="text"
            variant="standard"
            value={toZIP}
            {...register("toZip", zipCodeValidation)}
            error={errors.toZip?.type ? true : false}
            helperText={errors.toZip?.message}
            onChange={({ target }) => dispatch(updateToZIP(target.value))}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Weight"
            type="text"
            variant="standard"
            value={quote.weight}
            {...register("weight", {
              required: "Weight is required",
              pattern: numberPatternValidation,
              max: {
                value: 150,
                message: "Package weight cannot be more than 150 pounds",
              },
            })}
            error={errors.weight?.type ? true : false}
            helperText={errors.weight?.message}
            onChange={({ target }) =>
              dispatch(updateForm({ value: target.value, name: target.name }))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">lbs.</InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label="Length"
            variant="standard"
            value={quote.length}
            {...register("length", {
              required: "Length is required",
              pattern: numberPatternValidation,
            })}
            error={errors.length?.type ? true : false}
            helperText={errors.length?.message}
            onChange={({ target }) =>
              dispatch(updateForm({ value: target.value, name: target.name }))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label="Width"
            variant="standard"
            {...register("width", {
              required: "Width is required",
              pattern: numberPatternValidation,
            })}
            error={errors.width?.type ? true : false}
            helperText={errors.width?.message}
            value={quote.width}
            onChange={({ target }) =>
              dispatch(updateForm({ value: target.value, name: target.name }))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label="Height"
            variant="standard"
            {...register("height", {
              required: "Height is required",
              pattern: numberPatternValidation,
            })}
            error={errors.height?.type ? true : false}
            helperText={errors.height?.message}
            value={quote.height}
            onChange={({ target }) =>
              dispatch(updateForm({ value: target.value, name: target.name }))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <p style={{ color: red[300] }}>{errors.root?.message}</p>
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

export default QuoteForm;
