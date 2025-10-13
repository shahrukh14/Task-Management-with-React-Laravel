import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
    const isLoggedIn = !!localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            // Optionally show error
        }
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "var(--color-primary)" }}>
            <div className="container">
                <Link to="/" className="navbar-brand fw-bold text-white">
                Task Management
                </Link>

                {/* Navbar Toggler for mobile */}
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon" style={{ color: "var(--color-text)" }}></span>
                </button>

                {/* Collapsible nav links */}
                <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav ms-auto align-items-lg-center">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/contact">
                            Contact
                        </Link>
                    </li>
                    {!isLoggedIn && (
                        <>
                        <li className="nav-item ms-lg-2">
                            <Link
                                to="/login"
                                className="btn me-2 my-1 my-lg-0"
                                style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-2">
                            <Link
                                to="/register"
                                className="btn my-1 my-lg-0"
                                style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-background)" }}
                            >
                                Register
                            </Link>
                        </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                        <li className="nav-item ms-lg-2">
                            <Link
                                to="/task"
                                className="btn my-1 my-lg-0"
                                style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-background)" }}
                            >
                                Tasks
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-2">
                            <button
                                className="btn my-1 my-lg-0"
                                style={{ backgroundColor: "#dc3545", color: "#fff" }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                        </>
                    )}
                </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
