-- ATUALIZACAO V3: USUARIOS REAIS E PIPELINE DE 3 ETAPAS
-- (Reservas solicita periodo -> Pos Venda registra diarias -> Admin assina)

-- 1. Tabela de Usuarios Reais do Sistema
CREATE TABLE IF NOT EXISTS usuarios_sistema (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  usuario TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  perfil TEXT NOT NULL, -- 'admin', 'reservas', 'pos_venda'
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ultimo_acesso TIMESTAMPTZ
);

ALTER TABLE usuarios_sistema ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico usuarios select" ON usuarios_sistema;
CREATE POLICY "Acesso publico usuarios select" ON usuarios_sistema FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso publico usuarios insert" ON usuarios_sistema;
CREATE POLICY "Acesso publico usuarios insert" ON usuarios_sistema FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico usuarios update" ON usuarios_sistema;
CREATE POLICY "Acesso publico usuarios update" ON usuarios_sistema FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Acesso publico usuarios delete" ON usuarios_sistema;
CREATE POLICY "Acesso publico usuarios delete" ON usuarios_sistema FOR DELETE USING (true);

-- Inserir usuarios iniciais padrao caso nao existam
INSERT INTO usuarios_sistema (nome, usuario, senha, perfil, ativo)
VALUES 
  ('Administrador Geral', 'admin', '1234', 'admin', true),
  ('Equipe de Reservas', 'reservas', '2345', 'reservas', true),
  ('Equipe de Pós Venda', 'posvenda', '3456', 'pos_venda', true)
ON CONFLICT (usuario) DO NOTHING;

-- 2. Atualizar tabela vouchers com campos do pipeline
ALTER TABLE vouchers
ADD COLUMN IF NOT EXISTS status_fluxo TEXT DEFAULT 'ativo', -- 'aguardando_pos_venda', 'aguardando_assinatura', 'ativo', 'usado', 'cancelado'
ADD COLUMN IF NOT EXISTS periodo_checkin DATE,
ADD COLUMN IF NOT EXISTS periodo_checkout DATE,
ADD COLUMN IF NOT EXISTS solicitante_nome TEXT,
ADD COLUMN IF NOT EXISTS pos_venda_nome TEXT,
ADD COLUMN IF NOT EXISTS admin_assinante_nome TEXT,
ADD COLUMN IF NOT EXISTS assinado_em TIMESTAMPTZ;

-- 3. Atualizar tabela voucher_solicitacoes com campos do periodo pretendido
ALTER TABLE voucher_solicitacoes
ADD COLUMN IF NOT EXISTS periodo_checkin DATE,
ADD COLUMN IF NOT EXISTS periodo_checkout DATE,
ADD COLUMN IF NOT EXISTS pos_venda_atendente TEXT,
ADD COLUMN IF NOT EXISTS admin_assinante TEXT;
