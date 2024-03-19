import { Button, Card, CardContent, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { selectQuote } from "../features/selectedQuote/selectedQuoteSlice";

export type QuoteData = {
  service: string;
  deliveryDate: string;
  price: string;
};

export const QuoteCard = ({ service, deliveryDate, price }: QuoteData) => {
  const dispatch = useAppDispatch();
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Grid container sx={{ fontWeight: 500, fontSize: 24 }}>
          <Grid xs={12}>
            <p>Service Type</p>
            <p>{service}</p>
          </Grid>
          <Grid xs={12}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <p>Estimated Delivery Date</p>
              <p>{deliveryDate}</p>
              <p>Price</p>
              <p>{price}</p>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Stack alignItems={"flex-end"}>
              <Button
                component={Link}
                to="/ship"
                variant="outlined"
                onClick={() =>
                  dispatch(selectQuote({ service, deliveryDate, price }))
                }
              >
                Select
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
