import {
  Chip,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

type Shipment = {
  accountNumber: string;
  trackNumber: string;
  deliveryDate: string;
  shipDate: string;
};

const AccountPage = () => {
  const accountNumber = useAppSelector(
    (state) => state.user.accounts[0].accountNumber
  );
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/ship/${accountNumber}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((shipments) => setShipments(shipments));
  }, [accountNumber]);
  return (
    <>
      <Typography>Account Information</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Shipped Date</TableCell>
              <TableCell>Tracking Number</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.trackNumber}>
                <TableCell>{shipment.accountNumber}</TableCell>
                <TableCell>{shipment.shipDate}</TableCell>
                <TableCell>{shipment.trackNumber}</TableCell>
                <TableCell>{shipment.deliveryDate}</TableCell>
                <TableCell>
                  <Chip label="In Transit" color="info" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountPage;
