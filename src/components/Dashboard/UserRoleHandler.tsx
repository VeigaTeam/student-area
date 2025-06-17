
import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { useDashboardData } from '@/hooks/useDashboardData';

interface UserRoleHandlerProps {
  userName: string;
}

export const UserRoleHandler: React.FC<UserRoleHandlerProps> = ({ userName }) => {
  const { data: profile, isLoading } = useProfile();
  const { activeStudents, todayClasses, monthlyRevenue } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-fitness rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <img 
              src="/api/placeholder/64/64" 
              alt="VeigaTeam Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (profile?.role === 'admin') {
    return (
      <AdminDashboard
        activeStudents={activeStudents}
        todayClasses={todayClasses}
        monthlyRevenue={monthlyRevenue}
      />
    );
  }

  return <StudentDashboard userName={userName} />;
};
