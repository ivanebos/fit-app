import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 p-5 rounded bg-white"
    >
      <h3 className="text-lg font-bold pb-4">Login</h3>
      <label className="pb-1">Email:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded border " //+
          //(emptyFields.includes("title") ? "border-red-500 border" : "")
        }
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="pb-1">Password:</label>
      <input
        className={
          "p-1 mb-4 w-full rounded border " //+
          //(emptyFields.includes("title") ? "border-red-500 border" : "")
        }
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        className="p-2 bg-blue-400 rounded text-white"
        disabled={isLoading}
      >
        Log In
      </button>
      {error && (
        <div className="my-5 p-2 bg-red-100 rounded border-red-500 border text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
