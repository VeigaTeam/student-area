
import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';

interface UserRoleHandlerProps {
  userName: string;
}

export const UserRoleHandler: React.FC<UserRoleHandlerProps> = ({ userName }) => {
  const { user } = useAuth();
  const { data: profile, isLoading, error } = useProfile();
  const { activeStudents, todayClasses, monthlyRevenue } = useDashboardData();

  console.log('UserRoleHandler - Estado:', { 
    user: !!user, 
    profile, 
    isLoading, 
    error: error?.message 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Erro ao carregar perfil:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-red-600 mb-4">Erro ao carregar perfil</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  // Se não temos perfil mas temos usuário, usar dados do usuário
  const userRole = profile?.role || (user?.email === 'admin@veigateam.com' ? 'admin' : 'student');

  if (userRole === 'admin') {
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
