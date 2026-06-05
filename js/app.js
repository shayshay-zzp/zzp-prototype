/* ZZP App — Router, Charts, Interactions */
let currentPage = 'dashboard';
let currentTab = 'overview';
let currentDetail = null;
let previousPage = 'dashboard';
let charts = {};

function init() {
  renderNav();
  navigate('dashboard');
  bindGlobalEvents();
  updateNotifPanel();
  runAutoFlowsOnLoad();
}

function renderModuleTabs(pageId) {
  if (!MODULE_GUIDES[pageId] || currentDetail) return '';
  const prog = getGuideProgress(pageId);
  const flows = getFlowsForModule(pageId);
  return `
    <div class="flex gap-1 mb-6 border-b border-slate-200 -mt-2">
      <button onclick="setTab('overview')" class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${currentTab === 'overview' ? 'border-zzp-500 text-zzp-700' : 'border-transparent text-slate-500 hover:text-slate-700'}">Tổng quan</button>
      <button onclick="setTab('guide')" class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${currentTab === 'guide' ? 'border-zzp-500 text-zzp-700' : 'border-transparent text-slate-500 hover:text-slate-700'}">Hướng dẫn <span class="text-xs ml-1 px-1.5 py-0.5 rounded-full ${prog.pct === 100 ? 'bg-green-100 text-green-700' : 'bg-slate-100'}">${prog.done}/${prog.total}</span></button>
      <button onclick="setTab('flow')" class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${currentTab === 'flow' ? 'border-zzp-500 text-zzp-700' : 'border-transparent text-slate-500 hover:text-slate-700'}">Flow tự động ${flows.length ? `<span class="text-xs ml-1 px-1.5 py-0.5 rounded-full bg-zzp-100 text-zzp-700">${flows.length}</span>` : ''}</button>
    </div>`;
}

function setTab(tab) {
  currentTab = tab;
  renderCurrentView();
}

function openDetail(type, id) {
  previousPage = currentPage;
  currentDetail = { type, id };
  currentTab = 'overview';
  renderCurrentView();
}

function goBack() {
  currentDetail = null;
  navigate(previousPage || 'dashboard');
}

function renderCurrentView() {
  if (currentDetail) {
    document.getElementById('main-content').innerHTML = renderDetailPage(currentDetail.type, currentDetail.id);
    document.getElementById('page-title').textContent = currentDetail.id;
    destroyCharts();
    refreshIcons(document.getElementById('main-content'));
    return;
  }
  const renderer = PAGES[currentPage];
  if (!renderer) return;
  let html = renderer();
  if (MODULE_GUIDES[currentPage]) {
    const mb6 = html.indexOf('class="mb-6"');
    const splitIdx = mb6 > -1 ? html.indexOf('</div>', mb6) + 6 : html.indexOf('<div class="grid');
    const headerPart = splitIdx > 0 ? html.substring(0, splitIdx) : html;
    const bodyPart = splitIdx > 0 ? html.substring(splitIdx) : '';
    if (currentTab === 'guide') html = headerPart + renderModuleTabs(currentPage) + renderGuidePanel(currentPage);
    else if (currentTab === 'flow') html = headerPart + renderModuleTabs(currentPage) + renderFlowPanel(currentPage);
    else html = headerPart + renderModuleTabs(currentPage) + bodyPart;
  }
  document.getElementById('main-content').innerHTML = html;
  destroyCharts();
  requestAnimationFrame(() => { initCharts(currentPage); refreshIcons(document.getElementById('main-content')); });
  updateHealthBadge();
}

function renderNav() {
  const menu = document.getElementById('nav-menu');
  menu.innerHTML = NAV.map(section => `
    <div class="mb-2">
      <p class="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">${section.section}</p>
      ${section.items.map(item => `
        <a href="#${item.id}" data-page="${item.id}" onclick="event.preventDefault();navigate('${item.id}')"
           class="sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          ${icon(item.icon, 16)}<span>${item.label}</span>
        </a>`).join('')}
    </div>`).join('');
  refreshIcons(menu);
}

