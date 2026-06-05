/* ZZP Page Renderers */
const PAGES = {};

function card(title, body, cls = '') {
  const t = typeof viLabel === 'function' ? viLabel(title) : title;
  return `<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-w-0 ${cls}"><div class="px-5 py-4 border-b border-slate-100"><h3 class="font-semibold text-slate-800">${t}</h3></div><div class="p-5 min-w-0">${body}</div></div>`;
}

function statCard(label, value, sub = '', color = 'zzp') {
  const l = typeof viLabel === 'function' ? viLabel(label) : label;
  const s = sub && typeof viLabel === 'function' ? viLabel(sub) : sub;
  const colors = { zzp: 'bg-zzp-50 text-zzp-700', red: 'bg-red-50 text-red-700', amber: 'bg-amber-50 text-amber-700', blue: 'bg-blue-50 text-blue-700', green: 'bg-green-50 text-green-700' };
  return `<div class="bg-white rounded-xl border border-slate-200 p-5"><p class="text-sm text-slate-500 mb-1">${l}</p><p class="text-2xl font-bold text-slate-800">${value}</p>${s ? `<p class="text-xs mt-1 ${colors[color]?.split(' ')[1] || 'text-slate-500'}">${s}</p>` : ''}</div>`;
}

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

function pageHeader(category, title, desc, prdRef) {
  const t = typeof viLabel === 'function' ? viLabel(title) : title;
  const catColors = { 'Khởi tạo': 'phase-badge-1', 'Vận hành': 'phase-badge-2', 'Phân tích': 'phase-badge-3', 'Tối ưu': 'phase-badge-4', 'Hệ thống': 'bg-slate-100 text-slate-600' };
  return `<div class="mb-6"><span class="px-3 py-1 rounded-full text-xs font-semibold ${catColors[category] || catColors['Hệ thống']}">${category}</span><h2 class="text-xl font-bold mt-2">${t}</h2><p class="text-slate-500 text-sm mt-1">${desc}</p>${prdRef ? `<p class="text-xs text-slate-400 mt-1 border-l-2 border-zzp-300 pl-2">${prdRef}</p>` : ''}</div>`;
}

