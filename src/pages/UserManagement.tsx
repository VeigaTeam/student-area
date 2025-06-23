
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Edit, Shield, Key, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAllProfiles } from '@/hooks/useProfile';
import { AddUserDialog } from '@/components/UserManagement/AddUserDialog';
import { EditUserDialog } from '@/components/UserManagement/EditUserDialog';
import { toast } from '@/hooks/use-toast';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const { data: profiles, isLoading } = useAllProfiles();

  const filteredProfiles = profiles?.filter(profile =>
    profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Excluir Usuário",
      description: "Funcionalidade de exclusão em desenvolvimento.",
    });
  };

  const handleResetPassword = (userId: string) => {
    toast({
      title: "Redefinir Senha",
      description: "Funcionalidade de redefinição de senha em desenvolvimento.",
    });
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-red-100 text-red-800',
      student: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      admin: 'Administrador',
      student: 'Aluno',
    };

    return (
      <Badge className={variants[role as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {labels[role as keyof typeof labels] || role}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gerenciar Usuários</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gerencie usuários, permissões e configurações do sistema
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-gradient-fitness hover:bg-emerald-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Usuários</CardTitle>
          <CardDescription>
            Encontre usuários cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
          <CardDescription>
            {filteredProfiles.length} usuários encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Usuário</th>
                  <th className="text-left py-3 px-2">Função</th>
                  <th className="text-left py-3 px-2">Data de Cadastro</th>
                  <th className="text-left py-3 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                          <AvatarFallback>
                            {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{profile.full_name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      {getRoleBadge(profile.role)}
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(profile)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetPassword(profile.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(profile.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddUserDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />

      {editingUser && (
        <EditUserDialog 
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
