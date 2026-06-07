/* Custom module layouts — 1 UI pattern riêng theo PRD, tránh statCard + bảng generic */

const LAYOUT_PRD = {
  onboarding: 'Danh sách thiết lập shop · OAuth · Điểm sức khỏe',
  koc: 'CRM KOC · Luồng vòng đời',
  content: 'Lịch nội dung · Quản lý công việc',
  samples: 'Theo dõi gửi mẫu · ROI mẫu',
  orders: 'Trung tâm đơn · Bảng SLA',
  inventory: 'Giám sát tồn kho · Cảnh báo hết hàng',
  affiliate: 'Trung tâm Affiliate · Chiến lược SAM',
  agency: 'Quản lý agency · Thẻ ROI',
  products: 'Giám sát trạng thái sản phẩm · Vòng đời',
  returns: 'Trung tâm hoàn hàng · Dòng thời gian case',
  datahub: 'Trung tâm dữ liệu · Luồng đồng bộ',
  'creator-analytics': 'Bảng điểm KOC · Thẻ xếp hạng',
  actions: 'Trung tâm quyết định · Làn ưu tiên',
  notifications: 'Trung tâm thông báo · Hộp thư đến'
};

function layoutPrdBadge(pageId) {
  return '';
}

/* —— Onboarding: timeline dọc (khác dashboard lộ trình 3 bước) —— */
function renderOnboardingTimeline() {
  return dsTimelineChecklist(ZZP_DATA.checklist, renderChecklistRow);
}

