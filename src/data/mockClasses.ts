
import { ClassSchedule } from '@/types/schedule';

export const mockClasses: ClassSchedule[] = [
  {
    id: '1',
    title: 'Muay Thai Iniciante',
    modality: 'Muay Thai',
    instructor: 'Ana Silva',
    date: new Date(),
    startTime: '07:00',
    endTime: '08:00',
    maxStudents: 15,
    enrolledStudents: ['1', '2', '3', '4', '5'],
    location: 'Sala 1',
    description: 'Aula focada em técnicas básicas e condicionamento físico'
  },
  {
    id: '2',
    title: 'Funcional Cross',
    modality: 'Funcional',
    instructor: 'Carlos Santos',
    date: new Date(),
    startTime: '08:30',
    endTime: '09:15',
    maxStudents: 20,
    enrolledStudents: ['6', '7', '8', '9'],
    location: 'Área Externa',
    description: 'Treino funcional com foco em força e resistência'
  },
  {
    id: '3',
    title: 'Yoga Flow',
    modality: 'Yoga',
    instructor: 'Maria Oliveira',
    date: new Date(),
    startTime: '18:00',
    endTime: '19:00',
    maxStudents: 12,
    enrolledStudents: ['10', '11', '12'],
    location: 'Sala 2',
    description: 'Sequências fluidas de yoga para relaxamento e flexibilidade'
  },
  {
    id: '4',
    title: 'CrossFit WOD',
    modality: 'CrossFit',
    instructor: 'Roberto Lima',
    date: new Date(),
    startTime: '19:30',
    endTime: '20:30',
    maxStudents: 10,
    enrolledStudents: ['13', '14', '15', '16', '17', '18', '19', '20'],
    location: 'Box CrossFit',
    description: 'Workout of the Day com exercícios de alta intensidade'
  },
  {
    id: '5',
    title: 'Muay Thai Avançado',
    modality: 'Muay Thai',
    instructor: 'Ana Silva',
    date: new Date(),
    startTime: '20:00',
    endTime: '21:00',
    maxStudents: 12,
    enrolledStudents: ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
    location: 'Sala 1',
    description: 'Técnicas avançadas e sparring controlado'
  }
];
