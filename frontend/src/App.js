import { BrowserRouter, Routes, Route } from "react-router-dom";

//page & componets
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Navbar className="m-10" />
        <div className="px-20 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
