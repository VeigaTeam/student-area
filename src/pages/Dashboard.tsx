
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDashboard } from '@/components/Dashboard/StudentDashboard';
import { AdminDashboard } from '@/components/Dashboard/AdminDashboard';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { activeStudents, todayClasses, monthlyRevenue } = useDashboardData();
  
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';
  const userRole = user?.email === 'admin@veigateam.com' ? 'admin' : 'student';

  if (userRole === 'student') {
    return <StudentDashboard userName={userName} />;
  }

  return (
    <AdminDashboard
      activeStudents={activeStudents}
      todayClasses={todayClasses}
      monthlyRevenue={monthlyRevenue}
    />
  );
};

export default Dashboard;
