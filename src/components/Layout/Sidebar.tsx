
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
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const adminNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/students', icon: Users, label: 'Alunos' },
  { href: '/schedule', icon: Calendar, label: 'Agendamentos' },
  { href: '/plans', icon: FileText, label: 'Planos' },
  { href: '/financial', icon: DollarSign, label: 'Financeiro' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

const studentNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/my-schedule', icon: Calendar, label: 'Minhas Aulas' },
  { href: '/plans', icon: FileText, label: 'Planos' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.email === 'admin@veigateam.com' || user?.user_metadata?.role === 'admin';
  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-fitness rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VT</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">VeigaTeam</h1>
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
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-emerald-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
