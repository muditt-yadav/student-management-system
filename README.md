# Student Management System

A modern, full-stack Student Management System built with Next.js and Node.js for NIMS University. This application provides a comprehensive solution for managing student records with authentication, CRUD operations, and a beautiful, responsive UI.

![Student Management System](https://img.shields.io/badge/NIMS-University-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Frontend (Next.js)
- ✨ Modern, responsive UI with dark mode support
- 🎨 Beautiful design using Tailwind CSS with custom styling
- 🔐 Secure authentication with JWT tokens
- 📊 Interactive dashboard with statistics
- 🔍 Advanced search and pagination
- ✏️ Full CRUD operations for student management
- 📱 Mobile-responsive design
- 🎯 Form validation with error handling
- 🔔 Toast notifications for user feedback
- ⚡ Optimized performance with Next.js

### Backend (Node.js/Express)
- 🔒 JWT-based authentication
- 📝 RESTful API design
- ✅ Input validation using express-validator
- 🗄️ MongoDB database with Mongoose ODM
- 🛡️ Centralized error handling
- 🔍 Search and pagination support
- 🌍 CORS enabled
- 🔑 Environment-based configuration
- 📦 Modular and scalable architecture

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd student-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/student_management
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d
# NODE_ENV=development

# Make sure MongoDB is running, then seed the database
npm run seed

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔐 Default Login Credentials

After seeding the database, use these credentials to log in:

- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── studentController.js # Student CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Error handling
│   │   └── validate.js          # Validation middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Student.js           # Student schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── studentRoutes.js     # Student endpoints
│   ├── utils/
│   │   └── seedData.js          # Database seeding
│   └── server.js                # Express app setup
├── .env.example
├── .gitignore
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.js          # Dashboard page
│   │   ├── login/
│   │   │   └── page.js          # Login page
│   │   ├── students/
│   │   │   └── page.js          # Students list page
│   │   ├── layout.js            # Root layout
│   │   └── page.js              # Home page
│   ├── components/
│   │   ├── Button.js            # Reusable button
│   │   ├── Card.js              # Card component
│   │   ├── Input.js             # Input field
│   │   ├── Loading.js           # Loading spinner
│   │   ├── Modal.js             # Modal dialog
│   │   └── Navbar.js            # Navigation bar
│   ├── contexts/
│   │   ├── AuthContext.js       # Auth state management
│   │   └── ThemeContext.js      # Theme state management
│   ├── lib/
│   │   └── api.js               # Axios configuration
│   └── styles/
│       └── globals.css          # Global styles
├── .env.local.example
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Students
- `GET /api/students` - Get all students (with pagination & search)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

All student endpoints are protected and require JWT authentication.

### Query Parameters for GET /api/students
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search query (searches in name, email, course)
- `status` - Filter by status (active/inactive/graduated)
- `course` - Filter by course

## 🎨 Features Showcase

### 1. Authentication
- Secure login with JWT tokens
- Token stored in localStorage
- Automatic redirect on authentication
- Protected routes

### 2. Dashboard
- Overview statistics (total, active, courses, graduated)
- Quick action cards
- Responsive grid layout

### 3. Student Management
- View all students in a beautiful card layout
- Search students by name, email, or course
- Pagination for large datasets
- Add new students with form validation
- Edit existing student details
- Delete students with confirmation
- View detailed student information

### 4. Dark Mode
- System preference detection
- Manual toggle option
- Persisted across sessions
- Smooth transitions

### 5. Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

## 🧪 Testing the Application

### Test Scenarios

1. **Authentication**
   - Try logging in with correct credentials
   - Try logging in with incorrect credentials
   - Test logout functionality

2. **Student Management**
   - Add a new student with all fields
   - Add a student with only required fields
   - Try adding invalid data (test validation)
   - Search for students
   - Edit student information
   - Delete a student
   - Test pagination with multiple pages

3. **UI/UX**
   - Toggle dark mode
   - Test responsive design on different screen sizes
   - Check form validations
   - Verify toast notifications

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📝 Additional Features & Improvements

### Implemented
- ✅ JWT authentication
- ✅ Form validation
- ✅ Search functionality
- ✅ Pagination
- ✅ Dark mode
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Reusable components

### Design Choices
1. **Typography**: Used Space Mono for headings and Manrope for body text to create a unique, modern aesthetic
2. **Color Scheme**: Custom primary red palette with neutral grays for professional look
3. **Layout**: Card-based design with generous spacing for better readability
4. **Animations**: Subtle transitions and hover effects for enhanced UX
5. **Icons**: Lucide React icons for consistency and clarity

### Security Best Practices
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation on both client and server
- CORS configuration
- Environment variables for sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
# On macOS with Homebrew:
brew services start mongodb-community

# On Ubuntu:
sudo systemctl start mongod

# Check MongoDB status
mongo --eval "db.adminCommand('ping')"
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

This is a test project for NIMS University Developer position. For any issues or suggestions, please contact the development team.

## 📄 License

This project is created for educational and evaluation purposes for NIMS University.

## 👨‍💻 Developer

Created as part of the NIMS University Developer role assessment.

---

**Note**: This is a demonstration project showcasing full-stack development skills including modern React/Next.js frontend, Node.js/Express backend, MongoDB database, authentication, and professional UI/UX design.
