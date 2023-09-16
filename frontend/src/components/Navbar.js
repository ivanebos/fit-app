//Imports
import React from "react";

//Import Contexts
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

//Require links
const { Link } = require("react-router-dom");

//nav bar component
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  //Logout button
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="mb-2 flex justify-between bg-white text-center px-20">
        <Link to="/" className="">
          <h1 className="my-auto text-3xl font-extrabold py-8">Log Fit</h1>
        </Link>
        {user && (
          <div className="flex gap-5">
            <Link to="/Routines" className="my-auto">
              <p className="text-lg hover:underline">Routines</p>
            </Link>
            <Link to="/Stats" className="my-auto">
              <p className="text-lg hover:underline">Stats</p>
            </Link>
            {/*<span className="my-auto">{user.email}</span>*/}
            <button
              className=" border-2 border-blue-500 rounded bg-white px-1 py-2 text-sm text-blue-500 font-bold h-min my-auto"
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div className="flex gap-5">
            <Link to="/login" className="my-auto text-lg hover:underline">
              Login
            </Link>
            <Link to="/signup" className="my-auto text-lg hover:underline">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
