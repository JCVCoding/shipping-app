import { Button, Card, CardContent, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

export const ShipmentCard = () => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Grid
          container
          sx={{ fontWeight: 500, fontSize: 24, fontFamily: 'sans-serif' }}
        >
          <Grid xs={12}>
            <p>Service Type</p>
          </Grid>
          <Grid xs={12}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <p>Estimated Delivery Date</p>
              <p>Price</p>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Stack alignItems={'flex-end'}>
              <Button component={Link} to='/ship' variant='outlined'>
                Select
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