function navigate(page) {
  if (!currentDetail && page !== currentPage) previousPage = currentPage;
  if (page !== currentPage) currentTab = 'overview';
  currentPage = page;
  currentDetail = null;
  const renderer = PAGES[page];
  if (!renderer) return;

  document.querySelectorAll('.sidebar-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  const titles = {};
  NAV.forEach(s => s.items.forEach(i => { titles[i.id] = i.label; }));
  document.getElementById('page-title').textContent = titles[page] || page;
  renderCurrentView();
  window.location.hash = page;
}

function destroyCharts() {
  Object.values(charts).forEach(c => c?.destroy?.());
  charts = {};
}

function initCharts(page) {
  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
  };

  if (page === 'dashboard') {
    const ctx = document.getElementById('chart-main');
    if (ctx) {
      charts.main = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 14 }, (_, i) => `${22 + i}/5`),
          datasets: [
            { label: 'GMV', data: ZZP_DATA.gmvTrend, borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,.1)', fill: true, tension: .4 },
            { label: 'Lợi nhuận', data: ZZP_DATA.profitTrend, borderColor: '#6366f1', tension: .4 }
          ]
        },
        options: { ...chartDefaults, scales: { y: { ticks: { callback: v => fmt(v) } } } }
      });
    }
    makePie('chart-revenue-src', ['Organic', 'Affiliate', 'Ads', 'Livestream'],
      [ZZP_DATA.revenueBreakdown.organic, ZZP_DATA.revenueBreakdown.affiliate, ZZP_DATA.revenueBreakdown.ads, ZZP_DATA.revenueBreakdown.livestream],
      ['#94a3b8', '#14b8a6', '#fe2c55', '#6366f1']);
  }

  if (page === 'affiliate') {
    makeBar('chart-affiliate', ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.name.replace('@', '')),
      ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.gmv30d / 1e6), 'GMV (triệu)', '#14b8a6');
  }

  if (page === 'executive') {
    makeLine('chart-executive', Array.from({ length: 14 }, (_, i) => `${22 + i}/5`), ZZP_DATA.gmvTrend, 'GMV', '#14b8a6');
    makeDoughnut('chart-costs', ['COGS', 'Shipping', 'Commission', 'Ads', 'Voucher', 'Other'],
      [ZZP_DATA.costs.cogs, ZZP_DATA.costs.shipping, ZZP_DATA.costs.commission, ZZP_DATA.costs.ads, ZZP_DATA.costs.voucher,
        ZZP_DATA.costs.sample + ZZP_DATA.costs.agency + ZZP_DATA.costs.platform]);
  }

  if (page === 'revenue') {
    makeDoughnut('chart-attribution', ['Affiliate', 'Livestream', 'Ads', 'Organic'],
      [ZZP_DATA.revenueBreakdown.affiliate, ZZP_DATA.revenueBreakdown.livestream, ZZP_DATA.revenueBreakdown.ads, ZZP_DATA.revenueBreakdown.organic],
      ['#14b8a6', '#6366f1', '#fe2c55', '#94a3b8']);
  }

  if (page === 'profit') {
    const p = calcProfit();
    makeBar('chart-pnl', ['Doanh thu', 'COGS', 'Vận chuyển', 'Commission', 'Ads', 'Voucher', 'Khác', 'Lợi nhuận'],
      [p.revenue, -ZZP_DATA.costs.cogs, -ZZP_DATA.costs.shipping, -ZZP_DATA.costs.commission, -ZZP_DATA.costs.ads, -ZZP_DATA.costs.voucher,
        -(ZZP_DATA.costs.sample + ZZP_DATA.costs.agency + ZZP_DATA.costs.platform), p.profit],
      'VND', undefined, v => v < 0 ? '#ef4444' : '#14b8a6');
  }

  if (page === 'affiliate-analytics') {
    makePie('chart-aff-contrib', ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.name),
      ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.gmv30d));
  }

  if (page === 'customer-analytics') {
    makeLine('chart-cohort', ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      [100, 42, 28, 22, 18, 15], 'Retention %', '#6366f1');
  }

  if (page === 'forecast') {
    const ctx = document.getElementById('chart-forecast');
    if (ctx) {
      charts.forecast = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ZZP_DATA.forecasts.gmvLabels,
          datasets: [
            { label: 'Dự báo GMV', data: ZZP_DATA.forecasts.gmv7d.map(v => v / 1e6), backgroundColor: 'rgba(20,184,166,.7)', borderRadius: 6 },
            { label: 'Confidence range', data: ZZP_DATA.forecasts.gmv7d.map(v => v * 0.85 / 1e6), backgroundColor: 'rgba(148,163,184,.3)', borderRadius: 6 }
          ]
        },
        options: { ...chartDefaults, scales: { y: { title: { display: true, text: 'Triệu VND' } } } }
      });
    }
  }
}

function makePie(id, labels, data, colors) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  const defaultColors = colors || ['#14b8a6', '#6366f1', '#fe2c55', '#f59e0b', '#94a3b8'];
  charts[id] = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: defaultColors }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });
}

