// ── Inicializa Supabase ────────────────────────────────────────
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Estado da Aplicação ─────────────────────────────────────────
let perfilAtivo = sessionStorage.getItem('rsm_perfil_ativo') || null; // 'admin', 'reservas', 'pos_venda'
let abaAtiva = 'cotas'; // 'cotas', 'vouchers', 'reservas', 'modelos'
let filtroStatusVouchers = '';
let filtroCotas = 'todos';
let buscaVouchersTimer = null;
let buscaCotasTimer = null;
let buscaReservasTimer = null;
let idParaDeletar = null;

// PINs de acesso (configuráveis)
const PINS_PADRAO = {
  admin: '1234',
  reservas: '2345',
  pos_venda: '3456'
};

// Modelos padrão de voucher
const MODELOS_PADRAO = [
  {
    id: 'padrao-rsm',
    nome: 'Padrão RSM — Hotel Villamor Prime',
    titulo_documento: 'RSM EMPREENDIMENTO',
    especificacao_padrao: 'Voucher de {diarias} diárias anuais para um casal no Hotel Villamor Prime ({produto}).',
    regras_uso: `Para agendamento ligar 83 98834-0045, no Hotel Villamor Prime.
Este Voucher é intransferível.
Diárias com check-in Domingo e check-out até a Quinta-Feira, exceto se for Encontro de Sócios Proprietários aos finais de semana.
Quantidade de diária para um casal, não fracionadas.
Café da manhã incluso nas diárias.
Diárias em apartamento LUXO.
Reservas sujeitas à disponibilidade.
Uso restrito no Hotel Villamor Prime.
Exceto feriados, datas comemorativas e eventos terceirizado.
A utilização se dará após 10% do contrato integralizado.`
  },
  {
    id: 'promocional',
    nome: 'RSM Especial / Promocional',
    titulo_documento: 'RSM EMPREENDIMENTO — CONDIÇÃO ESPECIAL',
    especificacao_padrao: 'Voucher promocional de {diarias} diárias para um casal no Hotel Villamor Prime.',
    regras_uso: `Para agendamento ligar 83 98834-0045, no Hotel Villamor Prime.
Este Voucher é intransferível.
Diárias sujeitas à disponibilidade com agendamento prévio de 30 dias.
Café da manhã incluso nas diárias.
Exceto feriados e alta temporada.`
  }
];

// Carregar modelos do localStorage ou padrão
let listaModelos = JSON.parse(localStorage.getItem('rsm_modelos_vouchers') || 'null') || MODELOS_PADRAO;

// Lista de cotas em memória
let listaCotas = typeof COTAS_IMPORTADAS !== 'undefined' ? JSON.parse(JSON.stringify(COTAS_IMPORTADAS)) : [];
let listaVouchers = [];
let listaHistoricoReservas = JSON.parse(localStorage.getItem('rsm_historico_reservas') || '[]');

// Assinatura oficial do Admin em memória
let assinaturaAdminAtual = localStorage.getItem('rsm_assinatura_admin') || '';

// ── Helpers Gerais ─────────────────────────────────────────────
function fmt(val) {
  if (val === null || val === undefined || val === '') return '—';
  const num = Number(val);
  if (isNaN(num)) return '—';
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(iso) {
  if (!iso) return '—';
  const parts = String(iso).split('T')[0].split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return iso;
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function escHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function nanoid(len = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(len)))
    .map(b => chars[b % chars.length]).join('');
}

function showToast(msg, tipo = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast toast-${tipo}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3500);
}

function linkVoucher(codigo) {
  return `${window.location.origin}${window.location.pathname.replace('index.html', '')}voucher.html?v=${codigo}`;
}

function copiarLink(codigo) {
  const url = linkVoucher(codigo);
  navigator.clipboard.writeText(url)
    .then(() => showToast('Link copiado!'))
    .catch(() => prompt('Copie o link:', url));
}

// ── Motor de Cálculo de Diárias Anuais por Sócio ────────────────
// Regras:
// Prata = 2 diárias
// Ouro = 4 diárias
// Integral = 8 diárias
// Bronze = 2 diárias
// Diamante = 6 diárias
// Quem tem 2 Prata = 4 diárias
// Quem tem 2 Ouro = 6 diárias (número máximo para cada sócio cotista!)
function calcularDiariasSocio(nomeSocio) {
  const nomeNorm = (nomeSocio || '').trim().toUpperCase();
  const cotasSocio = listaCotas.filter(c => (c.nome_socio || '').trim().toUpperCase() === nomeNorm);

  if (!cotasSocio.length) return 2;

  let qtdPrata = 0;
  let qtdOuro = 0;
  let qtdIntegral = 0;
  let qtdBronze = 0;
  let qtdDiamante = 0;
  let qtdOutros = 0;

  cotasSocio.forEach(c => {
    const p = (c.produto || '').toUpperCase();
    if (p.includes('OURO')) qtdOuro++;
    else if (p.includes('PRATA')) qtdPrata++;
    else if (p.includes('INTEGRAL')) qtdIntegral++;
    else if (p.includes('BRONZE')) qtdBronze++;
    else if (p.includes('DIAMANTE')) qtdDiamante++;
    else qtdOutros++;
  });

  let totalDiarias = 0;

  // Prata: 2 por cota
  totalDiarias += qtdPrata * 2;

  // Ouro: 4 diárias por 1 cota; 2 ou mais cotas Ouro = 6 diárias (teto máximo do sócio)
  if (qtdOuro === 1) {
    totalDiarias += 4;
  } else if (qtdOuro >= 2) {
    totalDiarias += 6; // teto máximo estabelecido para sócio cotista com 2+ ouro
  }

  // Integral: 8 diárias
  totalDiarias += qtdIntegral * 8;

  // Bronze: 2 diárias
  totalDiarias += qtdBronze * 2;

  // Diamante: 6 diárias
  totalDiarias += qtdDiamante * 6;

  // Outros
  totalDiarias += qtdOutros * 2;

  // Teto geral de segurança para múltiplos ouros
  if (qtdOuro >= 2 && totalDiarias > 6 && (qtdPrata === 0 && qtdIntegral === 0 && qtdDiamante === 0)) {
    totalDiarias = 6;
  }

  return totalDiarias;
}

