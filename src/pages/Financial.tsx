
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, TrendingDown, Users, Calendar, Download, Eye } from 'lucide-react';
import { mockStudents } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  studentName: string;
  plan: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  method?: string;
}

const Financial: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  
  const mockPayments: Payment[] = [
    {
      id: '1',
      studentName: 'Ana Silva',
      plan: 'Premium',
      amount: 150,
      dueDate: new Date('2024-12-15'),
      paidDate: new Date('2024-12-14'),
      status: 'paid',
      method: 'Cartão de Crédito'
    },
    {
      id: '2',
      studentName: 'Carlos Santos',
      plan: 'Básico',
      amount: 80,
      dueDate: new Date('2024-12-20'),
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'Maria Oliveira',
      plan: 'Intermediário',
      amount: 120,
      dueDate: new Date('2024-12-10'),
      status: 'overdue'
    },
  ];

  const totalRevenue = mockStudents.filter(s => s.status === 'active').reduce((sum, s) => sum + s.plan.monthlyPrice, 0);
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overduePayments = mockPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: Payment['status']) => {
    const variants = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
    };

    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Vencido',
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleExportReport = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório financeiro foi exportado com sucesso.",
    });
  };

  const handleViewDetails = (payment: Payment) => {
    toast({
      title: "Detalhes do pagamento",
      description: `Visualizando detalhes de ${payment.studentName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="mt-1 text-sm text-gray-600">
            Controle financeiro e relatórios da academia
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Mês Atual</SelectItem>
              <SelectItem value="last-month">Mês Anterior</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Ano Atual</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagamentos Pendentes</p>
                <p className="text-2xl font-bold">R$ {pendingPayments.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-600">{mockPayments.filter(p => p.status === 'pending').length} pagamentos</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagamentos Vencidos</p>
                <p className="text-2xl font-bold text-red-600">R$ {overduePayments.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-red-600">{mockPayments.filter(p => p.status === 'overdue').length} em atraso</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alunos Ativos</p>
                <p className="text-2xl font-bold">{mockStudents.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-600">de {mockStudents.length} total</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="plans">Análise por Plano</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Pagamentos</CardTitle>
              <CardDescription>
                Todos os pagamentos do período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Aluno</th>
                      <th className="text-left py-3 px-2">Plano</th>
                      <th className="text-left py-3 px-2">Valor</th>
                      <th className="text-left py-3 px-2">Vencimento</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-2 font-medium">{payment.studentName}</td>
                        <td className="py-4 px-2">{payment.plan}</td>
                        <td className="py-4 px-2">R$ {payment.amount}</td>
                        <td className="py-4 px-2">
                          {payment.dueDate.toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-2">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="py-4 px-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(payment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Receita por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Dezembro 2024</span>
                    <span className="font-semibold">R$ {totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Novembro 2024</span>
                    <span className="font-semibold">R$ {(totalRevenue * 0.9).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Outubro 2024</span>
                    <span className="font-semibold">R$ {(totalRevenue * 0.85).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Inadimplência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {((mockPayments.filter(p => p.status === 'overdue').length / mockPayments.length) * 100).toFixed(1)}%
                    </div>
                    <p className="text-gray-600">dos pagamentos em atraso</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pagos em dia</span>
                      <span>{mockPayments.filter(p => p.status === 'paid').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pendentes</span>
                      <span>{mockPayments.filter(p => p.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Em atraso</span>
                      <span>{mockPayments.filter(p => p.status === 'overdue').length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Plano</CardTitle>
              <CardDescription>
                Receita e número de alunos por tipo de plano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Básico', 'Intermediário', 'Premium'].map((planName) => {
                  const planStudents = mockStudents.filter(s => s.plan.name === planName && s.status === 'active');
                  const planRevenue = planStudents.reduce((sum, s) => sum + s.plan.monthlyPrice, 0);
                  
                  return (
                    <div key={planName} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{planName}</h4>
                        <p className="text-sm text-gray-600">{planStudents.length} alunos ativos</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">R$ {planRevenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">receita mensal</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
