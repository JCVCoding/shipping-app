import { Button, MenuItem, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FormEvent } from 'react';
import { usaStates } from 'typed-usa-states';

const ShippingForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container columnSpacing={8} rowSpacing={8}>
        <Grid xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              label='Your Name'
              type='text'
              variant='standard'
              id='your_name'
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='Country'
              id='country_from'
              defaultValue={'US'}
              variant='standard'
            >
              <MenuItem value={'US'}>United States of America</MenuItem>
            </TextField>
            <TextField
              label='Street Address'
              id='address_from'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='Apt, Floor, Suite, etc.'
              id='address_2_from'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='ZIP'
              id='ZIP_from'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='City'
              id='city_from'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='State'
              id='state_from'
              variant='standard'
              defaultValue={''}
            >
              {usaStates.map(({ abbreviation, name }) => (
                <MenuItem key={abbreviation} value={abbreviation}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Phone'
              id='phone_from'
              type='tel'
              variant='standard'
              fullWidth
            />
            <TextField
              label='Email'
              id='email_from'
              type='email'
              variant='standard'
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              label='Recipient Name'
              id='recipient_name'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='Country'
              id='country_to'
              defaultValue={'US'}
              variant='standard'
            >
              <MenuItem value={'US'}>United States of America</MenuItem>
            </TextField>
            <TextField
              label='Street Address'
              id='address_to'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='Apt, Floor, Suite, etc.'
              id='address_2_to'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='ZIP'
              id='ZIP_to'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              label='City'
              id='city_to'
              type='text'
              variant='standard'
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='State'
              id='state_to'
              defaultValue={''}
              variant='standard'
            >
              {usaStates.map(({ abbreviation, name }) => (
                <MenuItem key={abbreviation + '_2'} value={abbreviation}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Phone'
              id='phone_to'
              type='tel'
              variant='standard'
              fullWidth
            />
            <TextField
              label='Email'
              id='email_to'
              type='email'
              variant='standard'
              fullWidth
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 4 }}
        xs={12}
        display={'flex'}
        justifyContent={'center'}
      >
        <Button sx={{ width: 1 / 2 }} variant='contained' type='submit'>
          Continue
        </Button>
      </Grid>
    </form>
  );
};

export default ShippingForm;
