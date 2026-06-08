import { Link, useNavigate } from "react-router-dom";
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
                    <div className="friend" key={user.receiver_id}
                    onClick={() => HandleSelectedUser(user.receiver_id, user.receiver_username)}
                    >
                        <div>{user?.receiver_username.slice(0,1).toUpperCase()}</div>
                        <h3>{user.receiver_username}</h3>
                    </div>
                ))}
                </div>
            </div>
        ) : (
            <div style={{
                textAlign: "center",
                textTransform: "capitalize"
            }}>
                no user available
            </div>
        )}

        <Link to="/search/user"><i className="bi bi-person-add"></i></Link>
        </main>
    )
} 