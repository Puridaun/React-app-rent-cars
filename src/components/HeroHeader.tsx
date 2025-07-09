import { useNavigate } from "react-router-dom";
import React from "react";
import { RentInputData } from "../pages/HomePage";

interface HeroHeaderProps {
  setRentInputData: React.Dispatch<React.SetStateAction<RentInputData>>;
  rentInputData: RentInputData;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  setRentInputData,
  rentInputData,
}) => {
  const navigate = useNavigate();

  type RentInputKeys = keyof typeof rentInputData; // "rentDate" | "returnDate" | "location"

  const handleRentDataInput = (
    //modify the value of wanted property of 'rentInputData'
    property: RentInputKeys,
    value: string | Date
  ): void => {
    setRentInputData((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  // -------------------Start COMOPONENT --------------------------------------------------------------------------

  const handleRentForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setRentInputData(rentInputData);
    navigate(`/available-cars`, { state: { rentInputData } }); //send 'rentInputData' to next page
  };

  return (
    <header>
      <div className="std-section">
        <div className="hero-container">
          <form onSubmit={handleRentForm} className="hero-container-form">
            <div className="hero-form-inputs flex flex-col">
              <label htmlFor="location" className="font-semibold">
                Locatie preluare
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={rentInputData.location}
                onChange={(e) =>
                  handleRentDataInput("location", e.target.value)
                }
              ></input>
            </div>
            <div className="hero-form-inputs flex flex-col">
              <label htmlFor="rent-date" className="font-semibold">
                Data de inchiriere
              </label>
              <input
                id="rent-date"
                name="rent-date"
                type="date"
                min={rentInputData.rentDate}
                value={rentInputData.rentDate}
                onChange={(e) =>
                  handleRentDataInput("rentDate", e.target.value)
                }
                required
              ></input>
            </div>
            <div className="hero-form-inputs flex flex-col">
              <label htmlFor="return-date" className="font-semibold">
                Data de returnare
              </label>
              <input
                id="return-date"
                name="return-date"
                type="date"
                min={rentInputData.rentDate}
                value={rentInputData.returnDate}
                onChange={(e) =>
                  handleRentDataInput("returnDate", e.target.value)
                }
                required
              ></input>
            </div>
            <button className="home-page-button" type="submit">
              Profita acum
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
