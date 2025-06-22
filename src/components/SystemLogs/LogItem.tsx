
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tables } from '@/integrations/supabase/types';

type SystemLog = Tables<'system_logs'>;

interface LogItemProps {
  log: SystemLog;
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => {
  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('signup')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (action.includes('update') || action.includes('edit')) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    if (action.includes('login') || action.includes('auth')) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const getEntityIcon = (entityType: string) => {
    return <AlertCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  };

  const formatLogDetails = (details: any): string => {
    if (!details) return '-';
    if (typeof details === 'string') return details;
    return JSON.stringify(details, null, 2);
  };

  return (
    <div className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900">
      <div className="flex-shrink-0">
        {getEntityIcon(log.entity_type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <Badge className={getActionColor(log.action)}>
            {log.action}
          </Badge>
          <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            {log.entity_type}
          </Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(log.created_at || ''), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
          </span>
        </div>
        
        <div className="text-sm space-y-1">
          <p className="text-gray-900 dark:text-gray-100"><strong>Usuário:</strong> <span className="text-gray-700 dark:text-gray-300">{log.user_id || 'Sistema'}</span></p>
          {log.entity_id && (
            <p className="text-gray-900 dark:text-gray-100"><strong>ID da Entidade:</strong> <span className="text-gray-700 dark:text-gray-300">{log.entity_id}</span></p>
          )}
          {log.ip_address && (
            <p className="text-gray-900 dark:text-gray-100"><strong>IP:</strong> <span className="text-gray-700 dark:text-gray-300">{String(log.ip_address)}</span></p>
          )}
          {log.user_agent && (
            <p className="text-gray-900 dark:text-gray-100"><strong>User Agent:</strong> <span className="text-gray-700 dark:text-gray-300">{log.user_agent}</span></p>
          )}
          {log.details && (
            <details className="mt-2">
              <summary className="cursor-pointer text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                Ver detalhes
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto text-gray-900 dark:text-gray-100">
                {formatLogDetails(log.details)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};
