import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import PaginationComponent from "../../../Components/PaginationComponent";
import patientService from "../../../Services/patientService";
import PatientDetails from '../Patients/PatientDetails';
import toast from 'react-hot-toast';

const Patients = () => {
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPatients = async () => {
      try {
        setLoading(true);
        const response = await patientService.fetchAllPatients();
        console.log(response);
        setPatients(response.patients);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Error fetching Patients');
      }
    };
    getPatients();
  }, []);

  useEffect(() => {
    const filteredResult = patients?.filter(
      (item) =>
        item?.contact_number?.toLowerCase().includes(searchData.toLowerCase()) ||
      item?.CNIC?.toLowerCase().includes(searchData.toLowerCase())
    ) || [];
    setFilteredData(filteredResult);
    setCurrentPage(1);
  }, [searchData, patients]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  // Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return ''; // Handle null or undefined
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};


  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">Patients Table</h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">{filteredData?.length || 0} records found</h1>
        
        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
          <Link to='AddEdit'>
            <button className="bg-[#232233] h-[2rem] px-4 rounded-md text-white font-[600] text-[14px]">
              + Enter Patient
            </button>
          </Link>
          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search By Phone or CNIC..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-white focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
          </div>
        </div>

        <div className="mx-[3%] rounded-lg border-2 bg-gray-700">
          <table className="w-[100%]">
            <thead>
              <tr className="capitalize leading-normal text-white">
              <th className="py-[2%] w-[10%] text-[.8rem] text-left pl-4">Patient NO.</th>
              <th className="py-[2%] w-[20%] text-[.8rem] text-left pl-4">Check up Date</th>
              <th className="py-[2%] w-[20%] text-[.8rem] text-left pl-4">Patient Name</th>
              <th className="py-[2%] w-[10%] text-[.8rem] text-left">Contact Number</th>
              <th className="py-[2%] w-[10%] text-[.8rem] text-center">CNIC</th>
              <th className="py-[2%] w-[20%] text-[.8rem] text-center">Address</th>
              <th className="py-[2%] w-[10%] text-[.8rem] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient) => (
                <tr key={patient?.patient_id} className="bg-white text-gray-600 text-sm font-light border-t-[1px] border-gray-200">
                  <td className="w-[10%] text-left">
                    <p className="font-[600] text-gray-600 text-[14px] text-center">{patient?.patient_id}</p>
                  </td>
                  <td className="w-[20%] text-left">
                    <p className="font-[600] text-gray-600 text-[14px] text-left px-4">{formatDate(patient?.checkup_date)}</p>
                  </td>
                  <td className="py-[1%] w-[20%] text-left pl-4">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.full_name}</p>
                  </td>
                  <td className="w-[10%] text-left">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.contact_number}</p>
                  </td>
                  <td className="py-[2%] px-2 w-[10%] text-center">
                    <span className="font-[400]">{patient?.CNIC}</span>
                  </td>
                  <td className="py-[2%] px-2 w-[20%] text-center">
                    <span className="font-[400]">{patient?.address}</span>
                  </td>
                  <td className="py-[2%] w-[10%] text-center">
                    <Link to={`/receptionist/${patient.patient_id}`}>
                      <button className="text-[13px] font-[500] text-blue-500">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationComponent
          data={filteredData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Patients;

