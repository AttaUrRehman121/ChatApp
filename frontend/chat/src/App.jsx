import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ChatPage from "./ChatPage";
import RoomList from "./RoomList";
import Layout from "./Layout"; // No subfolder, directly from src
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RoomList" element={<RoomList />} />
          <Route
            path="/chat/:roomName"
            element={<ChatPage username={user?.first_name || "Anonymous"} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
