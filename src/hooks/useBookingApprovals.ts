
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesUpdate } from '@/integrations/supabase/types';

type BookingApproval = Tables<'booking_approvals'>;

export const useBookingApprovals = () => {
  return useQuery({
    queryKey: ['booking-approvals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_approvals')
        .select(`
          *,
          booking:bookings(*,
            class:classes(*),
            student:students(*)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateBookingApproval = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TablesUpdate<'booking_approvals'> }) => {
      const { data, error } = await supabase
        .from('booking_approvals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as BookingApproval;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-approvals'] });
    },
  });
};
