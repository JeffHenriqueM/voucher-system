// ── Inicializa Supabase ────────────────────────────────────────
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Estado da Aplicação ─────────────────────────────────────────
// Usuários Reais do Sistema (padrões caso não haja no banco/localStorage)
const USUARIOS_PADRAO = [
  { id: 'usr-admin', nome: 'Administrador Geral', usuario: 'admin', senha: '1234', perfil: 'admin', ativo: true, created_at: '2026-10-15T12:00:00Z' },
  { id: 'usr-reservas', nome: 'Equipe de Reservas', usuario: 'reservas', senha: '2345', perfil: 'reservas', ativo: true, created_at: '2026-10-15T12:00:00Z' },
  { id: 'usr-posvenda', nome: 'Equipe de Pós Venda', usuario: 'posvenda', senha: '3456', perfil: 'pos_venda', ativo: true, created_at: '2026-10-15T12:00:00Z' }
];

let listaUsuarios = JSON.parse(localStorage.getItem('rsm_usuarios') || 'null') || USUARIOS_PADRAO;
let usuarioLogado = JSON.parse(sessionStorage.getItem('rsm_usuario_logado') || 'null');
let perfilAtivo = usuarioLogado ? usuarioLogado.perfil : (sessionStorage.getItem('rsm_perfil_ativo') || null);
let abaAtiva = 'cotas'; // 'cotas', 'vouchers', 'solicitacoes', 'reservas', 'modelos', 'usuarios'
let filtroStatusVouchers = '';
let filtroCotas = 'todos';
let buscaVouchersTimer = null;
let buscaCotasTimer = null;
let buscaReservasTimer = null;
let idParaDeletar = null;

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
    id: 'indique-ganhe',
    nome: 'Indique e Ganhe — Hotel Villamor Prime',
    titulo_documento: 'RSM EMPREENDIMENTO — INDIQUE E GANHE',
    especificacao_padrao: 'Voucher promocional de {diarias} diárias para um casal referente à campanha Indique e Ganhe.',
    regras_uso: `Para agendamento ligar 83 98834-0045, no Hotel Villamor Prime.
Este Voucher é intransferível e nominal.
Diárias com check-in Domingo e check-out até a Quinta-Feira.
Café da manhã incluso nas diárias para um casal.
Diárias em acomodação LUXO sujeitas à disponibilidade da rede.
Exceto feriados, datas comemorativas e alta temporada.
Válido após confirmação e validação da indicação elegível junto ao Pós Venda RSM.`
  },
  {
    id: 'promocional',
    nome: 'Diária Promocional — Hotel Villamor Prime',
    titulo_documento: 'RSM EMPREENDIMENTO — DIÁRIA PROMOCIONAL',
    especificacao_padrao: 'Voucher promocional de {diarias} diárias para um casal no Hotel Villamor Prime.',
    regras_uso: `Para agendamento ligar 83 98834-0045, no Hotel Villamor Prime.
Este Voucher é intransferível.
Diárias sujeitas à disponibilidade com agendamento prévio.
Café da manhã incluso nas diárias.
Diárias em apartamento LUXO.
Exceto feriados, datas comemorativas e alta temporada.`
  }
];

// Carregar modelos do localStorage ou padrão (garantindo que os 3 modelos padrão existam)
let listaModelos = JSON.parse(localStorage.getItem('rsm_modelos_vouchers') || 'null');
if (!listaModelos || !Array.isArray(listaModelos) || listaModelos.length === 0) {
  listaModelos = JSON.parse(JSON.stringify(MODELOS_PADRAO));
} else {
  MODELOS_PADRAO.forEach(mp => {
    if (!listaModelos.some(m => m.id === mp.id)) {
      listaModelos.push(JSON.parse(JSON.stringify(mp)));
    }
  });
}

// Lista de cotas em memória
let listaCotas = typeof COTAS_IMPORTADAS !== 'undefined' ? JSON.parse(JSON.stringify(COTAS_IMPORTADAS)) : [];
let listaVouchers = [];
let listaHistoricoReservas = JSON.parse(localStorage.getItem('rsm_historico_reservas') || '[]');

