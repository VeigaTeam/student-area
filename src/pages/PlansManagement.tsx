
import React, { useState } from 'react';
import { usePlans } from '@/hooks/usePlans';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';
import { PlansHeader } from '@/components/Plans/PlansHeader';
import { PlanCard } from '@/components/Plans/PlanCard';
import { PlanFormDialog } from '@/components/Plans/PlanFormDialog';
import { EmptyPlansState } from '@/components/Plans/EmptyPlansState';

type Plan = Tables<'plans'>;

const PlansManagement: React.FC = () => {
  const { data: plans, refetch } = usePlans();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleSavePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
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

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPlan(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PlansHeader onCreatePlan={openCreateDialog} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={openEditDialog}
            onDelete={handleDeletePlan}
          />
        ))}
      </div>

      {plans?.length === 0 && (
        <EmptyPlansState onCreatePlan={openCreateDialog} />
      )}

      <PlanFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingPlan={editingPlan}
        onSubmit={handleSavePlan}
      />
    </div>
  );
};

export default PlansManagement;
