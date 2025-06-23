import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Navigate, useNavigate } from 'react-router-dom';
export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    user,
    signIn,
    signUp
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Auth - Estado do usuário:', {
      user: !!user
    });
    if (user) {
      console.log('Auth - Usuário autenticado, redirecionando para dashboard');
      navigate('/', {
        replace: true
      });
    }
  }, [user, navigate]);

  // Se já estiver autenticado, redirecionar
  if (user) {
    return <Navigate to="/" replace />;
  }
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Tentando fazer login com:', {
      email
    });
    try {
      const {
        error
      } = await signIn(email, password);
      if (error) {
        console.error('Erro no login:', error);
        toast({
          title: "Erro no login",
          description: error.message || "Email ou senha incorretos.",
          variant: "destructive"
        });
      } else {
        console.log('Login realizado com sucesso');
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao VeigaTeam"
        });
        // O redirecionamento será feito pelo useEffect quando o user state mudar
      }
    } catch (err) {
      console.error('Erro crítico no login:', err);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Tentando cadastrar usuário:', {
      email,
      name
    });
    try {
      const {
        error
      } = await signUp(email, password, name);
      if (error) {
        console.error('Erro no cadastro:', error);
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Cadastro realizado com sucesso');
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar a conta."
        });
        // Limpar os campos após cadastro bem-sucedido
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (err) {
      console.error('Erro crítico no cadastro:', err);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white font-bold text-2xl">VT</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">VeigaTeam</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sistema de Gestão de Academia</p>
        </div>

        <Card className="shadow-2xl border-red-200 dark:border-red-800 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Entre com sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
                <TabsTrigger value="signin" className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white">
                  Cadastrar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email-signin" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input id="email-signin" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" className="border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                  </div>

                  <div>
                    <Label htmlFor="password-signin" className="text-gray-700 dark:text-gray-300">Senha</Label>
                    <Input id="password-signin" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  
                  <div className="text-xs bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="dark:text-gray-300"><strong>Admin:</strong> admin@veigateam.com / 123456</p>
                    <p className="dark:text-gray-300"><strong>Aluno:</strong> joao@email.com / 123456</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome Completo</Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Seu nome completo" className="border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                  </div>

                  <div>
                    <Label htmlFor="email-signup" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input id="email-signup" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" className="border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                  </div>

                  <div>
                    <Label htmlFor="password-signup" className="text-gray-700 dark:text-gray-300">Senha</Label>
                    <Input id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" minLength={6} className="border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;