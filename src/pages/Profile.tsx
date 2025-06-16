
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Calendar, Edit, Save, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 99999-9999',
    birthDate: '1990-01-01',
    emergencyContact: '(11) 88888-8888',
    address: 'Rua das Flores, 123 - Centro',
  });

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    toast({
      title: "Upload de foto",
      description: "Funcionalidade de upload em desenvolvimento.",
    });
  };

  // Mock data para histórico de aulas do aluno
  const classHistory = [
    { id: '1', title: 'Muay Thai', date: '2024-12-15', instructor: 'Ana Silva', status: 'completed' },
    { id: '2', title: 'Funcional', date: '2024-12-13', instructor: 'Carlos Santos', status: 'completed' },
    { id: '3', title: 'Yoga', date: '2024-12-11', instructor: 'Maria Oliveira', status: 'cancelled' },
  ];

  const currentPlan = {
    name: 'Premium',
    price: 150,
    classesPerWeek: 4,
    nextBilling: '2024-12-30',
    status: 'active'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar com foto e informações básicas */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  onClick={handlePhotoUpload}
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="mt-4 text-lg font-semibold">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              
              <div className="mt-4 space-y-2">
                <Badge className="bg-emerald-100 text-emerald-800">
                  {user?.role === 'admin' ? 'Administrador' : 'Aluno'}
                </Badge>
                {user?.role === 'student' && (
                  <Badge className="bg-blue-100 text-blue-800">
                    Plano {currentPlan.name}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {user?.role === 'student' && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Plano Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plano:</span>
                  <span className="font-semibold">{currentPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-semibold">R$ {currentPlan.price}/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aulas/semana:</span>
                  <span className="font-semibold">{currentPlan.classesPerWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Próximo vencimento:</span>
                  <span className="font-semibold">
                    {new Date(currentPlan.nextBilling).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
              {user?.role === 'student' && (
                <>
                  <TabsTrigger value="history">Histórico de Aulas</TabsTrigger>
                  <TabsTrigger value="plan">Gerenciar Plano</TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>
                        Atualize suas informações de contato e dados pessoais
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Contato de Emergência</Label>
                    <Input
                      id="emergency"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {user?.role === 'student' && (
              <>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico de Aulas</CardTitle>
                      <CardDescription>
                        Suas últimas aulas e atividades na academia
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {classHistory.map((classItem) => (
                          <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <Calendar className="h-8 w-8 text-gray-400" />
                              <div>
                                <h4 className="font-medium">{classItem.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(classItem.date).toLocaleDateString('pt-BR')} • {classItem.instructor}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              className={
                                classItem.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            >
                              {classItem.status === 'completed' ? 'Concluída' : 'Cancelada'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="plan">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gerenciar Plano</CardTitle>
                      <CardDescription>
                        Altere seu plano ou gerencie sua assinatura
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 border rounded-lg bg-emerald-50">
                        <h4 className="font-semibold text-emerald-800">Plano Atual: {currentPlan.name}</h4>
                        <p className="text-emerald-600">
                          R$ {currentPlan.price}/mês • {currentPlan.classesPerWeek} aulas por semana
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full" variant="outline">
                          Ver Outros Planos
                        </Button>
                        <Button className="w-full" variant="outline">
                          Pausar Plano
                        </Button>
                        <Button className="w-full" variant="destructive">
                          Cancelar Assinatura
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
