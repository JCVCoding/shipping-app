import { Stack } from "@mui/material";

import QuoteForm from "../components/QuoteForm";
import QuoteCard, { QuoteData } from "../components/QuoteCard";
import { useState } from "react";

const cardData: QuoteData[] = [
  { service: "Ground Shipping", deliveryDate: "03-23-2024", price: "$10" },
  {
    service: "Ground Expedited Shipping",
    deliveryDate: "03-21-2024",
    price: "$15",
  },
  { service: "Express Shipping", deliveryDate: "03-20-2024", price: "$23" },
  { service: "2 Day Air Shipping", deliveryDate: "03-19-2024", price: "$30" },
  { service: "Next Day Shipping", deliveryDate: "03-18-2024", price: "$45" },
];

function Home() {
  const [showCards, setShowCards] = useState(false);
  return (
    <>
      <QuoteForm getCards={setShowCards} />
      {showCards ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {cardData.map(({ service, deliveryDate, price }) => (
            <QuoteCard
              key={price}
              service={service}
              deliveryDate={deliveryDate}
              price={price}
            />
          ))}
        </Stack>
      ) : null}
    </>
  );
}

export default Home;
