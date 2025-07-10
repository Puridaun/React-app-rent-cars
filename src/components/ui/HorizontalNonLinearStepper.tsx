import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { StepLabel } from "@mui/material";

const steps = ["Select car", "Select car features", "Complete reservation"];

interface HorizontalNonLinearStepperProps {
  currentStep?: number;
  completedSteps?: number[];
  onStepClick?: (step: number) => void;
  clickable?: boolean;
}

const HorizontalNonLinearStepper: React.FC<HorizontalNonLinearStepperProps> = ({
  currentStep = 0,
  completedSteps = [],
  onStepClick,
  clickable = true,
}) => {
  const [activeStep, setActiveStep] = React.useState(currentStep);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>(() => {
    const initialCompleted: { [k: number]: boolean } = {};
    completedSteps.forEach((step) => {
      initialCompleted[step] = true;
    });
    return initialCompleted;
  });

  React.useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  React.useEffect(() => {
    const newCompleted: { [k: number]: boolean } = {};
    completedSteps.forEach((step) => {
      newCompleted[step] = true;
    });
    setCompleted(newCompleted);
  }, [completedSteps]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    if (onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          // Overall stepper styling using CSS variables
          padding: "24px",
          backgroundColor: "",
          color: "var(--text-color-on-primary-bg)",
          // Step connector line styling
          "& .MuiStepConnector-root": {
            top: 12,
            "& .MuiStepConnector-line": {
              border: "1px solid var(--stepper-line)",
              borderRadius: "1px",
            },
          },

          // Step icon styling
          "& .MuiStepIcon-root": {
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--stepper-bg)",
            transition: "color 0.3s ease-in-out",
            "&.Mui-active": {
              color: "white",
            },
            "&.Mui-completed": {
              color: "var(--stepper-completed)",
            },
          },

          // Step label styling
          "& .MuiStepLabel-label": {
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--stepper-text)",
            marginTop: "8px",
            transition: "color 0.3s ease-in-out",
            "&.Mui-active": {
              color: "var(--stepper-active)",
              fontWeight: 600,
            },
            "&.Mui-completed": {
              color: "var(--stepper-completed)",
              fontWeight: 600,
            },
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            {clickable && onStepClick ? (
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                sx={{
                  // StepButton specific styling
                  "& .MuiStepLabel-root": {
                    cursor: "pointer",
                  },
                  "&:hover .MuiStepLabel-label": {
                    color: "#1976d2",
                  },
                  "&:hover .MuiStepIcon-root": {
                    transform: "scale(1.1)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                {label}
              </StepButton>
            ) : (
              <StepLabel color="inherit">{label}</StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalNonLinearStepper;
