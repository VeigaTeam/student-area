
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useSupabaseAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    console.log('Configurando listener de autenticação...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', { event, session: !!session, user: !!session?.user });
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Sessão inicial:', { session: !!session, error });
      if (error) {
        console.error('Erro ao obter sessão:', error);
      }
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });

    return () => {
      console.log('Cleanup auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    console.log('Tentando cadastrar usuário:', { email, name });
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name,
        }
      }
    });

    console.log('Resultado do cadastro:', { data: !!data, error });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Tentando fazer login:', { email });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Resultado do login:', { 
        data: !!data, 
        error, 
        user: !!data?.user, 
        session: !!data?.session 
      });
      
      if (error) {
        console.error('Erro detalhado no login:', error);
      }
      
      return { data, error };
    } catch (err) {
      console.error('Erro crítico no login:', err);
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    console.log('Fazendo logout...');
    const { error } = await supabase.auth.signOut();
    console.log('Resultado do logout:', { error });
    return { error };
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
  };
};
