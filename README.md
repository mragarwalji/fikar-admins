# Welcome to Fikar Plus Admin project

***🚀 Overview***

Fikar Plus – Admin Panel is a complete hospital & appointment management web application.
Admins can manage hospitals, doctors, patients, appointments, and even remove or block unwanted users.
The system is built using a secure, scalable & modern full-stack architecture.
Follow these steps:

**Key Features**
***🔐 Authentication & Security***
. Secure Login & Signup
. JWT-based authentication
. Encrypted passwords using Bcrypt
. Role-based admin access
. Block/Unblock unwanted users
. Remove/Delete users permanently
. Suspicious users cannot login

**🏥 Hospital Management**
. Add, update, delete hospitals
. Manage hospital availability
. View hospital details

**👨‍⚕️ Doctor Management**
. Add new doctors
. Edit/update doctor details
. Delete unwanted doctors
. Manage specialization & status
. Auto-sync to MongoDB + Firestore

**🧑‍🦰 Patient Management**
. Add and update patient records
. Delete unwanted or duplicate profiles
. Block suspicious accounts

**📅 Appointment Management**
. Create and manage appointments
. Approve / Reject request
. Live status tracking
. Real-time updates (Firestore)

🛠️ Tech Stack
# Frontend
. React + TypeScript
. Vite
. Tailwind CSS
. ShadCN UI
. Axios for API integration

# Backend
. Node.js
. Express.js
. JWT Aunthetication
. Bcrypt
. CORS
. Firebase Api

# Database
. MongoDB Cloud
. Firebase Firestore

**🔧 Environment Setup**
***🛠 Backend .env***
PORT=3000
MONGO_URI=your_mongodb_cloud_url
JWT_SECRET=your_secret_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_project_id

**🎨 Frontend .env**
VITE_API_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_id

**🔌 API Endpoints**
***🔐 Auth APIs*** 
Method	     Endpoint	                 Description
POST	       /api/auth/signup	         Register admin
POST	      /api/auth/login	           Login admin

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Initialize new project
npm init -y

# Install runtime dependencies
npm install express mongoose bcryptjs jsonwebtoken cors -g nodemon

# Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
i. npm run dev
ii. nodemon server.js
```
