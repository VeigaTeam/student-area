
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, MapPin, X } from 'lucide-react';
import { mockClasses } from '@/data/mockData';
import { ClassSchedule } from '@/types/schedule';
import { toast } from '@/hooks/use-toast';

const MySchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myClasses] = useState<ClassSchedule[]>(
    mockClasses.filter(classItem => 
      classItem.enrolledStudents.some(student => student.includes('João'))
    )
  );

  const handleCancelBooking = (classItem: ClassSchedule) => {
    toast({
      title: "Agendamento cancelado",
      description: `Seu agendamento para ${classItem.title} foi cancelado.`,
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
    return <Badge className="bg-green-100 text-green-800">Confirmada</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Aulas</h1>
          <p className="mt-1 text-sm text-gray-600">
            {formatDate(selectedDate)}
          </p>
        </div>
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
            {myClasses.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">Você não tem aulas agendadas no momento.</p>
                </CardContent>
              </Card>
            ) : (
              myClasses.map((classItem) => (
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
                        <Button 
                          variant="outline" 
                          onClick={() => handleCancelBooking(classItem)}
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
