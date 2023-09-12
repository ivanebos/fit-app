//Imports
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//Import Contexts
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import Icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";

//For Routine update Modal
const RoutineUpdateModal = ({ isOpen, onClose, routine }) => {
  const { dispatch } = useRoutinesContext();
  const { user } = useAuthContext();

  //init variables
  const [title, setTitle] = useState(routine.title);

  let dic = {};
  routine.exercises.forEach((item, i) => {
    dic[i] = item;
  });
  console.log(dic);
  const [exercises, setExercises] = useState(dic);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //Add Exercise
  const handleAddExercise = (e) => {
    e.preventDefault();
    const indexes = Object.keys(exercises);
    const lastIndex = indexes[indexes.length - 1];

    const newTextBoxes = { ...exercises, lastIndex: "" };
    setExercises(newTextBoxes);
  };

  //Remove Exercise
  const handleRemoveExercise = (index) => {
    const newTextBoxes = exercises.filter((_, i) => i !== index);
    setExercises(newTextBoxes);
  };

  //Change Exsersise
  const handleExerciseChange = (index, value) => {
    const newTextBoxes = [...exercises];
    newTextBoxes[index] = value;
    setExercises(newTextBoxes);
  };

  //Update Routine
  const handleSubmit = async (e) => {
    e.preventDefault();

    //new updated routine
    const newRoutine = { title, exercises };

    //patch request
    const response = await fetch("api/routines/" + routine._id, {
      method: "PATCH",
      body: JSON.stringify(newRoutine),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    //if error set error and empty field values
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    //if response ok
    if (response.ok) {
      //reinit values
      setError(null);
      setEmptyFields([]);

      //update routine hook
      dispatch({ type: "UPDATE_ROUTINE", payload: json });

      console.log("new routine added", json);

      //close modal
      onClose();
    }
  };

  //if not open return null
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-white w-1/4 p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex justify-between">
          <h3 className="text-lg font-bold mb-1">Update Routine</h3>

          <button className="flex items-start" onClick={onClose}>
            <AiOutlineCloseCircle
              className="scale-125 hover:scale-150"
              color="red"
            />
          </button>
        </div>
        <form className="py-5" onSubmit={handleSubmit}>
          <label className="p-1">Title:</label>

          <input
            className=" p-1 mb-4 w-full rounded placeholder-gray-500 border-gray-500 border"
            placeholder={routine.title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="p-1">Exercises:</label>
          {Object.values(exercises) &&
            Object.values(exercises).map((exercise, index) => (
              <div key={index} className="flex ">
                <input
                  className={
                    "text-sm p-0.5 mb-1 w-full rounded-tl rounded-bl placeholder-gray-500  border " +
                    (emptyFields.includes("exercises")
                      ? "border-red-500 "
                      : "border-gray-500 ")
                  }
                  type="text"
                  onChange={(e) => handleExerciseChange(index, e.target.value)}
                  placeholder={routine.exercises[index]}
                  // value={exercise}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className=" p-1 mb-1 bg-white rounded-tr rounded-br border border-gray-500 "
                >
                  <FiDelete />
                </button>
              </div>
            ))}
          <button
            onClick={handleAddExercise}
            className="float-right mt-1 rounded bg-green-400 p-1"
          >
            <GrAdd className="invert" />
          </button>
          <br />
          <button className="p-2 bg-blue-400 rounded text-white">
            Update Routine
          </button>
          {error && (
            <div className="my-5 p-2 bg-red-100 rounded border-red-500 border text-red-500">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RoutineUpdateModal;
