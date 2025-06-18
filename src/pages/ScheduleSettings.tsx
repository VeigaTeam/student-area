
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useScheduleSettings, useUpdateScheduleSettings } from '@/hooks/useScheduleSettings';
import { useBookingApprovals, useUpdateBookingApproval } from '@/hooks/useBookingApprovals';
import { toast } from '@/hooks/use-toast';

const ScheduleSettings: React.FC = () => {
  const { data: settings, isLoading } = useScheduleSettings();
  const { data: approvals } = useBookingApprovals();
  const updateSettings = useUpdateScheduleSettings();
  const updateApproval = useUpdateBookingApproval();

  const handleSaveSettings = async (formData: FormData) => {
    if (!settings) return;

    try {
      const updates = {
        id: settings.id,
        advance_booking_days: parseInt(formData.get('advance_booking_days') as string),
        max_bookings_per_day: parseInt(formData.get('max_bookings_per_day') as string),
        cancellation_deadline_hours: parseInt(formData.get('cancellation_deadline_hours') as string),
        auto_approve_bookings: formData.get('auto_approve_bookings') === 'on',
        booking_window_start: formData.get('booking_window_start') as string,
        booking_window_end: formData.get('booking_window_end') as string,
      };

      await updateSettings.mutateAsync(updates);
      toast({
        title: "Configurações salvas",
        description: "As configurações de agendamento foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  const handleApprovalAction = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      await updateApproval.mutateAsync({
        id,
        updates: { status, notes, admin_id: null }
      });
      toast({
        title: "Agendamento atualizado",
        description: `Agendamento ${status === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o agendamento.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">VT</span>
          </div>
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Settings className="mr-3 h-6 w-6" />
          Configurações de Agendamento
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie regras e aprovações de agendamentos
        </p>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="approvals">Aprovações</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Regras de Agendamento
              </CardTitle>
              <CardDescription>
                Configure as regras para agendamentos de aulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="advance_booking_days">Dias de antecedência</Label>
                    <Input
                      id="advance_booking_days"
                      name="advance_booking_days"
                      type="number"
                      defaultValue={settings?.advance_booking_days}
                      min="1"
                      max="30"
                    />
                    <p className="text-xs text-gray-500">Máximo de dias para agendar com antecedência</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max_bookings_per_day">Agendamentos por dia</Label>
                    <Input
                      id="max_bookings_per_day"
                      name="max_bookings_per_day"
                      type="number"
                      defaultValue={settings?.max_bookings_per_day}
                      min="1"
                      max="10"
                    />
                    <p className="text-xs text-gray-500">Máximo de agendamentos por aluno por dia</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellation_deadline_hours">Prazo para cancelamento (horas)</Label>
                  <Input
                    id="cancellation_deadline_hours"
                    name="cancellation_deadline_hours"
                    type="number"
                    defaultValue={settings?.cancellation_deadline_hours}
                    min="1"
                    max="72"
                  />
                  <p className="text-xs text-gray-500">Horas mínimas antes da aula para cancelar</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="booking_window_start">Horário inicial</Label>
                    <Input
                      id="booking_window_start"
                      name="booking_window_start"
                      type="time"
                      defaultValue={settings?.booking_window_start}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="booking_window_end">Horário final</Label>
                    <Input
                      id="booking_window_end"
                      name="booking_window_end"
                      type="time"
                      defaultValue={settings?.booking_window_end}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Aprovação automática</Label>
                    <p className="text-sm text-gray-600">Aprovar agendamentos automaticamente</p>
                  </div>
                  <Switch
                    name="auto_approve_bookings"
                    defaultChecked={settings?.auto_approve_bookings}
                  />
                </div>

                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Salvar Configurações
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Aprovações Pendentes
              </CardTitle>
              <CardDescription>
                Gerencie agendamentos que precisam de aprovação
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvals && approvals.length > 0 ? (
                <div className="space-y-4">
                  {approvals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={
                              approval.status === 'pending' ? 'secondary' :
                              approval.status === 'approved' ? 'default' : 'destructive'
                            }
                          >
                            {approval.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {approval.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {approval.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                            {approval.status === 'pending' ? 'Pendente' :
                             approval.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                          </Badge>
                        </div>
                        <p className="font-medium">Aula solicitada</p>
                        <p className="text-sm text-gray-600">
                          Data: {new Date(approval.created_at || '').toLocaleDateString('pt-BR')}
                        </p>
                        {approval.notes && (
                          <p className="text-sm text-gray-500 mt-1">Observações: {approval.notes}</p>
                        )}
                      </div>
                      
                      {approval.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprovalAction(approval.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApprovalAction(approval.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma aprovação pendente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleSettings;
