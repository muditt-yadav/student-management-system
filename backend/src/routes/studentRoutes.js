const express = require('express');
const { body, param } = require('express-validator');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Validation rules
const studentValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('course')
    .trim()
    .notEmpty()
    .withMessage('Course is required'),
  body('semester')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid student ID')
];

// Apply protection to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getStudents)
  .post(studentValidation, validate, createStudent);

router.route('/:id')
  .get(idValidation, validate, getStudent)
  .put([...idValidation, ...studentValidation], validate, updateStudent)
  .delete(idValidation, validate, deleteStudent);

module.exports = router;
