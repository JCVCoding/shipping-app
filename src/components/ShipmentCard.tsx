import { Card, CardContent, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const ShipmentCard = () => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Grid
          container
          sx={{ fontWeight: 500, fontSize: 24, fontFamily: "sans-serif" }}
        >
          <Grid xs={12}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <p>Estimated Delivery Date</p>
              <p>Price</p>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <p>Service Type</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
