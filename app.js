// ── Inicializa Supabase ────────────────────────────────────────
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Estado da Aplicação ─────────────────────────────────────────
let abaAtiva = 'cotas'; // 'cotas' ou 'vouchers'
let filtroStatusVouchers = '';
let filtroCotas = 'todos'; // 'todos', 'multi', 'single', 'pendentes', 'emitidos'
let buscaVouchersTimer = null;
let buscaCotasTimer = null;
let idParaDeletar = null;

// Lista de cotas em memória (iniciada com os dados importados)
let listaCotas = typeof COTAS_IMPORTADAS !== 'undefined' ? JSON.parse(JSON.stringify(COTAS_IMPORTADAS)) : [];
let listaVouchers = [];

// Regras padrão de uso do modelo RSM
const ESPECIFICACOES_PADRAO = `Para agendamento ligar 83 98834-0045, no Hotel Villamor Prime.
Este Voucher é intransferível.
Diárias com check-in Domingo e check-out até a Quinta-Feira, exceto se for Encontro de Sócios Proprietários aos finais de semana.
Quantidade de diária para um casal, não fracionadas.
Café da manhã incluso nas diárias.
Diárias em apartamento LUXO.
Reservas sujeitas à disponibilidade.
Uso restrito no Hotel Villamor Prime.
Exceto feriados, datas comemorativas e eventos terceirizado.
A utilização se dará após 10% do contrato integralizado.`;

// ── Helpers ────────────────────────────────────────────────────
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

// ── Troca de Abas ──────────────────────────────────────────────
function mudarAba(novaAba) {
  abaAtiva = novaAba;
  const btnCotas = document.getElementById('tabNavCotas');
  const btnVouchers = document.getElementById('tabNavVouchers');
  const secaoCotas = document.getElementById('secaoCotas');
  const secaoVouchers = document.getElementById('secaoVouchers');

  if (novaAba === 'cotas') {
    btnCotas.classList.add('active');
    btnVouchers.classList.remove('active');
    secaoCotas.classList.remove('hidden');
    secaoVouchers.classList.add('hidden');
    renderTabelaCotas();
  } else {
    btnCotas.classList.remove('active');
    btnVouchers.classList.add('active');
    secaoCotas.classList.add('hidden');
    secaoVouchers.classList.remove('hidden');
    carregarVouchers();
  }
}

// ── Carregar Dados das Cotas ───────────────────────────────────
async function sincronizarCotas() {
  // 1. Tentar buscar cotas do Supabase se a tabela existir
  try {
    const { data, error } = await db.from('cotas_socios').select('*').order('nome_socio');
    if (!error && data && data.length > 0) {
      listaCotas = data;
    }
  } catch (e) {
    console.log('Tabela cotas_socios não encontrada no Supabase, usando base local.');
  }

  // 2. Buscar vouchers emitidos para cruzar os status
  try {
    const { data: vouchers, error } = await db.from('vouchers').select('*');
    if (!error && vouchers) {
      listaVouchers = vouchers;
      atualizarStatusCotasComVouchers();
    }
  } catch (e) {
    console.error('Erro ao buscar vouchers:', e);
  }

  renderStatsCotas();
  renderTabelaCotas();
}

