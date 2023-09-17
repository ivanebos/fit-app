//Imports
import { useEffect } from "react";

//Import Contexts
import { useRoutinesContext } from "../hooks/useRoutinesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Import Components
import RoutineDetails from "../components/RoutineDetails";
import Calendar from "../components/Calendar";
import RoutineForm from "../components/RoutineForm";

const Home = () => {
  //Contexts
  const { routines, dispatch } = useRoutinesContext();
  const { user } = useAuthContext();

  //Get routines
  useEffect(() => {
    const fetchRoutines = async () => {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/routines",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ROUTINES", payload: json });
      }
    };
    if (user) {
      fetchRoutines();
    }
  }, [dispatch, user]);

  return (
    <div className="flex gap-24">
      <div className="w-5/6 h-min grid grid-cols-3 gap-x-3 gap-y-5">
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
