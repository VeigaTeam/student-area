
import React from 'react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockClasses } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const todayClasses = mockClasses.filter(c => 
    c.date.toDateString() === new Date().toDateString()
  ).length;
  const monthlyRevenue = mockStudents
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.plan.monthlyPrice, 0);

  if (user?.role === 'student') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user.name}! 💪
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
  }

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

export default Dashboard;
