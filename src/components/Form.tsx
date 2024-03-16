import { Button, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FormEvent } from 'react';

const Form = ({ getCards }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCards(true);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6}>
          <TextField
            label='From'
            placeholder='Zipcode'
            type='text'
            variant='standard'
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            label='To'
            placeholder='Zipcode'
            type='text'
            variant='standard'
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label='Weight'
            type='text'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>lbs.</InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label='Length'
            variant='standard'
            InputProps={{
              endAdornment: <InputAdornment position='end'>in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label='Width'
            variant='standard'
            InputProps={{
              endAdornment: <InputAdornment position='end'>in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <TextField
            label='Height'
            variant='standard'
            InputProps={{
              endAdornment: <InputAdornment position='end'>in.</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} display={'flex'} justifyContent={'center'}>
          <Button sx={{ width: 1 / 2 }} variant='contained' type='submit'>
            Get Quotes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
