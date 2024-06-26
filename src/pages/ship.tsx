import { useAppSelector } from "../hooks";

import ShippingForm from "../components/ShippingForm";
import Error from "./error";

const ShipPage = () => {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  if (loggedIn) {
    return <ShippingForm />;
  } else {
    return <Error />;
  }
};

export default ShipPage;
