
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tables } from '@/integrations/supabase/types';

type Plan = Tables<'plans'>;

interface PlanFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingPlan: Plan | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PlanFormDialog: React.FC<PlanFormDialogProps> = ({
  isOpen,
  onClose,
  editingPlan,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do plano
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Plano</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingPlan?.name}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthly_price">Preço Mensal (R$)</Label>
              <Input
                id="monthly_price"
                name="monthly_price"
                type="number"
                step="0.01"
                defaultValue={editingPlan?.monthly_price}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={editingPlan?.description}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekly_classes">Aulas por Semana</Label>
              <Input
                id="weekly_classes"
                name="weekly_classes"
                type="number"
                defaultValue={editingPlan?.weekly_classes}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="popular"
                name="popular"
                defaultChecked={editingPlan?.popular}
              />
              <Label htmlFor="popular">Plano Popular</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalities">Modalidades (separadas por vírgula)</Label>
            <Input
              id="modalities"
              name="modalities"
              defaultValue={editingPlan?.modalities?.join(', ')}
              placeholder="Muay Thai, Funcional, Yoga"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Benefícios (um por linha)</Label>
            <Textarea
              id="features"
              name="features"
              defaultValue={editingPlan?.features?.join('\n')}
              rows={4}
              placeholder="Acesso ilimitado&#10;Acompanhamento nutricional&#10;Área de musculação"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              {editingPlan ? 'Atualizar' : 'Criar'} Plano
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