function atualizarStatusCotasComVouchers() {
  // Mapear vouchers por nome de sócio (e vincular cada voucher a uma cota pendente daquele sócio)
  const vouchersPorSocio = {};
  listaVouchers.forEach(v => {
    const nomeNorm = (v.nome_socio || '').trim().toUpperCase();
    if (!vouchersPorSocio[nomeNorm]) vouchersPorSocio[nomeNorm] = [];
    vouchersPorSocio[nomeNorm].push(v);
  });

  // Copia dos contadores de uso de voucher para cotas
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

  // Atualizar contador da navbar
  document.getElementById('badgeTotalCotas').textContent = listaCotas.length;
  document.getElementById('badgeTotalVouchers').textContent = listaVouchers.length;
}

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
    // Busca por nome do sócio ou produto
    if (busca) {
      const matchNome = c.nome_socio.toLowerCase().includes(busca);
      const matchProd = c.produto.toLowerCase().includes(busca);
      if (!matchNome && !matchProd) return false;
    }

    // Filtros de tipo
    if (filtroCotas === 'multi') return c.total_cotas > 1;
    if (filtroCotas === 'single') return c.total_cotas === 1;
    if (filtroCotas === 'pendentes') return !c.voucher_codigo;
    if (filtroCotas === 'emitidos') return !!c.voucher_codigo;

    return true;
  });

  if (!filtrados.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty">Nenhuma cota encontrada com os filtros selecionados.</td></tr>';
    return;
  }

  tbody.innerHTML = filtrados.map((c, i) => {
    const isMulti = c.total_cotas > 1;
    const badgeCota = isMulti
      ? `<span class="badge badge-cota-multi">🔥 ${c.total_cotas} Cotas (${c.cota_ordem}ª de ${c.total_cotas})</span>`
      : `<span class="badge badge-cota-single">⭐ Cota Única</span>`;

    const statusBadge = c.voucher_codigo
      ? `<span class="badge badge-emitido">✓ Emitido (Nº ${c.voucher_numero || c.voucher_codigo})</span>`
      : `<span class="badge badge-pendente">⏳ Pendente</span>`;

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
      : `
        <button class="btn-emitir" onclick="abrirModalEmitirParaCota('${escHtml(c.id)}')">
          ⚡ Emitir Voucher
        </button>`;

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
        <td>${statusBadge}</td>
        <td>${acaoHtml}</td>
      </tr>
    `;
  }).join('');
}

// ── Abrir Modal Pré-preenchido para Cota ───────────────────────
function abrirModalEmitirParaCota(cotaId) {
  const cota = listaCotas.find(c => c.id === cotaId);
  if (!cota) return;

  document.getElementById('editId').value = '';
  document.getElementById('cotaVinculadaId').value = cota.id;
  document.getElementById('modalTitulo').textContent = `Emitir Voucher — ${cota.nome_socio}`;
  document.getElementById('btnSalvar').textContent = 'Confirmar e Emitir';

  document.getElementById('inputNome').value = cota.nome_socio;
  document.getElementById('inputSala').value = 'VILLA';
  document.getElementById('inputValor').value = ''; // valor em branco, digitamos depois
  document.getElementById('inputDiarias').value = 2; // padrão 2 diárias
  document.getElementById('inputBrinde').value = `02 DIÁRIAS ANUAIS VILLAMOR — ${cota.produto}`;
  
  // Validade padrão: 1 ano à frente
  const dataHoje = new Date();
  dataHoje.setFullYear(dataHoje.getFullYear() + 1);
  document.getElementById('inputValidade').value = dataHoje.toISOString().split('T')[0];

  document.getElementById('inputObs').value = `Voucher de 02 (duas) diárias anuais para um casal no Hotel Villamor Prime (${cota.produto}).`;
  document.getElementById('inputEspecUso').value = ESPECIFICACOES_PADRAO;

  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputValor').focus();
}

// ── Carregar Vouchers Emitidos ─────────────────────────────────
async function carregarVouchers() {
  const busca = document.getElementById('inputBusca').value.trim();

  let query = db.from('vouchers').select('*').order('created_at', { ascending: false });

  if (busca) query = query.ilike('nome_socio', `%${busca}%`);
  if (filtroStatusVouchers === 'usado') query = query.eq('usado', true);
  if (filtroStatusVouchers === 'disponivel') query = query.eq('usado', false);

  const { data, error } = await query;

  if (error) {
    document.getElementById('tbodyVouchers').innerHTML =
      '<tr><td colspan="8" class="empty">Erro ao carregar vouchers. Verifique a conexão com o Supabase.</td></tr>';
    console.error(error);
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
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statDisponiveis').textContent = total - usados;
  document.getElementById('statUsados').textContent = usados;
  document.getElementById('statValor').textContent =
    fmt(dados.reduce((a, v) => a + Number(v.valor_hospedagem || 0), 0));
}

function renderTabelaVouchers(dados) {
  const tbody = document.getElementById('tbodyVouchers');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty">Nenhum voucher emitido até o momento.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(v => `
    <tr>
      <td><strong>#${v.numero || '—'}</strong></td>
      <td><strong>${escHtml(v.nome_socio)}</strong></td>
      <td>${v.diarias || 2} diária${(v.diarias || 2) > 1 ? 's' : ''}</td>
      <td>${fmt(v.valor_hospedagem)}</td>
      <td><span class="badge ${v.usado ? 'badge-red' : 'badge-green'}">${v.usado ? 'Utilizado' : 'Disponível'}</span></td>
      <td>${fmtDateTime(v.data_uso)}</td>
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
          <button class="btn-icon" title="${v.usado ? 'Desmarcar' : 'Marcar como usado'}" onclick="toggleUso('${v.id}', ${v.usado})">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              ${v.usado
                ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>'
                : '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'}
            </svg>
          </button>
          <button class="btn-icon" title="Editar" onclick="abrirModalEditar('${v.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="btn-icon danger" title="Excluir" onclick="confirmarDelete('${v.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ── Toggle Uso ─────────────────────────────────────────────────
async function toggleUso(id, estadoAtual) {
  const novoEstado = !estadoAtual;
  const { error } = await db
    .from('vouchers')
    .update({ usado: novoEstado, data_uso: novoEstado ? new Date().toISOString() : null })
    .eq('id', id);

  if (error) { showToast('Erro ao atualizar', 'error'); return; }
  showToast(novoEstado ? 'Marcado como utilizado!' : 'Desmarcado!');
  carregarVouchers();
}

// ── Modal Criar / Editar ───────────────────────────────────────
function abrirModalNovo() {
  document.getElementById('editId').value = '';
  document.getElementById('cotaVinculadaId').value = '';
  document.getElementById('modalTitulo').textContent = 'Novo Voucher Manual';
  document.getElementById('btnSalvar').textContent = 'Salvar Voucher';
  document.getElementById('formVoucher').reset();
  document.getElementById('inputDiarias').value = 2;
  document.getElementById('inputSala').value = 'VILLA';
  document.getElementById('inputObs').value = 'Voucher de 02 (duas) diárias anuais para um casal no Hotel Villamor Prime.';
  document.getElementById('inputEspecUso').value = ESPECIFICACOES_PADRAO;
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

async function abrirModalEditar(id) {
  const { data: v, error } = await db.from('vouchers').select('*').eq('id', id).single();
  if (error || !v) { showToast('Erro ao carregar voucher', 'error'); return; }

  document.getElementById('editId').value = v.id;
  document.getElementById('cotaVinculadaId').value = '';
  document.getElementById('inputNome').value = v.nome_socio;
  document.getElementById('inputSala').value = v.sala_venda || '';
  document.getElementById('inputValor').value = v.valor_hospedagem !== null ? v.valor_hospedagem : '';
  document.getElementById('inputDiarias').value = v.diarias || 2;
  document.getElementById('inputBrinde').value = v.brinde_descricao || '';
  document.getElementById('inputValidade').value = v.validade || '';
  document.getElementById('inputObs').value = v.observacoes || '';
  document.getElementById('inputEspecUso').value = v.especificacoes_uso || ESPECIFICACOES_PADRAO;
  document.getElementById('modalTitulo').textContent = 'Editar Voucher';
  document.getElementById('btnSalvar').textContent = 'Atualizar Voucher';
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

// ── Submit do Formulário de Voucher ────────────────────────────
document.getElementById('formVoucher').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnSalvar');
  btn.disabled = true;
  btn.textContent = 'Emitindo…';

  const id = document.getElementById('editId').value;
  const cotaId = document.getElementById('cotaVinculadaId').value;
  const valorInput = document.getElementById('inputValor').value;

  const payload = {
    nome_socio:         document.getElementById('inputNome').value.trim(),
    sala_venda:         document.getElementById('inputSala').value.trim() || null,
    valor_hospedagem:   valorInput !== '' ? Number(valorInput) : 0,
    diarias:            Number(document.getElementById('inputDiarias').value) || 2,
    brinde_descricao:   document.getElementById('inputBrinde').value.trim() || null,
    validade:           document.getElementById('inputValidade').value || null,
    observacoes:        document.getElementById('inputObs').value.trim() || null,
    especificacoes_uso: document.getElementById('inputEspecUso').value.trim() || null,
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
      const { data, error } = await db.from('vouchers').insert([payload]).select().single();
      if (error) throw error;
      resultData = data;
      showToast(`Voucher emitido com sucesso! Código: ${resultData.codigo}`);

      // Se foi emitido a partir de uma cota, vincular
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
    if (abaAtiva === 'vouchers') {
      carregarVouchers();
    }
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

// ── Event Listeners ────────────────────────────────────────────
// Navegação entre abas
document.getElementById('tabNavCotas').addEventListener('click', () => mudarAba('cotas'));
document.getElementById('tabNavVouchers').addEventListener('click', () => mudarAba('vouchers'));

// Botões modal
document.getElementById('btnNovo').addEventListener('click', abrirModalNovo);
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);
document.getElementById('btnFecharDelete').addEventListener('click', fecharModalDelete);
document.getElementById('btnCancelarDelete').addEventListener('click', fecharModalDelete);

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) fecharModal();
});
document.getElementById('modalDelete').addEventListener('click', e => {
  if (e.target === document.getElementById('modalDelete')) fecharModalDelete();
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

// Busca na Base de Cotas
document.getElementById('inputBuscaCotas').addEventListener('input', () => {
  clearTimeout(buscaCotasTimer);
  buscaCotasTimer = setTimeout(renderTabelaCotas, 250);
});

// Filtros da aba Vouchers Emitidos
document.querySelectorAll('#secaoVouchers .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#secaoVouchers .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filtroStatusVouchers = btn.dataset.status;
    carregarVouchers();
  });
});

// Busca na aba Vouchers Emitidos
document.getElementById('inputBusca').addEventListener('input', () => {
  clearTimeout(buscaVouchersTimer);
  buscaVouchersTimer = setTimeout(carregarVouchers, 300);
});

// ── Inicialização ──────────────────────────────────────────────
sincronizarCotas();
