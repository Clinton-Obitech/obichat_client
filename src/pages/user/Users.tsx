import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../ui/Logout";
import { useContext } from "react";
import "./user.css";
import { SelectUserContext, UserContext, UsersContext } from "../../context/UserContext";

export default function Users() {

    const userContext = useContext(UserContext)
    if (!userContext) return null;
    const { user } = userContext;

    const usersContext = useContext(UsersContext)
    if (!usersContext) return null;
    const { users } = usersContext;

    const selectedContext = useContext(SelectUserContext)
    if (!selectedContext) return null;
    const { setSelectedUser } = selectedContext;

    const me = user?.id;
    const otherUsers = users.filter(user => user.id !== me);

    const navigate = useNavigate();

    const HandleSelectedUser = async (id: string, username: string) => {
        const selectedUser = {
            id: id,
            username: username,
        }

        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));

        const stored = localStorage.getItem("selectedUser");

        setSelectedUser(() => {
            return stored ? JSON.parse(stored) : null
            })

        navigate("/chats")
    }

    return (
        <main className="User">
        <div className="top">
            <div>{user?.username.slice(0,1).toUpperCase()}</div>
            <h1>{user?.username}</h1>
            <LogoutUser />
        </div>

        {otherUsers.length > 0 ? (
            <div className="friends">
                <h2>my friends</h2>
                <div className="users">
                {otherUsers.map(user => (
                    <div className="friend" key={user.id}
                    onClick={() => HandleSelectedUser(user.id, user.username)}
                    >
                        <div>{user.username.slice(0,1).toUpperCase()}</div>
                        <h2>{user.username}</h2>
                    </div>
                ))}
                </div>
            </div>
        ) : (
            <div>
                no user available
            </div>
        )}
        </main>
    )
} 