import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import PatientDashboard from "./Pages/Patient/Patient_Dashboard/PatientDashboard";
import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
import LoginPage from "./Pages/Login/Login";
import Cookies from 'js-cookie';
import { Toaster } from "react-hot-toast";
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate]);


  return (
    <>
      <Toaster position="top-center" />
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reception/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/" />} />
        <Route path="/reception/patients/:id" element={<PatientDetails />} />
        <Route path="/reception/patients/AddEdit" element={<AddEditPatient />} />
        <Route path="/reception/patientdashboard" element={<PatientDashboard />} />
      </Routes>
    </>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter basename="/receptionist">
      <PortalLayout>
        <App />
      </PortalLayout>
    </BrowserRouter>
  );
}
