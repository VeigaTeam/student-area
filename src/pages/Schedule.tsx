
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Users, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockClasses } from '@/data/mockData';
import { ClassSchedule } from '@/types/schedule';
import { toast } from '@/hooks/use-toast';

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState<ClassSchedule[]>(mockClasses);
  const isAdmin = user?.role === 'admin';

  const handleBookClass = (classItem: ClassSchedule) => {
    if (classItem.enrolledStudents.length >= classItem.maxStudents) {
      toast({
        title: "Aula lotada",
        description: "Esta aula já atingiu o número máximo de alunos.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Aula agendada",
      description: `Você foi inscrito na aula de ${classItem.title}.`,
    });
  };

  const handleCancelBooking = (classItem: ClassSchedule) => {
    toast({
      title: "Agendamento cancelado",
      description: `Seu agendamento para ${classItem.title} foi cancelado.`,
    });
  };

  const handleCreateClass = () => {
    toast({
      title: "Nova Aula",
      description: "Funcionalidade de criação de aula em desenvolvimento.",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (classItem: ClassSchedule) => {
    const occupancy = (classItem.enrolledStudents.length / classItem.maxStudents) * 100;
    
    if (occupancy >= 100) {
      return <Badge className="bg-red-100 text-red-800">Lotada</Badge>;
    } else if (occupancy >= 80) {
      return <Badge className="bg-yellow-100 text-yellow-800">Quase Lotada</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Disponível</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Gerenciar Agendamentos' : 'Minhas Aulas'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {formatDate(selectedDate)}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleCreateClass} className="bg-gradient-fitness hover:bg-emerald-600">
            <Plus className="mr-2 h-4 w-4" />
            Nova Aula
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Calendario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const date = new Date();
                  date.setDate(date.getDate() + offset);
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <button
                      key={offset}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">
                        {date.toLocaleDateString('pt-BR', { weekday: 'long' })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {date.toLocaleDateString('pt-BR')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{classItem.title}</h3>
                        {getStatusBadge(classItem)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {classItem.enrolledStudents.length}/{classItem.maxStudents} alunos
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {classItem.location}
                        </div>
                        <div className="flex items-center">
                          <Badge variant="secondary">{classItem.modality}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Instrutor:</strong> {classItem.instructor}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {isAdmin ? (
                        <>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            onClick={() => handleBookClass(classItem)}
                            disabled={classItem.enrolledStudents.length >= classItem.maxStudents}
                            className="bg-gradient-fitness hover:bg-emerald-600"
                            size="sm"
                          >
                            Agendar
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleCancelBooking(classItem)}
                            size="sm"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
