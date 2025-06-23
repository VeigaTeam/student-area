
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type SystemLog = Tables<'system_logs'>;

export const useSystemLogs = (page = 0, limit = 50) => {
  return useQuery({
    queryKey: ['system-logs', page, limit],
    queryFn: async () => {
      console.log('Carregando logs do sistema...');
      
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
      
      if (error) {
        console.error('Erro ao carregar logs:', error);
        throw error;
      }
      
      console.log('Logs carregados:', data?.length || 0);
      return data as SystemLog[];
    },
    refetchInterval: 30000, // Atualiza a cada 30 segundos
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
    refetchInterval: 30000,
  });
};

// Hook para criar logs automaticamente
export const useCreateLog = () => {
  const createLog = async (action: string, entityType: string, entityId?: string, details?: any) => {
    try {
      const { error } = await supabase
        .from('system_logs')
        .insert({
          action,
          entity_type: entityType,
          entity_id: entityId,
          details,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });
      
      if (error) {
        console.error('Erro ao criar log:', error);
      }
    } catch (err) {
      console.error('Erro ao criar log:', err);
    }
  };

  return { createLog };
};
