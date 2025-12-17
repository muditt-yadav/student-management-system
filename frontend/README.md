# Student Management System - Frontend

Modern, responsive web application built with Next.js 14 and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your backend API URL

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 🎨 Features

### Pages

#### 1. Login Page (`/login`)
- Beautiful split-screen design
- Form validation
- Demo credentials display
- Automatic redirect after login
- Responsive layout

#### 2. Dashboard (`/dashboard`)
- Statistics overview cards
- Quick action links
- Real-time data from API
- Responsive grid layout

#### 3. Students Page (`/students`)
- List all students with pagination
- Search functionality
- Add new student modal
- Edit student modal
- View student details modal
- Delete with confirmation
- Status badges
- Responsive card layout

### Components

#### Reusable Components
- **Button**: Multiple variants (primary, secondary, danger, ghost)
- **Input**: Form input with validation error display
- **Card**: Container component with hover effects
- **Modal**: Animated modal dialog
- **Loading**: Loading spinner component
- **Navbar**: Navigation bar with theme toggle

#### Context Providers
- **AuthContext**: Authentication state management
- **ThemeContext**: Dark mode state management

### Design System

#### Typography
- **Display Font**: Space Mono (monospace, distinctive)
- **Body Font**: Manrope (sans-serif, clean)

#### Colors
```javascript
Primary Palette:
- primary-50: #fef3f2
- primary-500: #e45446
- primary-700: #af2b1f
- primary-900: #77261e

Neutral Palette:
- Light mode: neutral-50 to neutral-900
- Dark mode: neutral-950 to neutral-100
```

#### Features
- Custom scrollbar styling
- Smooth transitions
- Hover effects
- Focus states
- Loading states
- Error states

## 🔐 Authentication Flow

1. User enters credentials on `/login`
2. Frontend sends POST to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all subsequent API requests
6. Auto-redirect to dashboard on success
7. Protected routes check for token
8. Auto-logout on 401 responses

## 🔌 API Integration

### Axios Configuration (`src/lib/api.js`)
- Base URL from environment
- Request interceptor adds JWT token
- Response interceptor handles 401 errors
- Automatic redirect to login on auth failure

### API Calls
```javascript
// Example usage
import api from '@/lib/api';

// GET request
const response = await api.get('/students');

// POST request
const response = await api.post('/students', data);

// PUT request
const response = await api.put(`/students/${id}`, data);

// DELETE request
const response = await api.delete(`/students/${id}`);
```

## 🎯 Form Validation

### Client-Side Validation
- Required fields
- Email format
- Phone number format (10 digits)
- Date validation
- Semester range (1-8)
- Real-time error display
- Clear errors on input

### Validation Rules
```javascript
Email: /\S+@\S+\.\S+/
Phone: /^[0-9]{10}$/
Semester: 1-8 (inclusive)
```

## 🌙 Dark Mode

### Implementation
- System preference detection
- Manual toggle in navbar
- Persisted in localStorage
- CSS class on document root
- Tailwind dark: variant
- Smooth transitions

### Usage in Components
```jsx
className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
```

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile-First Approach
```jsx
// Stack on mobile, side-by-side on desktop
className="flex flex-col sm:flex-row"

// 1 column mobile, 2 tablet, 4 desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

## 🔔 Toast Notifications

### Configuration
```javascript
import toast from 'react-hot-toast';

// Success
toast.success('Student added successfully');

// Error
toast.error('Failed to add student');

// Custom duration
toast('Message', { duration: 5000 });
```

### Styling
- Auto-styled for light/dark mode
- Green for success
- Red for errors
- Top-right position
- 4-second duration

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                     # Next.js app directory
│   │   ├── dashboard/
│   │   │   └── page.js         # Dashboard page
│   │   ├── login/
│   │   │   └── page.js         # Login page
│   │   ├── students/
│   │   │   └── page.js         # Students list page
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Home (redirect)
│   ├── components/             # Reusable components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Loading.js
│   │   ├── Modal.js
│   │   └── Navbar.js
│   ├── contexts/               # React contexts
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── lib/                    # Utilities
│   │   └── api.js              # Axios config
│   └── styles/                 # Global styles
│       └── globals.css
├── public/                     # Static assets
├── .env.local.example
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎨 Styling Guidelines

### Tailwind Classes
```jsx
// Spacing
p-4, px-6, py-2, m-4, mx-auto, space-x-4, gap-6

