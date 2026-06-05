/* Custom module layouts — 1 UI pattern riêng theo PRD, tránh statCard + bảng generic */

const LAYOUT_PRD = {
  onboarding: 'Shop Setup Checklist · OAuth · Health Score',
  koc: 'KOC CRM · Lifecycle Pipeline',
  content: 'Content Calendar · Task Manager',
  samples: 'Sample Tracking · Sample ROI',
  orders: 'Order Center · SLA Board',
  inventory: 'Inventory Monitor · Stock Gauge',
  affiliate: 'Affiliate Center · SAM Strategy',
  agency: 'Agency Management · ROI Cards',
  products: 'Product Status Monitor · Lifecycle',
  returns: 'Return Center · Case Timeline',
  datahub: 'Data Hub · Sync Pipeline',
  'creator-analytics': 'KOC Scorecard · Ranking Cards',
  actions: 'Decision Center · Priority Lanes',
  notifications: 'Notification Center · Inbox'
};

function layoutPrdBadge(pageId) {
  return '';
}

/* —— Onboarding: timeline dọc (khác dashboard lộ trình 3 bước) —— */
function renderOnboardingTimeline() {
  const items = ZZP_DATA.checklist;
  const done = items.filter(c => c.done).length;
  return `
    <div class="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-white overflow-hidden">
      <div class="px-5 py-4 border-b border-blue-100 flex flex-wrap justify-between gap-3">
        <div>
          <p class="text-xs font-semibold text-blue-700 uppercase tracking-wide flex items-center gap-1">${icon('list-checks', 14)} Shop Setup Checklist</p>
          <h3 class="font-bold text-slate-800 mt-0.5">Lộ trình thiết lập gian hàng</h3>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-blue-700">${done}/${items.length}</p>
          <p class="text-xs text-slate-500">Health ${calcHealthScore()}%</p>
        </div>
      </div>
      <div class="p-5 space-y-0">
        ${items.map((c, i) => {
          const isLast = i === items.length - 1;
          return `
          <div class="flex gap-4 ${!isLast ? 'pb-5' : ''}">
            <div class="flex flex-col items-center">
              <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${c.done ? 'bg-green-500 text-white' : 'bg-white border-2 border-blue-300 text-blue-600'}">${c.done ? icon('check', 16) : `<span class="text-xs font-bold">${i + 1}</span>`}</div>
              ${!isLast ? `<div class="w-0.5 flex-1 mt-1 ${c.done ? 'bg-green-300' : 'bg-blue-100'} min-h-[24px]"></div>` : ''}
            </div>
            <div class="flex-1 min-w-0 pt-1">
              ${renderChecklistRow(c)}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* —— KOC CRM: Kanban 4 cột lifecycle —— */
function renderKocCrmPipeline() {
  const stages = [
    { key: 'prospect', label: 'Tuyển chọn', color: 'border-slate-200 bg-slate-50' },
    { key: 'sample', label: 'Gửi mẫu', color: 'border-amber-200 bg-amber-50/50' },
    { key: 'content', label: 'Tạo nội dung', color: 'border-blue-200 bg-blue-50/50' },
    { key: 'revenue', label: 'Tạo doanh thu', color: 'border-green-200 bg-green-50/50' }
  ];
  return `
    ${chartGrid([['Lifecycle KOC', 'chart-koc-lifecycle', 'sm'], ['GMV theo creator', 'chart-koc-gmv', 'sm']])}
    <div class="grid lg:grid-cols-4 gap-4">
      ${stages.map(st => {
        const list = ZZP_DATA.kocs.filter(k => k.lifecycle === st.key);
        return `
        <div class="rounded-xl border-2 ${st.color} min-h-[280px]">
          <div class="px-3 py-2.5 border-b border-inherit flex justify-between items-center">
            <span class="text-xs font-bold uppercase tracking-wide">${st.label}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-white/80">${list.length}</span>
          </div>
          <div class="p-2 space-y-2">
            ${list.length ? list.map(k => `
              <button type="button" onclick="openDetail('koc','${k.id}')" class="w-full text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-zzp-300 hover:shadow-sm transition-all">
                <p class="font-medium text-sm text-zzp-700">${k.name}</p>
                <p class="text-[10px] text-slate-500 mt-0.5">${k.tier} · ${fmt(k.followers)} followers</p>
                <div class="flex justify-between mt-2 text-xs">
                  <span class="${k.score >= 80 ? 'text-green-600' : 'text-amber-600'} font-bold">Score ${k.score}</span>
                  <span>${k.gmv30d ? fmt(k.gmv30d) : '—'}</span>
                </div>
              </button>`).join('') : `<p class="text-xs text-slate-400 text-center py-6">Trống</p>`}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* —— Content: lịch tuần + task cards —— */
function renderContentCalendar() {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const slots = ZZP_DATA.content.slice(0, 7);
  return `
    ${chartGrid([['GMV theo nội dung', 'chart-content-gmv', 'sm'], ['CTR theo video', 'chart-content-ctr', 'sm']])}
    <div class="rounded-xl border border-violet-200 overflow-hidden mb-6">
      <div class="px-4 py-3 bg-violet-50 border-b border-violet-100 flex items-center gap-2">
        ${icon('calendar-days', 18, 'text-violet-600')}
        <span class="font-semibold text-sm text-violet-900">Content Calendar — Tuần này</span>
      </div>
      <div class="grid grid-cols-7 divide-x divide-slate-100 bg-white">
        ${days.map((d, i) => {
          const item = slots[i];
          return `
          <div class="min-h-[120px] p-2">
            <p class="text-[10px] font-bold text-slate-400 text-center mb-2">${d}</p>
            ${item ? `
              <button type="button" onclick="openDetail('content','${item.id}')" class="w-full p-2 rounded-lg text-left text-[10px] border ${item.type === 'livestream' ? 'border-pink-200 bg-pink-50' : 'border-violet-100 bg-violet-50/50'} hover:shadow-sm">
                <span class="font-semibold block truncate">${item.type === 'livestream' ? 'Live' : 'Video'}</span>
                <span class="text-slate-600 line-clamp-2 leading-tight mt-0.5">${item.title.slice(0, 28)}…</span>
              </button>` : `<div class="h-16 border border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-300 text-lg">+</div>`}
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="space-y-3">
      ${ZZP_DATA.content.map(v => {
        const koc = ZZP_DATA.kocs.find(k => k.id === v.koc);
        return `
        <button type="button" onclick="openDetail('content','${v.id}')" class="w-full flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-violet-300 text-left transition-all">
          <span class="w-12 h-12 rounded-xl ${v.type === 'livestream' ? 'bg-pink-100 text-pink-600' : 'bg-violet-100 text-violet-600'} flex items-center justify-center shrink-0">${icon(v.type === 'livestream' ? 'radio' : 'video', 20)}</span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm">${v.title}</p>
            <p class="text-xs text-slate-500">${koc?.name} · ${v.published}</p>
          </div>
          <div class="flex gap-4 text-xs text-center">
            <div><p class="font-bold">${fmt(v.views)}</p><p class="text-slate-400">Views</p></div>
            <div><p class="font-bold text-green-600">${fmt(v.gmv)}</p><p class="text-slate-400">GMV</p></div>
            <div><p class="font-bold">${v.ctr}%</p><p class="text-slate-400">CTR</p></div>
          </div>
          ${badge(v.status, v.status)}
        </button>`;
      }).join('')}
    </div>`;
}

/* —— Sample: pipeline ngang + kanban theo trạng thái thực —— */
function daysSinceSample(sentDate) {
  const sent = new Date(sentDate);
  const now = new Date('2026-06-05');
  return Math.max(0, Math.round((now - sent) / 86400000));
}

function calcSamplePipelineStats() {
  const list = ZZP_DATA.samples;
  const total = list.length;
  const pending = list.filter(s => s.status === 'pending');
  const converted = list.filter(s => s.status === 'converted');
  const noContent = list.filter(s => s.status === 'no_content');
  const roiOk = list.filter(s => s.roi >= 2);
  const roiScale = list.filter(s => s.roi >= 10);
  const totalCost = list.reduce((sum, s) => sum + s.cost, 0);
  const totalRev = list.reduce((sum, s) => sum + s.revenue, 0);
  const avgRoi = totalCost ? (totalRev / totalCost).toFixed(1) : 0;
  return { total, pending, converted, noContent, roiOk, roiScale, totalCost, totalRev, avgRoi, convPct: total ? Math.round(converted.length / total * 100) : 0 };
}

function renderSamplePipelineFlow(stats) {
  const nodes = [
    { label: 'Gửi mẫu', count: stats.total, pct: 100, color: 'bg-teal-600' },
    { label: 'Chờ content', count: stats.pending.length, pct: stats.total ? Math.round(stats.pending.length / stats.total * 100) : 0, color: 'bg-amber-500' },
    { label: 'Convert', count: stats.converted.length, pct: stats.convPct, color: 'bg-green-600' },
    { label: 'ROI ≥ 2x', count: stats.roiOk.length, pct: stats.total ? Math.round(stats.roiOk.length / stats.total * 100) : 0, color: 'bg-emerald-600' },
    { label: 'Scale ≥10x', count: stats.roiScale.length, pct: stats.total ? Math.round(stats.roiScale.length / stats.total * 100) : 0, color: 'bg-zzp-600' }
  ];
  return `
    <div class="mb-6 overflow-x-auto pb-2">
      <div class="flex items-stretch min-w-[640px] gap-0">
        ${nodes.map((n, i) => `
          ${i ? `
          <div class="flex flex-col items-center justify-center px-1 shrink-0 w-12">
            <div class="h-0.5 w-full bg-teal-200"></div>
            <span class="text-[9px] text-slate-400 mt-1 whitespace-nowrap">${i === 1 ? 'theo dõi' : i === 2 ? `${stats.convPct}%` : 'ROI'}</span>
          </div>` : ''}
          <div class="flex-1 min-w-[100px]">
            <div class="h-full rounded-xl border-2 border-teal-100 bg-white p-3 text-center shadow-sm">
              <div class="w-8 h-8 rounded-full ${n.color} text-white text-sm font-bold flex items-center justify-center mx-auto">${n.count}</div>
              <p class="text-xs font-semibold text-slate-800 mt-2 leading-tight">${n.label}</p>
              <p class="text-[10px] text-slate-400">${n.pct}% tổng gửi</p>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderSampleCard(s) {
  const koc = ZZP_DATA.kocs.find(k => k.id === s.koc);
  const prod = getProduct(s.product);
  const days = daysSinceSample(s.sentDate);
  const deadlineLeft = Math.max(0, 14 - days);
  const statusUi = {
    pending: { border: 'border-amber-200 bg-amber-50/40', badge: ['Chờ content', 'pending'], extra: deadlineLeft > 0 ? `Còn ${deadlineLeft} ngày trong cửa sổ 14 ngày` : 'Sắp hết hạn content' },
    converted: { border: 'border-green-200 bg-green-50/40', badge: ['Convert', 'ok'], extra: s.roi >= 10 ? 'Scale · ROI xuất sắc' : s.roi >= 2 ? 'Duy trì hợp tác' : 'Review ROI' },
    no_content: { border: 'border-red-200 bg-red-50/40', badge: ['Chưa có content', 'critical'], extra: `Quá ${days} ngày · đề xuất cắt` }
  };
  const ui = statusUi[s.status] || statusUi.pending;
  return `
    <button type="button" onclick="openDetail('sample','${s.id}')" class="w-full text-left p-3 rounded-xl border-2 ${ui.border} hover:shadow-md transition-all">
      <div class="flex justify-between items-start gap-2">
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-slate-400">${s.id}</p>
          <p class="font-medium text-sm truncate">${koc?.name}</p>
          <p class="text-xs text-slate-500 truncate">${prod?.name}</p>
        </div>
        ${badge(ui.badge[0], ui.badge[1])}
      </div>
      <p class="text-[10px] text-slate-500 mt-2">Gửi ${s.sentDate} · ${days} ngày trước</p>
      <p class="text-[10px] ${s.status === 'no_content' ? 'text-red-600' : 'text-slate-600'} mt-0.5">${ui.extra}</p>
      <div class="grid grid-cols-3 gap-1.5 mt-3 text-center text-[10px]">
        <div class="p-1.5 bg-white/80 rounded-lg"><p class="font-bold">${fmtCurrency(s.cost)}</p><p class="text-slate-400">Chi phí mẫu</p></div>
        <div class="p-1.5 bg-white/80 rounded-lg"><p class="font-bold ${s.revenue ? 'text-green-600' : 'text-slate-400'}">${s.revenue ? fmt(s.revenue) : '—'}</p><p class="text-slate-400">Doanh thu</p></div>
        <div class="p-1.5 bg-white/80 rounded-lg"><p class="font-bold ${s.roi >= 10 ? 'text-green-600' : s.roi >= 2 ? 'text-teal-600' : s.roi > 0 ? 'text-amber-600' : 'text-red-600'}">${s.roi ? s.roi + 'x' : '—'}</p><p class="text-slate-400">Sample ROI</p></div>
      </div>
    </button>`;
}

function renderSamplePipelineKanban() {
  const cols = [
    { key: 'pending', title: 'Chờ content', sub: 'Theo dõi conversion mẫu → video', border: 'border-amber-200 bg-amber-50/30' },
    { key: 'converted', title: 'Convert · đo ROI', sub: 'Revenue / chi phí mẫu ≥ 2x', border: 'border-green-200 bg-green-50/30' },
    { key: 'no_content', title: 'Chưa có content', sub: 'Cut nếu ROI < 2x sau 30 ngày', border: 'border-red-200 bg-red-50/30' }
  ];
  return `
    <div class="grid lg:grid-cols-3 gap-4">
      ${cols.map(col => {
        const items = ZZP_DATA.samples.filter(s => s.status === col.key);
        return `
        <div class="rounded-xl border-2 ${col.border} min-h-[240px] flex flex-col">
          <div class="px-3 py-2.5 border-b border-inherit">
            <div class="flex items-center justify-between">
              <p class="text-xs font-bold text-slate-800">${col.title}</p>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/90 font-medium">${items.length}</span>
            </div>
            <p class="text-[10px] text-slate-500 mt-0.5">${col.sub}</p>
          </div>
          <div class="p-2 space-y-2 flex-1">
            ${items.length ? items.map(s => renderSampleCard(s)).join('') : `<p class="text-xs text-slate-400 text-center py-8">Không có mẫu ở giai đoạn này</p>`}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderSampleRoiPipeline() {
  const stats = calcSamplePipelineStats();
  return `
    ${chartGrid([
      ['Conversion funnel', 'chart-sample-funnel', 'sm'],
      ['Sample ROI theo mẫu', 'chart-sample-roi', 'sm'],
      ['Phân bổ trạng thái', 'chart-sample-status', 'sm']
    ], 3)}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div class="p-3 rounded-xl bg-teal-50 border border-teal-100"><p class="text-[10px] text-teal-700 uppercase font-semibold">Tổng gửi mẫu</p><p class="text-xl font-bold text-teal-900">${stats.total}</p></div>
      <div class="p-3 rounded-xl bg-green-50 border border-green-100"><p class="text-[10px] text-green-700 uppercase font-semibold">Tỷ lệ convert</p><p class="text-xl font-bold text-green-900">${stats.convPct}%</p><p class="text-[10px] text-slate-500">${stats.converted.length}/${stats.total} có doanh thu</p></div>
      <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-[10px] text-slate-500 uppercase font-semibold">ROI trung bình</p><p class="text-xl font-bold text-zzp-700">${stats.avgRoi}x</p><p class="text-[10px] text-slate-500">${fmt(stats.totalRev)} / ${fmt(stats.totalCost)}</p></div>
      <div class="p-3 rounded-xl bg-red-50 border border-red-100"><p class="text-[10px] text-red-700 uppercase font-semibold">Cần cắt</p><p class="text-xl font-bold text-red-900">${stats.noContent.length}</p><p class="text-[10px] text-slate-500">Chưa tạo content</p></div>
    </div>
    <div class="mb-2 flex items-center justify-between gap-2">
      <p class="text-xs font-semibold text-teal-800 uppercase flex items-center gap-1">${icon('git-branch', 14)} Quy trình ROI mẫu thử</p>
      <button type="button" onclick="runAutomationFlow('FLOW_SAMPLE')" class="text-xs px-3 py-1.5 bg-teal-600 text-white rounded-lg inline-flex items-center gap-1 hover:bg-teal-700">${icon('play', 12)} Chạy quy trình mẫu → doanh thu</button>
    </div>
    ${renderSamplePipelineFlow(stats)}
    <p class="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">Kanban theo trạng thái · bấm thẻ để xem chi tiết mẫu</p>
    ${renderSamplePipelineKanban()}`;
}

/* —— Orders: SLA board theo cột trạng thái —— */
function renderOrderSlaBoard() {
  const cols = [
    { status: 'pending', label: 'Chờ xử lý', color: 'border-amber-300 bg-amber-50', slaWarn: true },
    { status: 'processing', label: 'Đang xử lý', color: 'border-blue-300 bg-blue-50', slaWarn: true },
    { status: 'shipped', label: 'Đang giao', color: 'border-violet-300 bg-violet-50' },
    { status: 'delivered', label: 'Hoàn thành', color: 'border-green-300 bg-green-50' }
  ];
  return `
    ${chartGrid([['Trạng thái đơn hàng', 'chart-order-status', 'sm'], ['Nguồn đơn', 'chart-order-source', 'sm']])}
    <div class="grid lg:grid-cols-4 gap-4 overflow-x-auto">
      ${cols.map(col => {
        const orders = ZZP_DATA.orders.filter(o => o.status === col.status);
        return `
        <div class="rounded-xl border-2 ${col.color} min-w-[220px]">
          <div class="px-3 py-2 border-b border-inherit flex justify-between">
            <span class="text-xs font-bold">${col.label}</span>
            <span class="text-xs">${orders.length}</span>
          </div>
          <div class="p-2 space-y-2 max-h-[420px] overflow-y-auto">
            ${orders.map(o => `
              <button type="button" onclick="openDetail('order','${o.id}')" class="w-full text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-zzp-300 shadow-sm">
                <p class="font-mono text-xs text-zzp-600">${o.id}</p>
                <p class="text-sm font-medium mt-1">${o.customer}</p>
                <p class="text-xs text-slate-500 truncate">${o.productName}</p>
                <div class="flex justify-between mt-2 text-xs">
                  <span class="font-semibold">${fmtCurrency(o.total)}</span>
                  ${col.slaWarn && o.sla !== 'ok' ? `<span class="text-red-600 font-bold">SLA ${o.sla}</span>` : badge(o.source, o.source === 'affiliate' ? 'active' : 'info')}
                </div>
                ${o.status === 'pending' ? `<button type="button" onclick="event.stopPropagation();processOrder('${o.id}')" class="mt-2 w-full py-1 text-xs bg-zzp-600 text-white rounded-lg">Xử lý</button>` : ''}
              </button>`).join('')}
            ${!orders.length ? '<p class="text-xs text-slate-400 text-center py-4">Không có đơn</p>' : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* —— Inventory: gauge cards —— */
function renderInventoryGaugeCards() {
  return `
    ${chartGrid([['Ngày tồn còn theo SKU', 'chart-stock-days', 'sm'], ['Velocity bán hàng', 'chart-velocity', 'sm']])}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${ZZP_DATA.products.map(p => {
        const daily = Math.round(p.sold30d / 30) || 1;
        const days = Math.round(p.stock / daily);
        const pct = Math.min(100, (p.stock / (daily * 30)) * 100);
        const ringColor = days < 7 ? 'text-red-500' : days < 14 ? 'text-amber-500' : 'text-green-500';
        const bg = days < 7 ? 'border-red-200 bg-red-50/40' : days < 14 ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-white';
        return `
        <button type="button" onclick="openDetail('product','${p.id}')" class="text-left p-4 rounded-xl border-2 ${bg} hover:shadow-md transition-all">
          <div class="flex items-start gap-3">
            ${productThumb(p, 18)}
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm truncate">${p.name}</p>
              <p class="text-xs text-slate-500">${daily}/ngày · ${days} ngày còn</p>
            </div>
          </div>
          <div class="mt-4 relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <div class="absolute inset-y-0 left-0 rounded-full ${days < 7 ? 'bg-red-500' : days < 14 ? 'bg-amber-500' : 'bg-green-500'}" style="width:${pct}%"></div>
          </div>
          <div class="flex justify-between mt-2 text-xs">
            <span class="font-bold ${ringColor.replace('text-', 'text-')}">${p.stock} sp</span>
            ${days < 7 ? badge('Thiếu hàng', 'critical') : badge('OK', 'ok')}
          </div>
        </button>`;
      }).join('')}
    </div>`;
}

/* —— Affiliate SAM funnel —— */
function renderAffiliateSamFunnel() {
  const sam = [
    { step: 'S', label: 'Sample', desc: 'Gửi mẫu KOC tiềm năng', count: ZZP_DATA.samples.length, pg: 'samples' },
    { step: 'A', label: 'Affiliate', desc: 'Kích hoạt chương trình hoa hồng', count: ZZP_DATA.kocs.filter(k => k.lifecycle !== 'prospect').length, pg: 'affiliate' },
    { step: 'M', label: 'Macro Scale', desc: 'Scale KOC ROI > 3x', count: ZZP_DATA.kocs.filter(k => k.tier === 'Macro').length, pg: 'koc' }
  ];
  return `
    <div class="mb-6 p-5 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/80 to-white">
      <p class="text-xs font-semibold text-rose-700 uppercase mb-4">${icon('target', 14)} Chiến lược SAM — Sample → Affiliate → Macro</p>
      <div class="flex flex-wrap items-center gap-2">
        ${sam.map((s, i) => `
          ${i ? `<span class="text-rose-300 hidden sm:inline">${icon('chevron-right', 20)}</span>` : ''}
          <button type="button" onclick="navigate('${s.pg}')" class="flex-1 min-w-[140px] p-4 rounded-xl border-2 border-rose-200 bg-white hover:border-rose-400 text-left">
            <span class="w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-sm inline-flex items-center justify-center">${s.step}</span>
            <p class="font-semibold text-sm mt-2">${s.label}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${s.desc}</p>
            <p class="text-lg font-bold text-rose-700 mt-1">${s.count}</p>
          </button>`).join('')}
      </div>
    </div>`;
}

/* —— Agency: card portfolio —— */
function renderAgencyPortfolioCards() {
  return `
    <div class="grid lg:grid-cols-3 gap-5">
      ${ZZP_DATA.agencies.map(a => {
        const roiPct = Math.min(100, a.roi * 20);
        return `
        <div class="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-bold text-lg">${a.name}</p>
              <p class="text-xs text-slate-500 mt-1">${a.kocs} KOC · Phí ${fmt(a.fee)}/tháng</p>
            </div>
            ${badge(a.status, a.status)}
          </div>
          <div class="mt-6 flex items-center gap-4">
            <div class="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" stroke-width="3"/>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="${a.roi >= 3 ? '#22c55e' : '#f59e0b'}" stroke-width="3" stroke-dasharray="${roiPct} 100" stroke-linecap="round"/>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-sm font-bold">${a.roi}x</span>
            </div>
            <div>
              <p class="text-2xl font-bold text-zzp-700">${fmt(a.gmv30d)}</p>
              <p class="text-xs text-slate-500">GMV 30 ngày</p>
              <button type="button" onclick="navigate('koc')" class="text-xs text-zzp-600 mt-2 hover:underline">Xem KOC của agency →</button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* —— Products: lifecycle tabs —— */
function renderProductLifecycleMonitor() {
  const tabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'active', label: 'Đang bán' },
    { key: 'low_stock', label: 'Sắp hết' },
    { key: 'review', label: 'Chờ duyệt' }
  ];
  const groups = {
    all: ZZP_DATA.products,
    active: ZZP_DATA.products.filter(p => p.status === 'active'),
    low_stock: ZZP_DATA.products.filter(p => p.status === 'low_stock' || p.stock < 100),
    review: ZZP_DATA.products.filter(p => p.status === 'review')
  };
  return `
    <div class="mb-4 flex flex-wrap gap-2">
      ${tabs.map(t => `<span class="px-3 py-1.5 rounded-full text-xs font-medium ${t.key === 'all' ? 'bg-zzp-600 text-white' : 'bg-slate-100 text-slate-600'}">${t.label} (${groups[t.key].length})</span>`).join('')}
    </div>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${ZZP_DATA.products.map(p => {
        const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
        const statusColors = { active: 'border-green-200', low_stock: 'border-red-300', review: 'border-purple-300' };
        return `
        <button type="button" onclick="openDetail('product','${p.id}')" class="text-left p-4 rounded-xl border-2 ${statusColors[p.status] || 'border-slate-200'} bg-white hover:shadow-md">
          <div class="flex gap-3">
            ${productThumb(p, 20)}
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">${p.name}</p>
              <p class="text-[10px] text-slate-400 font-mono">${p.sku}</p>
            </div>
            ${badge(p.status, p.status)}
          </div>
          <div class="grid grid-cols-4 gap-1 mt-4 text-center text-[10px]">
            <div class="p-1.5 bg-slate-50 rounded"><p class="font-bold">${fmtCurrency(p.price)}</p><p class="text-slate-400">Giá</p></div>
            <div class="p-1.5 bg-slate-50 rounded"><p class="font-bold ${p.stock < 100 ? 'text-red-600' : ''}">${p.stock}</p><p class="text-slate-400">Tồn</p></div>
            <div class="p-1.5 bg-slate-50 rounded"><p class="font-bold">${p.sold30d}</p><p class="text-slate-400">Bán 30d</p></div>
            <div class="p-1.5 bg-slate-50 rounded"><p class="font-bold text-green-600">${margin}%</p><p class="text-slate-400">Margin</p></div>
          </div>
        </button>`;
      }).join('')}
    </div>`;
}

/* —— Returns: timeline cases —— */
function renderReturnsCaseTimeline() {
  const reasons = {};
  ZZP_DATA.returns.forEach(r => { reasons[r.reason] = (reasons[r.reason] || 0) + 1; });
  return `
    ${chartGrid([['Nguyên nhân hoàn/hủy', 'chart-return-reason', 'sm']], 1)}
    <div class="grid lg:grid-cols-3 gap-4 mb-6">
      ${Object.entries(reasons).map(([reason, count]) => `
        <div class="p-4 rounded-xl border border-orange-200 bg-orange-50/50">
          <p class="text-2xl font-bold text-orange-800">${count}</p>
          <p class="text-xs text-slate-600 mt-1">${reason}</p>
        </div>`).join('')}
    </div>
    <div class="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-100">
      ${ZZP_DATA.returns.map(r => `
        <div class="flex gap-4 pl-10 relative">
          <span class="absolute left-2.5 w-3 h-3 rounded-full ${r.status === 'refunded' ? 'bg-green-500' : r.status === 'pending_review' ? 'bg-amber-500' : 'bg-blue-500'} ring-4 ring-white"></span>
          <div class="flex-1 p-4 rounded-xl border border-slate-200 bg-white">
            <div class="flex flex-wrap justify-between gap-2">
              <div>
                <p class="font-mono text-xs text-zzp-600">${r.id}</p>
                <button type="button" onclick="openDetail('order','${r.orderId}')" class="text-sm font-medium hover:text-zzp-600">${r.orderId}</button>
              </div>
              ${badge(r.status, r.status === 'refunded' ? 'ok' : 'pending')}
            </div>
            <p class="text-sm text-slate-600 mt-2">${r.reason}</p>
            <p class="text-sm font-semibold mt-2">${fmtCurrency(r.amount)} · ${r.type === 'return' ? 'Hoàn hàng' : 'Hủy đơn'}</p>
          </div>
        </div>`).join('')}
    </div>`;
}

/* —— Data Hub: sync pipeline —— */
function renderDataHubPipeline() {
  return `
    ${chartGrid([['Độ trễ đồng bộ', 'chart-sync-latency', 'sm'], ['Dữ liệu theo nguồn', 'chart-sync-records', 'sm']])}
    <div class="mb-6 p-5 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-white overflow-x-auto">
      <p class="text-xs font-semibold text-cyan-800 uppercase mb-4 flex items-center gap-1">${icon('refresh-cw', 14)} Trạng thái đồng bộ</p>
      <div class="flex items-center gap-2 min-w-max pb-2">
        ${ZZP_DATA.dataSync.map((d, i) => `
          ${i ? `<div class="flex flex-col items-center px-1"><div class="h-0.5 w-8 bg-cyan-300"></div><span class="text-[9px] text-cyan-600">${d.latency}</span></div>` : ''}
          <button type="button" onclick="showToast('Sync ${d.source}: ${d.status}')" class="p-3 rounded-xl border-2 ${d.status === 'live' ? 'border-green-300 bg-green-50' : 'border-cyan-200 bg-white'} min-w-[100px] text-center hover:shadow-md">
            <p class="text-[10px] font-bold truncate">${d.source.split(' ')[0]}</p>
            ${badge(d.status, d.status)}
            <p class="text-xs font-semibold mt-1">${(d.records / 1000).toFixed(1)}k</p>
          </button>`).join('')}
        <div class="flex flex-col items-center px-1"><div class="h-0.5 w-8 bg-cyan-300"></div></div>
        <div class="p-4 rounded-xl border-2 border-zzp-400 bg-zzp-50 text-center min-w-[90px]">
          <p class="text-[10px] font-bold">ZZP</p>
          <p class="text-xs text-zzp-700">Data Warehouse</p>
        </div>
      </div>
    </div>
    ${card('Chi tiết đồng bộ', tableWrap(['Nguồn','Trạng thái','Records','Latency','Sync cuối'],
      ZZP_DATA.dataSync.map(d => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${d.source}</td><td class="px-3">${badge(d.status,d.status)}</td><td class="px-3">${d.records.toLocaleString()}</td><td class="px-3">${d.latency}</td><td class="px-3 text-xs">${d.lastSync}</td></tr>`).join('')))}`;
}

/* —— Creator scorecards (khác KOC pipeline) —— */
function renderCreatorScorecardGrid() {
  const sorted = [...ZZP_DATA.kocs].sort((a, b) => b.score - a.score);
  return `
    ${chartGrid([['KOC Score ranking', 'chart-creator-score', 'sm'], ['ROI creator', 'chart-creator-roi', 'sm']])}
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${sorted.map((k, i) => `
        <button type="button" onclick="openDetail('koc','${k.id}')" class="text-left p-5 rounded-2xl border-2 ${i === 0 ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200 bg-white'} hover:shadow-lg transition-all">
          <div class="flex justify-between items-start">
            <div>
              ${i === 0 ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-medium">#1 Top Creator</span>` : `<span class="text-xs text-slate-400">#${i + 1}</span>`}
              <p class="font-bold text-lg mt-1">${k.name}</p>
              <p class="text-xs text-slate-500">${k.tier} · ${k.videos} videos</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-black ${k.score >= 80 ? 'text-green-600' : 'text-amber-600'}">${k.score}</p>
              <p class="text-[10px] text-slate-400">Score</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
            <div class="p-2 rounded-lg bg-slate-50"><p class="font-bold">${fmt(k.gmv30d)}</p><p class="text-slate-400">GMV</p></div>
            <div class="p-2 rounded-lg bg-slate-50"><p class="font-bold">${k.roi ? k.roi + 'x' : '—'}</p><p class="text-slate-400">ROI</p></div>
            <div class="p-2 rounded-lg bg-slate-50"><p class="font-bold">${k.cvr ? k.cvr + '%' : '—'}</p><p class="text-slate-400">CVR</p></div>
          </div>
          <p class="text-xs text-zzp-600 mt-3 font-medium">${k.score >= 90 ? '→ Nâng tier Macro+' : k.score >= 70 ? '→ Duy trì hợp tác' : '→ Review hoặc cắt'}</p>
        </button>`).join('')}
    </div>`;
}

/* —— Action queue: priority lanes —— */
function renderActionPriorityBoard() {
  const lanes = [
    { key: 'critical', label: 'Khẩn cấp', color: 'border-red-300 bg-red-50' },
    { key: 'high', label: 'Cao', color: 'border-amber-300 bg-amber-50' },
    { key: 'medium', label: 'Trung bình', color: 'border-blue-300 bg-blue-50' }
  ];
  return `
    <div class="grid lg:grid-cols-3 gap-4">
      ${lanes.map(lane => {
        const items = ZZP_DATA.actionQueue.filter(a => a.priority === lane.key);
        return `
        <div class="rounded-xl border-2 ${lane.color} min-h-[200px]">
          <div class="px-3 py-2 border-b font-bold text-xs uppercase">${lane.label} (${items.length})</div>
          <div class="p-2 space-y-2">
            ${items.map(a => `
              <div class="p-3 bg-white rounded-lg border border-slate-200">
                <p class="text-sm font-medium">${a.title}</p>
                <p class="text-[10px] text-slate-500 mt-1">${a.source} · ${a.assignee}</p>
                <div class="flex gap-2 mt-2">
                  ${badge(a.status, a.status)}
                  ${a.status === 'pending' ? `<button onclick="approveAction('${a.id}')" class="text-xs text-zzp-600 hover:underline ml-auto">Approve</button>` : `<button onclick="runAutomationFlow('FLOW_AI_ACTION')" class="text-xs text-zzp-600 hover:underline ml-auto">Thực thi</button>`}
                </div>
              </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* —— Notifications: inbox (khác Smart Alerts) —— */
function renderNotificationInbox() {
  const channels = ['In-App', 'Email', 'Zalo', 'Webhook'];
  return `
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-2">
        <p class="text-xs font-semibold text-slate-500 uppercase mb-3">Hộp thư thông báo</p>
        ${ZZP_DATA.alerts.map((a, i) => `
          <button type="button" onclick="openDetail('alert','${a.id}')" class="w-full flex gap-3 p-4 rounded-xl border ${a.read ? 'border-slate-100 bg-slate-50/50 opacity-70' : 'border-slate-200 bg-white shadow-sm'} text-left hover:border-zzp-200">
            <div class="w-10 h-10 rounded-full ${a.severity === 'critical' ? 'bg-red-100 text-red-600' : a.severity === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center shrink-0">${icon(a.severity === 'critical' ? 'alert-octagon' : 'bell', 18)}</div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between gap-2">
                <p class="font-medium text-sm truncate">${a.title}</p>
                ${!a.read ? '<span class="w-2 h-2 rounded-full bg-tiktok shrink-0 mt-1.5"></span>' : ''}
              </div>
              <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${a.desc}</p>
              <p class="text-[10px] text-slate-400 mt-1">${channels[i % 4]} · ${a.type}</p>
            </div>
          </button>`).join('')}
      </div>
      <div>
        ${card('Kênh thông báo', `
          <div class="space-y-3">${['In-App Alert','Email Alert','Zalo Alert','Webhook'].map(ch => `
            <label class="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-zzp-50">
              <span class="text-sm flex items-center gap-2">${icon(ch.includes('Zalo') ? 'message-circle' : ch.includes('Email') ? 'mail' : ch.includes('Webhook') ? 'webhook' : 'bell', 14)} ${viLabel(ch)}</span>
              <input type="checkbox" checked class="rounded text-zzp-600">
            </label>`).join('')}
          <button onclick="showToast('Đã lưu cấu hình thông báo')" class="w-full mt-2 py-2 bg-zzp-600 text-white rounded-lg text-sm">Lưu cấu hình</button>
        `)}
      </div>
    </div>`;
}
