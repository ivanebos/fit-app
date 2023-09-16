//Imports
import React from "react";
import { useEffect } from "react";

//Import Components
import LogDetails from "../components/LogDetails";
import LogRoutineForm from "../components/LogRoutineForm";
import Calendar from "../components/Calendar";

//Import contexts
import { useLogsContext } from "../hooks/useLogsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMonthLogContext } from "../hooks/useMonthLogContext";

const Home = () => {
  /*
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);
   */
  const { logs, dispatch } = useLogsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch(process.env.REACT_APP_API + "/api/logs", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LOGS", payload: json });
      }
    };

    fetchLogs();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-4 gap-24">
      <div className="col-span-3">
        {/*<Calendar />*/}
        {logs &&
          logs.map((log) => (
            <div key={log.id}>
              <LogDetails key={log.id} log={log} />
            </div>
          ))}
      </div>

      <LogRoutineForm className="col-span-1" />
    </div>
  );
};
export default Home;
