const state = { alerts: 3, parents: 128, modules: 74 };
const toast = document.querySelector('#toast');

function announce(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 3600);
}

function updateMetrics() {
  document.querySelector('#alerts-count').textContent = state.alerts;
  document.querySelector('#parents-count').textContent = state.parents;
  document.querySelector('#modules-count').textContent = state.modules;
}

document.querySelector('[data-action="refresh"]').addEventListener('click', () => {
  const stamp = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
  document.querySelector('#sync-status').textContent = `Dernière mise à jour : ${stamp} · démo locale`;
  announce('Le tableau de démonstration a été actualisé localement.');
});

document.querySelector('[data-action="create"]').addEventListener('click', () => {
  state.alerts += 1;
  state.parents += 1;
  updateMetrics();
  const row = document.createElement('tr');
  row.innerHTML = '<td>Nouveau besoin d’orientation</td><td>Application</td><td><span class="status open">À contacter</span></td><td>Proposer un échange confidentiel</td><td><button class="resolve" type="button">Marquer suivi</button></td>';
  document.querySelector('#signal-body').prepend(row);
  announce('Signal synthétique ajouté. Aucun contact réel n’a été créé.');
});

document.querySelector('#signal-body').addEventListener('click', (event) => {
  const button = event.target.closest('.resolve');
  if (!button) return;
  const row = button.closest('tr');
  row.querySelector('.status').className = 'status done';
  row.querySelector('.status').textContent = 'Suivi consigné';
  button.remove();
  state.alerts = Math.max(0, state.alerts - 1);
  updateMetrics();
  announce('Le suivi est noté dans cette démonstration locale.');
});
