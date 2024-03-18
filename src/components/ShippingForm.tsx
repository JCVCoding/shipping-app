import { Button, MenuItem, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { usaStates } from 'typed-usa-states';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateFromZIP } from '../features/fromZIP/fromZIPSlice';
import { updateToZIP } from '../features/toZIP/toZIPSlice';
import { updateShipForm } from '../features/ship/shipSlice';

const ShippingForm = () => {
  const ship = useAppSelector((state) => state.ship);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const fromZIP = useAppSelector((state) => state.fromZIP.value);
  const dispatch = useAppDispatch();

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
              name='shipperName'
              value={ship.shipperName}
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='Country'
              id='country_from'
              defaultValue={ship.shipperCountry}
              name='shipperCountry'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              variant='standard'
            >
              <MenuItem value={'US'}>United States of America</MenuItem>
            </TextField>
            <TextField
              label='Street Address'
              id='address_from'
              type='text'
              variant='standard'
              value={ship.shipperAddress}
              name='shipperAddress'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='Apt, Floor, Suite, etc.'
              id='address_2_from'
              type='text'
              variant='standard'
              value={ship.shipperAddress2}
              name='shipperAddress2'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='ZIP'
              id='ZIP_from'
              type='text'
              variant='standard'
              value={fromZIP}
              name='fromZIP'
              onChange={({ target }) => dispatch(updateFromZIP(target.value))}
              fullWidth
            />
            <TextField
              label='City'
              id='city_from'
              type='text'
              variant='standard'
              value={ship.shipperCity}
              name='shipperCity'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='State'
              id='state_from'
              variant='standard'
              value={ship.shipperState}
              name='shipperState'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
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
              value={ship.shipperPhone}
              name='shipperPhone'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='Email'
              id='email_from'
              type='email'
              variant='standard'
              value={ship.shipperEmail}
              name='shipperEmail'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
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
              value={ship.recipientName}
              name='recipientName'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='Country'
              id='country_to'
              defaultValue={ship.recipientCountry}
              name='recipientCountry'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              variant='standard'
            >
              <MenuItem value={'US'}>United States of America</MenuItem>
            </TextField>
            <TextField
              label='Street Address'
              id='address_to'
              type='text'
              variant='standard'
              value={ship.recipientAddress}
              name='recipientAddress'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='Apt, Floor, Suite, etc.'
              id='address_2_to'
              type='text'
              variant='standard'
              value={ship.recipientAddress2}
              name='recipientAddress2'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='ZIP'
              id='ZIP_to'
              type='text'
              variant='standard'
              value={toZIP}
              onChange={({ target }) => dispatch(updateToZIP(target.value))}
              name='toZIP'
              fullWidth
            />
            <TextField
              label='City'
              id='city_to'
              type='text'
              variant='standard'
              value={ship.recipientCity}
              name='recipientCity'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              select
              fullWidth
              label='State'
              id='state_to'
              value={ship.recipientState}
              name='recipientState'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
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
              value={ship.recipientPhone}
              name='recipientPhone'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
              fullWidth
            />
            <TextField
              label='Email'
              id='email_to'
              type='email'
              variant='standard'
              value={ship.recipientEmail}
              name='recipientEmail'
              onChange={({ target }) =>
                dispatch(
                  updateShipForm({ value: target.value, name: target.name })
                )
              }
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
        <Button
          sx={{ width: 1 / 2 }}
          component={Link}
          to='/ship-details'
          variant='contained'
          type='submit'
        >
          Continue
        </Button>
      </Grid>
    </form>
  );
};

export default ShippingForm;
