import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoggedContext } from "../context/LoggedContext";
import { Header } from "../components/Header";
import "./layout.css";
import "../pages/auth/auth.css";

export function PublicLayout() {

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export function AuthLayout() {

    return (
        <div className="AuthLayout">
            <Header />
            <Outlet />
        </div>
    )
}

export function ChatLayout() {

    const loggedContext = useContext(LoggedContext)
    if (!loggedContext) return null;
    const { logged } = loggedContext;

    if (!logged) return <Navigate to="/login/user" replace />

    return (
        <div className="ChatLayout">
            <Outlet />
        </div>
    )
}

export function UserLayout() {

    const loggedContext = useContext(LoggedContext)
    if (!loggedContext) return null;
    const { logged } = loggedContext;

    if (!logged) return <Navigate to="/login/user" replace />

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}