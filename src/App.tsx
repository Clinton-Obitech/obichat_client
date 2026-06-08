import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Chat from "./pages/user/Chats";
import Users from "./pages/user/Users";
import LoginUser from "./pages/auth/user/Login";
import RegisterUser from "./pages/auth/user/Register";
import { AuthLayout, ChatLayout, PublicLayout, UserLayout } from "./layout/Layout";
import { ConfirmModal, ErrorModal, ErrorRedirectModal, SuccessModal, SuccessRedirectModal } from "./ui/Modal";
import SearchUser from "./pages/user/Search";

export default function App() {
  return (
    <>
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />}/>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login/user" element={<LoginUser />}/>
        <Route path="/register/user" element={<RegisterUser />}/>
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/users" element={<Users />} />
        <Route path="/search/user" element={<SearchUser />} />
      </Route>

      <Route element={<ChatLayout />}>
        <Route path="/chats" element={<Chat />}/>
      </Route>

    </Routes>

    <SuccessModal />
    <ErrorModal />
    <SuccessRedirectModal />
    <ErrorRedirectModal />
    <ConfirmModal />
    </>
  )
}