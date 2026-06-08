import axios from "axios";
import React, { useContext, useState } from "react"
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { UserContext, UsersContext } from "../../../context/UserContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { ButtonLoader } from "../../../ui/Loader";

export default function RegisterUser() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const errorContext = useContext(ErrorModalContext);
    if (!errorContext) return null;
    const { setShowErrorModal, setErrorMessage } = errorContext;

    const successContext = useContext(SuccessRedirectModalContext);
    if (!successContext) return null;
    const { setSuccessRedirectMessage } = successContext;

    const userContext = useContext(UserContext);
    if (!userContext) return null;
    const { setUser } = userContext;

    const usersContext = useContext(UsersContext);
    if (!usersContext) return null;
    const { setUsers } = usersContext;
    
    const loggedContext = useContext(LoggedContext);
    if (!loggedContext) return null;
    const { setLogged } = loggedContext;

    const navigate = useNavigate();

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        try {
            setLoading(true)
            if (!navigator.onLine) {
                setShowErrorModal(true)
                setErrorMessage("no internet connection")
                return;
            }

            const { data } = await api.post("/api/register/user", formData)

            setSuccessRedirectMessage(data.message)

            JSON.stringify(localStorage.setItem("logged", "true"));
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("users", JSON.stringify(data.users));

            setLogged(() => {
                return JSON.parse(localStorage.getItem("logged") || "false")
                }
            )

            setUser(() => {
                const stored = localStorage.getItem("user");
                return stored ? JSON.parse(stored) : null;
                }
            )

            setUsers(() => {
                const stored = localStorage.getItem("users");
                return stored ? JSON.parse(stored) : null;
                }
            )
            
            setFormData({
                username: "",
                email: "",
                password: ""
            })

            setTimeout(() => {
                navigate("/users", {replace: true})
                setSuccessRedirectMessage("")
            }, 3000)

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setShowErrorModal(true)
                setErrorMessage(err.response?.data?.message || "something went wrong")
            } else {
                console.error(err)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="Auth">
        <form onSubmit={HandleFormSubmit}>
            <fieldset>
                <legend>sign up</legend>

            <label><i className="bi bi-person"></i>
                <input
                type="text"
                name="username"
                placeholder="enter your username..."
                value={formData.username}
                onChange={HandleFormChange}
                />
            </label>

            <label><i className="bi bi-envelope"></i>
                <input
                type="email"
                name="email"
                placeholder="enter your email..."
                value={formData.email}
                onChange={HandleFormChange}
            />
            </label>

            <label><i className="bi bi-lock"></i>
                <input
                type="password"
                name="password"
                placeholder="enter your password..."
                value={formData.password}
                onChange={HandleFormChange}
            />
            </label>

            <button type="submit" disabled={loading}>
                {loading ? <ButtonLoader /> : "continue"}
            </button>
            </fieldset>
        </form>
        </main>
    )
}