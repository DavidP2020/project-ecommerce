import React from "react";

const SocialIcon = ({ Icons }) => {
  return (
    <div>
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 mt-2 cursor-pointer inline-flex items-center bg-white text-black mr-4 text-xl hover:text-gray-100 hover:bg-gray-500
        duration-300 "
        >
          <i className={icon.name}></i>
        </span>
      ))}
    </div>
  );
};

export default SocialIcon;
