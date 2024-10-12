import React, { useState } from "react";
import acm from "../assets/acm.png";
import CardField from "./CardField";

const AdminPortal = ({ users, usersCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Function to handle next and previous button clicks
  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle input change and jump to specific form number
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleJump = () => {
    const index = parseInt(inputValue) - 1; // Convert to zero-based index
    if (index >= 0 && index < users.length) {
      setCurrentIndex(index);
    } else {
      alert("Invalid form number");
    }
  };

  const currentUser = users[currentIndex];

  return (
    <div className="flex h-screen">
      <div className="text-white ml-10 flex flex-col items-center justify-center py-10">
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

      <div className="p-10">
        <div className="bg-white rounded-lg p-8">
          <div className="text-2xl font-bold">
            Users Registered: {usersCount}
          </div>

          {/* Form Number and Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div>
              <button
                onClick={handlePrev}
                className={`px-4 py-2 rounded-full ${
                  currentIndex === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
                disabled={currentIndex === 0}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 ml-2 rounded-full ${
                  currentIndex === users.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
                disabled={currentIndex === users.length - 1}
              >
                Next
              </button>
            </div>

            {/* Current Page Display */}
            <div className="text-lg font-semibold">
              Form {currentIndex + 1} of {users.length}
            </div>

            {/* Jump to Form */}
            <div className="flex items-center">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter form number"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleJump}
                className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
              >
                Jump
              </button>
            </div>
          </div>

          {/* User Details Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <CardField label="Name" value={currentUser.name} />
            <CardField label="Email" value={currentUser.email} />
            <CardField label="Branch" value={currentUser.branch} />
            <CardField label="Roll No" value={currentUser.rollNo} />
            <CardField label="Phone" value={currentUser.phone || "N/A"} />
          </div>
          <CardField label="Why join ACM" value={currentUser.ans1} />
          <CardField label="Unique Qualities" value={currentUser.ans2} />
          <CardField label="Other Societies" value={currentUser.ans3} />
          <CardField label="Tech Stack" value={currentUser.ans4} />
          <CardField label="Prior Experience" value={currentUser.ans5} />
          <CardField label="Links" value={currentUser.ans6} />
          <CardField label="Non-tech Experience" value={currentUser.ans7} />
          <CardField
            label="Tech Departments"
            value={currentUser.techdepartments.join(", ")}
          />
          <CardField
            label="Non-tech Departments"
            value={currentUser.nontechdepartments.join(", ")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
