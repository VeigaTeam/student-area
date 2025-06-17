
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleHandler } from '@/components/Dashboard/UserRoleHandler';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';

  return <UserRoleHandler userName={userName} />;
};

export default Dashboard;
