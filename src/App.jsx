import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmbeddedMap from "./pages/Map";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<EmbeddedMap />} />
      </Routes>
    </div>
  );
};

export default App;
