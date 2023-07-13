import React, { useState } from "react";
import greenicon from "../../assets/greenicon.svg";
import redicon from "../../assets/redicon.svg";
import yellowicon from "../../assets/yellowicon.svg";
import ToggleOutcome from "./ToggleOutcome";

export default function ChooseOutcome({
  inputData,
  setInputData,
  mode,
  setMode,
}) {
  const handleOutcomeLowerChange = (index, value) => {
    const updatedOutcomesLower = [...inputData.outcomesLower];
    updatedOutcomesLower[index] = value;
    setInputData((prevData) => ({
      ...prevData,
      outcomesLower: updatedOutcomesLower,
    }));
  };

  const handleOutcomeUpperChange = (index, value) => {
    const updatedOutcomesUpper = [...inputData.outcomesUpper];
    updatedOutcomesUpper[index] = value;
    setInputData((prevData) => ({
      ...prevData,
      outcomesUpper: updatedOutcomesUpper,
    }));
  };

  const addOutcomeField = () => {
    setInputData((prevData) => ({
      ...prevData,
      outcomesLower: [...prevData.outcomesLower, ""],
      outcomesUpper: [...prevData.outcomesUpper, ""],
    }));
  };

  const removeOutcomeField = (index) => {
    if (inputData.outcomesLower.length <= 2) {
      // Minimum of 2 default outcomes should be present
      return;
    }
    const updatedOutcomesLower = [...inputData.outcomesLower];
    updatedOutcomesLower.splice(index, 1);
    const updatedOutcomesUpper = [...inputData.outcomesUpper];
    updatedOutcomesUpper.splice(index, 1);
    setInputData((prevData) => ({
      ...prevData,
      outcomesLower: updatedOutcomesLower,
      outcomesUpper: updatedOutcomesUpper,
    }));
  };

  const clearOutcomeFields = () => {
    setInputData((prevData) => ({
      ...prevData,
      outcomesLower: ["Yes", "No"],
      outcomesUpper: ["Yes", "No"],
    }));
  };

  const handleModeChange = (newMode) => {
    if (newMode === "single") {
      clearOutcomeFields();
    } else if (newMode === "range") {
      setInputData((prevData) => ({
        ...prevData,
        outcomesLower: ["", ""],
        outcomesUpper: ["", ""],
      }));
    }
    setMode(newMode);
  };

  return (
    <section className="chooseoutcome">
      <ToggleOutcome mode={mode} setMode={handleModeChange} />
      <section className="chooseoutcome_title">
        {mode === "single" ? "Single Outcome" : "Enter the Ranges"}
      </section>
      {inputData.outcomesLower.map((outcome, id) => {
        return (
          <div className="chooseoutcome_outcome" key={id}>
            <div className="chooseoutcome_outcome_left">
              <input
                style={{
                  backgroundImage:
                    id === 0
                      ? `url(${greenicon})`
                      : id === 1
                      ? `url(${redicon})`
                      : `url(${yellowicon})`,
                }}
                value={outcome}
                className="chooseoutcome_outcome_left_input"
                type={mode === "range" ? "number" : "string"}
                onChange={(e) => handleOutcomeLowerChange(id, e.target.value)}
              />

              {mode === "range" && (
                <input
                  style={{
                    backgroundImage:
                      id === 0
                        ? `url(${greenicon})`
                        : id === 1
                        ? `url(${redicon})`
                        : `url(${yellowicon})`,
                  }}
                  className="chooseoutcome_outcome_left_input"
                  type="number"
                  value={inputData.outcomesUpper[id]}
                  onChange={(e) => handleOutcomeUpperChange(id, e.target.value)}
                />
              )}
            </div>
            {id > 1 && (
              <div
                className="chooseoutcome_outcome_right"
                onClick={() => removeOutcomeField(id)}
              >
                <svg
                  width="33"
                  height="40"
                  viewBox="0 0 33 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.3906 20C29.3906 20.4973 29.2277 20.9742 28.9376 21.3258C28.6475 21.6775 28.254 21.875 27.8438 21.875H5.15625C4.74599 21.875 4.35254 21.6775 4.06244 21.3258C3.77235 20.9742 3.60938 20.4973 3.60938 20C3.60938 19.5027 3.77235 19.0258 4.06244 18.6742C4.35254 18.3225 4.74599 18.125 5.15625 18.125H27.8438C28.254 18.125 28.6475 18.3225 28.9376 18.6742C29.2277 19.0258 29.3906 19.5027 29.3906 20Z"
                    fill="#646464"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
      <div onClick={addOutcomeField} className="chooseoutcome_addbutton">
        Add Field +
      </div>
    </section>
  );
}