// Solicitações de Vouchers (Reservas ➔ Pós Venda)
let listaSolicitacoes = JSON.parse(localStorage.getItem('rsm_solicitacoes') || '[]');
let filtroSolicitacoes = 'pendente';
let buscaSolicitacoesTimer = null;
let solicitacaoEmAtendimentoId = null;

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
function initControleAcesso() {
  const overlay = document.getElementById('loginOverlay');
  if (!usuarioLogado) {
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
  } else {
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
    aplicarPermissoesPerfil();
  }

  // Função global de Login com Usuários Reais (autenticação em tempo real no Supabase)
  async function executarLogin() {
    const btn = document.getElementById('btnEntrarLogin');
    const uInput = document.getElementById('inputUsuario');
    const sInput = document.getElementById('inputSenha');
    const usuarioDigitado = (uInput ? uInput.value : '').trim().toLowerCase();
    const senhaDigitada = (sInput ? sInput.value : '').trim();

    if (!usuarioDigitado || !senhaDigitada) {
      showToast('Por favor, informe seu usuário e senha.', 'error');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Autenticando...';
    }

    try {
      let usr = null;

      // 1. Tentar autenticação em tempo real no Supabase
      try {
        const { data, error } = await db
          .from('usuarios_sistema')
          .select('*')
          .ilike('usuario', usuarioDigitado)
          .eq('senha', senhaDigitada)
          .maybeSingle();

        if (!error && data) {
          usr = data;
          // Sincronizar cache local com o usuário retornado pelo banco
          const idx = listaUsuarios.findIndex(u => (u.usuario || '').toLowerCase() === usuarioDigitado);
          if (idx !== -1) listaUsuarios[idx] = data;
          else listaUsuarios.push(data);
          localStorage.setItem('rsm_usuarios', JSON.stringify(listaUsuarios));
        } else {
          // Se o usuário existe no Supabase mas a senha não bate, NÃO aceita senha antiga!
          const { data: usuarioExiste } = await db
            .from('usuarios_sistema')
            .select('id, nome')
            .ilike('usuario', usuarioDigitado)
            .maybeSingle();

          if (usuarioExiste) {
            showToast('Senha incorreta para este usuário.', 'error');
            if (sInput) { sInput.select(); sInput.focus(); }
            return;
          }
        }
      } catch (errDb) {
        console.warn('Supabase offline ou inacessível no login, verificando cache local:', errDb);
      }

      // 2. Se não conseguiu verificar online, consulta cache local
      if (!usr) {
        usr = listaUsuarios.find(u => (u.usuario || '').trim().toLowerCase() === usuarioDigitado && String(u.senha).trim() === senhaDigitada);
      }

      if (usr) {
        if (usr.ativo === false) {
          showToast('Este usuário está desativado pelo Administrador.', 'error');
          return;
        }
        usuarioLogado = usr;
        perfilAtivo = usr.perfil;
        sessionStorage.setItem('rsm_usuario_logado', JSON.stringify(usuarioLogado));
        sessionStorage.setItem('rsm_perfil_ativo', perfilAtivo);
        if (overlay) {
          overlay.classList.add('hidden');
          overlay.style.setProperty('display', 'none', 'important');
        }
        showToast(`Bem-vindo(a), ${usr.nome}!`);
        aplicarPermissoesPerfil();
        sincronizarCotas();
      } else {
        showToast('Usuário ou senha incorretos.', 'error');
        if (sInput) sInput.select();
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Entrar no Sistema';
      }
    }
  }
  window.executarLogin = executarLogin;

  // Submit Login
  document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    executarLogin();
  });

  // Botão Trocar Perfil / Sair
  document.getElementById('btnTrocarPerfil').addEventListener('click', () => {
    sessionStorage.removeItem('rsm_usuario_logado');
    sessionStorage.removeItem('rsm_perfil_ativo');
    usuarioLogado = null;
    perfilAtivo = null;
    const sIn = document.getElementById('inputSenha');
    if (sIn) sIn.value = '';
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
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
  const primeiroNome = usuarioLogado ? usuarioLogado.nome.split(' ')[0] : '';
  badge.textContent = primeiroNome ? `${labels[perfilAtivo]} (${primeiroNome})` : (labels[perfilAtivo] || perfilAtivo);

  const btnAssinatura = document.getElementById('btnAssinaturaAdmin');
  const btnNovo = document.getElementById('btnNovo');
  const tabCotas = document.getElementById('tabNavCotas');
  const tabVouchers = document.getElementById('tabNavVouchers');
  const tabSolicitacoes = document.getElementById('tabNavSolicitacoes');
  const tabReservas = document.getElementById('tabNavReservas');
  const tabModelos = document.getElementById('tabNavModelos');
  const tabUsuarios = document.getElementById('tabNavUsuarios');

  if (perfilAtivo === 'admin') {
    btnAssinatura.style.display = 'inline-flex';
    btnNovo.style.display = 'inline-flex';
    tabCotas.style.display = 'inline-flex';
    tabVouchers.style.display = 'inline-flex';
    tabSolicitacoes.style.display = 'inline-flex';
    tabReservas.style.display = 'inline-flex';
    tabModelos.style.display = 'inline-flex';
    if (tabUsuarios) tabUsuarios.style.display = 'inline-flex';
  } else if (perfilAtivo === 'pos_venda') {
    btnAssinatura.style.display = 'none';
    btnNovo.style.display = 'inline-flex';
    tabCotas.style.display = 'inline-flex';
    tabVouchers.style.display = 'inline-flex';
    tabSolicitacoes.style.display = 'inline-flex';
    tabReservas.style.display = 'none';
    tabModelos.style.display = 'none';
    if (tabUsuarios) tabUsuarios.style.display = 'none';
    if (abaAtiva === 'reservas' || abaAtiva === 'modelos' || abaAtiva === 'usuarios') mudarAba('cotas');
  } else if (perfilAtivo === 'reservas') {
    btnAssinatura.style.display = 'none';
    btnNovo.style.display = 'none';
    tabCotas.style.display = 'none';
    tabVouchers.style.display = 'inline-flex';
    tabSolicitacoes.style.display = 'inline-flex';
    tabReservas.style.display = 'inline-flex';
    tabModelos.style.display = 'none';
    if (tabUsuarios) tabUsuarios.style.display = 'none';
    if (abaAtiva !== 'vouchers' && abaAtiva !== 'reservas' && abaAtiva !== 'solicitacoes') mudarAba('reservas');
  }

  atualizarBadgeSolicitacoes();
}

// ── Troca de Abas ──────────────────────────────────────────────
function mudarAba(novaAba) {
  abaAtiva = novaAba;

  const abas = ['cotas', 'vouchers', 'solicitacoes', 'reservas', 'modelos', 'usuarios'];
  abas.forEach(a => {
    const btn = document.getElementById(`tabNav${a.charAt(0).toUpperCase() + a.slice(1)}`);
    const secao = document.getElementById(`secao${a.charAt(0).toUpperCase() + a.slice(1)}`);
    if (btn) btn.classList.toggle('active', a === novaAba);
    if (secao) secao.classList.toggle('hidden', a !== novaAba);
  });

  if (novaAba === 'cotas') renderTabelaCotas();
  if (novaAba === 'vouchers') carregarVouchers();
  if (novaAba === 'solicitacoes') renderTabelaSolicitacoes();
  if (novaAba === 'reservas') renderTabelaReservas();
  if (novaAba === 'modelos') renderModelos();
  if (novaAba === 'usuarios') renderTabelaUsuarios();
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

  // 5. Buscar solicitações
  await carregarSolicitacoes();

  // 6. Buscar usuários
  await carregarUsuarios();

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
  const busca = (document.getElementById('inputBusca')?.value || '').trim();

  try {
    let query = db.from('vouchers').select('*').order('created_at', { ascending: false });

    if (busca) query = query.ilike('nome_socio', `%${busca}%`);
    if (filtroStatusVouchers === 'usado') query = query.eq('usado', true);
    if (filtroStatusVouchers === 'disponivel') query = query.eq('usado', false);

    const { data, error } = await query;
    if (!error && data) {
      listaVouchers = data;
      localStorage.setItem('rsm_vouchers_cache', JSON.stringify(data));
    } else {
      listaVouchers = JSON.parse(localStorage.getItem('rsm_vouchers_cache') || '[]');
    }
  } catch (err) {
    listaVouchers = JSON.parse(localStorage.getItem('rsm_vouchers_cache') || '[]');
  }

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
    const isPendenteAssinatura = v.status_fluxo === 'aguardando_assinatura';

    let statusBadge = '';
    if (isPendenteAssinatura) {
      statusBadge = '<span class="badge badge-yellow" style="background:#fef3c7;color:#b45309;">✍️ Aguarda Assinatura</span>';
    } else {
      statusBadge = v.usado || saldo === 0
        ? '<span class="badge badge-red">Utilizado</span>'
        : (usd > 0 ? `<span class="badge badge-yellow" style="background:#fef9c3;color:#854d0e;">Parcial (${saldo} restam)</span>` : '<span class="badge badge-green">Disponível</span>');
    }

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
            ${isPendenteAssinatura && perfilAtivo === 'admin' ? `
            <button class="btn btn-primary" style="padding:.25rem .55rem;font-size:.75rem;" onclick="abrirModalAssinarVoucher('${v.id}')" title="Conferir e assinar voucher">
              ✍️ Assinar
            </button>` : ''}
            <a href="${linkVoucher(v.codigo)}" target="_blank" class="btn-icon" title="Visualizar / Imprimir">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </a>
            ${perfilAtivo !== 'pos_venda' && !isPendenteAssinatura ? `
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

  const solicitacaoAtual = solicitacaoEmAtendimentoId ? listaSolicitacoes.find(s => s.id === solicitacaoEmAtendimentoId) : null;
  const isFluxoAdmin = perfilAtivo === 'admin';
  const statusFluxo = isFluxoAdmin ? 'ativo' : 'aguardando_assinatura';

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
    status_fluxo:       statusFluxo,
    pos_venda_nome:     usuarioLogado ? usuarioLogado.nome : 'Equipe de Pós Venda',
    assinatura_url:     (isFluxoAdmin ? (assinaturaAdminAtual || null) : null)
  };

  if (isFluxoAdmin && assinaturaAdminAtual) {
    payload.admin_assinante_nome = usuarioLogado ? usuarioLogado.nome : 'Administrador Geral';
    payload.assinado_em = new Date().toISOString();
  }

  if (solicitacaoAtual) {
    payload.periodo_checkin = solicitacaoAtual.periodo_checkin || null;
    payload.periodo_checkout = solicitacaoAtual.periodo_checkout || null;
    payload.solicitante_nome = solicitacaoAtual.solicitante_nome || solicitacaoAtual.solicitante || null;
  }

  try {
    let resultData;
    if (id) {
      try {
        const { data, error } = await db.from('vouchers').update(payload).eq('id', id).select().single();
        if (!error && data) resultData = data;
        else resultData = { ...payload, id };
      } catch (e) {
        resultData = { ...payload, id };
      }
      const idx = listaVouchers.findIndex(v => v.id === id);
      if (idx !== -1) listaVouchers[idx] = resultData;
      localStorage.setItem('rsm_vouchers_cache', JSON.stringify(listaVouchers));
      showToast('Voucher atualizado com sucesso!');
    } else {
      payload.codigo = nanoid(10);
      payload.diarias_usadas = 0;
      payload.usado = false;
      payload.created_at = new Date().toISOString();
      payload.id = `vouch-${nanoid(8)}`;
      payload.numero = (listaVouchers[0]?.numero || 0) + 1;

      try {
        const { data, error } = await db.from('vouchers').insert([payload]).select().single();
        if (!error && data) {
          resultData = data;
        } else {
          resultData = payload;
        }
      } catch (e) {
        resultData = payload;
      }

      listaVouchers.unshift(resultData);
      localStorage.setItem('rsm_vouchers_cache', JSON.stringify(listaVouchers));

      if (isFluxoAdmin) {
        showToast(`Voucher #${resultData.codigo} emitido e assinado com sucesso!`);
      } else {
        showToast(`Minuta do voucher #${resultData.codigo} gerada! Enviado para assinatura do Administrador.`);
      }

      if (cotaId) {
        const cota = listaCotas.find(c => c.id === cotaId);
        if (cota) {
          cota.voucher_codigo = resultData.codigo;
          cota.voucher_numero = resultData.numero;
        }
      }

      // Se este voucher veio de uma solicitação de Reservas, atualizar status da solicitação
      if (solicitacaoEmAtendimentoId) {
        const sId = solicitacaoEmAtendimentoId;
        solicitacaoEmAtendimentoId = null;
        const novoStatusSolic = isFluxoAdmin ? 'gerado' : 'aguardando_assinatura';
        try {
          await db.from('voucher_solicitacoes').update({
            status: novoStatusSolic,
            voucher_codigo: resultData.codigo,
            pos_venda_nome: usuarioLogado ? usuarioLogado.nome : 'Pós Venda',
            gerado_em: new Date().toISOString()
          }).eq('id', sId);
        } catch (e) {}

        const idx = listaSolicitacoes.findIndex(s => s.id === sId);
        if (idx !== -1) {
          listaSolicitacoes[idx].status = novoStatusSolic;
          listaSolicitacoes[idx].voucher_codigo = resultData.codigo;
          listaSolicitacoes[idx].pos_venda_nome = usuarioLogado ? usuarioLogado.nome : 'Pós Venda';
          listaSolicitacoes[idx].gerado_em = new Date().toISOString();
          localStorage.setItem('rsm_solicitacoes', JSON.stringify(listaSolicitacoes));
        }
        atualizarBadgeSolicitacoes();
      }
    }

    fecharModal();
    sincronizarCotas();
    if (abaAtiva === 'vouchers') carregarVouchers();
    if (abaAtiva === 'solicitacoes') renderTabelaSolicitacoes();
  } catch (err) {
    console.error('Aviso ao emitir voucher:', err);
    fecharModal();
    sincronizarCotas();
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

// ── Controle de Tema (Dark / Light Mode) ─────────────────────────
function initTema() {
  const salvo = localStorage.getItem('rsm_theme') || 'light';
  aplicarTema(salvo);

  const btnToggle = document.getElementById('btnThemeToggle');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      const atual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      const novo = atual === 'dark' ? 'light' : 'dark';
      aplicarTema(novo);
    });
  }
}

