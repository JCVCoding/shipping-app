import { Stack } from '@mui/material';

import QuoteForm from '../components/QuoteForm';
import ShipmentCard from '../components/ShipmentCard';
import { useState } from 'react';

function Home() {
  const [showCards, setShowCards] = useState(false);
  return (
    <>
      <QuoteForm getCards={setShowCards} />
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

export default Home;
