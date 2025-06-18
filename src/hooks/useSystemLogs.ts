
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type SystemLog = Tables<'system_logs'>;

export const useSystemLogs = (page = 0, limit = 50) => {
  return useQuery({
    queryKey: ['system-logs', page, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
      
      if (error) throw error;
      return data as SystemLog[];
    },
  });
};

export const useSystemLogsCount = () => {
  return useQuery({
    queryKey: ['system-logs-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('system_logs')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    },
  });
};
