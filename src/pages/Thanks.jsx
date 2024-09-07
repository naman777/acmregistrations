import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15A6DDBF] p-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm w-full">
        <div className="mb-4 flex justify-center">
          <img src="/3.png" alt="Checkmark" className="max-w-full h-auto" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Thank You.</h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Your registration is successful and we will be reaching out to you shortly for the further recruitment process.
        </p>
        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.instagram.com/acmthapar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl md:text-3xl text-gray-500 hover:text-gray-900" />
          </a>
          <a
            href="https://github.com/ACM-Thapar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl md:text-3xl text-gray-500 hover:text-gray-900" />
          </a>
          <a
            href="https://www.linkedin.com/company/thapar-acm-student-chapter/mycompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl md:text-3xl text-gray-500 hover:text-gray-900" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
