import "./App.css";
import HomePage from "./pages/HomePage";
import AvailableCarsPage from "./pages/AvailableCarsPage";
import ReserveCarPage from "./pages/ReserveCarPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import CompleteReservationPage from "./pages/CompleteReservationPage";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/available-cars",
        element: <AvailableCarsPage />,
      },
      {
        path: "/reserve-car",
        element: <ReserveCarPage />,
      },
      {
        path: "/complete-reservation",
        element: <CompleteReservationPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;

// https://www.expedicar.ro/oferte-inchiriere?gad_source=1&gad_campaignid=21639023890&gbraid=0AAAAABe46Rsq2QCBblisAB5aAzova3osR&gclid=Cj0KCQjwxo_CBhDbARIsADWpDH6Km7UEPq94MhSNwczOiql1fahho3XnWtXCivI_IZPWhDe5pPL0B4caAs0vEALw_wcB
