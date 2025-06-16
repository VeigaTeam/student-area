
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
  description?: string;
}

export interface ScheduleConfig {
  id: string;
  modality: string;
  duration: number; // em minutos
  maxStudents: number;
  availableDays: number[]; // 0-6 (domingo-sábado)
  timeSlots: string[];
  instructor: string;
  location: string;
}

export interface Booking {
  id: string;
  studentId: string;
  classId: string;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
  cancelledAt?: Date;
  cancelReason?: string;
}
