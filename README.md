# EduConnect

EduConnect is a comprehensive student management platform that enables **admins, teachers, and parents** to track student performance, attendance, and assignments. It also features an **AI study guide** and a **news section** to keep parents informed.

##  Features

### Admin Dashboard:
- ✅ Add users as **parents** or **teachers**.
- ✅ Manage teacher and parent accounts.
- ✅ Post **news updates** visible to parents.

### Teacher Dashboard:
-  Mark **attendance**, **performance**, and **remarks** for students.
-  Upload **assignments** based on **Student ID**.
-  Add **news** for parents to view.

### Parent Dashboard:
-  View **attendance, performance, and remarks** of their child.
-  Access uploaded **assignments**.
-  AI-powered **study guide** based on student performance.
-  View **news updates** posted by teachers/admins.

##  Tech Stack

- **Frontend**: React.js, Context API, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **AI Features**: OpenAI API (for study guide)


##  Getting Started

### 1⃣ Clone the repository

```bash
git clone https://github.com/swapnil2382/EduConnect.git
```

### 2⃣ Install dependencies

#### Backend:
```bash
cd Backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```
#### AI:
```bash
cd ai-backend
npm install
```

### 3⃣ Set up environment variables

Create a `.env` file in the `server/` directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### 4⃣ Run the application

#### Start the backend:
```bash
cd backend
npm start
```

#### Start the frontend:
```bash
cd frontend
npm start
```

#### Start the ai-backend:
```bash
cd ai-backend
flask run
```

The app should now be running at **http://localhost:3000** .

##  API Endpoints

###  Auth
- `POST /api/auth/login` - Login

###  Student Data
- `GET /api/performance/:studentID` - Get performance data
- `GET /api/attendance/:studentID` - Get attendance records
- `GET /api/remarks/:studentID` - Get teacher remarks
- `GET /api/uploads/student/:studentID` - Get uploaded assignments

###  Uploads
- `POST /api/uploads` - Upload assignments (Teachers only)

###  News
- `POST /api/news` - Add news (Admin & Teacher only)
- `GET /api/news` - Get all news (Visible to parents)

##  Future Enhancements
-  **Mobile-friendly UI**
-  **More AI-driven insights**
-  **Gamification for student engagement**
-  **Push notifications for parents**


---

🎓 *EduConnect - Empowering Students, Connecting Educators & Parents* 🚀

