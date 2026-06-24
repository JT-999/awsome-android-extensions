const ICONS = {
  shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="15" x2="22" y2="15"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  play: '<rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10,8 16,12 10,16"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1z"/>',
};

let DATA = null;

async function loadData() {
  const resp = await fetch('data/extensions.json');
  DATA = await resp.json();
  renderBrowsers();
  renderTabs();
  renderExtensions(DATA.categories[0].id);
  renderQR();
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

function renderBrowsers() {
  const grid = document.getElementById('browser-grid');
  grid.innerHTML = DATA.browsers.map(b => `
    <div class="browser-card reveal">
      <h3>${b.name}</h3>
      <span class="impl">${b.impl}</span>
      <p>${b.desc}</p>
      ${b.url ? `<a href="${b.url}" target="_blank" rel="noopener">下载 &nearr;</a>` : '<span style="color:var(--text-dim);font-size:.85rem">应用市场搜索</span>'}
    </div>
  `).join('');
}

function renderTabs() {
  const container = document.getElementById('tabs');
  container.innerHTML = DATA.categories.map((cat, i) => `
    <button class="tab${i === 0 ? ' active' : ''}" data-id="${cat.id}">${cat.name}</button>
  `).join('');

  container.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderExtensions(btn.dataset.id);
  });
}

function renderExtensions(catId) {
  const cat = DATA.categories.find(c => c.id === catId);
  if (!cat) return;
  const grid = document.getElementById('ext-grid');
  grid.innerHTML = cat.items.map(ext => `
    <div class="ext-card">
      <div class="ext-head">
        <span class="ext-name">${ext.name}</span>
        <span class="ext-size">${ext.size}</span>
      </div>
      <p class="ext-desc">${ext.desc}</p>
      <div class="ext-actions">
        <a class="ext-dl" href="${DATA.extBase}${ext.file}" download>下载</a>
        <a class="ext-store" href="${ext.store}" target="_blank" rel="noopener">商店 &nearr;</a>
      </div>
    </div>
  `).join('');
}

function renderQR() {
  const url = DATA.qrTarget;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  document.querySelectorAll('.qr-img').forEach(img => { img.src = qrSrc; });
}

document.addEventListener('DOMContentLoaded', loadData);
