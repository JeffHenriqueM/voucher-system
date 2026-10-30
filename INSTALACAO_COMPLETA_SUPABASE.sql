-- ============================================================
-- INSTALAÇÃO COMPLETA DO BANCO DE DADOS — SISTEMA DE VOUCHERS RSM
-- Execute este script completo no SQL Editor do Supabase
-- (Cria todas as tabelas, índices, permissões RLS e usuários iniciais)
-- ============================================================

-- 1. TABELA PRINCIPAL DE VOUCHERS
CREATE TABLE IF NOT EXISTS vouchers (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo               TEXT NOT NULL UNIQUE,
  numero               BIGSERIAL,
  nome_socio           TEXT NOT NULL,
  sala_venda           TEXT,
  valor_hospedagem     NUMERIC(10,2) DEFAULT 0,
  diarias              INTEGER NOT NULL DEFAULT 2,
  diarias_totais       INTEGER NOT NULL DEFAULT 2,
  diarias_usadas       INTEGER NOT NULL DEFAULT 0,
  brinde_descricao     TEXT,
  validade             DATE,
  observacoes          TEXT,
  especificacoes_uso   TEXT,
  modelo_id            TEXT,
  modelo_nome          TEXT,
  assinatura_url       TEXT,
  status_fluxo         TEXT DEFAULT 'ativo', -- 'solicitado', 'aguardando_assinatura', 'ativo', 'usado'
  periodo_checkin      DATE,
  periodo_checkout     DATE,
  solicitante_nome     TEXT,
  pos_venda_nome       TEXT,
  admin_assinante_nome TEXT,
  assinado_em          TIMESTAMPTZ,
  usado                BOOLEAN NOT NULL DEFAULT FALSE,
  data_uso             TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Garantir que colunas existam caso a tabela já tenha sido criada anteriormente
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS numero BIGSERIAL;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS sala_venda TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS diarias_totais INTEGER DEFAULT 2;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS diarias_usadas INTEGER DEFAULT 0;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS brinde_descricao TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS validade DATE;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS especificacoes_uso TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS modelo_id TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS modelo_nome TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS assinatura_url TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS status_fluxo TEXT DEFAULT 'ativo';
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS periodo_checkin DATE;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS periodo_checkout DATE;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS solicitante_nome TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS pos_venda_nome TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS admin_assinante_nome TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS assinado_em TIMESTAMPTZ;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS tipo_voucher TEXT DEFAULT 'diarias';
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS valor_credito NUMERIC(10,2) DEFAULT 0;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS valor_utilizado NUMERIC(10,2) DEFAULT 0;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS cpf_beneficiario TEXT;
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS is_socio BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_vouchers_codigo ON vouchers(codigo);
CREATE INDEX IF NOT EXISTS idx_vouchers_socio ON vouchers(nome_socio);
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON vouchers(status_fluxo);
CREATE INDEX IF NOT EXISTS idx_vouchers_tipo ON vouchers(tipo_voucher);
CREATE INDEX IF NOT EXISTS idx_vouchers_cpf ON vouchers(cpf_beneficiario);

ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso publico vouchers select" ON vouchers;
CREATE POLICY "Acesso publico vouchers select" ON vouchers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Acesso publico vouchers insert" ON vouchers;
CREATE POLICY "Acesso publico vouchers insert" ON vouchers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Acesso publico vouchers update" ON vouchers;
CREATE POLICY "Acesso publico vouchers update" ON vouchers FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Acesso publico vouchers delete" ON vouchers;
CREATE POLICY "Acesso publico vouchers delete" ON vouchers FOR DELETE USING (true);

-- 2. TABELA DE SOLICITAÇÕES DE VOUCHERS (Reservas ➔ Pós Venda ➔ Admin)
CREATE TABLE IF NOT EXISTS voucher_solicitacoes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_socio          TEXT NOT NULL,
  modelo_id           TEXT,
  modelo_nome         TEXT,
  diarias_solicitadas INTEGER DEFAULT 2,
  periodo_checkin     DATE,
  periodo_checkout    DATE,
  motivo              TEXT,
  solicitante         TEXT DEFAULT 'Reservas',
  solicitante_nome    TEXT,
  pos_venda_nome      TEXT,
  admin_assinante     TEXT,
  status              TEXT DEFAULT 'pendente', -- 'pendente', 'aguardando_assinatura', 'gerado', 'cancelado'
  status_fluxo        TEXT DEFAULT 'solicitado',
  voucher_codigo      TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  gerado_em           TIMESTAMPTZ
);

ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS periodo_checkin DATE;
ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS periodo_checkout DATE;
ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS solicitante_nome TEXT;
ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS pos_venda_nome TEXT;
ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS admin_assinante TEXT;
ALTER TABLE voucher_solicitacoes ADD COLUMN IF NOT EXISTS status_fluxo TEXT DEFAULT 'solicitado';

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

