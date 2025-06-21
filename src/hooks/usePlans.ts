
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Plan = Tables<'plans'>;

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('monthly_price');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (plan: TablesInsert<'plans'>) => {
      const { data, error } = await supabase
        .from('plans')
        .insert(plan)
        .select()
        .single();
      
      if (error) throw error;
      
      // Log da ação
      await supabase.rpc('log_action', {
        p_action: 'create_plan',
        p_entity_type: 'plan',
        p_entity_id: data.id,
        p_details: { plan_name: plan.name }
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Plan> }) => {
      const { data, error } = await supabase
        .from('plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Log da ação
      await supabase.rpc('log_action', {
        p_action: 'update_plan',
        p_entity_type: 'plan',
        p_entity_id: id,
        p_details: { changes: updates }
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Log da ação
      await supabase.rpc('log_action', {
        p_action: 'delete_plan',
        p_entity_type: 'plan',
        p_entity_id: id
      });
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};
