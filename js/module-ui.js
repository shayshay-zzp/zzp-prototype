/* Module UI — workflow inline, issues, dashboard, clickable helpers */

const PAGE_PRIMARY_FLOW = {
  dashboard: 'FLOW_OPTIMIZE',
  onboarding: 'FLOW_LIVE_PREP',
  'products-setup': 'FLOW_COMPLIANCE',
  compliance: 'FLOW_COMPLIANCE',
  inventory: 'FLOW_STOCK',
  products: 'FLOW_STOCK',
  orders: 'FLOW_ORDER_SLA',
  returns: 'FLOW_ORDER_SLA',
  ads: 'FLOW_ADS',
  vouchers: 'FLOW_ADS',
  affiliate: 'FLOW_SAMPLE',
  samples: 'FLOW_SAMPLE',
  koc: 'FLOW_SAMPLE',
  livestream: 'FLOW_LIVE_PREP',
  campaigns: 'FLOW_LIVE_PREP',
  content: 'FLOW_LIVE_PREP',
  'growth-assistant': 'FLOW_AI_ACTION',
  alerts: 'FLOW_STOCK',
  actions: 'FLOW_AI_ACTION',
  automation: 'FLOW_OPTIMIZE',
  optimization: 'FLOW_OPTIMIZE',
  forecast: 'FLOW_STOCK',
  workflows: 'FLOW_STOCK',
  store: 'FLOW_LIVE_PREP',
  portfolio: 'FLOW_COMPLIANCE',
  opportunities: 'FLOW_AI_ACTION'
};

const ALERT_ENTITY = {
  A001: { type: 'product', id: 'P003' },
  A002: { type: 'ad', id: 'AD002' },
  A003: { type: 'voucher', id: 'VC002' },
  A004: { type: 'order', id: 'ORD-88421' },
  A005: { type: 'product', id: 'P006' },
  A006: { type: 'product', id: 'P001' }
};

function isNewSeller() {
  const done = ZZP_DATA.checklist.filter(c => c.done).length;
  return done < 7 || calcHealthScore() < 82;
}

function getShopIssues() {
  const issues = [];
  ZZP_DATA.alerts.filter(a => !a.read).forEach(a => {
    issues.push({ kind: 'alert', id: a.id, severity: a.severity, title: a.title, desc: a.desc, action: a.action, module: a.module, flow: alertToFlow(a.id), entity: ALERT_ENTITY[a.id] });
  });
  ZZP_DATA.checklist.filter(c => !c.done).forEach(c => {
    issues.push({ kind: 'setup', id: c.id, severity: 'info', title: c.title, desc: c.desc, action: 'Hoàn thành bước setup', module: c.module || 'onboarding', flow: null, entity: null });
  });
  ZZP_DATA.products.filter(p => p.stock < 100).forEach(p => {
    if (!issues.find(i => i.entity?.id === p.id)) {
      issues.push({ kind: 'stock', id: p.id, severity: 'critical', title: `Tồn kho thấp: ${p.name}`, desc: `Còn ${p.stock} sp — cần nhập hàng`, action: 'Đặt PO nhập kho', module: 'inventory', flow: 'FLOW_STOCK', entity: { type: 'product', id: p.id } });
    }
  });
  return issues;
}

function alertToFlow(alertId) {
  const map = { A001: 'FLOW_STOCK', A002: 'FLOW_ADS', A003: 'FLOW_ADS', A004: 'FLOW_ORDER_SLA', A005: 'FLOW_COMPLIANCE', A006: 'FLOW_AI_ACTION' };
  return map[alertId] || null;
}

function getModuleIssues(pageId) {
  const modMap = { 'products-setup': 'products', products: 'products', 'product-analytics': 'products' };
  const mod = modMap[pageId] || pageId;
  return getShopIssues().filter(i => i.module === mod || i.module === pageId || (pageId === 'dashboard' && true));
}

