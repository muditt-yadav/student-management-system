
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { 
  Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight,
  Mail, Phone, Calendar, BookOpen, Hash, MapPin, Users
} from 'lucide-react';

function StudentsPageContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    course: '',
    semester: '',
    status: 'active',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user, pagination.page, searchQuery]);

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'add') {
      handleAddStudent();
    }
  }, [searchParams]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchQuery
        }
      });
      setStudents(response.data.data);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination
      }));
    } catch (error) {
      toast.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      course: '',
      semester: '',
      status: 'active',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth.split('T')[0],
      course: student.course,
      semester: student.semester,
      status: student.status,
      address: student.address || {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    setModalMode('view');
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Phone must be 10 digits';
    }
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.course.trim()) errors.course = 'Course is required';
    if (!formData.semester) {
      errors.semester = 'Semester is required';
    } else if (formData.semester < 1 || formData.semester > 8) {
      errors.semester = 'Semester must be between 1 and 8';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await api.post('/students', formData);
        toast.success('Student added successfully');
      } else {
        await api.put(`/students/${selectedStudent._id}`, formData);
        toast.success('Student updated successfully');
      }
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (authLoading || !user) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Students
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage all student records
            </p>
          </div>
          <Button onClick={handleAddStudent} className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>

        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </Card>

        {loading ? (
          <Loading />
        ) : students.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-neutral-400 dark:text-neutral-600 mb-4">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">No students found</p>
              <p className="text-sm mt-2">
                {searchQuery ? 'Try adjusting your search' : 'Click "Add Student" to get started'}
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {students.map((student) => (
                <Card key={student._id} hover className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">
                            {student.firstName[0]}{student.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            {student.firstName} {student.lastName}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{student.course}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Hash className="w-4 h-4" />
                              <span>Semester {student.semester}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${student.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                              ${student.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' : ''}
                              ${student.status === 'graduated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                            `}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student._id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {pagination.pages > 1 && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} students
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Page {pagination.page} of {pagination.pages}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.page === pagination.pages}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalMode === 'add' ? 'Add New Student' :
          modalMode === 'edit' ? 'Edit Student' :
          'Student Details'
        }
        size="lg"
      >
        {modalMode === 'view' && selectedStudent ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2
                  ${selectedStudent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${selectedStudent.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' : ''}
                  ${selectedStudent.status === 'graduated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                `}>
                  {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Email</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-neutral-100">{selectedStudent.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Phone</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-neutral-100">{selectedStudent.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Date of Birth</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Course</label>
                <div className="flex items-center space-x-2 mt-1">
                  <BookOpen className="w-4 h-4 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-neutral-100">{selectedStudent.course}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Semester</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Hash className="w-4 h-4 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-neutral-100">{selectedStudent.semester}</p>
                </div>
              </div>
            </div>
            
            {selectedStudent.address && (selectedStudent.address.city || selectedStudent.address.street) && (
              <div>
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Address</label>
                <div className="flex items-start space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-1" />
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {[
                      selectedStudent.address.street,
                      selectedStudent.address.city,
                      selectedStudent.address.state,
                      selectedStudent.address.pincode
                    ].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
                required
              />
            </div>
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />
            
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone}
              placeholder="10-digit number"
              required
            />
            
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={formErrors.dateOfBirth}
              required
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                error={formErrors.course}
                required
              />
              <Input
                label="Semester"
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                error={formErrors.semester}
                min="1"
                max="8"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Address (Optional)
              </p>
              <div className="space-y-4">
                <Input
                  label="Street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                  <Input
                    label="State"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  label="Pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                loading={submitting}
              >
                {modalMode === 'add' ? 'Add Student' : 'Update Student'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <StudentsPageContent />
    </Suspense>
  );
}
