import apiClient from "./API";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RentInputData } from "@/pages/HomePage";
interface ShowCarsSectionProps {
  rentInputData: RentInputData | null;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  image: string;
  price: number;
  currency: string;
  available_from: string;
  is_car_rented: boolean;
  is_promoted: boolean;
  features: string[];
  characteristics: string[];
  feature_price: number;
}

const getPromotedCars = async (): Promise<Car[]> => {
  try {
    const response = await apiClient.get("/");
    const cars: Car[] = response.data;

    const promotedCars = cars.filter((car: Car) => car.is_promoted);

    return promotedCars.length > 0 ? promotedCars : [];
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

// -------------------Start COMOPONENT --------------------------------------------------------------------------

const ShowCarsSection: React.FC<ShowCarsSectionProps> = ({ rentInputData }) => {
  const navigate = useNavigate();

  const [promotedCars, setPromotedCars] = useState<Car[]>([]);

  const handleReserveButton = (car: Car): void => {
    navigate(`/reserve-car`, { state: { car, rentInputData } });
  };

  useEffect(() => {
    const fetchPromotedCars = async () => {
      try {
        const cars = await getPromotedCars();
        setPromotedCars(cars);
      } catch (error) {
        console.error("Error fetching promoted cars:", error);
      }
    };

    fetchPromotedCars();
  }, []);

  return (
    <section className="std-section">
      {promotedCars.map((car, index) => (
        <div key={index} className="recomended-cars-container">
          <img src={car.image} alt="car-image" />
          <div className="recomended-car-info">
            <h2>{`${car.brand} ${car.model}`}</h2>
            <h4>Beneficii</h4>
            <ul>
              <li>TVA inclus si deductibil</li>
              <li>Asistenta rutiera 24/7</li>
              <li>Anulare gratuita</li>
              <li>Fara plata in avans</li>
              <li>Kilometrii nelimitati</li>
              <li>Modele noi</li>
            </ul>
            <button
              className="home-page-button"
              type="button"
              onClick={(): void => {
                handleReserveButton(car);
              }}
            >
              Rezerva acum!
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShowCarsSection;
