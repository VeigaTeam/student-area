
import React from 'react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText } from 'lucide-react';
import { mockClasses } from '@/data/mockData';

interface StudentDashboardProps {
  userName: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ userName }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {userName}! 💪
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Acompanhe suas atividades e progresso na academia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Aulas desta semana"
          value={4}
          description="De 4 aulas permitidas"
          icon={Calendar}
        />
        <StatsCard
          title="Próxima aula"
          value="Hoje 19h"
          description="Muay Thai com Ana"
          icon={Clock}
        />
        <StatsCard
          title="Plano atual"
          value="Premium"
          description="Renovação em 15 dias"
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Aulas</CardTitle>
            <CardDescription>Suas aulas agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClasses.slice(0, 3).map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{classItem.title}</h4>
                    <p className="text-sm text-gray-600">
                      {classItem.startTime} - {classItem.endTime} | {classItem.instructor}
                    </p>
                  </div>
                  <Badge variant="secondary">{classItem.modality}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Presença</CardTitle>
            <CardDescription>Últimas 4 semanas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Semana atual</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Semana passada</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
