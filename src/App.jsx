import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import { BrowserRouter} from "react-router-dom";
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import PatientDashboard from "./Pages/Patient/Patient_Dashboard/PatientDashboard"
import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
import LoginPage from "./Pages/Login/Login"
import Cookies from 'js-cookie';
import { Toaster } from "react-hot-toast"; 

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Check authentication status on page load
  useEffect(() => {
    setIsAuthenticated(
      Boolean(Cookies.get("XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk="))
    );
  }, [location.pathname]);

  return (
    <>
      <Toaster position="top-center" /> {/* Add Toaster here */}
      

      <PortalLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reception/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/" />} />
          <Route path="/reception/patients/:id" element={<PatientDetails />} />
          <Route path="/reception/patients/AddEdit" element={<AddEditPatient />} />
          <Route path="/reception/patientdashboard" element={<PatientDashboard />} />
        </Routes>
      </PortalLayout>
    </>
  );
}

export default App;