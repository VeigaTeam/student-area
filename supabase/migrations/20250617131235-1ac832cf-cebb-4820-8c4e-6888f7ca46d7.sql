
-- Inserir usuário master admin
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@veigateam.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Admin Master"}'::jsonb
);

-- Inserir dois alunos de teste
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES 
(
  gen_random_uuid(),
  'aluno1@teste.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "João Silva"}'::jsonb
),
(
  gen_random_uuid(),
  'aluno2@teste.com',
  crypt('123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Maria Santos"}'::jsonb
);

-- Atualizar as cores do tema para vermelho/preto
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"theme": "dark"}'::jsonb
WHERE email IN ('admin@veigateam.com', 'aluno1@teste.com', 'aluno2@teste.com');
