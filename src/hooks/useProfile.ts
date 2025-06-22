import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'student';
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('Usuário não encontrado para carregar perfil');
        return null;
      }
      
      console.log('Carregando perfil para usuário:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Erro ao carregar perfil:', error);
          throw error;
        }
        
        // Se o perfil não existe, vamos criá-lo
        if (!data) {
          console.log('Perfil não encontrado, criando novo perfil...');
          const newProfile = {
            id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário',
            email: user.email || '',
            role: user.email === 'admin@veigateam.com' ? 'admin' as const : 'student' as const,
            avatar_url: user.user_metadata?.avatar_url || null,
            phone: user.user_metadata?.phone || null,
          };

          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single();

          if (createError) {
            console.error('Erro ao criar perfil:', createError);
            throw createError;
          }

          console.log('Perfil criado com sucesso:', createdProfile);
          return createdProfile as Profile;
        }
        
        console.log('Perfil carregado com sucesso:', data);
        return data as Profile;
      } catch (err) {
        console.error('Erro no useProfile:', err);
        throw err;
      }
    },
    enabled: !!user,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};

export const useAllProfiles = () => {
  return useQuery({
    queryKey: ['all-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });
};
