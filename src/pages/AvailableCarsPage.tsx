import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import apiClient from "../components/API";
import { Car } from "../components/ShowCarsSection";
import HorizontalNonLinearStepper from "@/components/ui/HorizontalNonLinearStepper";
import { Skeleton } from "@mui/material";

// location: "Bucharest";
// rentDate: "2025-06-27";
// returnDate: "2025-06-27";

const getCars = async (): Promise<Car[]> => {
  try {
    const response = await apiClient("/");
    return response.data;
  } catch (error) {
    console.error("No car");
    return [];
  }
};
const AvailableCarsPage: React.FC = () => {
  const navigate = useNavigate();
  const rentInputData = useLocation().state?.rentInputData;

  const stepPage = -1;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCars, setAllCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchedCars = async () => {
      try {
        setIsLoading(true);
        const cars = await getCars();
        setAllCars(cars);
        return [];
      } catch (error) {
        console.error("No car");
      } finally {
        setIsLoading(false);
      }
    };

    fetchedCars();
  }, []);

  const availableCars = allCars.filter((car) => {
    if (!rentInputData.rentDate) return true; // Show all cars if no date selected

    // Only show cars that are available on or after the rental date
    return new Date(car.available_from) <= new Date(rentInputData.rentDate);
  });

  const handleReserveButton = (car: {}) =>
    navigate("/reserve-car", { state: { car, rentInputData } });

  if (isLoading) {
    return (
      <section className="std-section">
        <HorizontalNonLinearStepper
          currentStep={stepPage} // You're on "Select car" step
          completedSteps={availableCars ? [-1] : []} // Mark step 0 as completed if car is selected
        />
        <div>
          <h2>Available Cars</h2>
          <p>
            <span className="fw-600">Rental Date:</span>{" "}
            {rentInputData.rentDate}
          </p>
          <p>
            <span className="fw-600">Date of return:</span>{" "}
            {rentInputData.returnDate}
          </p>
          <p>
            <span className="fw-600">Location:</span> {rentInputData.location}
          </p>
        </div>
        <div className="available-cars-container">
          <Skeleton variant="rectangular" width="320px" height="200px" />
          <div className="available-car-card">
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
    <div className="std-section">
      <HorizontalNonLinearStepper
        currentStep={stepPage} // You're on "Select car" step
        completedSteps={availableCars ? [-1] : []} // Mark step 0 as completed if car is selected
      />
      <div>
        <h2>Available Cars</h2>
        {/* Display the search criteria */}
        <p>
          <span className="fw-600">Rental Date:</span> {rentInputData.rentDate}
        </p>
        <p>
          <span className="fw-600">Date of return:</span>{" "}
          {rentInputData.returnDate}
        </p>
        <p>
          <span className="fw-600">Location:</span> {rentInputData.location}
        </p>
      </div>

      <section className="available-cars-container">
        {availableCars.map((car, index) => (
          <div key={index} className="available-car-card">
            <div className="available-car-image">
              <img src={car.image} alt="available-car-image" />
              {/* add image address from database */}
            </div>
            <div className="available-car-infos">
              <h3>{`${car.brand} ${car.model}`}</h3>
              <div className="flex gap-1">
                {car.characteristics.map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </div>
              <p className="fw-600 available-car-price">
                <span>{car.price}</span>
                {` ${car.currency}/day`}
              </p>
              <button
                className="available-car-button"
                type="button"
                onClick={() => {
                  handleReserveButton(car);
                }}
              >
                Book now!
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AvailableCarsPage;