/* —— KOC CRM: Kanban 4 cột lifecycle —— */
function renderKocCrmPipeline() {
  const stages = [
    { key: 'prospect', label: 'Tuyển chọn', tone: 'slate' },
    { key: 'sample', label: 'Gửi mẫu', tone: 'amber' },
    { key: 'content', label: 'Tạo nội dung', tone: 'blue' },
    { key: 'revenue', label: 'Tạo doanh thu', tone: 'green' }
  ];
  return `
    ${chartGrid([['Vòng đời KOC', 'chart-koc-lifecycle', 'sm'], ['GMV theo nhà sáng tạo', 'chart-koc-gmv', 'sm']])}
    ${dsKanbanBoard(stages.map(st => {
      const list = ZZP_DATA.kocs.filter(k => k.lifecycle === st.key);
      const cards = list.length ? list.map(k => `
        <button type="button" class="ds-kanban-card" onclick="openDetail('koc','${k.id}')">
          <p class="ds-kanban-card-name">${k.name}</p>
          <p class="ds-kanban-card-sub">${k.tier} · ${fmt(k.followers)} người theo dõi</p>
          <div class="ds-kanban-card-foot">
            <span class="ds-kanban-card-price">${k.gmv30d ? fmt(k.gmv30d) : '—'}</span>
            ${badge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info')}
          </div>
        </button>`).join('') : '<p class="ds-kanban-empty">Không có KOC</p>';
      return dsKanbanColumn(st.label, list.length, st.tone, cards);
    }).join(''))}`;
}

/* —— Content: lịch tuần + task cards —— */
function renderContentCalendar() {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const slots = ZZP_DATA.content.slice(0, 7);
  return `
    ${chartGrid([['GMV theo nội dung', 'chart-content-gmv', 'sm'], ['CTR theo video', 'chart-content-ctr', 'sm']])}
    <div class="rounded-xl border border-slate-200 overflow-hidden mb-6">
      <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        ${icon('calendar-days', 16, 'text-slate-600')}
        <span class="font-semibold text-sm text-slate-800">Lịch nội dung — Tuần này</span>
      </div>
      <div class="grid grid-cols-7 divide-x divide-slate-100 bg-white">
        ${days.map((d, i) => {
          const item = slots[i];
          return `
          <div class="min-h-[120px] p-2">
            <p class="text-[10px] font-bold text-slate-400 text-center mb-2">${d}</p>
            ${item ? `
              <button type="button" onclick="openDetail('content','${item.id}')" class="w-full p-2 rounded-lg text-left text-[10px] border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white">
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
        <button type="button" onclick="openDetail('content','${v.id}')" class="w-full flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left transition-all">
          <span class="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">${icon(v.type === 'livestream' ? 'radio' : 'video', 20)}</span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm">${v.title}</p>
            <p class="text-xs text-slate-500">${koc?.name} · ${v.published}</p>
          </div>
          <div class="flex gap-4 text-xs text-center">
            <div><p class="font-bold">${fmt(v.views)}</p><p class="text-slate-400">Lượt xem</p></div>
            <div><p class="font-bold">${fmt(v.gmv)}</p><p class="text-slate-400">GMV</p></div>
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
    { label: 'Gửi mẫu', count: stats.total, pct: 100 },
    { label: 'Chờ nội dung', count: stats.pending.length, pct: stats.total ? Math.round(stats.pending.length / stats.total * 100) : 0 },
    { label: 'Chuyển đổi', count: stats.converted.length, pct: stats.convPct },
    { label: 'ROI ≥ 2x', count: stats.roiOk.length, pct: stats.total ? Math.round(stats.roiOk.length / stats.total * 100) : 0 },
    { label: 'Mở rộng ≥10x', count: stats.roiScale.length, pct: stats.total ? Math.round(stats.roiScale.length / stats.total * 100) : 0 }
  ];
  return `
    <div class="mb-6 overflow-x-auto pb-2">
      <div class="flex items-stretch min-w-[640px] gap-0">
        ${nodes.map((n, i) => `
          ${i ? `
          <div class="flex flex-col items-center justify-center px-1 shrink-0 w-12">
            <div class="h-0.5 w-full bg-slate-200"></div>
            <span class="text-[9px] text-slate-400 mt-1 whitespace-nowrap">${i === 1 ? 'theo dõi' : i === 2 ? `${stats.convPct}%` : 'ROI'}</span>
          </div>` : ''}
          <div class="flex-1 min-w-[100px]">
            <div class="h-full rounded-xl border border-slate-200 bg-white p-3 text-center">
              <div class="w-8 h-8 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center mx-auto">${n.count}</div>
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
    pending: { border: 'border-slate-200', badge: ['Chờ nội dung', 'pending'], extra: deadlineLeft > 0 ? `Còn ${deadlineLeft} ngày trong cửa sổ 14 ngày` : 'Sắp hết hạn nội dung' },
    converted: { border: 'border-slate-200', badge: ['Chuyển đổi', 'ok'], extra: s.roi >= 10 ? 'Mở rộng · ROI xuất sắc' : s.roi >= 2 ? 'Duy trì hợp tác' : 'Xem lại ROI' },
    no_content: { border: 'border-slate-200', badge: ['Chưa có nội dung', 'critical'], extra: `Quá ${days} ngày · đề xuất cắt` }
  };
  const ui = statusUi[s.status] || statusUi.pending;
  return `
    <button type="button" onclick="openDetail('sample','${s.id}')" class="w-full text-left p-3 rounded-xl border ${ui.border} bg-white hover:border-slate-300 transition-all">
      <div class="flex justify-between items-start gap-2">
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-slate-400">${s.id}</p>
          <p class="font-medium text-sm truncate">${koc?.name}</p>
          <p class="text-xs text-slate-500 truncate">${prod?.name}</p>
        </div>
        ${badge(ui.badge[0], ui.badge[1])}
      </div>
      <p class="text-[10px] text-slate-500 mt-2">Gửi ${s.sentDate} · ${days} ngày trước</p>
      <p class="text-[10px] text-slate-600 mt-0.5">${ui.extra}</p>
      <div class="grid grid-cols-3 gap-1.5 mt-3 text-center text-[10px]">
        <div class="p-1.5 bg-slate-50 rounded-lg border border-slate-100"><p class="font-bold">${fmtCurrency(s.cost)}</p><p class="text-slate-400">Chi phí mẫu</p></div>
        <div class="p-1.5 bg-slate-50 rounded-lg border border-slate-100"><p class="font-bold">${s.revenue ? fmt(s.revenue) : '—'}</p><p class="text-slate-400">Doanh thu</p></div>
        <div class="p-1.5 bg-slate-50 rounded-lg border border-slate-100"><p class="font-bold">${s.roi ? s.roi + 'x' : '—'}</p><p class="text-slate-400">Sample ROI</p></div>
      </div>
    </button>`;
}

function renderSamplePipelineKanban() {
  const cols = [
    { key: 'pending', title: 'Chờ nội dung', tone: 'amber' },
    { key: 'converted', title: 'Chuyển đổi · đo ROI', tone: 'green' },
    { key: 'no_content', title: 'Chưa có nội dung', tone: 'red' }
  ];
  return dsKanbanBoard(cols.map(col => {
    const items = ZZP_DATA.samples.filter(s => s.status === col.key);
    const cards = items.length ? items.map(s => renderSampleCard(s)).join('') : '<p class="ds-kanban-empty">Không có mẫu ở giai đoạn này</p>';
    return dsKanbanColumn(col.title, items.length, col.tone, cards);
  }).join(''));
}

function renderSampleRoiPipeline() {
  const stats = calcSamplePipelineStats();
  return `
    ${chartGrid([
      ['Phễu chuyển đổi', 'chart-sample-funnel', 'sm'],
      ['ROI mẫu theo lần gửi', 'chart-sample-roi', 'sm'],
      ['Phân bổ trạng thái', 'chart-sample-status', 'sm']
    ], 3)}
    ${dsStatGrid([
      { label: 'Tổng gửi mẫu', value: stats.total, tone: 'info' },
      { label: 'Tỷ lệ convert', value: stats.convPct + '%', hint: `${stats.converted.length}/${stats.total} có doanh thu`, tone: 'success' },
      { label: 'ROI trung bình', value: stats.avgRoi + 'x', hint: `${fmt(stats.totalRev)} / ${fmt(stats.totalCost)}`, tone: 'brand' },
      { label: 'Cần cắt', value: stats.noContent.length, hint: 'Chưa tạo nội dung', tone: 'danger' }
    ])}
    <div class="mb-2 flex items-center justify-between gap-2">
      <p class="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">${icon('git-branch', 14)} Quy trình ROI mẫu thử</p>
      <button type="button" onclick="runAutomationFlow('FLOW_SAMPLE')" class="ds-btn ds-btn--primary ds-btn--sm">${icon('play', 12)} Chạy quy trình</button>
    </div>
    ${renderSamplePipelineFlow(stats)}
    <p class="text-[10px] text-slate-400 mb-3 uppercase tracking-wide">Kanban theo trạng thái · bấm thẻ để xem chi tiết mẫu</p>
    ${renderSamplePipelineKanban()}`;
}

/* —— Orders: SLA board theo cột trạng thái —— */
function renderOrderSlaBoard() {
  const cols = [
    { status: 'pending', label: 'Chờ xử lý', tone: 'amber', slaWarn: true },
    { status: 'processing', label: 'Đang xử lý', tone: 'blue', slaWarn: true },
    { status: 'shipped', label: 'Đang giao', tone: 'violet' },
    { status: 'delivered', label: 'Hoàn thành', tone: 'green' }
  ];
  return `
    ${chartGrid([['Trạng thái đơn hàng', 'chart-order-status', 'sm'], ['Nguồn đơn', 'chart-order-source', 'sm']])}
    ${dsKanbanBoard(cols.map(col => {
      const orders = ZZP_DATA.orders.filter(o => o.status === col.status);
      const cards = orders.length ? orders.map(o => `
        <button type="button" class="ds-kanban-card" onclick="openDetail('order','${o.id}')">
          <p class="ds-kanban-card-id">${o.id}</p>
          <p class="ds-kanban-card-name">${o.customer}</p>
          <p class="ds-kanban-card-sub">${o.productName}</p>
          <div class="ds-kanban-card-foot">
            <span class="ds-kanban-card-price">${fmtCurrency(o.total)}</span>
            ${col.slaWarn && o.sla !== 'ok' ? `<span style="color:var(--ds-danger);font-weight:700">SLA ${o.sla}</span>` : badge(o.source, o.source === 'affiliate' ? 'active' : 'info')}
          </div>
          ${o.status === 'pending' ? `<button type="button" onclick="event.stopPropagation();processOrder('${o.id}')" class="ds-btn ds-btn--primary ds-btn--sm" style="width:100%;margin-top:8px">Xử lý</button>` : ''}
        </button>`).join('') : '<p class="ds-kanban-empty">Không có đơn</p>';
      return dsKanbanColumn(col.label, orders.length, col.tone, cards);
    }).join(''))}`;
}

/* —— Inventory: gauge cards —— */
function renderInventoryGaugeCards() {
  return `
    ${chartGrid([['Ngày tồn còn theo SKU', 'chart-stock-days', 'sm'], ['Velocity bán hàng', 'chart-velocity', 'sm']])}
    <div class="ui-card-grid">
      ${ZZP_DATA.products.map(p => {
        const daily = Math.round(p.sold30d / 30) || 1;
        const days = Math.round(p.stock / daily);
        const pct = Math.min(100, (p.stock / (daily * 30)) * 100);
        const bg = days < 7 ? 'border-slate-300' : 'border-slate-200';
        return `
        <button type="button" onclick="openDetail('product','${p.id}')" class="ui-product-card text-left p-4 rounded-xl border ${bg} bg-white hover:border-slate-300 transition-colors">
          <div class="flex items-start gap-3">
            <div class="shrink-0">${productThumb(p, 16)}</div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm truncate-safe">${p.name}</p>
              <p class="text-xs text-slate-500 mt-0.5">${daily}/ngày · ${days} ngày còn</p>
            </div>
            ${days < 7 ? badge('Thiếu hàng', 'critical') : badge('OK', 'ok')}
          </div>
          <div class="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-slate-600" style="width:${pct}%;${days < 7 ? 'background:var(--ds-danger)' : days < 14 ? 'background:var(--ds-warning)' : ''}"></div>
          </div>
          <p class="mt-2 text-xs font-bold text-slate-700">${p.stock} sp tồn</p>
        </button>`;
      }).join('')}
    </div>`;
}

/* —— Affiliate SAM funnel —— */
function renderAffiliateSamFunnel() {
  const sam = [
    { step: 'S', label: 'Gửi mẫu', desc: 'Gửi mẫu KOC tiềm năng', count: ZZP_DATA.samples.length, pg: 'samples' },
    { step: 'A', label: 'Affiliate', desc: 'Kích hoạt chương trình hoa hồng', count: ZZP_DATA.kocs.filter(k => k.lifecycle !== 'prospect').length, pg: 'affiliate' },
    { step: 'M', label: 'Mở rộng vĩ mô', desc: 'Mở rộng KOC ROI > 3x', count: ZZP_DATA.kocs.filter(k => k.tier === 'Macro').length, pg: 'koc' }
  ];
  return `
    <div class="mb-6 p-4 rounded-xl border border-slate-200 bg-white">
      <p class="text-xs font-semibold text-slate-600 uppercase mb-4">${icon('target', 14)} Chiến lược SAM — Sample → Affiliate → Macro</p>
      <div class="flex flex-wrap items-center gap-2">
        ${sam.map((s, i) => `
          ${i ? `<span class="text-slate-300 hidden sm:inline">${icon('chevron-right', 20)}</span>` : ''}
          <button type="button" onclick="navigate('${s.pg}')" class="flex-1 min-w-[140px] p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 text-left">
            <span class="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-sm inline-flex items-center justify-center">${s.step}</span>
            <p class="font-semibold text-sm mt-2">${s.label}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${s.desc}</p>
            <p class="text-lg font-bold text-slate-800 mt-1">${s.count}</p>
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
  const statusUi = {
    active: { border: 'border-slate-200', badge: 'ok' },
    low_stock: { border: 'border-slate-300', badge: 'critical' },
    review: { border: 'border-slate-200', badge: 'purple' }
  };
  return `
    <div class="mb-4 flex flex-wrap gap-2">
      ${tabs.map(t => `<span class="ui-badge ${t.key === 'all' ? 'ui-badge--brand' : 'ui-badge--muted'}">${t.label} (${groups[t.key].length})</span>`).join('')}
    </div>
    <div class="ui-card-grid">
      ${ZZP_DATA.products.map(p => {
        const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
        const ui = statusUi[p.status] || { border: 'border-slate-200', badge: 'muted' };
        const marginTone = '';
        return `
        <button type="button" onclick="openDetail('product','${p.id}')" class="ui-product-card text-left p-4 rounded-xl border ${ui.border} bg-white hover:border-slate-300 transition-colors">
          <div class="flex items-start gap-3">
            <div class="shrink-0">${productThumb(p, 16)}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p class="font-semibold text-sm leading-snug line-clamp-2 flex-1 min-w-0">${p.name}</p>
                ${badge(p.status, p.status)}
              </div>
              <p class="text-[10px] text-slate-400 font-mono mt-1 truncate-safe">${p.sku}</p>
            </div>
          </div>
          <div class="ui-metric-grid mt-4">
            <div class="ui-metric-cell"><p class="val">${fmtCurrency(p.price).replace('₫', '').trim()}</p><p class="lbl">Giá</p></div>
            <div class="ui-metric-cell"><p class="val ${p.stock < 100 ? 'font-bold' : ''}">${p.stock}</p><p class="lbl">Tồn</p></div>
            <div class="ui-metric-cell"><p class="val">${p.sold30d}</p><p class="lbl">Bán 30d</p></div>
            <div class="ui-metric-cell"><p class="val ${marginTone}">${margin}%</p><p class="lbl">Margin</p></div>
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
        <div class="p-4 rounded-xl border border-slate-200 bg-white">
          <p class="text-2xl font-bold text-slate-800">${count}</p>
          <p class="text-xs text-slate-600 mt-1">${reason}</p>
        </div>`).join('')}
    </div>
    <div class="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      ${ZZP_DATA.returns.map(r => `
        <div class="flex gap-4 pl-10 relative">
          <span class="absolute left-2.5 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-white"></span>
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
    <div class="mb-6 p-4 rounded-xl border border-slate-200 bg-white overflow-x-auto">
      <p class="text-xs font-semibold text-slate-600 uppercase mb-4 flex items-center gap-1">${icon('refresh-cw', 14)} Trạng thái đồng bộ</p>
      <div class="flex items-center gap-2 min-w-max pb-2">
        ${ZZP_DATA.dataSync.map((d, i) => `
          ${i ? `<div class="flex flex-col items-center px-1"><div class="h-0.5 w-8 bg-slate-200"></div><span class="text-[9px] text-slate-500">${d.latency}</span></div>` : ''}
          <button type="button" onclick="showToast('Sync ${d.source}: ${d.status}')" class="p-3 rounded-xl border border-slate-200 bg-slate-50 min-w-[100px] text-center hover:border-slate-300">
            <p class="text-[10px] font-bold truncate">${d.source.split(' ')[0]}</p>
            ${badge(d.status, d.status)}
            <p class="text-xs font-semibold mt-1">${(d.records / 1000).toFixed(1)}k</p>
          </button>`).join('')}
        <div class="flex flex-col items-center px-1"><div class="h-0.5 w-8 bg-slate-200"></div></div>
        <div class="p-4 rounded-xl border border-slate-300 bg-slate-50 text-center min-w-[90px]">
          <p class="text-[10px] font-bold">ZZP</p>
          <p class="text-xs text-slate-600">Data Warehouse</p>
        </div>
      </div>
    </div>
    ${card('Chi tiết đồng bộ', tableWrap(['Nguồn','Trạng thái','Bản ghi','Độ trễ','Đồng bộ cuối'],
      ZZP_DATA.dataSync.map(d => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${d.source}</td><td class="px-3">${badge(d.status,d.status)}</td><td class="px-3">${d.records.toLocaleString()}</td><td class="px-3">${d.latency}</td><td class="px-3 text-xs">${d.lastSync}</td></tr>`).join('')))}`;
}

/* —— Creator scorecards (khác KOC pipeline) —— */
function renderCreatorScorecardGrid() {
  const sorted = [...ZZP_DATA.kocs].sort((a, b) => b.score - a.score);
  return `
    ${chartGrid([['KOC Score ranking', 'chart-creator-score', 'sm'], ['ROI creator', 'chart-creator-roi', 'sm']])}
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${sorted.map((k, i) => `
        <button type="button" onclick="openDetail('koc','${k.id}')" class="text-left p-5 rounded-xl border ${i === 0 ? 'border-slate-300' : 'border-slate-200'} bg-white hover:border-slate-300 transition-colors">
          <div class="flex justify-between items-start">
            <div>
              ${i === 0 ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-white font-medium">#1 Nhà sáng tạo hàng đầu</span>` : `<span class="text-xs text-slate-400">#${i + 1}</span>`}
              <p class="font-bold text-lg mt-1">${k.name}</p>
              <p class="text-xs text-slate-500">${k.tier} · ${k.videos} videos</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-black text-slate-800">${k.score}</p>
              <p class="text-[10px] text-slate-400">Score</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-100"><p class="font-bold">${fmt(k.gmv30d)}</p><p class="text-slate-400">GMV</p></div>
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-100"><p class="font-bold">${k.roi ? k.roi + 'x' : '—'}</p><p class="text-slate-400">ROI</p></div>
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-100"><p class="font-bold">${k.cvr ? k.cvr + '%' : '—'}</p><p class="text-slate-400">CVR</p></div>
          </div>
          <p class="text-xs text-slate-600 mt-3 font-medium">${k.score >= 90 ? '→ Nâng tier Macro+' : k.score >= 70 ? '→ Duy trì hợp tác' : '→ Review hoặc cắt'}</p>
        </button>`).join('')}
    </div>`;
}

/* —— Action queue: priority lanes —— */
function renderActionPriorityBoard() {
  const lanes = [
    { key: 'critical', label: 'Khẩn cấp', tone: 'red' },
    { key: 'high', label: 'Cao', tone: 'amber' },
    { key: 'medium', label: 'Trung bình', tone: 'blue' }
  ];
  return dsKanbanBoard(lanes.map(lane => {
    const items = ZZP_DATA.actionQueue.filter(a => a.priority === lane.key);
    const cards = items.length ? items.map(a => `
      <div class="ds-kanban-card" style="cursor:default">
        <p class="ds-kanban-card-name">${a.title}</p>
        <p class="ds-kanban-card-sub">${a.source} · ${a.assignee}</p>
        <div class="ds-kanban-card-foot">
          ${badge(a.status, a.status)}
          ${a.status === 'pending' ? `<button type="button" onclick="approveAction('${a.id}')" class="ds-text-link" style="font-size:11px;margin-left:auto">Approve</button>` : `<button type="button" onclick="runAutomationFlow('FLOW_AI_ACTION')" class="ds-text-link" style="font-size:11px;margin-left:auto">Thực thi</button>`}
        </div>
      </div>`).join('') : '<p class="ds-kanban-empty">Không có action</p>';
    return dsKanbanColumn(lane.label, items.length, lane.tone, cards);
  }).join(''));
}

/* —— Notifications: inbox (khác Smart Alerts) —— */
function renderNotificationInbox() {
  const channels = ['In-App', 'Email', 'Zalo', 'Webhook'];
  return `
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-2">
        <p class="text-xs font-semibold text-slate-500 uppercase mb-3">Hộp thư thông báo</p>
        ${ZZP_DATA.alerts.map((a, i) => `
          <button type="button" onclick="openDetail('alert','${a.id}')" class="w-full flex gap-3 p-3 rounded-xl border ${a.read ? 'border-slate-100 bg-slate-50/50 opacity-70' : 'border-slate-200 bg-white'} text-left hover:border-slate-300">
            <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">${icon(a.severity === 'critical' ? 'alert-octagon' : 'bell', 16)}</div>
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
          <div class="space-y-3">${['Cảnh báo trong app','Cảnh báo email','Cảnh báo Zalo','Webhook'].map(ch => `
            <label class="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 border border-slate-100">
              <span class="text-sm flex items-center gap-2">${icon(ch.includes('Zalo') ? 'message-circle' : ch.includes('Email') ? 'mail' : ch.includes('Webhook') ? 'webhook' : 'bell', 14)} ${viLabel(ch)}</span>
              <input type="checkbox" checked class="rounded text-zzp-600">
            </label>`).join('')}
          <button onclick="showToast('Đã lưu cấu hình thông báo')" class="w-full mt-2 py-2 bg-zzp-600 text-white rounded-lg text-sm">Lưu cấu hình</button>
        `)}
      </div>
    </div>`;
}
