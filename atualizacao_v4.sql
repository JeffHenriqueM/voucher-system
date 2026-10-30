-- ============================================================
-- ATUALIZAÇÃO V4: VOUCHERS DE CRÉDITO & REEMBOLSO (DIÁRIAS E CONSUMO)
-- ============================================================
-- Permite controle financeiro em R$ (saldo total, valor utilizado e saldo restante),
-- abatimentos fracionados para Diárias e/ou Consumo (restaurante, bar, serviços),
-- e cadastro com CPF para sócios ou clientes não-sócios (avulsos).

-- 1. Colunas financeiras e de beneficiário na tabela vouchers
ALTER TABLE vouchers
ADD COLUMN IF NOT EXISTS tipo_voucher TEXT DEFAULT 'diarias', -- 'diarias' ou 'credito'
ADD COLUMN IF NOT EXISTS valor_credito NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS valor_utilizado NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS cpf_beneficiario TEXT,
ADD COLUMN IF NOT EXISTS is_socio BOOLEAN DEFAULT true;

-- 2. Colunas de detalhamento financeiro no histórico de utilização
ALTER TABLE voucher_historico_uso
ADD COLUMN IF NOT EXISTS valor_utilizado NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS tipo_uso TEXT DEFAULT 'diaria'; -- 'diaria', 'consumo', 'misto'

-- 3. Índices de performance
CREATE INDEX IF NOT EXISTS idx_vouchers_tipo ON vouchers(tipo_voucher);
CREATE INDEX IF NOT EXISTS idx_vouchers_cpf ON vouchers(cpf_beneficiario);