function aplicarTema(tema) {
  const btnToggle = document.getElementById('btnThemeToggle');
  if (tema === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('rsm_theme', 'dark');
    if (btnToggle) btnToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('rsm_theme', 'light');
    if (btnToggle) btnToggle.textContent = '🌙';
  }
}

// ── Gestão de Solicitações de Vouchers (Reservas ➔ Pós Venda) ───
async function carregarSolicitacoes() {
  try {
    const { data, error } = await db.from('voucher_solicitacoes').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      listaSolicitacoes = data;
      localStorage.setItem('rsm_solicitacoes', JSON.stringify(data));
    }
  } catch (err) {
    console.warn('Erro ao carregar solicitações do Supabase, usando cache local:', err);
  }
  atualizarBadgeSolicitacoes();
  if (abaAtiva === 'solicitacoes') {
    renderTabelaSolicitacoes();
  }
}

function atualizarBadgeSolicitacoes() {
  const badge = document.getElementById('badgeTotalSolicitacoes');
  if (!badge) return;
  const pendentes = listaSolicitacoes.filter(s => s.status === 'pendente').length;
  badge.textContent = pendentes;
  badge.style.display = pendentes > 0 ? 'inline-block' : 'none';
}

function renderTabelaSolicitacoes() {
  const tbody = document.getElementById('tbodySolicitacoes');
  if (!tbody) return;

  const busca = (document.getElementById('inputBuscaSolicitacoes')?.value || '').trim().toLowerCase();

  let dados = listaSolicitacoes.filter(s => {
    if (filtroSolicitacoes && filtroSolicitacoes !== 'todos') {
      if (s.status !== filtroSolicitacoes) return false;
    }
    if (busca) {
      const matchNome = (s.nome_socio || '').toLowerCase().includes(busca);
      const matchMotivo = (s.motivo || '').toLowerCase().includes(busca);
      const matchSolicitante = (s.solicitante || s.solicitante_nome || '').toLowerCase().includes(busca);
      return matchNome || matchMotivo || matchSolicitante;
    }
    return true;
  });

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty">Nenhuma solicitação encontrada neste filtro.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(s => {
    let statusBadge = '<span class="badge badge-yellow">1. Solicitado (Reservas)</span>';
    if (s.status === 'aguardando_assinatura') {
      statusBadge = '<span class="badge badge-yellow" style="background:#fef3c7;color:#b45309;">2. Aguarda Assinatura (Admin)</span>';
    } else if (s.status === 'gerado') {
      statusBadge = `<span class="badge badge-green">3. Ativo & Assinado ${s.voucher_codigo ? `(#${s.voucher_codigo})` : ''}</span>`;
    } else if (s.status === 'cancelado') {
      statusBadge = '<span class="badge badge-red">Cancelado</span>';
    }

    const periodoStr = (s.periodo_checkin && s.periodo_checkout)
      ? `${fmtDate(s.periodo_checkin)} até ${fmtDate(s.periodo_checkout)}`
      : (s.periodo_checkin ? `A partir de ${fmtDate(s.periodo_checkin)}` : '—');

    let acoesHtml = '';
    if (s.status === 'pendente') {
      if (perfilAtivo === 'pos_venda' || perfilAtivo === 'admin') {
        acoesHtml += `
          <button class="btn btn-primary" style="padding:.3rem .6rem;font-size:.78rem;" onclick="atenderSolicitacao('${s.id}')" title="Registrar Diárias Disponíveis e Preparar Voucher">
            ⚡ Atender & Registrar Diárias
          </button>
        `;
      }
      acoesHtml += `
        <button class="btn btn-ghost" style="padding:.3rem .5rem;font-size:.78rem;color:#dc2626;" onclick="cancelarSolicitacao('${s.id}')" title="Cancelar solicitação">
          ✕ Cancelar
        </button>
      `;
    } else if (s.status === 'aguardando_assinatura') {
      if (perfilAtivo === 'admin') {
        acoesHtml += `
          <button class="btn btn-primary" style="padding:.3rem .6rem;font-size:.78rem;background:#0f766e;border-color:#0f766e;" onclick="abrirModalAssinarVoucherPorCodigo('${s.voucher_codigo}')" title="Conferir e assinar voucher">
            ✍️ Assinar Voucher
          </button>
        `;
      } else {
        acoesHtml = '<span style="font-size:.78rem;color:var(--text-3);">Aguardando Admin</span>';
      }
    } else if (s.status === 'gerado' && s.voucher_codigo) {
      acoesHtml += `
        <a href="${linkVoucher(s.voucher_codigo)}" target="_blank" class="btn btn-ghost" style="padding:.3rem .6rem;font-size:.78rem;" title="Ver Voucher">
          👁️ Ver Voucher
        </a>
      `;
    } else {
      acoesHtml = '—';
    }

    return `
      <tr>
        <td style="font-size:.8rem;color:var(--text-3);">${fmtDateTime(s.created_at)}</td>
        <td><strong>${escHtml(s.nome_socio)}</strong></td>
        <td style="font-size:.82rem;font-weight:600;color:var(--primary);">${periodoStr}</td>
        <td><span class="badge badge-blue" style="font-size:.75rem;">${escHtml(s.modelo_nome || s.modelo_id || 'Padrão')}</span></td>
        <td style="max-width:240px;font-size:.82rem;">${escHtml(s.motivo || '—')}</td>
        <td style="font-size:.8rem;color:var(--text-2);">${escHtml(s.solicitante_nome || s.solicitante || 'Reservas')}</td>
        <td>${statusBadge}</td>
        <td><div class="actions">${acoesHtml}</div></td>
      </tr>
    `;
  }).join('');
}

