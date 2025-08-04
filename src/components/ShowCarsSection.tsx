import apiClient from "./API";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RentInputData } from "@/pages/HomePage";
import { Skeleton } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleReserveButton = (car: Car): void => {
    navigate(`/reserve-car`, { state: { car, rentInputData } });
  };

  useEffect(() => {
    const fetchPromotedCars = async () => {
      try {
       
        const cars = await getPromotedCars();
        setPromotedCars(cars);
         setIsLoading(true);console.log('=== API CLIENT DEBUG ===');
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('All import.meta.env:', import.meta.env);
      } catch (error) {
       
        console.error("Error fetching promoted cars:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotedCars();
  }, []);

  if (isLoading) {
    return (
      <section className="std-section">
        <div id="recomended-cars" className="recomended-cars-container">
          <Skeleton variant="rectangular" width="320px" height="200px" />
          <div className="recomended-car-info">
            <Skeleton variant="text" width="60%" height="32px" />
            <Skeleton variant="text" width="40%" height="20px" />
            <Skeleton variant="rectangular" width="100%" height="100px" />
            <Skeleton variant="rectangular" width="120px" height="40px" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="std-section">
      {promotedCars.map((car, index) => (
        <div key={index} className="recomended-cars-container">
          <img src={car.image} alt="car-image" />
          <div className="recomended-car-info">
            <h2>{`${car.brand} ${car.model}`}</h2>
            <h4>Benefits</h4>
            <ul>
              <li>TVA included and deductible</li>
              <li>24/7 roadside assistance</li>
              <li>Free cancellation</li>
              <li>No advance payment</li>
              <li>Unlimited kilometers</li>
              <li>New models</li>
            </ul>
            <button
              className="home-page-button"
              type="button"
              onClick={(): void => {
                handleReserveButton(car);
              }}
            >
              Book now!
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShowCarsSection;
