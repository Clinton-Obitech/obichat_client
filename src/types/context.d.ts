export type SuccessRedirectContextType = {
    successRedirectMessage: string | null;
    setSuccessRedirectMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export type ErrorRedirectContextType = {
    errorRedirectMessage: string | null;
    setErrorRedirectMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export type SuccessContextType = {
    successMessage: string | null;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
    showSuccessModal: boolean;
    setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ErrorContextType = {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    showErrorModal: boolean;
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ConfirmContextType = {
    confirmMessage: string | null;
    setConfirmMessage: React.Dispatch<React.SetStateAction<string | null>>;
    confirm: boolean;
    setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UserType = {
    id: string;
    username: string;
}

export type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export type UsersType = {
    receiver_id: string;
    receiver_username: string;
}

export type UsersContextType = {
    users: UserTypes[];
    setUsers: React.Dispatch<React.SetStateAction<UserTypes[]>>
}

export type SelectUserType = {
    id: string;
    username: string;
}

export type SelectUserContextType = {
    selectedUser: SelectUserType | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<SelectUserType | null>>
}

type SearchUserType = {
    id: string;
    username: string;
}

export type SearchUserContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchedUser: SearchUserType | null;
    setSearchedUser: React.Dispatch<React.SetStateAction<SearchUserType | null>>
}

export type LoggedContextType = {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ChildrenNode = {
    children: React.ReactNode
}