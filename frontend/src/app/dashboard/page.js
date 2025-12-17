'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import api from '../../lib/api';
import { Users, BookOpen, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/students?limit=1000');
      const students = response.data.data;
      
      const activeStudents = students.filter(s => s.status === 'active').length;
      const courses = [...new Set(students.map(s => s.course))].length;
      const graduated = students.filter(s => s.status === 'graduated').length;
      
      setStats({
        total: students.length,
        active: activeStudents,
        courses: courses,
        graduated: graduated
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's an overview of your student management system
          </p>
        </div>

        {/* Stats grid */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stats?.total || 0}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Total Students
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stats?.active || 0}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Active Students
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stats?.courses || 0}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Available Courses
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stats?.graduated || 0}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Graduated
                  </p>
                </div>
              </Card>
            </div>

            {/* Quick actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/students">
                  <div className="group p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          View All Students
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Browse and manage student records
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                  </div>
                </Link>

                <Link href="/students?action=add">
                  <div className="group p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          Add New Student
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Register a new student in the system
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