// ── Gestão de Acessos & Perfis ─────────────────────────────────
let roleSelecionadaLogin = 'admin';

function initControleAcesso() {
  if (!perfilAtivo) {
    document.getElementById('loginOverlay').classList.remove('hidden');
  } else {
    document.getElementById('loginOverlay').classList.add('hidden');
    aplicarPermissoesPerfil();
  }

  // Seletor de Perfil no Login
  document.querySelectorAll('.role-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      roleSelecionadaLogin = opt.dataset.role;

      const dicas = { admin: 'PIN padrão: 1234', reservas: 'PIN padrão: 2345', pos_venda: 'PIN padrão: 3456' };
      document.getElementById('pinDica').textContent = dicas[roleSelecionadaLogin] || '';
      document.getElementById('inputPin').value = '';
      document.getElementById('inputPin').focus();
    });
  });

  // Submit Login
  document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('inputPin').value.trim();
    const pinsSalvos = JSON.parse(localStorage.getItem('rsm_pins') || 'null') || PINS_PADRAO;

    if (pin === pinsSalvos[roleSelecionadaLogin]) {
      perfilAtivo = roleSelecionadaLogin;
      sessionStorage.setItem('rsm_perfil_ativo', perfilAtivo);
      document.getElementById('loginOverlay').classList.add('hidden');
      showToast(`Bem-vindo, acesso ${nomePerfil(perfilAtivo)} ativado!`);
      aplicarPermissoesPerfil();
      sincronizarCotas();
    } else {
      showToast('PIN incorreto para este perfil.', 'error');
      document.getElementById('inputPin').select();
    }
  });

  // Botão Trocar Perfil / Sair
  document.getElementById('btnTrocarPerfil').addEventListener('click', () => {
    sessionStorage.removeItem('rsm_perfil_ativo');
    perfilAtivo = null;
    document.getElementById('inputPin').value = '';
    document.getElementById('loginOverlay').classList.remove('hidden');
  });
}

function nomePerfil(role) {
  if (role === 'admin') return 'Admin';
  if (role === 'reservas') return 'Reservas';
  if (role === 'pos_venda') return 'Pós Venda';
  return role;
}

function aplicarPermissoesPerfil() {
  const badge = document.getElementById('perfilBadge');
  badge.className = `perfil-badge perfil-${perfilAtivo}`;

  const labels = {
    admin: '👑 Admin',
    reservas: '🛎️ Reservas',
    pos_venda: '💼 Pós Venda'
  };
  badge.textContent = labels[perfilAtivo] || perfilAtivo;

  const btnAssinatura = document.getElementById('btnAssinaturaAdmin');
  const btnNovo = document.getElementById('btnNovo');
  const tabCotas = document.getElementById('tabNavCotas');
  const tabReservas = document.getElementById('tabNavReservas');
  const tabModelos = document.getElementById('tabNavModelos');

  if (perfilAtivo === 'admin') {
    btnAssinatura.style.display = 'inline-flex';
    btnNovo.style.display = 'inline-flex';
    tabCotas.style.display = 'inline-flex';
    tabReservas.style.display = 'inline-flex';
    tabModelos.style.display = 'inline-flex';
  } else if (perfilAtivo === 'pos_venda') {
    btnAssinatura.style.display = 'none';
    btnNovo.style.display = 'inline-flex';
    tabCotas.style.display = 'inline-flex';
    tabReservas.style.display = 'none';
    tabModelos.style.display = 'none';
    if (abaAtiva === 'reservas' || abaAtiva === 'modelos') mudarAba('cotas');
  } else if (perfilAtivo === 'reservas') {
    btnAssinatura.style.display = 'none';
    btnNovo.style.display = 'none';
    tabCotas.style.display = 'none';
    tabReservas.style.display = 'inline-flex';
    tabModelos.style.display = 'none';
    if (abaAtiva !== 'vouchers' && abaAtiva !== 'reservas') mudarAba('reservas');
  }
}

// ── Troca de Abas ──────────────────────────────────────────────
function mudarAba(novaAba) {
  abaAtiva = novaAba;

  const abas = ['cotas', 'vouchers', 'reservas', 'modelos'];
  abas.forEach(a => {
    const btn = document.getElementById(`tabNav${a.charAt(0).toUpperCase() + a.slice(1)}`);
    const secao = document.getElementById(`secao${a.charAt(0).toUpperCase() + a.slice(1)}`);
    if (btn) btn.classList.toggle('active', a === novaAba);
    if (secao) secao.classList.toggle('hidden', a !== novaAba);
  });

  if (novaAba === 'cotas') renderTabelaCotas();
  if (novaAba === 'vouchers') carregarVouchers();
  if (novaAba === 'reservas') renderTabelaReservas();
  if (novaAba === 'modelos') renderModelos();
}

