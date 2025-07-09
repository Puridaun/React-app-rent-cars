import { useLocation } from "react-router-dom";
import React from "react";
import { benefits } from "./ReserveCarPage";
import HorizontalNonLinearStepper from "@/components/HorizontalNonLinearStepper";

interface InputsForm {
  labelName: string;
  inputName: string;
  inputType: string;
}
const formInputs: InputsForm[] = [
  {
    labelName: "First Name",
    inputName: "first-name",
    inputType: "text",
  },
  {
    labelName: "Last Name",
    inputName: "last-name",
    inputType: "text",
  },
  {
    labelName: "Email",
    inputName: "email",
    inputType: "email",
  },
  {
    labelName: "Nr. telefon",
    inputName: "nr-telefon",
    inputType: "number",
  },
  {
    labelName: "Varsta",
    inputName: "varsta",
    inputType: "number",
  },
  {
    labelName: "Nr. permis",
    inputName: "nr-permis",
    inputType: "number",
  },
];

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
        // Consider resetting the form here
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

    await fetch(
      `http:backend-database-production-cabe.up.railway.app/api/v1/rent-cars/${car.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          available_from: formattedDate,
          is_promoted: isCarPromoted,
        }),
      }
    );
  };

  return (
    <section className="std-section customer-form">
      <HorizontalNonLinearStepper
        currentStep={stepPage} // You're on "Select car" step
        completedSteps={car ? [0, 1] : [-1, 0]} // Mark step 0 as completed if car is selected
      />
      <form onSubmit={onSubmit} className="complete-reservation-form">
        <div className="complete-reservation-form-inputs">
          {formInputs.map((item: InputsForm, index: number) => (
            <div key={index} className="form-inputs customer-info-inputs">
              <label htmlFor="">{item.labelName}</label>
              <input
                placeholder={item.labelName}
                name={item.inputName}
                type={item.inputType}
              ></input>
            </div>
          ))}
        </div>
        <textarea
          className="customer-message"
          placeholder="Your message..."
        ></textarea>
        <div className="reserved-car-last-info">
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
                  <span>{benefits[clickedBenefit].price}$</span>
                </div>
              ) : null}
              {selectedFeatures.map((feature: number, index: number) => (
                <div key={index} className="features-list">
                  <span>{car.features[feature]}</span>
                  <span>{car.price}$</span>
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
        </button>
      </form>
    </section>
  );
};

export default CompleteReservationPage;
