
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface LogFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export const LogFilters: React.FC<LogFiltersProps> = ({
  search,
  setSearch,
  filter,
  setFilter
}) => {
  return (
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
  );
};