function tableWrap(headers, rows) {
  const h = typeof viLabel === 'function' ? headers.map(x => viLabel(x)) : headers;
  return `<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-slate-100">${h.map(x => `<th class="text-left py-3 px-3 text-slate-500 font-medium">${x}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

/* ===== DASHBOARD ===== */
PAGES.dashboard = () => isNewSeller() ? renderNewSellerDashboard() : renderActiveSellerDashboard();

/* ===== PHASE 1 ===== */
PAGES.onboarding = () => {
  const done = ZZP_DATA.checklist.filter(c => c.done).length;
  return `<div>${pageHeader('Khởi tạo','Onboarding & Setup Shop','Thiết lập gian hàng, kết nối TikTok Shop và đánh giá mức độ sẵn sàng vận hành')}
    <div class="grid lg:grid-cols-3 gap-6 mb-6">
      ${statCard('Shop Health', calcHealthScore() + '%', `${done}/${ZZP_DATA.checklist.length} bước`)}
      ${statCard('Kết nối shop', ZZP_DATA.shop.oauthStatus === 'connected' ? 'Đã kết nối' : 'Chưa kết nối', ZZP_DATA.shop.name)}
      ${statCard('Cập nhật gần nhất', ZZP_DATA.shop.lastSync, 'Đồng bộ tự động')}
    </div>
    ${layoutPrdBadge('onboarding')}
    ${renderOnboardingTimeline()}
    <div class="grid lg:grid-cols-2 gap-6">
      ${renderSetupBanner()}
      ${card('Kết nối TikTok Shop', `
        <div class="text-center py-6">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-4">${icon('circle-check', 32)}</div>
          <p class="font-semibold text-green-700">TikTok Shop đã kết nối</p>
          <p class="text-sm text-slate-500 mt-1">${ZZP_DATA.shop.name} · ${ZZP_DATA.shop.category}</p>
          <div class="mt-4 p-3 bg-slate-50 rounded-lg text-left text-sm space-y-2">
            <div class="flex justify-between"><span class="text-slate-500">Gian hàng</span><span>${ZZP_DATA.shop.name}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Trạng thái</span>${badge('Đã kết nối','connected')}</div>
            <div class="flex justify-between"><span class="text-slate-500">Seller Center</span><span class="text-green-600 flex items-center gap-1">${icon('check', 14)} Đồng bộ OK</span></div>
          </div>
          <button onclick="showToast('Đã làm mới kết nối TikTok Shop')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm hover:bg-zzp-700">Làm mới kết nối</button>
        </div>`)}
    </div></div>`;
};

PAGES['products-setup'] = () => {
  const c5 = ZZP_DATA.checklist.find(c => c.id === 'c5');
  const heroes = ZZP_DATA.products.filter(p => p.hero && p.listingScore >= 85);
  return `<div>${pageHeader('Khởi tạo','Product Launch','Tạo và tối ưu listing, kiểm tra chất lượng và tăng tỷ lệ duyệt')}
    ${!c5?.done ? `
    <div class="mb-6 p-5 rounded-2xl border-2 border-zzp-200 bg-gradient-to-br from-zzp-50 to-white">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-zzp-700 flex items-center gap-2">${icon('sparkles', 16)} Thiết lập sản phẩm trên ZZP</p>
          <h3 class="text-lg font-bold mt-1">Tạo SKU chủ lực với AI</h3>
          <p class="text-sm text-slate-600 mt-1">Wizard 5 bước: thông tin → AI nội dung → AI 6 ảnh → video & tuân thủ → đăng TikTok Shop</p>
          <p class="text-xs text-slate-500 mt-2">${heroes.length}/5 SKU chủ lực đạt ≥85% · ${c5?.done ? 'Hoàn thành' : 'Chưa xong'}</p>
        </div>
        <button type="button" onclick="openProductCreateWizard()" class="px-5 py-3 bg-zzp-600 text-white rounded-xl text-sm font-semibold hover:bg-zzp-700 inline-flex items-center gap-2 shrink-0">${icon('plus', 16)} Thiết lập sản phẩm mới</button>
      </div>
    </div>` : ''}
    ${card('Listing Quality Checker', tableWrap(['Sản phẩm','Giá','Listing Score','Trạng thái','Hành động'],
      ZZP_DATA.products.map(p => `<tr ${rowClick('product', p.id)}><td class="py-3 px-3 flex items-center gap-2">${productThumb(p, 16)}<span class="font-medium">${p.name}</span>${p.hero?' <span class="text-xs text-amber-600 font-medium">Hero</span>':''}</td>
        <td class="px-3">${fmtCurrency(p.price)}</td>
        <td class="px-3"><div class="flex items-center gap-2"><div class="w-20 h-2 bg-slate-100 rounded-full"><div class="h-2 rounded-full ${p.listingScore>=85?'bg-green-500':p.listingScore>=70?'bg-amber-500':'bg-red-500'}" style="width:${p.listingScore}%"></div></div><span class="font-medium">${p.listingScore}%</span></div></td>
        <td class="px-3">${badge(p.status, p.status)}</td>
        <td class="px-3" onclick="event.stopPropagation()"><button onclick="openListingCheck('${p.id}')" class="text-zzp-600 text-xs hover:underline">Kiểm tra</button></td>
      </tr>`).join('')))}
    <div class="mt-6">${card('Listing Assist — Gợi ý tối ưu', `
      <div class="space-y-3">
        <div class="p-3 bg-amber-50 rounded-lg border border-amber-100"><p class="font-medium text-sm">P006 — Son dưỡng môi</p><p class="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-3 gap-y-1"><span class="inline-flex items-center gap-1 text-amber-700">${icon('alert-circle',12)} Thiếu ảnh INCI</span><span class="inline-flex items-center gap-1 text-amber-700">${icon('alert-circle',12)} Mô tả ngắn</span><span class="inline-flex items-center gap-1 text-green-700">${icon('check',12)} Giá OK</span></p><button onclick="navigate('compliance')" class="text-xs text-amber-700 mt-2 hover:underline">Xem compliance</button></div>
        <div class="p-3 bg-green-50 rounded-lg border border-green-100"><p class="font-medium text-sm">P005 — Kem chống nắng SPF50+</p><p class="text-xs text-slate-600 mt-1">Listing 94% · 8 ảnh chuẩn · Video demo · Sẵn sàng scale</p></div>
      </div>`)}</div></div>`;
};

PAGES.store = () => {
  const bk = ZZP_DATA.brandKit;
  return `<div>${pageHeader('Khởi tạo','Store Optimization','Chuẩn hóa giao diện cửa hàng, Brand Kit và trải nghiệm mua sắm')}
    <div class="grid lg:grid-cols-2 gap-6">
      ${card('Brand Kit', `
        <div class="space-y-4">
          <div class="flex gap-4"><div class="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold" style="background:${bk.primaryColor}">BV</div><div><p class="font-semibold">${bk.logo}</p><p class="text-sm text-slate-500">${bk.banner}</p></div></div>
          <div class="flex gap-3"><div class="flex-1 p-3 rounded-lg text-center text-white text-sm" style="background:${bk.primaryColor}">Primary ${bk.primaryColor}</div><div class="flex-1 p-3 rounded-lg text-center text-white text-sm" style="background:${bk.secondaryColor}">Accent ${bk.secondaryColor}</div></div>
        </div>`)}
      ${card('Template Center', bk.templates.map(t => `<div class="flex items-center justify-between py-2 border-b border-slate-50"><span class="text-sm">${t}</span><button class="text-xs text-zzp-600 hover:underline">Áp dụng</button></div>`).join(''))}
      ${card('Store Decoration Preview', `
        <div class="bg-gradient-to-r from-zzp-500 to-zzp-700 rounded-xl p-6 text-white mb-4"><p class="text-xs opacity-80">Banner chính</p><p class="text-xl font-bold mt-1">${bk.banner}</p></div>
        <div class="grid grid-cols-3 gap-2">${ZZP_DATA.products.filter(p=>p.hero).map(p=>`<div class="bg-slate-50 rounded-lg p-3 text-center">${productThumb(p, 20)}<p class="text-xs mt-2 truncate">${p.name}</p><p class="text-xs font-semibold text-zzp-600">${fmtCurrency(p.price)}</p></div>`).join('')}</div>`)}
    </div></div>`;
};

PAGES.compliance = () => {
  return `<div>${pageHeader('Khởi tạo','Compliance & Policy Hub','Theo dõi chính sách TikTok Shop, đánh giá rủi ro bằng AI')}
    ${card('TikTok Policy Hub — AI Impact Analysis', ZZP_DATA.policies.map(p => `
      <div class="p-4 rounded-xl border ${p.status==='action_required'?'border-red-200 bg-red-50':'border-slate-200'} mb-3 cursor-pointer hover:shadow-md transition-all" onclick="openDetail('policy','${p.id}')">
        <div class="flex items-start justify-between gap-3"><div><p class="font-medium">${p.title}</p><p class="text-xs text-slate-500 mt-1">${p.date} · Ảnh hưởng: ${badge(p.impact,p.impact)}</p></div>${badge(p.status==='action_required'?'Cần xử lý':p.status==='compliant'?'Tuân thủ':'Theo dõi', p.status==='action_required'?'critical':p.status==='compliant'?'ok':'warning')} ${icon('chevron-right',16,'text-slate-400 shrink-0')}</div>
        <div class="mt-3 p-3 bg-white rounded-lg border border-slate-100" onclick="event.stopPropagation()"><p class="text-xs font-semibold text-zzp-700 mb-1 flex items-center gap-1">${icon('sparkles', 12)} AI Assessment</p><p class="text-sm text-slate-600">${p.aiSummary}</p></div>
        ${p.affected.length ? `<p class="text-xs mt-2">Sản phẩm ảnh hưởng: ${p.affected.map(id=>`<button type="button" onclick="event.stopPropagation();openDetail('product','${id}')" class="text-zzp-600 hover:underline">${getProduct(id)?.name||id}</button>`).join(', ')}</p>` : ''}
        <div class="mt-3 flex gap-2" onclick="event.stopPropagation()">
          <button type="button" onclick="openDetail('policy','${p.id}')" class="text-sm text-zzp-600 hover:underline">Chi tiết →</button>
          ${p.status==='action_required'?`<button type="button" onclick="runAutomationFlow('FLOW_COMPLIANCE')" class="text-sm text-red-600 hover:underline inline-flex items-center gap-1">${icon('play',12)} Giải quyết</button>`:''}
        </div>
      </div>`).join(''))}
    ${card('Compliance Checker', `
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="p-4 bg-green-50 rounded-xl"><p class="text-2xl font-bold text-green-700">5/7</p><p class="text-xs text-slate-500">Sản phẩm tuân thủ</p></div>
        <div class="p-4 bg-red-50 rounded-xl"><p class="text-2xl font-bold text-red-700">2</p><p class="text-xs text-slate-500">Cần cập nhật</p></div>
        <div class="p-4 bg-amber-50 rounded-xl"><p class="text-2xl font-bold text-amber-700">1</p><p class="text-xs text-slate-500">Chính sách mới</p></div>
      </div>`)}</div>`;
};

PAGES.education = () => {
  const avg = Math.round(ZZP_DATA.education.reduce((s,e)=>s+e.progress,0)/ZZP_DATA.education.length);
  return `<div>${pageHeader('Khởi tạo','Education Hub & Playbook','Tài liệu đào tạo, SOP và lộ trình phát triển cho seller mới')}
    ${statCard('Tiến độ học tập', avg+'%', `${ZZP_DATA.education.filter(e=>e.progress===100).length}/${ZZP_DATA.education.length} hoàn thành`)}
    <div class="mt-6 grid lg:grid-cols-2 gap-4">${ZZP_DATA.education.map(e => `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex justify-between items-start"><div><span class="text-xs px-2 py-0.5 rounded bg-slate-100">${e.type}</span><p class="font-medium mt-2">${e.title}</p><p class="text-xs text-slate-500">${e.duration}</p></div><span class="text-lg font-bold text-zzp-600">${e.progress}%</span></div>
        <div class="mt-3 h-2 bg-slate-100 rounded-full"><div class="h-2 bg-zzp-500 rounded-full" style="width:${e.progress}%"></div></div>
        <button onclick="showToast('Đang mở: ${e.title}')" class="mt-3 text-sm text-zzp-600 hover:underline">${e.progress===100?'Xem lại':'Tiếp tục học'} →</button>
      </div>`).join('')}</div></div>`;
};

PAGES.portfolio = () => {
  const heroes = ZZP_DATA.products.filter(p=>p.hero);
  return `<div>${pageHeader('Khởi tạo','Product Strategy & Hero SKU','Xác định sản phẩm chủ lực và chiến lược danh mục')}
    <div class="grid lg:grid-cols-3 gap-4 mb-6">
      ${statCard('Hero SKU', heroes.length, 'Sản phẩm chiến lược')}
      ${statCard('Tiềm năng Scale', '2', 'Serum VC, Kem chống nắng')}
      ${statCard('Cần tối ưu', '1', 'Son dưỡng môi P006')}
    </div>
    ${card('Product Portfolio Matrix', `
      <div class="grid lg:grid-cols-2 gap-4">
        <div class="p-4 border-2 border-zzp-200 rounded-xl bg-zzp-50"><p class="font-semibold text-zzp-800 flex items-center gap-2">${icon('star', 14)} Star — Scale</p>${heroes.filter(p=>p.listingScore>=85&&p.sold30d>400).map(p=>`<p class="text-sm mt-2 flex items-center gap-2">${productThumb(p,14)} ${p.name} — ${fmt(p.sold30d*p.price)} GMV</p>`).join('')}</div>
        <div class="p-4 border border-amber-200 rounded-xl bg-amber-50"><p class="font-semibold text-amber-800 flex items-center gap-2">${icon('coins', 14)} Cash Cow</p>${heroes.filter(p=>p.sold30d>500).map(p=>`<p class="text-sm mt-2 flex items-center gap-2">${productThumb(p,14)} ${p.name} — Velocity cao</p>`).join('')}</div>
        <div class="p-4 border border-blue-200 rounded-xl bg-blue-50"><p class="font-semibold text-blue-800 flex items-center gap-2">${icon('sprout', 14)} Potential</p><p class="text-sm mt-2 flex items-center gap-2">${productThumb(getProduct('P007'),14)} Bộ dùng thử Mini Kit — CVR tốt</p></div>
        <div class="p-4 border border-red-200 rounded-xl bg-red-50"><p class="font-semibold text-red-800 flex items-center gap-2">${icon('alert-triangle', 14)} Review</p><p class="text-sm mt-2 flex items-center gap-2">${productThumb(getProduct('P006'),14)} Son dưỡng môi — compliance risk</p></div>
      </div>`)}</div>`;
};

PAGES.channels = () => {
  return `<div>${pageHeader('Khởi tạo','Multi-channel & SKU Mapping','Chuẩn hóa dữ liệu và đồng bộ sản phẩm giữa nhiều hệ thống')}
    ${card('Channel Integration', ZZP_DATA.channels.map(ch => `
      <div class="flex items-center justify-between py-3 border-b border-slate-50">
        <div><p class="font-medium">${ch.name}</p><p class="text-xs text-slate-500">${ch.skus} SKU · Sync: ${ch.lastSync}</p></div>
        ${badge(ch.status, ch.status)}</div>`).join(''))}
    <div class="mt-6">${card('SKU Mapping', tableWrap(['TikTok Shop','Shopee','Lazada','ERP'],
      ZZP_DATA.skuMapping.map(m => `<tr class="border-b border-slate-50"><td class="py-2 px-3 font-medium">${getProduct(m.tiktok)?.name||m.tiktok}</td><td class="px-3">${m.shopee}</td><td class="px-3">${m.lazada}</td><td class="px-3">${m.erp}</td></tr>`).join('')))}</div></div>`;
};

/* ===== PHASE 2 ===== */
PAGES.datahub = () => {
  return `<div>${pageHeader('Vận hành','Đồng bộ dữ liệu shop','Theo dõi trạng thái đồng bộ sản phẩm, đơn hàng, tiếp thị liên kết và nội dung')}
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      ${statCard('Nguồn dữ liệu', ZZP_DATA.dataSync.length, 'Đang kết nối')}
      ${statCard('Bản ghi', fmt(ZZP_DATA.dataSync.reduce((s,d)=>s+d.records,0)), 'Tổng hợp')}
      ${statCard('Độ trễ TB', '~6 giây', 'TikTok Shop: 2 giây')}
    </div>
    ${renderDataHubPipeline()}
    <button onclick="showToast('Đang đồng bộ toàn bộ dữ liệu...')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Đồng bộ ngay</button></div>`;
};

PAGES.products = () => {
  return `<div>${pageHeader('Vận hành','Product Operations','Quản lý vòng đời sản phẩm và hiệu suất bán hàng')}
    ${renderTtsMetricsStrip('products')}
    ${renderModuleDataTabs('products')}</div>`;
};

PAGES.orders = () => {
  return `<div>${pageHeader('Vận hành','Order Center & SLA Monitoring','Theo dõi vòng đời đơn hàng và chất lượng vận hành')}
    ${renderTtsMetricsStrip('orders')}
    ${renderModuleDataTabs('orders')}</div>`;
};

PAGES.inventory = () => {
  return `<div>${pageHeader('Vận hành','Inventory Monitor & Stock Alert','Quản lý tồn kho, tốc độ bán và cảnh báo thiếu hàng')}
    ${renderTtsMetricsStrip('inventory')}
    ${renderModuleDataTabs('inventory')}</div>`;
};

PAGES.returns = () => {
  return `<div>${pageHeader('Vận hành','Return & Cancellation Center','Theo dõi hoàn hàng, hủy đơn và nguyên nhân thất thoát doanh thu')}
    ${renderTtsMetricsStrip('returns')}
    ${renderModuleDataTabs('returns')}</div>`;
};

PAGES.affiliate = () => {
  return `<div>${pageHeader('Vận hành','Affiliate Center & SAM Strategy','Quản lý chiến dịch Affiliate và hiệu suất từng nguồn doanh thu')}
    ${renderTtsMetricsStrip('affiliate')}
    ${renderModuleDataTabs('affiliate')}</div>`;
};

PAGES.koc = () => {
  return `<div>${pageHeader('Vận hành','KOC CRM & Lifecycle Tracking','Quản lý vòng đời KOC từ tuyển chọn, gửi mẫu đến tạo doanh thu')}
    ${renderTtsMetricsStrip('koc')}
    ${renderModuleDataTabs('koc')}
    <p class="text-xs text-slate-500 mt-4 text-center">Phân tích sâu → <button type="button" onclick="navigate('creator-analytics')" class="text-zzp-600 hover:underline">KOC Scorecard</button></p></div>`;
};

PAGES.agency = () => {
  return `<div>${pageHeader('Vận hành','Agency Management & ROI','Theo dõi hiệu quả Agency và chi phí hợp tác')}
    ${layoutPrdBadge('agency')}
    ${renderAgencyPortfolioCards()}</div>`;
};

PAGES.samples = () => {
  return `<div>${pageHeader('Vận hành','Sample Tracking & Sample ROI','Quản lý gửi mẫu và đánh giá hiệu quả đầu tư mẫu')}
    ${renderTtsMetricsStrip('samples')}
    ${renderModuleDataTabs('samples')}</div>`;
};

PAGES.content = () => {
  return `<div>${pageHeader('Vận hành','Content Calendar & Task Manager','Quản lý kế hoạch nội dung và vòng đời video Affiliate')}
    ${renderTtsMetricsStrip('content')}
    ${renderModuleDataTabs('content')}</div>`;
};

PAGES.livestream = () => {
  return `<div>${pageHeader('Vận hành','Livestream Operations','Theo dõi hoạt động livestream và doanh thu phát sinh')}
    ${renderTtsMetricsStrip('livestream')}
    ${renderModuleDataTabs('livestream')}</div>`;
};

PAGES.campaigns = () => {
  return `<div>${pageHeader('Vận hành','Campaign & Promotion Center','Quản lý chương trình khuyến mãi và chiến dịch tăng trưởng')}
    ${card('Active Campaigns', tableWrap(['Chiến dịch','Loại','Giảm giá','Thời gian','Budget','Spent','GMV',''],
      ZZP_DATA.campaigns.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium"><button onclick="openDetail('campaign','${c.id}')" class="hover:text-zzp-600 hover:underline">${c.name}</button></td><td class="px-3">${c.type}</td><td class="px-3">${c.discount?c.discount+'%':'-'}</td><td class="px-3 text-xs">${c.start} → ${c.end}</td><td class="px-3">${fmt(c.budget)}</td><td class="px-3">${fmt(c.spent)}</td><td class="px-3 font-semibold">${fmt(c.gmv)}</td><td class="px-3">${badge(c.status,'active')}</td></tr>`).join('')))}</div>`;
};

PAGES.vouchers = () => {
  return `<div>${pageHeader('Vận hành','Voucher Guardrail & Performance','Kiểm soát chi phí voucher và hiệu quả sử dụng')}
    ${chartGrid([['% sử dụng voucher', 'chart-voucher-usage', 'sm'], ['Chi phí voucher', 'chart-voucher-cost', 'sm']])}
    ${card('Voucher Management', tableWrap(['Mã','Giảm giá','Đã dùng','Giới hạn','Chi phí','GMV','Guardrail',''],
      ZZP_DATA.vouchers.map(v => `<tr ${rowClick('voucher', v.id)}><td class="py-3 px-3 font-mono font-medium text-zzp-700">${v.code}</td><td class="px-3">${v.discount?(v.discount+'%'):fmtCurrency(v.maxDiscount)}</td><td class="px-3">${v.used}/${v.limit}</td><td class="px-3"><div class="w-16 h-2 bg-slate-100 rounded-full"><div class="h-2 rounded-full ${v.guardrail==='warning'?'bg-amber-500':'bg-green-500'}" style="width:${v.used/v.limit*100}%"></div></div></td><td class="px-3">${fmt(v.cost)}</td><td class="px-3">${fmt(v.gmv)}</td><td class="px-3">${badge(v.guardrail==='warning'?'Cảnh báo':'OK',v.guardrail==='warning'?'warning':'ok')}</td><td class="px-3" onclick="event.stopPropagation()">${v.guardrail==='warning'?`<button onclick="runAutomationFlow('FLOW_ADS')" class="text-xs text-amber-600 hover:underline">Giải quyết</button>`:''}</td></tr>`).join('')))}</div>`;
};

PAGES.ads = () => {
  return `<div>${pageHeader('Vận hành','Spark Ads & Campaign Setup','Kết nối dữ liệu quảng cáo với doanh thu và Affiliate')}
    ${renderTtsMetricsStrip('ads')}
    ${renderModuleDataTabs('ads')}</div>`;
};

/* ===== PHASE 3 ===== */
PAGES.executive = () => {
  return `<div>${pageHeader('Phân tích','Executive Dashboard','Tổng hợp toàn bộ tình hình kinh doanh trên một màn hình')}
    ${renderTtsMetricsStrip('executive')}
    ${renderModuleDataTabs('executive')}</div>`;
};

PAGES.revenue = () => {
  return `<div>${pageHeader('Phân tích','Revenue Intelligence & Attribution','Phân tích doanh thu theo nguồn và xác định yếu tố tạo doanh thu')}
    ${renderTtsMetricsStrip('revenue')}
    ${renderModuleDataTabs('revenue')}</div>`;
};

PAGES.profit = () => {
  return `<div>${pageHeader('Phân tích','P&L Dashboard & Margin Analytics','Tính toán lợi nhuận thực sau khi trừ toàn bộ chi phí vận hành')}
    ${renderTtsMetricsStrip('profit')}
    ${renderModuleDataTabs('profit')}</div>`;
};

PAGES.costs = () => {
  return `<div>${pageHeader('Phân tích','Cost Intelligence','Theo dõi và phân tích toàn bộ cấu trúc chi phí')}
    ${renderTtsMetricsStrip('costs')}
    ${renderModuleDataTabs('costs')}</div>`;
};

PAGES['product-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Product Intelligence & SKU Ranking','Đánh giá hiệu suất và khả năng tăng trưởng từng sản phẩm')}
    ${renderTtsMetricsStrip('product-analytics')}
    ${renderModuleDataTabs('product-analytics')}</div>`;
};

