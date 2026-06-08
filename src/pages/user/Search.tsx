import { useContext } from "react";
import { SearchUserContext, SelectUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SearchUser() {

    const searchContext = useContext(SearchUserContext)
    if (!searchContext) return null;
    const { search, setSearch, searchedUser } = searchContext;

    const selectedContext = useContext(SelectUserContext)  
    if (!selectedContext) return null;
    const { setSelectedUser } = selectedContext;

    const navigate = useNavigate();

    const HandleSelectedUser = (id: string, username: string) => {
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
        <main>
            <div>
                <input
                type="text"
                value={search}
                placeholder="enter username..."
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            {searchedUser ? (
                <div onClick={() => HandleSelectedUser(searchedUser.id, searchedUser.username)}>
                    {searchedUser?.username}
                </div>
            ) : (
                <div>user not found</div>
            )}
        </main>
    )
}