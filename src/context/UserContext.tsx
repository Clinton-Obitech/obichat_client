import { createContext, useEffect, useState } from "react";
import type { ChildrenNode, SearchUserContextType, SearchUserType, SelectUserContextType, SelectUserType, UserContextType, UsersContextType, UsersType, UserType } from "../types/context";
import api from "../api/axios";

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

export const SearchUserContext = createContext<SearchUserContextType | null>(null)

export function SearchUserProvider({children}: ChildrenNode) {

    const [search, setSearch] = useState<string>("")
    const [searchedUser, setSearchedUser] = useState<SearchUserType | null>(null)

    useEffect(() => {
        if (!search) return;
        const getSearchUser = async () => {
            try {
                const { data } = await api.get(`/api/search/user/${search}`)

                setSearchedUser(data)
                
            } catch (err) {
                console.error(err)
            }
        }
        getSearchUser();
    }, [])

    return (
        <SearchUserContext.Provider value={{search, searchedUser, setSearch, setSearchedUser, }}>
            {children}
        </SearchUserContext.Provider>
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