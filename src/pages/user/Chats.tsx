import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import { SelectUserContext, UserContext } from "../../context/UserContext";
import api from "../../api/axios";
import "./user.css";
import { AppMode } from "../../ui/Mode";
import { Loader } from "../../ui/Loader";

interface Messages {
    senderId: string;
    sender_id: string;
    receiverId: string;
    message: string;
}

export default function Chat() {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Messages[]>([])
    const [loading, setLoading] = useState(false)

    const selectedContext = useContext(SelectUserContext)
    if (!selectedContext) return null;
    const { selectedUser } = selectedContext;

    const userContext = useContext(UserContext)
        if (!userContext) return null;
        const { user } = userContext;

    const sendMessage = () => {
        if (!message) return;
        socket.emit("private_message", {recieverId: selectedUser?.id, message})
        setMessage("")
    }

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedUser) return;
            try {
                setLoading(true)
                const { data } = await api.get(`/api/chats/${selectedUser.id}`)
                setMessages(data)
            } catch (err) {
               console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getMessages();
    }, [selectedUser])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, data])
        })

        return () => {
            socket.off("receive_message")
        }
    }, [])

    const goBack = () => {
        window.history.back();
    }

    return (
        <main className="Chat">
        {loading && <Loader />}
        <div className="top">
            <div>
                <div>
                <i onClick={goBack} className="bi bi-chevron-left"></i>
                <h2>{selectedUser?.username}</h2>
                </div>
                <AppMode />
            </div>
        </div>

        <div className="chats">
        {messages.length > 0 ? (
            <>
            {messages.map((msg, index) => (
            <div key={index}>
                {msg.senderId === user?.id || msg.sender_id === user?.id ? (
                    <p className="me">{msg.message}</p>
                ) : (
                    <p className="them">{msg.message}</p>
                )}
            </div>
            ))}
            </>
        ) : (
            <div className="noMsg">
                no messages yet
            </div>
        )}
        </div>

        <div className="sendMessage">
            <div>
            <input
            type="text"
            value={message}
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" onClick={sendMessage}>
                <i className="bi bi-send"></i>
            </button>
            </div>
        </div>
        </main>
    )
}