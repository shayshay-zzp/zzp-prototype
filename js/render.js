/* ZZP Page Renderers */
const PAGES = {};

/* card, statCard, pageHeader, tableWrap → js/design-system.js */

function badge(text, type = 'default') {
  const display = typeof viBadge === 'function' ? viBadge(text, type) : text;
  const toneMap = {
    active: 'ok', ok: 'ok', connected: 'ok', synced: 'ok', live: 'ok', converted: 'ok',
    compliant: 'ok', delivered: 'ok', shipped: 'ok', published: 'ok', approved: 'ok',
    pending: 'warn', warning: 'warn', medium: 'warn', partial: 'warn', scheduled: 'warn',
    critical: 'critical', low_stock: 'critical', high: 'critical', no_content: 'critical',
    review: 'purple', paused: 'muted', default: 'muted', draft: 'muted',
    info: 'info', new: 'info', in_progress: 'brand', processing: 'brand',
    affiliate: 'brand', ads: 'ads', organic: 'muted', revenue: 'ok', spark: 'ads'
  };
  const tone = toneMap[type] || toneMap.default;
  return `<span class="ui-badge ui-badge--${tone}">${display}</span>`;
}

/* ===== DASHBOARD ===== */
PAGES.dashboard = () => isNewSeller() ? renderNewSellerDashboard() : renderActiveSellerDashboard();

/* ===== PHASE 1 — Khởi tạo → js/init-phase.js (Design System) ===== */

/* ===== PHASE 2 ===== */
PAGES.datahub = () => {
  return modulePage('Vận hành', 'Đồng bộ dữ liệu shop', 'Theo dõi trạng thái đồng bộ sản phẩm, đơn hàng, tiếp thị liên kết và nội dung', `
    ${dsStatGrid([
      { label: 'Nguồn dữ liệu', value: ZZP_DATA.dataSync.length, hint: 'Đang kết nối', tone: 'brand' },
      { label: 'Bản ghi', value: fmt(ZZP_DATA.dataSync.reduce((s, d) => s + d.records, 0)), hint: 'Tổng hợp', tone: 'info' },
      { label: 'Độ trễ TB', value: '~6 giây', hint: 'TikTok Shop: 2 giây', tone: 'success' }
    ])}
    ${renderDataHubPipeline()}
    ${dsBtnIcon('Đồng bộ ngay', "showToast('Đang đồng bộ toàn bộ dữ liệu...')", 'refresh-cw', 'primary', 'md')}`);
};

PAGES.products = () => {
  return modulePage('Vận hành', 'Product Operations', 'Quản lý vòng đời sản phẩm và hiệu suất bán hàng', `
    ${renderTtsMetricsStrip('products')}
    ${renderModuleDataTabs('products')}`);
};

PAGES.orders = () => {
  return modulePage('Vận hành', 'Order Center & SLA Monitoring', 'Theo dõi vòng đời đơn hàng và chất lượng vận hành', `
    ${renderTtsMetricsStrip('orders')}
    ${renderModuleDataTabs('orders')}`);
};

PAGES.inventory = () => {
  return modulePage('Vận hành', 'Inventory Monitor & Stock Alert', 'Quản lý tồn kho, tốc độ bán và cảnh báo thiếu hàng', `
    ${renderTtsMetricsStrip('inventory')}
    ${renderModuleDataTabs('inventory')}`);
};

PAGES.returns = () => {
  return modulePage('Vận hành', 'Return & Cancellation Center', 'Theo dõi hoàn hàng, hủy đơn và nguyên nhân thất thoát doanh thu', `
    ${renderTtsMetricsStrip('returns')}
    ${renderModuleDataTabs('returns')}`);
};

PAGES.affiliate = () => {
  return modulePage('Vận hành', 'Affiliate Center & SAM Strategy', 'Quản lý chiến dịch Affiliate và hiệu suất từng nguồn doanh thu', `
    ${renderTtsMetricsStrip('affiliate')}
    ${renderModuleDataTabs('affiliate')}`);
};

