import { useEffect } from "react";

import LogDetails from "../components/LogDetails";
import WorkoutForm from "../components/WorkoutForm";
import Calendar from "../components/Calendar";
import LogRoutineForm from "../components/LogRoutineForm";
import { useLogsContext } from "../hooks/useLogsContext";
import { useMonthLogContext } from "../hooks/useMonthLogContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Logs = () => {
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
    if (user) {
      fetchLogs();
    }
  }, [dispatch, user]);

  return (
    <div className="grid grid-cols-4 gap-24">
      <div className="col-span-3">
        {/*<Calendar />*/}
        {logs &&
          logs.map((log, i) => (
            <div key={i}>
              <LogDetails key={log.id} log={log} />
            </div>
          ))}
      </div>

      <LogRoutineForm className="col-span-1" />
    </div>
  );
};
export default Logs;