function abrirModalSolicitarVoucher(nomeSocioPreenchido = '') {
  // Preencher datalist de sócios com nomes únicos
  const datalist = document.getElementById('datalistSocios');
  if (datalist) {
    const nomesUnicos = [...new Set(listaCotas.map(c => (c.nome_socio || '').trim()).filter(Boolean))].sort();
    datalist.innerHTML = nomesUnicos.map(nome => `<option value="${escHtml(nome)}"></option>`).join('');
  }

  // Preencher select de modelos
  const selectModelo = document.getElementById('solicModelo');
  if (selectModelo) {
    selectModelo.innerHTML = listaModelos.map(m => `<option value="${m.id}">${escHtml(m.nome)}</option>`).join('');
  }

  const inputNome = document.getElementById('solicNomeSocio');
  inputNome.value = nomeSocioPreenchido || '';
  document.getElementById('solicMotivo').value = '';

  const hoje = new Date().toISOString().split('T')[0];
  const inputCheckin = document.getElementById('solicCheckin');
  const inputCheckout = document.getElementById('solicCheckout');
  if (inputCheckin) inputCheckin.value = hoje;
  if (inputCheckout) inputCheckout.value = '';

  const opNome = usuarioLogado ? usuarioLogado.nome : (perfilAtivo === 'reservas' ? 'Equipe de Reservas' : (perfilAtivo === 'admin' ? 'Administrador' : 'Pós Venda'));
  document.getElementById('solicOperador').value = opNome;

  atualizarDicaSocioSolicitacao(nomeSocioPreenchido);

  document.getElementById('modalSolicitarVoucher').classList.remove('hidden');
  if (!nomeSocioPreenchido) inputNome.focus();
}

