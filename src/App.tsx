
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { Layout } from "@/components/Layout/Layout";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Schedule from "./pages/Schedule";
import ScheduleSettings from "./pages/ScheduleSettings";
import Plans from "./pages/Plans";
import PlansManagement from "./pages/PlansManagement";
import UserManagement from "./pages/UserManagement";
import Financial from "./pages/Financial";
import SystemLogs from "./pages/SystemLogs";
import MySchedule from "./pages/MySchedule";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="students" element={<Students />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="schedule-settings" element={<ScheduleSettings />} />
                  <Route path="plans" element={<Plans />} />
                  <Route path="plans-management" element={<PlansManagement />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="financial" element={<Financial />} />
                  <Route path="system-logs" element={<SystemLogs />} />
                  <Route path="my-schedule" element={<MySchedule />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
