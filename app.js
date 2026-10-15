// ── Inicializa Supabase ────────────────────────────────────────
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Estado ─────────────────────────────────────────────────────
let filtroStatus = '';
let buscaTimer = null;
let idParaDeletar = null;

// ── Helpers ────────────────────────────────────────────────────
function fmt(val) {
  return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function escHtml(str) {
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

// Link público do voucher (GitHub Pages usa ?v=CODIGO)
function linkVoucher(codigo) {
  return `${window.location.origin}${window.location.pathname.replace('index.html', '')}voucher.html?v=${codigo}`;
}

function copiarLink(codigo) {
  const url = linkVoucher(codigo);
  navigator.clipboard.writeText(url)
    .then(() => showToast('Link copiado!'))
    .catch(() => prompt('Copie o link:', url));
}

// ── Carregar e renderizar ──────────────────────────────────────
async function carregarVouchers() {
  const busca = document.getElementById('inputBusca').value.trim();

  let query = db.from('vouchers').select('*').order('created_at', { ascending: false });

  if (busca) query = query.ilike('nome_socio', `%${busca}%`);
  if (filtroStatus === 'usado') query = query.eq('usado', true);
  if (filtroStatus === 'disponivel') query = query.eq('usado', false);

  const { data, error } = await query;

  if (error) {
    document.getElementById('tbodyVouchers').innerHTML =
      '<tr><td colspan="7" class="empty">Erro ao carregar. Verifique a conexão com o Supabase.</td></tr>';
    console.error(error);
    return;
  }

  renderStats(data);
  renderTabela(data);
}

function renderStats(dados) {
  const total = dados.length;
  const usados = dados.filter(v => v.usado).length;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statDisponiveis').textContent = total - usados;
  document.getElementById('statUsados').textContent = usados;
  document.getElementById('statValor').textContent =
    fmt(dados.reduce((a, v) => a + Number(v.valor_hospedagem), 0));
}

function renderTabela(dados) {
  const tbody = document.getElementById('tbodyVouchers');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty">Nenhum voucher encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(v => `
    <tr>
      <td><strong>${escHtml(v.nome_socio)}</strong></td>
      <td>${v.diarias} diária${v.diarias > 1 ? 's' : ''}</td>
      <td>${fmt(v.valor_hospedagem)}</td>
      <td><span class="badge ${v.usado ? 'badge-red' : 'badge-green'}">${v.usado ? 'Utilizado' : 'Disponível'}</span></td>
      <td>${fmtDate(v.data_uso)}</td>
      <td>
        <button class="link-copy" onclick="copiarLink('${v.codigo}')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
          Copiar link
        </button>
      </td>
      <td>
        <div class="actions">
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

// ── Toggle uso ─────────────────────────────────────────────────
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
// Cache dos vouchers para edição sem nova query
let _cacheVouchers = [];

async function abrirModalNovo() {
  document.getElementById('editId').value = '';
  document.getElementById('modalTitulo').textContent = 'Novo Voucher';
  document.getElementById('btnSalvar').textContent = 'Salvar Voucher';
  document.getElementById('formVoucher').reset();
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

async function abrirModalEditar(id) {
  const { data: v, error } = await db.from('vouchers').select('*').eq('id', id).single();
  if (error || !v) { showToast('Erro ao carregar voucher', 'error'); return; }

  document.getElementById('editId').value = v.id;
  document.getElementById('inputNome').value = v.nome_socio;
  document.getElementById('inputValor').value = v.valor_hospedagem;
  document.getElementById('inputDiarias').value = v.diarias;
  document.getElementById('inputObs').value = v.observacoes || '';
  document.getElementById('modalTitulo').textContent = 'Editar Voucher';
  document.getElementById('btnSalvar').textContent = 'Atualizar Voucher';
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('inputNome').focus();
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

// Submit
document.getElementById('formVoucher').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnSalvar');
  btn.disabled = true;
  btn.textContent = 'Salvando…';

  const id = document.getElementById('editId').value;
  const payload = {
    nome_socio: document.getElementById('inputNome').value.trim(),
    valor_hospedagem: Number(document.getElementById('inputValor').value),
    diarias: Number(document.getElementById('inputDiarias').value),
    observacoes: document.getElementById('inputObs').value.trim() || null,
  };

  try {
    let error;
    if (id) {
      ({ error } = await db.from('vouchers').update(payload).eq('id', id));
    } else {
      payload.codigo = nanoid(10);
      ({ error } = await db.from('vouchers').insert([payload]));
    }

    if (error) throw error;
    showToast(id ? 'Voucher atualizado!' : 'Voucher criado!');
    fecharModal();
    carregarVouchers();
  } catch (err) {
    showToast(err.message || 'Erro ao salvar', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = id ? 'Atualizar Voucher' : 'Salvar Voucher';
  }
});

// ── Deletar ────────────────────────────────────────────────────
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
  if (error) { showToast('Erro ao excluir', 'error'); return; }
  showToast('Voucher excluído!');
  fecharModalDelete();
  carregarVouchers();
});

// ── Event listeners ────────────────────────────────────────────
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

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    filtroStatus = btn.dataset.status;
    carregarVouchers();
  });
});

document.getElementById('inputBusca').addEventListener('input', () => {
  clearTimeout(buscaTimer);
  buscaTimer = setTimeout(carregarVouchers, 350);
});

// ── Init ───────────────────────────────────────────────────────
carregarVouchers();
