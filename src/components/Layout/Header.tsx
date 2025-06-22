
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from '@/components/Notifications/NotificationCenter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Iniciando processo de logout...');
    
    try {
      const { error } = await signOut();
      
      if (error) {
        console.error('Erro no logout:', error);
        toast({
          title: "Erro",
          description: "Erro ao fazer logout",
          variant: "destructive",
        });
      } else {
        console.log('Logout realizado com sucesso, redirecionando...');
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso",
        });
        
        // Forçar redirecionamento para a página de login
        navigate('/auth', { replace: true });
      }
    } catch (err) {
      console.error('Erro crítico no logout:', err);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado durante o logout",
        variant: "destructive",
      });
    }
  };

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';
  const userRole = profile?.role || 'student';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1">
            <div className="max-w-xs w-full lg:max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Buscar alunos, aulas..."
                  className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <NotificationCenter />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} alt={userName} />
                    <AvatarFallback className="bg-red-600 text-white">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{userName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {userRole === 'admin' ? 'Administrador' : 'Aluno'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/settings')}
                  className="dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