function detailLink(type, id, label, cls = '') {
  return `<button type="button" onclick="openDetail('${type}','${id}')" class="text-zzp-600 hover:text-zzp-800 hover:underline font-medium text-left ${cls}">${label || id}</button>`;
}

function rowClick(type, id, extraCls = '') {
  return `onclick="openDetail('${type}','${id}')" class="cursor-pointer hover:bg-zzp-50/60 transition-colors border-b border-slate-50 ${extraCls}"`.trim();
}

function renderIssueCard(issue, compact) {
  const sev = issue.severity === 'critical' ? 'border-red-200 bg-red-50' : issue.severity === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50';
  const entityBtn = issue.entity ? detailLink(issue.entity.type, issue.entity.id, 'Xem chi tiết →', 'text-xs') : '';
  const flowBtn = issue.flow ? `<button type="button" onclick="runAutomationFlow('${issue.flow}')" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs inline-flex items-center gap-1">${icon('play', 12)} Giải quyết ngay</button>` : '';
  const modBtn = `<button type="button" onclick="navigate('${issue.module === 'products' ? 'products-setup' : issue.module}')" class="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-white">${icon('external-link', 12)} Mô-đun</button>`;
  if (compact) {
    return `<div class="flex items-center gap-3 p-3 rounded-xl border ${sev}"><div class="flex-1 min-w-0"><p class="font-medium text-sm">${issue.title}</p><p class="text-xs text-slate-500 truncate">${issue.desc}</p></div>${flowBtn || modBtn}</div>`;
  }
  return `
    <div class="p-4 rounded-xl border ${sev}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">${badge(issue.kind === 'setup' ? 'Thiết lập' : 'Vấn đề', issue.severity)}</div>
          <p class="font-semibold">${issue.title}</p>
          <p class="text-sm text-slate-600 mt-1">${issue.desc}</p>
        </div>
        <div class="flex flex-wrap gap-2 shrink-0">
          ${entityBtn}
          ${flowBtn}
          ${modBtn}
          ${issue.kind === 'alert' ? `<button type="button" onclick="openDetail('alert','${issue.id}')" class="px-3 py-1.5 border border-zzp-200 text-zzp-700 rounded-lg text-xs">Chi tiết vấn đề</button>` : ''}
        </div>
      </div>
    </div>`;
}

/* Module có bảng dữ liệu riêng — quy trình chỉ mô tả luồng xử lý, không lặp bảng */
const MODULES_DATA_BODY = new Set([
  'samples', 'orders', 'inventory', 'koc', 'content', 'returns', 'affiliate', 'agency',
  'products', 'actions', 'notifications', 'creator-analytics', 'livestream', 'ads'
]);

const AUTOMATION_FAB_SKIP = new Set(['dashboard', 'workflows', 'settings', 'education']);

function getAutomationOutputs(pageId) {
  return getModuleMetrics(pageId).slice(0, 4).map(m => ({
    l: m.l,
    v: m.v,
    highlight: m.highlight,
    color: m.color
  }));
}

function toggleAutomationFab() {
  const pop = document.getElementById('automation-fab-popover');
  if (pop) pop.classList.toggle('hidden');
}

function closeAutomationFab() {
  document.getElementById('automation-fab-popover')?.classList.add('hidden');
}

function refreshAutomationData(pageId) {
  closeAutomationFab();
  showToast(`Đã cập nhật dữ liệu · ${viPage(pageId)}`);
  if (!currentDetail && currentPage === pageId) renderCurrentView();
  else updateAutomationFab(pageId);
}