// ── Sincronização dos Dados de Cotas e Vouchers ─────────────────
async function sincronizarCotas() {
  // 1. Tentar carregar cotas do Supabase
  try {
    const { data, error } = await db.from('cotas_socios').select('*').order('nome_socio');
    if (!error && data && data.length > 0) {
      listaCotas = data;
    }
  } catch (e) {}

  // 2. Buscar vouchers emitidos no Supabase
  try {
    const { data: vouchers, error } = await db.from('vouchers').select('*').order('created_at', { ascending: false });
    if (!error && vouchers) {
      listaVouchers = vouchers;
      atualizarStatusCotasComVouchers();
    }
  } catch (e) {}

  // 3. Buscar histórico de reservas
  try {
    const { data: hist } = await db.from('voucher_historico_uso').select('*').order('created_at', { ascending: false });
    if (hist && hist.length > 0) {
      listaHistoricoReservas = hist;
      localStorage.setItem('rsm_historico_reservas', JSON.stringify(hist));
    }
  } catch (e) {}

  // 4. Buscar assinatura oficial no Supabase se não estiver no localStorage
  if (!assinaturaAdminAtual) {
    try {
      const { data: cfg } = await db.from('configuracoes_sistema').select('valor').eq('chave', 'assinatura_oficial').single();
      if (cfg && cfg.valor && cfg.valor.url) {
        assinaturaAdminAtual = cfg.valor.url;
        localStorage.setItem('rsm_assinatura_admin', assinaturaAdminAtual);
      }
    } catch (e) {}
  }

  renderStatsCotas();
  renderTabelaCotas();
  renderTabelaReservas();
}

function atualizarStatusCotasComVouchers() {
  const vouchersPorSocio = {};
  listaVouchers.forEach(v => {
    const nomeNorm = (v.nome_socio || '').trim().toUpperCase();
    if (!vouchersPorSocio[nomeNorm]) vouchersPorSocio[nomeNorm] = [];
    vouchersPorSocio[nomeNorm].push(v);
  });

  const countUsado = {};

  listaCotas.forEach(c => {
    const nomeNorm = (c.nome_socio || '').trim().toUpperCase();
    const disponiveis = vouchersPorSocio[nomeNorm] || [];
    const index = countUsado[nomeNorm] || 0;

    if (disponiveis[index]) {
      c.voucher_codigo = disponiveis[index].codigo;
      c.voucher_numero = disponiveis[index].numero;
      countUsado[nomeNorm] = index + 1;
    } else {
      c.voucher_codigo = null;
      c.voucher_numero = null;
    }
  });

  document.getElementById('badgeTotalCotas').textContent = listaCotas.length;
  document.getElementById('badgeTotalVouchers').textContent = listaVouchers.length;
}

// ── Renderização das Cotas ─────────────────────────────────────
function renderStatsCotas() {
  const total = listaCotas.length;
  const sociosSet = new Set(listaCotas.map(c => c.nome_socio.trim().toUpperCase()));
  const multiCotas = listaCotas.filter(c => c.total_cotas > 1);
  const emitidos = listaCotas.filter(c => c.voucher_codigo);

  document.getElementById('cotaStatTotal').textContent = total;
  document.getElementById('cotaStatSocios').textContent = sociosSet.size;
  document.getElementById('cotaStatMulti').textContent = `59 (${multiCotas.length} cotas)`;
  document.getElementById('cotaStatEmitidos').textContent = emitidos.length;
}

function renderTabelaCotas() {
  const tbody = document.getElementById('tbodyCotas');
  const busca = (document.getElementById('inputBuscaCotas').value || '').trim().toLowerCase();

  let filtrados = listaCotas.filter(c => {
    if (busca) {
      const matchNome = c.nome_socio.toLowerCase().includes(busca);
      const matchProd = c.produto.toLowerCase().includes(busca);
      if (!matchNome && !matchProd) return false;
    }

    if (filtroCotas === 'multi') return c.total_cotas > 1;
    if (filtroCotas === 'single') return c.total_cotas === 1;
    if (filtroCotas === 'pendentes') return !c.voucher_codigo;
    if (filtroCotas === 'emitidos') return !!c.voucher_codigo;

    return true;
  });

  if (!filtrados.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty">Nenhuma cota encontrada com os filtros selecionados.</td></tr>';
    return;
  }

  tbody.innerHTML = filtrados.map(c => {
    const isMulti = c.total_cotas > 1;
    const badgeCota = isMulti
      ? `<span class="badge badge-cota-multi">🔥 ${c.total_cotas} Cotas (${c.cota_ordem}ª de ${c.total_cotas})</span>`
      : `<span class="badge badge-cota-single">⭐ Cota Única</span>`;

    const statusBadge = c.voucher_codigo
      ? `<span class="badge badge-emitido">✓ Emitido (Nº ${c.voucher_numero || c.voucher_codigo})</span>`
      : `<span class="badge badge-pendente">⏳ Pendente</span>`;

    // Diárias calculadas para este sócio
    const diariasTotais = calcularDiariasSocio(c.nome_socio);

    const acaoHtml = c.voucher_codigo
      ? `
        <div class="actions">
          <a href="${linkVoucher(c.voucher_codigo)}" target="_blank" class="btn btn-ghost" style="padding:.3rem .6rem;font-size:.78rem;">
            👁️ Ver
          </a>
          <button class="link-copy" onclick="copiarLink('${c.voucher_codigo}')" style="font-size:.78rem;padding:.3rem .6rem;">
            Copiar
          </button>
        </div>`
      : (perfilAtivo === 'reservas' ? '—' : `
        <button class="btn-emitir" onclick="abrirModalEmitirParaCota('${escHtml(c.id)}')">
          ⚡ Emitir Voucher
        </button>`);

    return `
      <tr>
        <td>
          <div class="cota-socio-name">
            <strong>${escHtml(c.nome_socio)}</strong>
          </div>
        </td>
        <td><code>${escHtml(c.produto)}</code></td>
        <td>${fmtDate(c.data_aquisicao)}</td>
        <td>${badgeCota}</td>
        <td>
          <span class="diarias-pill diarias-saldo">
            ${diariasTotais} diárias anuais
          </span>
        </td>
        <td>${statusBadge}</td>
        <td>${acaoHtml}</td>
      </tr>
    `;
  }).join('');
}

