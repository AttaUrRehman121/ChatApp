import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatPage = ({ username = "User1" }) => {
    const { roomName } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const ws = useRef(null);
    const messageEndRef = useRef(null);
    const BaseURLS = "https://backend-production-5b2b.up.railway.app/api/";


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${BaseURLS}chat/messages/${roomName}/`);
                const data = await res.json();

                const normalized = data.map(msg => ({
                    user: msg.user,
                    content: msg.content,
                    timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setMessages(normalized);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [roomName]);


    useEffect(() => {
        // ws.current = new WebSocket(`wss://backend-production-5b2b.up.railway.app/ws/chat/${roomName}/`);
        ws.current = new WebSocket("wss://backend-production-5b2b.up.railway.app/ws/chat/patronecs/");

        ws.current.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const newMsg = {
                user: data.username,
                content: data.message,
                timestamp: data.timestamp
            };
            setMessages((prev) => [...prev, newMsg]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => ws.current.close();
    }, [roomName]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                message,
                username,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
            setMessage("");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Chat Room: {roomName}</h5>
                        </div>
                        <div className="card-body" style={{ height: "400px", overflowY: "auto", backgroundColor: "#f8f9fa" }}>
                            {messages.map((msg, index) => {
                                const isMe = msg.user === username;
                                return (
                                    <div key={index} className={`d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                                        <div className={`p-2 rounded shadow-sm ${isMe ? "bg-primary text-white" : "bg-light text-dark"}`} style={{ maxWidth: "70%" }}>
                                            <div className="small fw-bold">{msg.user}</div>
                                            <div>{msg.content}</div>
                                            <div className="small text-muted mt-1 text-end">{msg.timestamp}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messageEndRef} />
                        </div>
                        <form onSubmit={sendMessage} className="card-footer d-flex bg-white">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="btn btn-success">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
