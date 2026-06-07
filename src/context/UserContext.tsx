import { createContext, useState } from "react";
import type { ChildrenNode, SelectUserContextType, SelectUserType, UserContextType, UsersContextType, UsersType, UserType } from "../types/context";

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({children}: ChildrenNode) {

    const [user, setUser] = useState<UserType | null>(() => {
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) : null;
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UsersContext = createContext<UsersContextType | null>(null)

export function UsersProvider({children}: ChildrenNode) {

    const [users, setUsers] = useState<UsersType[]>(() => {
        const stored = localStorage.getItem("users")
        return stored ? JSON.parse(stored) : [];
    })

    /*useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await api.get("/api/users")

                setUsers(data)
            } catch (err) {
                console.error(err)
            }
        }
        getUsers();
    }, [])*/

    return (
        <UsersContext.Provider value={{users, setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}

export const SelectUserContext = createContext<SelectUserContextType | null>(null)

export function SelectUserProvider({children}: ChildrenNode) {

    const [selectedUser, setSelectedUser] = useState<SelectUserType | null>(() => {
        const stored = localStorage.getItem("selectedUser")
        return stored ? JSON.parse(stored) : null;
    })

    return (
        <SelectUserContext.Provider value={{selectedUser, setSelectedUser}}>
            {children}
        </SelectUserContext.Provider>
    )
}