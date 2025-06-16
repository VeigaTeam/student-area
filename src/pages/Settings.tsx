
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Bell, Clock, Users, Calendar, Trash2, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    classReminders: true,
    paymentReminders: true,
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { start: '06:00', end: '22:00', enabled: true },
    tuesday: { start: '06:00', end: '22:00', enabled: true },
    wednesday: { start: '06:00', end: '22:00', enabled: true },
    thursday: { start: '06:00', end: '22:00', enabled: true },
    friday: { start: '06:00', end: '22:00', enabled: true },
    saturday: { start: '08:00', end: '18:00', enabled: true },
    sunday: { start: '08:00', end: '16:00', enabled: false },
  });

  const [modalities, setModalities] = useState([
    { id: '1', name: 'Muay Thai', color: 'bg-red-500', duration: 60, maxStudents: 15 },
    { id: '2', name: 'Funcional', color: 'bg-blue-500', duration: 45, maxStudents: 20 },
    { id: '3', name: 'Yoga', color: 'bg-green-500', duration: 60, maxStudents: 12 },
    { id: '4', name: 'CrossFit', color: 'bg-orange-500', duration: 60, maxStudents: 10 },
  ]);

  const handleSaveNotifications = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de notificação foram atualizadas.",
    });
  };

  const handleSaveBusinessHours = () => {
    toast({
      title: "Horários atualizados",
      description: "Os horários de funcionamento foram salvos.",
    });
  };

  const handleAddModality = () => {
    toast({
      title: "Nova Modalidade",
      description: "Funcionalidade de adicionar modalidade em desenvolvimento.",
    });
  };

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon className="mr-3 h-6 w-6" />
          Configurações
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie as configurações do sistema e preferências
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="schedule">Horários</TabsTrigger>
          <TabsTrigger value="modalities">Modalidades</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações por Email</Label>
                  <p className="text-sm text-gray-600">Receber emails sobre atualizações importantes</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações Push</Label>
                  <p className="text-sm text-gray-600">Receber notificações no navegador</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Lembretes de Aula</Label>
                  <p className="text-sm text-gray-600">Receber lembretes antes das aulas</p>
                </div>
                <Switch
                  checked={notifications.classReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, classReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Lembretes de Pagamento</Label>
                  <p className="text-sm text-gray-600">Receber lembretes sobre vencimentos</p>
                </div>
                <Switch
                  checked={notifications.paymentReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, paymentReminders: checked})}
                />
              </div>

              <Button onClick={handleSaveNotifications} className="bg-gradient-fitness hover:bg-emerald-600">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Horários de Funcionamento
              </CardTitle>
              <CardDescription>
                Configure os horários de funcionamento da academia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={hours.enabled}
                      onCheckedChange={(checked) => 
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, enabled: checked }
                        })
                      }
                    />
                    <Label className="min-w-[120px]">{dayNames[day as keyof typeof dayNames]}</Label>
                  </div>
                  
                  {hours.enabled && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) => 
                          setBusinessHours({
                            ...businessHours,
                            [day]: { ...hours, start: e.target.value }
                          })
                        }
                        className="w-24"
                      />
                      <span>até</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) => 
                          setBusinessHours({
                            ...businessHours,
                            [day]: { ...hours, end: e.target.value }
                          })
                        }
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              ))}
              
              <Button onClick={handleSaveBusinessHours} className="bg-gradient-fitness hover:bg-emerald-600">
                Salvar Horários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modalities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Modalidades
                </div>
                <Button onClick={handleAddModality} size="sm" className="bg-gradient-fitness hover:bg-emerald-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </CardTitle>
              <CardDescription>
                Gerencie as modalidades oferecidas na academia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modalities.map((modality) => (
                  <div key={modality.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${modality.color}`}></div>
                      <div>
                        <h4 className="font-medium">{modality.name}</h4>
                        <p className="text-sm text-gray-600">
                          {modality.duration} min • Máx. {modality.maxStudents} alunos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{modality.maxStudents} alunos</Badge>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome da Academia</Label>
                  <Input defaultValue="VeigaTeam Academia" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="(11) 99999-9999" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Endereço</Label>
                <Input defaultValue="Rua das Academias, 123 - Centro" />
              </div>

              <div className="space-y-2">
                <Label>Política de Cancelamento</Label>
                <Select defaultValue="2h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hora antes</SelectItem>
                    <SelectItem value="2h">2 horas antes</SelectItem>
                    <SelectItem value="4h">4 horas antes</SelectItem>
                    <SelectItem value="24h">24 horas antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-gradient-fitness hover:bg-emerald-600">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
