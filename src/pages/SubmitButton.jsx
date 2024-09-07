import React from 'react';

const SubmitButton = ({onclick}) => {
  return (
    <button
      type="submit"
      className="flex gap-2 self-center px-9 py-4 mt-8 max-w-full text-xl font-semibold text-white whitespace-nowrap bg-sky-500 rounded-2xl shadow-[0px_8px_23px_rgba(173,220,255,1)] w-[180px]" onclick={onclick}
    >
      <span className="grow">Submit</span>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b3f218f4269107c990a1fffcd133ff33dbba696fed536ec177ac34a3f8adbee?placeholderIfAbsent=true&apiKey=3bcad2a00ff743a3a851fc72d0289ec0" alt="" className="object-contain shrink-0 my-auto aspect-square w-[18px]" />
    </button>
  );
};

export default SubmitButton;