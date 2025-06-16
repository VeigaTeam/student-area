
import React from 'react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { mockStudents, mockClasses } from '@/data/mockData';

interface AdminDashboardProps {
  activeStudents: number;
  todayClasses: number;
  monthlyRevenue: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeStudents,
  todayClasses,
  monthlyRevenue,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Visão geral da sua academia - VeigaTeam
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Alunos Ativos"
          value={activeStudents}
          description={`${mockStudents.length} total de alunos`}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Aulas Hoje"
          value={todayClasses}
          description="Agendamentos confirmados"
          icon={Calendar}
        />
        <StatsCard
          title="Receita Mensal"
          value={`R$ ${monthlyRevenue.toLocaleString()}`}
          description="Planos ativos"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Taxa de Frequência"
          value="87%"
          description="Média de comparecimento"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aulas de Hoje</CardTitle>
            <CardDescription>Horários e ocupação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{classItem.title}</h4>
                    <p className="text-sm text-gray-600">
                      {classItem.startTime} - {classItem.endTime} | {classItem.instructor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {classItem.enrolledStudents.length}/{classItem.maxStudents}
                    </p>
                    <p className="text-xs text-gray-500">alunos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novos Alunos</CardTitle>
            <CardDescription>Últimos cadastros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.slice(-3).map((student) => (
                <div key={student.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.plan.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