PAGES['affiliate-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Affiliate Analytics & Contribution','Đánh giá mức độ đóng góp Affiliate vào doanh thu')}
    ${renderTtsMetricsStrip('affiliate-analytics')}
    ${renderModuleDataTabs('affiliate-analytics')}</div>`;
};

PAGES['creator-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','KOC Scorecard & Creator Ranking','Xếp hạng KOC dựa trên GMV, ROI và CVR')}
    ${renderTtsMetricsStrip('creator-analytics')}
    ${renderModuleDataTabs('creator-analytics')}
    <p class="text-xs text-slate-500 mt-4 text-center">Quản lý pipeline → <button type="button" onclick="navigate('koc')" class="text-zzp-600 hover:underline">KOC CRM</button></p></div>`;
};

PAGES['content-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Content Intelligence & Pattern Analysis','Xác định nội dung bán hàng hiệu quả và mô hình thành công')}
    ${renderTtsMetricsStrip('content-analytics')}
    ${renderModuleDataTabs('content-analytics')}</div>`;
};

PAGES['live-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Livestream Analytics & Session Performance','Phân tích hiệu quả từng phiên livestream')}
    ${renderTtsMetricsStrip('live-analytics')}
    ${renderModuleDataTabs('live-analytics')}</div>`;
};

