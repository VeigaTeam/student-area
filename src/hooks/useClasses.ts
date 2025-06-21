
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          modality:modalities(*)
        `)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};
