# 🔐 Full Stack User Management System

A secure and user-friendly full stack application for user registration, login, profile management, and more. Built using modern web technologies with a focus on authentication, data handling, and file management.

---

## 🚀 Features

- 🔒 **Secure User Registration**  
  Passwords are encrypted using **bcrypt** to ensure user data protection.

- 🔑 **JWT Authentication**  
  Implements **JSON Web Tokens** for secure login and user identity verification.

- 🔐 **Protected Routes**  
  Certain backend and frontend routes are accessible **only to authenticated users**, ensuring privacy and access control.

- 👥 **Login & Session Management**  
  Persistent user sessions with proper authentication flow.

- 👤 **User Profile Management**  
  - View all user profiles and share user details via Whatsapp
  - Update individual user details  
  - Delete user accounts easily  

- 🔍 **User Search Functionality**  
  Quickly find users by **name**, **email**, or **ID**.

- 📩 **Contact Form Integration**  
  Uses **Web3Forms** to send secure contact messages without a backend.

- 📄 **Download User Data as PDF**  
  Export and download user tables using `jspdf` and `jspdf-autotable`.  
  File handling managed via **multer**.

- 🖼️ **Image Upload & Gallery**  
  Users can upload and view images through an integrated gallery.

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Axios  
- React Router  
- React Hot Toast

**Backend**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- bcrypt  
- jsonwebtoken (JWT)  
- multer  
- jspdf & jspdf-autotable  
- web3forms  

---

## 📁 Folder Structure

```
user-management-system/
│
├── backend/ # Express backend
│ ├── controllers/ # Request handlers
│ ├── middlewares/ # Auth & validation middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── uploads/ # Uploaded files (images, etc.)
│ ├── utils/ # Utility functions
│ ├── app.js # Express app
│ └── server.js # Server entry point
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Auth & global state
│ │ ├── pages/ # Pages (Login, Register, Home, etc.)
│ │ ├── services/ # API calls
│ │ ├── App.jsx # Main component & routes
│ │ └── index.js # React entry point
│ ├── public/ # Static files
│ └── tailwind.config.js # Tailwind config
│
├── .env # Environment variables for backend
├── .env.local # Environment variables for frontend
├── package.json # Project metadata and dependencies
└── README.md # This file

```
---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Yasintha8/user-management-system.git
cd user-management-system
```

2. **Setup Backend**

```bash
cd backend
```

Create a .env file in the backend folder with the following variables:<br>

```bash
PORT=5000<br>
MONGO_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_jwt_secret_key<br>
```

Start the backend server:

```bash
npm start
```

3. **Setup Frontend**

Open a new terminal window/tab:
```bash
cd frontend
npm install
```

Create .env.local in frontend folder with:
```bash
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```

4. **Access the app**

```bah
http://localhost:5173
```

---
📄 Usage

<ul>
  <li>Register new users with secure password hashing.</li>
  <li>Login to access protected routes.</li>
  <li>Manage user profiles with update and delete functionalities.And Share User Details Via Whatsapp</li>
  <li>Search users by name, email, or ID.</li>
  <li>Upload images and view them in the gallery.</li>
  <li>Download user data in PDF format.</li>
  <li>Send contact messages via the integrated contact form.</li>
</ul>

---
📝 License

This project is licensed under the MIT License.
