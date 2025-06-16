
import { Plan, Student, ClassSchedule } from '@/types';

export const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Basic',
    description: 'Ideal para iniciantes',
    monthlyPrice: 89,
    weeklyClasses: 2,
    modalities: ['Funcional'],
    features: [
      'Acesso à área de musculação',
      '2 aulas funcionais por semana',
      'Avaliação física inicial',
      'Suporte básico'
    ]
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Para quem quer mais variedade',
    monthlyPrice: 149,
    weeklyClasses: 4,
    modalities: ['Funcional', 'Muay Thai'],
    popular: true,
    features: [
      'Acesso à área de musculação',
      '4 aulas por semana',
      'Funcional + Muay Thai',
      'Avaliação física mensal',
      'Plano nutricional básico',
      'Suporte prioritário'
    ]
  },
  {
    id: '3',
    name: 'Elite',
    description: 'Acesso completo',
    monthlyPrice: 199,
    weeklyClasses: 0, // Ilimitado
    modalities: ['Funcional', 'Muay Thai', 'Yoga', 'Crossfit'],
    features: [
      'Acesso completo a todas as modalidades',
      'Aulas ilimitadas',
      'Personal trainer 1x por semana',
      'Avaliação física quinzenal',
      'Plano nutricional completo',
      'Acesso a eventos exclusivos',
      'Suporte VIP'
    ]
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    birthDate: new Date('1990-05-15'),
    plan: mockPlans[1],
    status: 'active',
    joinDate: new Date('2024-01-15'),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    birthDate: new Date('1985-08-22'),
    plan: mockPlans[2],
    status: 'active',
    joinDate: new Date('2024-02-01'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(11) 77777-7777',
    birthDate: new Date('1992-12-10'),
    plan: mockPlans[0],
    status: 'overdue',
    joinDate: new Date('2023-11-20'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const mockClasses: ClassSchedule[] = [
  {
    id: '1',
    title: 'Funcional Matinal',
    modality: 'Funcional',
    instructor: 'Carlos Fitness',
    date: new Date('2024-12-17'),
    startTime: '07:00',
    endTime: '08:00',
    maxStudents: 15,
    enrolledStudents: ['1', '2'],
    location: 'Sala 1'
  },
  {
    id: '2',
    title: 'Muay Thai Intermediário',
    modality: 'Muay Thai',
    instructor: 'Ana Fighter',
    date: new Date('2024-12-17'),
    startTime: '19:00',
    endTime: '20:00',
    maxStudents: 12,
    enrolledStudents: ['2'],
    location: 'Sala 2'
  },
  {
    id: '3',
    title: 'Yoga Relaxante',
    modality: 'Yoga',
    instructor: 'Lucia Zen',
    date: new Date('2024-12-18'),
    startTime: '18:00',
    endTime: '19:00',
    maxStudents: 20,
    enrolledStudents: [],
    location: 'Sala 3'
  }
];
