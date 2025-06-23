
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAllProfiles } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [studentData, setStudentData] = useState({
    planId: '',
    phone: '',
    address: '',
    birthDate: '',
    emergencyContact: '',
    medicalNotes: '',
    tempPassword: '',
  });

  const { data: profiles } = useAllProfiles();
  
  const unregisteredUsers = profiles?.filter(profile => 
    profile.role === 'student' && 
    !profile.phone && // Assumindo que alunos cadastrados têm telefone
    (profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     profile.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setSearchTerm('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) {
      toast({
        title: "Erro",
        description: "Selecione um usuário para cadastrar como aluno.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Aluno Cadastrado",
      description: `${selectedUser.full_name} foi cadastrado como aluno com sucesso. Senha temporária: ${studentData.tempPassword}`,
    });
    
    setSelectedUser(null);
    setStudentData({
      planId: '',
      phone: '',
      address: '',
      birthDate: '',
      emergencyContact: '',
      medicalNotes: '',
      tempPassword: '',
    });
    
    onOpenChange(false);
  };

  const generateTempPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    setStudentData(prev => ({ ...prev, tempPassword: password }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Aluno</DialogTitle>
          <DialogDescription>
            Busque usuários cadastrados e adicione-os como alunos da academia.
          </DialogDescription>
        </DialogHeader>
        
        {!selectedUser ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar Usuário</Label>
              <Input
                id="search"
                placeholder="Digite nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <Label>Usuários Encontrados</Label>
                {unregisteredUsers.length > 0 ? (
                  unregisteredUsers.map(user => (
                    <div 
                      key={user.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Nenhum usuário encontrado</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">{selectedUser.full_name}</div>
              <div className="text-sm text-gray-500">{selectedUser.email}</div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setSelectedUser(null)}
              >
                Alterar Usuário
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={studentData.phone}
                  onChange={(e) => setStudentData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={studentData.birthDate}
                  onChange={(e) => setStudentData(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={studentData.address}
                onChange={(e) => setStudentData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Contato de Emergência</Label>
              <Input
                id="emergencyContact"
                value={studentData.emergencyContact}
                onChange={(e) => setStudentData(prev => ({ ...prev, emergencyContact: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medicalNotes">Observações Médicas</Label>
              <Textarea
                id="medicalNotes"
                value={studentData.medicalNotes}
                onChange={(e) => setStudentData(prev => ({ ...prev, medicalNotes: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tempPassword">Senha de Primeiro Acesso</Label>
              <div className="flex space-x-2">
                <Input
                  id="tempPassword"
                  type="text"
                  value={studentData.tempPassword}
                  onChange={(e) => setStudentData(prev => ({ ...prev, tempPassword: e.target.value }))}
                  required
                />
                <Button type="button" variant="outline" onClick={generateTempPassword}>
                  Gerar
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-fitness hover:bg-emerald-600">
                Cadastrar Aluno
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