function fecharModalSolicitarVoucher() {
  document.getElementById('modalSolicitarVoucher').classList.add('hidden');
}

function atualizarDicaSocioSolicitacao(nome) {
  const lblDica = document.getElementById('solicInfoSocio');
  const inputDiarias = document.getElementById('solicDiarias');
  if (!nome || !nome.trim()) {
    if (lblDica) lblDica.textContent = '';
    return;
  }

  const nomeNorm = nome.trim().toUpperCase();
  const cotasSocio = listaCotas.filter(c => (c.nome_socio || '').trim().toUpperCase() === nomeNorm);

  if (cotasSocio.length > 0) {
    const diariasTotais = calcularDiariasSocio(nome);
    const produtos = cotasSocio.map(c => c.produto).filter(Boolean).join(', ');
    if (lblDica) {
      lblDica.innerHTML = `Sócio identificado na base RSM: <strong>${cotasSocio.length} cota(s)</strong> (${produtos || 'Cotas'}). Diárias anuais recomendadas: <strong>${diariasTotais} diárias</strong>.`;
    }
    if (inputDiarias) inputDiarias.value = diariasTotais;
  } else {
    if (lblDica) {
      lblDica.innerHTML = `⚠️ Sócio não localizado diretamente na lista de cotas. Você pode prosseguir normalmente informando o período e observações.`;
    }
  }
}

async function atenderSolicitacao(idSolicitacao) {
  const solic = listaSolicitacoes.find(s => s.id === idSolicitacao);
  if (!solic) return;

  solicitacaoEmAtendimentoId = idSolicitacao;
  abrirModalNovo();

  // Preencher dados do voucher com a solicitação
  document.getElementById('inputNome').value = solic.nome_socio;
  if (solic.modelo_id) {
    document.getElementById('selectModelo').value = solic.modelo_id;
  }

  // Pós Venda define/confere as diárias disponíveis com base nas cotas do sócio
  const diariasCalculadas = calcularDiariasSocio(solic.nome_socio);
  document.getElementById('inputDiarias').value = diariasCalculadas;
  document.getElementById('lblDicaDiarias').textContent = `(Pós Venda: ${diariasCalculadas} diárias disponíveis calculadas pelo plano)`;

  const periodoStr = (solic.periodo_checkin && solic.periodo_checkout)
    ? `Período pretendido: ${fmtDate(solic.periodo_checkin)} até ${fmtDate(solic.periodo_checkout)}.`
    : '';

  document.getElementById('inputObs').value = `${periodoStr} Solicitado por ${solic.solicitante_nome || solic.solicitante || 'Reservas'}: ${solic.motivo || ''}`.trim();
  
  // Replicar especificação de regras do modelo
  const mod = listaModelos.find(m => m.id === solic.modelo_id) || listaModelos[0] || MODELOS_PADRAO[0];
  if (mod) {
    document.getElementById('inputEspecUso').value = mod.regras_uso || '';
  }
}

async function cancelarSolicitacao(idSolicitacao) {
  if (!confirm('Deseja realmente cancelar esta solicitação?')) return;
  try {
    const { error } = await db.from('voucher_solicitacoes').update({ status: 'cancelado' }).eq('id', idSolicitacao);
    if (error) throw error;
  } catch (err) {
    // fallback local
  }
  const idx = listaSolicitacoes.findIndex(s => s.id === idSolicitacao);
  if (idx !== -1) {
    listaSolicitacoes[idx].status = 'cancelado';
    localStorage.setItem('rsm_solicitacoes', JSON.stringify(listaSolicitacoes));
  }
  showToast('Solicitação cancelada.');
  atualizarBadgeSolicitacoes();
  renderTabelaSolicitacoes();
}

// ── Event Listeners Principais ─────────────────────────────────
document.getElementById('tabNavCotas').addEventListener('click', () => mudarAba('cotas'));
document.getElementById('tabNavVouchers').addEventListener('click', () => mudarAba('vouchers'));
document.getElementById('tabNavSolicitacoes').addEventListener('click', () => mudarAba('solicitacoes'));
document.getElementById('tabNavReservas').addEventListener('click', () => mudarAba('reservas'));
document.getElementById('tabNavModelos').addEventListener('click', () => mudarAba('modelos'));

