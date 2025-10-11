### 🧩 Task Management System (React + Laravel)

A full-stack **Task Management Application** built using **React.js (Frontend)** and **Laravel (Backend)**.  
This project allows users to **register**, **log in** (with token-based authentication), and **manage their tasks** efficiently — including creating, updating, deleting, and viewing tasks with pagination.

---

## 🚀 Features

### 👤 User Authentication
- **User Registration:** Self sign-up functionality.
- **Login & Logout:** Secure token-based authentication using Laravel Sanctum.
- **Protected Routes:** Only logged-in users can access task management features.

### 🗂️ Task Management
- **Create Tasks:** Add new tasks with title and description.
- **Update Tasks:** Edit existing task details.
- **Delete Tasks:** Remove tasks from your list.
- **Task Listing:** Paginated list view of all tasks.
- **API Integration:** All CRUD operations are handled through Laravel RESTful APIs.

### ⚛️ Frontend (React)
- Built using **React JS**.
- **React Router** for navigation between pages (Login, Register, Dashboard, etc.).
- **Axios** for making API calls.
- **State Management:** Local state + token handling for authentication.
- **Responsive UI** for all devices.

### 🧰 Backend (Laravel)
- **Laravel 10+** framework used for API development.
- **Authentication:** Implemented using Laravel Sanctum / Passport.
- **API Resource Controllers** for clean code structure.
- **Validation:** Form request validation for all API endpoints.
- **Pagination:** Built-in Laravel pagination for tasks.
- **Database:** MySQL (configurable).

---

### 🏗️ Project Architecture
- Frontend → React JS.
- Backend → Laravel API.
- Database → MySQL.
- Auth → Token Based (Laravel Sanctum)
- **Pagination:** Built-in Laravel pagination for tasks.
- **Database:** MySQL (configurable).
 
---

### ⚙️ Installation Guide

🖥️ Backend Setup (Laravel)

1. Clone the repository
   ```bash
   git clone https://github.com/shahrukh14/Task-Management-with-React-Laravel.git
   ```
2. Install Backend Dependencies
   ```bash
   cd Task-Management-with-React-Laravel/backend
   composer install
   ```
3. Configure Environment and Key Generate
   ```bash
   php artisan key:generate
   ```
4. Set up your database in env and migrate tables
   ```bash
   php artisan migrate
   ```
   
⚛️ Frontend Setup (React)

1. Navigate to frontend folder
   ```bash
   cd ../frontend
   ```
2. Install dependencies
 ```bash
 npm install
 ```
3. Start the React development server
 ```bash
 npm run dev
 ```
