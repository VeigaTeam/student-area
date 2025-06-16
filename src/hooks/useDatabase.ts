
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

// Types
type Plan = Tables<'plans'>;
type Student = Tables<'students'>;
type ClassSchedule = Tables<'classes'>;
type Booking = Tables<'bookings'>;
type Payment = Tables<'payments'>;
type Notification = Tables<'notifications'>;

// Plans
export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('monthly_price');
      
      if (error) throw error;
      return data;
    },
  });
};

// Students
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          plan:plans(*)
        `)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

// Classes
export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          modality:modalities(*)
        `)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
};

// Bookings for current user
export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          class:classes(*,
            modality:modalities(*)
          ),
          student:students(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Payments
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          student:students(*)
        `)
        .order('due_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Mutations
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (booking: TablesInsert<'bookings'>) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancel_reason: reason,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
