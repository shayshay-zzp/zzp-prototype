/* Màn hình chi tiết mỗi tab flow — dữ liệu vận hành theo bước & lớp */

const FLOW_LAYER_META = {
  data: { label: 'Thu thập dữ liệu', color: 'cyan', icon: 'download' },
  intelligence: { label: 'Phân tích', color: 'violet', icon: 'search' },
  action: { label: 'Hành động', color: 'amber', icon: 'check-square' },
  automation: { label: 'Tự động hóa', color: 'teal', icon: 'zap' }
};

function renderDetailGrid(fields, title = 'Chỉ số chi tiết') {
  if (!fields?.length) return '';
  return `
    <div class="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div class="px-3 py-2 bg-slate-50 border-b border-slate-100">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-500">${title}</p>
      </div>
      <div class="divide-y divide-slate-50">
        ${fields.map(f => `
          <div class="flex items-center justify-between gap-4 px-4 py-2.5 hover:bg-slate-50/80">
            <p class="text-xs text-slate-600">${f.label || f.desc || f.l || ''}</p>
            <p class="text-sm font-semibold text-slate-800 text-right shrink-0">${f.value || f.v || '—'}</p>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderFieldGrid(fields, title) {
  return renderDetailGrid(fields, title);
}

function flowBadge(text, type = 'default') {
  if (typeof badge === 'function') return badge(text, type);
  return `<span class="ui-badge ui-badge--muted">${text}</span>`;
}

function renderStepMetrics(metrics) {
  if (!metrics?.length) return '';
  const cols = Math.min(metrics.length, 4);
  const gridCls = cols <= 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4';
  return `<div class="grid ${gridCls} gap-2 mb-4">
    ${metrics.map(m => `
      <div class="ui-metric-cell">
        <p class="val ${m.color || ''}">${m.v}</p>
        <p class="lbl">${m.l}</p>
      </div>`).join('')}
  </div>`;
}

function renderDataRows(rows, headers, opts = {}) {
  if (!rows?.length) return '';
  const title = opts.title ? `<div class="px-3 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center"><p class="text-[10px] font-semibold uppercase tracking-wider text-slate-500">${opts.title}</p>${opts.badge ? `<span class="text-[10px] text-slate-400">${opts.badge}</span>` : ''}</div>` : '';
  return `
    <div class="rounded-xl border border-slate-200 overflow-hidden bg-white ${opts.className || ''} overflow-x-auto">
      ${title}
      <table class="w-full text-xs">
        <thead><tr class="bg-slate-50 text-slate-500">${headers.map(h => `<th class="text-left py-2.5 px-3 font-medium whitespace-nowrap">${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r, i) => `<tr class="border-t border-slate-50 hover:bg-slate-50/60 ${opts.rowClass?.(r, i) || ''}">${r.map(c => `<td class="py-2.5 px-3">${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`;
}

/* —— Sub-tab nội bộ mỗi bước workflow —— */
const flowStepSubTabs = {};

const LAYER_SUB_TABS = {
  data: [
    { id: 'overview', label: 'Tổng quan', icon: 'layout-dashboard' },
    { id: 'table', label: 'Bảng dữ liệu', icon: 'table' },
    { id: 'metrics', label: 'Chỉ số chi tiết', icon: 'list' }
  ],
  intelligence: [
    { id: 'analysis', label: 'Phân tích', icon: 'line-chart' },
    { id: 'compare', label: 'So sánh', icon: 'git-compare' },
    { id: 'breakdown', label: 'Breakdown', icon: 'pie-chart' }
  ],
  action: [
    { id: 'task', label: 'Công việc', icon: 'clipboard-list' },
    { id: 'related', label: 'Liên quan', icon: 'link-2' },
    { id: 'detail', label: 'Số liệu chi tiết', icon: 'list' }
  ],
  automation: [
    { id: 'flow', label: 'Quy trình', icon: 'workflow' },
    { id: 'audit', label: 'Audit log', icon: 'scroll-text' },
    { id: 'result', label: 'Kết quả', icon: 'check-circle-2' }
  ]
};

function getFlowStepSubTab(flowId, stepIndex) {
  return flowStepSubTabs[`${flowId}:${stepIndex}`] ?? 0;
}

function selectFlowStepSubTab(flowId, stepIndex, subIndex) {
  flowStepSubTabs[`${flowId}:${stepIndex}`] = subIndex;
  renderCurrentView();
}

function renderFlowSubTabs(flowId, stepIndex, layer) {
  const tabs = LAYER_SUB_TABS[layer] || LAYER_SUB_TABS.data;
  const active = getFlowStepSubTab(flowId, stepIndex);
  return `
    <div class="flex flex-wrap gap-1 p-1 mb-4 rounded-xl bg-slate-100/80 border border-slate-200">
      ${tabs.map((t, i) => `
        <button type="button" onclick="selectFlowStepSubTab('${flowId}', ${stepIndex}, ${i})"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${active === i ? 'bg-white text-zzp-700 shadow-sm ring-1 ring-zzp-200' : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'}">
          ${icon(t.icon, 12)} ${t.label}
        </button>`).join('')}
    </div>`;
}

function renderSectionHead(title, sub, iconName) {
  return `
    <div class="flex items-start gap-2 mb-3">
      ${iconName ? `<span class="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">${icon(iconName, 14, 'text-slate-600')}</span>` : ''}
      <div><p class="text-xs font-semibold text-slate-800">${title}</p>${sub ? `<p class="text-[10px] text-slate-500 mt-0.5">${sub}</p>` : ''}</div>
    </div>`;
}

function renderMiniCards(cards) {
  if (!cards?.length) return '';
  return `<div class="grid grid-cols-2 lg:grid-cols-${Math.min(cards.length, 4)} gap-2 mb-4">
    ${cards.map(c => `
      <div class="p-3 rounded-xl border ${c.border || 'border-slate-200'} ${c.bg || 'bg-white'}">
        <p class="text-[10px] text-slate-500 uppercase tracking-wide">${c.l}</p>
        <p class="text-sm font-bold mt-1 ${c.color || 'text-slate-800'}">${c.v}</p>
        ${c.sub ? `<p class="text-[10px] text-slate-400 mt-0.5">${c.sub}</p>` : ''}
      </div>`).join('')}
  </div>`;
}

function renderEntityPanel(entity) {
  if (!entity) return '';
  return `
    <div class="p-4 rounded-xl border-2 ${entity.border || 'border-zzp-200'} ${entity.bg || 'bg-zzp-50/30'} mb-4">
      <div class="flex flex-wrap gap-3 items-start">
        ${entity.icon ? `<span class="w-12 h-12 rounded-xl ${entity.iconBg || 'bg-zzp-100 text-zzp-600'} flex items-center justify-center shrink-0">${icon(entity.icon, 22)}</span>` : ''}
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap gap-2 items-center">${entity.badges?.map(b => flowBadge(b.t, b.s)).join('') || ''}</div>
          <p class="font-semibold text-slate-800 mt-1">${entity.title}</p>
          ${entity.sub ? `<p class="text-xs text-slate-500 mt-0.5">${entity.sub}</p>` : ''}
          ${entity.stats ? `<div class="grid grid-cols-2 sm:grid-cols-${Math.min(entity.stats.length, 4)} gap-2 mt-3">${entity.stats.map(s => `
            <div class="p-2 rounded-lg bg-white/80 border border-white text-center">
              <p class="text-sm font-bold ${s.color || ''}">${s.v}</p><p class="text-[10px] text-slate-400">${s.l}</p>
            </div>`).join('')}</div>` : ''}
        </div>
        ${entity.action ? `<button type="button" onclick="${entity.action.onclick}" class="text-xs px-3 py-1.5 bg-zzp-600 text-white rounded-lg shrink-0">${entity.action.label}</button>` : ''}
      </div>
      ${entity.note ? `<p class="text-xs text-slate-600 mt-3 p-2 rounded-lg bg-white/60 border border-slate-100">${entity.note}</p>` : ''}
    </div>`;
}

function renderTimelineBlock(items) {
  if (!items?.length) return '';
  return `
    <div class="rounded-xl border border-slate-200 bg-white p-4 mb-4">
      ${renderSectionHead('Timeline', 'Theo dõi tiến trình bước này', 'list-ordered')}
      <div class="space-y-0 ml-1">${items.map((it, i) => `
        <div class="flex gap-3 ${i < items.length - 1 ? 'pb-4' : ''}">
          <div class="flex flex-col items-center">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${it.done ? 'bg-green-500 text-white' : it.active ? 'bg-zzp-600 text-white ring-2 ring-zzp-200' : 'bg-slate-100 text-slate-500'}">${it.done ? icon('check', 12) : i + 1}</div>
            ${i < items.length - 1 ? `<div class="w-0.5 flex-1 mt-1 min-h-[20px] ${it.done ? 'bg-green-300' : 'bg-slate-200'}"></div>` : ''}
          </div>
          <div class="flex-1 pt-0.5">
            <p class="text-xs font-medium text-slate-800">${it.title}</p>
            ${it.desc ? `<p class="text-[10px] text-slate-500 mt-0.5">${it.desc}</p>` : ''}
            ${it.meta ? `<p class="text-[10px] text-slate-400 mt-1 font-mono">${it.meta}</p>` : ''}
          </div>
        </div>`).join('')}
      </div>
    </div>`;
}

function renderBarCompare(items, title) {
  if (!items?.length) return '';
  const max = Math.max(...items.map(x => x.value), 1);
  return `
    <div class="rounded-xl border border-slate-200 bg-white p-4 mb-4">
      ${renderSectionHead(title || 'So sánh chỉ số', 'Benchmark vs thực tế', 'bar-chart-3')}
      <div class="space-y-3">${items.map(it => `
        <div>
          <div class="flex justify-between text-[10px] mb-1">
            <span class="text-slate-600">${it.label}</span>
            <span class="font-semibold ${it.color || 'text-slate-800'}">${it.display || it.value}${it.unit || ''}</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full rounded-full ${it.barColor || 'bg-violet-500'}" style="width:${Math.min(100, (it.value / max) * 100)}%"></div>
          </div>
          ${it.benchmark != null ? `<p class="text-[10px] text-slate-400 mt-0.5">Benchmark: ${it.benchmark}${it.unit || ''}</p>` : ''}
        </div>`).join('')}
      </div>
    </div>`;
}

function renderAuditTable(rows) {
  return renderDataRows(rows || [
    [new Date().toLocaleString('vi-VN'), 'System', 'sync', 'Data pull completed', 'OK'],
    [new Date(Date.now() - 3600000).toLocaleString('vi-VN'), 'Rule Engine', 'evaluate', 'Condition matched', 'OK']
  ], ['Thời gian', 'Actor', 'Action', 'Chi tiết', 'Status'], { title: 'Audit log', badge: 'Live' });
}

function renderSyncStatusStrip() {
  const sources = [
    { n: 'TikTok Shop', s: 'ok', lat: '2.1s', rec: '12,842' },
    { n: 'Ads Manager', s: 'ok', lat: '3.4s', rec: '3,421' },
    { n: 'Affiliate', s: 'ok', lat: '1.8s', rec: '892' },
    { n: 'Live & Content', s: 'ok', lat: '2.5s', rec: '2,456' },
    { n: 'Finance', s: 'warn', lat: '8.2s', rec: '186 unsettled' },
    { n: 'ERP / KiotViet', s: 'ok', lat: '4.1s', rec: '7 SKU' }
  ];
  return `
    <div class="rounded-xl border border-cyan-200 bg-cyan-50/30 p-3 mb-4">
      ${renderSectionHead('Nguồn đồng bộ', 'Latency & record count · ' + TTS_METRICS.shop.syncAt, 'database')}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">${sources.map(src => `
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-100 text-[10px]">
          <span class="font-medium text-slate-700">${src.n}</span>
          <span class="flex items-center gap-2">
            <span class="text-slate-400">${src.lat}</span>
            ${flowBadge(src.s === 'ok' ? 'Live' : 'Chậm', src.s === 'ok' ? 'ok' : 'warning')}
          </span>
        </div>`).join('')}
      </div>
    </div>`;
}

function flowDaysSince(dateStr) {
  if (typeof daysSinceSample === 'function') return daysSinceSample(dateStr);
  return Math.max(0, Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000));
}

const MODULE_TABLE_BUILDERS = {
  'affiliate:0': () => ({ title: 'Open Collaboration · Sản phẩm', headers: ['SKU', 'Commission', 'Collab type', 'Creators', 'Status'], rows: ZZP_DATA.products.slice(0, 5).map(p => [p.name.slice(0, 22), (8 + (p.id.charCodeAt(1) % 8)) + '%', p.id <= 'P003' ? 'Open' : 'Target', 5 + (p.id.charCodeAt(1) % 8), flowBadge('Active', 'ok')]) }),
  'affiliate:1': () => ({ title: 'Creator Performance Ranking', headers: ['Creator', 'GMV', 'Video GMV', 'Live GMV', 'GPM', 'PPS', 'Comm'], rows: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => { const m = getCreatorMetrics(k.id); return [k.name, fmt(m?.gmv || k.gmv30d), fmt(m?.videoGmv), fmt(m?.liveGmv), fmt(m?.gpm), m?.pps, (m?.avgCommissionRate || k.commission) + '%']; }) }),
  'affiliate:2': () => ({ title: 'Affiliate Orders · Settlement', headers: ['Order', 'Creator', 'Source', 'GMV', 'Comm', 'Settlement'], rows: ZZP_DATA.orders.filter(o => o.koc).slice(0, 6).map(o => [o.id, ZZP_DATA.kocs.find(k => k.id === o.koc)?.name, o.source, fmtCurrency(o.total), '12%', flowBadge(o.status === 'completed' ? 'Settled' : 'Pending', o.status === 'completed' ? 'ok' : 'pending')]) }),
  'orders:0': () => ({ title: 'Order Queue · Real-time', headers: ['Order ID', 'Khách', 'Sản phẩm', 'Tổng', 'Nguồn', 'SLA', 'Status'], rows: ZZP_DATA.orders.map(o => [`<span class="font-mono text-zzp-600">${o.id}</span>`, o.customer, o.productName?.slice(0, 18), fmtCurrency(o.total), o.source, flowBadge(o.sla === 'ok' ? 'OK' : o.sla, o.sla === 'ok' ? 'ok' : 'critical'), flowBadge(o.status, o.status)]) }),
  'orders:1': () => ({ title: 'Attribution mix · Price detail', headers: ['Nguồn', 'Đơn', 'GMV', '% mix', 'OAV', 'CVR est.'], rows: [['Affiliate', '1,240', fmt(186000000), '44%', fmtCurrency(170354), '4.8%'], ['Livestream', '892', fmt(129000000), '31%', fmtCurrency(275000), '5.9%'], ['Ads', '412', fmt(78600000), '15%', fmtCurrency(190000), '3.2%'], ['Organic', '303', fmt(91500000), '10%', fmtCurrency(145000), '2.1%']] }),
  'inventory:0': () => ({ title: 'Inventory Search · All SKU', headers: ['SKU', 'Available', 'Committed', 'WH', 'Velocity/d', 'Days left', 'Status'], rows: ZZP_DATA.products.map(p => { const inv = TTS_METRICS.inventory[p.id]; const vel = Math.round(p.sold30d / 30); const days = vel ? Math.round((inv?.available || p.stock) / vel) : '—'; return [p.name.slice(0, 20), inv?.available ?? p.stock, inv?.committed ?? 0, inv?.warehouses ?? 1, vel + ' sp', days, flowBadge(days <= 3 ? 'Critical' : days <= 7 ? 'Low' : 'OK', days <= 3 ? 'critical' : days <= 7 ? 'warning' : 'ok')]; }) }),
  'inventory:1': () => ({ title: 'SKU Forecast · Stockout risk', headers: ['SKU', 'Sold 30d', 'Stock', 'Days left', 'Lost GMV/wk', 'PO rec.'], rows: ZZP_DATA.products.filter(p => p.stock < 200 || p.id === 'P003').map(p => { const vel = Math.round(p.sold30d / 30); const days = Math.round(p.stock / vel); return [p.name.slice(0, 20), p.sold30d, p.stock, days + 'd', days <= 3 ? fmt(15000000) : '—', days <= 7 ? 'PO ' + Math.max(500, vel * 14) : '—']; }) }),
  'samples:0': () => ({ title: 'Sample Applications', headers: ['ID', 'KOC', 'Product', 'Sent', 'Status', 'Cost', 'ROI'], rows: ZZP_DATA.samples.map(s => [s.id, ZZP_DATA.kocs.find(k => k.id === s.koc)?.name, getProduct(s.product)?.name?.slice(0, 16), s.sentDate, flowBadge(s.status, s.status === 'converted' ? 'ok' : s.status === 'no_content' ? 'critical' : 'pending'), fmtCurrency(s.cost), s.roi ? s.roi + 'x' : '—']) }),
  'samples:1': () => ({ title: 'Fulfillment · 14-day window', headers: ['Sample', 'KOC', 'Sent', 'Days left', 'Content', 'Deadline'], rows: ZZP_DATA.samples.map(s => { const d = Math.max(0, 14 - flowDaysSince(s.sentDate)); return [s.id, ZZP_DATA.kocs.find(k => k.id === s.koc)?.name, s.sentDate, s.status === 'converted' ? '—' : d + ' ngày', s.status === 'converted' ? flowBadge('Posted', 'ok') : s.status === 'no_content' ? flowBadge('Overdue', 'critical') : flowBadge('Waiting', 'pending'), s.status === 'converted' ? '✓' : d <= 3 ? '⚠ ' + d + 'd' : d + 'd']; }) }),
  'koc:0': () => ({ title: 'KOC CRM Pipeline', headers: ['KOC', 'Tier', 'Lifecycle', 'Score', 'GMV 30d', 'ROI', 'Videos'], rows: ZZP_DATA.kocs.map(k => [k.name, k.tier, flowBadge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info'), k.score, fmt(k.gmv30d), k.roi ? k.roi + 'x' : '—', k.videos]) }),
  'koc:1': () => ({ title: 'Scorecard · Creator Analytics', headers: ['Rank', 'KOC', 'GMV', 'GPM', 'PPS', 'CVR', 'Tier rec'], rows: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).sort((a, b) => b.score - a.score).map((k, i) => { const m = getCreatorMetrics(k.id); return ['#' + (i + 1), k.name, fmt(m?.gmv), fmt(m?.gpm), m?.pps, k.cvr + '%', k.score >= 90 ? 'Macro+' : k.tier]; }) }),
  'ads:0': () => ({ title: 'GMV Max · Campaign list', headers: ['Campaign', 'Type', 'Budget', 'Spend', 'GMV', 'ROAS', 'Orders', 'Status'], rows: ZZP_DATA.ads.map(a => { const m = getAdMetrics(a.id); return [a.name.slice(0, 24), m?.campaignType || a.type, fmt(a.budget), fmt(m?.spend || a.spent), fmt(m?.gmv || a.gmv), (m?.roas || a.roas) + 'x', m?.orders || a.orders, flowBadge(a.status, a.status)]; }) }),
  'ads:1': () => ({ title: 'Automated Rules · Evaluation', headers: ['Rule', 'Condition', 'Target', 'Current', 'Threshold', 'Fired'], rows: ZZP_DATA.automationRules.map(r => [r.id + ' ' + r.name.slice(0, 20), r.trigger, r.target || '—', r.id === 'R002' ? 'ROAS 1.2x' : '—', r.id === 'R002' ? '< 1.5x' : '—', flowBadge(r.active ? 'Yes' : 'No', r.active ? 'warning' : 'info')]) }),
  'content:0': () => ({ title: 'Content Calendar Pipeline', headers: ['ID', 'Title', 'KOC', 'Type', 'Status', 'Views', 'GMV'], rows: ZZP_DATA.content.map(c => [c.id, c.title.slice(0, 26), ZZP_DATA.kocs.find(k => k.id === c.koc)?.name, c.type, flowBadge(c.status, c.status === 'published' ? 'ok' : 'pending'), c.views ? fmt(c.views) : '—', c.gmv ? fmt(c.gmv) : '—']) }),
  'livestream:0': () => ({ title: 'Live Checklist Items', headers: ['#', 'Hạng mục', 'Owner', 'Status', 'Due'], rows: [['1', 'Pin hero SKU P001, P003', 'Host', flowBadge('Done', 'ok'), 'T-2'], ['2', 'Flash sale CP001 -20%', 'Marketing', flowBadge('Done', 'ok'), 'T-2'], ['3', 'Voucher LIVE15', 'Marketing', flowBadge('Done', 'ok'), 'T-2'], ['4', 'Live Ads AD003 schedule', 'Ads', flowBadge('Done', 'ok'), 'T-1'], ['5', 'Notify host @livewithhuong', 'Ops', flowBadge('Done', 'ok'), 'T-1'], ['6', 'Test stream & lighting', 'Host', flowBadge('Done', 'ok'), 'T-1'], ['7', 'Inventory check P003', 'Ops', flowBadge('Pending', 'pending'), 'T-1'], ['8', 'Go-live script review', 'Host', flowBadge('Pending', 'pending'), 'T-0']] }),
  'dashboard:0': () => ({ title: 'KPI Snapshot · All modules', headers: ['Module', 'Metric', 'Value', 'Trend', 'Sync'], rows: [['Shop', 'GMV 30d', fmt(TTS_METRICS.shop.gmv), '↑ 28%', flowBadge('Live', 'ok')], ['Orders', 'Pending SLA', TTS_METRICS.orders.slaRiskCount, '↓ 1', flowBadge('Live', 'ok')], ['Inventory', 'Stock critical', '1 SKU', 'P003', flowBadge('Alert', 'critical')], ['Ads', 'Blended ROAS', TTS_METRICS.ads.blendedRoas + 'x', '↓ AD002', flowBadge('Live', 'ok')], ['Affiliate', 'GMV share', '38%', 'Stable', flowBadge('Live', 'ok')], ['Finance', 'Margin', calcProfit().margin + '%', '↑ 0.4%', flowBadge('Live', 'ok')]] }),
  'returns:0': () => ({ title: 'Return Cases', headers: ['Return ID', 'Order', 'Reason', 'Amount', 'Type', 'Status'], rows: ZZP_DATA.returns.map(r => [r.id, r.orderId, r.reason.slice(0, 28), fmtCurrency(r.amount), r.type, flowBadge(r.status, r.status === 'refunded' ? 'ok' : 'pending')]) }),
  'alerts:0': () => ({ title: 'Smart Alerts · All', headers: ['ID', 'Severity', 'Title', 'Module', 'Read', 'Action'], rows: ZZP_DATA.alerts.map(a => [a.id, flowBadge(a.severity, a.severity), a.title.slice(0, 30), a.module, a.read ? flowBadge('Read', 'info') : flowBadge('New', 'new'), a.action.slice(0, 20)]) }),
  'growth-assistant:1': () => ({ title: 'AI Insights Ranked', headers: ['ID', 'Priority', 'Title', 'Confidence', 'Impact', 'Module'], rows: ZZP_DATA.aiInsights.map(ai => [ai.id, 'P' + ai.priority, ai.title.slice(0, 32), ai.confidence + '%', ai.impact, ai.module || '—']) }),
  'profit:0': () => ({ title: 'P&L Line Items', headers: ['Line', 'Amount', '% GMV', 'Trend'], rows: [['Revenue', fmt(TTS_METRICS.finance.revenueAmount), '100%', '↑'], ['COGS', fmt(ZZP_DATA.costs.cogs), (ZZP_DATA.costs.cogs / TTS_METRICS.shop.gmv * 100).toFixed(1) + '%', '→'], ['Platform fee', fmt(TTS_METRICS.finance.platformCommission), (TTS_METRICS.finance.platformCommission / TTS_METRICS.shop.gmv * 100).toFixed(1) + '%', '→'], ['Affiliate comm', fmt(TTS_METRICS.finance.affiliateCommission), (TTS_METRICS.finance.affiliateCommission / TTS_METRICS.shop.gmv * 100).toFixed(1) + '%', '↑'], ['Ads', fmt(ZZP_DATA.costs.ads), (ZZP_DATA.costs.ads / TTS_METRICS.shop.gmv * 100).toFixed(1) + '%', '↑ 12%'], ['Net margin', fmt(calcProfit().profit), calcProfit().margin + '%', '↑']] })
};

function getModuleTableData(pageId, stepIndex, layer) {
  const key = `${pageId}:${stepIndex}`;
  if (MODULE_TABLE_BUILDERS[key]) return MODULE_TABLE_BUILDERS[key]();
  if (layer === 'intelligence' && pageId === 'revenue') return { title: 'GMV Breakdown · Kênh', headers: ['Kênh', 'GMV', '% share', 'Orders', 'OAV'], rows: [['Live', fmt(TTS_METRICS.shop.gmvBreakdown.LIVE), '26.6%', '892', fmtCurrency(275000)], ['Video', fmt(TTS_METRICS.shop.gmvBreakdown.VIDEO), '20.2%', '654', fmtCurrency(198000)], ['Product card', fmt(TTS_METRICS.shop.gmvBreakdown.PRODUCT_CARD), '20.2%', '421', fmtCurrency(165000)], ['Affiliate', fmt(TTS_METRICS.affiliate.totalGmv), '38%', TTS_METRICS.affiliate.totalOrders, fmtCurrency(TTS_METRICS.shop.avgOrderValue)]] };
  if (layer === 'data') return { title: viPage(pageId) + ' · Hồ sơ dữ liệu', headers: ['Chỉ số', 'Giá trị', 'Nguồn', 'Cập nhật'], rows: getModuleMetrics(pageId).slice(0, 6).map(m => [m.l, m.v, 'Data Hub', TTS_METRICS.shop.syncAt.split(' ')[1]]) };
  return null;
}

function getModuleEntity(pageId, stepIndex, step) {
  const action = step.action || '';
  if (pageId === 'orders' && stepIndex === 0) {
    const o = ZZP_DATA.orders.find(x => x.id === 'ORD-88421') || ZZP_DATA.orders[0];
    return { icon: 'shopping-bag', title: o.id + ' · ' + o.customer, sub: o.productName + ' · ' + fmtCurrency(o.total), badges: [{ t: o.status, s: o.status }, { t: 'SLA ' + o.sla, s: o.sla === 'ok' ? 'ok' : 'critical' }], stats: [{ l: 'Nguồn', v: o.source }, { l: 'Tạo', v: o.created?.split(' ')[0] || '—' }, { l: 'Tổng', v: fmtCurrency(o.total) }], action: o.status === 'pending' ? { label: 'Xử lý', onclick: `processOrder('${o.id}')` } : null, note: step.action };
  }
  if (pageId === 'inventory' && stepIndex <= 1) {
    const p = getProduct('P003');
    const inv = TTS_METRICS.inventory.P003;
    return { icon: 'package', iconBg: 'bg-red-100 text-red-600', border: 'border-red-200', bg: 'bg-red-50/40', title: p.name, sub: 'SKU ' + p.sku + ' · Velocity ' + Math.round(p.sold30d / 30) + '/ngày', badges: [{ t: 'Critical stock', s: 'critical' }], stats: [{ l: 'Available', v: inv.available, color: 'text-red-600' }, { l: 'Committed', v: inv.committed }, { l: 'Days left', v: '2', color: 'text-red-600' }], action: { label: 'Tạo PO', onclick: `approveAction('AQ002')` }, note: 'Dự kiến stockout T+2 · mất ~15M GMV/tuần nếu không nhập' };
  }
  if (pageId === 'samples' && stepIndex === 0) {
    const s = ZZP_DATA.samples[0];
    const k = ZZP_DATA.kocs.find(x => x.id === s.koc);
    return { icon: 'gift', border: 'border-teal-200', bg: 'bg-teal-50/40', title: s.id + ' → ' + k?.name, sub: getProduct(s.product)?.name, badges: [{ t: s.status, s: s.status === 'converted' ? 'ok' : 'pending' }], stats: [{ l: 'Cost', v: fmtCurrency(s.cost) }, { l: 'Revenue', v: s.revenue ? fmt(s.revenue) : '—' }, { l: 'ROI', v: s.roi ? s.roi + 'x' : '—', color: 'text-green-600' }] };
  }
  if (pageId === 'ads' && stepIndex === 1) {
    const a = ZZP_DATA.ads.find(x => x.id === 'AD002');
    return { icon: 'megaphone', border: 'border-red-200', bg: 'bg-red-50/40', title: a.name, sub: 'Rule R002 triggered · ROAS dưới ngưỡng', badges: [{ t: 'ROAS 1.2x', s: 'critical' }, { t: 'Rule fired', s: 'warning' }], stats: [{ l: 'Spend', v: fmt(getAdMetrics('AD002')?.spend) }, { l: 'Orders', v: getAdMetrics('AD002')?.orders }, { l: 'CPC', v: fmtCurrency(getAdMetrics('AD002')?.cpc) }] };
  }
  if (pageId === 'koc' && stepIndex === 2) {
    const k = ZZP_DATA.kocs.find(x => x.id === 'K003');
    return { icon: 'users', border: 'border-green-200', bg: 'bg-green-50/40', title: k.name, sub: k.tier + ' · Score ' + k.score, badges: [{ t: 'Scale', s: 'ok' }], stats: [{ l: 'GMV', v: fmt(k.gmv30d) }, { l: 'ROI', v: k.roi + 'x' }, { l: 'Comm rec', v: '15%' }] };
  }
  if (pageId === 'affiliate' && stepIndex === 0) {
    return { icon: 'handshake', border: 'border-rose-200', bg: 'bg-rose-50/40', title: 'Commission Plan · Hero SKU', sub: 'Open + Target collaboration active', badges: [{ t: '8–15%', s: 'ok' }, { t: '5 open collab', s: 'info' }], stats: [{ l: 'Avg comm', v: TTS_METRICS.affiliate.avgCommissionRate + '%' }, { l: 'Target collab', v: TTS_METRICS.affiliate.targetCollabActive }, { l: 'Shop ads comm', v: TTS_METRICS.affiliate.shopAdsCommissionRate + '%' }] };
  }
  if (pageId === 'livestream' && stepIndex === 0) {
    const l = ZZP_DATA.liveSessions[0];
    return { icon: 'radio', border: 'border-pink-200', bg: 'bg-pink-50/40', title: l.title, sub: l.date + ' · @livewithhuong', badges: [{ t: 'Checklist ' + l.checklistDone + '/' + l.checklistTotal, s: l.checklistDone >= 6 ? 'ok' : 'pending' }], stats: [{ l: 'Expected GMV', v: fmt(80000000) }, { l: 'Host', v: '@livewithhuong' }, { l: 'Campaign', v: 'CP001' }] };
  }
  return null;
}

function getModuleTimeline(pageId, stepIndex, step, flow) {
  if (stepIndex === 3 || step.layer === 'automation') {
    return [
      { title: 'Trigger detected', desc: flow.trigger || step.action, meta: flow.linkedFlow || '', done: true },
      { title: step.label, desc: step.action, active: true },
      { title: 'Cross-module chain', desc: 'Navigate · update data · notify', done: false },
      { title: 'Audit & complete', desc: 'Log completion · sync metrics', done: false }
    ];
  }
  if (step.layer === 'action' || stepIndex === 2) {
    return [
      { title: 'Phát hiện / phân tích', desc: 'Intelligence layer output', done: true },
      { title: step.label, desc: step.action, active: true },
      { title: 'Assign & execute', desc: 'Owner approve nếu cần', done: false },
      { title: 'Verify outcome', desc: 'KPI cập nhật sau hành động', done: false }
    ];
  }
  return [
    { title: 'Đồng bộ dữ liệu', desc: step.action, done: true, active: stepIndex === 0 },
    { title: 'Kiểm tra & chuẩn hóa', desc: 'Đối soát số liệu shop', done: stepIndex > 0, active: stepIndex === 1 },
    { title: 'Lưu Data Hub', desc: 'Độ trễ < 15 giây', done: stepIndex > 1, active: false }
  ];
}

function getCompareBars(pageId, stepIndex) {
  if (pageId === 'returns' || (pageId === 'orders' && stepIndex === 1)) return [
    { label: 'Return rate shop', value: TTS_METRICS.shop.returnRate, benchmark: 4.8, unit: '%', color: 'text-green-600', barColor: 'bg-green-500' },
    { label: 'On-time delivery', value: TTS_METRICS.orders.onTimeDeliveryRate, benchmark: 95, unit: '%', color: 'text-green-600', barColor: 'bg-green-500' },
    { label: 'Cancel rate', value: TTS_METRICS.orders.cancelRate, benchmark: 2.5, unit: '%', color: 'text-amber-600', barColor: 'bg-amber-500' }
  ];
  if (pageId === 'ads' || pageId === 'costs') return [
    { label: 'Blended ROAS', value: TTS_METRICS.ads.blendedRoas * 20, display: TTS_METRICS.ads.blendedRoas, benchmark: 2.5, unit: 'x', barColor: 'bg-violet-500' },
    { label: 'AD002 ROAS', value: 1.2 * 20, display: '1.2', benchmark: 1.5, unit: 'x', color: 'text-red-600', barColor: 'bg-red-500' },
    { label: 'GMV Max ROI', value: TTS_METRICS.ads.gmvMax.actualRoi * 20, display: TTS_METRICS.ads.gmvMax.actualRoi, benchmark: 2.5, unit: 'x', barColor: 'bg-teal-500' }
  ];
  return [
    { label: 'Shop CVR', value: TTS_METRICS.shop.avgConversionRate * 10, display: TTS_METRICS.shop.avgConversionRate, benchmark: 4.0, unit: '%', barColor: 'bg-violet-500' },
    { label: 'Affiliate GMV share', value: 38, benchmark: 35, unit: '%', barColor: 'bg-rose-500' },
    { label: 'Live GMV share', value: 26.6, benchmark: 22, unit: '%', barColor: 'bg-pink-500' }
  ];
}

function buildModuleSubViews(pageId, stepIndex, step, flow, data) {
  const layer = data.layer || 'data';
  const tabs = LAYER_SUB_TABS[layer] || LAYER_SUB_TABS.data;
  const activeId = tabs[getFlowStepSubTab(flow.id, stepIndex)]?.id || tabs[0].id;
  const table = data.table || getModuleTableData(pageId, stepIndex, layer);
  const entity = data.entity || getModuleEntity(pageId, stepIndex, step);
  const views = {};

  tabs.forEach(t => {
    switch (t.id) {
      case 'overview':
        views[t.id] = `${entity ? renderEntityPanel(entity) : ''}${renderMiniCards(data.miniCards || (data.metrics || []).map(m => ({ l: m.l, v: m.v, color: m.color })))}${data.body || ''}${layer === 'data' ? renderSyncStatusStrip() : ''}${renderTimelineBlock(data.timeline || getModuleTimeline(pageId, stepIndex, step, flow))}`;
        break;
      case 'table':
        views[t.id] = table ? renderDataRows(table.rows, table.headers, { title: table.title, badge: table.rows.length + ' rows' }) : (data.rows ? renderDataRows(data.rows.data, data.rows.headers, { title: 'Breakdown data' }) : renderDataRows([[viPage(pageId), step.label, step.action?.slice(0, 40)]], ['Module', 'Step', 'Action'], { title: 'Dữ liệu bước này' }));
        break;
      case 'metrics':
      case 'api':
      case 'detail':
        views[t.id] = `${renderDetailGrid(data.fields, 'Chỉ số & hồ sơ chi tiết')}${data.rows ? renderDataRows(data.rows.data, data.rows.headers, { title: 'Danh sách liên quan', badge: data.rows.data.length + ' dòng' }) : ''}`;
        break;
      case 'analysis':
        views[t.id] = `${renderBarCompare(getCompareBars(pageId, stepIndex), 'Chỉ số phân tích')}${data.body || ''}${data.rows ? renderDataRows(data.rows.data, data.rows.headers, { title: 'Top records' }) : ''}${renderMiniCards(data.metrics?.map(m => ({ l: m.l, v: m.v, color: m.color })))}`;
        break;
      case 'compare':
        views[t.id] = `${renderBarCompare(getCompareBars(pageId, stepIndex), 'Benchmark vs Shop')}${renderDataRows([['Shop CVR', TTS_METRICS.shop.avgConversionRate + '%', '4.0%', flowBadge('Above', 'ok')], ['Return rate', TTS_METRICS.shop.returnRate + '%', '4.8%', flowBadge('Better', 'ok')], ['Margin', calcProfit().margin + '%', '18.5%', flowBadge('Above', 'ok')], ['On-time SLA', TTS_METRICS.orders.onTimeDeliveryRate + '%', '95%', flowBadge('Above', 'ok')]], ['Metric', 'Shop', 'Benchmark', 'Gap'], { title: 'Market benchmark' })}`;
        break;
      case 'breakdown':
        views[t.id] = `${renderDataRows([['LIVE', fmt(TTS_METRICS.shop.gmvBreakdown.LIVE), '26.6%'], ['VIDEO', fmt(TTS_METRICS.shop.gmvBreakdown.VIDEO), '20.2%'], ['PRODUCT_CARD', fmt(TTS_METRICS.shop.gmvBreakdown.PRODUCT_CARD), '20.2%'], ['Affiliate', fmt(TTS_METRICS.affiliate.totalGmv), '38%']], ['Kênh', 'GMV', 'Share'], { title: 'GMV breakdown' })}${data.rows ? renderDataRows(data.rows.data, data.rows.headers, { title: 'Chi tiết breakdown' }) : ''}`;
        break;
      case 'task':
        views[t.id] = `${renderEntityPanel(entity || { icon: 'check-square', title: step.label, sub: viPage(step.module), note: step.action, badges: [{ t: 'Action', s: 'warning' }] })}${renderTimelineBlock(getModuleTimeline(pageId, stepIndex, step, flow))}${step.action ? `<div class="p-3 rounded-xl border border-amber-200 bg-amber-50/50 text-sm"><p class="text-[10px] font-semibold text-amber-700 uppercase mb-1">Việc cần làm ngay</p><p class="text-slate-700">${step.action}</p></div>` : ''}`;
        break;
      case 'related':
        views[t.id] = `${renderDataRows((ZZP_DATA.actionQueue.slice(0, 3).map(aq => [aq.id, aq.title.slice(0, 28), aq.assignee, flowBadge(aq.priority, aq.priority), flowBadge(aq.status, aq.status)])), ['ID', 'Task', 'Owner', 'Priority', 'Status'], { title: 'Action queue liên quan' })}${renderDataRows((ZZP_DATA.alerts.filter(a => a.module === pageId || a.module === step.module).slice(0, 4).map(a => [a.id, a.title.slice(0, 30), flowBadge(a.severity, a.severity), a.action.slice(0, 20)]) || ZZP_DATA.alerts.slice(0, 3).map(a => [a.id, a.title.slice(0, 30), flowBadge(a.severity, a.severity), a.action.slice(0, 20)])), ['Alert', 'Title', 'Severity', 'Action'], { title: 'Alerts liên quan' })}`;
        break;
      case 'flow':
        views[t.id] = `${renderTimelineBlock(flow.steps.map((s, i) => ({ title: s.label, desc: s.action, done: i < stepIndex, active: i === stepIndex, meta: viPage(s.module) })))}${flow.linkedFlow ? `<div class="p-3 rounded-xl border border-teal-200 bg-teal-50/50 text-xs"><p class="font-semibold text-teal-800">${flow.linkedFlow}</p><p class="text-slate-600 mt-1">Trigger: ${flow.trigger || '—'}</p></div>` : ''}`;
        break;
      case 'audit':
        views[t.id] = renderAuditTable(data.auditRows);
        break;
      case 'result':
        views[t.id] = `${renderStepMetrics(data.metrics)}${renderMiniCards([{ l: 'Flow', v: flow.linkedFlow || 'Manual', sub: 'Automation output' }, { l: 'Module', v: viPage(pageId), sub: step.module }, { l: 'Sync', v: TTS_METRICS.shop.syncAt.split(' ')[1], sub: 'Last update' }])}${renderDataRows([[step.label, 'Complete', fmt(TTS_METRICS.shop.gmv), flowBadge('Synced', 'ok')]], ['Step', 'Status', 'Impact', 'Sync'], { title: 'Kết quả thực thi' })}`;
        break;
      default:
        views[t.id] = renderDetailGrid(data.fields);
    }
  });
  return { views, activeId };
}

/** Cấu hình trường API theo pageId + stepIndex — mỗi tab khác nhau */
function getFlowStepScreenData(pageId, stepIndex, step, flow) {
  const layer = step.layer || ['data', 'intelligence', 'action', 'automation'][Math.min(stepIndex, 3)];
  const key = `${pageId}:${stepIndex}`;
  if (FLOW_STEP_API_SCREENS[key]) return FLOW_STEP_API_SCREENS[key](step, flow, pageId, stepIndex);
  if (FLOW_STEP_API_SCREENS[`${pageId}:${layer}`]) return FLOW_STEP_API_SCREENS[`${pageId}:${layer}`](step, flow, pageId, stepIndex);
  return buildDefaultStepScreen(pageId, stepIndex, step, flow, layer);
}

function buildDefaultStepScreen(pageId, stepIndex, step, flow, layer) {
  const layerDefaults = {
    data: {
      metrics: getModuleMetrics(pageId).slice(0, 3),
      fields: [
        { desc: 'GMV 30 ngày', value: fmt(TTS_METRICS.shop.gmv) },
        { desc: 'Số đơn đã thanh toán', value: TTS_METRICS.shop.ordersCount },
        { desc: 'Sản phẩm đã bán', value: TTS_METRICS.shop.unitsSold },
        { desc: 'OAV / giá trị đơn TB', value: fmtCurrency(TTS_METRICS.shop.avgOrderValue) },
        { desc: 'Khách hàng unique', value: TTS_METRICS.shop.buyers },
        { desc: 'Cập nhật lần cuối', value: TTS_METRICS.shop.syncAt }
      ]
    },
    intelligence: {
      metrics: getModuleMetrics(pageId).slice(3, 6).length ? getModuleMetrics(pageId).slice(3, 6) : getModuleMetrics(pageId).slice(0, 3),
      fields: [
        { desc: 'CVR shop', value: TTS_METRICS.shop.avgConversionRate + '%' },
        { desc: 'Lượt xem trang TB/ngày', value: fmt(TTS_METRICS.shop.avgPageViews) },
        { desc: 'Impression sản phẩm', value: fmt(TTS_METRICS.shop.productImpressions) },
        { desc: 'GMV từ Live', value: fmt(TTS_METRICS.shop.gmvBreakdown.LIVE) },
        { desc: 'GMV từ Video', value: fmt(TTS_METRICS.shop.gmvBreakdown.VIDEO) },
        { desc: 'Hoàn tiền', value: fmt(TTS_METRICS.shop.refunds) }
      ]
    },
    action: {
      metrics: [{ l: 'Bước', v: stepIndex + 1 + '/' + flow.steps.length }, { l: 'Module', v: viPage(step.module).slice(0, 14) }],
      fields: [{ desc: 'Việc cần làm', value: step.action || step.label }],
      body: `<p class="text-sm text-slate-700 p-3 rounded-lg bg-amber-50 border border-amber-200">${step.action || step.label}</p>`
    },
    automation: {
      metrics: getModuleMetrics(pageId).slice(0, 2),
      fields: [
        { desc: 'Settlement gần nhất', value: fmt(TTS_METRICS.finance.settlementAmount) },
        { desc: 'Trạng thái đồng bộ', value: 'Live · ' + TTS_METRICS.shop.syncAt },
        { desc: 'Quy trình liên kết', value: flow.linkedFlow || '—' }
      ],
      body: `<p class="text-sm text-teal-800 p-3 rounded-lg bg-teal-50 border border-teal-100">Tự động: ${step.label}</p>`
    }
  };
  const d = layerDefaults[layer] || layerDefaults.data;
  return { ...d, title: step.label, subtitle: step.action, layer, actions: defaultStepActions(step, flow) };
}

function defaultStepActions(step, flow) {
  const a = [btnSecondary(`Mở ${viPage(step.module)}`, `navigate('${step.module}')`)];
  if (flow.linkedFlow) a.push(btnPrimary('Chạy quy trình', `runAutomationFlow('${flow.linkedFlow}')`));
  return a;
}

/** Màn hình render thống nhất — sub-tab + nhiều kiểu view */
function renderFlowStepScreen(pageId, stepIndex, step, flow) {
  const data = getFlowStepScreenData(pageId, stepIndex, step, flow);
  const layer = data.layer || ['data', 'intelligence', 'action', 'automation'][Math.min(stepIndex, 3)];
  const kind = STEP_KINDS[Math.min(stepIndex, STEP_KINDS.length - 1)] || 'collect';
  const { views, activeId } = data.subViews
    ? { views: data.subViews, activeId: (LAYER_SUB_TABS[layer] || LAYER_SUB_TABS.data)[getFlowStepSubTab(flow.id, stepIndex)]?.id }
    : buildModuleSubViews(pageId, stepIndex, step, flow, data);
  const layerMeta = FLOW_LAYER_META[layer] || FLOW_LAYER_META.data;
  const layerBadgeCls = { data: 'bg-cyan-100 text-cyan-700', intelligence: 'bg-violet-100 text-violet-700', action: 'bg-amber-100 text-amber-700', automation: 'bg-teal-100 text-teal-700' }[layer] || 'bg-slate-100 text-slate-700';

  const inner = `
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="text-[10px] px-2.5 py-1 rounded-full font-medium ${layerBadgeCls}">${layerMeta.label}</span>
      <span class="text-[10px] text-slate-400">Cập nhật ${TTS_METRICS.shop.syncAt}</span>
    </div>
    <div class="mb-3">
      <p class="text-sm font-bold text-slate-800">${data.title}</p>
      ${data.subtitle ? `<p class="text-xs text-slate-500 mt-0.5">${data.subtitle}</p>` : ''}
    </div>
    ${renderStepMetrics(data.metrics)}
    ${renderFlowSubTabs(flow.id, stepIndex, layer)}
    <div class="min-h-[200px]">${views[activeId] || views[Object.keys(views)[0]] || ''}</div>
    ${flowActions(data.actions || defaultStepActions(step, flow))}`;

  return flowPanelShell(kind, step, flow, stepIndex, inner);
}

/* —— Screen builders per module × step —— */
const FLOW_STEP_API_SCREENS = {};

function reg(key, fn) { FLOW_STEP_API_SCREENS[key] = fn; }

// AFFILIATE — 4 tabs, 4 API domains
reg('affiliate:0', (step, flow) => ({
  layer: 'data', api: '/affiliate_seller/202412/open_collaborations/search', apiName: 'Search Open Collaboration',
  title: step.label, subtitle: 'Commission plan & open collab products',
  metrics: [
    { l: 'Open collab SP', v: TTS_METRICS.affiliate.openCollabProducts },
    { l: 'Target collab', v: TTS_METRICS.affiliate.targetCollabActive },
    { l: 'Avg comm rate', v: TTS_METRICS.affiliate.avgCommissionRate + '%' }
  ],
  fields: [
    { desc: 'Tỷ lệ hoa hồng seller', value: '8–15%' },
    { desc: 'Open collab đang chạy', value: '5 sản phẩm' },
    { desc: 'Target collab active', value: '3 chiến dịch' },
    { desc: 'Hoa hồng Shop Ads', value: TTS_METRICS.affiliate.shopAdsCommissionRate + '%' },
    { desc: 'Mô hình hoa hồng', value: 'Cố định + bậc thang' },
    { desc: 'Hiệu lực từ', value: '01/06/2026' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('affiliate:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.creatorPerformance, apiName: 'Get Marketplace Creator Performance',
  title: step.label, subtitle: 'GMV attribution · top creators',
  metrics: [
    { l: 'Aff GMV', v: fmt(TTS_METRICS.affiliate.totalGmv), highlight: true },
    { l: 'Aff orders', v: TTS_METRICS.affiliate.totalOrders },
    { l: 'ROI aff', v: calcAffiliateRoi(TTS_METRICS.affiliate.totalGmv, TTS_METRICS.affiliate.actualPaidCommission) + 'x' }
  ],
  fields: [
    { key: 'gmv.amount', desc: 'Total affiliate GMV', value: fmt(TTS_METRICS.affiliate.totalGmv) },
    { key: 'estimated_paid_commission', desc: 'Est. commission', value: fmt(TTS_METRICS.affiliate.estimatedPaidCommission) },
    { key: 'actual_paid_commission', desc: 'Actual commission', value: fmt(TTS_METRICS.affiliate.actualPaidCommission) },
    { key: 'video_gmv', desc: 'Top creator video GMV', value: fmt(getCreatorMetrics('K001')?.videoGmv) },
    { key: 'live_gmv', desc: 'Top creator live GMV', value: fmt(getCreatorMetrics('K003')?.liveGmv) },
    { key: 'fully_return', desc: 'Full return rate', value: TTS_METRICS.affiliate.fullyReturnRate + '%' }
  ],
  rows: {
    headers: ['Creator', 'GMV', 'GPM', 'PPS', 'Comm %'],
    data: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).slice(0, 4).map(k => {
      const m = getCreatorMetrics(k.id);
      return [k.name, fmt(m?.gmv || k.gmv30d), fmt(m?.gpm || 0), m?.pps || k.score, (m?.avgCommissionRate || k.commission) + '%'];
    })
  },
  actions: defaultStepActions(step, flow)
}));

reg('affiliate:2', (step, flow) => ({
  layer: 'action', api: TTS_API.affiliateOrders, apiName: 'Search Seller Affiliate Orders',
  title: step.label, subtitle: 'Scale KOC ROI > 3x · cut < 2x',
  metrics: [
    { l: 'Scale', v: 'K001, K003' },
    { l: 'Nurture', v: 'K002, K005' },
    { l: 'Cut', v: 'K006', color: 'text-red-600' }
  ],
  fields: [
    { key: 'creator_username', desc: 'Top order creator', value: '@livewithhuong' },
    { key: 'settlement_status', desc: 'Pending settlement SKUs', value: TTS_METRICS.affiliate.settlementPending },
    { key: 'content_type', desc: 'Order source', value: 'LIVE · VIDEO' },
    { key: 'estimated_commission_base', desc: 'Commission base', value: fmt(186000000) },
    { key: 'commission_rate', desc: 'K003 rate', value: '15%' },
    { key: 'fully_return', desc: 'No commission if return', value: 'Policy active' }
  ],
  actions: [btnPrimary('KOC CRM', `navigate('koc')`), ...defaultStepActions(step, flow)]
}));

reg('affiliate:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.sampleApplications, apiName: 'Seller Search Sample Applications',
  title: step.label, subtitle: 'FLOW_SAMPLE lifecycle',
  metrics: [
    { l: 'Pipeline ROI', v: TTS_METRICS.samples.pipelineRoi + 'x', color: 'text-green-600' },
    { l: 'Fulfillment', v: TTS_METRICS.samples.fulfillmentRate + '%' },
    { l: 'Content rate', v: TTS_METRICS.samples.contentRate + '%' }
  ],
  fields: [
    { key: 'sample_status', desc: 'Converted samples', value: TTS_METRICS.affiliate.sampleConverted + '/4' },
    { key: 'pending', desc: 'Awaiting content', value: TTS_METRICS.affiliate.samplePending },
    { key: 'avg_days_to_content', desc: 'Avg days → content', value: TTS_METRICS.samples.avgDaysToContent + 'd' },
    { key: 'total_cost', desc: 'Sample cost', value: fmtCurrency(TTS_METRICS.samples.totalCost) },
    { key: 'total_revenue', desc: 'Sample revenue', value: fmt(TTS_METRICS.samples.totalRevenue) },
    { key: 'linked_flow', desc: 'Automation', value: 'FLOW_SAMPLE' }
  ],
  actions: [btnPrimary('Chạy FLOW_SAMPLE', `runAutomationFlow('FLOW_SAMPLE')`), ...defaultStepActions(step, flow)]
}));

// SAMPLES — 4 tabs
reg('samples:0', (step, flow) => {
  const s = ZZP_DATA.samples[0];
  const k = getCreatorMetrics(s.koc);
  return {
    layer: 'data', api: TTS_API.sampleApplications, apiName: 'Seller Search Sample Applications',
    title: step.label, subtitle: s.id + ' → ' + (ZZP_DATA.kocs.find(x => x.id === s.koc)?.name),
    metrics: [
      { l: 'Chi phí mẫu', v: fmtCurrency(s.cost) },
      { l: 'KOC PPS', v: k?.pps || '—' },
      { l: 'Post rate', v: (k?.postRate || 0) + '%' }
    ],
    fields: [
      { key: 'creator_username', desc: 'Creator', value: ZZP_DATA.kocs.find(x => x.id === s.koc)?.name },
      { key: 'product_id', desc: 'Sample SKU', value: getProduct(s.product)?.name },
      { key: 'quantity', desc: 'Units sent', value: '1' },
      { key: 'fulfillment_status', desc: 'Delivery', value: 'Delivered' },
      { key: 'commission_rate', desc: 'Planned comm', value: (k?.avgCommissionRate || 12) + '%' },
      { key: 'create_time', desc: 'Application date', value: s.sentDate }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('samples:1', (step, flow) => ({
  layer: 'intelligence', api: '/affiliate_seller/202409/sample_applications/fulfillments/search', apiName: 'Sample Fulfillments Search',
  title: step.label, subtitle: '14-day content window tracking',
  metrics: [
    { l: 'Chờ content', v: ZZP_DATA.samples.filter(s => s.status === 'pending').length },
    { l: 'Quá hạn', v: ZZP_DATA.samples.filter(s => s.status === 'no_content').length, color: 'text-red-600' },
    { l: 'Avg ngày', v: TTS_METRICS.samples.avgDaysToContent + 'd' }
  ],
  fields: ZZP_DATA.samples.map(s => ({
    key: 'fulfillment_' + s.id,
    desc: ZZP_DATA.kocs.find(k => k.id === s.koc)?.name,
    value: s.status === 'converted' ? '✓ Content posted' : s.status === 'no_content' ? '⚠ Quá hạn' : `Còn ${Math.max(0, 14 - daysSinceSample(s.sentDate))} ngày`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('samples:2', (step, flow) => {
  const s = ZZP_DATA.samples.find(x => x.id === 'S001');
  const v = getVideoMetrics('V001');
  const roi = calcSampleRoiDetailed(s);
  return {
    layer: 'action', api: TTS_API.affiliateOrders, apiName: 'Search Seller Affiliate Orders',
    title: step.label, subtitle: 'Sample ROI vs 2x threshold',
    metrics: [
      { l: 'ROI', v: roi.roi + 'x', color: 'text-green-600' },
      { l: 'Margin', v: roi.margin + '%' },
      { l: 'Payback', v: roi.paybackDays + ' ngày' }
    ],
    fields: [
      { key: 'order_refund_amount', desc: 'Sample cost', value: fmtCurrency(s.cost) },
      { key: 'estimated_commission_base', desc: 'Revenue base', value: fmt(s.revenue) },
      { key: 'content_type', desc: 'Attribution', value: 'VIDEO' },
      { key: 'gmv.amount', desc: 'Linked video GMV', value: fmt(v?.gmv || 0) },
      { key: 'click_through_rate', desc: 'Video CTR', value: (v?.ctr || 0) + '%' },
      { key: 'item_sold_count', desc: 'Units from sample', value: v?.itemSoldCount || 0 }
    ],
    actions: [btnPrimary('Chạy FLOW_SAMPLE', `runAutomationFlow('FLOW_SAMPLE')`), ...defaultStepActions(step, flow)]
  };
});

reg('samples:3', (step, flow) => {
  const k = getCreatorMetrics('K001');
  return {
    layer: 'automation', api: TTS_API.creatorPerformance, apiName: 'Get Marketplace Creator Performance',
    title: step.label, subtitle: 'Update score · tier · commission',
    metrics: [
      { l: 'Score', v: '92 → 96', color: 'text-green-600' },
      { l: 'Tier', v: 'Macro+' },
      { l: 'Comm', v: '12% → 15%' }
    ],
    fields: [
      { key: 'pps', desc: 'Promotion Performance Score', value: k?.pps },
      { key: 'units_sold', desc: 'Units after convert', value: k?.unitsSold },
      { key: 'avg_commission_rate', desc: 'New commission', value: '15%' },
      { key: 'ec_video_count', desc: 'EC videos', value: k?.ecVideoCount },
      { key: 'post_rate', desc: 'Post rate', value: k?.postRate + '%' },
      { key: 'lifecycle', desc: 'CRM stage', value: 'revenue' }
    ],
    actions: defaultStepActions(step, flow)
  };
});

// ORDERS — 4 tabs
reg('orders:0', (step, flow) => {
  const o = ZZP_DATA.orders.find(x => x.id === 'ORD-88421');
  return {
    layer: 'data', api: TTS_API.orderDetail, apiName: 'Get Order List / Detail',
    title: step.label, subtitle: o.id + ' · ' + o.status,
    metrics: [
      { l: 'Pending', v: TTS_METRICS.orders.pendingCount },
      { l: 'Processing', v: TTS_METRICS.orders.processingCount },
      { l: 'SLA risk', v: TTS_METRICS.orders.slaRiskCount, color: 'text-red-600' }
    ],
    fields: [
      { key: 'id', desc: 'Order ID', value: o.id },
      { key: 'status', desc: 'Status', value: o.status },
      { key: 'total_amount', desc: 'Buyer paid', value: fmtCurrency(o.total) },
      { key: 'content_type', desc: 'Source', value: o.source },
      { key: 'creator_username', desc: 'KOC', value: o.koc ? ZZP_DATA.kocs.find(k => k.id === o.koc)?.name : '—' },
      { key: 'create_time', desc: 'Created', value: o.created }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('orders:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.priceDetail, apiName: 'Get Price Detail',
  title: step.label, subtitle: 'Attribution by content type',
  metrics: [
    { l: 'OAV', v: fmtCurrency(TTS_METRICS.shop.avgOrderValue) },
    { l: 'On-time', v: TTS_METRICS.orders.onTimeDeliveryRate + '%', color: 'text-green-600' },
    { l: 'Cancel rate', v: TTS_METRICS.orders.cancelRate + '%' }
  ],
  fields: [
    { key: 'sub_total', desc: 'Subtotal', value: fmtCurrency(289000) },
    { key: 'seller_discount', desc: 'Seller discount', value: fmtCurrency(0) },
    { key: 'platform_discount', desc: 'Platform discount', value: fmtCurrency(14500) },
    { key: 'shipping_fee', desc: 'Shipping fee', value: fmtCurrency(30000) },
    { key: 'commission_rate', desc: 'Affiliate comm (if any)', value: '12%' },
    { key: 'avg_fulfillment_hours', desc: 'Avg fulfill time', value: TTS_METRICS.orders.avgFulfillmentHours + 'h' }
  ],
  rows: {
    headers: ['Nguồn', 'Đơn', '% mix'],
    data: [['Affiliate', '1,240', '44%'], ['Livestream', '892', '31%'], ['Ads', '412', '15%'], ['Organic', '303', '10%']]
  },
  actions: defaultStepActions(step, flow)
}));

reg('orders:2', (step, flow) => ({
  layer: 'action', api: TTS_API.csPerformance, apiName: 'Get Customer Service Performance',
  title: step.label, subtitle: 'Assign Ops · SLA < 4h',
  metrics: [
    { l: 'Assignee', v: 'Trần Văn Hùng' },
    { l: 'SLA', v: '2h', color: 'text-red-600' },
    { l: 'CS CVR', v: TTS_METRICS.customerService.conversionRate + '%' }
  ],
  fields: [
    { key: 'conversion_rate', desc: 'CS conversion', value: TTS_METRICS.customerService.conversionRate + '%' },
    { key: 'avg_response_time', desc: 'Response time', value: TTS_METRICS.customerService.avgResponseTimeMin + ' min' },
    { key: 'sessions_today', desc: 'Sessions today', value: TTS_METRICS.customerService.sessionsToday },
    { key: 'alert_id', desc: 'Linked alert', value: 'A004' },
    { key: 'assignee', desc: 'Ops owner', value: 'Trần Văn Hùng' },
    { key: 'priority', desc: 'Priority', value: 'High' }
  ],
  actions: [btnPrimary('Xử lý ORD-88421', `processOrder('ORD-88421')`), ...defaultStepActions(step, flow)]
}));

reg('orders:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.orderDetail, apiName: 'Batch Ship Packages',
  title: step.label, subtitle: 'FLOW_ORDER_SLA',
  metrics: [
    { l: 'Auto processed', v: '2 đơn' },
    { l: 'Escalated', v: '1 đơn' },
    { l: 'SLA OK', v: TTS_METRICS.orders.onTimeDeliveryRate + '%' }
  ],
  fields: [
    { key: 'rts_time', desc: 'Ship timestamp', value: 'Auto on approve' },
    { key: 'shipping_provider', desc: 'Carrier', value: 'GHN / GHTK' },
    { key: 'package_status', desc: 'Package', value: 'Awaiting ship → Shipped' },
    { key: 'automation_rule', desc: 'Rule', value: 'SLA < 4h → notify + assign' },
    { key: 'flow', desc: 'Linked', value: 'FLOW_ORDER_SLA' },
    { key: 'audit_log', desc: 'Logged', value: 'Yes' }
  ],
  actions: [btnPrimary('Chạy FLOW_ORDER_SLA', `runAutomationFlow('FLOW_ORDER_SLA')`), ...defaultStepActions(step, flow)]
}));

// INVENTORY — 4 tabs
reg('inventory:0', (step, flow) => {
  const inv = TTS_METRICS.inventory.P003;
  const p = getProduct('P003');
  return {
    layer: 'data', api: TTS_API.inventorySearch, apiName: 'Inventory Search',
    title: step.label, subtitle: p.name,
    metrics: [
      { l: 'Available', v: inv.available, color: 'text-red-600' },
      { l: 'Committed', v: inv.committed },
      { l: 'Warehouses', v: inv.warehouses }
    ],
    fields: [
      { key: 'available_quantity', desc: 'Available units', value: inv.available },
      { key: 'committed_quantity', desc: 'Committed (orders)', value: inv.committed },
      { key: 'total_committed_quantity', desc: 'Total committed', value: inv.totalCommitted },
      { key: 'seller_sku', desc: 'SKU', value: p.sku },
      { key: 'warehouse_count', desc: 'Warehouses', value: inv.warehouses },
      { key: 'velocity', desc: 'Sold/day', value: Math.round(p.sold30d / 30) + ' sp' }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('inventory:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.productPerformance, apiName: 'Get Shop SKU Performance + Forecast',
  title: step.label, subtitle: 'Stockout T+2 · mất 15M GMV/tuần',
  metrics: [
    { l: 'Days left', v: '2', color: 'text-red-600' },
    { l: 'Lost GMV/wk', v: '15M', color: 'text-red-600' },
    { l: 'SKU orders', v: getProductMetrics('P003')?.orders || 1203 }
  ],
  fields: [
    { key: 'items_sold', desc: '30d units sold', value: getProduct('P003').sold30d },
    { key: 'gmv.amount', desc: 'SKU GMV', value: fmt(getProductMetrics('P003')?.gmv) },
    { key: 'days_left', desc: 'Forecast days', value: '2' },
    { key: 'recommendation', desc: 'Action', value: 'PO 2000 sp' },
    { key: 'avg_conversion_rate', desc: 'SKU CVR', value: getProductMetrics('P003')?.avgConversionRate + '%' },
    { key: 'breakdown.LIVE', desc: 'Live velocity', value: getProductMetrics('P003')?.breakdown.LIVE.itemsSold + ' sp' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('inventory:2', (step, flow) => {
  const a = ZZP_DATA.alerts.find(x => x.id === 'A001');
  const ai = ZZP_DATA.aiInsights.find(x => x.id === 'AI003');
  return {
    layer: 'action', api: '/product/202309/inventory/update', apiName: 'Update Inventory',
    title: step.label, subtitle: 'Smart Alert + AI Impact',
    metrics: [
      { l: 'Alert', v: 'Critical', color: 'text-red-600' },
      { l: 'AI impact', v: ai.impact },
      { l: 'PO qty', v: '2000 sp' }
    ],
    fields: [
      { key: 'alert_title', desc: 'Alert', value: a.title },
      { key: 'insight', desc: 'AI003', value: ai.title.slice(0, 40) + '…' },
      { key: 'action_id', desc: 'Task', value: 'AQ002' },
      { key: 'assignee', desc: 'Owner', value: 'Trần Văn Hùng' },
      { key: 'po_quantity', desc: 'Recommend PO', value: '2000' },
      { key: 'priority', desc: 'Priority', value: 'critical' }
    ],
    actions: [btnPrimary('Tạo PO', `approveAction('AQ002')`), ...defaultStepActions(step, flow)]
  };
});

reg('inventory:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.inventorySearch, apiName: 'Update Inventory + Multi-channel',
  title: step.label, subtitle: 'FLOW_STOCK → AQ002',
  metrics: [
    { l: 'PO created', v: '2000 sp' },
    { l: 'Channels sync', v: '4 kênh' },
    { l: 'ETA', v: 'T+5 ngày' }
  ],
  fields: [
    { key: 'po_id', desc: 'Purchase order', value: 'PO-P003-2000' },
    { key: 'erp_sync', desc: 'KiotViet', value: 'Synced' },
    { key: 'tiktok_stock', desc: 'New stock target', value: '2045 sp' },
    { key: 'shopee_mapping', desc: 'Shopee SKU', value: 'SP-BV-MASK' },
    { key: 'flow', desc: 'Automation', value: 'FLOW_STOCK' },
    { key: 'notify', desc: 'KOC alert', value: 'Sent' }
  ],
  actions: [btnPrimary('Chạy FLOW_STOCK', `runAutomationFlow('FLOW_STOCK')`), ...defaultStepActions(step, flow)]
}));

// ADS — 4 tabs
reg('ads:0', (step, flow) => ({
  layer: 'data', api: TTS_API.gmvMaxCampaign, apiName: 'Get GMV Max Campaigns / Ads Sync',
  title: step.label, subtitle: 'Ads Manager + GMV Max',
  metrics: [
    { l: 'Blended ROAS', v: TTS_METRICS.ads.blendedRoas + 'x' },
    { l: 'Spend', v: fmt(TTS_METRICS.ads.totalSpend) },
    { l: 'Ads GMV', v: fmt(TTS_METRICS.ads.totalGmv) }
  ],
  fields: Object.entries(TTS_METRICS.ads.campaigns).filter(([, m]) => m.spend).map(([id, m]) => ({
    key: 'campaign_' + id,
    desc: ZZP_DATA.ads.find(a => a.id === id)?.name.slice(0, 28),
    value: `ROAS ${m.roas}x · ${fmt(m.spend)} spend · ${m.orders} orders`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('ads:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.adsReporting, apiName: 'Reporting / Automated Rules',
  title: step.label, subtitle: 'Rule R002: roas < 1.5',
  metrics: [
    { l: 'AD002 ROAS', v: '1.2x', color: 'text-red-600' },
    { l: 'Threshold', v: '1.5x' },
    { l: 'Rule fired', v: 'Yes', color: 'text-amber-600' }
  ],
  fields: [
    { key: 'roas', desc: 'Product Ads ROAS', value: '1.2x' },
    { key: 'cost_per_order', desc: 'Cost/order', value: fmtCurrency(getAdMetrics('AD002')?.costPerOrder) },
    { key: 'ctr', desc: 'CTR', value: getAdMetrics('AD002')?.ctr + '%' },
    { key: 'cpc', desc: 'CPC', value: fmtCurrency(getAdMetrics('AD002')?.cpc) },
    { key: 'cpm', desc: 'CPM', value: fmt(getAdMetrics('AD002')?.cpm) },
    { key: 'rule_r002', desc: 'Auto rule', value: 'Pause if ROAS < 1.5' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('ads:2', (step, flow) => ({
  layer: 'action', api: TTS_API.creatorPerformance, apiName: 'Reallocate budget → Affiliate',
  title: step.label, subtitle: 'AI002 · chuyển 8M sang K002',
  metrics: [
    { l: 'Pause', v: 'AD002' },
    { l: 'Shift', v: fmt(8000000) },
    { l: 'Target KOC', v: '@beautybymai' }
  ],
  fields: [
    { key: 'action_id', desc: 'Action queue', value: 'AQ001' },
    { key: 'assignee', desc: 'Marketing', value: 'Lê Thị Hoa' },
    { key: 'affiliate_commission', desc: 'K002 boost', value: '10% → 12%' },
    { key: 'expected_roi', desc: 'Affiliate ROI est.', value: '3.1x' },
    { key: 'insight', desc: 'AI002', value: '+12M lợi nhuận' },
    { key: 'approval', desc: 'Status', value: 'pending' }
  ],
  actions: [btnPrimary('Duyệt AQ001', `approveAction('AQ001')`), ...defaultStepActions(step, flow)]
}));

reg('ads:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.gmvMaxCampaign, apiName: 'GMV Max + Audit Log',
  title: step.label, subtitle: 'Execute FLOW_ADS',
  metrics: [
    { l: 'Paused', v: '1 campaign' },
    { l: 'Budget moved', v: fmt(8000000) },
    { l: 'GMV Max ROI', v: TTS_METRICS.ads.gmvMax.actualRoi + 'x' }
  ],
  fields: [
    { key: 'gmv_max.enabled', desc: 'GMV Max', value: 'Active' },
    { key: 'target_roi', desc: 'Target ROI', value: TTS_METRICS.ads.gmvMax.targetRoi + 'x' },
    { key: 'actual_roi', desc: 'Actual ROI', value: TTS_METRICS.ads.gmvMax.actualRoi + 'x' },
    { key: 'audit', desc: 'Audit log', value: 'Pause AD002 logged' },
    { key: 'notify', desc: 'Owner notified', value: 'Lê Thị Hoa' },
    { key: 'flow', desc: 'Completed', value: 'FLOW_ADS' }
  ],
  actions: [btnPrimary('Chạy FLOW_ADS', `runAutomationFlow('FLOW_ADS')`), ...defaultStepActions(step, flow)]
}));

// LIVESTREAM — 4 tabs
reg('livestream:0', (step, flow) => {
  const l = TTS_METRICS.lives.L001;
  return {
    layer: 'data', api: TTS_API.liveOverview, apiName: 'Get Shop LIVE Performance Overview',
    title: step.label, subtitle: 'Live checklist + session prep',
    metrics: [
      { l: 'Checklist', v: '6/8' },
      { l: 'Expected GMV', v: fmt(80000000) },
      { l: 'Host', v: '@livewithhuong' }
    ],
    fields: [
      { key: 'sku_orders', desc: 'Past SKU orders', value: l.skuOrders },
      { key: 'customers', desc: 'Past customers', value: l.customers },
      { key: 'avg_price', desc: 'Past AOV', value: fmtCurrency(l.avgPrice) },
      { key: 'items_sold', desc: 'Items sold', value: l.itemsSold },
      { key: 'checklist_done', desc: 'Checklist progress', value: '6/8' },
      { key: 'live_date', desc: 'Scheduled', value: '2026-06-06 20:00' }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('livestream:1', (step, flow) => ({
  layer: 'action', api: '/promotion/202309/activities/search', apiName: 'Search Activities / Coupons',
  title: step.label, subtitle: 'Flash sale + voucher live-only',
  metrics: [
    { l: 'Discount', v: '20%' },
    { l: 'Voucher', v: 'LIVE15' },
    { l: 'Campaign', v: 'CP001' }
  ],
  fields: [
    { key: 'activity_type', desc: 'Flash sale', value: 'CP001 -20%' },
    { key: 'threshold_type', desc: 'Voucher threshold', value: 'MINIMAL_ITEM_QUANTITY' },
    { key: 'discount_value', desc: 'Live voucher', value: '15%' },
    { key: 'budget', desc: 'Promo budget', value: fmt(5000000) },
    { key: 'hero_skus', desc: 'Pinned products', value: 'P001, P003, P005' },
    { key: 'min_watch_time', desc: 'Live coupon watch', value: '60s' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('livestream:2', (step, flow) => ({
  layer: 'action', api: TTS_API.gmvMaxCampaign, apiName: 'Live Ads Schedule',
  title: step.label, subtitle: 'AD003 Live Ads',
  metrics: [
    { l: 'Budget', v: fmt(10000000) },
    { l: 'Schedule', v: '6/6 19:30' },
    { l: 'Goal', v: 'GMV' }
  ],
  fields: [
    { key: 'campaign_type', desc: 'Type', value: 'LIVE_ADS' },
    { key: 'optimization_goal', desc: 'Goal', value: 'GMV' },
    { key: 'budget', desc: 'Budget', value: fmt(10000000) },
    { key: 'spent', desc: 'Spent (pre-live)', value: fmt(0) },
    { key: 'live_room_id', desc: 'Live room', value: 'L001' },
    { key: 'status', desc: 'Status', value: 'scheduled' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('livestream:3', (step, flow) => {
  const l = TTS_METRICS.lives.L001;
  return {
    layer: 'automation', api: TTS_API.livePerMinute, apiName: 'Get Shop LIVE Performance Per Minutes',
    title: step.label, subtitle: 'Go live · notify host',
    metrics: [
      { l: 'Watch GPM', v: fmt(l.watchGpm) },
      { l: 'Peak CCU', v: fmt(l.peakConcurrentUsers) },
      { l: 'CTR', v: l.ctr + '%' }
    ],
    fields: [
      { key: 'watch_gpm', desc: 'Watch GPM', value: fmt(l.watchGpm) },
      { key: 'show_gpm', desc: 'Show GPM', value: fmt(l.showGpm) },
      { key: 'click_to_order_rate', desc: 'Click→order', value: l.clickToOrderRate + '%' },
      { key: 'enter_room_rate', desc: 'Enter room rate', value: l.enterRoomRate + '%' },
      { key: 'new_followers', desc: 'New followers', value: fmt(l.newFollowers) },
      { key: 'flow', desc: 'Automation', value: 'FLOW_LIVE_PREP' }
    ],
    actions: [btnPrimary('Chạy FLOW_LIVE_PREP', `runAutomationFlow('FLOW_LIVE_PREP')`), ...defaultStepActions(step, flow)]
  };
});

// LIVE ANALYTICS — post-live
reg('live-analytics:0', (step, flow) => {
  const l = TTS_METRICS.lives.L001;
  return {
    layer: 'data', api: TTS_API.liveCoreStats, apiName: 'Get Live Core Stats',
    title: step.label, subtitle: 'Session metrics pull',
    metrics: [
      { l: 'GMV', v: fmt(l.gmv), color: 'text-green-600' },
      { l: 'SKU orders', v: l.skuOrders },
      { l: 'AOV', v: fmtCurrency(l.avgPrice) }
    ],
    fields: [
      { key: 'local_gmv.amount', desc: 'Session GMV', value: fmt(l.gmv) },
      { key: 'paid_order_count', desc: 'Paid orders', value: l.skuOrders },
      { key: 'watch_pv', desc: 'Views', value: fmt(l.views) },
      { key: 'click_through_rate', desc: 'CTR', value: l.ctr + '%' },
      { key: 'peak_concurrent_user_count', desc: 'Peak CCU', value: fmt(l.peakConcurrentUsers) },
      { key: 'avg_watching_duration', desc: 'Avg watch (s)', value: l.avgWatchingDuration }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('live-analytics:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.livePerMinute, apiName: 'Performance Per Minutes',
  title: step.label, subtitle: 'vs expected GMV',
  metrics: [
    { l: 'Actual', v: fmt(156000000) },
    { l: 'Expected', v: fmt(180000000) },
    { l: 'Gap', v: '-13%', color: 'text-amber-600' }
  ],
  fields: [
    { key: 'gpm', desc: 'GPM', value: fmt(TTS_METRICS.lives.L001.gpm) },
    { key: 'sku_order_ctor', desc: 'SKU order CTOR', value: TTS_METRICS.lives.L001.skuOrderCtor + '%' },
    { key: 'comment_rate', desc: 'Comment rate', value: TTS_METRICS.lives.L001.commentRate + '%' },
    { key: 'follow_rate', desc: 'Follow rate', value: TTS_METRICS.lives.L001.followRate + '%' },
    { key: 'product_clicks', desc: 'Product clicks', value: fmt(9600) },
    { key: 'conversion', desc: 'Conversion', value: TTS_METRICS.lives.L001.conversion + '%' }
  ],
  actions: defaultStepActions(step, flow)
}));

// CONTENT — 4 tabs
reg('content:0', (step, flow) => ({
  layer: 'data', api: TTS_API.videoOverview, apiName: 'Get Shop Video Performance Overview',
  title: step.label, subtitle: 'Content calendar pipeline',
  metrics: [
    { l: 'Slots', v: ZZP_DATA.content.length },
    { l: 'Published', v: ZZP_DATA.content.filter(c => c.status === 'published').length },
    { l: 'Scheduled', v: ZZP_DATA.content.filter(c => c.status !== 'published').length }
  ],
  fields: ZZP_DATA.content.slice(0, 5).map(v => ({
    key: 'video_' + v.id,
    desc: v.title.slice(0, 32),
    value: v.status + (v.type === 'livestream' ? ' · LIVE' : ' · VIDEO')
  })),
  actions: defaultStepActions(step, flow)
}));

reg('content:2', (step, flow) => {
  const v = getVideoMetrics('V001');
  return {
    layer: 'action', api: TTS_API.videoDetail, apiName: 'Get Shop Video Performance Details',
    title: step.label, subtitle: 'V001 published performance',
    metrics: [
      { l: 'Views', v: fmt(v.views) },
      { l: 'GMV', v: fmt(v.gmv), color: 'text-green-600' },
      { l: 'CTR', v: v.ctr + '%' }
    ],
    fields: [
      { key: 'views', desc: 'Video views', value: fmt(v.views) },
      { key: 'impressions', desc: 'Impressions', value: fmt(v.impressions) },
      { key: 'click_through_rate', desc: 'CTR', value: v.ctr + '%' },
      { key: 'order_count', desc: 'Orders', value: v.orders },
      { key: 'item_sold_count', desc: 'Items sold', value: v.itemSoldCount },
      { key: 'new_followers', desc: 'New followers', value: fmt(v.newFollowers) }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('content:3', (step, flow) => ({
  layer: 'automation', api: '/analytics/202403/videos/performances', apiName: 'Get Video Performances',
  title: step.label, subtitle: 'Auto track CVR/GMV post-publish',
  metrics: [
    { l: 'Anchor display', v: '78.5%' },
    { l: 'CVR', v: '4.2%' },
    { l: 'Pattern', v: 'Routine' }
  ],
  fields: [
    { key: 'anchor_display_rate', desc: 'Anchor display', value: '78.5%' },
    { key: 'avg_conversion_rate', desc: 'CVR', value: '4.2%' },
    { key: 'content_type', desc: 'Type', value: 'VIDEO' },
    { key: 'gmv.amount', desc: 'Total content GMV', value: fmt(ZZP_DATA.content.reduce((s, c) => s + c.gmv, 0)) },
    { key: 'auto_sync', desc: 'Push to analytics', value: 'content-analytics' },
    { key: 'next_action', desc: 'Replicate', value: 'Clone × 3 KOC' }
  ],
  actions: defaultStepActions(step, flow)
}));

// KOC — 4 tabs
reg('koc:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.creatorPerformance, apiName: 'Get Marketplace Creator Performance',
  title: step.label, subtitle: 'Scorecard GMV / ROI / CVR',
  metrics: [
    { l: 'Top score', v: '96' },
    { l: 'Avg GPM', v: fmt(188000) },
    { l: 'Creators', v: ZZP_DATA.kocs.length }
  ],
  fields: ZZP_DATA.kocs.slice(0, 5).map(k => {
    const m = getCreatorMetrics(k.id);
    return { key: 'creator_' + k.id, desc: k.name, value: `Score ${k.score} · GMV ${fmt(m?.gmv || k.gmv30d)} · PPS ${m?.pps || '—'}` };
  }),
  rows: {
    headers: ['KOC', 'GMV', 'Video GMV', 'Live GMV', 'PPS'],
    data: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => {
      const m = getCreatorMetrics(k.id);
      return [k.name, fmt(m?.gmv), fmt(m?.videoGmv), fmt(m?.liveGmv), m?.pps];
    })
  },
  actions: defaultStepActions(step, flow)
}));

// PROFIT / FINANCE
reg('profit:0', (step, flow) => ({
  layer: 'data', api: TTS_API.statements, apiName: 'Get Statements',
  title: step.label, subtitle: 'Revenue & COGS load',
  metrics: [
    { l: 'Revenue', v: fmt(TTS_METRICS.finance.revenueAmount) },
    { l: 'Net sales', v: fmt(TTS_METRICS.finance.netSalesAmount) },
    { l: 'Settlement', v: fmt(TTS_METRICS.finance.settlementAmount) }
  ],
  fields: [
    { key: 'revenue_amount', desc: 'Revenue', value: fmt(TTS_METRICS.finance.revenueAmount) },
    { key: 'settlement_amount', desc: 'Settlement', value: fmt(TTS_METRICS.finance.settlementAmount) },
    { key: 'fee_amount', desc: 'Platform fees', value: fmt(TTS_METRICS.finance.feeAmount) },
    { key: 'shipping_cost_amount', desc: 'Shipping', value: fmt(TTS_METRICS.finance.shippingCostAmount) },
    { key: 'cogs', desc: 'COGS (internal)', value: fmt(ZZP_DATA.costs.cogs) },
    { key: 'payment_status', desc: 'Payment', value: TTS_METRICS.finance.paymentStatus }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('profit:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.transactions, apiName: 'Get Transactions by Order',
  title: step.label, subtitle: 'Margin by SKU',
  metrics: [
    { l: 'Margin shop', v: calcProfit().margin + '%' },
    { l: 'Aff comm', v: fmt(TTS_METRICS.finance.affiliateCommission) },
    { l: 'Platform fee', v: fmt(TTS_METRICS.finance.platformCommission) }
  ],
  fields: [
    { key: 'platform_commission_amount', desc: 'Platform commission', value: fmt(TTS_METRICS.finance.platformCommission) },
    { key: 'affiliate_commission_amount', desc: 'Affiliate commission', value: fmt(TTS_METRICS.finance.affiliateCommission) },
    { key: 'affiliate_ads_commission_amount', desc: 'Affiliate ads comm', value: fmt(TTS_METRICS.finance.affiliateAdsCommission) },
    { key: 'unsettled_amount', desc: 'Unsettled', value: fmt(TTS_METRICS.finance.unsettledAmount) },
    { key: 'unsettled_orders', desc: 'Unsettled orders', value: TTS_METRICS.finance.unsettledOrders },
    { key: 'margin_erosion', desc: 'Flag', value: 'P003 ads cost' }
  ],
  actions: defaultStepActions(step, flow)
}));

// REVENUE
reg('revenue:0', (step, flow) => ({
  layer: 'data', api: TTS_API.shopPerformance, apiName: 'Get Shop Performance',
  title: step.label, subtitle: 'Merge revenue sources',
  metrics: [
    { l: 'Total GMV', v: fmt(TTS_METRICS.shop.gmv) },
    { l: 'Gross revenue', v: fmt(TTS_METRICS.shop.grossRevenue) },
    { l: 'Buyers', v: TTS_METRICS.shop.buyers }
  ],
  fields: [
    { key: 'gmv_breakdown.LIVE', desc: 'Live GMV', value: fmt(TTS_METRICS.shop.gmvBreakdown.LIVE) + ' (26.6%)' },
    { key: 'gmv_breakdown.VIDEO', desc: 'Video GMV', value: fmt(TTS_METRICS.shop.gmvBreakdown.VIDEO) + ' (20.2%)' },
    { key: 'gmv_breakdown.PRODUCT_CARD', desc: 'Product card', value: fmt(TTS_METRICS.shop.gmvBreakdown.PRODUCT_CARD) },
    { key: 'affiliate_share', desc: 'Affiliate est.', value: fmt(TTS_METRICS.affiliate.totalGmv) },
    { key: 'orders_count', desc: 'Orders', value: TTS_METRICS.shop.ordersCount },
    { key: 'avg_order_value', desc: 'OAV', value: fmtCurrency(TTS_METRICS.shop.avgOrderValue) }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('revenue:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.productPerformance, apiName: 'Get Shop Product Performance',
  title: step.label, subtitle: 'Attribution SKU × kênh',
  metrics: [
    { l: 'Top SKU', v: 'Serum VC' },
    { l: 'Live share', v: '42%' },
    { l: 'Video share', v: '36%' }
  ],
  fields: (() => {
    const m = getProductMetrics('P001');
    return [
      { key: 'breakdown.VIDEO', desc: 'P001 Video GMV', value: fmt(m.breakdown.VIDEO.gmv) },
      { key: 'breakdown.LIVE', desc: 'P001 Live GMV', value: fmt(m.breakdown.LIVE.gmv) },
      { key: 'breakdown.PRODUCT_CARD', desc: 'P001 Card GMV', value: fmt(m.breakdown.PRODUCT_CARD.gmv) },
      { key: 'ctr', desc: 'P001 CTR', value: m.ctr + '%' },
      { key: 'avg_conversion_rate', desc: 'P001 CVR', value: m.avgConversionRate + '%' },
      { key: 'impressions', desc: 'P001 impressions', value: fmt(m.impressions) }
    ];
  })(),
  actions: defaultStepActions(step, flow)
}));

// PRODUCT ANALYTICS
reg('product-analytics:0', (step, flow) => ({
  layer: 'data', api: TTS_API.skuPerformance, apiName: 'Get Shop SKU Performance List',
  title: step.label, subtitle: 'SKU ranking GMV / units',
  metrics: [
    { l: 'SKUs', v: Object.keys(TTS_METRICS.products).length },
    { l: 'Top GMV', v: fmt(getProductMetrics('P001').gmv) },
    { l: 'Units total', v: TTS_METRICS.shop.unitsSold }
  ],
  fields: ZZP_DATA.products.map(p => {
    const m = getProductMetrics(p.id);
    return { key: 'sku_' + p.id, desc: p.name.slice(0, 24), value: m ? `${fmt(m.gmv)} · ${m.orders} orders · CVR ${m.avgConversionRate}%` : '—' };
  }),
  actions: defaultStepActions(step, flow)
}));

// EXECUTIVE
reg('executive:0', (step, flow) => ({
  layer: 'data', api: TTS_API.shopPerformance, apiName: 'Get Shop Performance + Hourly',
  title: step.label, subtitle: 'Consolidate all modules',
  metrics: getModuleMetrics('executive').slice(0, 6),
  fields: [
    { key: 'gmv.amount', desc: 'GMV 30d', value: fmt(TTS_METRICS.shop.gmv) },
    { key: 'orders_count', desc: 'Orders', value: TTS_METRICS.shop.ordersCount },
    { key: 'units_sold', desc: 'Units', value: TTS_METRICS.shop.unitsSold },
    { key: 'settlement_amount', desc: 'Settlement', value: fmt(TTS_METRICS.finance.settlementAmount) },
    { key: 'profit_margin', desc: 'Margin', value: calcProfit().margin + '%' },
    { key: 'sync_at', desc: 'Last sync', value: TTS_METRICS.shop.syncAt }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('executive:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.shopHourly, apiName: 'Get Shop Performance Per Hour',
  title: step.label, subtitle: 'Trend & anomaly',
  metrics: [
    { l: 'GMV trend', v: '↑ 28%' },
    { l: 'Peak hour', v: '20–22h' },
    { l: 'Anomaly', v: 'Ads cost ↑' }
  ],
  fields: [
    { key: 'items_sold', desc: 'Peak hour items', value: '186 sp' },
    { key: 'visitors', desc: 'Peak visitors', value: '1,240' },
    { key: 'customers', desc: 'Peak customers', value: '98' },
    { key: 'cost_shift', desc: 'Cost anomaly', value: 'Ads +12%' },
    { key: 'affiliate_shift', desc: 'Affiliate share', value: 'Stable 38%' },
    { key: 'return_rate', desc: 'Returns', value: TTS_METRICS.shop.returnRate + '%' }
  ],
  actions: defaultStepActions(step, flow)
}));

// KOC — missing steps
reg('koc:0', (step, flow) => ({
  layer: 'data', api: '/affiliate_seller/202412/open_collaborations/search', apiName: 'Search Open Collaboration + CRM',
  title: step.label, subtitle: '6 KOC · 4 lifecycle stages',
  metrics: [
    { l: 'Pipeline', v: ZZP_DATA.kocs.length },
    { l: 'Revenue stage', v: ZZP_DATA.kocs.filter(k => k.lifecycle === 'revenue').length },
    { l: 'Prospect', v: ZZP_DATA.kocs.filter(k => k.lifecycle === 'prospect').length }
  ],
  fields: ZZP_DATA.kocs.map(k => ({
    key: 'creator_' + k.id,
    desc: k.name + ' · ' + k.tier,
    value: `${k.lifecycle} · score ${k.score} · GMV ${fmt(k.gmv30d)}`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('koc:2', (step, flow) => ({
  layer: 'action', api: TTS_API.creatorPerformance, apiName: 'Creator tier actions',
  title: step.label, subtitle: '≥80 scale · 50–79 nurture · <50 cut',
  metrics: [
    { l: 'Scale', v: ZZP_DATA.kocs.filter(k => k.score >= 80).length },
    { l: 'Nurture', v: ZZP_DATA.kocs.filter(k => k.score >= 50 && k.score < 80).length },
    { l: 'Cut', v: ZZP_DATA.kocs.filter(k => k.score < 50).length, color: 'text-red-600' }
  ],
  fields: [
    { key: 'K001', desc: 'Scale · @linhskincare', value: 'Score 92 → comm 15%' },
    { key: 'K003', desc: 'Scale · @livewithhuong', value: 'Score 96 → Macro+' },
    { key: 'K002', desc: 'Nurture · @beautybymai', value: 'Score 72 → sample boost' },
    { key: 'K006', desc: 'Cut · @newcreator', value: 'Score 22 → pause collab' },
    { key: 'tier_rule', desc: 'Threshold', value: 'ROI > 3x scale' },
    { key: 'action_queue', desc: 'Tasks', value: 'AQ001, AQ004' }
  ],
  actions: [btnPrimary('KOC CRM', `navigate('koc')`), ...defaultStepActions(step, flow)]
}));

reg('koc:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.sampleApplications, apiName: 'Auto sample rule R004',
  title: step.label, subtitle: 'score > 80 → auto sample',
  metrics: [
    { l: 'Rule', v: 'R004' },
    { l: 'Eligible', v: '3 KOC' },
    { l: 'Auto sent', v: '2 mẫu' }
  ],
  fields: [
    { key: 'rule_id', desc: 'Automation rule', value: 'R004' },
    { key: 'condition', desc: 'Trigger', value: 'creator_score > 80' },
    { key: 'sample_status', desc: 'Last auto', value: 'S001 → K001' },
    { key: 'fulfillment_status', desc: 'Delivery', value: 'Delivered' },
    { key: 'linked_flow', desc: 'Flow', value: 'FLOW_SAMPLE' },
    { key: 'notify', desc: 'Affiliate mgr', value: 'In-App sent' }
  ],
  actions: [btnPrimary('Chạy FLOW_SAMPLE', `runAutomationFlow('FLOW_SAMPLE')`), ...defaultStepActions(step, flow)]
}));

// CONTENT — step 1
reg('content:1', (step, flow) => ({
  layer: 'intelligence', api: '/affiliate_seller/202409/sample_applications/search', apiName: 'Content brief review',
  title: step.label, subtitle: 'Draft → Review → Scheduled',
  metrics: [
    { l: 'Draft', v: ZZP_DATA.content.filter(c => c.status === 'draft').length },
    { l: 'Review', v: ZZP_DATA.content.filter(c => c.status === 'review').length },
    { l: 'Scheduled', v: ZZP_DATA.content.filter(c => c.status === 'scheduled').length }
  ],
  fields: ZZP_DATA.content.filter(c => c.status !== 'published').slice(0, 6).map(c => ({
    key: 'brief_' + c.id,
    desc: c.title.slice(0, 30),
    value: `${c.status} · ${c.koc ? ZZP_DATA.kocs.find(k => k.id === c.koc)?.name : 'Brand'} · ${c.type}`
  })),
  actions: defaultStepActions(step, flow)
}));

// LIVE ANALYTICS — steps 2-3
reg('live-analytics:2', (step, flow) => ({
  layer: 'action', api: TTS_API.creatorPerformance, apiName: 'Update creator score from live',
  title: step.label, subtitle: 'Live performance → KOC score',
  metrics: [
    { l: 'K003 score', v: '96 → 98', color: 'text-green-600' },
    { l: 'Live GMV', v: fmt(TTS_METRICS.lives.L001.gmv) },
    { l: 'GPM', v: fmt(TTS_METRICS.lives.L001.gpm) }
  ],
  fields: [
    { key: 'live_gmv', desc: 'Session GMV', value: fmt(TTS_METRICS.lives.L001.gmv) },
    { key: 'gpm', desc: 'GPM', value: fmt(TTS_METRICS.lives.L001.gpm) },
    { key: 'sku_order_ctor', desc: 'SKU order CTOR', value: TTS_METRICS.lives.L001.skuOrderCtor + '%' },
    { key: 'pps', desc: 'PPS update', value: getCreatorMetrics('K003')?.pps },
    { key: 'tier', desc: 'Tier rec', value: 'Macro+' },
    { key: 'lifecycle', desc: 'CRM stage', value: 'revenue' }
  ],
  actions: [btnPrimary('KOC CRM', `navigate('koc')`), ...defaultStepActions(step, flow)]
}));

reg('live-analytics:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.liveOverview, apiName: 'Book next live slot',
  title: step.label, subtitle: 'Calendar reminder T-2',
  metrics: [
    { l: 'Next live', v: '6/8 20:00' },
    { l: 'Host', v: '@livewithhuong' },
    { l: 'Reminder', v: 'T-2 days' }
  ],
  fields: [
    { key: 'live_room_id', desc: 'Next session', value: 'L003' },
    { key: 'scheduled_time', desc: 'Start', value: '2026-06-08 20:00' },
    { key: 'expected_gmv', desc: 'Target GMV', value: fmt(120000000) },
    { key: 'checklist', desc: 'Prep status', value: '0/8' },
    { key: 'notify_host', desc: 'Host notify', value: 'Scheduled' },
    { key: 'flow', desc: 'Linked', value: 'FLOW_LIVE_PREP' }
  ],
  actions: [btnPrimary('Livestream', `navigate('livestream')`), ...defaultStepActions(step, flow)]
}));

// EXECUTIVE — steps 2-3
reg('executive:2', (step, flow) => ({
  layer: 'action', api: TTS_API.productPerformance, apiName: 'Drill-down attribution',
  title: step.label, subtitle: 'Click metric → module',
  metrics: [
    { l: 'Live GMV', v: fmt(TTS_METRICS.shop.gmvBreakdown.LIVE) },
    { l: 'Aff GMV', v: fmt(TTS_METRICS.affiliate.totalGmv) },
    { l: 'Ads ROAS', v: TTS_METRICS.ads.blendedRoas + 'x' }
  ],
  fields: [
    { key: 'drill_live', desc: 'Livestream', value: 'live-analytics · L001' },
    { key: 'drill_affiliate', desc: 'Affiliate', value: 'affiliate-analytics · 38%' },
    { key: 'drill_ads', desc: 'Ads', value: 'ads · AD002 flagged' },
    { key: 'drill_inventory', desc: 'Stock risk', value: 'inventory · P003' },
    { key: 'drill_profit', desc: 'Margin', value: calcProfit().margin + '%' },
    { key: 'action', desc: 'Priority', value: 'P003 restock + pause AD002' }
  ],
  actions: [btnPrimary('Doanh thu', `navigate('revenue')`), btnPrimary('Lợi nhuận', `navigate('profit')`), ...defaultStepActions(step, flow)]
}));

reg('executive:3', (step, flow) => ({
  layer: 'automation', api: '/open_api/v1.3/report/integrated/get/', apiName: 'Scheduled executive report',
  title: step.label, subtitle: 'Rule R003 cron 08:00',
  metrics: [
    { l: 'Schedule', v: 'Daily 08:00' },
    { l: 'Rule', v: 'R003' },
    { l: 'Channels', v: 'Email + PDF' }
  ],
  fields: [
    { key: 'report_type', desc: 'Report', value: 'Executive P&L + GMV' },
    { key: 'gmv.amount', desc: 'Snapshot GMV', value: fmt(TTS_METRICS.shop.gmv) },
    { key: 'settlement_amount', desc: 'Settlement', value: fmt(TTS_METRICS.finance.settlementAmount) },
    { key: 'profit_margin', desc: 'Margin', value: calcProfit().margin + '%' },
    { key: 'recipients', desc: 'To', value: 'Owner · CFO' },
    { key: 'last_sent', desc: 'Last run', value: '2026-06-05 08:00' }
  ],
  actions: defaultStepActions(step, flow)
}));

// REVENUE — steps 2-3
reg('revenue:2', (step, flow) => ({
  layer: 'action', api: TTS_API.skuPerformance, apiName: 'Hero SKU growth driver',
  title: step.label, subtitle: 'Serum VC affiliate+live',
  metrics: [
    { l: 'P001 GMV', v: fmt(getProductMetrics('P001').gmv) },
    { l: 'Aff share', v: '38%' },
    { l: 'Live share', v: '42%' }
  ],
  fields: [
    { key: 'product_id', desc: 'Hero SKU', value: 'P001 Serum Vitamin C' },
    { key: 'breakdown.VIDEO', desc: 'Video GMV', value: fmt(getProductMetrics('P001').breakdown.VIDEO.gmv) },
    { key: 'breakdown.LIVE', desc: 'Live GMV', value: fmt(getProductMetrics('P001').breakdown.LIVE.gmv) },
    { key: 'top_creator', desc: 'Top KOC', value: '@livewithhuong' },
    { key: 'growth_driver', desc: 'Driver', value: 'Affiliate + Live combo' },
    { key: 'recommendation', desc: 'Action', value: 'Scale P001 budget +15%' }
  ],
  actions: [btnPrimary('SKU analytics', `navigate('product-analytics')`), ...defaultStepActions(step, flow)]
}));

reg('revenue:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.shopPerformance, apiName: 'Auto insight if shift > 10%',
  title: step.label, subtitle: 'Push to Growth AI',
  metrics: [
    { l: 'Shift detected', v: 'Live +8%' },
    { l: 'Threshold', v: '10%' },
    { l: 'Insight', v: 'AI004' }
  ],
  fields: [
    { key: 'gmv_breakdown.LIVE', desc: 'Live share delta', value: '+8% WoW' },
    { key: 'gmv_breakdown.VIDEO', desc: 'Video share', value: 'Stable' },
    { key: 'insight_id', desc: 'Generated', value: 'AI004' },
    { key: 'confidence', desc: 'Confidence', value: '88%' },
    { key: 'linked_action', desc: 'Action', value: 'AQ004' },
    { key: 'auto_push', desc: 'Growth AI', value: 'Enabled' }
  ],
  actions: [btnPrimary('Growth AI', `navigate('growth-assistant')`), ...defaultStepActions(step, flow)]
}));

// PROFIT — steps 2-3
reg('profit:2', (step, flow) => ({
  layer: 'action', api: TTS_API.adsReporting, apiName: 'Margin erosion alert',
  title: step.label, subtitle: 'A002 ads cost on P003',
  metrics: [
    { l: 'Alert', v: 'A002' },
    { l: 'P003 margin', v: '↓ 4.2%' },
    { l: 'Ads cost', v: fmt(getAdMetrics('AD002')?.spend) }
  ],
  fields: [
    { key: 'alert_id', desc: 'Alert', value: 'A002 · Ads cost spike' },
    { key: 'product_id', desc: 'SKU', value: 'P003 Mặt nạ' },
    { key: 'roas', desc: 'AD002 ROAS', value: '1.2x' },
    { key: 'platform_commission', desc: 'Platform fee', value: fmt(TTS_METRICS.finance.platformCommission) },
    { key: 'affiliate_commission', desc: 'Aff comm', value: fmt(TTS_METRICS.finance.affiliateCommission) },
    { key: 'recommendation', desc: 'Fix', value: 'Pause AD002 · shift affiliate' }
  ],
  actions: [btnPrimary('Cảnh báo', `navigate('alerts')`), ...defaultStepActions(step, flow)]
}));

reg('profit:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.gmvMaxCampaign, apiName: 'Cost optimizer FLOW_ADS',
  title: step.label, subtitle: 'FLOW_ADS + pricing review',
  metrics: [
    { l: 'Saved', v: fmt(7900000) },
    { l: 'Margin rec', v: '+1.8%' },
    { l: 'Flow', v: 'FLOW_ADS' }
  ],
  fields: [
    { key: 'paused_campaign', desc: 'Paused', value: 'AD002' },
    { key: 'budget_shift', desc: 'Reallocated', value: fmt(8000000) + ' → Affiliate' },
    { key: 'gmv_max.actual_roi', desc: 'GMV Max ROI', value: TTS_METRICS.ads.gmvMax.actualRoi + 'x' },
    { key: 'pricing_review', desc: 'SKU pricing', value: 'P003 hold discount' },
    { key: 'audit_log', desc: 'Logged', value: 'Yes' },
    { key: 'flow', desc: 'Completed', value: 'FLOW_ADS' }
  ],
  actions: [btnPrimary('Chạy FLOW_ADS', `runAutomationFlow('FLOW_ADS')`), ...defaultStepActions(step, flow)]
}));

// PRODUCT ANALYTICS — steps 1-3
reg('product-analytics:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.productPerformance, apiName: 'Scale/Optimize/Maintain labels',
  title: step.label, subtitle: 'AI labels per SKU',
  metrics: [
    { l: 'Scale', v: '2 SKU' },
    { l: 'Optimize', v: '2 SKU' },
    { l: 'Maintain', v: '3 SKU' }
  ],
  fields: [
    { key: 'P001', desc: 'Serum VC', value: 'Scale · CVR 5.2% · GMV top' },
    { key: 'P003', desc: 'Mặt nạ', value: 'Optimize · stock risk' },
    { key: 'P005', desc: 'Kem CN', value: 'Scale · listing 88%' },
    { key: 'P006', desc: 'Son dưỡng', value: 'Maintain · compliance fix' },
    { key: 'label_engine', desc: 'AI model', value: 'Portfolio v2' },
    { key: 'review_cycle', desc: 'Cycle', value: 'Weekly' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('product-analytics:2', (step, flow) => ({
  layer: 'action', api: TTS_API.skuPerformance, apiName: 'Push to optimizer',
  title: step.label, subtitle: 'Scale P001,P005 · Fix P006',
  metrics: [
    { l: 'Actions', v: '3' },
    { l: 'Est GMV', v: '+45M' },
    { l: 'Priority', v: 'High' }
  ],
  fields: [
    { key: 'AQ_scale', desc: 'Scale P001', value: 'Ads + Affiliate budget' },
    { key: 'AQ_scale2', desc: 'Scale P005', value: 'Live pin hero' },
    { key: 'AQ_fix', desc: 'Fix P006', value: 'INCI listing update' },
    { key: 'optimizer', desc: 'Module', value: 'optimization' },
    { key: 'batch_id', desc: 'Batch', value: 'OPT-20260605' },
    { key: 'owner', desc: 'Assignee', value: 'Lê Thị Hoa' }
  ],
  actions: [btnPrimary('Optimizer', `navigate('optimization')`), ...defaultStepActions(step, flow)]
}));

reg('product-analytics:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.shopPerformance, apiName: 'FLOW_OPTIMIZE step 1',
  title: step.label, subtitle: 'Create action batch',
  metrics: [
    { l: 'Batch', v: '4 actions' },
    { l: 'Flow', v: 'FLOW_OPTIMIZE' },
    { l: 'Status', v: 'Queued' }
  ],
  fields: [
    { key: 'flow_id', desc: 'Automation', value: 'FLOW_OPTIMIZE' },
    { key: 'actions_created', desc: 'New AQ', value: 'AQ001–AQ004' },
    { key: 'modules', desc: 'Targets', value: 'ads · affiliate · inventory' },
    { key: 'schedule', desc: 'Run', value: 'Weekly Sun 06:00' },
    { key: 'audit', desc: 'Audit', value: 'Enabled' },
    { key: 'notify', desc: 'Owner', value: 'Nguyễn Minh Anh' }
  ],
  actions: [btnPrimary('Chạy FLOW_OPTIMIZE', `runAutomationFlow('FLOW_OPTIMIZE')`), ...defaultStepActions(step, flow)]
}));

// DASHBOARD
reg('dashboard:0', (step, flow) => ({
  layer: 'data', api: TTS_API.shopPerformance, apiName: 'Real-time KPI sync',
  title: step.label, subtitle: 'GMV · orders · profit · alerts',
  metrics: getModuleMetrics('dashboard').slice(0, 3),
  fields: [
    { key: 'gmv.amount', desc: 'GMV today', value: fmt(TTS_METRICS.shop.gmv) },
    { key: 'orders_count', desc: 'Orders', value: TTS_METRICS.shop.ordersCount },
    { key: 'profit_margin', desc: 'Margin', value: calcProfit().margin + '%' },
    { key: 'alerts_unread', desc: 'Unread alerts', value: ZZP_DATA.alerts.filter(a => !a.read).length },
    { key: 'health_score', desc: 'Shop health', value: '78%' },
    { key: 'sync_at', desc: 'Last sync', value: TTS_METRICS.shop.syncAt }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('dashboard:1', (step, flow) => ({
  layer: 'intelligence', api: '/analytics/202509/shop/performance', apiName: 'AI priority scoring',
  title: step.label, subtitle: 'AI001–AI004 priority',
  metrics: [
    { l: 'Insights', v: ZZP_DATA.aiInsights.length },
    { l: 'P1', v: ZZP_DATA.aiInsights.filter(i => i.priority === 1).length },
    { l: 'Confidence', v: '78–95%' }
  ],
  fields: ZZP_DATA.aiInsights.slice(0, 4).map(ai => ({
    key: 'insight_' + ai.id,
    desc: ai.title.slice(0, 36),
    value: `P${ai.priority} · ${ai.confidence}% · ${ai.impact}`
  })),
  actions: [btnPrimary('Growth AI', `navigate('growth-assistant')`), ...defaultStepActions(step, flow)]
}));

reg('dashboard:2', (step, flow) => ({
  layer: 'action', api: '/order/202507/orders', apiName: 'Action queue priority',
  title: step.label, subtitle: 'AQ001–AQ004 top 3',
  metrics: [
    { l: 'Queue', v: ZZP_DATA.actionQueue.length },
    { l: 'Critical', v: ZZP_DATA.actionQueue.filter(a => a.priority === 'critical').length },
    { l: 'Pending', v: ZZP_DATA.actionQueue.filter(a => a.status === 'pending').length }
  ],
  fields: ZZP_DATA.actionQueue.slice(0, 4).map(aq => ({
    key: 'action_' + aq.id,
    desc: aq.title.slice(0, 32),
    value: `${aq.priority} · ${aq.status} · ${aq.assignee}`
  })),
  actions: [btnPrimary('Action queue', `navigate('actions')`), ...defaultStepActions(step, flow)]
}));

reg('dashboard:3', (step, flow) => ({
  layer: 'automation', api: 'FLOW_OPTIMIZE', apiName: 'Growth Optimizer weekly',
  title: step.label, subtitle: 'FLOW_OPTIMIZE batch',
  metrics: [
    { l: 'Schedule', v: 'Weekly' },
    { l: 'Modules', v: '6' },
    { l: 'Last run', v: 'Sun 06:00' }
  ],
  fields: [
    { key: 'flow', desc: 'Automation', value: 'FLOW_OPTIMIZE' },
    { key: 'optimizers', desc: 'Parallel', value: 'Product · KOC · Content · Campaign' },
    { key: 'actions_batch', desc: 'Output', value: '4 new AQ' },
    { key: 'gmv_impact', desc: 'Est impact', value: '+28M GMV' },
    { key: 'margin_impact', desc: 'Margin', value: '+1.2%' },
    { key: 'next_run', desc: 'Next', value: '2026-06-08 06:00' }
  ],
  actions: [btnPrimary('Chạy FLOW_OPTIMIZE', `runAutomationFlow('FLOW_OPTIMIZE')`), ...defaultStepActions(step, flow)]
}));

// RETURNS
reg('returns:0', (step, flow) => {
  const r = ZZP_DATA.returns[0];
  return {
    layer: 'data', api: '/return_refund/202309/returns/search', apiName: 'Search Returns',
    title: step.label, subtitle: r.id + ' · ' + r.orderId,
    metrics: [
      { l: 'Open', v: ZZP_DATA.returns.filter(x => x.status !== 'completed').length },
      { l: 'Amount', v: fmtCurrency(r.amount) },
      { l: 'Return rate', v: TTS_METRICS.shop.returnRate + '%' }
    ],
    fields: [
      { key: 'return_id', desc: 'Return ID', value: r.id },
      { key: 'order_id', desc: 'Order', value: r.orderId },
      { key: 'return_amount', desc: 'Refund amount', value: fmtCurrency(r.amount) },
      { key: 'return_reason', desc: 'Reason', value: r.reason },
      { key: 'return_status', desc: 'Status', value: r.status },
      { key: 'return_type', desc: 'Type', value: r.type }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('returns:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.shopPerformance, apiName: 'Return rate benchmark',
  title: step.label, subtitle: '3.2% vs benchmark 4.8%',
  metrics: [
    { l: 'Shop rate', v: TTS_METRICS.shop.returnRate + '%', color: 'text-green-600' },
    { l: 'Benchmark', v: '4.8%' },
    { l: 'Refunds', v: fmt(TTS_METRICS.shop.refunds) }
  ],
  fields: [
    { key: 'return_rate', desc: 'Shop return rate', value: TTS_METRICS.shop.returnRate + '%' },
    { key: 'cancellations_and_returns', desc: 'Return orders', value: TTS_METRICS.shop.cancellationsAndReturns },
    { key: 'refunds', desc: 'Refund amount', value: fmt(TTS_METRICS.shop.refunds) },
    { key: 'top_reason', desc: 'Top reason', value: 'Size/fit mismatch' },
    { key: 'top_sku', desc: 'SKU risk', value: 'P003' },
    { key: 'benchmark_gap', desc: 'vs market', value: '-1.6% better' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('returns:2', (step, flow) => ({
  layer: 'action', api: TTS_API.orderDetail, apiName: 'Return review 24h',
  title: step.label, subtitle: 'pending_review → approve/reject',
  metrics: [
    { l: 'Pending', v: '1' },
    { l: 'SLA', v: '24h' },
    { l: 'Assignee', v: 'Ops' }
  ],
  fields: [
    { key: 'return_id', desc: 'Case', value: 'RET-001' },
    { key: 'review_status', desc: 'Status', value: 'pending_review' },
    { key: 'evidence', desc: 'Buyer photos', value: '2 attached' },
    { key: 'policy', desc: 'Policy', value: '7-day return OK' },
    { key: 'assignee', desc: 'Reviewer', value: 'Trần Văn Hùng' },
    { key: 'decision', desc: 'Recommend', value: 'Approve partial' }
  ],
  actions: [btnPrimary('Hoàn đơn', `navigate('returns')`), ...defaultStepActions(step, flow)]
}));

reg('returns:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.transactions, apiName: 'Refund sync to P&L',
  title: step.label, subtitle: 'Sync refund → margin analytics',
  metrics: [
    { l: 'Refund', v: fmtCurrency(578000) },
    { l: 'Margin adj', v: '-0.12%' },
    { l: 'Synced', v: 'Yes' }
  ],
  fields: [
    { key: 'refund_amount', desc: 'Processed', value: fmtCurrency(578000) },
    { key: 'settlement_status', desc: 'Settlement', value: 'Adjusted' },
    { key: 'profit_margin', desc: 'New margin', value: calcProfit().margin + '%' },
    { desc: 'Đồng bộ tài chính', value: 'Đã cập nhật P&L' },
    { key: 'audit_log', desc: 'Logged', value: 'RET-001' },
    { key: 'notify', desc: 'Finance', value: 'Email sent' }
  ],
  actions: defaultStepActions(step, flow)
}));

// GROWTH ASSISTANT
reg('growth-assistant:0', (step, flow) => ({
  layer: 'data', api: TTS_API.shopPerformance, apiName: 'AI Engine data ingest',
  title: step.label, subtitle: 'Products · ads · KOC · inventory',
  metrics: [
    { l: 'Sources', v: '6' },
    { l: 'Records', v: '18.4k' },
    { l: 'Latency', v: '2.1s' }
  ],
  fields: [
    { desc: 'GMV shop 30 ngày', value: fmt(TTS_METRICS.shop.gmv) },
    { desc: 'Sản phẩm trong Data Hub', value: Object.keys(TTS_METRICS.products).length + ' SKU' },
    { desc: 'Đơn affiliate', value: TTS_METRICS.affiliate.totalOrders + ' đơn' },
    { desc: 'Chi phí quảng cáo', value: fmt(TTS_METRICS.ads.totalSpend) },
    { desc: 'Tồn kho đồng bộ', value: '7 SKU' },
    { desc: 'Cập nhật lần cuối', value: TTS_METRICS.shop.syncAt }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('growth-assistant:1', (step, flow) => ({
  layer: 'intelligence', api: '/analytics/202509/shop/performance', apiName: 'Ranked insights AI001–AI004',
  title: step.label, subtitle: 'Confidence 78–95%',
  metrics: ZZP_DATA.aiInsights.slice(0, 3).map(ai => ({ l: ai.id, v: ai.confidence + '%' })),
  fields: ZZP_DATA.aiInsights.map(ai => ({
    key: ai.id,
    desc: ai.title.slice(0, 40),
    value: `P${ai.priority} · ${ai.confidence}% · ${ai.impact}`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('growth-assistant:2', (step, flow) => ({
  layer: 'action', api: TTS_API.gmvMaxCampaign, apiName: 'One-click → Action Queue',
  title: step.label, subtitle: 'Create AQ from insight',
  metrics: [
    { l: 'From AI002', v: 'AQ001' },
    { l: 'Impact', v: '+12M' },
    { l: 'Status', v: 'pending' }
  ],
  fields: [
    { key: 'insight_id', desc: 'Source', value: 'AI002' },
    { key: 'action_id', desc: 'Created', value: 'AQ001' },
    { key: 'action_type', desc: 'Type', value: 'Pause ads → Affiliate' },
    { key: 'budget_shift', desc: 'Amount', value: fmt(8000000) },
    { key: 'assignee', desc: 'Owner', value: 'Lê Thị Hoa' },
    { key: 'approval', desc: 'Needs', value: 'Manager approve' }
  ],
  actions: [btnPrimary('Duyệt AQ001', `approveAction('AQ001')`), ...defaultStepActions(step, flow)]
}));

reg('growth-assistant:3', (step, flow) => ({
  layer: 'automation', api: 'FLOW_AI_ACTION', apiName: 'FLOW_AI_ACTION execute',
  title: step.label, subtitle: 'Approve → budget change → audit',
  metrics: [
    { l: 'Paused', v: 'AD002' },
    { l: 'Shifted', v: fmt(8000000) },
    { l: 'Audit', v: 'Logged' }
  ],
  fields: [
    { key: 'flow', desc: 'Automation', value: 'FLOW_AI_ACTION' },
    { key: 'campaign_paused', desc: 'Paused', value: 'AD002' },
    { key: 'affiliate_boost', desc: 'K002 comm', value: '10% → 12%' },
    { key: 'audit_log', desc: 'Audit', value: 'Complete' },
    { key: 'notify', desc: 'Channels', value: 'In-App + Email' },
    { key: 'profit_impact', desc: 'Est margin', value: '+1.8%' }
  ],
  actions: [btnPrimary('Chạy FLOW_AI_ACTION', `runAutomationFlow('FLOW_AI_ACTION')`), ...defaultStepActions(step, flow)]
}));

// ALERTS
reg('alerts:0', (step, flow) => ({
  layer: 'data', api: TTS_API.shopPerformance, apiName: 'Monitor all metrics',
  title: step.label, subtitle: '6 alerts · 5 unread',
  metrics: [
    { l: 'Total', v: ZZP_DATA.alerts.length },
    { l: 'Unread', v: ZZP_DATA.alerts.filter(a => !a.read).length },
    { l: 'Critical', v: ZZP_DATA.alerts.filter(a => a.severity === 'critical').length, color: 'text-red-600' }
  ],
  fields: ZZP_DATA.alerts.map(a => ({
    key: 'alert_' + a.id,
    desc: a.title.slice(0, 32),
    value: `${a.severity} · ${a.module} · ${a.read ? 'read' : 'unread'}`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('alerts:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.inventorySearch, apiName: 'Severity & root cause',
  title: step.label, subtitle: 'Critical 2 · Warning 2 · Info 2',
  metrics: [
    { l: 'Critical', v: '2', color: 'text-red-600' },
    { l: 'Warning', v: '2', color: 'text-amber-600' },
    { l: 'Info', v: '2' }
  ],
  fields: [
    { key: 'A001', desc: 'Stock critical', value: 'P003 · 2 days left' },
    { key: 'A002', desc: 'Ads cost', value: 'AD002 ROAS 1.2x' },
    { key: 'A003', desc: 'Voucher cap', value: 'NEW50K 63%' },
    { key: 'A004', desc: 'Order SLA', value: 'ORD-88421 2h' },
    { key: 'root_cause_engine', desc: 'Engine', value: 'Anomaly v3' },
    { key: 'linked_insights', desc: 'AI links', value: 'AI002, AI003' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('alerts:2', (step, flow) => ({
  layer: 'action', api: TTS_API.orderDetail, apiName: 'Route to module owner',
  title: step.label, subtitle: 'Alert → task assignee',
  metrics: [
    { l: 'Routed', v: '4' },
    { l: 'Pending', v: '2' },
    { l: 'Resolved', v: '0' }
  ],
  fields: [
    { key: 'A001', desc: 'Inventory', value: '→ Trần Văn Hùng · AQ002' },
    { key: 'A002', desc: 'Ads', value: '→ Lê Thị Hoa · AQ001' },
    { key: 'A003', desc: 'Voucher', value: '→ Marketing · adjust cap' },
    { key: 'A004', desc: 'Orders', value: '→ Ops · ORD-88421' },
    { key: 'route_rule', desc: 'RBAC', value: 'By module owner' },
    { key: 'sla', desc: 'Response SLA', value: '< 4h critical' }
  ],
  actions: [btnPrimary('Action queue', `navigate('actions')`), ...defaultStepActions(step, flow)]
}));

reg('alerts:3', (step, flow) => ({
  layer: 'automation', api: 'FLOW_STOCK', apiName: 'Trigger linked flow',
  title: step.label, subtitle: 'A001→FLOW_STOCK · A002→FLOW_ADS',
  metrics: [
    { l: 'A001', v: 'FLOW_STOCK' },
    { l: 'A002', v: 'FLOW_ADS' },
    { l: 'Auto', v: '2 flows' }
  ],
  fields: [
    { key: 'A001_flow', desc: 'Stock alert', value: 'FLOW_STOCK → PO 2000' },
    { key: 'A002_flow', desc: 'Ads alert', value: 'FLOW_ADS → pause AD002' },
    { key: 'auto_trigger', desc: 'Rule', value: 'severity=critical' },
    { key: 'chain', desc: 'Cross-module', value: 'inventory · ads · finance' },
    { key: 'audit', desc: 'Audit log', value: 'Enabled' },
    { key: 'notify', desc: 'Notify', value: 'Owner + assignee' }
  ],
  actions: [btnPrimary('Quy trình', `navigate('workflows')`), ...defaultStepActions(step, flow)]
}));

// CREATOR ANALYTICS
reg('creator-analytics:0', (step, flow) => ({
  layer: 'data', api: TTS_API.creatorPerformance, apiName: 'Aggregate KOC metrics',
  title: step.label, subtitle: 'GMV · ROI · CVR · videos',
  metrics: [
    { l: 'Creators', v: ZZP_DATA.kocs.length },
    { l: 'Total GMV', v: fmt(TTS_METRICS.affiliate.totalGmv) },
    { l: 'Avg PPS', v: '74' }
  ],
  fields: ZZP_DATA.kocs.map(k => {
    const m = getCreatorMetrics(k.id);
    return {
      key: 'creator_' + k.id,
      desc: k.name,
      value: `GMV ${fmt(m?.gmv || k.gmv30d)} · PPS ${m?.pps || '—'} · videos ${m?.ecVideoCount || 0}`
    };
  }),
  actions: defaultStepActions(step, flow)
}));

reg('creator-analytics:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.creatorPerformance, apiName: 'Ranking & tier recommendation',
  title: step.label, subtitle: 'K003 #1 → Macro+',
  metrics: [
    { l: '#1', v: '@livewithhuong' },
    { l: 'GPM', v: fmt(getCreatorMetrics('K003')?.gpm) },
    { l: 'PPS', v: getCreatorMetrics('K003')?.pps }
  ],
  fields: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).sort((a, b) => b.score - a.score).slice(0, 5).map((k, i) => {
    const m = getCreatorMetrics(k.id);
    return {
      key: 'rank_' + (i + 1),
      desc: k.name,
      value: `#${i + 1} · PPS ${m?.pps || '—'} · tier ${k.tier}${k.score >= 90 ? ' → Macro+' : ''}`
    };
  }),
  rows: {
    headers: ['Rank', 'KOC', 'GMV', 'GPM', 'Tier rec'],
    data: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).sort((a, b) => b.score - a.score).slice(0, 4).map((k, i) => {
      const m = getCreatorMetrics(k.id);
      return [`#${i + 1}`, k.name, fmt(m?.gmv), fmt(m?.gpm), k.score >= 90 ? 'Macro+' : k.tier];
    })
  },
  actions: defaultStepActions(step, flow)
}));

reg('creator-analytics:2', (step, flow) => ({
  layer: 'action', api: TTS_API.creatorPerformance, apiName: 'Update CRM lifecycle',
  title: step.label, subtitle: 'Promote/demote tier',
  metrics: [
    { l: 'Promote', v: 'K003' },
    { l: 'Demote', v: 'K006' },
    { l: 'Nurture', v: 'K002' }
  ],
  fields: [
    { key: 'K003', desc: 'Promote Macro+', value: 'Score 96 · comm 15%' },
    { key: 'K006', desc: 'Demote cut', value: 'Score 22 · pause' },
    { key: 'K002', desc: 'Nurture', value: 'Sample + comm boost' },
    { key: 'tier_macro', desc: 'Macro threshold', value: 'PPS ≥ 90' },
    { key: 'crm_sync', desc: 'CRM module', value: 'koc' },
    { key: 'notify', desc: 'Affiliate mgr', value: 'Pending' }
  ],
  actions: [btnPrimary('KOC CRM', `navigate('koc')`), ...defaultStepActions(step, flow)]
}));

reg('creator-analytics:3', (step, flow) => ({
  layer: 'automation', api: '/notification/202309/events', apiName: 'Tier change alert',
  title: step.label, subtitle: 'Notify affiliate manager',
  metrics: [
    { l: 'Changes', v: '2' },
    { l: 'Channel', v: 'In-App' },
    { l: 'Sent', v: 'Yes' }
  ],
  fields: [
    { key: 'event_type', desc: 'Event', value: 'TIER_CHANGE' },
    { key: 'K003', desc: 'Promoted', value: 'Macro → Macro+' },
    { key: 'K006', desc: 'Cut', value: 'Active → Paused' },
    { key: 'recipient', desc: 'To', value: 'Affiliate Manager' },
    { key: 'channel', desc: 'Channel', value: 'In-App + Email' },
    { key: 'deep_link', desc: 'Link', value: 'creator-analytics' }
  ],
  actions: defaultStepActions(step, flow)
}));

// CONTENT ANALYTICS
reg('content-analytics:0', (step, flow) => ({
  layer: 'data', api: TTS_API.videoOverview, apiName: 'Video performance pull',
  title: step.label, subtitle: 'Views · orders · GMV · CVR',
  metrics: [
    { l: 'Videos', v: Object.keys(TTS_METRICS.videos).length },
    { l: 'Total views', v: fmt(734000) },
    { l: 'Content GMV', v: fmt(ZZP_DATA.content.reduce((s, c) => s + c.gmv, 0)) }
  ],
  fields: Object.entries(TTS_METRICS.videos).filter(([, v]) => v.views).map(([id, v]) => ({
    key: 'video_' + id,
    desc: ZZP_DATA.content.find(c => c.id === id)?.title?.slice(0, 28) || id,
    value: `${fmt(v.views)} views · ${v.orders} orders · CTR ${v.ctr}%`
  })),
  actions: defaultStepActions(step, flow)
}));

reg('content-analytics:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.videoDetail, apiName: 'Pattern analysis',
  title: step.label, subtitle: 'Routine 3 bước CVR 4.2%',
  metrics: [
    { l: 'Best CVR', v: '4.2%' },
    { l: 'Pattern', v: 'Routine' },
    { l: 'Anchor', v: '78.5%' }
  ],
  fields: [
    { key: 'V001', desc: 'Top pattern', value: 'Routine 3-step · CVR 4.2%' },
    { key: 'anchor_display_rate', desc: 'Anchor display', value: getVideoMetrics('V001')?.anchorDisplayRate + '%' },
    { key: 'avg_conversion_rate', desc: 'CVR', value: getVideoMetrics('V001')?.avgConversionRate + '%' },
    { key: 'content_type', desc: 'Type', value: 'VIDEO' },
    { key: 'gmv.amount', desc: 'GMV', value: fmt(getVideoMetrics('V001')?.gmv) },
    { key: 'replicate_score', desc: 'Replicate score', value: '92/100' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('content-analytics:2', (step, flow) => ({
  layer: 'action', api: TTS_API.creatorPerformance, apiName: 'Replication plan',
  title: step.label, subtitle: 'Clone × 3 KOC',
  metrics: [
    { l: 'Template', v: 'V001' },
    { l: 'KOCs', v: '3' },
    { l: 'Est GMV', v: '+18M' }
  ],
  fields: [
    { key: 'template_video', desc: 'Source', value: 'V001 Routine' },
    { key: 'target_K002', desc: 'KOC 1', value: '@beautybymai' },
    { key: 'target_K005', desc: 'KOC 2', value: '@skintips_daily' },
    { key: 'target_K004', desc: 'KOC 3', value: '@minibeauty' },
    { key: 'brief', desc: 'Brief sent', value: '3/3' },
    { key: 'optimizer', desc: 'Module', value: 'optimization' }
  ],
  actions: [btnPrimary('Content calendar', `navigate('content')`), ...defaultStepActions(step, flow)]
}));

reg('content-analytics:3', (step, flow) => ({
  layer: 'automation', api: TTS_API.videoOverview, apiName: 'Content calendar auto-fill',
  title: step.label, subtitle: 'FLOW_OPTIMIZE step 3',
  metrics: [
    { l: 'Slots filled', v: '3' },
    { l: 'Week', v: 'W23' },
    { l: 'Flow', v: 'FLOW_OPTIMIZE' }
  ],
  fields: [
    { key: 'calendar_week', desc: 'Week', value: '2026-W23' },
    { key: 'slots_added', desc: 'New slots', value: '3 VIDEO' },
    { key: 'koc_assigned', desc: 'KOCs', value: 'K002, K004, K005' },
    { key: 'product_tag', desc: 'Hero SKU', value: 'P001' },
    { key: 'flow', desc: 'Automation', value: 'FLOW_OPTIMIZE' },
    { key: 'notify', desc: 'KOC notify', value: 'Scheduled' }
  ],
  actions: [btnPrimary('Chạy FLOW_OPTIMIZE', `runAutomationFlow('FLOW_OPTIMIZE')`), ...defaultStepActions(step, flow)]
}));

// COSTS
reg('costs:0', (step, flow) => {
  const rev = ZZP_DATA.revenueBreakdown?.total || TTS_METRICS.shop.gmv;
  const pct = v => (v / rev * 100).toFixed(1);
  const c = ZZP_DATA.costs;
  return {
    layer: 'data', api: TTS_API.statements, apiName: 'Cost breakdown',
    title: step.label, subtitle: 'COGS · Ads · Voucher · Comm',
    metrics: [
      { l: 'Total cost', v: fmt(c.total) },
      { l: 'COGS', v: pct(c.cogs) + '%' },
      { l: 'Ads', v: pct(c.ads) + '%' }
    ],
    fields: [
      { key: 'cogs', desc: 'COGS', value: fmt(c.cogs) + ' (' + pct(c.cogs) + '%)' },
      { key: 'ads', desc: 'Ads spend', value: fmt(c.ads) + ' (' + pct(c.ads) + '%)' },
      { key: 'vouchers', desc: 'Voucher cost', value: fmt(c.voucher) + ' (' + pct(c.voucher) + '%)' },
      { key: 'affiliate_commission', desc: 'Affiliate comm', value: fmt(TTS_METRICS.finance.affiliateCommission) },
      { key: 'platform_commission', desc: 'Platform fee', value: fmt(TTS_METRICS.finance.platformCommission) },
      { key: 'shipping_cost', desc: 'Shipping', value: fmt(TTS_METRICS.finance.shippingCostAmount) }
    ],
    actions: defaultStepActions(step, flow)
  };
});

reg('costs:1', (step, flow) => ({
  layer: 'intelligence', api: TTS_API.adsReporting, apiName: 'Cost anomaly detection',
  title: step.label, subtitle: 'Ads ↑12% · investigate AD002',
  metrics: [
    { l: 'Ads delta', v: '+12%', color: 'text-red-600' },
    { l: 'AD002 ROAS', v: '1.2x', color: 'text-red-600' },
    { l: 'Blended', v: TTS_METRICS.ads.blendedRoas + 'x' }
  ],
  fields: [
    { key: 'ads_spend_delta', desc: 'WoW ads spend', value: '+12%' },
    { key: 'AD002_spend', desc: 'AD002 spend', value: fmt(getAdMetrics('AD002')?.spend) },
    { key: 'AD002_roas', desc: 'AD002 ROAS', value: '1.2x' },
    { key: 'cpc', desc: 'CPC', value: fmtCurrency(getAdMetrics('AD002')?.cpc) },
    { key: 'anomaly_score', desc: 'Anomaly', value: '0.87 high' },
    { key: 'linked_insight', desc: 'AI', value: 'AI002' }
  ],
  actions: defaultStepActions(step, flow)
}));

reg('costs:2', (step, flow) => ({
  layer: 'action', api: TTS_API.gmvMaxCampaign, apiName: 'Recommend cut/shift',
  title: step.label, subtitle: 'AI002 pause ads → affiliate',
  metrics: [
    { l: 'Cut', v: fmt(7900000) },
    { l: 'Shift to', v: 'Affiliate' },
    { l: 'Est save', v: '+12M profit' }
  ],
  fields: [
    { key: 'insight', desc: 'AI002', value: 'Pause AD002' },
    { key: 'budget_shift', desc: 'Amount', value: fmt(8000000) },
    { key: 'affiliate_target', desc: 'Target', value: 'K002 @beautybymai' },
    { key: 'expected_roi', desc: 'Aff ROI est.', value: '3.1x' },
    { key: 'action_id', desc: 'AQ', value: 'AQ001' },
    { key: 'approval', desc: 'Status', value: 'pending' }
  ],
  actions: [btnPrimary('Duyệt AQ001', `approveAction('AQ001')`), ...defaultStepActions(step, flow)]
}));

reg('costs:3', (step, flow) => ({
  layer: 'automation', api: 'FLOW_ADS', apiName: 'FLOW_ADS execute',
  title: step.label, subtitle: 'Auto pause + audit log',
  metrics: [
    { l: 'Paused', v: 'AD002' },
    { l: 'Saved/wk', v: fmt(7900000) },
    { l: 'Audit', v: 'OK' }
  ],
  fields: [
    { key: 'flow', desc: 'Automation', value: 'FLOW_ADS' },
    { key: 'campaign_paused', desc: 'Paused', value: 'AD002 Product Ads' },
    { key: 'spend_stopped', desc: 'Daily save', value: fmt(1128571) + '/day' },
    { key: 'audit_log', desc: 'Audit', value: 'Logged' },
    { key: 'margin_impact', desc: 'Margin', value: '+1.8%' },
    { key: 'notify', desc: 'Marketing', value: 'Lê Thị Hoa' }
  ],
  actions: [btnPrimary('Chạy FLOW_ADS', `runAutomationFlow('FLOW_ADS')`), ...defaultStepActions(step, flow)]
}));
