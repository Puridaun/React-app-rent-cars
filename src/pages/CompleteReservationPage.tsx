import { useLocation } from "react-router-dom";
import React from "react";
import { benefits } from "./ReserveCarPage";
import HorizontalNonLinearStepper from "@/components/ui/HorizontalNonLinearStepper";
import apiClient from "@/components/API";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@mui/material";
import ReservedCarInfo from "@/components/ReserveCarInfo";

interface InputsForm {
  labelName: string;
  inputName: string;
  inputType: string;
}

// available_from: "2025-06-24T21:00:00.000Z";
// brand: "Ford";
// characteristics: (4)[("2023", "Petrol", "125 HP", "Manual")];
// currency: "EUR";
// feature_price: 5;
// features: (7)[
//   ("GPS Navigation",
//   "Child Safety Seat",
//   "Additional Driver",
//   "WiFi Hotspot",
//   "Premium Insurance",
//   "Phone Charger",
//   "Roof Box")
// ];
// id: 3;
// image: "./src/assets/Ford Focus.png";
// is_car_rented: false;
// is_promoted: true;
// model: "Focus";
// price: 55;

const CompleteReservationPage: React.FC = () => {
  const location = useLocation();
  const car = location.state?.car;
  const rentInputData = location.state?.rentInputData;
  const getBenefitAndFeaturesPrice = location.state?.getBenefitAndFeaturesPrice;
  const rentalDays = location.state?.rentalDays;

  const stepPage = 1;

  const {
    clickedBenefit,
    selectedFeatures,
    clickedBenefitPrice,
    selectedFeaturesPrice,
  } = getBenefitAndFeaturesPrice;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("access_key", "d07041ae-f0f3-4840-a1f7-f5965f097ced");

      const object: Record<string, any> = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const carReservationInfo = {
        ...object,
        brand: car.brand,
        model: car.model,
        price:
          car.price * rentalDays + clickedBenefitPrice + selectedFeaturesPrice,
        rentalDays: rentalDays,
      };
      const json = JSON.stringify(carReservationInfo);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        alert("Your message was sent successfully");
        console.log("Success", result);
        event.currentTarget.reset();
      } else {
        alert("Failed to send message. Please try again.");
        console.error("Error", result);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Network error", error);
    }

    const formattedDate = new Date(rentInputData.returnDate).toISOString();
    const isCarPromoted = false;

    // ✅ Fixed - use apiClient instead of hardcoded fetch
    try {
      await apiClient.put(`/${car.id}`, {
        available_from: formattedDate,
        is_promoted: isCarPromoted,
      });
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <section className="std-section">
      <HorizontalNonLinearStepper
        currentStep={stepPage} // You're on "Select car" step
        completedSteps={car ? [0, 1] : [-1, 0]} // Mark step 0 as completed if car is selected
      />
      <form onSubmit={onSubmit} className="complete-reservation-form">
        <div className="form-data ">
          {/* Last and First Name */}
          <div className="flex  ">
            <div className="flex flex-col">
              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" name="last-name" type="text"></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" name="first-name" type="text"></input>
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email"></input>
          </div>
          {/* Age and number of driver id */}
          <div className="flex ">
            <div className="flex flex-col age-input">
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number"></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="driver-id">Driver Id</label>
              <input id="driver-id" name="driver-id" type="number"></input>
            </div>
          </div>
        </div>
        <div className="text-message">
          <label htmlFor="message">Message</label>
          <textarea
            className="customer-message"
            placeholder="Your message..."
          ></textarea>
        </div>
        {/* <div className="reserved-car-last-info">
          <img src={car.image} alt="reserved-car-image" />
          <div>
            <div className="reserved-car-info">
              <h2>{`${car.brand} ${car.model}`}</h2>
              <p>Rent Date: {rentInputData.rentDate}</p>
              <p>Return Date: {rentInputData.returnDate}</p>
              <p>Location: {rentInputData.location}</p>
            </div>
            <div className="reserved-car-info">
              {clickedBenefit ? (
                <div className="benefits-list">
                  <span>{benefits[clickedBenefit].name}</span>
                  <span>
                    {benefits[clickedBenefit].price} {car.currency}
                  </span>
                </div>
              ) : null}
              {selectedFeatures.map((feature: number, index: number) => (
                <div key={index} className="features-list">
                  <span>{car.features[feature]}</span>
                  <span>5 {car.currency}</span>
                </div>
              ))}
            </div>
            <div className="reserved-car-total-cost">
              <span>
                {" "}
                {car.price * rentalDays +
                  clickedBenefitPrice +
                  selectedFeaturesPrice}
                $ / {rentalDays} days
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="btn-primary">
          Rezerva
        </button> */}
        <ReservedCarInfo
          getBenefitAndFeaturesPrice={getBenefitAndFeaturesPrice}
          rentInputData={rentInputData}
          car={car}
          rentalDays={rentalDays}
          text={"Reserve"}
        />
      </form>
    </section>
  );
};

export default CompleteReservationPage;
