
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesUpdate } from '@/integrations/supabase/types';

type ScheduleSettings = Tables<'schedule_settings'>;

export const useScheduleSettings = () => {
  return useQuery({
    queryKey: ['schedule-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as ScheduleSettings;
    },
  });
};

export const useUpdateScheduleSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: TablesUpdate<'schedule_settings'>) => {
      const { data, error } = await supabase
        .from('schedule_settings')
        .update(updates)
        .eq('id', updates.id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ScheduleSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-settings'] });
    },
  });
};