PAGES.koc = () => {
  return modulePage('Vận hành', 'KOC CRM & Lifecycle Tracking', 'Quản lý vòng đời KOC từ tuyển chọn, gửi mẫu đến tạo doanh thu', `
    ${renderTtsMetricsStrip('koc')}
    ${renderModuleDataTabs('koc')}
    <p class="ds-footer-link">Phân tích sâu → <button type="button" class="ds-text-link" onclick="navigate('creator-analytics')">KOC Scorecard</button></p>`);
};

PAGES.agency = () => {
  return modulePage('Vận hành', 'Agency Management & ROI', 'Theo dõi hiệu quả Agency và chi phí hợp tác', `
    ${layoutPrdBadge('agency')}
    ${renderAgencyPortfolioCards()}`);
};

PAGES.samples = () => {
  return modulePage('Vận hành', 'Sample Tracking & Sample ROI', 'Quản lý gửi mẫu và đánh giá hiệu quả đầu tư mẫu', `
    ${renderTtsMetricsStrip('samples')}
    ${renderModuleDataTabs('samples')}`);
};

PAGES.content = () => {
  return modulePage('Vận hành', 'Content Calendar & Task Manager', 'Quản lý kế hoạch nội dung và vòng đời video Affiliate', `
    ${renderTtsMetricsStrip('content')}
    ${renderModuleDataTabs('content')}`);
};

PAGES.livestream = () => {
  return modulePage('Vận hành', 'Livestream Operations', 'Theo dõi hoạt động livestream và doanh thu phát sinh', `
    ${renderTtsMetricsStrip('livestream')}
    ${renderModuleDataTabs('livestream')}`);
};

