import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//page & componets
import Home from "./pages/Home";
import Routines from "./pages/Routines";
import Logs from "./pages/Logs";
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <BrowserRouter>
          <Navbar className="m-10" />
          <div className="px-20 m-auto">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/routines"
                element={user ? <Routines /> : <Navigate to="/login" />}
              />
              <Route
                path="/logs"
                element={user ? <Logs /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      {/*<Footer />*/}
    </div>
  );
}

export default App;
