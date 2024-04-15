import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import QuoteForm from "../components/QuoteForm";
import QuoteCard, { QuoteData } from "../components/QuoteCard";
import { useState } from "react";
import { useAppSelector } from "../hooks";
const today = dayjs();

const cardData: QuoteData[] = [
  {
    service: "Ground Shipping",
    deliveryDate: `${today.add(5, "d").format("MM-DD-YYYY")}`,
    price: "$10",
  },
  {
    service: "Ground Expedited Shipping",
    deliveryDate: `${today.add(4, "d").format("MM-DD-YYYY")}`,
    price: "$15",
  },
  {
    service: "Express Shipping",
    deliveryDate: `${today.add(3, "d").format("MM-DD-YYYY")}`,
    price: "$23",
  },
  {
    service: "2 Day Air Shipping",
    deliveryDate: `${today.add(2, "d").format("MM-DD-YYYY")}`,
    price: "$30",
  },
  {
    service: "Next Day Shipping",
    deliveryDate: `${today.add(1, "d").format("MM-DD-YYYY")}`,
    price: "$45",
  },
];

function Home() {
  const [showCards, setShowCards] = useState(false);
  const username = useAppSelector((state) => state.auth.username);
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  return (
    <>
      {isLoggedIn ? (
        <Typography variant="h3" component="h1" marginBottom={2}>
          Welcome, {username}
        </Typography>
      ) : null}
      <Typography variant="h5" component="p">
        Need a shipping quote? Fill out the form below to get started!
      </Typography>
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
