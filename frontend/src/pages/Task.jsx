import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const cardColors = {
    Pending: "#ffeeba",
    InProgress: "#f5c6cb",
    Completed: "#c3e6cb",
};

const Task = () => {
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", due_date: "", status: "Pending", description: "" });
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const token = localStorage.getItem("token");

    // Fetch tasks function, can be called from anywhere
    const fetchTasks = async (page = currentPage) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/task/get?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data.data || []);
            setLastPage(res.data.meta?.last_page || 1);
        } catch (err) {
            setError("Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line
    }, [currentPage]);

        const openEditModal = (task) => {
            setEditTask(task);
            setEditForm({
                title: task.title,
                due_date: task.due_date,
                status: task.status,
                description: task.description
            });
            setUpdateError("");
            setShowModal(true);
        };

        const closeModal = () => {
            setShowModal(false);
            setEditTask(null);
        };

        const handleEditChange = (e) => {
            setEditForm({ ...editForm, [e.target.name]: e.target.value });
        };

        const handleUpdate = async (e) => {
            e.preventDefault();
            setUpdating(true);
            setUpdateError("");
            try {
                await axios.post(`http://127.0.0.1:8000/api/task/update/${editTask.id}`, editForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Update task in state
                setTasks(tasks.map(t => t.id === editTask.id ? { ...t, ...editForm } : t));
                setShowModal(false);
            } catch (err) {
                setUpdateError("Failed to update task.");
            } finally {
                setUpdating(false);
            }
        };

        const handleDelete = async (taskId) => {
            if (!window.confirm("Are you sure you want to delete this task?")) return;
            try {
                await axios.delete(`http://127.0.0.1:8000/api/task/delete/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // After delete, reload tasks for current page
                fetchTasks();
            } catch (err) {
                console.error(err);
                alert("Failed to delete task.");
            }
        };


    // Add Task Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [addForm, setAddForm] = useState({ title: "", due_date: "", description: "" });
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState("");

    const openAddModal = () => {
        setAddForm({ title: "", due_date: "", description: "" });
        setAddError("");
        setShowAddModal(true);
    };
    const closeAddModal = () => setShowAddModal(false);
    const handleAddChange = (e) => setAddForm({ ...addForm, [e.target.name]: e.target.value });
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setAdding(true);
        setAddError("");
        try {
            await axios.post("http://127.0.0.1:8000/api/task/create", addForm, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowAddModal(false);
            // After add, reload tasks for current page
            fetchTasks(1); // Optionally go to first page, or use currentPage
            setCurrentPage(1); // Optionally reset to first page after add
        } catch (err) {
            setAddError("Failed to add task.");
        } finally {
            setAdding(false);
        }
    };

    return (
        <section className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0" style={{ color: "var(--color-secondary)" }}>Tasks</h2>
                <button className="btn" style={{ backgroundColor: "var(--color-accent)", color: "#fff" }} onClick={openAddModal}>
                    Add
                </button>
            </div>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : tasks.length === 0 ? (
                <div className="text-center">No tasks found.</div>
            ) : (
                <>
                <div className="row g-4">
                    {tasks.map((task) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={task.id}>
                            <div
                                className="card h-100 shadow"
                                style={{
                                    backgroundColor: cardColors[task.status] || "#e2e3e5",
                                    borderColor: "var(--color-primary)"
                                }}
                            >
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title mb-0" style={{ color: "var(--color-accent)" }}>{task.title}</h5>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaEdit
                                                style={{ cursor: "pointer", color: "var(--color-primary)", fontSize: "1.2rem" }}
                                                onClick={() => openEditModal(task)}
                                                title="Edit Task"
                                            />
                                            <FaTrash
                                                style={{ cursor: "pointer", color: "#dc3545", fontSize: "1.2rem", marginLeft: "8px" }}
                                                onClick={() => handleDelete(task.id)}
                                                title="Delete Task"
                                            />
                                        </div>
                                    </div>
                                    <span className="badge mb-2" style={{ backgroundColor: "var(--color-primary)", color: "#fff", alignSelf: "flex-start" }}>{task.status}</span>
                                    <p className="card-text flex-grow-1" style={{ color: "var(--color-text)" }}>{task.description}</p>
                                    <small className="text-muted mt-auto">Due: {task.due_date}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination Controls */}
                <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
                    <button className="btn btn-secondary" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Back</button>
                    <span style={{ color: "var(--color-text)" }}>Page {currentPage} of {lastPage}</span>
                    <button className="btn btn-secondary" onClick={() => setCurrentPage(p => Math.min(lastPage, p + 1))} disabled={currentPage === lastPage}>Next</button>
                </div>
                </>
            )}

            {/* Add Task Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: "#fff", borderColor: "var(--color-primary)" }}>
                            <div className="modal-header" style={{ backgroundColor: "var(--color-primary)" }}>
                                <h5 className="modal-title" style={{ color: "#fff" }}>Add Task</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeAddModal}></button>
                            </div>
                            <form onSubmit={handleAddSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "var(--color-text)" }}>Title</label>
                                        <input type="text" className="form-control" name="title" value={addForm.title} onChange={handleAddChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "var(--color-text)" }}>Due Date</label>
                                        <input type="date" className="form-control" name="due_date" value={addForm.due_date} onChange={handleAddChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "var(--color-text)" }}>Description</label>
                                        <textarea className="form-control" name="description" value={addForm.description} onChange={handleAddChange} rows={3} required />
                                    </div>
                                    {addError && <div className="alert alert-danger">{addError}</div>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
                                    <button type="submit" className="btn" style={{ backgroundColor: "var(--color-accent)", color: "#fff" }} disabled={adding}>
                                        {adding ? "Adding..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Task Modal */}
            {showModal && (
                    <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ backgroundColor: "#fff", borderColor: "var(--color-primary)" }}>
                                <div className="modal-header" style={{ backgroundColor: "var(--color-primary)" }}>
                                    <h5 className="modal-title" style={{ color: "#fff" }}>Edit Task</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label" style={{ color: "var(--color-text)" }}>Title</label>
                                            <input type="text" className="form-control" name="title" value={editForm.title} onChange={handleEditChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" style={{ color: "var(--color-text)" }}>Due Date</label>
                                            <input type="date" className="form-control" name="due_date" value={editForm.due_date} onChange={handleEditChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" style={{ color: "var(--color-text)" }}>Status</label>
                                            <select className="form-select" name="status" value={editForm.status} onChange={handleEditChange} required>
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" style={{ color: "var(--color-text)" }}>Description</label>
                                            <textarea className="form-control" name="description" value={editForm.description} onChange={handleEditChange} rows={3} required />
                                        </div>
                                        {updateError && <div className="alert alert-danger">{updateError}</div>}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                        <button type="submit" className="btn" style={{ backgroundColor: "var(--color-accent)", color: "#fff" }} disabled={updating}>
                                            {updating ? "Updating..." : "Update"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
};

export default Task;