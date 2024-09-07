import React, { useState } from 'react';
import InputField from './Inputfield';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './Spinner';

const ApplyNow = () => {
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    rollNo: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
        setIsLoading(true);
      const res = await axios.post('https://acmfirstyears.acmexamportal.workers.dev/', formData);
        setIsLoading(false);
      if (res.status === 200) {
        navigate('/thankyou');
      } else {
        alert('Error in submitting the form');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the form');
    }
  };

  const inputFields = [
    { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
    { label: 'Branch', type: 'text', name: 'branch', placeholder: 'Enter your branch' },
    { label: 'Roll No. (Application No.)', type: 'text', name: 'rollNo', placeholder: 'Enter your roll number' },
    { label: 'Phone Number', type: 'tel', name: 'phoneNumber', placeholder: 'Enter your phone number' },
  ];

  return (
    <div className='w-full'>
      <div className="flex justify-center py-3 ">
        <img src="/acm.png" alt="ACM Logo" />
    </div>


      <main className="flex overflow-hidden flex-col mx-auto w-full text-black bg-white max-w-[480px]">
        <section className="flex flex-col px-5 mt-0 w-full">
          <div className='mb-20'>
            <div className="flex items-start self-center text-4xl font-bold ">
              <h1 className="grow self-end mt-10 mr-0">Apply Now</h1>
            </div>
            <div className="flex gap-4 self-start mt-4 text-xl font-bold tracking-wide text-sky-500">
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
                />
              ))}
              <SubmitButton />
            </form>
          </div>
        </section>
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
