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

function getShopIssues(opts = {}) {
  const { includeSetup = false } = opts;
  const issues = [];
  const seen = new Set();

  ZZP_DATA.alerts.filter(a => !a.read).forEach(a => {
    issues.push({
      kind: 'alert',
      id: a.id,
      severity: a.severity,
      title: a.title,
      desc: a.desc,
      action: a.action,
      module: a.module,
      flow: alertToFlow(a.id),
      entity: ALERT_ENTITY[a.id]
    });
    seen.add('alert:' + a.id);
    if (ALERT_ENTITY[a.id]?.id) seen.add('product:' + ALERT_ENTITY[a.id].id);
  });

  ZZP_DATA.products.forEach(p => {
    if (seen.has('product:' + p.id)) return;
    const daysLeft = typeof getProductStockDays === 'function' ? getProductStockDays(p) : Math.floor(p.stock / Math.max(1, p.sold30d / 30));
    if (daysLeft >= 7) return;
    const copy = typeof getStockIssueCopy === 'function' ? getStockIssueCopy(p) : null;
    if (!copy) return;
    issues.push({
      kind: 'stock',
      id: p.id,
      severity: daysLeft <= 3 ? 'critical' : 'warning',
      entity: { type: 'product', id: p.id },
      ...copy
    });
    seen.add('product:' + p.id);
  });

  if (includeSetup) {
    ZZP_DATA.checklist.filter(c => !c.done).forEach(c => {
      issues.push({
        kind: 'setup',
        id: c.id,
        severity: 'info',
        title: c.title,
        desc: c.desc,
        action: 'Hoàn thành bước thiết lập',
        module: c.module || 'onboarding',
        flow: null,
        entity: null
      });
    });
  }

  return issues;
}

function alertToFlow(alertId) {
  const map = { A001: 'FLOW_STOCK', A002: 'FLOW_ADS', A003: 'FLOW_ADS', A004: 'FLOW_ORDER_SLA', A005: 'FLOW_COMPLIANCE', A006: 'FLOW_AI_ACTION' };
  return map[alertId] || null;
}

function getModuleIssues(pageId) {
  const modMap = { 'products-setup': 'products', products: 'products', 'product-analytics': 'products' };
  const mod = modMap[pageId] || pageId;
  const includeSetup = pageId === 'onboarding';
  return getShopIssues({ includeSetup }).filter(i => {
    if (i.kind === 'setup') return pageId === 'onboarding';
    if (pageId === 'dashboard') return true;
    return i.module === mod || i.module === pageId;
  });
}

function detailLink(type, id, label, cls = '') {
  return `<button type="button" onclick="openDetail('${type}','${id}')" class="text-zzp-600 hover:text-zzp-800 hover:underline font-medium text-left ${cls}">${label || id}</button>`;
}

function rowClick(type, id, extraCls = '') {
  return `onclick="openDetail('${type}','${id}')" class="is-clickable ${extraCls}"`.trim();
}

