// src/components/common/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";

const BackButton = ({ to = "/" }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="
        fixed top-4 left-4 z-50 
        flex items-center text-gray-400 hover:text-white 
        bg-gray-800 bg-opacity-50 hover:bg-opacity-75 
        p-2 rounded
        transition
      "
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      <span>홈으로</span>
    </button>
  );
};

export default BackButton;
