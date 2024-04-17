import Grid from "@mui/material/Unstable_Grid2";
import { Box, Divider, Stack } from "@mui/material";
import { useAppSelector } from "../hooks";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const billingInfo = useAppSelector((state) => state.billing);
  const shippingInfo = useAppSelector((state) => state.ship);
  const fromZip = useAppSelector((state) => state.fromZIP);
  const quote = useAppSelector((state) => state.selectedQuote);
  const trackNumber = useLocation().state.trackNumber;

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <p>Thank you for shipping with us!</p>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Stack
            direction={"row"}
            divider={<Divider orientation="vertical" flexItem />}
            columnGap={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div>
              <p>Tracking Number</p>
              <p>{trackNumber}</p>
            </div>
            <div>
              <p>Shipping Method</p>
              <p>{quote.service}</p>
            </div>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <p>Estimated Delivery: {quote.deliveryDate}</p>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <p>
              If you have any questions, please don't hesitate to reach out to
              hello@USPackageDelivery.com
            </p>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Stack
            direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={4}
          >
            <div>
              <p>Ship To</p>
              <p>{shippingInfo.recipientName}</p>

              <p>{shippingInfo.recipientAddress}</p>
              <p>
                {shippingInfo.recipientCity} {shippingInfo.recipientState}{" "}
                {fromZip.value}
              </p>
            </div>
            <div>
              <p>Billing</p>
              <p>
                XXXXXXXX
                {billingInfo.cardNumber.substring(
                  billingInfo.cardNumber.length - 4,
                  billingInfo.cardNumber.length
                )}
              </p>
              <p>{billingInfo.cardName}</p>
              {billingInfo.billingAddress ? (
                <>
                  <p>{billingInfo.billingAddress}</p>
                  <p>
                    {billingInfo.billingCity} {billingInfo.billingState}{" "}
                    {billingInfo.billingZip}
                  </p>
                </>
              ) : (
                <>
                  <p>{shippingInfo.shipperAddress}</p>
                  <p>
                    {shippingInfo.shipperCity} {shippingInfo.shipperState}{" "}
                    {fromZip.value}
                  </p>
                </>
              )}
            </div>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmationPage;
