import Grid from "@mui/material/Unstable_Grid2";
import { Box, Divider, Stack } from "@mui/material";
import { useAppSelector } from "../hooks";

const ConfirmationPage = () => {
  const billingInfo = useAppSelector((state) => state.billing);
  const shippingInfo = useAppSelector((state) => state.ship);
  const fromZip = useAppSelector((state) => state.fromZIP);
  const quote = useAppSelector((state) => state.selectedQuote);
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
            <p>Tracking Number</p>
            <div>
              <p>Shipping Method</p>
              <p>{quote.service}</p>
            </div>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <p>
              If you have any questions, please don't hesitate to reach out to
              hello@COMPANYNAME.com
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
              <p>Shipped To information</p>
              <p>{shippingInfo.recipientName}</p>

              <p>{shippingInfo.recipientAddress}</p>
              <p>
                {shippingInfo.recipientCity} {shippingInfo.recipientState}{" "}
                {fromZip.value}
              </p>
              <p>{shippingInfo.recipientCountry}</p>
            </div>
            <div>
              <p>Billing address and Information</p>
              <p>{billingInfo.cardName}</p>
              <p>
                XXXXXXXX
                {billingInfo.cardNumber.substring(
                  billingInfo.cardNumber.length - 4,
                  billingInfo.cardNumber.length
                )}
              </p>
              {billingInfo.billingAddress ? null : (
                <>
                  <p>{shippingInfo.shipperAddress}</p>
                  <p>
                    {shippingInfo.shipperCity} {shippingInfo.shipperState}{" "}
                    {fromZip.value}
                  </p>
                  <p>{shippingInfo.shipperCountry}</p>
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
