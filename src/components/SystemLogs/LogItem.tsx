
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
    if (action.includes('create') || action.includes('signup')) return 'bg-green-100 text-green-800';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-100 text-blue-800';
    if (action.includes('delete') || action.includes('remove')) return 'bg-red-100 text-red-800';
    if (action.includes('login') || action.includes('auth')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getEntityIcon = (entityType: string) => {
    return <AlertCircle className="w-4 h-4" />;
  };

  const formatLogDetails = (details: any): string => {
    if (!details) return '-';
    if (typeof details === 'string') return details;
    return JSON.stringify(details, null, 2);
  };

  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-shrink-0">
        {getEntityIcon(log.entity_type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <Badge className={getActionColor(log.action)}>
            {log.action}
          </Badge>
          <Badge variant="outline">
            {log.entity_type}
          </Badge>
          <span className="text-xs text-gray-500">
            {format(new Date(log.created_at || ''), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
          </span>
        </div>
        
        <div className="text-sm space-y-1">
          <p><strong>Usuário:</strong> {log.user_id || 'Sistema'}</p>
          {log.entity_id && (
            <p><strong>ID da Entidade:</strong> {log.entity_id}</p>
          )}
          {log.ip_address && (
            <p><strong>IP:</strong> {log.ip_address}</p>
          )}
          {log.user_agent && (
            <p><strong>User Agent:</strong> {log.user_agent}</p>
          )}
          {log.details && (
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                Ver detalhes
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {String(formatLogDetails(log.details))}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};