function renderIssueCard(issue, compact) {
  const sevCls = issue.severity === 'critical' ? 'critical' : issue.severity === 'warning' ? 'warning' : 'info';
  const entityBtn = issue.entity ? detailLink(issue.entity.type, issue.entity.id, 'Xem chi tiết →', 'ds-text-link') : '';
  const flowBtn = issue.flow ? dsBtnIcon('Giải quyết ngay', `runAutomationFlow('${issue.flow}')`, 'play', 'primary', 'sm') : '';
  const modBtn = dsBtnIcon('Mô-đun', `navigate('${issue.module === 'products' ? 'products-setup' : issue.module}')`, 'external-link', 'secondary', 'sm');
  if (compact) {
    return `
      <div class="ds-issue ds-issue--${sevCls}" style="display:flex;align-items:center;gap:12px">
        <div style="flex:1;min-width:0">
          <p class="ds-issue-title" style="margin-top:0">${issue.title}</p>
          <p class="ds-issue-desc truncate-safe">${issue.desc}</p>
        </div>
        ${flowBtn || modBtn}
      </div>`;
  }
  return `
    <div class="ds-issue ds-issue--${sevCls}">
      <div>${badge(issue.kind === 'setup' ? 'Thiết lập' : 'Vấn đề', issue.severity)}</div>
      <p class="ds-issue-title">${issue.title}</p>
      <p class="ds-issue-desc">${issue.desc}</p>
      ${issue.action ? `<p class="ds-issue-desc" style="margin-top:6px;font-weight:600;color:var(--ds-text-secondary)">→ ${issue.action}</p>` : ''}
      <div class="ds-issue-actions">
        ${entityBtn}
        ${flowBtn}
        ${modBtn}
        ${issue.kind === 'alert' ? dsBtn('Chi tiết vấn đề', `openDetail('alert','${issue.id}')`, 'secondary', 'sm') : ''}
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

/** Workflow card — dùng trên flow detail */
function renderWorkflowCardInline(f, isPrimary, pageId) {
  return `
    <div class="rounded-xl border ${isPrimary ? 'border-zzp-300 bg-gradient-to-br from-zzp-50/80 to-white shadow-sm' : 'border-slate-200 bg-white'} overflow-hidden">
      <div class="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <div class="flex items-center gap-3">
          ${iconBox(FLOW_ICONS[f.id] || 'workflow', 22, 'bg-white text-zzp-600 border border-zzp-100')}
          <div>
            <p class="font-semibold text-sm">${f.name}${isPrimary ? ' <span class="text-xs text-zzp-600 font-normal">· Tích hợp TikTok</span>' : ''}</p>
            <p class="text-xs text-slate-500 mt-0.5">${f.desc}</p>
            <p class="text-[10px] text-amber-700 mt-1">${humanTrigger(f.trigger, f.triggerType)}</p>
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

function renderDashboardIssuesOverview() {
  const issues = getShopIssues({ includeSetup: false });
  if (!issues.length) {
    return dsCard('Vấn đề cần xử lý', '<p class="text-sm text-slate-500">Không có vấn đề vận hành cần xử lý ngay.</p>');
  }
  return `
    <div class="ds-context-block">
      <h3 class="ds-context-head">${icon('alert-circle', 18)} Vấn đề cần xử lý (${issues.length})</h3>
      <div class="ds-stack-sm">${issues.map(i => renderIssueCard(i)).join('')}</div>
      <button type="button" class="ds-text-link" style="margin-top:16px" onclick="navigate('alerts')">Xem tất cả cảnh báo →</button>
    </div>`;
}

function renderModuleContext(pageId) {
  const issues = getModuleIssues(pageId).filter(i => i.kind !== 'setup').slice(0, pageId === 'dashboard' ? 6 : 3);
  if (!issues.length) return '';
  return `
    <div class="ds-context-block">
      <h3 class="ds-context-head">${icon('alert-circle', 18)} Vấn đề cần xử lý (${issues.length})</h3>
      <div class="ds-stack-sm">${issues.map(i => renderIssueCard(i, pageId !== 'dashboard')).join('')}</div>
    </div>`;
}

function renderNewSellerDashboard() {
  const pending = ZZP_DATA.checklist.filter(c => !c.done);
  const health = calcHealthScore();
  const eduLinks = ZZP_DATA.education.slice(0, 3).map(e =>
    `<button type="button" onclick="navigate('education')" class="ds-kv-row" style="border:none;padding:10px 0;cursor:pointer;background:none;width:100%;font:inherit;text-align:left">
      <span>${e.title}</span><span class="ds-kv-value">${e.progress}%</span>
    </button>`
  ).join('');
  const progressHtml = `<div class="ds-progress"><div class="ds-progress-track" style="background:rgba(255,255,255,.22)"><div class="ds-progress-fill" style="width:${health}%;background:#fff"></div></div></div>`;
  return dsPage(dsStack(`
    ${dsHero('init', `${icon('sparkles', 16)} Chào mừng người bán mới`, 'Hoàn thiện thiết lập shop trước khi mở rộng', `BeautyViet Official · Sức khỏe shop ${health}% · Còn ${pending.length} bước thiết lập`, progressHtml)}
    ${renderRecommendedSteps()}
    ${renderSetupBanner()}
    ${renderDashboardIssuesOverview()}
    ${dsCard('Danh sách thiết lập', `<div class="ds-stack-sm">${pending.map(c => renderChecklistRow(c)).join('')}</div>`)}
    ${dsCard('Tài liệu hướng dẫn người bán mới', `<div class="ds-kv">${eduLinks}</div>`)}
  `));
}

function renderActiveSellerDashboard() {
  const p = calcProfit();
  const issues = getShopIssues({ includeSetup: false });
  const insights = ZZP_DATA.aiInsights.slice(0, 3).map(i =>
    `<button type="button" onclick="openDetail('insight','${i.id}')" class="ds-kv-row" style="border:none;padding:12px 0;cursor:pointer;background:none;width:100%;font:inherit;text-align:left">
      <span style="display:flex;align-items:center;gap:10px"><span class="ds-step-num" style="margin:0;width:28px;height:28px;font-size:12px">${i.priority}</span><span><strong style="display:block;font-size:13px">${i.title}</strong><span style="font-size:12px;color:var(--ds-success)">${i.impact}</span></span></span>
    </button>`
  ).join('');
  return dsPage(dsStack(`
    ${renderTtsMetricsStrip('dashboard')}
    ${dsStatGrid([
      { label: 'Doanh thu gộp 30 ngày', value: fmt(ZZP_DATA.shop.gmv30d), hint: '↑ 28%', tone: 'success' },
      { label: 'Lợi nhuận', value: fmt(p.profit), hint: `Biên lợi nhuận ${p.margin}%`, tone: 'brand' },
      { label: 'Sức khỏe shop', value: calcHealthScore() + '%', hint: 'Ổn định', tone: 'info' },
      { label: 'Vấn đề', value: issues.length, hint: 'Cần xử lý', tone: issues.length ? 'danger' : 'success' }
    ])}
    ${renderDashboardIssuesOverview()}
    ${dsGrid(2, `
      ${dsCard('Doanh thu gộp & Lợi nhuận', '<div class="chart-box"><canvas id="chart-main"></canvas></div>')}
      ${dsCard('Nguồn doanh thu', '<div class="chart-box-sm"><canvas id="chart-revenue-src"></canvas></div>')}
    `)}
    ${dsGrid(2, `
      ${dsCard('Cấu trúc chi phí', '<div class="chart-box-sm"><canvas id="chart-dashboard-cost"></canvas></div>')}
      ${dsCard('Gợi ý AI', `<div class="ds-kv">${insights}</div>`)}
    `)}
  `));
}