PAGES.campaigns = () => {
  return modulePage('Vận hành', 'Campaign & Promotion Center', 'Quản lý chương trình khuyến mãi và chiến dịch tăng trưởng', `
    ${card('Active Campaigns', tableWrap(['Chiến dịch','Loại','Giảm giá','Thời gian','Budget','Spent','GMV',''],
      ZZP_DATA.campaigns.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium"><button onclick="openDetail('campaign','${c.id}')" class="hover:text-zzp-600 hover:underline">${c.name}</button></td><td class="px-3">${c.type}</td><td class="px-3">${c.discount?c.discount+'%':'-'}</td><td class="px-3 text-xs">${c.start} → ${c.end}</td><td class="px-3">${fmt(c.budget)}</td><td class="px-3">${fmt(c.spent)}</td><td class="px-3 font-semibold">${fmt(c.gmv)}</td><td class="px-3">${badge(c.status,'active')}</td></tr>`).join('')))}`);
};

PAGES.vouchers = () => {
  return modulePage('Vận hành', 'Voucher Guardrail & Performance', 'Kiểm soát chi phí voucher và hiệu quả sử dụng', `
    ${chartGrid([['% sử dụng voucher', 'chart-voucher-usage', 'sm'], ['Chi phí voucher', 'chart-voucher-cost', 'sm']])}
    ${card('Voucher Management', tableWrap(['Mã','Giảm giá','Đã dùng','Giới hạn','Chi phí','GMV','Guardrail',''],
      ZZP_DATA.vouchers.map(v => `<tr ${rowClick('voucher', v.id)}><td class="py-3 px-3 font-mono font-medium text-zzp-700">${v.code}</td><td class="px-3">${v.discount?(v.discount+'%'):fmtCurrency(v.maxDiscount)}</td><td class="px-3">${v.used}/${v.limit}</td><td class="px-3"><div class="w-16 h-2 bg-slate-100 rounded-full"><div class="h-2 rounded-full ${v.guardrail==='warning'?'bg-amber-500':'bg-green-500'}" style="width:${v.used/v.limit*100}%"></div></div></td><td class="px-3">${fmt(v.cost)}</td><td class="px-3">${fmt(v.gmv)}</td><td class="px-3">${badge(v.guardrail==='warning'?'Cảnh báo':'OK',v.guardrail==='warning'?'warning':'ok')}</td><td class="px-3" onclick="event.stopPropagation()">${v.guardrail==='warning'?`<button onclick="runAutomationFlow('FLOW_ADS')" class="text-xs text-amber-600 hover:underline">Giải quyết</button>`:''}</td></tr>`).join('')))}`);
};

PAGES.ads = () => {
  return modulePage('Vận hành', 'Spark Ads & Campaign Setup', 'Kết nối dữ liệu quảng cáo với doanh thu và Affiliate', `
    ${renderTtsMetricsStrip('ads')}
    ${renderModuleDataTabs('ads')}`);
};

/* ===== PHASE 3 ===== */
PAGES.executive = () => {
  return modulePage('Phân tích', 'Executive Dashboard', 'Tổng hợp toàn bộ tình hình kinh doanh trên một màn hình', `
    ${renderTtsMetricsStrip('executive')}
    ${renderModuleDataTabs('executive')}`);
};

PAGES.revenue = () => {
  return modulePage('Phân tích', 'Revenue Intelligence & Attribution', 'Phân tích doanh thu theo nguồn và xác định yếu tố tạo doanh thu', `
    ${renderTtsMetricsStrip('revenue')}
    ${renderModuleDataTabs('revenue')}`);
};

PAGES.profit = () => {
  return modulePage('Phân tích', 'P&L Dashboard & Margin Analytics', 'Tính toán lợi nhuận thực sau khi trừ toàn bộ chi phí vận hành', `
    ${renderTtsMetricsStrip('profit')}
    ${renderModuleDataTabs('profit')}`);
};

PAGES.costs = () => {
  return modulePage('Phân tích', 'Cost Intelligence', 'Theo dõi và phân tích toàn bộ cấu trúc chi phí', `
    ${renderTtsMetricsStrip('costs')}
    ${renderModuleDataTabs('costs')}`);
};

PAGES['product-analytics'] = () => {
  return modulePage('Phân tích', 'Product Intelligence & SKU Ranking', 'Đánh giá hiệu suất và khả năng tăng trưởng từng sản phẩm', `
    ${renderTtsMetricsStrip('product-analytics')}
    ${renderModuleDataTabs('product-analytics')}`);
};

PAGES['affiliate-analytics'] = () => {
  return modulePage('Phân tích', 'Affiliate Analytics & Contribution', 'Đánh giá mức độ đóng góp Affiliate vào doanh thu', `
    ${renderTtsMetricsStrip('affiliate-analytics')}
    ${renderModuleDataTabs('affiliate-analytics')}`);
};

PAGES['creator-analytics'] = () => {
  return modulePage('Phân tích', 'KOC Scorecard & Creator Ranking', 'Xếp hạng KOC dựa trên GMV, ROI và CVR', `
    ${renderTtsMetricsStrip('creator-analytics')}
    ${renderModuleDataTabs('creator-analytics')}
    <p class="text-xs text-slate-500 mt-4 text-center">Quản lý pipeline → <button type="button" onclick="navigate('koc')" class="text-zzp-600 hover:underline">KOC CRM</button></p>`);
};

PAGES['content-analytics'] = () => {
  return modulePage('Phân tích', 'Content Intelligence & Pattern Analysis', 'Xác định nội dung bán hàng hiệu quả và mô hình thành công', `
    ${renderTtsMetricsStrip('content-analytics')}
    ${renderModuleDataTabs('content-analytics')}`);
};

PAGES['live-analytics'] = () => {
  return modulePage('Phân tích', 'Livestream Analytics & Session Performance', 'Phân tích hiệu quả từng phiên livestream', `
    ${renderTtsMetricsStrip('live-analytics')}
    ${renderModuleDataTabs('live-analytics')}`);
};

PAGES['customer-analytics'] = () => {
  return modulePage('Phân tích', 'Customer Intelligence', 'Phân tích hành vi khách hàng, phân khúc và LTV', `
    ${card('Customer Segments', tableWrap(['Phân khúc','Số KH','LTV TB','Repeat Rate','Chiến lược'],
      ZZP_DATA.customers.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${c.segment}</td><td class="px-3">${c.count}</td><td class="px-3">${fmtCurrency(c.ltv)}</td><td class="px-3">${c.repeatRate}%</td><td class="px-3">${c.segment.includes('VIP')?'Retention + upsell':c.segment.includes('At Risk')?'Win-back campaign':'Nurture to repeat'}</td></tr>`).join('')))}
    <div class="mt-6">${card('Cohort Analysis', '<div class="chart-box"><canvas id="chart-cohort"></canvas></div>')}</div>`);
};

PAGES.team = () => {
  return modulePage('Phân tích', 'Team Management & RBAC', 'Quản lý nhân sự, phân quyền và quy trình làm việc', `
    ${card('Team Members', tableWrap(['Thành viên','Vai trò','Phòng ban','Trạng thái','Quyền'],
      ZZP_DATA.team.map(u => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${u.name}</td><td class="px-3">${u.role}</td><td class="px-3">${u.dept}</td><td class="px-3">${badge(u.status,'active')}</td><td class="px-3 text-xs">${u.role==='Chủ shop'?'Toàn quyền':u.role.includes('Quản lý')?'Quản trị phòng ban':'Xem + Sửa'}</td></tr>`).join('')))}
    ${card('Trung tâm quy trình', `
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm">1</span><div><p class="text-sm font-medium">Đơn hàng > 500K → quản lý duyệt</p><p class="text-xs text-slate-500">Tự giao Trần Văn Hùng</p></div></div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">2</span><div><p class="text-sm font-medium">Yêu cầu gửi mẫu → quản lý tiếp thị liên kết duyệt</p><p class="text-xs text-slate-500">Tự động nếu điểm KOC > 80</p></div></div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm">3</span><div><p class="text-sm font-medium">Tạm dừng quảng cáo → chủ shop duyệt nếu ngân sách > 10M</p><p class="text-xs text-slate-500">Chờ duyệt: AQ001</p></div></div>
      </div>`)}`);
};

/* ===== PHASE 4 ===== */
PAGES['growth-assistant'] = () => {
  return modulePage('Tối ưu', 'Trợ lý AI tăng trưởng', 'Phân tích dữ liệu và đề xuất hành động ưu tiên cho shop', `
    ${chartGrid([['Độ tin cậy AI', 'chart-insight-confidence', 'sm'], ['Mức ưu tiên insight', 'chart-insight-priority', 'sm']])}
    ${ZZP_DATA.aiInsights.map(i => card(`<button type="button" onclick="openDetail('insight','${i.id}')" class="hover:text-zzp-600 text-left">#${i.priority} · ${i.title}</button> <span class="text-xs font-normal text-slate-400">Độ tin cậy ${i.confidence}% · bấm để xem chi tiết</span>`, `
      <p class="text-sm text-slate-600 mb-4">${i.desc}</p>
      <p class="text-sm font-semibold text-green-600 mb-3">Tác động dự kiến: ${i.impact}</p>
      <p class="text-xs font-semibold text-slate-500 mb-2">Hành động đề xuất:</p>
      <div class="space-y-2">${i.actions.map(a => `<button onclick="createAction('${a.replace(/'/g,"\\'")}')" class="block w-full text-left px-3 py-2 bg-zzp-50 hover:bg-zzp-100 rounded-lg text-sm text-zzp-800 transition-colors">→ ${a}</button>`).join('')}</div>
      <div class="mt-4 flex gap-2">
        <button type="button" onclick="openDetail('insight','${i.id}')" class="flex-1 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Chi tiết</button>
        <button onclick="runAutomationFlow('${i.priority===3?'FLOW_STOCK':i.priority===2?'FLOW_ADS':i.priority===1?'FLOW_AI_ACTION':'FLOW_OPTIMIZE'}')" class="flex-1 py-2 bg-zzp-600 text-white rounded-lg text-sm hover:bg-zzp-700 inline-flex items-center justify-center gap-2">${icon('play',14)} Giải quyết ngay</button>
      </div>
    `)).join('')}`);
};

