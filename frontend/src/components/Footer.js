import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-200">
      <div className="text-center py-7 ">
        <img className="mx-auto w-20 dark:invert pb-3" src={logo} alt="" />

        <div className="text-gray-500 dark:text-gray-400 text-sm">
          <p className="whitespace-nowrap">Designed and Coded By Ivan Ebos</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
