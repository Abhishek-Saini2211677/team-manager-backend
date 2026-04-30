TEAM TASK MANAGER – FULL STACK APPLICATION

📌 Project Overview
This is a full-stack Task Management system where users can create projects, assign tasks, and track progress. It supports authentication, role-based access, and dashboard analytics.

---

🚀 Features

1. User Authentication

* Signup with name, email, password
* Login with JWT authentication

2. Project Management

* Create projects (creator becomes Admin)
* Add/remove members
* Members can view assigned projects

3. Task Management

* Create tasks (title, description, due date, priority)
* Assign tasks to users
* Update task status (To Do, In Progress, Done)

4. Dashboard

* Total tasks
* Tasks by status
* Tasks per user
* Overdue tasks

5. Role-Based Access

* Admin: Manage users and tasks
* Member: View and update assigned tasks only

---

🛠️ Tech Stack

Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Deployment:

* Frontend → Vercel
* Backend → Railway

---

⚙️ Setup Instructions

1. Clone Repository
   git clone <https://github.com/Abhishek-Saini2211677/team-manager-backend>

2. Backend Setup
   cd backend
   npm install
   Create .env file and add:
   MONGO_URI=your_mongodb_url
   JWT_SECRET=your_secret
   Run server:
   node server.js

3. Frontend Setup
   cd frontend
   npm install
   npm start

---

🌐 Deployment Links

Frontend URL: https://team-manager-frontend-xi.vercel.app/
Backend URL: https://team-manager-backend-production-1391.up.railway.app/

---

📹 Demo Video
(2–5 minute video link here)

---

📂 GitHub Repository
https://github.com/Abhishek-Saini2211677/team-manager-backend

---

👨‍💻 Author
Abhishek Saini
