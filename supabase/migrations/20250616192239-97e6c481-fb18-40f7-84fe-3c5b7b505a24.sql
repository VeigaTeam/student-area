
-- Criar tabela de planos
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  monthly_price DECIMAL(10,2) NOT NULL,
  weekly_classes INTEGER NOT NULL,
  modalities TEXT[] NOT NULL DEFAULT '{}',
  popular BOOLEAN DEFAULT false,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de estudantes
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  birth_date DATE,
  plan_id UUID REFERENCES public.plans(id),
  status TEXT CHECK (status IN ('active', 'inactive', 'overdue')) DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  avatar TEXT,
  address TEXT,
  emergency_contact TEXT,
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de modalidades
CREATE TABLE public.modalities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 60,
  max_students INTEGER NOT NULL DEFAULT 15,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de aulas/cronograma
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  modality_id UUID REFERENCES public.modalities(id),
  instructor TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 15,
  location TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de reservas
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id),
  class_id UUID REFERENCES public.classes(id),
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancel_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, class_id)
);

-- Criar tabela de pagamentos
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT CHECK (status IN ('pending', 'paid', 'overdue')) DEFAULT 'pending',
  method TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de notificações
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'warning', 'success', 'error')) DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para administradores (todos os dados)
CREATE POLICY "Admins can view all plans" ON public.plans FOR ALL USING (true);
CREATE POLICY "Admins can view all students" ON public.students FOR ALL USING (true);
CREATE POLICY "Admins can view all modalities" ON public.modalities FOR ALL USING (true);
CREATE POLICY "Admins can view all classes" ON public.classes FOR ALL USING (true);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR ALL USING (true);
CREATE POLICY "Admins can view all payments" ON public.payments FOR ALL USING (true);

-- Políticas RLS para estudantes (apenas seus próprios dados)
CREATE POLICY "Students can view their own data" ON public.students 
  FOR SELECT USING (user_id = auth.uid());
  
CREATE POLICY "Students can view their own bookings" ON public.bookings 
  FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));
  
CREATE POLICY "Students can create their own bookings" ON public.bookings 
  FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));
  
CREATE POLICY "Students can cancel their own bookings" ON public.bookings 
  FOR UPDATE USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can view their own payments" ON public.payments 
  FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can view their own notifications" ON public.notifications 
  FOR SELECT USING (user_id = auth.uid());
  
CREATE POLICY "Students can update their own notifications" ON public.notifications 
  FOR UPDATE USING (user_id = auth.uid());

-- Políticas para visualização pública de dados básicos
CREATE POLICY "Anyone can view plans" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Anyone can view modalities" ON public.modalities FOR SELECT USING (true);
CREATE POLICY "Anyone can view classes" ON public.classes FOR SELECT USING (true);

-- Inserir dados iniciais
INSERT INTO public.plans (name, description, monthly_price, weekly_classes, modalities, popular, features) VALUES
('Básico', 'Ideal para quem está começando', 79.90, 2, ARRAY['Musculação', 'Cardio'], false, ARRAY['Acesso à área de musculação', '2 aulas por semana']),
('Premium', 'Para quem busca alta performance', 149.90, 5, ARRAY['Musculação', 'Cardio', 'Funcional', 'Yoga'], true, ARRAY['Acesso ilimitado à academia', 'Acesso a todas as modalidades', 'Acompanhamento personalizado']),
('Intermediário', 'Equilíbrio entre custo e benefício', 119.90, 3, ARRAY['Musculação', 'Cardio', 'Funcional'], false, ARRAY['Acesso à área de musculação', 'Acesso a aulas de funcional', '3 aulas por semana']);

INSERT INTO public.modalities (name, color, duration, max_students, description) VALUES
('Muay Thai', 'bg-red-500', 60, 15, 'Arte marcial tailandesa focada em técnicas de striking'),
('Funcional', 'bg-blue-500', 45, 20, 'Treino funcional com movimentos naturais do corpo'),
('Yoga', 'bg-green-500', 60, 12, 'Prática milenar que combina posturas, respiração e meditação'),
('CrossFit', 'bg-orange-500', 60, 10, 'Treino de alta intensidade com exercícios variados');
