import { Link } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useAppSelector } from "../hooks";

const ShipDetails = () => {
  const today = new Date();
  const shipDetails = useAppSelector((state) => state.ship);
  const fromZIP = useAppSelector((state) => state.fromZIP.value);
  const toZIP = useAppSelector((state) => state.toZIP.value);
  const quoteDetails = useAppSelector((state) => state.quote);
  const selectedQuoteData = useAppSelector((state) => state.selectedQuote);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          <h2>Shipper Details</h2>
          <p>{shipDetails.shipperName}</p>
          <p>{shipDetails.shipperAddress}</p>
          {shipDetails.shipperAddress2 ? (
            <p>{shipDetails.shipperAddress2}</p>
          ) : null}
          <p>
            {shipDetails.shipperCity}, {shipDetails.shipperState} {fromZIP}
          </p>
          <h2>Receiver Details</h2>
          <p>{shipDetails.recipientName}</p>
          <p>{shipDetails.recipientAddress}</p>
          {shipDetails.recipientAddress2 ? (
            <p>{shipDetails.recipientAddress2}</p>
          ) : null}
          <p>
            {shipDetails.recipientCity}, {shipDetails.recipientState} {toZIP}
          </p>
          <h2>Package Details</h2>
          <p>Length: {quoteDetails.length} in.</p>
          <p>Width: {quoteDetails.width} in.</p>
          <p>Height: {quoteDetails.height} in.</p>
          <p>Weight: {quoteDetails.weight} lbs.</p>
          <h2>Package Pick Up Date</h2>
          <DatePicker defaultValue={dayjs(`${today}`)} />
          <p>Selected Service: {selectedQuoteData.service}</p>
          <p>Delivery Date and Time: {selectedQuoteData.deliveryDate}</p>
          <p>Price: {selectedQuoteData.price}</p>
          <Button variant="contained" component={Link} to="/payment">
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default ShipDetails;
