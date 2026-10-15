-- ============================================================
-- ATUALIZAÇÃO V2: HISTÓRICO DE DIÁRIAS, MODELOS E ASSINATURA
-- Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Campos extras na tabela vouchers
ALTER TABLE vouchers 
ADD COLUMN IF NOT EXISTS diarias_totais INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS diarias_usadas INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS modelo_id TEXT,
ADD COLUMN IF NOT EXISTS modelo_nome TEXT,
ADD COLUMN IF NOT EXISTS assinatura_url TEXT;

-- 2. Tabela de histórico de utilizações das diárias (Check-in / Check-out)
CREATE TABLE IF NOT EXISTS voucher_historico_uso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES vouchers(id) ON DELETE CASCADE,
  voucher_codigo TEXT NOT NULL,
  nome_socio TEXT,
  diarias_utilizadas INTEGER NOT NULL DEFAULT 1,
  data_checkin DATE,
  data_checkout DATE,
  operador TEXT DEFAULT 'Reservas',
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hist_voucher ON voucher_historico_uso(voucher_codigo);
CREATE INDEX IF NOT EXISTS idx_hist_socio ON voucher_historico_uso(nome_socio);

-- Permissões RLS públicas
ALTER TABLE voucher_historico_uso ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico historico select" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico select" ON voucher_historico_uso FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso publico historico insert" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico insert" ON voucher_historico_uso FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico historico update" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico update" ON voucher_historico_uso FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Acesso publico historico delete" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico delete" ON voucher_historico_uso FOR DELETE USING (true);

-- 3. Tabela de configurações globais (Assinatura oficial do Admin, PINs e Modelos)
CREATE TABLE IF NOT EXISTS configuracoes_sistema (
  chave TEXT PRIMARY KEY,
  valor JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE configuracoes_sistema ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico config select" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config select" ON configuracoes_sistema FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso publico config insert" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config insert" ON configuracoes_sistema FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico config update" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config update" ON configuracoes_sistema FOR UPDATE USING (true);

-- 4. Tabela de solicitações de vouchers feitas pelo setor de Reservas para o Pós Venda
CREATE TABLE IF NOT EXISTS voucher_solicitacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_socio TEXT NOT NULL,
  modelo_id TEXT,
  modelo_nome TEXT,
  diarias_solicitadas INTEGER DEFAULT 2,
  motivo TEXT,
  solicitante TEXT DEFAULT 'Reservas',
  status TEXT DEFAULT 'pendente', -- pendente, gerado, cancelado
  voucher_codigo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  gerado_em TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_solic_status ON voucher_solicitacoes(status);
CREATE INDEX IF NOT EXISTS idx_solic_socio ON voucher_solicitacoes(nome_socio);

ALTER TABLE voucher_solicitacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico solicitacoes select" ON voucher_solicitacoes;
CREATE POLICY "Acesso publico solicitacoes select" ON voucher_solicitacoes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso publico solicitacoes insert" ON voucher_solicitacoes;
CREATE POLICY "Acesso publico solicitacoes insert" ON voucher_solicitacoes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico solicitacoes update" ON voucher_solicitacoes;
CREATE POLICY "Acesso publico solicitacoes update" ON voucher_solicitacoes FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Acesso publico solicitacoes delete" ON voucher_solicitacoes;
CREATE POLICY "Acesso publico solicitacoes delete" ON voucher_solicitacoes FOR DELETE USING (true);

