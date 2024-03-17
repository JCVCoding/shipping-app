import { useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { usaStates } from 'typed-usa-states';

import American from '../assets/icons8-american-express-32.png';
import Discover from '../assets/icons8-discover-card-32.png';
import Mastercard from '../assets/icons8-mastercard-32.png';
import Visa from '../assets/icons8-visa-32.png';

const PaymentForm = () => {
  const [billingAddress, setBillingAddress] = useState('same');
  const [showAddress2, setAddress2] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState<string>('');

  const getCreditCardType = (number: string) => {
    setCardNumber(number);
    const firstChar = number[0];
    switch (firstChar) {
      case '3':
        setCardType(American);
        break;
      case '4':
        setCardType(Visa);
        break;
      case '5':
        setCardType(Mastercard);
        break;
      case '6':
        setCardType(Discover);
        break;
      default:
        setCardType('');
        break;
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid
        container
        spacing={1}
        sx={{ px: { xs: 2, sm: 10, md: 20, lg: 40 } }}
      >
        <p>Card Information</p>
        <Grid xs={12}>
          <TextField
            type='text'
            variant='outlined'
            placeholder='Card Number'
            name='card_number'
            value={cardNumber}
            onChange={({ target }) => getCreditCardType(target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {cardType === '' ? (
                    <CreditCardIcon />
                  ) : (
                    <Icon sx={{ width: 32, height: 32 }}>
                      <img src={cardType} height={32} width={32}></img>
                    </Icon>
                  )}
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction={'row'} spacing={2}>
            <TextField
              type='text'
              variant='outlined'
              placeholder='MM/YY'
              name='expiration'
              fullWidth
            />
            <TextField
              type='text'
              variant='outlined'
              placeholder='CVC'
              name='cvc'
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid xs={12}>
          <TextField
            type='text'
            variant='outlined'
            label='Name on Card'
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <RadioGroup
              defaultValue={billingAddress}
              value={billingAddress}
              onChange={({ target }) => {
                setBillingAddress(target.value);
              }}
            >
              <FormControlLabel
                value={'same'}
                control={<Radio />}
                label='Same as shipping address'
              />
              <FormControlLabel
                value={'different'}
                control={<Radio />}
                label='My billing address is different'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {billingAddress === 'different' ? (
          <Grid xs={12} container rowSpacing={2}>
            <Grid xs={12}>
              <TextField label='Street Address' fullWidth />
            </Grid>
            <Grid xs={12}>
              <Stack direction={'row'} alignItems={'center'} columnGap={0.5}>
                {!showAddress2 ? (
                  <>
                    <IconButton
                      aria-label='add more address information'
                      onClick={() => setAddress2(true)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <p>Add Apt number, suite, unit, building, floor, etc.</p>
                  </>
                ) : (
                  <TextField
                    label='Apartment, Suite, Unit, Building, Floor, Etc.'
                    fullWidth
                  />
                )}
              </Stack>
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField label='City' fullWidth />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label='State'
                id='state_from'
                defaultValue={''}
              >
                {usaStates.map(({ abbreviation, name }) => (
                  <MenuItem key={abbreviation} value={abbreviation}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField label='ZIP Code' fullWidth />
            </Grid>
          </Grid>
        ) : null}
        <Grid xs={12} display={'flex'} justifyContent={'center'} sx={{ mt: 1 }}>
          <Button fullWidth variant='contained' type='submit'>
            Pay
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentForm;

// Cards starting with 3 = American Express
// Cards starting with 4 = Visa
// Cards starting with 5 = Mastercard
// Cards starting with 6 = Discover