PAGES.alerts = () => {
  return modulePage('Tối ưu', 'Smart Alerts', 'Chủ động phát hiện rủi ro và gửi cảnh báo theo thời gian thực', `
    ${chartGrid([['Phân bổ severity', 'chart-alert-severity', 'sm'], ['Loại cảnh báo', 'chart-alert-type', 'sm']])}
    ${dsStatGrid([
      { label: 'Critical', value: ZZP_DATA.alerts.filter(a => a.severity === 'critical' && !a.read).length, tone: 'danger' },
      { label: 'Warning', value: ZZP_DATA.alerts.filter(a => a.severity === 'warning' && !a.read).length, tone: 'warning' },
      { label: 'Info', value: ZZP_DATA.alerts.filter(a => a.severity === 'info' && !a.read).length, tone: 'info' },
      { label: 'Đã đọc', value: ZZP_DATA.alerts.filter(a => a.read).length, tone: 'brand' }
    ])}
    ${dsCard('Active Alerts', `<div class="ds-stack-sm">${ZZP_DATA.alerts.map(a => `
      <div class="ds-list-card"${a.read ? ' style="opacity:.65"' : ''} onclick="openDetail('alert','${a.id}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div>${badge(a.type, a.severity)} ${!a.read ? badge('Mới', 'new') : ''}
            <p class="ds-list-card-title">${a.title}</p>
            <p class="ds-list-card-desc">${a.desc}</p>
          </div>
          ${icon('chevron-right', 18)}
        </div>
        <div class="ds-issue-actions" onclick="event.stopPropagation()">
          ${dsBtn('Chi tiết', `openDetail('alert','${a.id}')`, 'secondary', 'sm')}
          ${dsBtnIcon('Giải quyết', `runAutomationFlow('${alertToFlow(a.id) || 'FLOW_OPTIMIZE'}')`, 'play', 'primary', 'sm')}
        </div>
      </div>`).join('')}</div>`)}`);
};

