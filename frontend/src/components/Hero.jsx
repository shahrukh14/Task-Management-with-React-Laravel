import About from "./About";
import { Link } from "react-router-dom";

function Hero() {
    const isLoggedIn = !!localStorage.getItem("token");
    return (
        <section
            className="text-center d-flex flex-column justify-content-center align-items-center"
            style={{
                color: "var(--color-secondary)",
                height: "70vh",
            }}
        >
            <h3 className="display-6 fw-bold">Welcome To My Task Management System</h3>
            <p className="lead mb-4">Built with Laravel + React + Bootstrap + Custom Theme 🎨</p>
            <Link
                to={isLoggedIn ? "/task" : "/login"}
                className="btn btn-lg"
                style={{ backgroundColor: "var(--color-accent)", color: "white" }}
            >
                Get Started
            </Link>
        </section>
    );
}

export default Hero;
