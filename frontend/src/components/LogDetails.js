import React from "react";

import { useLogsContext } from "../hooks/useLogsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

//date fns
import formateDistanceToNow from "date-fns/formatDistanceToNow";

const LogDetails = ({ log }) => {
  const { dispatch } = useLogsContext();
  const { user } = useAuthContext();

  const updateRoutine = async () => {
    const response = await fetch("/api/logs/" + log._id, {
      method: "UPDATE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_LOG", payload: json });
    }
  };
  const deleteLog = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/logs/" + log._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_LOG", payload: json });
    }
  };

  return (
    <div className="bg-white p-5 shadow-sm rounded h-full flex flex-col justify-between mb-4">
      <div>
        <div className="flex justify-between">
          <p className="text-xl text-blue-500 font-bold mb-4">{log.routine}</p>
          <div>
            <AiOutlineDelete
              onClick={deleteLog}
              className="scale-125 hover:scale-150"
              color="red"
            />
          </div>
        </div>

        <strong>Date: </strong>
        <p className="text-sm">
          {formateDistanceToNow(new Date(log.date), {
            addSuffix: true,
          })}{" "}
        </p>
      </div>
    </div>
  );
};

export default LogDetails;
