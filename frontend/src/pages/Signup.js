//Imports
import { useState } from "react";

//Auth
import { useSignup } from "../hooks/useSignup";

//Import Assets
import { ReactComponent as LoadingSVG } from "../assets/spinner.svg";

const Signup = () => {
  //Init
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Auth
  const { signup, isLoading, error } = useSignup();

  //Submit signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 p-5 rounded bg-white"
    >
      <h3 className="text-lg font-bold pb-4">Signup</h3>
      <label className="pb-1">Email:</label>
      <input
        className="p-1 mb-4 w-full rounded border "
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="pb-1">Password:</label>
      <input
        className="p-1 mb-4 w-full rounded border "
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!isLoading && (
        <button
          disabled={isLoading}
          className="p-2 bg-blue-400 rounded text-white"
        >
          Sign Up
        </button>
      )}
      {isLoading && <LoadingSVG className="scale-150 mt-2 mb-7 mx-2 " />}

      {error && (
        <div className="mt-5 p-2 bg-red-100 rounded border-red-500 border text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default Signup;