PAGES.opportunities = () => {
  return modulePage('Tối ưu', 'Cơ hội tăng trưởng', 'Phát hiện cơ hội từ sản phẩm, KOC, nội dung và chiến dịch', `
    <div class="ds-grid ds-grid--2">${ZZP_DATA.opportunities.map(o => `
      <div class="ds-list-card" onclick="navigate('growth-assistant')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">${badge(o.type, 'brand')} ${badge(o.status, o.status)}</div>
        <p class="ds-list-card-title">${o.title}</p>
        <p class="ds-list-card-desc">${o.desc}</p>
        <p style="margin:12px 0 0;font-size:13px;font-weight:700;color:var(--ds-success)">Tiềm năng: ${o.potential}</p>
        <div class="ds-issue-actions" onclick="event.stopPropagation()">
          <button type="button" class="ds-text-link" onclick="navigate('growth-assistant')">Xem AI recommendation →</button>
          ${dsBtnIcon('Giải quyết', "runAutomationFlow('FLOW_AI_ACTION')", 'play', 'primary', 'sm')}
        </div>
      </div>`).join('')}</div>`);
};

PAGES.forecast = () => {
  return modulePage('Tối ưu', 'Sales & Inventory Forecasting', 'Dự báo doanh thu và nhu cầu tồn kho', `
    ${card('GMV Forecast — 7 ngày tới', '<div class="chart-box"><canvas id="chart-forecast"></canvas></div>')}
    <div class="mt-6">${card('Inventory Forecast', tableWrap(['Sản phẩm','Tồn kho','Ngày còn','Dự báo','Khuyến nghị'],
      ZZP_DATA.forecasts.inventory.map(f => { const p = getProduct(f.product);
        return `<tr ${rowClick('product', f.product)}><td class="py-3 px-3 font-medium">${p?.name}</td><td class="px-3">${p?.stock}</td><td class="px-3 ${f.daysLeft<7?'text-red-600 font-bold':''}">${f.daysLeft} ngày</td><td class="px-3">${f.daysLeft<7?'Stockout risk':'Stable'}</td><td class="px-3">${f.recommendation}</td></tr>`; }).join('')))}</div>`);
};

