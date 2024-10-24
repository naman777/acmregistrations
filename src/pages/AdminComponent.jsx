import React, { useState } from "react";
import acm from "../assets/acm.png";
import CardField from "./CardField";
import axios from "axios";
import { backendUrl } from "../const/const";

const AdminPortal = ({ users, usersCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [filterRollNo, setFilterRollNo] = useState(""); // State for roll number filter
  const [reviews, setReviews] = useState(users.map(user => user.adminReview || "")); // Array of reviews for each user
  const [reviewedByNames, setReviewedByNames] = useState(users.map(user => user.reviewedBy || "")); // Array of reviewer names for each user

  const name = localStorage.getItem("name");
  const [isReviewVisible, setReviewVisible] = useState(false);

  // Filter users by roll number
  const filteredUsers = filterRollNo
    ? users.filter(user => user.rollNo.includes(filterRollNo))
    : users;

  // Function to handle next and previous button clicks
  const handleNext = () => {
    if (currentIndex < filteredUsers.length - 1) {
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
    if (index >= 0 && index < filteredUsers.length) {
      setCurrentIndex(index);
    } else {
      alert("Invalid form number");
    }
  };

  // Handle review change
  const handleReviewChange = (e) => {
    const updatedReviews = [...reviews];
    updatedReviews[currentIndex] = e.target.value;
    setReviews(updatedReviews);
  };

  // Function to handle review submission (this should be connected to your backend)
  const handleReviewSubmit = async () => {
    const reviewData = {
      userId: filteredUsers[currentIndex].id, // Assuming each user has a unique ID
      review: reviews[currentIndex],
      reviewedBy: name,
    };

    try {
      const res = await axios.post(backendUrl + "/review/data", {
        token: localStorage.getItem("token"),
        adminReview: reviews[currentIndex],
        reviewedBy: name,
      });

      if (res.data.success) {
        alert("Review submitted!");
        const updatedReviewedByNames = [...reviewedByNames];
        updatedReviewedByNames[currentIndex] = name;
        setReviewedByNames(updatedReviewedByNames); // Update reviewed by array
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const currentUser = filteredUsers[currentIndex];

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
        <div className="ml-8">
          <span className="text-3xl font-extrabold text-black">Hello</span>
          <span className="text-4xl font-bold text-[#15A6DD]">
            {" "}
            {name}
            {"!"}
          </span>
        </div>

        {isReviewVisible && (
          <div className="">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4">Admin Review</h2>
              <textarea
                value={reviews[currentIndex]}
                onChange={handleReviewChange}
                placeholder="Add your review about this form..."
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
              />
              <CardField label="Reviewed By" value={reviewedByNames[currentIndex] || name} />
              <button
                onClick={handleReviewSubmit}
                className="mt-4 px-4 py-2 bg-[#15A6DD] hover:bg-blue-700 text-white rounded-md"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-8 mt-6">
          <div className="text-2xl font-bold">
            USERS REGISTERED:{" "}
            <span className="text-[#15A6DD]">{filteredUsers.length}</span>
          </div>

          {/* Roll No Filter */}
          <div className="mt-4">
            <input
              type="text"
              value={filterRollNo}
              onChange={(e) => setFilterRollNo(e.target.value)}
              placeholder="Filter by Roll No"
              className="px-1 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Form Number and Navigation */}
          <div className="flex items-center justify-start mt-4">
            <div>
              <button
                onClick={handlePrev}
                className={`px-4 py-2 rounded-full ${
                  currentIndex === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#15A6DD] hover:bg-blue-700 text-white"
                }`}
                disabled={currentIndex === 0}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 ml-2 rounded-full ${
                  currentIndex === filteredUsers.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#15A6DD] hover:bg-blue-700 text-white"
                }`}
                disabled={currentIndex === filteredUsers.length - 1}
              >
                Next
              </button>

              {/* `<button
                onClick={() => setReviewVisible(!isReviewVisible)}
                className="px-4 py-2 ml-2 rounded-full bg-[#15A6DD] hover:bg-blue-700 text-white"
              >
                {isReviewVisible ? "Hide Review" : "Add Review"}
              </button>` */}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-lg font-bold">
              Form {currentIndex + 1} of {filteredUsers.length}
            </div>

            {/* Jump to Form */}
            <div className="flex items-center">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Form Number"
                className="px-1 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleJump}
                className="ml-2 px-4 py-2 bg-[#15A6DD] hover:bg-blue-700 text-white rounded-md"
              >
                Jump
              </button>
            </div>
          </div>

          {/* User Details Display */}
          {currentUser ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              <CardField label="Name" value={currentUser.name} />
              <CardField label="Email" value={currentUser.email} />
              <CardField label="Branch" value={currentUser.branch} />
              <CardField label="Roll No" value={currentUser.rollNo} />
              <CardField label="Phone" value={currentUser.phone || "N/A"} />
            </div>
          ) : (
            <p>No user found with the given roll number.</p>
          )}
          {currentUser && (
            <>
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
              <CardField label="Comments" value={currentUser.ans8} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