document.getElementById('btnNovo').addEventListener('click', abrirModalNovo);
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);
document.getElementById('btnFecharDelete').addEventListener('click', fecharModalDelete);
document.getElementById('btnCancelarDelete').addEventListener('click', fecharModalDelete);
document.getElementById('btnFecharBaixa').addEventListener('click', fecharModalBaixa);
document.getElementById('btnCancelarBaixa').addEventListener('click', fecharModalBaixa);

// Solicitações Listeners
document.getElementById('btnNovaSolicitacaoTop').addEventListener('click', () => abrirModalSolicitarVoucher());
document.getElementById('btnSolicitarVoucherReservas').addEventListener('click', () => abrirModalSolicitarVoucher());
document.getElementById('btnFecharSolicitarVoucher').addEventListener('click', fecharModalSolicitarVoucher);
document.getElementById('btnCancelarSolicitacao').addEventListener('click', fecharModalSolicitarVoucher);

document.getElementById('solicNomeSocio').addEventListener('input', (e) => {
  atualizarDicaSocioSolicitacao(e.target.value);
});

// Envio de Solicitação (Reservas ➔ Pós Venda)
document.getElementById('formSolicitarVoucher').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnConfirmarSolicitacao');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  const nomeSocio = document.getElementById('solicNomeSocio').value.trim();
  const checkin = document.getElementById('solicCheckin') ? document.getElementById('solicCheckin').value : '';
  const checkout = document.getElementById('solicCheckout') ? document.getElementById('solicCheckout').value : '';
  const modeloId = document.getElementById('solicModelo').value;
  const modeloObj = listaModelos.find(m => m.id === modeloId);
  const motivo = document.getElementById('solicMotivo').value.trim();
  const solicitanteNome = usuarioLogado ? usuarioLogado.nome : (document.getElementById('solicOperador').value.trim() || 'Equipe de Reservas');

  if (!checkin || !checkout) {
    showToast('Por favor, informe o período pretendido de Check-in e Check-out.', 'error');
    btn.disabled = false;
    btn.textContent = 'Enviar Solicitação ao Pós Venda';
    return;
  }

  const novaSolic = {
    id: nanoid(16),
    nome_socio: nomeSocio,
    modelo_id: modeloId,
    modelo_nome: modeloObj ? modeloObj.nome : modeloId,
    periodo_checkin: checkin,
    periodo_checkout: checkout,
    motivo: motivo,
    solicitante: solicitanteNome,
    solicitante_nome: solicitanteNome,
    status: 'pendente',
    status_fluxo: 'solicitado',
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await db.from('voucher_solicitacoes').insert([novaSolic]).select().single();
    if (!error && data) {
      novaSolic.id = data.id;
    }
  } catch (err) {
    console.warn('Erro ao salvar solicitação no Supabase, mantendo no cache local:', err);
  }

  listaSolicitacoes.unshift(novaSolic);
  localStorage.setItem('rsm_solicitacoes', JSON.stringify(listaSolicitacoes));
  showToast('Solicitação registrada! Aguardando o Pós Venda registrar as diárias.');
  fecharModalSolicitarVoucher();
  atualizarBadgeSolicitacoes();
  if (abaAtiva === 'solicitacoes') renderTabelaSolicitacoes();
  btn.disabled = false;
  btn.textContent = 'Enviar Solicitação ao Pós Venda';
});

// Filtros de Solicitações
document.querySelectorAll('[data-solic-filtro]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-solic-filtro]').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filtroSolicitacoes = btn.dataset.solicFiltro;
    renderTabelaSolicitacoes();
  });
});