function updateAutomationFab(pageId) {
  const root = document.getElementById('automation-fab-root');
  if (!root) return;
  if (AUTOMATION_FAB_SKIP.has(pageId) || currentDetail) {
    root.classList.add('hidden');
    root.innerHTML = '';
    return;
  }
  const flow = getModuleFlow(pageId);
  if (!flow) {
    root.classList.add('hidden');
    root.innerHTML = '';
    return;
  }
  const outputs = getAutomationOutputs(pageId);
  const moduleLabel = viPage(pageId);
  root.classList.remove('hidden');
  root.innerHTML = `
    <div id="automation-fab-popover" class="hidden w-72 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div class="px-4 py-3 bg-gradient-to-r from-zzp-600 to-zzp-700 text-white">
        <p class="text-xs opacity-90">ZZP tự động · ${moduleLabel}</p>
        <p class="text-sm font-semibold mt-0.5 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
          Đang cập nhật dữ liệu
        </p>
      </div>
      <div class="p-3 space-y-2">
        ${outputs.map(o => `
          <div class="flex justify-between items-center gap-2 text-sm py-1.5 border-b border-slate-50 last:border-0">
            <span class="text-slate-500 text-xs">${o.l}</span>
            <span class="font-semibold text-right ${o.color || (o.highlight ? 'text-zzp-700' : 'text-slate-800')}">${o.v}</span>
          </div>`).join('')}
      </div>
      <div class="px-3 pb-3 flex gap-2">
        <button type="button" onclick="refreshAutomationData('${pageId}')" class="flex-1 py-2 text-xs font-medium bg-zzp-600 text-white rounded-lg hover:bg-zzp-700">Cập nhật ngay</button>
        <button type="button" onclick="closeAutomationFab()" class="px-3 py-2 text-xs border border-slate-200 rounded-lg hover:bg-slate-50">Đóng</button>
      </div>
    </div>
    <button type="button" id="automation-fab-btn" onclick="toggleAutomationFab()" title="ZZP tự động · ${moduleLabel}"
      class="group flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-zzp-600 text-white text-sm font-medium hover:bg-zzp-700 transition-all hover:scale-[1.02]">
      <span class="relative flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
      </span>
      <span class="hidden sm:inline max-w-[120px] truncate">Tự động</span>
      ${icon('chevron-up', 14, 'opacity-70 group-[.open]:rotate-180')}
    </button>`;
  refreshIcons(root);
}

/** Giữ cho trang workflows / detail — không dùng inline trên module pages */
function renderWorkflowCardInline(f, isPrimary, pageId) {
  return `
    <div class="rounded-xl border ${isPrimary ? 'border-zzp-300 bg-gradient-to-br from-zzp-50/80 to-white shadow-sm' : 'border-slate-200 bg-white'} overflow-hidden">
      <div class="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <div class="flex items-center gap-3">
          ${iconBox(FLOW_ICONS[f.id] || 'workflow', 22, 'bg-white text-zzp-600 border border-zzp-100')}
          <div>
            <p class="font-semibold text-sm">${f.name}${isPrimary ? ' <span class="text-xs text-zzp-600 font-normal">· Ưu tiên</span>' : ''}</p>
            <p class="text-xs text-slate-500 mt-0.5">${f.desc}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button type="button" onclick="openDetail('flow','${f.id}')" class="px-3 py-2 border border-slate-200 rounded-lg text-xs hover:bg-slate-50">Chi tiết</button>
          <button type="button" onclick="runModuleFlow('${pageId || f.pageId || ''}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 hover:bg-zzp-700">${icon('play', 14)} Chạy quy trình</button>
        </div>
      </div>
      ${renderWorkflowStepTabs(f, pageId || f.pageId)}
    </div>`;
}

function renderModuleContext(pageId) {
  const issues = getModuleIssues(pageId).slice(0, pageId === 'dashboard' ? 99 : 3);
  if (!issues.length) return '';
  return `
    <div class="mb-6">
      <h3 class="font-semibold text-slate-800 mb-3 flex items-center gap-2">${icon('alert-circle', 18)} Vấn đề cần xử lý (${issues.length})</h3>
      <div class="space-y-3">${issues.map(i => renderIssueCard(i, pageId !== 'dashboard')).join('')}</div>
    </div>`;
}

