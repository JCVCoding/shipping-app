import { Button, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateForm } from "../features/quote/quoteSlice";
import { updateFromZIP } from "../features/fromZIP/fromZIPSlice";
import { updateToZIP } from "../features/toZIP/toZIPSlice";

const QuoteForm = ({ getCards }) => {
  const quote = useAppSelector((state) => state.quote);
  const fromZIP = useAppSelector((state) => state.fromZIP.value);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCards(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6}>
          <TextField
            label="From"
            placeholder="ZIP Code"
            type="text"
            variant="standard"
            name="fromZIP"
            value={fromZIP}
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
            name="toZIP"
            value={toZIP}
            onChange={({ target }) => dispatch(updateToZIP(target.value))}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Weight"
            type="text"
            variant="standard"
            name="weight"
            value={quote.weight}
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
            name="length"
            value={quote.length}
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
            name="width"
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
            name="height"
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
