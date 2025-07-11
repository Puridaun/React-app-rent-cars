import { useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";
import HorizontalNonLinearStepper from "@/components/ui/HorizontalNonLinearStepper";
import ReservedCarInfo from "@/components/ReserveCarInfo";
import {
  isValidNameInput,
  isValidEmailInput,
  isValidAgeInput,
  isValidDriverId,
} from "@/components/FormValidation";

const CompleteReservationPage: React.FC = () => {
  const location = useLocation();
  const car = location.state?.car;
  const rentInputData = location.state?.rentInputData;
  const getBenefitAndFeaturesPrice = location.state?.getBenefitAndFeaturesPrice;
  const rentalDays = location.state?.rentalDays;

  const getCompletedSteps = () => {
    if (!car) return [-1, 0];

    // If on final step (stepPage = 2), mark all previous steps as completed
    if (stepPage === 2) {
      return [0, 1, 2]; //Mark step 2 as completed too
    }
    return [0, 1]; // Normal case
  };

  const [inputErrors, setInputErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    age: false,
    driverId: false,
  });
  const [stepPage, setStepPage] = useState(1);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isNameValid = isValidNameInput(value);
    const isEmailValid = isValidEmailInput(value);
    const isAgeValid = isValidAgeInput(value);
    const isDriverIdValid = isValidDriverId(value);

    if (name === "last-name") {
      setInputErrors((prev) => ({ ...prev, lastName: !isNameValid }));
    }
    if (name === "first-name") {
      setInputErrors((prev) => ({ ...prev, firstName: !isNameValid }));
    }
    if (name === "email") {
      setInputErrors((prev) => ({ ...prev, email: !isEmailValid }));
    }
    if (name === "age") {
      setInputErrors((prev) => ({ ...prev, age: !isAgeValid }));
    }
    if (name === "driver-id") {
      setInputErrors((prev) => ({ ...prev, driverId: !isDriverIdValid }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (formData.get("last-name") === "") {
      setInputErrors((prev) => ({
        ...prev,
        lastName: true,
      }));
      window.scrollTo(0, 0);
      return;
    }
    if (formData.get("first-name") === "") {
      setInputErrors((prev) => ({
        ...prev,
        firstName: true,
      }));
      window.scrollTo(0, 0);
      return;
    }
    if (formData.get("email") === "") {
      setInputErrors((prev) => ({
        ...prev,
        email: true,
      }));
      window.scrollTo(0, 0);
      return;
    }
    if (formData.get("age") === "") {
      setInputErrors((prev) => ({
        ...prev,
        age: true,
      }));
      window.scrollTo(0, 0);
      return;
    }
    if (formData.get("driver-id") === "") {
      setInputErrors((prev) => ({
        ...prev,
        driveriId: true,
      }));
      window.scrollTo(0, 0);
      return;
    }

    event.currentTarget.reset();

    setInputErrors({
      firstName: false,
      lastName: false,
      email: false,
      age: false,
      driverId: false,
    });
    setStepPage(2);
    alert("Car reservation complete!");
    console.log("Form cleared!");
  };

  return (
    <section className="std-section">
      <HorizontalNonLinearStepper
        currentStep={stepPage} // You're on "Select car" step
        completedSteps={getCompletedSteps()} // Mark step 0 as completed if car is selected
      />
      <form onSubmit={onSubmit} className="complete-reservation-form">
        <div className="form-data ">
          {/* Last and First Name */}
          <div className="data-inputs">
            <div className="flex flex-col">
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                onBlur={handleNameChange}
                className={inputErrors.lastName ? "input-error" : ""}
              ></input>
              {inputErrors.lastName ? (
                <span className="text-red-500 font-medium">
                  Incorrect Last Name or empty field
                </span>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                onBlur={handleNameChange}
                className={inputErrors.firstName ? "input-error" : ""}
              ></input>
              {inputErrors.firstName ? (
                <span className="text-red-500 font-medium">
                  Incorrect First Name or empty field
                </span>
              ) : null}
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onBlur={handleNameChange}
              className={inputErrors.email ? "input-error" : ""}
            ></input>
            {inputErrors.email ? (
              <span className="text-red-500 font-medium">
                Incorrect Email or empty
              </span>
            ) : null}
          </div>
          {/* Age and number of driver id */}
          <div className="data-inputs">
            <div className="flex flex-col age-input">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                onBlur={handleNameChange}
                className={inputErrors.age ? "input-error" : ""}
              ></input>
              {inputErrors.age ? (
                <span className="text-red-500 font-medium">
                  Incorrect age or empty
                </span>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="driver-id">Driver Id</label>
              <input
                id="driver-id"
                name="driver-id"
                type="number"
                onBlur={handleNameChange}
                className={inputErrors.driverId ? "input-error" : ""}
              ></input>
              {inputErrors.driverId ? (
                <span className="text-red-500 font-medium">
                  Driver Id too short/long
                </span>
              ) : null}
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
        <ReservedCarInfo
          getBenefitAndFeaturesPrice={getBenefitAndFeaturesPrice}
          rentInputData={rentInputData}
          car={car}
          rentalDays={rentalDays}
          text={"Reserve"}
          action={() => {
            // Get the form and submit it properly
            const form = document.querySelector(
              ".complete-reservation-form"
            ) as HTMLFormElement;
            if (form) {
              form.requestSubmit(); // This triggers onSubmit with the proper event
            }
          }}
        />
      </form>
    </section>
  );
};

export default CompleteReservationPage;
