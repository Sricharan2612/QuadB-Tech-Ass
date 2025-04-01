import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div >
  );
}

export default App;
