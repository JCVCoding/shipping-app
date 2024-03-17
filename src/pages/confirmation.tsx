import Grid from '@mui/material/Unstable_Grid2';
import { Box, Divider, Stack } from '@mui/material';

const ConfirmationPage = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <p>Thank you for shipping with us!</p>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Stack
            direction={'row'}
            divider={<Divider orientation='vertical' flexItem />}
            columnGap={4}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <p>Tracking Number</p>
            <p>Shipping Method</p>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <p>
              If you have any questions, please don't hesitate to reach out to
              hello@COMPANYNAME.com
            </p>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Stack
            direction={'column'}
            divider={<Divider orientation='horizontal' flexItem />}
            spacing={4}
          >
            <p>Shipped To information</p>
            <p>Billing address and Information</p>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmationPage;