function renderNewSellerDashboard() {
  const pending = ZZP_DATA.checklist.filter(c => !c.done);
  const health = calcHealthScore();
  return `
    <div class="space-y-6">
      <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-zzp-600 text-white">
        <p class="text-sm opacity-90 flex items-center gap-2">${icon('sparkles', 16)} Chào mừng seller mới</p>
        <h2 class="text-2xl font-bold mt-2">Hoàn thiện thiết lập shop trước khi mở rộng</h2>
        <p class="text-sm opacity-90 mt-2">BeautyViet Official · Sức khỏe shop ${health}% · Còn ${pending.length} bước thiết lập</p>
        <div class="mt-4 h-2 bg-white/20 rounded-full"><div class="h-2 bg-white rounded-full transition-all" style="width:${health}%"></div></div>
      </div>

      ${renderRecommendedSteps()}

      ${renderSetupBanner()}

      ${card('Danh sách thiết lập — bấm Thiết lập từng bước', pending.map(c => renderChecklistRow(c)).join(''))}

      ${renderModuleContext('dashboard')}

      <div class="grid lg:grid-cols-2 gap-4">
        ${card('Tài liệu hướng dẫn seller mới', ZZP_DATA.education.slice(0, 3).map(e => `
          <button type="button" onclick="navigate('education')" class="w-full text-left py-2 border-b border-slate-50 flex justify-between items-center hover:text-zzp-600">
            <span class="text-sm">${e.title}</span><span class="text-xs text-slate-400">${e.progress}%</span>
          </button>`).join(''))}
      </div>
    </div>`;
}

function renderActiveSellerDashboard() {
  const p = calcProfit();
  const issues = getShopIssues().filter(i => i.kind !== 'setup').slice(0, 6);
  return `
    <div class="space-y-6">
      ${renderTtsMetricsStrip('dashboard')}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        ${statCard('Doanh thu gộp 30 ngày', fmt(ZZP_DATA.shop.gmv30d), '↑ 28%', 'green')}
        ${statCard('Lợi nhuận', fmt(p.profit), `Biên lợi nhuận ${p.margin}%`, 'zzp')}
        ${statCard('Sức khỏe shop', calcHealthScore() + '%', 'Ổn định', 'blue')}
        ${statCard('Vấn đề', issues.length, 'Cần xử lý', issues.length ? 'red' : 'green')}
      </div>

      ${issues.length ? card(`Vấn đề shop — ${issues.length} cần giải quyết`, `
        <div class="space-y-3">${issues.map(i => renderIssueCard(i)).join('')}</div>
        <button type="button" onclick="navigate('alerts')" class="mt-4 text-sm text-zzp-600 hover:underline">Xem tất cả cảnh báo →</button>`) : ''}

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">${card('Doanh thu gộp & Lợi nhuận', '<div class="chart-box"><canvas id="chart-main"></canvas></div>')}</div>
        <div>${card('Nguồn doanh thu', '<div class="chart-box-sm"><canvas id="chart-revenue-src"></canvas></div>')}</div>
      </div>
      <div class="grid lg:grid-cols-2 gap-6">
        <div>${card('Cấu trúc chi phí', '<div class="chart-box-sm"><canvas id="chart-dashboard-cost"></canvas></div>')}</div>
        <div>${card('Gợi ý AI — bấm để hành động', ZZP_DATA.aiInsights.slice(0, 3).map(i => `
          <button type="button" onclick="openDetail('insight','${i.id}')" class="w-full text-left flex gap-3 py-3 border-b border-slate-50 hover:bg-zzp-50/50 rounded-lg px-2 -mx-2 transition-colors">
            <span class="w-7 h-7 rounded-full bg-zzp-100 text-zzp-700 flex items-center justify-center text-sm font-bold shrink-0">${i.priority}</span>
            <div><p class="font-medium text-sm">${i.title}</p><p class="text-xs text-green-600">${i.impact}</p></div>
          </button>`).join(''))}</div>
      </div>
    </div>`;
}