-- 3. TABELA DE HISTÓRICO DE ESTADIAS (Baixa de Reservas)
CREATE TABLE IF NOT EXISTS voucher_historico_uso (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id         TEXT,
  voucher_codigo     TEXT NOT NULL,
  nome_socio         TEXT,
  diarias_utilizadas INTEGER NOT NULL DEFAULT 1,
  valor_utilizado    NUMERIC(10,2) DEFAULT 0,
  tipo_uso           TEXT DEFAULT 'diaria', -- 'diaria', 'consumo', 'misto'
  data_checkin       DATE,
  data_checkout      DATE,
  operador           TEXT DEFAULT 'Reservas',
  observacoes        TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE voucher_historico_uso ADD COLUMN IF NOT EXISTS valor_utilizado NUMERIC(10,2) DEFAULT 0;
ALTER TABLE voucher_historico_uso ADD COLUMN IF NOT EXISTS tipo_uso TEXT DEFAULT 'diaria';

CREATE INDEX IF NOT EXISTS idx_hist_voucher ON voucher_historico_uso(voucher_codigo);

ALTER TABLE voucher_historico_uso ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso publico historico select" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico select" ON voucher_historico_uso FOR SELECT USING (true);
DROP POLICY IF EXISTS "Acesso publico historico insert" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico insert" ON voucher_historico_uso FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Acesso publico historico update" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico update" ON voucher_historico_uso FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Acesso publico historico delete" ON voucher_historico_uso;
CREATE POLICY "Acesso publico historico delete" ON voucher_historico_uso FOR DELETE USING (true);

-- 4. TABELA DE CONFIGURAÇÕES GLOBAIS (Assinatura Oficial do Admin)
CREATE TABLE IF NOT EXISTS configuracoes_sistema (
  chave      TEXT PRIMARY KEY,
  valor      JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE configuracoes_sistema ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso publico config select" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config select" ON configuracoes_sistema FOR SELECT USING (true);
DROP POLICY IF EXISTS "Acesso publico config insert" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config insert" ON configuracoes_sistema FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Acesso publico config update" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config update" ON configuracoes_sistema FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Acesso publico config delete" ON configuracoes_sistema;
CREATE POLICY "Acesso publico config delete" ON configuracoes_sistema FOR DELETE USING (true);

-- 5. TABELA DE USUÁRIOS REAIS DO SISTEMA
CREATE TABLE IF NOT EXISTS usuarios_sistema (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          TEXT NOT NULL,
  usuario       TEXT NOT NULL UNIQUE,
  senha         TEXT NOT NULL,
  perfil        TEXT NOT NULL, -- 'admin', 'reservas', 'pos_venda'
  ativo         BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
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

-- Inserir os usuários iniciais padrão
INSERT INTO usuarios_sistema (nome, usuario, senha, perfil, ativo)
VALUES 
  ('Administrador Geral', 'admin', '1234', 'admin', true),
  ('Equipe de Reservas', 'reservas', '2345', 'reservas', true),
  ('Equipe de Pós Venda', 'posvenda', '3456', 'pos_venda', true)
ON CONFLICT (usuario) DO NOTHING;
