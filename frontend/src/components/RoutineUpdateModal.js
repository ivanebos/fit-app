//Imports
import React from "react";
import { useState } from "react";

//Import Contexts
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import Icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";

//For Routine update Modal
const RoutineUpdateModal = ({ isOpen, onClose, modalRoutine, setRoutine }) => {
  const { dispatch } = useRoutinesContext();

  const { user } = useAuthContext();

  //init variables
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //Set title
  const setTitle = (e) => {
    console.log();
    const updatedRoutine = {
      title: e.target.value,
      exercises: modalRoutine.exercises,
      _id: modalRoutine._id,
    };

    setRoutine(updatedRoutine);
  };

  //Add Exercise
  const handleAddExercise = (e) => {
    e.preventDefault();

    //dispatchUpdate({ type: "SET_UPDATE", payload: temp });
    const updatedRoutine = {
      title: modalRoutine.title,
      exercises: [...modalRoutine.exercises, ""],
      _id: modalRoutine._id,
    };

    setRoutine(updatedRoutine);
  };

  //Remove Exercise
  const handleRemoveExercise = (index) => {
    const updatedRoutine = {
      title: modalRoutine.title,
      exercises: modalRoutine.exercises.filter((_, i) => i !== index),
      _id: modalRoutine._id,
    };

    setRoutine(updatedRoutine);
  };

  //Change Exsersise
  const handleExerciseChange = (index, value) => {
    modalRoutine.exercises[index] = value;

    const updatedRoutine = {
      title: modalRoutine.title,
      exercises: modalRoutine.exercises,
      _id: modalRoutine._id,
    };

    setRoutine(updatedRoutine);
  };

  //Update Routine
  const handleSubmit = async (e) => {
    e.preventDefault();

    //new updated routine
    const newRoutine = {
      title: modalRoutine.title,
      exercises: modalRoutine.exercises,
    };

    //patch request
    const response = await fetch(
      process.env.REACT_APP_API + "/api/routines/" + modalRoutine._id,
      {
        method: "PATCH",
        body: JSON.stringify(newRoutine),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

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
            placeholder={modalRoutine.title}
            onChange={(e) => setTitle(e)}
          />

          <label className="p-1">Exercises:</label>
          {modalRoutine.exercises &&
            modalRoutine.exercises.map((y, index) => (
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
                  value={y}
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
