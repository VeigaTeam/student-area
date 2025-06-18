
-- Criar tabela para configurações de agendamento
CREATE TABLE public.schedule_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advance_booking_days INTEGER NOT NULL DEFAULT 7,
  max_bookings_per_day INTEGER NOT NULL DEFAULT 3,
  cancellation_deadline_hours INTEGER NOT NULL DEFAULT 24,
  auto_approve_bookings BOOLEAN NOT NULL DEFAULT false,
  booking_window_start TIME NOT NULL DEFAULT '06:00:00',
  booking_window_end TIME NOT NULL DEFAULT '22:00:00',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para logs do sistema
CREATE TABLE public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para aprovação de agendamentos
CREATE TABLE public.booking_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar colunas para aprovação na tabela bookings
ALTER TABLE public.bookings ADD COLUMN approval_required BOOLEAN DEFAULT false;
ALTER TABLE public.bookings ADD COLUMN approval_status TEXT DEFAULT 'approved' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Criar políticas RLS para schedule_settings
ALTER TABLE public.schedule_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage schedule settings" ON public.schedule_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view schedule settings" ON public.schedule_settings
  FOR SELECT USING (true);

-- Criar políticas RLS para system_logs
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logs" ON public.system_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert logs" ON public.system_logs
  FOR INSERT WITH CHECK (true);

-- Criar políticas RLS para booking_approvals
ALTER TABLE public.booking_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage booking approvals" ON public.booking_approvals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Inserir configuração padrão de agendamento
INSERT INTO public.schedule_settings (
  advance_booking_days,
  max_bookings_per_day,
  cancellation_deadline_hours,
  auto_approve_bookings,
  booking_window_start,
  booking_window_end
) VALUES (7, 3, 24, true, '06:00:00', '22:00:00');

-- Criar função para registrar logs automaticamente
CREATE OR REPLACE FUNCTION public.log_action(
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.system_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    details
  ) VALUES (
    auth.uid(),
    p_action,
    p_entity_type,
    p_entity_id,
    p_details
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schedule_settings_updated_at
  BEFORE UPDATE ON public.schedule_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_booking_approvals_updated_at
  BEFORE UPDATE ON public.booking_approvals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
