import { Stack } from "@mui/material";

import Form from "./components/Form";
import ShipmentCard from "./components/ShipmentCard";
import { useState } from "react";

function App() {
  const [showCards, setShowCards] = useState(false);
  return (
    <>
      <Form getCards={setShowCards} />
      {showCards ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <ShipmentCard />
          <ShipmentCard />
          <ShipmentCard />
        </Stack>
      ) : null}
    </>
  );
}

export default App;
