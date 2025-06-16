
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Layout } from "@/components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-fitness rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-2xl">VT</span>
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {user.role === 'admin' && (
          <>
            <Route path="/students" element={<Students />} />
            <Route path="/schedule" element={<div>Agendamentos (em desenvolvimento)</div>} />
            <Route path="/financial" element={<div>Financeiro (em desenvolvimento)</div>} />
            <Route path="/settings" element={<div>Configurações (em desenvolvimento)</div>} />
          </>
        )}
        {user.role === 'student' && (
          <>
            <Route path="/my-schedule" element={<div>Minhas Aulas (em desenvolvimento)</div>} />
            <Route path="/profile" element={<div>Perfil (em desenvolvimento)</div>} />
          </>
        )}
        <Route path="/plans" element={<Plans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
