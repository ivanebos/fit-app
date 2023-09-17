//Imports
import React from "react";
import { useState } from "react";

//Import Contexts
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import Icons
import { BsFillTrashFill } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { ReactComponent as LoadingSVG } from "../assets/spinner.svg";

//Libs
//import { HexColorPicker } from "react-colorful";

//A Form to add routines
const RoutineForm = () => {
  //init contexts
  const { dispatch } = useRoutinesContext();
  const { user } = useAuthContext();

  //Init variables
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([""]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);
  //For later
  //const [color, setColor] = useState("#aabbcc");

  //Add exersise textbox
  const handleAddExercise = (e) => {
    e.preventDefault();
    const newTextBoxes = [...exercises, ""];
    setExercises(newTextBoxes);
  };

  //Remove exercise textbox
  const handleRemoveExercise = (index) => {
    const newTextBoxes = exercises.filter((_, i) => i !== index);
    setExercises(newTextBoxes);
  };

  //Change of exercise textbox
  const handleExerciseChange = (index, value) => {
    const newTextBoxes = [...exercises];
    newTextBoxes[index] = value;
    setExercises(newTextBoxes);
  };

  //Add Routine button
  const handleSubmit = async (e) => {
    e.preventDefault();

    //If no user send log in error
    if (!user) {
      setError("You must be loged in");
      return;
    }

    //set routine ** Add Color Later
    const routine = { title, exercises };
    setLoading(true);
    //send post request
    const response = await fetch(process.env.REACT_APP_API + "/api/routines", {
      method: "POST",
      body: JSON.stringify(routine),
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
      setLoading(false);
    }

    //If respose ok
    if (response.ok) {
      setLoading(false);
      //re init values
      setTitle("");
      setExercises([""]);
      setError(null);
      setEmptyFields([]);

      //dispatch create routine hoook
      dispatch({ type: "CREATE_ROUTINE", payload: json });
    }
  };

  return (
    <form className="py-5" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-6">Create Routine</h3>
      <label className="p-1">Title:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded " +
          (emptyFields.includes("title") ? "border-red-500 border" : "")
        }
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      {/*
      <label className="p-1">Colour:</label>
    
      <div className={"p-1 mb-4 w-full  "}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      */}
      <label className="p-1">Exercises:</label>
      {exercises &&
        exercises.map((exercise, index) => (
          <div key={index} className="flex divide-x">
            <input
              className={
                "p-1 mb-1 w-full rounded-tl rounded-bl  " +
                (emptyFields.includes("exercises")
                  ? "border-red-500 border"
                  : "")
              }
              type="text"
              value={exercise}
              onChange={(e) => handleExerciseChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleRemoveExercise(index)}
              className="p-1 mb-1 bg-white rounded-tr rounded-br"
            >
              <BsFillTrashFill />
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
      {!loading && (
        <button className="p-2 bg-blue-400 rounded text-white">
          <p>Add Routine </p>
        </button>
      )}
      {loading && <LoadingSVG className="scale-150 mt-2 mb-7 mx-2 " />}

      {error && (
        <div className="my-5 p-2 bg-red-100 rounded border-red-500 border text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default RoutineForm;
