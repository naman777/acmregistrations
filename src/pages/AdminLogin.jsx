import React, { useState } from "react";
import acm from "../assets/acm.png"; // Assuming you have this image
import axios from "axios";
import { backendUrl } from "../const/const";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(backendUrl + "/login", {
      name: name,
      password: password,
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", name);
      navigate("/admin/data");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="text-white  flex flex-col items-center justify-center py-10">
        <img
          src={acm}
          className="hidden md:block"
          style={{
            height: "100vh",
            position: "fixed",
            left: "0",
          }}
          alt="ACM"
        />
      </div>

      <div className="w-4/5 flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#15A6DD] mb-6 text-center">
            Admin Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="flex flex-col mt-6">
              <label
                htmlFor="name"
                className="self-start text-base font-semibold"
              >
                Name<span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="px-3 py-2 mt-2.5 text-sm tracking-normal leading-none rounded-md border border-gray-200 border-solid bg-slate-50 w-full"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col mt-6">
              <label
                htmlFor="password"
                className="self-start text-base font-semibold"
              >
                Password<span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="px-3 py-2 mt-2.5 text-sm tracking-normal leading-none rounded-md border border-gray-200 border-solid bg-slate-50 w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#15A6DD] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
