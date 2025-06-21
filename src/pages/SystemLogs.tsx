import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Search, Filter, Download } from 'lucide-react';
import { useSystemLogs, useSystemLogsCount } from '@/hooks/useSystemLogs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SystemLogs: React.FC = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const { data: logs, isLoading } = useSystemLogs(page);
  const { data: totalCount } = useSystemLogsCount();

  const filteredLogs = logs?.filter(log => {
    const matchesFilter = filter === 'all' || log.entity_type === filter;
    const matchesSearch = search === '' || 
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

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

  const exportLogs = () => {
    if (!filteredLogs) return;
    
    const csv = [
      ['Data/Hora', 'Usuário', 'Ação', 'Entidade', 'IP', 'Detalhes'].join(','),
      ...filteredLogs.map(log => [
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-muted-foreground">Carregando logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <AlertCircle className="mr-3 h-6 w-6" />
            Logs do Sistema
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitore atividades e eventos do sistema
          </p>
        </div>
        
        <Button onClick={exportLogs} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os logs por tipo de ação ou busque por termos específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar nos logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por entidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as entidades</SelectItem>
                <SelectItem value="user">Usuários</SelectItem>
                <SelectItem value="booking">Agendamentos</SelectItem>
                <SelectItem value="payment">Pagamentos</SelectItem>
                <SelectItem value="student">Alunos</SelectItem>
                <SelectItem value="plan">Planos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>
            {totalCount ? `${totalCount} registros encontrados` : 'Carregando...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs && filteredLogs.length > 0 ? (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
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
                            {formatLogDetails(log.details)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  Anterior
                </Button>
                
                <span className="text-sm text-gray-600">
                  Página {page + 1}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={!logs || logs.length < 50}
                >
                  Próxima
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum log encontrado</p>
              <p className="text-sm text-gray-400">
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
