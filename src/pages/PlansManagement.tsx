
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus, Edit, Trash2, Star } from 'lucide-react';
import { usePlans } from '@/hooks/useDatabase';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PlansManagement: React.FC = () => {
  const { data: plans, refetch } = usePlans();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const handleSavePlan = async (formData: FormData) => {
    try {
      const planData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        monthly_price: parseFloat(formData.get('monthly_price') as string),
        weekly_classes: parseInt(formData.get('weekly_classes') as string),
        popular: formData.get('popular') === 'on',
        features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
        modalities: (formData.get('modalities') as string).split(',').map(m => m.trim()).filter(m => m),
      };

      if (editingPlan) {
        const { error } = await supabase
          .from('plans')
          .update(planData)
          .eq('id', editingPlan.id);
        
        if (error) throw error;
        toast({ title: "Plano atualizado com sucesso!" });
      } else {
        const { error } = await supabase
          .from('plans')
          .insert(planData);
        
        if (error) throw error;
        toast({ title: "Plano criado com sucesso!" });
      }

      setIsDialogOpen(false);
      setEditingPlan(null);
      refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o plano.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Plano excluído com sucesso!" });
      refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o plano.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (plan: any) => {
    setEditingPlan(plan);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPlan(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="mr-3 h-6 w-6" />
            Gerenciar Planos
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Crie e gerencie os planos da academia
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do plano
              </DialogDescription>
            </DialogHeader>
            
            <form action={handleSavePlan} className="space-y-4">
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingPlan ? 'Atualizar' : 'Criar'} Plano
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <Card key={plan.id} className="relative">
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-red-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(plan)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    R$ {plan.monthly_price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">por mês</p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Modalidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {plan.modalities.map((modality, index) => (
                      <Badge key={index} variant="secondary">
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Benefícios:</p>
                  <ul className="text-sm space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    {plan.weekly_classes} aulas por semana
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plans?.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum plano criado ainda</p>
            <p className="text-sm text-gray-400 mb-4">Comece criando seu primeiro plano</p>
            <Button onClick={openCreateDialog} className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Plano
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlansManagement;
