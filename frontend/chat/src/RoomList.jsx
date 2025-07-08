import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [roomInput, setRoomInput] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const res = await axios.get("https://backend-seven-amber-92.vercel.app/api/chat/rooms/");
            setRooms(res.data);
        } catch (err) {
            console.error("Failed to fetch rooms", err);
        }
    };

    const handleJoinOrCreate = async () => {
        if (!roomInput.trim()) return;

        const existingRoom = rooms.find(room => room.name === roomInput.trim());
        if (existingRoom) {
            navigate(`/chat/${roomInput.trim()}`);
        } else {
            try {
                const res = await axios.post("https://backend-seven-amber-92.vercel.app/api/chat/rooms/", {
                    name: roomInput.trim(),
                });
                setRooms([...rooms, res.data]);
                navigate(`/chat/${res.data.name}`);
            } catch (err) {
                setError("Failed to create room.");
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-8">
            <div className="row justify-content-center">
                <div className="col-md-18">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Chat Rooms</h4>
                        </div>
                        <div className="card-body">
                            {rooms.length === 0 ? (
                                <p>No rooms found.</p>
                            ) : (
                                <ul className="list-group mb-4">
                                    {rooms.map((room) => (
                                        <li key={room.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {room.name}
                                            <button className="btn btn-sm btn-outline-success" onClick={() => navigate(`/chat/${room.name}`)}>Join</button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mb-3">
                                <label htmlFor="roomInput" className="form-label">Join or Create a Room</label>
                                <input
                                    id="roomInput"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter room name"
                                    value={roomInput}
                                    onChange={(e) => {
                                        setRoomInput(e.target.value);
                                        setError("");
                                    }}
                                />
                                {error && <div className="text-danger mt-1">{error}</div>}
                            </div>
                            <button className="btn btn-primary w-100" onClick={handleJoinOrCreate}>Enter Room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomList;
