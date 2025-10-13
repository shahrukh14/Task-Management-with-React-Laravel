import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
	const isLoggedIn = !!localStorage.getItem("token");
	return isLoggedIn ? children : <Navigate to="/login" replace />;
}
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";

function App() {
	return (
		<Router>
			<div className="app-container">
				<Header />

				<main >
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/contact"
							element={
								<section className="py-5 container text-center">
									<h2>Contact Us</h2>
									<p>Send us a message at contact@Task Management.com</p>
								</section>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/task" element={
							<PrivateRoute>
								<Task />
							</PrivateRoute>
						} />
						{/* Add more protected routes here as needed */}
					</Routes>
				</main>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