// Layout
flex, grid, grid-cols-2, items-center, justify-between

// Typography
text-lg, font-bold, text-neutral-900, dark:text-neutral-100

// Colors
bg-primary-600, text-white, border-neutral-200

// Effects
rounded-lg, shadow-md, hover:shadow-lg, transition-all
```

### Custom Classes (globals.css)
```css
animate-slide-in    /* Slide in from top */
animate-fade-in     /* Fade in */
```

## 📦 State Management

### Auth State (AuthContext)
```javascript
const { user, login, logout, loading } = useAuth();

// Login
await login(email, password);

// Logout
logout();

// Check user
if (user) { ... }
```

### Theme State (ThemeContext)
```javascript
const { isDark, toggleTheme } = useTheme();

// Toggle theme
toggleTheme();
```

### Local Component State
- Form data with useState
- Loading states
- Error states
- Modal visibility
- Pagination state

## 🔍 Search & Pagination

### Search Implementation
```javascript
const [searchQuery, setSearchQuery] = useState('');
const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
});

// Debounced search
useEffect(() => {
  fetchStudents();
}, [searchQuery, pagination.page]);

// Reset to page 1 on search
const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  setPagination(prev => ({ ...prev, page: 1 }));
};
```

## 🧩 Component Examples

### Button Component
```jsx
<Button 
  variant="primary"    // or secondary, danger, ghost
  size="md"           // or sm, lg
  fullWidth={true}
  loading={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Input Component
```jsx
<Input
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

### Modal Component
```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Add Student"
  size="lg"          // or sm, md, xl
>
  <form>...</form>
</Modal>
```

## 🛠️ Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Note: All variables must be prefixed with `NEXT_PUBLIC_` to be accessible in browser.

## 🚀 Performance Optimizations

- Next.js automatic code splitting
- Image optimization (if images added)
- CSS-in-JS with Tailwind JIT
- Lazy loading for modals
- Debounced search inputs
- Optimistic UI updates possible

## 📱 Mobile Considerations

- Touch-friendly button sizes
- Responsive navigation
- Mobile-optimized modals
- Readable font sizes
- Adequate spacing
- No hover-only interactions

## 🎯 Best Practices

### Code Organization
- One component per file
- Reusable components in `/components`
- Page-specific logic in page files
- Shared logic in contexts
- API calls in dedicated functions

### Component Structure
```jsx
// Imports
import { useState } from 'react';

// Component
export default function MyComponent() {
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
}
```

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: camelCase or PascalCase

## 🧪 Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Theme toggle
- [ ] Dashboard statistics display
- [ ] Student list pagination
- [ ] Student search
- [ ] Add student form validation
- [ ] Add student success
- [ ] Edit student
- [ ] Delete student
- [ ] View student details
- [ ] Mobile responsiveness
- [ ] Dark mode in all pages
- [ ] Toast notifications

## 🐛 Common Issues

### Styles Not Applying
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### API Connection Error
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS configuration in backend

### Authentication Issues
- Clear localStorage
- Check token expiration
- Verify JWT_SECRET matches backend

## 📚 Dependencies

### Production
- `next`: React framework
- `react`, `react-dom`: React library
- `axios`: HTTP client
- `react-hot-toast`: Notifications
- `lucide-react`: Icons

### Development
- `tailwindcss`: CSS framework
- `autoprefixer`: CSS processing
- `postcss`: CSS transformation
- `eslint`: Code linting

## 🔄 Future Enhancements

Possible additions:
- Student profile pictures
- Export to CSV/PDF
- Advanced filtering
- Bulk operations
- Email notifications
- Role-based permissions
- Activity logs
- Student analytics
- Attendance tracking

## 📞 Support

For issues or questions, please refer to the main README or contact the development team.
