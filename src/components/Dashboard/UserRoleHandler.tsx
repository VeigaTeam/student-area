
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
      <div className="flex items-center justify-center min-h-[400px] bg-background">
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
    
    // Se erro for de política RLS, mostrar mensagem mais amigável
    const isRLSError = error.message?.includes('policy') || error.message?.includes('recursion');
    
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {isRLSError ? 'Configurando permissões...' : 'Erro ao carregar perfil'}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {isRLSError 
              ? 'Aguarde um momento enquanto configuramos suas permissões de acesso.'
              : 'Ocorreu um erro ao carregar suas informações de perfil.'
            }
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Determinar role com fallback para email
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
