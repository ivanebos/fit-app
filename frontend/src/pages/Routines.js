import { useEffect } from "react";
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

import WorkoutDetails from "../components/WorkoutDetails";
import RoutineDetails from "../components/RoutineDetails";

import WorkoutForm from "../components/WorkoutForm";
import Calendar from "../components/Calendar";
import RoutineForm from "../components/RoutineForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  //const { workouts, dispatch } = useWorkoutsContext();

  const { routines, dispatch } = useRoutinesContext();
  const { user } = useAuthContext();
  {
    /* 
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
  }
  useEffect(() => {
    const fetchRoutines = async () => {
      const response = await fetch("/api/routines", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ROUTINES", payload: json });
      }
    };
    if (user) {
      fetchRoutines();
    }
  }, [dispatch, user]);
  console.log("THIS: ", routines);
  return (
    <div className="flex gap-24">
      <div className="w-5/6 h-min grid grid-cols-3 gap-x-3 gap-y-5">
        {/*workouts &&
          workouts.map((workout) => (
            <div key={workout.id}>
              <WorkoutDetails key={workout.id} workout={workout} />
            </div>
          ))*/}
        {routines &&
          routines.map((routine) => (
            <div key={routine.id} className="">
              <RoutineDetails key={routine.id} routine={routine} />
            </div>
          ))}
      </div>
      <RoutineForm className="w-1/6" />
    </div>
  );
};
export default Home;
