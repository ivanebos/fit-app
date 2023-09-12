import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be loged in");
      return;
    }
    const workout = { title, load, reps };

    const response = await fetch("api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);

      console.log("new workout added", json);

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="py-5" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-6">Add a New Workout</h3>
      <label className="p-1">Title:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded  " +
          (emptyFields.includes("title") ? "border-red-500 border" : "")
        }
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className="p-1">Load:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded  " +
          (emptyFields.includes("load") ? "border-red-500 border" : "")
        }
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label className="p-1">Reps:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded  " +
          (emptyFields.includes("reps") ? "border-red-500 border" : "")
        }
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button className="p-2 bg-blue-400 rounded text-white">
        Add Workout
      </button>
      {error && (
        <div className="my-5 p-2 bg-red-100 rounded border-red-500 border text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
