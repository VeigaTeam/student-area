
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useSystemLogs, useSystemLogsCount } from '@/hooks/useSystemLogs';
import { LogsHeader } from '@/components/SystemLogs/LogsHeader';
import { LogFilters } from '@/components/SystemLogs/LogFilters';
import { LogItem } from '@/components/SystemLogs/LogItem';
import { LogsPagination } from '@/components/SystemLogs/LogsPagination';
import { useLogsExport } from '@/components/SystemLogs/LogsExport';

const SystemLogs: React.FC = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const { data: logs, isLoading } = useSystemLogs(page);
  const { data: totalCount } = useSystemLogsCount();
  const { exportLogs } = useLogsExport();

  const filteredLogs = logs?.filter(log => {
    const matchesFilter = filter === 'all' || log.entity_type === filter;
    const matchesSearch = search === '' || 
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    if (filteredLogs) {
      exportLogs(filteredLogs);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Carregando logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 min-h-full">
      <LogsHeader onExport={handleExport} />

      <LogFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Atividades Recentes</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {totalCount ? `${totalCount} registros encontrados` : 'Carregando...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs && filteredLogs.length > 0 ? (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <LogItem key={log.id} log={log} />
              ))}
              
              <LogsPagination
                page={page}
                setPage={setPage}
                hasMoreLogs={!!(logs && logs.length >= 50)}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhum log encontrado</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {search || filter !== 'all' ? 'Tente ajustar os filtros' : 'Os logs aparecerão aqui conforme o sistema for usado'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