function makeDoughnut(id, labels, data, colors) {
  makePie(id, labels, data, colors);
}

function makeBar(id, labels, data, label, color, colorFn) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  const bg = colorFn ? data.map(colorFn) : (color || '#14b8a6');
  charts[id] = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label, data: data.map(v => typeof v === 'number' && Math.abs(v) > 1e6 ? v / 1e6 : v), backgroundColor: bg, borderRadius: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });
}

function makeLine(id, labels, data, label, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  charts[id] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ label, data: data.map(v => v / 1e6), borderColor: color, backgroundColor: color + '20', fill: true, tension: .4 }] },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { title: { display: true, text: 'Triệu VND' } } } }
  });
}

function bindGlobalEvents() {
  document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('-ml-72');
  });

  document.getElementById('notif-btn').addEventListener('click', () => {
    document.getElementById('notif-panel').classList.remove('translate-x-full');
    document.getElementById('notif-overlay').classList.remove('hidden');
  });

  document.getElementById('close-notif').addEventListener('click', closeNotifPanel);
  document.getElementById('notif-overlay').addEventListener('click', closeNotifPanel);
  document.getElementById('modal-overlay')?.addEventListener('click', closeModal);

  window.addEventListener('hashchange', () => {
    const page = location.hash.slice(1);
    if (page && PAGES[page] && page !== currentPage) navigate(page);
  });
}

function closeNotifPanel() {
  document.getElementById('notif-panel').classList.add('translate-x-full');
  document.getElementById('notif-overlay').classList.add('hidden');
}

function updateNotifPanel() {
  const list = document.getElementById('notif-list');
  const unread = ZZP_DATA.alerts.filter(a => !a.read);
  document.getElementById('notif-count').textContent = unread.length;
  document.getElementById('notif-count').classList.toggle('hidden', unread.length === 0);

  list.innerHTML = ZZP_DATA.alerts.map(a => `
    <div class="p-3 rounded-xl border ${a.read ? 'border-slate-100' : 'border-zzp-200 bg-zzp-50'} cursor-pointer" onclick="handleAlertNav('${a.id}','${a.module}')">
      <p class="text-sm font-medium">${a.title}</p>
      <p class="text-xs text-slate-500 mt-1">${a.desc}</p>
      <p class="text-xs text-zzp-600 mt-2">${a.action} →</p>
    </div>`).join('');
}

