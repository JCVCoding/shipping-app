import { Link } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const ShipDetails = () => {
  const today = new Date();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent sx={{ fontWeight: 500, fontSize: 24 }}>
          <p>Shipper Details</p>
          <p>Receiver Details</p>
          <p>Package Details</p>
          <p>Package Pick Up Date</p>
          <DatePicker defaultValue={dayjs(`${today}`)} />
          <p>Selected Service</p>
          <p>Delivery Date and Time</p>
          <p>Price</p>
          <Button variant='contained' component={Link} to='/payment'>
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default ShipDetails;
