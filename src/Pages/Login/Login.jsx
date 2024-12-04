import React, { useState } from "react";
import { Button, Divider, Grid, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/userService"; // Adjust path as needed
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginService from "../../Services/loginService";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(loginData); // Assume login method in userService
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response)); // Save user info in localStorage
      navigate("/patient/patients"); // Redirect to admin or dashboard page
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-zinc-200 shadow-lg sm:rounded-md sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                <h2 className="text-xl font-semibold text-center mb-6">Said Ahmed Memorial Hospital</h2>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {/* Email Input */}
                    <div className="relative">
                      <TextField
                        label="User Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    {/* Password Input with Show/Hide Feature */}
                    <div className="relative top-4">
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              position="end"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          ),
                        }}
                      />
                    </div>

                     <div className="relative top-6">
                      <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          size="large"
                          className="!bg-[#007fff] !text-white"
                          style={{ borderRadius: "10px" }}
                        >
                          Login
                        </Button>
                      </Grid>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;