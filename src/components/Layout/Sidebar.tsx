
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings,
  User,
  CalendarCheck,
  ClipboardList,
  AlertCircle,
  UserCog,
  UserPlus
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';

const adminNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/students', icon: Users, label: 'Alunos' },
  { href: '/schedule', icon: Calendar, label: 'Gerenciar Agendamentos' },
  { href: '/schedule-settings', icon: CalendarCheck, label: 'Config. Agendamentos' },
  { href: '/user-management', icon: UserCog, label: 'Gerenciar Usuários' },
  { href: '/plans-management', icon: ClipboardList, label: 'Gerenciar Planos' },
  { href: '/financial', icon: DollarSign, label: 'Financeiro' },
  { href: '/system-logs', icon: AlertCircle, label: 'Logs do Sistema' },
  { href: '/profile', icon: User, label: 'Perfil' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

const studentNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/my-schedule', icon: Calendar, label: 'Minhas Aulas' },
  { href: '/plans', icon: FileText, label: 'Planos' },
  { href: '/profile', icon: User, label: 'Perfil' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  
  // Determinar se é admin baseado no perfil ou email como fallback
  const isAdmin = profile?.role === 'admin' || user?.email === 'admin@veigateam.com';
  const navItems = isAdmin ? adminNavItems : studentNavItems;

  console.log('Sidebar - Estado:', { 
    user: !!user, 
    profile, 
    isAdmin, 
    isLoading,
    navItemsCount: navItems.length 
  });

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">VT</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">VeigaTeam</h1>
          </div>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {isLoading && (
            <div className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
              Carregando menu...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
