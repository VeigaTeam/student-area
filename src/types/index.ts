
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  weeklyClasses: number;
  modalities: string[];
  popular?: boolean;
  features: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  plan: Plan;
  status: 'active' | 'inactive' | 'overdue';
  joinDate: Date;
  avatar?: string;
  address?: string;
  emergencyContact?: string;
  medicalNotes?: string;
}

export interface ClassSchedule {
  id: string;
  title: string;
  modality: string;
  instructor: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxStudents: number;
  enrolledStudents: string[];
  location: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  method?: string;
}
