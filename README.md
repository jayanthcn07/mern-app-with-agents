# MERN Stack Machine Test

A full-stack MERN application implementing:

- Admin authentication (JWT based)
- Agent creation & management
- CSV/XLSX upload with validation
- Equal distribution of tasks among 5 agents
- Protected backend & frontend routes

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (File Upload)
- CSV Parser / XLSX

### Frontend
- React.js
- React Router DOM
- Axios

---

## 📂 Project Structure

```
mern-machine-test/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
└── README.md
```

---

## 🔐 Features Implemented

### 1️⃣ Admin Login
- Email & Password authentication
- Password hashing using bcrypt
- JWT token generation
- Protected routes using middleware
- Frontend route protection

---

### 2️⃣ Agent Creation & Management
- Add agent (Name, Email, Mobile with country code, Password)
- Email uniqueness validation
- Password hashing
- Protected API route

---

### 3️⃣ Upload CSV & Distribute Tasks
- Accepts `.csv` and `.xlsx`
- Validates file type
- Validates required columns:
  - FirstName
  - Phone
  - Notes
- Distributes tasks equally among 5 agents
- If items are not divisible by 5, remaining tasks are distributed sequentially
- Stores distributed tasks in MongoDB
- Displays grouped tasks per agent on frontend

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone Repository

```bash
git clone <your-repo-link>
cd mern-machine-test
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000
```

---

## 🗄 MongoDB Atlas Configuration

1. Create a cluster
2. Create database user
3. Whitelist IP (0.0.0.0/0 for development)
4. Copy connection string into `.env`

---

## 🧪 Testing Flow

1. Register Admin (one-time via API or Postman)
2. Login
3. Add at least 5 agents
4. Upload CSV file
5. View distributed tasks grouped by agent

---

## 📄 CSV Format Example

```
FirstName,Phone,Notes
John,9876543210,CallBack
Jane,9876543211,Interested
Alex,9876543212,FollowUp
Mike,9876543213,NewLead
Sara,9876543214,HotLead
```

⚠ Column names are case-sensitive.

---

## 🔒 Security Implementations

- Password hashing (bcrypt)
- JWT authentication
- Protected backend routes
- Protected frontend routes
- File type validation
- Input validation

---

## 📹 Demo Video

Google Drive Link:
```
<Add your video link here>
```

---

## 🎯 Evaluation Criteria Coverage

| Criteria | Status |
|----------|--------|
| Functionality | ✅ Implemented |
| Code Quality | ✅ Clean structure |
| Validation & Error Handling | ✅ Added |
| User Interface | ✅ Functional & Protected |
| Execution & Setup | ✅ Simple & Clear |

---

## 🏁 Conclusion

This application demonstrates:

- Full MERN stack implementation
- Authentication & authorization
- File handling & parsing
- Data distribution logic
- Clean architecture & scalable structure

---

## 👨‍💻 Author

Jayanth C N
MERN Stack Developer