function updateHealthBadge() {
  const score = calcHealthScore();
  document.getElementById('health-score').textContent = score;
  ZZP_DATA.shop.healthScore = score;
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const colors = { success: 'bg-zzp-700', info: 'bg-blue-600', error: 'bg-red-600' };
  toast.className = `toast-enter px-4 py-3 rounded-xl shadow-lg text-sm text-white ${colors[type] || colors.success}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
  refreshIcons(document.getElementById('modal-body'));
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}

/* ===== Interactions ===== */
function toggleChecklist(id) {
  const item = ZZP_DATA.checklist.find(c => c.id === id);
  if (item) {
    item.done = !item.done;
    updateHealthBadge();
    showToast(item.done ? `✓ Hoàn thành: ${item.title}` : `↩ Đã bỏ chọn: ${item.title}`);
    navigate('onboarding');
  }
}

function openListingCheck(productId) {
  const p = getProduct(productId);
  if (!p) return;
  const issues = [];
  if (p.listingScore < 85) issues.push({ t: 'warn', m: 'Listing score dưới 85% — cần tối ưu tiêu đề và mô tả' });
  if (p.listingScore < 80) issues.push({ t: 'warn', m: 'Thiếu video demo sản phẩm' });
  if (p.status === 'review') issues.push({ t: 'err', m: 'Vi phạm compliance — thiếu ảnh nhãn INCI' });
  if (p.listingScore >= 85) issues.push({ t: 'ok', m: 'Tiêu đề tối ưu SEO' });
  if (p.listingScore >= 85) issues.push({ t: 'ok', m: 'Đủ 6+ hình ảnh chuẩn TikTok Shop' });
  if (p.listingScore >= 90) issues.push({ t: 'ok', m: 'Video demo chất lượng cao' });

  openModal(`
    <div class="p-6">
      <h3 class="font-bold text-lg flex items-center gap-2">${productThumb(p, 20)} ${p.name}</h3>
      <p class="text-sm text-slate-500 mt-1">SKU: ${p.sku} · Listing Score: ${p.listingScore}%</p>
      <div class="mt-4 space-y-2">${issues.map(i => {
        const cls = i.t === 'ok' ? 'bg-green-50 text-green-800' : i.t === 'err' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800';
        const ic = i.t === 'ok' ? icon('check', 14) : icon('alert-circle', 14);
        return `<p class="text-sm p-2 rounded-lg ${cls} flex items-center gap-2">${ic} ${i.m}</p>`;
      }).join('')}</div>
      <div class="mt-4 flex gap-2">
        <button onclick="closeModal()" class="flex-1 px-4 py-2 border rounded-lg text-sm">Đóng</button>
        ${p.listingScore < 85 ? `<button onclick="closeModal();showToast('Đã tạo task tối ưu listing ${p.sku}')" class="flex-1 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Tối ưu ngay</button>` : ''}
      </div>
    </div>`);
}

function processOrder(orderId) {
  const order = ZZP_DATA.orders.find(o => o.id === orderId);
  if (order && order.status === 'pending') {
    order.status = 'processing';
    ZZP_DATA.auditLog.unshift({ time: new Date().toLocaleString('vi-VN'), user: 'Trần Văn Hùng', action: `Xử lý đơn ${orderId}`, module: 'Orders' });
    showToast(`Đã xử lý đơn ${orderId}`);
    navigate('orders');
  }
}

function pauseAd(adId) {
  const ad = ZZP_DATA.ads.find(a => a.id === adId);
  if (ad) {
    ad.status = 'paused';
    ZZP_DATA.actionQueue.unshift({ id: 'AQ' + Date.now(), title: `Paused: ${ad.name}`, source: 'Manual', status: 'approved', assignee: 'Lê Thị Hoa', priority: 'high' });
    ZZP_DATA.auditLog.unshift({ time: new Date().toLocaleString('vi-VN'), user: 'Lê Thị Hoa', action: `Pause campaign ${adId}`, module: 'Ads' });
    showToast(`Đã tạm dừng: ${ad.name}`);
    navigate('ads');
  }
}

function handleAlert(alertId) {
  const alert = ZZP_DATA.alerts.find(a => a.id === alertId);
  if (!alert) return;
  alert.read = true;
  const moduleMap = { inventory: 'inventory', ads: 'ads', vouchers: 'vouchers', orders: 'orders', compliance: 'compliance', products: 'products-setup' };
  updateNotifPanel();
  showToast(`Đang thực hiện: ${alert.action}`);
  if (moduleMap[alert.module]) navigate(moduleMap[alert.module]);
}

function handleAlertNav(alertId, module) {
  closeNotifPanel();
  markAlertRead(alertId);
  const moduleMap = { inventory: 'inventory', ads: 'ads', vouchers: 'vouchers', orders: 'orders', compliance: 'compliance', products: 'products-setup' };
  if (moduleMap[module]) navigate(moduleMap[module]);
}

function markAlertRead(alertId) {
  const alert = ZZP_DATA.alerts.find(a => a.id === alertId);
  if (alert) { alert.read = true; updateNotifPanel(); navigate('alerts'); }
}

function createAction(actionText) {
  ZZP_DATA.actionQueue.unshift({
    id: 'AQ' + Date.now(), title: actionText, source: 'AI Assistant', status: 'pending',
    assignee: 'Nguyễn Minh Anh', priority: 'medium'
  });
  showToast(`Đã thêm vào Action Queue: ${actionText}`);
}

function toggleRule(ruleId) {
  const rule = ZZP_DATA.automationRules.find(r => r.id === ruleId);
  if (rule) {
    rule.active = !rule.active;
    showToast(rule.active ? `Đã bật rule: ${rule.name}` : `Đã tắt rule: ${rule.name}`);
    navigate('automation');
  }
}

function runAutoFlowsOnLoad() {
  setTimeout(() => {
    if (ZZP_DATA.products.find(p => p.id === 'P003')?.stock < 100) {
      showToast('⚡ Auto-flow: Phát hiện tồn kho P003 thấp — xem tab Flow tại Inventory', 'info');
    }
  }, 2000);
}

function approveAction(actionId) {
  const action = ZZP_DATA.actionQueue.find(a => a.id === actionId);
  if (action) {
    action.status = 'approved';
    ZZP_DATA.auditLog.unshift({ time: new Date().toLocaleString('vi-VN'), user: 'Nguyễn Minh Anh', action: `Approve: ${action.title}`, module: 'Decision Center' });
    showToast(`Đã approve: ${action.title}`);
    if (action.title.includes('budget') || action.title.includes('Spark')) runAutomationFlow('FLOW_AI_ACTION');
    else navigate('actions');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.slice(1);
  init();
  refreshIcons();
  if (hash && PAGES[hash]) navigate(hash);
});
