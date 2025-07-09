import HeroHeader from "../components/HeroHeader";
import ShowCarsSection from "../components/ShowCarsSection";
import { useState } from "react";

export interface RentInputData {
  rentDate: string;
  returnDate: string;
  location: string;
}

// -------------------Start COMOPONENT --------------------------------------------------------------------------

const HomePage = () => {
  const today = new Date();
  const date: string = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDay: string = tomorrow.toISOString().split("T")[0];

  const [rentInputData, setRentInputData] = useState<RentInputData>({
    rentDate: date,
    returnDate: nextDay,
    location: "Bucharest",
  });

  return (
    <>
      <HeroHeader
        setRentInputData={setRentInputData}
        rentInputData={rentInputData}
      />
      <ShowCarsSection rentInputData={rentInputData} />
    </>
  );
};

export default HomePage;
