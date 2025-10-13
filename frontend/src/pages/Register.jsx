
import React, { useState } from "react";
import axios from "axios";


function Register() {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile is required.";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile must be a 10 digit number.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "Confirm Password is required.";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setSubmitting(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", formData);
            alert("Registration successful!");
            window.location.replace("http://127.0.0.1:8000/login");
        } catch (error) {
            const apiResp = error.response?.data;
            if (apiResp && apiResp.errors) {
                // Map API errors to errors state (show first error for each field)
                const apiFieldErrors = {};
                Object.keys(apiResp.errors).forEach((field) => {
                    apiFieldErrors[field] = apiResp.errors[field][0];
                });
                setErrors(apiFieldErrors);
            }
            setApiError(apiResp?.message || "Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="d-flex justify-content-center align-items-center my-5"
        >
            <div
                className="card shadow p-4"
                style={{ maxWidth: "450px", borderColor: "var(--color-primary)", width: "90%" }}
            >
                <h2 className="text-center mb-4" style={{ color: "var(--color-secondary)" }}>
                    Register
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ color: "var(--color-text)" }}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control${errors.name ? " is-invalid" : ""}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label" style={{ color: "var(--color-text)" }}>
                            Mobile
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            className={`form-control${errors.mobile ? " is-invalid" : ""}`}
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: "var(--color-text)" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control${errors.email ? " is-invalid" : ""}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "var(--color-text)" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control${errors.password ? " is-invalid" : ""}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password_confirmation" className="form-label" style={{ color: "var(--color-text)" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            className={`form-control${errors.password_confirmation ? " is-invalid" : ""}`}
                            value={formData.password_confirmation}
                            onChange={handleChange}
                        />
                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                    </div>

                    {apiError && <div className="alert alert-danger">{apiError}</div>}

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: "var(--color-accent)", color: "white" }}
                        disabled={submitting}
                    >
                        {submitting ? "Registering..." : "Register"}
                    </button>

                    <div className="mt-3 text-center">
                        <small style={{ color: "var(--color-text)" }}>
                            Already have an account? <a href="/login" style={{ color: "var(--color-accent)" }}>Login</a>
                        </small>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
