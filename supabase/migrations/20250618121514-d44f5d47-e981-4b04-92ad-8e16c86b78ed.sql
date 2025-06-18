
-- Corrigir a criação dos usuários de teste com a estrutura correta do Supabase
-- Primeiro, vamos limpar dados existentes que podem estar causando conflito
DELETE FROM auth.users WHERE email IN ('admin@veigateam.com', 'aluno1@teste.com', 'aluno2@teste.com');

-- Inserir usuário admin corretamente
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@veigateam.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin Master"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Inserir aluno 1
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'aluno1@teste.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"João Silva"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Inserir aluno 2
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'aluno2@teste.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Maria Santos"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Inserir dados de teste na tabela students para os alunos
INSERT INTO public.students (user_id, name, email, phone, plan_id, status)
SELECT 
  u.id,
  u.raw_user_meta_data->>'full_name',
  u.email,
  NULL,
  (SELECT id FROM public.plans LIMIT 1),
  'active'
FROM auth.users u 
WHERE u.email IN ('aluno1@teste.com', 'aluno2@teste.com');
