import { Link } from "react-router-dom";
import Logo from "../assets/obitechLogo.png";
import "./page.css";

export default function HomePage() {
    return (
        <main className="Home">
        <img
        src={Logo}
        />
        
        <nav>
            <Link to="/register/user">register</Link>
            <Link to="/login/user">login</Link>
        </nav>
        </main>
    )
}