// ── Renderização dos Vouchers Emitidos ──────────────────────────
async function carregarVouchers() {
  const busca = document.getElementById('inputBusca').value.trim();

  let query = db.from('vouchers').select('*').order('created_at', { ascending: false });

  if (busca) query = query.ilike('nome_socio', `%${busca}%`);
  if (filtroStatusVouchers === 'usado') query = query.eq('usado', true);
  if (filtroStatusVouchers === 'disponivel') query = query.eq('usado', false);

  const { data, error } = await query;

  if (error) {
    document.getElementById('tbodyVouchers').innerHTML =
      '<tr><td colspan="7" class="empty">Erro ao carregar vouchers.</td></tr>';
    return;
  }

  listaVouchers = data || [];
  atualizarStatusCotasComVouchers();
  renderStatsVouchers(listaVouchers);
  renderTabelaVouchers(listaVouchers);
}

function renderStatsVouchers(dados) {
  const total = dados.length;
  const usados = dados.filter(v => v.usado).length;
  const disponiveis = total - usados;

  let totalDiariasDisponiveis = 0;
  dados.forEach(v => {
    const tot = v.diarias_totais || v.diarias || 2;
    const usd = v.diarias_usadas || (v.usado ? tot : 0);
    totalDiariasDisponiveis += Math.max(0, tot - usd);
  });

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statDisponiveis').textContent = disponiveis;
  document.getElementById('statUsados').textContent = usados;
  document.getElementById('statDiariasRestantes').textContent = `${totalDiariasDisponiveis} diárias`;
}

