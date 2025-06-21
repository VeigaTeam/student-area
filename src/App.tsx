
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/Layout/Layout';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import Students from '@/pages/Students';
import Schedule from '@/pages/Schedule';
import MySchedule from '@/pages/MySchedule';
import Plans from '@/pages/Plans';
import Financial from '@/pages/Financial';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import ScheduleSettings from '@/pages/ScheduleSettings';
import PlansManagement from '@/pages/PlansManagement';
import SystemLogs from '@/pages/SystemLogs';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/my-schedule" element={<MySchedule />} />
                      <Route path="/schedule-settings" element={<ScheduleSettings />} />
                      <Route path="/plans" element={<Plans />} />
                      <Route path="/plans-management" element={<PlansManagement />} />
                      <Route path="/financial" element={<Financial />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/system-logs" element={<SystemLogs />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