PAGES.benchmark = () => {
  const b = ZZP_DATA.benchmarks;
  return modulePage('Tối ưu', 'Market Intelligence & Benchmark', 'So sánh hiệu suất với thị trường và đối thủ', `
    ${chartGrid([['Shop vs thị trường', 'chart-benchmark-market', 'md']], 1)}
    ${card('Industry Benchmark Comparison', tableWrap(['Chỉ số','Shop của bạn','Thị trường','Đánh giá'],
      [['GMV Growth', b.gmvGrowth.shop+'%', b.gmvGrowth.market+'%'],['Profit Margin', b.profitMargin.shop+'%', b.profitMargin.market+'%'],['Return Rate', b.returnRate.shop+'%', b.returnRate.market+'%'],['Affiliate Share', b.affiliateShare.shop+'%', b.affiliateShare.market+'%'],['Live Conversion', b.liveConversion.shop+'%', b.liveConversion.market+'%']].map(([k,s,m]) => {
        const better = parseFloat(s) <= parseFloat(m) && k.includes('Return') || parseFloat(s) >= parseFloat(m);
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${k}</td><td class="px-3 font-semibold">${s}</td><td class="px-3">${m}</td><td class="px-3">${better?badge('Trên TB','ok'):badge('Dưới TB','warning')}</td></tr>`; }).join('')))}`);
};

PAGES.actions = () => {
  return modulePage('Tối ưu', 'Trung tâm quyết định', 'Chuyển gợi ý thành kế hoạch hành động cụ thể', `
    ${layoutPrdBadge('actions')}
    ${card('Priority Action Board', renderActionPriorityBoard())}`);
};

PAGES.automation = () => {
  return modulePage('Tối ưu', 'Quy tắc tích hợp TikTok', 'Quy tắc nhận sự kiện từ TikTok Shop / Ads / Affiliate và kích hoạt quy trình trên ZZP', `
    ${renderFlowSyncStrip()}
    ${chartGrid([['Lần chạy quy tắc', 'chart-rule-runs', 'sm'], ['Quy tắc bật/tắt', 'chart-rule-active', 'sm']])}
    ${card('Quy tắc gắn quy trình', ZZP_DATA.automationRules.map(r => `
      <div class="flex items-center justify-between py-4 border-b border-slate-50 gap-4">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">${renderPlatformBadge(r.platform || 'cross')}${r.flowId ? badge('Có quy trình', 'info') : ''}</div>
          <p class="font-medium">${r.name}</p>
          <p class="text-xs text-slate-500 mt-1">${humanTrigger(r.trigger, r.flowId ? 'rule' : 'scheduled')} → ${r.action}</p>
          <p class="text-xs text-slate-400">Đã chạy ${r.runs} lần${r.flowId ? ` · <button type="button" onclick="runAutomationFlow('${r.flowId}')" class="text-zzp-600 hover:underline">Chạy quy trình</button>` : ''}</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer shrink-0"><input type="checkbox" ${r.active?'checked':''} onchange="toggleRule('${r.id}')" class="sr-only peer"><div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zzp-600"></div></label>
      </div>`).join(''))}`);
};

PAGES.optimization = () => {
  return modulePage('Tối ưu', 'Growth Optimizers', 'Tối ưu danh mục, ngân sách, KOC, nội dung và khuyến mãi', `
    <div class="grid lg:grid-cols-2 gap-6">
      ${card('Product Portfolio Optimizer', `
        <div class="space-y-3">
          <div class="p-3 bg-green-50 rounded-lg"><p class="font-medium text-sm flex items-center gap-2">${icon('arrow-up-circle',14,'text-green-600')} Scale: Serum VC, Kem chống nắng</p><p class="text-xs text-slate-600">Tăng inventory +30%, tăng ads budget</p></div>
          <div class="p-3 bg-amber-50 rounded-lg"><p class="font-medium text-sm flex items-center gap-2">${icon('sliders-horizontal',14,'text-amber-600')} Optimize: Mặt nạ Collagen</p><p class="text-xs text-slate-600">Nhập kho khẩn + chuyển Ads sang Affiliate</p></div>
          <div class="p-3 bg-red-50 rounded-lg"><p class="font-medium text-sm flex items-center gap-2">${icon('wrench',14,'text-red-600')} Fix: Son dưỡng môi P006</p><p class="text-xs text-slate-600">Cập nhật listing + compliance</p></div>
        </div>`)}
      ${card('KOC Discovery & Recommendation', `
        <div class="space-y-3">
          <div class="p-3 border rounded-lg"><p class="font-medium text-sm">@skintips_daily — Match 87%</p><p class="text-xs text-slate-600">ROI 3.5x · Recommend: Tăng tier Mid→Macro</p></div>
          <div class="p-3 border rounded-lg"><p class="font-medium text-sm">@newcreator_test — Match 32%</p><p class="text-xs text-slate-600">Chưa tạo content · Recommend: Wait or cut</p></div>
        </div>`)}
      ${card('Nhân rộng nội dung thành công', `
        <p class="text-sm text-slate-600 mb-3">Phân tích video thành công và đề xuất nhân rộng:</p>
        <div class="p-3 bg-zzp-50 rounded-lg"><p class="font-medium">Pattern: "Routine 3 bước" (V001)</p><p class="text-xs mt-1">→ Tạo 3 video tương tự với K002, K005, K001</p><p class="text-xs text-green-600 mt-1">Dự kiến +18M GMV</p></div>`)}
      ${card('Campaign & Budget Optimizer', `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between p-2 bg-slate-50 rounded"><span>Spark Ads Serum VC</span><span class="text-green-600">+30% budget</span></div>
          <div class="flex justify-between p-2 bg-slate-50 rounded"><span>Product Ads Mặt nạ</span><span class="text-red-600">Pause · chuyển 8M sang Affiliate</span></div>
          <div class="flex justify-between p-2 bg-slate-50 rounded"><span>Flash Sale 6/6 Bundle</span><span class="text-blue-600">Tạo bundle P001+P005</span></div>
        </div>`)}
      ${card('Discount Strategy Automation', `
        <p class="text-sm text-slate-600">AI đề xuất chiến lược giá tối ưu:</p>
        <div class="mt-3 space-y-2 text-sm">
          <p>• BEAUTY20: Giữ nguyên (ROAS tốt)</p>
          <p>• NEW50K: Giảm xuống 30K (CVR thấp)</p>
          <p>• Live-only voucher 15% cho Mega Live 6/6</p>
        </div>`)}
      ${card('Giữ chân khách hàng', `
        <p class="text-sm text-slate-600">Win-back campaign cho 456 KH At Risk:</p>
        <div class="mt-3 p-3 bg-blue-50 rounded-lg text-sm"><p class="font-medium">Gửi voucher FREESHIP + Mini Kit 99K</p><p class="text-xs text-slate-500 mt-1">Dự kiến recover 12% · +8.5M GMV</p></div>`)}
    </div>`);
};

/* ===== SYSTEM ===== */
PAGES.workflows = () => {
  const byPlatform = { shop: [], ads: [], affiliate: [], cross: [] };
  AUTOMATION_FLOWS.forEach(f => (byPlatform[f.platform] || byPlatform.cross).push(f));
  const activeRules = ZZP_DATA.automationRules.filter(r => r.active);
  return modulePage('Tối ưu', 'Trung tâm tích hợp TikTok', 'Quy trình tự động: nhận sự kiện TikTok → xử lý trên ZZP → ghi ngược lên Shop / Ads / Affiliate', `
    ${renderFlowSyncStrip()}
    ${dsStatGrid([
      { label: 'Quy trình tích hợp', value: AUTOMATION_FLOWS.length, tone: 'brand' },
      { label: 'Quy tắc đang bật', value: activeRules.length, tone: 'success' },
      { label: 'Nguồn live', value: ZZP_DATA.dataSync.filter(d => d.status === 'live').length + '/6', tone: 'info' },
      { label: 'Lần chạy tháng này', value: ZZP_DATA.automationRules.reduce((s, r) => s + r.runs, 0), tone: 'warning' }
    ])}
    ${dsCard('Quy tắc tự động gắn TikTok', `<div class="ds-grid ds-grid--2">${ZZP_DATA.automationRules.map(r => `
      <div class="ds-list-card" style="cursor:default">
        <div style="display:flex;justify-content:space-between;gap:12px">
          <div style="min-width:0">
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">${renderPlatformBadge(r.platform || 'cross')}${r.active ? badge('Đang bật', 'ok') : badge('Tắt', 'info')}</div>
            <p class="ds-list-card-title" style="margin-top:0">${r.name}</p>
            <p class="ds-list-card-desc">${r.trigger}</p>
            <p class="ds-list-card-desc">${r.action}</p>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <p style="margin:0;font-size:22px;font-weight:800;color:var(--ds-brand)">${r.runs}</p>
            <p style="margin:4px 0 0;font-size:10px;color:var(--ds-text-muted)">lần chạy</p>
            ${r.flowId ? `<button type="button" class="ds-text-link" style="margin-top:8px;font-size:12px" onclick="runAutomationFlow('${r.flowId}')">${icon('play', 12)} Chạy</button>` : ''}
          </div>
        </div>
      </div>`).join('')}</div>`)}
    ${['shop', 'ads', 'affiliate', 'cross'].map(key => {
      const list = byPlatform[key];
      if (!list.length) return '';
      return `<div><h3 class="ds-section-title">${renderPlatformBadge(key)} ${list.length} quy trình</h3><div class="ds-stack-sm">${list.map(f => renderWorkflowListCard(f)).join('')}</div></div>`;
    }).join('')}`);
};

PAGES.notifications = () => {
  return modulePage('Hệ thống', 'Notification Center', 'Quản lý thông báo đa kênh cho shop', `
    ${layoutPrdBadge('notifications')}
    ${renderNotificationInbox()}`);
};

PAGES.audit = () => {
  return modulePage('Hệ thống', 'Audit & Governance', 'Theo dõi mọi thay đổi và hành động trên nền tảng', `
    ${card('Activity Log', tableWrap(['Thời gian','Người dùng','Hành động','Mô-đun'],
      ZZP_DATA.auditLog.map(l => `<tr class="border-b border-slate-50"><td class="py-3 px-3 text-xs">${l.time}</td><td class="px-3">${l.user}</td><td class="px-3">${l.action}</td><td class="px-3">${badge(l.module,'info')}</td></tr>`).join('')))}`);
};

PAGES.settings = () => {
  return modulePage('Hệ thống', 'Settings & Access Control', 'Cấu hình shop, tích hợp và phân quyền truy cập', `
    ${dsGrid(2, `
      ${dsCard('Shop Settings', dsKvRows([
        ['Tên shop', ZZP_DATA.shop.name],
        ['Ngành hàng', ZZP_DATA.shop.category],
        ['Múi giờ', 'Asia/Ho_Chi_Minh'],
        ['Tiền tệ', 'VND']
      ]))}
      ${dsCard('Integrations', `<div class="ds-kv">${ZZP_DATA.dataSync.slice(0, 4).map(d =>
        `<div class="ds-kv-row"><span class="ds-kv-label">${d.source}</span>${badge(d.status, d.status)}</div>`
      ).join('')}</div>`)}
      ${dsCard('RBAC Roles', `
        <div class="ds-stack-sm">
          ${['Chủ shop — Toàn quyền', 'Quản lý — Quản trị phòng ban + duyệt', 'Vận hành — Xem + sửa mô-đun được giao', 'Phân tích — Chỉ xem báo cáo'].map(r =>
            `<div class="ds-tip ds-tip--brand"><p class="ds-tip-title">${r.split(' — ')[0]}</p><p class="ds-tip-desc">${r.split(' — ')[1]}</p></div>`
          ).join('')}
        </div>`)}
      ${dsCard('Data Governance', `
        ${dsKvRows([
          ['Điểm chất lượng dữ liệu', '<span style="color:var(--ds-success);font-weight:700">96%</span>'],
          ['Đối soát gần nhất', '2026-06-05 06:00'],
          ['Độ phủ ánh xạ', '85%']
        ])}
        <div style="margin-top:16px">${dsBtn('Xuất báo cáo tài chính', "showToast('Đang xuất báo cáo...')", 'secondary', 'md')}</div>`)}
    `)}`);
};
