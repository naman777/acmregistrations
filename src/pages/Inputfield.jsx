import React from 'react';

const InputField = ({ label, type, placeholder, value, onChange, name, required }) => {
  const id = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="flex flex-col mt-6">
      <label htmlFor={id} className="self-start text-base font-semibold">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}  // Make sure this is added
        className="px-3 py-2 mt-2.5 text-sm tracking-normal leading-none rounded-md border border-gray-200 border-solid bg-slate-50 w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
