import { useEffect, useState } from "react";
import { useLogsContext } from "../hooks/useLogsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { ReactComponent as LoadingSVG } from "../assets/spinner.svg";

const LogRoutineForm = () => {
  const { dispatch } = useLogsContext();

  const [routine, setRoutine] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [routines, setRoutines] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const getRoutines = async () => {
      setLoading(true);

      const response = await fetch(
        process.env.REACT_APP_API + "/api/routines",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setRoutines(json);
        setLoading(false);
      }

      if (!response.ok) {
        setLoading(false);
      }
    };
    getRoutines();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be loged in");
      return;
    }
    const log = { routine, date };
    setLoading(true);

    const response = await fetch(process.env.REACT_APP_API + "/api/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setLoading(false);
    }
    if (response.ok) {
      setRoutine(0);
      setDate(new Date());
      setError(null);
      setEmptyFields([]);
      setLoading(false);

      dispatch({ type: "CREATE_LOG", payload: json });
    }
  };

  return (
    <form className="py-5" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-6">Log Routine</h3>
      <label className="p-1">Routine:</label>
      <select
        value={routine}
        onChange={(e) => setRoutine(e.target.value)}
        className={
          "p-1 mb-4 w-full rounded " +
          (emptyFields.includes("routine") ? "border-red-500 border" : "")
        }
      >
        <option key={0} value="">
          ...Select
        </option>
        {routines &&
          routines.map((routine, i) => (
            <option key={i} value={routine.title}>
              {routine.title}
            </option>
          ))}
      </select>

      <label className="p-1">Date:</label>
      <br />
      <DatePicker
        wrapperClassName="w-full"
        className={
          "p-1 mb-4 w-full rounded  " +
          (emptyFields.includes("date") ? "border-red-500 border" : "")
        }
        selected={date}
        onChange={(date) => setDate(date)}
      />
      {!loading && (
        <button className="p-2 bg-blue-400 rounded text-white">
          Log Routine
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

export default LogRoutineForm;
