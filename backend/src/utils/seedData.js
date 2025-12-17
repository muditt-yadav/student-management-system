const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Student = require('../models/Student');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
];

const students = [
  {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@student.com',
    phone: '9876543210',
    dateOfBirth: new Date('2002-05-15'),
    course: 'Computer Science',
    semester: 4,
    address: {
      street: '123 Main Street',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001'
    },
    status: 'active'
  },
  {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@student.com',
    phone: '9876543211',
    dateOfBirth: new Date('2003-08-22'),
    course: 'Electronics',
    semester: 3,
    address: {
      street: '456 Park Avenue',
      city: 'Udaipur',
      state: 'Rajasthan',
      pincode: '313001'
    },
    status: 'active'
  },
  {
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@student.com',
    phone: '9876543212',
    dateOfBirth: new Date('2001-12-10'),
    course: 'Mechanical Engineering',
    semester: 6,
    address: {
      street: '789 Lake Road',
      city: 'Jodhpur',
      state: 'Rajasthan',
      pincode: '342001'
    },
    status: 'active'
  },
  {
    firstName: 'Sneha',
    lastName: 'Verma',
    email: 'sneha.verma@student.com',
    phone: '9876543213',
    dateOfBirth: new Date('2002-03-18'),
    course: 'Civil Engineering',
    semester: 5,
    address: {
      street: '321 Hill View',
      city: 'Kota',
      state: 'Rajasthan',
      pincode: '324001'
    },
    status: 'active'
  },
  {
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@student.com',
    phone: '9876543214',
    dateOfBirth: new Date('2003-01-25'),
    course: 'Information Technology',
    semester: 2,
    address: {
      street: '555 Garden Street',
      city: 'Ajmer',
      state: 'Rajasthan',
      pincode: '305001'
    },
    status: 'active'
  },
  {
    firstName: 'Anita',
    lastName: 'Reddy',
    email: 'anita.reddy@student.com',
    phone: '9876543215',
    dateOfBirth: new Date('2001-09-30'),
    course: 'Computer Science',
    semester: 7,
    address: {
      street: '777 Beach Road',
      city: 'Bikaner',
      state: 'Rajasthan',
      pincode: '334001'
    },
    status: 'active'
  },
  {
    firstName: 'Rohit',
    lastName: 'Gupta',
    email: 'rohit.gupta@student.com',
    phone: '9876543216',
    dateOfBirth: new Date('2002-11-05'),
    course: 'Electrical Engineering',
    semester: 4,
    address: {
      street: '888 Valley View',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302015'
    },
    status: 'active'
  },
  {
    firstName: 'Kavita',
    lastName: 'Joshi',
    email: 'kavita.joshi@student.com',
    phone: '9876543217',
    dateOfBirth: new Date('2003-06-12'),
    course: 'Electronics',
    semester: 3,
    address: {
      street: '999 River Side',
      city: 'Udaipur',
      state: 'Rajasthan',
      pincode: '313002'
    },
    status: 'active'
  },
  {
    firstName: 'Suresh',
    lastName: 'Nair',
    email: 'suresh.nair@student.com',
    phone: '9876543218',
    dateOfBirth: new Date('2001-04-20'),
    course: 'Computer Science',
    semester: 8,
    address: {
      street: '111 Mountain Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302020'
    },
    status: 'graduated'
  },
  {
    firstName: 'Meena',
    lastName: 'Desai',
    email: 'meena.desai@student.com',
    phone: '9876543219',
    dateOfBirth: new Date('2002-07-08'),
    course: 'Information Technology',
    semester: 5,
    address: {
      street: '222 Forest Lane',
      city: 'Jodhpur',
      state: 'Rajasthan',
      pincode: '342002'
    },
    status: 'active'
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Student.deleteMany();

    // Insert data
    await User.create(users);
    await Student.create(students);

    console.log('Data Imported Successfully!');
    console.log('\nDefault Login Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
