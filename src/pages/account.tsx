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

const AccountPage = () => {
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
            <TableRow>
              <TableCell>12345</TableCell>
              <TableCell>4/17/2024</TableCell>
              <TableCell>2ZXXXX</TableCell>
              <TableCell>4/21/2024</TableCell>
              <TableCell>
                <Chip label="In Transit" color="info" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountPage;
