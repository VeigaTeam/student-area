
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tables } from '@/integrations/supabase/types';

type SystemLog = Tables<'system_logs'>;

export const useLogsExport = () => {
  const formatLogDetails = (details: any): string => {
    if (!details) return '-';
    if (typeof details === 'string') return details;
    return JSON.stringify(details, null, 2);
  };

  const exportLogs = (logs: SystemLog[]) => {
    if (!logs) return;
    
    const csv = [
      ['Data/Hora', 'Usuário', 'Ação', 'Entidade', 'IP', 'Detalhes'].join(','),
      ...logs.map(log => [
        format(new Date(log.created_at || ''), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
        log.user_id || 'Sistema',
        log.action,
        log.entity_type,
        log.ip_address || '-',
        formatLogDetails(log.details).replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return { exportLogs };
};
