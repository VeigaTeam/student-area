
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'student',
    tempPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui implementaremos a criação do usuário
    toast({
      title: "Usuário Adicionado",
      description: `Usuário ${formData.fullName} foi adicionado com sucesso. Senha temporária: ${formData.tempPassword}`,
    });
    
    setFormData({
      fullName: '',
      email: '',
      role: 'student',
      tempPassword: '',
    });
    
    onOpenChange(false);
  };

  const generateTempPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    setFormData(prev => ({ ...prev, tempPassword: password }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Cadastre um novo usuário no sistema. Uma senha temporária será gerada.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Aluno</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tempPassword">Senha Temporária</Label>
            <div className="flex space-x-2">
              <Input
                id="tempPassword"
                type="text"
                value={formData.tempPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, tempPassword: e.target.value }))}
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
              Adicionar Usuário
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
