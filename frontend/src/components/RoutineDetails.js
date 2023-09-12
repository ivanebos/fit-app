//Imports
import React from "react";
import { useState } from "react";

//Import components
import RoutineUpdateModal from "./RoutineUpdateModal";

//Import Contexts
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import Libs
import formateDistanceToNow from "date-fns/formatDistanceToNow";

//Import Icons
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

//To diplay single user routine details
const RoutineDetails = ({ routine }) => {
  //set contexts
  const { dispatch } = useRoutinesContext();
  const { user } = useAuthContext();
  const [currentRoutine, setRoutine] = useState(routine);

  //init variables
  const [isModalOpen, setIsModalOpen] = useState(false);

  //func to open update modal
  const openModal = () => {
    console.log("EXTRA: ", routine);
    setRoutine(routine);

    setIsModalOpen(true);
  };

  //func to close update modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //HELP
  const updateRoutine = async () => {
    const response = await fetch("/api/routines/" + routine._id, {
      method: "UPDATE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_ROUTINE", payload: json });
    }
  };

  //Delete routine
  const deleteRoutine = async () => {
    //if no user dont allow further
    if (!user) {
      return;
    }

    //send delete request
    const response = await fetch("/api/routines/" + routine._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ROUTINE", payload: json });
    }
  };

  return (
    <div className="bg-white p-5 shadow-sm rounded h-full flex flex-col justify-between">
      <RoutineUpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        routine={currentRoutine}
      ></RoutineUpdateModal>
      <div>
        <div className="flex justify-between">
          <p className="text-xl text-blue-500 font-bold mb-4">
            {routine.title}
          </p>
          <div>
            <AiOutlineEdit
              onClick={openModal}
              className="scale-125 hover:scale-150"
              color=""
            />
          </div>
        </div>

        <strong>Exsersises: </strong>
        <ul className="mb-5 list-disc pl-6">
          {routine.exercises &&
            routine.exercises.map((exercise, i) => <li key={i}>{exercise}</li>)}
        </ul>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">
          {" "}
          {formateDistanceToNow(new Date(routine.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <AiOutlineDelete
          onClick={deleteRoutine}
          className="scale-125 hover:scale-150"
          color="red"
        />
      </div>
    </div>
  );
};

export default RoutineDetails;
