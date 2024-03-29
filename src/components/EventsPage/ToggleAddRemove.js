import React, { useState } from "react";
import "./EventsPage.scss";
const ToggleAddRemove = ({ id, modeAR, setModeAR }) => {

  const handleToggle = () => {
    setModeAR(modeAR === "remove" ? "add" : "remove");
  };

  return (
    <div className="flex items-center justify-start w-full mt-5">
      <label htmlFor={`${id}`} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={modeAR === "remove"}
            id={`${id}`}
            name={id}
            className="sr-only"
            onChange={handleToggle}
          />
          <div className="tar_c bg-gray-800 w-60 h-16">
            <p
              className={`tar_text ${
                modeAR === "add" ? "text-white" : "text-gray"
              }`}
            >
              Add
            </p>
            <p
              className={`tar_text ${
                modeAR === "remove" ? "text-white" : "text-gray"
              }`}
            >
              Remove
            </p>
          </div>
          <div
            className={`${
              modeAR === "remove" ? "translate-x-full bg-green-500" : "bg-green-500"
            } tar_h`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleAddRemove;
