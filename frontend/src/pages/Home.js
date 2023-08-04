import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
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

  return (
    <div className="grid grid-cols-4 gap-24">
      <div className="col-span-3">
        {workouts &&
          workouts.map((workout) => (
            <div key={workout.id}>
              <WorkoutDetails key={workout.id} workout={workout} />
            </div>
          ))}
      </div>
      <WorkoutForm className="col-span-1" />
    </div>
  );
};
export default Home;
