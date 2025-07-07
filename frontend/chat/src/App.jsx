import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ChatPage from "./ChatPage";
import RoomList from "./RoomList";
import './App.css';

function App() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RoomList" element={<RoomList />} />
        <Route
          path="/chat/:roomName"
          element={<ChatPage username={user?.first_name || "Anonymous"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
