import { useNavigate } from "react-router-dom";
import React from "react";
import { benefits } from "../pages/ReserveCarPage";
import { BenefitAndFeaturesPrice } from "../pages/ReserveCarPage";
import { Car } from "./ShowCarsSection";
import { RentInputData } from "@/pages/HomePage";

interface ReservedCarInfoProps {
  getBenefitAndFeaturesPrice: BenefitAndFeaturesPrice;
  rentInputData: RentInputData;
  car: Car;
  rentalDays: number;
  text: string;
  action: () => void;
}

// -------------------Start COMOPONENT --------------------------------------------------------------------------

const ReservedCarInfo: React.FC<ReservedCarInfoProps> = ({
  getBenefitAndFeaturesPrice,
  rentInputData,
  car,
  rentalDays,
  text,
  action,
}) => {
  const {
    clickedBenefit,
    selectedFeatures,
    clickedBenefitPrice,
    selectedFeaturesPrice,
  } = getBenefitAndFeaturesPrice;

  return (
    <div className="reserve-car-last-info">
      <img src={car.image} alt="reserve-car-image" />
      <div className="w-full">
        <div className="reserve-car-info">
          <h3>
            {car.brand} {car.model}
          </h3>
          <p>
            <span className="fw-600">Rent Date:</span> {rentInputData.rentDate}
          </p>
          <p>
            <span className="fw-600">Return Date:</span>{" "}
            {rentInputData.returnDate}
          </p>
          <p>
            <span className="fw-600">Location:</span> {rentInputData.location}
          </p>
        </div>
        <div className="reserve-car-info">
          {clickedBenefit ? (
            <div className="benefits-list">
              <span>{benefits[clickedBenefit].name}</span>
              <span>
                <span className="price-style">
                  {benefits[clickedBenefit].price}
                </span>{" "}
                {car.currency}
              </span>
            </div>
          ) : null}
          {selectedFeatures.map((feature: number, index: number) => (
            <div key={index} className="features-list">
              <span>{car.features[feature]}</span>
              <span>
                <span className="price-style">{car.feature_price} </span>{" "}
                {car.currency}
              </span>
            </div>
          ))}
        </div>
        <div className="reserve-car-total-cost">
          <span>
            <span className="total-price-style">
              {car.price * rentalDays +
                clickedBenefitPrice +
                selectedFeaturesPrice}
            </span>{" "}
            {car.currency} / {rentalDays} days
          </span>
        </div>
        <button className="reserve-button" type="button" onClick={action}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default ReservedCarInfo;
