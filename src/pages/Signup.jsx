import React, { useEffect, useState } from "react";
import InputField from "./Inputfield";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";
import acm from "../assets/acm.png";
import Smart from "../assets/smart-people.png";
import Turnstile, { useTurnstile } from "react-turnstile";

const ApplyNow = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const turnstile = useTurnstile();

  const departments = [
    " Marketing",
    " Design/Video Editing",
    " Social Media",
    " Content",
    " PR and Outreach",
    " Finance",
    " Other",
  ];

  const tdepartments = [
    "  Web Development",
    "  App Development",
    "  Machine Learning/AI/Data Science",
    "  UI/UX",
    "  Cybersecurity",
    "  Devops",
    "  Blockchain",
    "  Game Development",
  ];

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    rollNo: "",
    phoneNumber: "",
    email: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    techdepartments: [],
    ans5: "",
    ans6: "",
    nontechdepartments: [],
    ans7: "",
    image: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDepartments = checked
      ? [...formData.nontechdepartments, value]
      : formData.nontechdepartments.filter(
          (department) => department !== value
        );

    setFormData({
      ...formData,
      nontechdepartments: updatedDepartments,
    });
  };

  const handletechCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDepartments = checked
      ? [...formData.techdepartments, value]
      : formData.techdepartments.filter((department) => department !== value);

    setFormData({
      ...formData,
      techdepartments: updatedDepartments,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      image: imageUrl,
    });
  };

  const validateForm = () => {
    for (const field of inputFields) {
      if (field.required && !formData[field.name]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formDataToSend = {
        ...formData,
        image_url: imageUrl, // Add imageUrl here
      };
      setIsLoading(true);
      const res = await axios.post(
        "https://acmfirstyears.acmexamportal.workers.dev/",
        formDataToSend
      );
      setIsLoading(false);
      if (res.status === 200) {
        navigate("/thankyou");
      } else {
        alert("Error in submitting the form");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form");
    }
  };

  const inputFields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Branch",
      type: "text",
      name: "branch",
      placeholder: "Enter your branch",
      required: true,
    },
    {
      label: "Roll No. (Application No.)",
      type: "text",
      name: "rollNo",
      placeholder: "Enter your roll number",
      required: true,
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phoneNumber",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      label: "Why do you want to join ACM ?",
      type: "text",
      name: "ans1",
      placeholder: "Long-answer text",
      required: true,
    },
    {
      label:
        "What sets you apart from the other candidates who will be applying for the same spot?",
      type: "text",
      name: "ans2",
      placeholder: "Long-answer text",
      required: true,
    },
    {
      label: "Are you involved in any other socities ?",
      type: "text",
      name: "ans3",
      placeholder: "Long-answer text",
      required: true,
    },
    {
      label:
        "What is your tech stack? (Include all the coding languages plus the software that you have learnt or learning) ",
      type: "text",
      name: "ans4",
      placeholder: "Long-answer text",
      required: true,
    },
  ];

  const inputFields2 = [
    {
      label: "Proof of prior work experience ?",
      type: "text",
      name: "ans5",
      placeholder: "Long-answer text",
    },
    {
      label: "Extra links(Github, LinkedIn, Leetcode, etc.)",
      type: "text",
      name: "ans6",
      placeholder: "Long-answer text",
    },
  ];

  const inputFields3 = [
    {
      label:
        "Do you have any prior experience in the non tech department(s) you selected? If yes, please mention it.",
      type: "text",
      name: "ans7",
      placeholder: "Long-answer text",
    },
  ];

  return (
    <div className="w-full">
      <div
        className="flex justify-center py-3 fixed items-center w-full"
        style={{
          backgroundColor: "#fff",

          color: "#fff",
          zIndex: "1000",
          boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
        }}
      >
        <img src="/acm.png" alt="ACM Logo" />
      </div>

      <main
        className="flex overflow-hidden px-0  flex-row justify-between mx-auto w-full text-black bg-white md:px-20"
        
      >
        <img
          src={acm}
          className="hidden md:block"
          style={{
            height: "100vh",
            position: "fixed",
            left: "0",
          }}
          alt=""
        />
        <section className="flex flex-col px-5 mt-20 w- bg-blue-300full">
          <div className="mb-20">
            <div className="flex items-start self-center text-4xl font-bold ">
              <h1 className="grow self-end mt-10 mr-0">Apply Now</h1>
            </div>
            <div className="flex gap-4 self-start mt-4 text-xl font-bold tracking-wide">
              <div className="shrink-0 self-start mt-4 w-14 border-2 border-black border-solid h-[5px] bg-black" />
              <div className="basis-auto">Register with</div>
            </div>
            <form onSubmit={handleSubmit}>
              {inputFields.map((field, index) => (
                <InputField
                  key={index}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  name={field.name} // Add this line to pass the name prop
                  required={field.required}
                  style={field.style}
                />
              ))}

              <div className="mt-6">
                <h3 className="text-base font-semibold">
                  Which tech department(s) interest you?
                </h3>
                {tdepartments.map((department, index) => (
                  <label
                    key={index}
                    className="block px-3 py-2 mt-2.5 text-sm tracking-normal leading-none rounded-md border border-gray-200 border-solid bg-slate-50 w-full"
                  >
                    <input
                      type="checkbox"
                      value={department}
                      onChange={handletechCheckboxChange}
                      checked={formData.techdepartments.includes(department)}
                    />
                    {department}
                  </label>
                ))}
              </div>

              {inputFields2.map((field, index) => (
                <InputField
                  key={index}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  name={field.name} // Add this line to pass the name prop
                />
              ))}

              <div className="mt-6">
                <h3 className="text-base font-semibold">
                  Which non-tech department(s) interest you?
                </h3>
                {departments.map((department, index) => (
                  <label
                    key={index}
                    className="block px-3 py-2 mt-2.5 text-sm tracking-normal leading-none rounded-md border border-gray-200 border-solid bg-slate-50 w-full"
                  >
                    <input
                      type="checkbox"
                      value={department}
                      onChange={handleCheckboxChange}
                      checked={formData.nontechdepartments.includes(department)}
                    />
                    {department}
                  </label>
                ))}

                {inputFields3.map((field, index) => (
                  <InputField
                    key={index}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    name={field.name} // Add this line to pass the name prop
                  />
                ))}
              </div>
                <div style={{
                  marginTop:"2rem"
                }}>

              <Turnstile
        sitekey="0x4AAAAAAAxS-NJz3hWUYrGN"
        onVerify={() => {
          setIsVerified(true);
        }}
        />
        </div>
      <SubmitButton disabled={!isVerified}/>
              
            </form>
          </div>
        </section>
        <div
          className="flex items-start justify-center mt-20 relative hidden md:block"
          style={{
            width: "40%",
          }}
        >
          <img
            style={{
              marginTop: "5rem",
              width: "500px",
              position: "fixed",
            }}
            src={Smart}
            alt=""
          />
        </div>
      </main>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ApplyNow;