document.getElementById('inputBuscaSolicitacoes').addEventListener('input', () => {
  clearTimeout(buscaSolicitacoesTimer);
  buscaSolicitacoesTimer = setTimeout(renderTabelaSolicitacoes, 250);
});

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) fecharModal();
});
document.getElementById('modalDelete').addEventListener('click', e => {
  if (e.target === document.getElementById('modalDelete')) fecharModalDelete();
});
document.getElementById('modalBaixaReserva').addEventListener('click', e => {
  if (e.target === document.getElementById('modalBaixaReserva')) fecharModalBaixa();
});
document.getElementById('modalSolicitarVoucher').addEventListener('click', e => {
  if (e.target === document.getElementById('modalSolicitarVoucher')) fecharModalSolicitarVoucher();
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

// ── Gestão de Usuários do Sistema (Admin) ─────────────────────
async function carregarUsuarios() {
  try {
    const { data, error } = await db.from('usuarios_sistema').select('*').order('created_at', { ascending: true });
    if (!error && data && data.length > 0) {
      listaUsuarios = data;
      localStorage.setItem('rsm_usuarios', JSON.stringify(data));
    }
  } catch (err) {
    console.warn('Erro ao carregar usuários do Supabase, usando local:', err);
  }
  if (abaAtiva === 'usuarios') {
    renderTabelaUsuarios();
  }
}

function renderTabelaUsuarios() {
  const tbody = document.getElementById('tbodyUsuarios');
  if (!tbody) return;

  const labels = {
    admin: '👑 Administrador',
    reservas: '🛎️ Reservas',
    pos_venda: '💼 Pós Venda'
  };

  tbody.innerHTML = listaUsuarios.map(u => {
    const isAtivo = u.ativo !== false;
    const statusBadge = isAtivo
      ? '<span class="badge badge-green">Ativo</span>'
      : '<span class="badge badge-red">Inativo</span>';

    return `
      <tr>
        <td><strong>${escHtml(u.nome)}</strong></td>
        <td><code>${escHtml(u.usuario)}</code></td>
        <td><span class="badge badge-blue">${labels[u.perfil] || u.perfil}</span></td>
        <td>${statusBadge}</td>
        <td style="font-size:.8rem;color:var(--text-3);">${fmtDate(u.created_at)}</td>
        <td>
          <div class="actions">
            <button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem;" onclick="abrirModalEditarUsuario('${u.id}')">✏️ Editar</button>
            <button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem;color:${isAtivo ? '#ea580c' : '#16a34a'};" onclick="alternarStatusUsuario('${u.id}')">
              ${isAtivo ? '🚫 Desativar' : '✅ Ativar'}
            </button>
            ${u.usuario !== 'admin' ? `
            <button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem;color:#dc2626;" onclick="excluirUsuario('${u.id}')">🗑️</button>` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function abrirModalNovoUsuario() {
  document.getElementById('editUsuarioId').value = '';
  document.getElementById('modalUsuarioTitulo').textContent = 'Cadastrar Novo Usuário';
  document.getElementById('formUsuario').reset();
  const check = document.getElementById('checkUsuarioAtivo');
  if (check) check.checked = true;
  document.getElementById('modalUsuario').classList.remove('hidden');
}

function abrirModalEditarUsuario(id) {
  const u = listaUsuarios.find(item => item.id === id);
  if (!u) return;
  document.getElementById('editUsuarioId').value = u.id;
  document.getElementById('modalUsuarioTitulo').textContent = `Editar — ${u.nome}`;
  document.getElementById('inputUsuarioNome').value = u.nome;
  document.getElementById('inputUsuarioLogin').value = u.usuario;
  document.getElementById('inputUsuarioSenha').value = u.senha;
  document.getElementById('selectUsuarioPerfil').value = u.perfil;
  const check = document.getElementById('checkUsuarioAtivo');
  if (check) check.checked = u.ativo !== false;
  document.getElementById('modalUsuario').classList.remove('hidden');
}

function fecharModalUsuario() {
  document.getElementById('modalUsuario').classList.add('hidden');
}

async function alternarStatusUsuario(id) {
  const u = listaUsuarios.find(item => item.id === id);
  if (!u) return;
  const novoStatus = !(u.ativo !== false);
  u.ativo = novoStatus;
  try {
    await db.from('usuarios_sistema').update({ ativo: novoStatus }).eq('usuario', u.usuario);
  } catch (e) {}
  localStorage.setItem('rsm_usuarios', JSON.stringify(listaUsuarios));
  showToast(`Usuário ${u.nome} foi ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
  renderTabelaUsuarios();
}

async function excluirUsuario(id) {
  const u = listaUsuarios.find(item => item.id === id);
  if (!u) return;
  if (u.usuario === 'admin') {
    showToast('Não é permitido excluir o usuário Administrador principal.', 'error');
    return;
  }
  if (!confirm(`Tem certeza que deseja excluir o operador ${u.nome}?`)) return;
  try {
    await db.from('usuarios_sistema').delete().eq('usuario', u.usuario);
  } catch (e) {}
  listaUsuarios = listaUsuarios.filter(item => item.id !== id && item.usuario !== u.usuario);
  localStorage.setItem('rsm_usuarios', JSON.stringify(listaUsuarios));
  showToast('Usuário excluído!');
  renderTabelaUsuarios();
}

window.abrirModalNovoUsuario = abrirModalNovoUsuario;
window.abrirModalEditarUsuario = abrirModalEditarUsuario;
window.fecharModalUsuario = fecharModalUsuario;
window.alternarStatusUsuario = alternarStatusUsuario;
window.excluirUsuario = excluirUsuario;

// Submit Usuário
document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editUsuarioId').value;
  const nome = document.getElementById('inputUsuarioNome').value.trim();
  const usuario = document.getElementById('inputUsuarioLogin').value.trim().toLowerCase();
  const senha = document.getElementById('inputUsuarioSenha').value.trim();
  const perfil = document.getElementById('selectUsuarioPerfil').value;
  const check = document.getElementById('checkUsuarioAtivo');
  const ativo = check ? check.checked : true;

  if (!nome || !usuario || !senha) {
    showToast('Preencha todos os campos obrigatórios.', 'error');
    return;
  }

  const loginExistente = listaUsuarios.find(u => u.usuario.toLowerCase() === usuario && u.id !== id);
  if (loginExistente) {
    showToast('Já existe um usuário cadastrado com este Login.', 'error');
    return;
  }

  const payload = {
    nome,
    usuario,
    senha,
    perfil,
    ativo,
    updated_at: new Date().toISOString()
  };

  try {
    if (id) {
      let atualizado = false;
      // 1. Atualizar por usuario (mais confiável e independente do formato de ID)
      try {
        const { data, error } = await db.from('usuarios_sistema').update(payload).eq('usuario', usuario).select();
        if (!error && data && data.length > 0) atualizado = true;
      } catch (e) {}

      // 2. Se não atualizou por usuario, tenta por id
      if (!atualizado) {
        try {
          await db.from('usuarios_sistema').update(payload).eq('id', id);
        } catch (e) {}
      }

      const idx = listaUsuarios.findIndex(u => u.id === id || (u.usuario || '').toLowerCase() === usuario);
      if (idx !== -1) listaUsuarios[idx] = { ...listaUsuarios[idx], ...payload };
      showToast('Usuário e senha atualizados com sucesso!');
    } else {
      payload.created_at = new Date().toISOString();
      try {
        const { data, error } = await db.from('usuarios_sistema').insert([{
          nome: payload.nome,
          usuario: payload.usuario,
          senha: payload.senha,
          perfil: payload.perfil,
          ativo: payload.ativo
        }]).select().single();
        if (!error && data) payload.id = data.id;
        else payload.id = `usr-${nanoid(8)}`;
      } catch (e) {
        payload.id = `usr-${nanoid(8)}`;
      }
      listaUsuarios.push(payload);
      showToast('Novo operador cadastrado com sucesso!');
    }
  } catch (err) {
    showToast('Erro ao gravar usuário no banco de dados', 'error');
  }

  localStorage.setItem('rsm_usuarios', JSON.stringify(listaUsuarios));
  fecharModalUsuario();
  renderTabelaUsuarios();
});

// Usuários Listeners
const btnNovoUsr = document.getElementById('btnNovoUsuario');
if (btnNovoUsr) btnNovoUsr.addEventListener('click', abrirModalNovoUsuario);
const btnFecharUsr = document.getElementById('btnFecharModalUsuario');
if (btnFecharUsr) btnFecharUsr.addEventListener('click', fecharModalUsuario);
const btnCancUsr = document.getElementById('btnCancelarUsuario');
if (btnCancUsr) btnCancUsr.addEventListener('click', fecharModalUsuario);
const tabUsr = document.getElementById('tabNavUsuarios');
if (tabUsr) tabUsr.addEventListener('click', () => mudarAba('usuarios'));

// ── Modal de Assinatura Oficial e Ativação de Voucher (Admin) ───
function abrirModalAssinarVoucher(voucherId) {
  const v = listaVouchers.find(item => item.id === voucherId);
  if (!v) return;

  document.getElementById('assinarVoucherId').value = v.id;
  document.getElementById('assinarSocioNome').textContent = `Voucher #${v.numero || v.codigo} — ${v.nome_socio}`;

  const periodoStr = (v.periodo_checkin && v.periodo_checkout)
    ? `${fmtDate(v.periodo_checkin)} até ${fmtDate(v.periodo_checkout)}`
    : 'Não especificado';

  document.getElementById('assinarDetalhesResumo').innerHTML = `
    <div><strong>Diárias Concedidas:</strong> ${v.diarias_totais || v.diarias || 2} diária(s)</div>
    <div><strong>Período Pretendido:</strong> ${periodoStr}</div>
    <div><strong>Modelo:</strong> ${escHtml(v.modelo_nome || 'Padrão RSM')}</div>
    <div><strong>Preparado por:</strong> ${escHtml(v.pos_venda_nome || 'Equipe de Pós Venda')}</div>
    ${v.solicitante_nome ? `<div><strong>Solicitado por:</strong> ${escHtml(v.solicitante_nome)}</div>` : ''}
  `;

  const imgPrev = document.getElementById('imgAssinaturaAdminPreviewModal');
  const txtPend = document.getElementById('txtAssinaturaPendenteConfig');
  if (assinaturaAdminAtual) {
    imgPrev.src = assinaturaAdminAtual;
    imgPrev.style.display = 'block';
    txtPend.style.display = 'none';
  } else {
    imgPrev.style.display = 'none';
    txtPend.style.display = 'block';
  }

  document.getElementById('modalAssinarAdmin').classList.remove('hidden');
}

function abrirModalAssinarVoucherPorCodigo(codigo) {
  const v = listaVouchers.find(item => item.codigo === codigo);
  if (v) {
    abrirModalAssinarVoucher(v.id);
  } else {
    showToast('Voucher correspondente não localizado na lista.', 'error');
  }
}

window.abrirModalAssinarVoucher = abrirModalAssinarVoucher;
window.abrirModalAssinarVoucherPorCodigo = abrirModalAssinarVoucherPorCodigo;

document.getElementById('btnConfirmarAssinaturaVoucher').addEventListener('click', async () => {
  if (!assinaturaAdminAtual) {
    showToast('Você precisa configurar sua assinatura oficial antes de assinar vouchers.', 'error');
    return;
  }

  const vId = document.getElementById('assinarVoucherId').value;
  const v = listaVouchers.find(item => item.id === vId);
  if (!v) {
    showToast('Voucher não encontrado', 'error');
    return;
  }

  const btn = document.getElementById('btnConfirmarAssinaturaVoucher');
  btn.disabled = true;
  btn.textContent = 'Assinando...';

  const adminNome = usuarioLogado ? usuarioLogado.nome : 'Administrador Geral';
  const agoraIso = new Date().toISOString();

  try {
    // 1. Atualizar voucher no Supabase
    await db.from('vouchers').update({
      status_fluxo: 'ativo',
      assinatura_url: assinaturaAdminAtual,
      admin_assinante_nome: adminNome,
      assinado_em: agoraIso
    }).eq('id', vId);

    v.status_fluxo = 'ativo';
    v.assinatura_url = assinaturaAdminAtual;
    v.admin_assinante_nome = adminNome;
    v.assinado_em = agoraIso;

    // 2. Atualizar solicitação vinculada se existir
    const solic = listaSolicitacoes.find(s => s.voucher_codigo === v.codigo);
    if (solic) {
      solic.status = 'gerado';
      try {
        await db.from('voucher_solicitacoes').update({ status: 'gerado' }).eq('id', solic.id);
      } catch (e) {}
      localStorage.setItem('rsm_solicitacoes', JSON.stringify(listaSolicitacoes));
    }

    showToast(`Voucher #${v.numero || v.codigo} assinado e ativado com sucesso!`);
    document.getElementById('modalAssinarAdmin').classList.add('hidden');
    sincronizarCotas();
    if (abaAtiva === 'vouchers') carregarVouchers();
    if (abaAtiva === 'solicitacoes') renderTabelaSolicitacoes();
  } catch (err) {
    showToast('Erro ao gravar assinatura do voucher', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '✓ Confirmar Assinatura & Ativar Voucher';
  }
});

document.getElementById('btnFecharModalAssinarAdmin').addEventListener('click', () => {
  document.getElementById('modalAssinarAdmin').classList.add('hidden');
});
document.getElementById('btnCancelarAssinarAdmin').addEventListener('click', () => {
  document.getElementById('modalAssinarAdmin').classList.add('hidden');
});

// Fechar com clique fora
document.getElementById('modalUsuario').addEventListener('click', e => {
  if (e.target === document.getElementById('modalUsuario')) fecharModalUsuario();
});
document.getElementById('modalAssinarAdmin').addEventListener('click', e => {
  if (e.target === document.getElementById('modalAssinarAdmin')) document.getElementById('modalAssinarAdmin').classList.add('hidden');
});

// ── Inicialização do Sistema ───────────────────────────────────
initTema();
carregarUsuarios();
initControleAcesso();
initCanvasAssinatura();
carregarSelectModelos();
sincronizarCotas();


