# Student Management System - Backend API

RESTful API built with Node.js, Express, and MongoDB for managing student records.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Seed database with sample data
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

## 📋 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Students

#### Get All Students
```http
GET /students?page=1&limit=10&search=john&status=active
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [...students],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Get Student by ID
```http
GET /students/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "_id": "student_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    ...
  }
}
```

#### Create Student
```http
POST /students
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "dateOfBirth": "2002-05-15",
  "course": "Computer Science",
  "semester": 4,
  "status": "active",
  "address": {
    "street": "123 Main St",
    "city": "Jaipur",
    "state": "Rajasthan",
    "pincode": "302001"
  }
}

Response:
{
  "success": true,
  "message": "Student created successfully",
  "data": {...student}
}
```

#### Update Student
```http
PUT /students/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  ...
}

Response:
{
  "success": true,
  "message": "Student updated successfully",
  "data": {...updated_student}
}
```

#### Delete Student
```http
DELETE /students/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```

## 📊 Database Schema

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: ['admin', 'user'], default: 'admin'),
  timestamps: true
}
```

### Student Schema
```javascript
{
  firstName: String (required, max: 50),
  lastName: String (required, max: 50),
  email: String (required, unique, email format),
  phone: String (required, 10 digits),
  dateOfBirth: Date (required),
  enrollmentDate: Date (default: now),
  course: String (required),
  semester: Number (required, 1-8),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  status: String (enum: ['active', 'inactive', 'graduated'], default: 'active'),
  timestamps: true
}
```

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- Protected routes with auth middleware
- Input validation with express-validator
- Mongoose schema validation
- CORS configuration
- Error handling middleware
- Environment variable protection

## 🧪 Seeding Database

The seed script creates:
- 1 admin user (admin@example.com / admin123)
- 10 sample students with various courses and statuses

```bash
# Seed database
npm run seed

# Clear and reseed
npm run seed -d
```

## 🛠️ Error Handling

All errors follow this format:
```javascript
{
  "success": false,
  "message": "Error message here",
  "errors": [...] // Optional validation errors
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Server Error

## 🔍 Search & Filtering

The students endpoint supports:
- **Text Search**: Searches in firstName, lastName, email, and course
- **Status Filter**: Filter by active/inactive/graduated
- **Course Filter**: Filter by specific course
- **Pagination**: Page number and limit

Example:
```
GET /students?search=computer&status=active&page=1&limit=10
```

## 📝 Validation Rules

### Login
- Email: Required, valid email format
- Password: Required

### Student Create/Update
- First Name: Required, max 50 characters
- Last Name: Required, max 50 characters
- Email: Required, valid email format
- Phone: Required, exactly 10 digits
- Date of Birth: Required, valid ISO date
- Course: Required
- Semester: Required, integer between 1-8
- Address fields: Optional

## 🧩 Middleware Stack

1. **express.json()** - Parse JSON bodies
2. **cors()** - Enable CORS
3. **auth** - Verify JWT token (protected routes)
4. **validation** - Validate request data
5. **errorHandler** - Centralized error handling

## 📦 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `express-validator` - Input validation

### Development
- `nodemon` - Auto-restart on changes

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── studentController.js # Student CRUD
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validate.js          # Validation
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Student.js           # Student model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes
│   │   └── studentRoutes.js     # Student routes
│   ├── utils/
│   │   └── seedData.js          # Seed script
│   └── server.js                # App entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Environment Variables

Required variables in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🚨 Common Issues

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB service
# macOS
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## 📈 Performance Considerations

- Indexed fields for search (text index on firstName, lastName, email, course)
- Pagination to limit result sets
- Mongoose lean queries where appropriate
- Password field excluded from queries by default

## 🧪 Testing

### Manual Testing with curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get students (use token from login)
curl http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com",...}'
```

## 📞 Support

For issues or questions, please refer to the main README or contact the development team.