PAGES['customer-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Customer Intelligence','Phân tích hành vi khách hàng, phân khúc và LTV')}
    ${card('Customer Segments', tableWrap(['Phân khúc','Số KH','LTV TB','Repeat Rate','Chiến lược'],
      ZZP_DATA.customers.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${c.segment}</td><td class="px-3">${c.count}</td><td class="px-3">${fmtCurrency(c.ltv)}</td><td class="px-3">${c.repeatRate}%</td><td class="px-3">${c.segment.includes('VIP')?'Retention + upsell':c.segment.includes('At Risk')?'Win-back campaign':'Nurture to repeat'}</td></tr>`).join('')))}
    <div class="mt-6">${card('Cohort Analysis', '<div class="chart-box"><canvas id="chart-cohort"></canvas></div>')}</div></div>`;
};

PAGES.team = () => {
  return `<div>${pageHeader('Phân tích','Team Management & RBAC','Quản lý nhân sự, phân quyền và quy trình làm việc')}
    ${card('Team Members', tableWrap(['Thành viên','Vai trò','Phòng ban','Trạng thái','Quyền'],
      ZZP_DATA.team.map(u => `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${u.name}</td><td class="px-3">${u.role}</td><td class="px-3">${u.dept}</td><td class="px-3">${badge(u.status,'active')}</td><td class="px-3 text-xs">${u.role==='Chủ shop'?'Toàn quyền':u.role.includes('Quản lý')?'Quản trị phòng ban':'Xem + Sửa'}</td></tr>`).join('')))}
    ${card('Trung tâm quy trình', `
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm">1</span><div><p class="text-sm font-medium">Đơn hàng > 500K → quản lý duyệt</p><p class="text-xs text-slate-500">Tự giao Trần Văn Hùng</p></div></div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">2</span><div><p class="text-sm font-medium">Yêu cầu gửi mẫu → quản lý tiếp thị liên kết duyệt</p><p class="text-xs text-slate-500">Tự động nếu điểm KOC > 80</p></div></div>
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span class="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm">3</span><div><p class="text-sm font-medium">Tạm dừng quảng cáo → chủ shop duyệt nếu ngân sách > 10M</p><p class="text-xs text-slate-500">Chờ duyệt: AQ001</p></div></div>
      </div>`)}</div>`;
};

/* ===== PHASE 4 ===== */
PAGES['growth-assistant'] = () => {
  return `<div>${pageHeader('Tối ưu','Trợ lý AI tăng trưởng','Phân tích dữ liệu và đề xuất hành động ưu tiên cho shop')}
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
    `)).join('')}</div>`;
};

PAGES.alerts = () => {
  return `<div>${pageHeader('Tối ưu','Smart Alerts','Chủ động phát hiện rủi ro và gửi cảnh báo theo thời gian thực')}
    ${chartGrid([['Phân bổ severity', 'chart-alert-severity', 'sm'], ['Loại cảnh báo', 'chart-alert-type', 'sm']])}
    <div class="grid grid-cols-4 gap-4 mb-6">
      ${statCard('Critical', ZZP_DATA.alerts.filter(a=>a.severity==='critical'&&!a.read).length, '', 'red')}
      ${statCard('Warning', ZZP_DATA.alerts.filter(a=>a.severity==='warning'&&!a.read).length, '', 'amber')}
      ${statCard('Info', ZZP_DATA.alerts.filter(a=>a.severity==='info'&&!a.read).length)}
      ${statCard('Đã đọc', ZZP_DATA.alerts.filter(a=>a.read).length)}
    </div>
    ${card('Active Alerts', ZZP_DATA.alerts.map(a => `
      <div class="p-4 rounded-xl border mb-3 cursor-pointer hover:shadow-md transition-all ${a.read?'border-slate-100 opacity-60':'border-slate-200 bg-white'}" onclick="openDetail('alert','${a.id}')">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1"><div class="flex items-center gap-2 flex-wrap">${badge(a.type,a.severity)} ${!a.read?badge('Mới','new'):''}</div>
          <p class="font-medium mt-1">${a.title}</p><p class="text-sm text-slate-600 mt-1">${a.desc}</p></div>
          ${icon('chevron-right', 18, 'text-slate-400 shrink-0')}
        </div>
        <div class="flex gap-2 mt-3" onclick="event.stopPropagation()">
          <button type="button" onclick="openDetail('alert','${a.id}')" class="px-3 py-1.5 border border-zzp-200 text-zzp-700 rounded-lg text-xs">Chi tiết</button>
          <button type="button" onclick="runAutomationFlow('${alertToFlow(a.id) || 'FLOW_OPTIMIZE'}')" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs inline-flex items-center gap-1">${icon('play',12)} Giải quyết</button>
        </div>
      </div>`).join(''))}</div>`;
};

PAGES.opportunities = () => {
  return `<div>${pageHeader('Tối ưu','Cơ hội tăng trưởng','Phát hiện cơ hội từ sản phẩm, KOC, nội dung và chiến dịch')}
    <div class="grid lg:grid-cols-2 gap-4">${ZZP_DATA.opportunities.map(o => `
      <div class="bg-white rounded-xl border border-slate-200 p-5 hover:border-zzp-300 hover:shadow-md transition-all cursor-pointer" onclick="navigate('growth-assistant')">
        <div class="flex justify-between items-start"><span class="text-xs px-2 py-0.5 rounded-full bg-zzp-100 text-zzp-700">${o.type}</span>${badge(o.status,o.status)}</div>
        <p class="font-semibold mt-3">${o.title}</p><p class="text-sm text-slate-500 mt-1">${o.desc}</p>
        <p class="text-sm font-semibold text-green-600 mt-3">Tiềm năng: ${o.potential}</p>
        <div class="mt-3 flex gap-2" onclick="event.stopPropagation()">
          <button type="button" onclick="navigate('growth-assistant')" class="text-sm text-zzp-600 hover:underline">Xem AI recommendation →</button>
          <button type="button" onclick="runAutomationFlow('FLOW_AI_ACTION')" class="text-sm text-white bg-zzp-600 px-3 py-1 rounded-lg">${icon('play',12)} Giải quyết</button>
        </div>
      </div>`).join('')}</div></div>`;
};

PAGES.forecast = () => {
  return `<div>${pageHeader('Tối ưu','Sales & Inventory Forecasting','Dự báo doanh thu và nhu cầu tồn kho')}
    ${card('GMV Forecast — 7 ngày tới', '<div class="chart-box"><canvas id="chart-forecast"></canvas></div>')}
    <div class="mt-6">${card('Inventory Forecast', tableWrap(['Sản phẩm','Tồn kho','Ngày còn','Dự báo','Khuyến nghị'],
      ZZP_DATA.forecasts.inventory.map(f => { const p = getProduct(f.product);
        return `<tr ${rowClick('product', f.product)}><td class="py-3 px-3 font-medium">${p?.name}</td><td class="px-3">${p?.stock}</td><td class="px-3 ${f.daysLeft<7?'text-red-600 font-bold':''}">${f.daysLeft} ngày</td><td class="px-3">${f.daysLeft<7?'Stockout risk':'Stable'}</td><td class="px-3">${f.recommendation}</td></tr>`; }).join('')))}</div></div>`;
};

PAGES.benchmark = () => {
  const b = ZZP_DATA.benchmarks;
  return `<div>${pageHeader('Tối ưu','Market Intelligence & Benchmark','So sánh hiệu suất với thị trường và đối thủ')}
    ${chartGrid([['Shop vs thị trường', 'chart-benchmark-market', 'md']], 1)}
    ${card('Industry Benchmark Comparison', tableWrap(['Chỉ số','Shop của bạn','Thị trường','Đánh giá'],
      [['GMV Growth', b.gmvGrowth.shop+'%', b.gmvGrowth.market+'%'],['Profit Margin', b.profitMargin.shop+'%', b.profitMargin.market+'%'],['Return Rate', b.returnRate.shop+'%', b.returnRate.market+'%'],['Affiliate Share', b.affiliateShare.shop+'%', b.affiliateShare.market+'%'],['Live Conversion', b.liveConversion.shop+'%', b.liveConversion.market+'%']].map(([k,s,m]) => {
        const better = parseFloat(s) <= parseFloat(m) && k.includes('Return') || parseFloat(s) >= parseFloat(m);
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-medium">${k}</td><td class="px-3 font-semibold">${s}</td><td class="px-3">${m}</td><td class="px-3">${better?badge('Trên TB','ok'):badge('Dưới TB','warning')}</td></tr>`; }).join('')))}</div>`;
};

PAGES.actions = () => {
  return `<div>${pageHeader('Tối ưu','Trung tâm quyết định','Chuyển gợi ý thành kế hoạch hành động cụ thể')}
    ${layoutPrdBadge('actions')}
    ${card('Priority Action Board', renderActionPriorityBoard())}</div>`;
};

PAGES.automation = () => {
  return `<div>${pageHeader('Tối ưu','Quy tắc tích hợp TikTok','Quy tắc nhận sự kiện từ TikTok Shop / Ads / Affiliate và kích hoạt quy trình trên ZZP')}
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
      </div>`).join(''))}</div>`;
};

PAGES.optimization = () => {
  return `<div>${pageHeader('Tối ưu','Growth Optimizers','Tối ưu danh mục, ngân sách, KOC, nội dung và khuyến mãi')}
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
    </div></div>`;
};

/* ===== SYSTEM ===== */
PAGES.workflows = () => {
  const byPlatform = { shop: [], ads: [], affiliate: [], cross: [] };
  AUTOMATION_FLOWS.forEach(f => (byPlatform[f.platform] || byPlatform.cross).push(f));
  const activeRules = ZZP_DATA.automationRules.filter(r => r.active);
  return `<div>${pageHeader('Tối ưu', 'Trung tâm tích hợp TikTok', 'Quy trình tự động: nhận sự kiện TikTok → xử lý trên ZZP → ghi ngược lên Shop / Ads / Affiliate')}
    ${renderFlowSyncStrip()}
    <div class="grid lg:grid-cols-4 gap-4 mb-6">
      ${statCard('Quy trình tích hợp', AUTOMATION_FLOWS.length)}
      ${statCard('Quy tắc đang bật', activeRules.length)}
      ${statCard('Nguồn live', ZZP_DATA.dataSync.filter(d => d.status === 'live').length + '/6')}
      ${statCard('Lần chạy tháng này', ZZP_DATA.automationRules.reduce((s, r) => s + r.runs, 0))}
    </div>
    ${card('Quy tắc tự động gắn TikTok', `
      <div class="grid md:grid-cols-2 gap-3">${ZZP_DATA.automationRules.map(r => `
        <div class="p-3 rounded-xl border ${r.active ? 'border-green-200 bg-green-50/40' : 'border-slate-200 bg-slate-50'} flex justify-between gap-3">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">${renderPlatformBadge(r.platform || 'cross')}${r.active ? badge('Đang bật', 'ok') : badge('Tắt', 'info')}</div>
            <p class="font-medium text-sm">${r.name}</p>
            <p class="text-xs text-slate-500 mt-1">${r.trigger}</p>
            <p class="text-xs text-slate-600 mt-1">${r.action}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-lg font-bold text-zzp-700">${r.runs}</p>
            <p class="text-[10px] text-slate-400">lần chạy</p>
            ${r.flowId ? `<button type="button" onclick="runAutomationFlow('${r.flowId}')" class="mt-2 text-xs text-zzp-600 hover:underline inline-flex items-center gap-1">${icon('play', 12)} Chạy</button>` : ''}
          </div>
        </div>`).join('')}
      </div>`)}
    ${['shop', 'ads', 'affiliate', 'cross'].map(key => {
      const list = byPlatform[key];
      if (!list.length) return '';
      const p = FLOW_PLATFORMS[key];
      return `<div class="mt-8"><h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">${renderPlatformBadge(key)} ${list.length} quy trình</h3><div class="space-y-4">${list.map(f => renderWorkflowListCard(f)).join('')}</div></div>`;
    }).join('')}
    </div>`;
};

PAGES.notifications = () => {
  return `<div>${pageHeader('Hệ thống','Notification Center','Quản lý thông báo đa kênh cho shop')}
    ${layoutPrdBadge('notifications')}
    ${renderNotificationInbox()}</div>`;
};

PAGES.audit = () => {
  return `<div>${pageHeader('Hệ thống','Audit & Governance','Theo dõi mọi thay đổi và hành động trên nền tảng')}
    ${card('Activity Log', tableWrap(['Thời gian','Người dùng','Hành động','Mô-đun'],
      ZZP_DATA.auditLog.map(l => `<tr class="border-b border-slate-50"><td class="py-3 px-3 text-xs">${l.time}</td><td class="px-3">${l.user}</td><td class="px-3">${l.action}</td><td class="px-3">${badge(l.module,'info')}</td></tr>`).join('')))}</div>`;
};

PAGES.settings = () => {
  return `<div>${pageHeader('Hệ thống','Settings & Access Control','Cấu hình shop, tích hợp và phân quyền truy cập')}
    <div class="grid lg:grid-cols-2 gap-6">
      ${card('Shop Settings', `
        <div class="space-y-3 text-sm">
          <div class="flex justify-between py-2 border-b"><span class="text-slate-500">Tên shop</span><span>${ZZP_DATA.shop.name}</span></div>
          <div class="flex justify-between py-2 border-b"><span class="text-slate-500">Ngành hàng</span><span>${ZZP_DATA.shop.category}</span></div>
          <div class="flex justify-between py-2 border-b"><span class="text-slate-500">Múi giờ</span><span>Asia/Ho_Chi_Minh</span></div>
          <div class="flex justify-between py-2"><span class="text-slate-500">Tiền tệ</span><span>VND</span></div>
        </div>`)}
      ${card('Integrations', ZZP_DATA.dataSync.slice(0,4).map(d => `<div class="flex justify-between py-2 border-b border-slate-50 text-sm"><span>${d.source}</span>${badge(d.status,d.status)}</div>`).join(''))}
      ${card('RBAC Roles', `
        <div class="space-y-2 text-sm">
          <div class="p-2 bg-slate-50 rounded"><strong>Chủ shop</strong> — Toàn quyền</div>
          <div class="p-2 bg-slate-50 rounded"><strong>Quản lý</strong> — Quản trị phòng ban + duyệt</div>
          <div class="p-2 bg-slate-50 rounded"><strong>Vận hành</strong> — Xem + sửa mô-đun được giao</div>
          <div class="p-2 bg-slate-50 rounded"><strong>Phân tích</strong> — Chỉ xem báo cáo</div>
        </div>`)}
      ${card('Data Governance', `
        <div class="space-y-3">
          <div class="flex justify-between text-sm"><span>Điểm chất lượng dữ liệu</span><span class="font-semibold text-green-600">96%</span></div>
          <div class="flex justify-between text-sm"><span>Đối soát gần nhất</span><span>2026-06-05 06:00</span></div>
          <div class="flex justify-between text-sm"><span>Độ phủ ánh xạ</span><span>85%</span></div>
          <button onclick="showToast('Đang xuất báo cáo...')" class="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Xuất báo cáo tài chính</button>
        </div>`)}
    </div></div>`;
};
