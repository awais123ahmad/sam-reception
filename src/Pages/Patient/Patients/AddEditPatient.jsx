import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import patientService from "../../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../../Services/doctorService";

const AddEditPatient = () => {
  const [patientData, setPatientData] = useState({
    full_name: "",
    contact_number: "",
    gender: "",
    date_of_birth: "",
    address: "",
    checkup_date: "",
    assigned_doctor: "", 
    CNIC: "",
    amount: "",
  });

  const [doctorData, setDoctorData] = useState([]); 

  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch patient data for editing
      const fetchPatientData = async () => {
        try {
          const response = await patientService.fetchPatientById(id); // Use the fetchPatientById service method
          setPatientData(response.patient); // Assuming response has a 'patient' object
        } catch (error) {
          toast.error("Error fetching patient data.");
        }
      };

      fetchPatientData();
    }
  }, [id]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        
        const response = await doctorService.fetchAllDoctors();
        console.log(response); // Log the response to confirm the structure
        setDoctorData(response.doctors); // Access the patients array within response
       
      } catch (error) {
       
        toast.error('Error fetching Doctors');
      }
    };
    getDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (id) {
  //       await patientService.updatePatient(id, patientData);
  //       toast.success("Patient updated successfully!");
  //     } else {
  //       await patientService.createpr(patientData);
  //       toast.success("Patient added successfully!");
  //     }
  //     navigate("/receptionist/patients");
  //   } catch (error) {
  //     toast.error("Error saving patient.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await patientService.updatePatient(id, patientData);
        toast.success("Patient updated successfully!"); // Success message
      } else {
        await patientService.create(patientData);
        toast.success("Patient added successfully!"); // Success message
      }
      navigate("/receptionist/patients"); // Redirect after submission
    } catch (error) {
      toast.error("Error saving patient."); // Error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">{id ? "Edit Patient" : "Add Patient"}</h1>  
      <Divider />
      <div>
        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              name="full_name"
              value={patientData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginLeft: 20, width: "50%" }}>
            <TextField
              label="Phone No."
              variant="outlined"
              fullWidth
              name="contact_number"
              value={patientData.contact_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 my-[20px] gap-10">
          <div>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              type="date"
              name="date_of_birth"
              value={patientData.date_of_birth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <TextField
              label="CNIC"
              variant="outlined"
              fullWidth
              name="CNIC"
              value={patientData.CNIC}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-[20px]">
          <TextField
            label="Residential Address"
            variant="outlined"
            fullWidth
            name="address"
            value={patientData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-3 my-[20px] gap-10">
          <div>
            <TextField
              label="CheckUp Date"
              variant="outlined"
              fullWidth
              type="date"
              name="checkup_date"
              value={patientData.checkup_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div style={{  }}>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              type="number"
              name="amount"
              value={patientData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel>Assigned Doctor</InputLabel>
              <Select
                label="Assigned Doctor"
                name="assigned_doctor"
                value={patientData.assigned_doctor} // Set the selected doctor's ID
                onChange={handleChange}
                required
              >
                {doctorData.map((doctors) => (
                  <MenuItem key={doctors.id} value={doctors.id}>
                    {doctors.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            className="!bg-gray-700 !text-white"
            style={{ borderRadius: "10px" }}
          >
            Save and Continue
          </Button>
        </Grid>
      </div>
    </form>
  );
};

export default AddEditPatient;