function renderTabelaVouchers(dados) {
  const tbody = document.getElementById('tbodyVouchers');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty">Nenhum voucher emitido até o momento.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(v => {
    const tot = v.diarias_totais || v.diarias || 2;
    const usd = v.diarias_usadas || (v.usado ? tot : 0);
    const saldo = Math.max(0, tot - usd);

    const statusBadge = v.usado || saldo === 0
      ? '<span class="badge badge-red">Utilizado</span>'
      : (usd > 0 ? `<span class="badge badge-yellow" style="background:#fef9c3;color:#854d0e;">Parcial (${saldo} restam)</span>` : '<span class="badge badge-green">Disponível</span>');

    return `
      <tr>
        <td><strong>#${v.numero || '—'}</strong></td>
        <td><strong>${escHtml(v.nome_socio)}</strong></td>
        <td>
          <span class="diarias-pill diarias-disponiveis" title="Concedidas">${tot} tot</span> /
          <span class="diarias-pill diarias-usadas" title="Utilizadas">${usd} usd</span> /
          <span class="diarias-pill diarias-saldo" title="Saldo">${saldo} saldo</span>
        </td>
        <td>${v.valor_hospedagem ? fmt(v.valor_hospedagem) : '<span style="color:#94a3b8">A definir</span>'}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="link-copy" onclick="copiarLink('${v.codigo}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
            Copiar link
          </button>
        </td>
        <td>
          <div class="actions">
            <a href="${linkVoucher(v.codigo)}" target="_blank" class="btn-icon" title="Visualizar / Imprimir">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </a>
            ${perfilAtivo !== 'pos_venda' ? `
            <button class="btn-icon" title="Registrar Hospedagem / Baixa" onclick="abrirModalBaixa('${v.id}')">
              🛎️
            </button>` : ''}
            ${perfilAtivo === 'admin' ? `
            <button class="btn-icon" title="Editar" onclick="abrirModalEditar('${v.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button class="btn-icon danger" title="Excluir" onclick="confirmarDelete('${v.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ── Renderização da Aba de Baixa de Reservas ────────────────────
function renderTabelaReservas() {
  const tbody = document.getElementById('tbodyReservas');
  if (!tbody) return;

  const busca = (document.getElementById('inputBuscaReservas')?.value || '').trim().toLowerCase();

  let filtrados = listaVouchers.filter(v => {
    if (!busca) return true;
    const matchNome = (v.nome_socio || '').toLowerCase().includes(busca);
    const matchNum = String(v.numero || '').includes(busca);
    const matchCod = (v.codigo || '').toLowerCase().includes(busca);
    return matchNome || matchNum || matchCod;
  });

  if (!filtrados.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty">Nenhum voucher encontrado para baixa de reservas.</td></tr>';
    return;
  }

  tbody.innerHTML = filtrados.map(v => {
    const tot = v.diarias_totais || v.diarias || 2;
    const usd = v.diarias_usadas || (v.usado ? tot : 0);
    const saldo = Math.max(0, tot - usd);

    // Buscar histórico deste voucher
    const historico = listaHistoricoReservas.filter(h => h.voucher_codigo === v.codigo);
    const histResumo = historico.length
      ? historico.map(h => `<div style="font-size:.75rem;">📅 <strong>${h.diarias_utilizadas}d</strong> (${fmtDate(h.data_checkin)} a ${fmtDate(h.data_checkout)})</div>`).join('')
      : '<span style="color:#94a3b8;font-size:.75rem;">Nenhuma estadia realizada</span>';

    return `
      <tr>
        <td><strong>#${v.numero || v.codigo}</strong></td>
        <td><strong>${escHtml(v.nome_socio)}</strong></td>
        <td>${tot} diária(s)</td>
        <td><span style="color:#dc2626;font-weight:700;">${usd} diária(s)</span></td>
        <td><span class="diarias-pill ${saldo > 0 ? 'diarias-disponiveis' : 'diarias-usadas'}">${saldo} restante(s)</span></td>
        <td>${histResumo}</td>
        <td>
          <button class="btn btn-primary" style="padding:.35rem .75rem;font-size:.8rem;" onclick="abrirModalBaixa('${v.id}')">
            🛎️ Dar Baixa
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ── Modal de Baixa de Reservas (Check-in / Check-out) ───────────
function abrirModalBaixa(voucherId) {
  const v = listaVouchers.find(item => item.id === voucherId);
  if (!v) return;

  const tot = v.diarias_totais || v.diarias || 2;
  const usd = v.diarias_usadas || (v.usado ? tot : 0);
  const saldo = Math.max(0, tot - usd);

  document.getElementById('baixaVoucherId').value = v.id;
  document.getElementById('baixaVoucherCodigo').value = v.codigo;
  document.getElementById('baixaSocioNome').value = v.nome_socio;

  document.getElementById('baixaTituloSocio').textContent = `Voucher #${v.numero || v.codigo} — ${v.nome_socio}`;
  document.getElementById('baixaInfoSaldo').innerHTML = `
    Diárias Concedidas: <strong>${tot}</strong> | 
    Já Utilizadas: <strong style="color:#dc2626;">${usd}</strong> | 
    Saldo Restante: <strong style="color:#16a34a;">${saldo} diárias</strong>
  `;

  document.getElementById('baixaDiariasQtd').max = saldo > 0 ? saldo : 1;
  document.getElementById('baixaDiariasQtd').value = saldo > 0 ? 1 : 0;

  // Datas padrão
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('baixaCheckin').value = hoje;
  document.getElementById('baixaCheckout').value = '';
  document.getElementById('baixaObs').value = '';

  // Histórico anterior
  const container = document.getElementById('baixaHistoricoLista');
  const historico = listaHistoricoReservas.filter(h => h.voucher_codigo === v.codigo);

  if (historico.length) {
    container.innerHTML = historico.map((h, i) => `
      <div class="historico-item">
        <div>
          <div class="historico-periodo">Estadia ${i+1}: ${h.diarias_utilizadas} diária(s)</div>
          <div class="historico-info">Período: ${fmtDate(h.data_checkin)} até ${fmtDate(h.data_checkout)} | Operador: ${escHtml(h.operador || 'Reservas')}</div>
          ${h.observacoes ? `<div style="font-size:.72rem;color:#475569;margin-top:2px;">Obs: ${escHtml(h.observacoes)}</div>` : ''}
        </div>
      </div>
    `).join('');
  } else {
    container.innerHTML = '<p style="color:var(--text-3);font-size:.78rem;">Nenhuma estadia anterior registrada neste voucher.</p>';
  }

  document.getElementById('modalBaixaReserva').classList.remove('hidden');
}

function fecharModalBaixa() {
  document.getElementById('modalBaixaReserva').classList.add('hidden');
}

// Submit da Baixa de Reserva
document.getElementById('formBaixaReserva').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnConfirmarBaixa');
  btn.disabled = true;
  btn.textContent = 'Gravando Baixa…';

  const voucherId = document.getElementById('baixaVoucherId').value;
  const voucherCodigo = document.getElementById('baixaVoucherCodigo').value;
  const socioNome = document.getElementById('baixaSocioNome').value;
  const qtdBaixa = Number(document.getElementById('baixaDiariasQtd').value);
  const checkin = document.getElementById('baixaCheckin').value;
  const checkout = document.getElementById('baixaCheckout').value;
  const operador = document.getElementById('baixaOperador').value.trim() || 'Reservas';
  const obs = document.getElementById('baixaObs').value.trim();

  const voucher = listaVouchers.find(v => v.id === voucherId);
  if (!voucher) {
    showToast('Voucher não localizado', 'error');
    btn.disabled = false;
    return;
  }

  const tot = voucher.diarias_totais || voucher.diarias || 2;
  const usdAtual = voucher.diarias_usadas || (voucher.usado ? tot : 0);
  const novoUsado = usdAtual + qtdBaixa;
  const saldoFinal = Math.max(0, tot - novoUsado);
  const isTotalmenteUsado = saldoFinal === 0;

  try {
    // 1. Atualizar voucher no Supabase
    await db.from('vouchers').update({
      diarias_usadas: novoUsado,
      usado: isTotalmenteUsado,
      data_uso: isTotalmenteUsado ? new Date().toISOString() : voucher.data_uso
    }).eq('id', voucherId);

    // 2. Registrar no histórico do Supabase
    const novoRegistroHist = {
      voucher_id: voucherId,
      voucher_codigo: voucherCodigo,
      nome_socio: socioNome,
      diarias_utilizadas: qtdBaixa,
      data_checkin: checkin,
      data_checkout: checkout,
      operador: operador,
      observacoes: obs || null,
      created_at: new Date().toISOString()
    };

    try {
      await db.from('voucher_historico_uso').insert([novoRegistroHist]);
    } catch (e) {}

    // Salvar localmente
    listaHistoricoReservas.unshift(novoRegistroHist);
    localStorage.setItem('rsm_historico_reservas', JSON.stringify(listaHistoricoReservas));

    showToast(`Baixa de ${qtdBaixa} diária(s) registrada com sucesso! Restam ${saldoFinal} diárias.`);
    fecharModalBaixa();
    sincronizarCotas();
    if (abaAtiva === 'vouchers') carregarVouchers();
    if (abaAtiva === 'reservas') renderTabelaReservas();
  } catch (err) {
    showToast('Erro ao gravar baixa de reservas', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Confirmar Baixa de Diárias';
  }
});

// ── Modelos de Voucher ─────────────────────────────────────────
function carregarSelectModelos() {
  const sel = document.getElementById('selectModelo');
  if (!sel) return;

  sel.innerHTML = listaModelos.map(m => `
    <option value="${m.id}">${escHtml(m.nome)}</option>
  `).join('');

  sel.addEventListener('change', () => {
    const mod = listaModelos.find(m => m.id === sel.value);
    if (!mod) return;
    const diarias = document.getElementById('inputDiarias').value || 2;
    const brinde = document.getElementById('inputBrinde').value || '';

    let espec = mod.especificacao_padrao.replace('{diarias}', diarias).replace('{produto}', brinde);
    document.getElementById('inputObs').value = espec;
    document.getElementById('inputEspecUso').value = mod.regras_uso;
  });
}

function renderModelos() {
  const grid = document.getElementById('gridModelos');
  if (!grid) return;

  grid.innerHTML = listaModelos.map(m => `
    <div class="stat-card" style="gap:.75rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <strong style="font-size:1rem;color:var(--primary);">${escHtml(m.nome)}</strong>
        <span class="badge badge-green">Ativo</span>
      </div>
      <div style="font-size:.82rem;color:var(--text-2);">
        <strong>Título Documento:</strong> ${escHtml(m.titulo_documento)}
      </div>
      <div style="font-size:.8rem;background:var(--bg);padding:.5rem;border-radius:6px;max-height:80px;overflow-y:auto;">
        ${escHtml(m.especificacao_padrao)}
      </div>
      <div class="actions" style="margin-top:auto;">
        <button class="btn btn-ghost" style="font-size:.78rem;" onclick="abrirModalEditarModelo('${m.id}')">
          ✏️ Editar Modelo
        </button>
      </div>
    </div>
  `).join('');
}

function abrirModalNovoModelo() {
  document.getElementById('editModeloId').value = '';
  document.getElementById('modalModeloTitulo').textContent = 'Novo Modelo de Voucher';
  document.getElementById('formModelo').reset();
  document.getElementById('inputModeloTituloDoc').value = 'RSM EMPREENDIMENTO';
  document.getElementById('modalModelo').classList.remove('hidden');
}

function abrirModalEditarModelo(id) {
  const m = listaModelos.find(item => item.id === id);
  if (!m) return;
  document.getElementById('editModeloId').value = m.id;
  document.getElementById('modalModeloTitulo').textContent = `Editar — ${m.nome}`;
  document.getElementById('inputModeloNome').value = m.nome;
  document.getElementById('inputModeloTituloDoc').value = m.titulo_documento;
  document.getElementById('inputModeloEspec').value = m.especificacao_padrao;
  document.getElementById('inputModeloRegras').value = m.regras_uso;
  document.getElementById('modalModelo').classList.remove('hidden');
}

document.getElementById('btnNovoModelo').addEventListener('click', abrirModalNovoModelo);
document.getElementById('btnFecharModalModelo').addEventListener('click', () => document.getElementById('modalModelo').classList.add('hidden'));
document.getElementById('btnCancelarModelo').addEventListener('click', () => document.getElementById('modalModelo').classList.add('hidden'));

document.getElementById('formModelo').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('editModeloId').value;
  const payload = {
    id: id || `modelo-${Date.now()}`,
    nome: document.getElementById('inputModeloNome').value.trim(),
    titulo_documento: document.getElementById('inputModeloTituloDoc').value.trim(),
    especificacao_padrao: document.getElementById('inputModeloEspec').value.trim(),
    regras_uso: document.getElementById('inputModeloRegras').value.trim()
  };

  if (id) {
    const idx = listaModelos.findIndex(m => m.id === id);
    if (idx !== -1) listaModelos[idx] = payload;
  } else {
    listaModelos.push(payload);
  }

  localStorage.setItem('rsm_modelos_vouchers', JSON.stringify(listaModelos));
  showToast('Modelo salvo com sucesso!');
  document.getElementById('modalModelo').classList.add('hidden');
  carregarSelectModelos();
  renderModelos();
});

// ── Modal de Assinatura Oficial (Admin) ────────────────────────
let canvasSig, ctxSig, isDrawing = false;

function initCanvasAssinatura() {
  canvasSig = document.getElementById('sigCanvas');
  if (!canvasSig) return;
  ctxSig = canvasSig.getContext('2d');

  canvasSig.width = canvasSig.offsetWidth || 350;
  canvasSig.height = 150;
  ctxSig.strokeStyle = '#000000';
  ctxSig.lineWidth = 2.5;
  ctxSig.lineCap = 'round';
  ctxSig.lineJoin = 'round';

  function getPos(e) {
    const rect = canvasSig.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function start(e) {
    isDrawing = true;
    const pos = getPos(e);
    ctxSig.beginPath();
    ctxSig.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctxSig.lineTo(pos.x, pos.y);
    ctxSig.stroke();
  }

  function stop() {
    isDrawing = false;
  }

  canvasSig.addEventListener('mousedown', start);
  canvasSig.addEventListener('mousemove', draw);
  canvasSig.addEventListener('mouseup', stop);
  canvasSig.addEventListener('mouseleave', stop);

  canvasSig.addEventListener('touchstart', start, { passive: false });
  canvasSig.addEventListener('touchmove', draw, { passive: false });
  canvasSig.addEventListener('touchend', stop);

  document.getElementById('btnLimparAssinatura').addEventListener('click', () => {
    ctxSig.clearRect(0, 0, canvasSig.width, canvasSig.height);
  });

  // Upload imagem
  document.getElementById('fileAssinatura').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      atualizarPreviewAssinatura(evt.target.result);
      assinaturaAdminAtual = evt.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Salvar Assinatura
  document.getElementById('btnSalvarAssinatura').addEventListener('click', async () => {
    // Se desenhou algo no canvas
    const imgData = ctxSig.getImageData(0, 0, canvasSig.width, canvasSig.height).data;
    const hasDrawing = imgData.some(p => p !== 0);

    if (hasDrawing) {
      assinaturaAdminAtual = canvasSig.toDataURL('image/png');
    }

    if (!assinaturaAdminAtual) {
      showToast('Por favor, desenhe ou envie uma imagem da assinatura.', 'error');
      return;
    }

    localStorage.setItem('rsm_assinatura_admin', assinaturaAdminAtual);

    // Salvar no Supabase configuracoes_sistema se existir
    try {
      await db.from('configuracoes_sistema').upsert({
        chave: 'assinatura_oficial',
        valor: { url: assinaturaAdminAtual }
      });
    } catch (e) {}

    showToast('Assinatura oficial do Admin salva com sucesso!');
    document.getElementById('modalAssinatura').classList.add('hidden');
  });

  document.getElementById('btnAssinaturaAdmin').addEventListener('click', () => {
    document.getElementById('modalAssinatura').classList.remove('hidden');
    setTimeout(() => {
      canvasSig.width = canvasSig.offsetWidth || 350;
      canvasSig.height = 150;
      ctxSig.strokeStyle = '#000000';
      ctxSig.lineWidth = 2.5;
      ctxSig.lineCap = 'round';
      ctxSig.lineJoin = 'round';
      atualizarPreviewAssinatura(assinaturaAdminAtual);
    }, 100);
  });

  document.getElementById('btnFecharAssinatura').addEventListener('click', () => document.getElementById('modalAssinatura').classList.add('hidden'));
  document.getElementById('btnCancelarAssinatura').addEventListener('click', () => document.getElementById('modalAssinatura').classList.add('hidden'));
}

function atualizarPreviewAssinatura(url) {
  const img = document.getElementById('imgAssinaturaPreview');
  const txt = document.getElementById('txtSemAssinatura');
  if (url) {
    img.src = url;
    img.style.display = 'block';
    txt.style.display = 'none';
  } else {
    img.style.display = 'none';
    txt.style.display = 'block';
  }
}

// ── Emissão de Voucher ─────────────────────────────────────────
function abrirModalEmitirParaCota(cotaId) {
  const cota = listaCotas.find(c => c.id === cotaId);
  if (!cota) return;

  carregarSelectModelos();

  document.getElementById('editId').value = '';
  document.getElementById('cotaVinculadaId').value = cota.id;
  document.getElementById('modalTitulo').textContent = `Emitir Voucher — ${cota.nome_socio}`;
  document.getElementById('btnSalvar').textContent = 'Confirmar e Emitir';

  // Cálculo automático de diárias com regras Ouro/Prata/Teto
  const diariasCalculadas = calcularDiariasSocio(cota.nome_socio);

  document.getElementById('inputNome').value = cota.nome_socio;
  document.getElementById('inputSala').value = 'VILLA';
  document.getElementById('inputValor').value = '';
  document.getElementById('inputDiarias').value = diariasCalculadas;
  document.getElementById('lblDicaDiarias').textContent = `(Calculado: ${diariasCalculadas} diárias pelo plano)`;

  document.getElementById('inputBrinde').value = `0${diariasCalculadas} DIÁRIAS ANUAIS VILLAMOR — ${cota.produto}`;

  // Validade padrão: 1 ano
  const dataHoje = new Date();
  dataHoje.setFullYear(dataHoje.getFullYear() + 1);
  document.getElementById('inputValidade').value = dataHoje.toISOString().split('T')[0];

  // Aplicar modelo selecionado
  const modeloPadrao = listaModelos[0] || MODELOS_PADRAO[0];
  document.getElementById('selectModelo').value = modeloPadrao.id;
  document.getElementById('inputObs').value = modeloPadrao.especificacao_padrao.replace('{diarias}', diariasCalculadas).replace('{produto}', cota.produto);
  document.getElementById('inputEspecUso').value = modeloPadrao.regras_uso;

  document.getElementById('modalOverlay').classList.remove('hidden');
}

function abrirModalNovo() {
  carregarSelectModelos();
  document.getElementById('editId').value = '';
  document.getElementById('cotaVinculadaId').value = '';
  document.getElementById('modalTitulo').textContent = 'Emitir Novo Voucher';
  document.getElementById('btnSalvar').textContent = 'Salvar Voucher';
  document.getElementById('formVoucher').reset();
  document.getElementById('inputDiarias').value = 2;
  document.getElementById('lblDicaDiarias').textContent = '';
  document.getElementById('inputSala').value = 'VILLA';

  const mod = listaModelos[0] || MODELOS_PADRAO[0];
  document.getElementById('selectModelo').value = mod.id;
  document.getElementById('inputObs').value = mod.especificacao_padrao.replace('{diarias}', 2).replace('{produto}', '');
  document.getElementById('inputEspecUso').value = mod.regras_uso;

  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

async function abrirModalEditar(id) {
  carregarSelectModelos();
  const { data: v, error } = await db.from('vouchers').select('*').eq('id', id).single();
  if (error || !v) { showToast('Erro ao carregar voucher', 'error'); return; }

  document.getElementById('editId').value = v.id;
  document.getElementById('cotaVinculadaId').value = '';
  document.getElementById('inputNome').value = v.nome_socio;
  document.getElementById('inputSala').value = v.sala_venda || '';
  document.getElementById('inputValor').value = v.valor_hospedagem !== null ? v.valor_hospedagem : '';
  document.getElementById('inputDiarias').value = v.diarias_totais || v.diarias || 2;
  document.getElementById('lblDicaDiarias').textContent = '';
  document.getElementById('inputBrinde').value = v.brinde_descricao || '';
  document.getElementById('inputValidade').value = v.validade || '';
  document.getElementById('inputObs').value = v.observacoes || '';
  document.getElementById('inputEspecUso').value = v.especificacoes_uso || '';
  if (v.modelo_id) document.getElementById('selectModelo').value = v.modelo_id;

  document.getElementById('modalTitulo').textContent = 'Editar Voucher';
  document.getElementById('btnSalvar').textContent = 'Atualizar Voucher';
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

// Submit do Voucher
document.getElementById('formVoucher').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnSalvar');
  btn.disabled = true;
  btn.textContent = 'Emitindo…';

  const id = document.getElementById('editId').value;
  const cotaId = document.getElementById('cotaVinculadaId').value;
  const valorInput = document.getElementById('inputValor').value;
  const modeloId = document.getElementById('selectModelo').value;
  const modeloObj = listaModelos.find(m => m.id === modeloId);
  const diariasTotais = Number(document.getElementById('inputDiarias').value) || 2;

  const payload = {
    nome_socio:         document.getElementById('inputNome').value.trim(),
    sala_venda:         document.getElementById('inputSala').value.trim() || null,
    valor_hospedagem:   valorInput !== '' ? Number(valorInput) : 0,
    diarias:            diariasTotais,
    diarias_totais:     diariasTotais,
    brinde_descricao:   document.getElementById('inputBrinde').value.trim() || null,
    validade:           document.getElementById('inputValidade').value || null,
    observacoes:        document.getElementById('inputObs').value.trim() || null,
    especificacoes_uso: document.getElementById('inputEspecUso').value.trim() || null,
    modelo_id:          modeloId,
    modelo_nome:        modeloObj ? modeloObj.nome : null,
    assinatura_url:     assinaturaAdminAtual || null
  };

  try {
    let resultData;
    if (id) {
      const { data, error } = await db.from('vouchers').update(payload).eq('id', id).select().single();
      if (error) throw error;
      resultData = data;
      showToast('Voucher atualizado com sucesso!');
    } else {
      payload.codigo = nanoid(10);
      payload.diarias_usadas = 0;
      payload.usado = false;
      const { data, error } = await db.from('vouchers').insert([payload]).select().single();
      if (error) throw error;
      resultData = data;
      showToast(`Voucher emitido com sucesso! Código: ${resultData.codigo}`);

      if (cotaId) {
        const cota = listaCotas.find(c => c.id === cotaId);
        if (cota) {
          cota.voucher_codigo = resultData.codigo;
          cota.voucher_numero = resultData.numero;
        }
      }
    }

    fecharModal();
    sincronizarCotas();
    if (abaAtiva === 'vouchers') carregarVouchers();
  } catch (err) {
    showToast(err.message || 'Erro ao emitir voucher', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = id ? 'Atualizar Voucher' : 'Salvar Voucher';
  }
});

// ── Deletar Voucher ────────────────────────────────────────────
function confirmarDelete(id) {
  idParaDeletar = id;
  document.getElementById('modalDelete').classList.remove('hidden');
}

function fecharModalDelete() {
  idParaDeletar = null;
  document.getElementById('modalDelete').classList.add('hidden');
}

document.getElementById('btnConfirmarDelete').addEventListener('click', async () => {
  if (!idParaDeletar) return;
  const { error } = await db.from('vouchers').delete().eq('id', idParaDeletar);
  if (error) { showToast('Erro ao excluir voucher', 'error'); return; }
  showToast('Voucher excluído!');
  fecharModalDelete();
  sincronizarCotas();
  carregarVouchers();
});

// ── Event Listeners Principais ─────────────────────────────────
document.getElementById('tabNavCotas').addEventListener('click', () => mudarAba('cotas'));
document.getElementById('tabNavVouchers').addEventListener('click', () => mudarAba('vouchers'));
document.getElementById('tabNavReservas').addEventListener('click', () => mudarAba('reservas'));
document.getElementById('tabNavModelos').addEventListener('click', () => mudarAba('modelos'));

document.getElementById('btnNovo').addEventListener('click', abrirModalNovo);
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);
document.getElementById('btnFecharDelete').addEventListener('click', fecharModalDelete);
document.getElementById('btnCancelarDelete').addEventListener('click', fecharModalDelete);
document.getElementById('btnFecharBaixa').addEventListener('click', fecharModalBaixa);
document.getElementById('btnCancelarBaixa').addEventListener('click', fecharModalBaixa);

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) fecharModal();
});
document.getElementById('modalDelete').addEventListener('click', e => {
  if (e.target === document.getElementById('modalDelete')) fecharModalDelete();
});
document.getElementById('modalBaixaReserva').addEventListener('click', e => {
  if (e.target === document.getElementById('modalBaixaReserva')) fecharModalBaixa();
});

// Filtros da Base de Cotas
document.querySelectorAll('[data-cota-filtro]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-cota-filtro]').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filtroCotas = btn.dataset.cotaFiltro;
    renderTabelaCotas();
  });
});

document.getElementById('inputBuscaCotas').addEventListener('input', () => {
  clearTimeout(buscaCotasTimer);
  buscaCotasTimer = setTimeout(renderTabelaCotas, 250);
});

// Filtros Vouchers
document.querySelectorAll('#secaoVouchers .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#secaoVouchers .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filtroStatusVouchers = btn.dataset.status;
    carregarVouchers();
  });
});

document.getElementById('inputBusca').addEventListener('input', () => {
  clearTimeout(buscaVouchersTimer);
  buscaVouchersTimer = setTimeout(carregarVouchers, 300);
});

// Busca Reservas
document.getElementById('inputBuscaReservas').addEventListener('input', () => {
  clearTimeout(buscaReservasTimer);
  buscaReservasTimer = setTimeout(renderTabelaReservas, 250);
});

// ── Inicialização do Sistema ───────────────────────────────────
initControleAcesso();
initCanvasAssinatura();
carregarSelectModelos();
sincronizarCotas();
