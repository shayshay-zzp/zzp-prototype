/* ZZP Page Renderers */
const PAGES = {};

function card(title, body, cls = '') {
  const t = typeof viLabel === 'function' ? viLabel(title) : title;
  return `<div class="bg-white rounded-xl border border-slate-200 shadow-sm ${cls}"><div class="px-5 py-4 border-b border-slate-100"><h3 class="font-semibold text-slate-800">${t}</h3></div><div class="p-5">${body}</div></div>`;
}

function statCard(label, value, sub = '', color = 'zzp') {
  const l = typeof viLabel === 'function' ? viLabel(label) : label;
  const s = sub && typeof viLabel === 'function' ? viLabel(sub) : sub;
  const colors = { zzp: 'bg-zzp-50 text-zzp-700', red: 'bg-red-50 text-red-700', amber: 'bg-amber-50 text-amber-700', blue: 'bg-blue-50 text-blue-700', green: 'bg-green-50 text-green-700' };
  return `<div class="bg-white rounded-xl border border-slate-200 p-5"><p class="text-sm text-slate-500 mb-1">${l}</p><p class="text-2xl font-bold text-slate-800">${value}</p>${s ? `<p class="text-xs mt-1 ${colors[color]?.split(' ')[1] || 'text-slate-500'}">${s}</p>` : ''}</div>`;
}

function badge(text, type = 'default') {
  const display = typeof viBadge === 'function' ? viBadge(text, type) : text;
  const styles = {
    active: 'bg-green-100 text-green-700', pending: 'bg-amber-100 text-amber-700', critical: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700', info: 'bg-blue-100 text-blue-700', default: 'bg-slate-100 text-slate-600',
    ok: 'bg-green-100 text-green-700', review: 'bg-purple-100 text-purple-700', paused: 'bg-slate-100 text-slate-600',
    low_stock: 'bg-red-100 text-red-700', connected: 'bg-green-100 text-green-700', synced: 'bg-green-100 text-green-700',
    live: 'bg-green-100 text-green-700', partial: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700', new: 'bg-blue-100 text-blue-700', in_progress: 'bg-zzp-100 text-zzp-700'
  };
  return `<span class="px-2 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.default}">${display}</span>`;
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
    ${layoutPrdBadge('products')}
    ${chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md']], 1)}
    ${card('Product Status Monitor', renderProductLifecycleMonitor())}</div>`;
};

PAGES.orders = () => {
  return `<div>${pageHeader('Vận hành','Order Center & SLA Monitoring','Theo dõi vòng đời đơn hàng và chất lượng vận hành')}
    ${renderTtsMetricsStrip('orders')}
    ${layoutPrdBadge('orders')}
    ${card('Order Center — SLA Board', renderOrderSlaBoard())}</div>`;
};

PAGES.inventory = () => {
  return `<div>${pageHeader('Vận hành','Inventory Monitor & Stock Alert','Quản lý tồn kho, tốc độ bán và cảnh báo thiếu hàng')}
    ${renderTtsMetricsStrip('inventory')}
    ${layoutPrdBadge('inventory')}
    ${card('Stock Gauge Monitor', renderInventoryGaugeCards())}
    <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3"><span class="shrink-0 mt-0.5">${iconBox('triangle-alert', 18, 'bg-red-100 text-red-600')}</span><div><p class="font-semibold text-red-800">Cảnh báo: Mặt nạ Collagen (P003)</p><p class="text-sm text-red-700 mt-1">Chỉ còn 45 sp — hết hàng dự kiến trong 2 ngày. <button onclick="runAutomationFlow('FLOW_STOCK')" class="underline font-medium inline-flex items-center gap-1">${icon('play', 12)} Chạy quy trình nhập hàng</button></p></div></div></div>`;
};

PAGES.returns = () => {
  return `<div>${pageHeader('Vận hành','Return & Cancellation Center','Theo dõi hoàn hàng, hủy đơn và nguyên nhân thất thoát doanh thu')}
    ${renderTtsMetricsStrip('returns')}
    ${layoutPrdBadge('returns')}
    ${card('Return & Cancellation Cases', renderReturnsCaseTimeline())}</div>`;
};

PAGES.affiliate = () => {
  const totalGmv = ZZP_DATA.kocs.reduce((s,k)=>s+k.gmv30d,0);
  return `<div>${pageHeader('Vận hành','Affiliate Center & SAM Strategy','Quản lý chiến dịch Affiliate và hiệu suất từng nguồn doanh thu')}
    ${renderTtsMetricsStrip('affiliate')}
    ${layoutPrdBadge('affiliate')}
    ${renderAffiliateSamFunnel()}
    ${card('Creator Performance — Marketplace API', renderTtsBreakdownTable('affiliate'))}
    ${chartGrid([
      ['GMV theo KOC', 'chart-affiliate', 'md'],
      ['Phân bổ tier KOC', 'chart-aff-tier', 'sm']
    ])}
    <div class="grid lg:grid-cols-2 gap-6 mt-6">
      ${card('Chiến dịch Affiliate', `
        <div class="space-y-3">${ZZP_DATA.campaigns.filter(c=>c.type==='affiliate'||c.type==='promotion').map(c => `
          <button type="button" onclick="openDetail('campaign','${c.id}')" class="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-rose-300 flex justify-between items-center gap-3">
            <div><p class="font-medium text-sm">${c.name}</p><p class="text-xs text-slate-500">${fmt(c.spent)} / ${fmt(c.budget)}</p></div>
            <div class="text-right"><p class="font-bold text-green-600">${(c.gmv/c.spent).toFixed(1)}x</p><p class="text-xs">${fmt(c.gmv)} GMV</p></div>
          </button>`).join('')}</div>`)}
    </div></div>`;
};

PAGES.koc = () => {
  return `<div>${pageHeader('Vận hành','KOC CRM & Lifecycle Tracking','Quản lý vòng đời KOC từ tuyển chọn, gửi mẫu đến tạo doanh thu')}
    ${renderTtsMetricsStrip('koc')}
    ${layoutPrdBadge('koc')}
    ${card('KOC Lifecycle Pipeline', renderKocCrmPipeline())}
    <p class="text-xs text-slate-500 mt-4 text-center">Phân tích chi tiết → <button type="button" onclick="navigate('creator-analytics')" class="text-zzp-600 hover:underline">KOC Scorecard</button></p></div>`;
};

PAGES.agency = () => {
  return `<div>${pageHeader('Vận hành','Agency Management & ROI','Theo dõi hiệu quả Agency và chi phí hợp tác')}
    ${layoutPrdBadge('agency')}
    ${renderAgencyPortfolioCards()}</div>`;
};

PAGES.samples = () => {
  return `<div>${pageHeader('Vận hành','Sample Tracking & Sample ROI','Quản lý gửi mẫu và đánh giá hiệu quả đầu tư mẫu')}
    ${renderTtsMetricsStrip('samples')}
    ${layoutPrdBadge('samples')}
    ${renderSampleRoiPipeline()}</div>`;
};

PAGES.content = () => {
  return `<div>${pageHeader('Vận hành','Content Calendar & Task Manager','Quản lý kế hoạch nội dung và vòng đời video Affiliate')}
    ${renderTtsMetricsStrip('content')}
    ${layoutPrdBadge('content')}
    ${card('Content Operations', renderContentCalendar())}</div>`;
};

PAGES.livestream = () => {
  return `<div>${pageHeader('Vận hành','Livestream Operations','Theo dõi hoạt động livestream và doanh thu phát sinh')}
    ${renderTtsMetricsStrip('livestream')}
    ${card('Live Performance — Analytics API', renderTtsBreakdownTable('livestream'))}
    ${ZZP_DATA.liveSessions.map(l => { const koc = ZZP_DATA.kocs.find(k=>k.id===l.host);
      return card(`${l.title}`, `
        <div class="grid lg:grid-cols-2 gap-4">
          <div><p class="text-sm text-slate-500">Host: <button type="button" onclick="openDetail('koc','${l.host}')" class="text-zzp-600 hover:underline font-medium">${koc?.name}</button> · ${l.date} · ${l.duration} phút</p>
          <p class="mt-2">Live Checklist: <span class="font-semibold">${l.checklistDone}/${l.checklistTotal}</span></p>
          <div class="mt-2 h-2 bg-slate-100 rounded-full"><div class="h-2 bg-zzp-500 rounded-full" style="width:${l.checklistDone/l.checklistTotal*100}%"></div></div>
          <div class="mt-4 space-y-1 text-sm">${['Script & sản phẩm','Flash sale setup','Voucher live-only','Pin sản phẩm Hero','Test stream','Backup internet','Moderator','Post-live report'].map((item,i)=>`<label class="flex gap-2"><input type="checkbox" ${i<l.checklistDone?'checked':''} disabled class="rounded"> ${item}</label>`).join('')}</div></div>
          <div class="text-center p-4 bg-slate-50 rounded-xl"><p class="text-sm text-slate-500">GMV live trước</p><p class="text-2xl font-bold text-zzp-700">${fmt(l.pastGmv)}</p><p class="text-sm text-slate-500 mt-4">Dự kiến lần này</p><p class="text-xl font-bold">${fmt(l.expectedGmv)}</p></div>
        </div>`); }).join('')}</div>`;
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
    ${chartGrid([['ROAS theo chiến dịch', 'chart-ads-roas', 'sm'], ['Chi tiêu Ads', 'chart-ads-spend', 'sm']])}
    ${card('Ads Campaigns — GMV Max & Reporting', renderTtsBreakdownTable('ads'))}
    <div class="mt-6">${card('Spark Ads Wizard — Gợi ý', `
      <div class="p-4 bg-green-50 rounded-xl border border-green-100"><p class="font-medium flex items-center gap-2">${icon('trending-up',16,'text-green-600')} Scale: Spark Ads Serum VC (ROAS 3.8x)</p><p class="text-sm text-slate-600 mt-1">Tăng budget 30% · Gắn video V001 · Target lookalike K001</p><button onclick="showToast('Đã tạo action: Tăng budget AD001')" class="mt-2 text-sm text-green-700 hover:underline">Thực hiện</button></div>
      <div class="p-4 bg-red-50 rounded-xl border border-red-100 mt-3"><p class="font-medium flex items-center gap-2">${icon('pause-circle',16,'text-red-600')} Pause: Product Ads Mặt nạ (ROAS 1.2x)</p><p class="text-sm text-slate-600 mt-1">Chuyển ngân sách sang Affiliate K002</p><button onclick="pauseAd('AD002')" class="mt-2 text-sm text-red-700 hover:underline">Pause ngay</button></div>`)}</div></div>`;
};

/* ===== PHASE 3 ===== */
PAGES.executive = () => {
  const p = calcProfit();
  return `<div>${pageHeader('Phân tích','Executive Dashboard','Tổng hợp toàn bộ tình hình kinh doanh trên một màn hình')}
    ${renderTtsMetricsStrip('executive')}
    <div class="grid lg:grid-cols-2 gap-6">
      ${card('Revenue Trend', '<div class="chart-box"><canvas id="chart-executive"></canvas></div>')}
      ${card('GMV Breakdown — Shop Performance API', renderTtsBreakdownTable('executive'))}
    </div></div>`;
};

PAGES.revenue = () => {
  const r = ZZP_DATA.revenueBreakdown;
  return `<div>${pageHeader('Phân tích','Revenue Intelligence & Attribution','Phân tích doanh thu theo nguồn và xác định yếu tố tạo doanh thu')}
    ${renderTtsMetricsStrip('revenue')}
    ${card('GMV Breakdown — Content Type', renderTtsBreakdownTable('revenue'))}
    ${card('Attribution Analysis', '<div class="chart-box"><canvas id="chart-attribution"></canvas></div>')}
    <div class="mt-6">${card('Revenue by Product × Source', tableWrap(['Sản phẩm','Organic','Affiliate','Ads','Live','Tổng'],
      ZZP_DATA.products.filter(p=>p.hero).map(p => { const share = p.sold30d * p.price;
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(share*0.15)}</td><td class="px-3">${fmt(share*0.38)}</td><td class="px-3">${fmt(share*0.12)}</td><td class="px-3">${fmt(share*0.35)}</td><td class="px-3 font-semibold">${fmt(share)}</td></tr>`; }).join('')))}</div></div>`;
};

PAGES.profit = () => {
  const p = calcProfit();
  return `<div>${pageHeader('Phân tích','P&L Dashboard & Margin Analytics','Tính toán lợi nhuận thực sau khi trừ toàn bộ chi phí vận hành')}
    ${renderTtsMetricsStrip('profit')}
    ${card('Finance API — Settlement & Fees', renderTtsFinanceStrip())}
    ${card('P&L Breakdown', '<div class="chart-box"><canvas id="chart-pnl"></canvas></div>')}
    <div class="mt-6">${card('Profit by Product', tableWrap(['Sản phẩm','GMV','COGS','Chi phí phân bổ','Lợi nhuận','Margin'],
      ZZP_DATA.products.filter(p=>p.hero).map(p => { const gmv = p.sold30d * p.price; const cogs = p.sold30d * p.cost; const other = gmv * 0.18; const profit = gmv - cogs - other;
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(gmv)}</td><td class="px-3">${fmt(cogs)}</td><td class="px-3">${fmt(other)}</td><td class="px-3 font-semibold text-green-600">${fmt(profit)}</td><td class="px-3">${(profit/gmv*100).toFixed(1)}%</td></tr>`; }).join('')))}</div></div>`;
};

PAGES.costs = () => {
  const c = ZZP_DATA.costs;
  return `<div>${pageHeader('Phân tích','Cost Intelligence','Theo dõi và phân tích toàn bộ cấu trúc chi phí')}
    ${renderTtsMetricsStrip('costs')}
    ${chartGrid([['Cấu trúc chi phí', 'chart-costs-detail', 'md'], ['% chi phí / GMV', 'chart-costs-pct', 'sm']])}
    ${card('Cost Structure Detail', tableWrap(['Loại chi phí','Số tiền','% GMV','Trend'],
      Object.entries({COGS:c.cogs,'Vận chuyển':c.shipping,'Commission Affiliate':c.commission,'Quảng cáo':c.ads,'Voucher':c.voucher,'Sample':c.sample,'Agency Fee':c.agency,'Platform Fee':c.platform}).map(([k,v]) =>
        `<tr class="border-b border-slate-50"><td class="py-3 px-3">${k}</td><td class="px-3">${fmt(v)}</td><td class="px-3">${(v/ZZP_DATA.revenueBreakdown.total*100).toFixed(1)}%</td><td class="px-3">${k==='Quảng cáo'?badge('↑ 12%','warning'):badge('→ ổn định','ok')}</td></tr>`).join('')))}</div>`;
};

PAGES['product-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Product Intelligence & SKU Ranking','Đánh giá hiệu suất và khả năng tăng trưởng từng sản phẩm')}
    ${renderTtsMetricsStrip('product-analytics')}
    ${chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md'], ['Margin top SKU', 'chart-product-margin', 'sm']])}
    ${card('SKU Performance — Product Analytics API', renderTtsBreakdownTable('product-analytics'))}
    ${card('SKU Ranking', tableWrap(['#','Sản phẩm','GMV 30d','Units','Margin','Velocity','Score','Action'],
      [...ZZP_DATA.products].sort((a,b)=>(b.sold30d*b.price)-(a.sold30d*a.price)).map((p,i) => {
        const gmv = p.sold30d * p.price; const margin = ((p.price-p.cost)/p.price*100).toFixed(0);
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-bold">${i+1}</td><td class="px-3"><div class="flex items-center gap-2">${productThumb(p,14)} ${p.name}</div></td><td class="px-3 font-semibold">${fmt(gmv)}</td><td class="px-3">${p.sold30d}</td><td class="px-3">${margin}%</td><td class="px-3">${Math.round(p.sold30d/30)}/ngày</td><td class="px-3">${p.listingScore}</td><td class="px-3">${i<2?badge('Scale','ok'):i===6?badge('Optimize','warning'):badge('Maintain','info')}</td></tr>`; }).join('')))}</div>`;
};

PAGES['affiliate-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Affiliate Analytics & Contribution','Đánh giá mức độ đóng góp Affiliate vào doanh thu')}
    ${renderTtsMetricsStrip('affiliate-analytics')}
    ${card('Creator Marketplace Performance', renderTtsBreakdownTable('affiliate-analytics'))}
    ${card('Affiliate Contribution', '<div class="chart-box"><canvas id="chart-aff-contrib"></canvas></div>')}
    <div class="mt-6">${card('Campaign ROI Comparison', tableWrap(['Chiến dịch','Spent','GMV','ROI','Commission','Net Profit'],
      ZZP_DATA.campaigns.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3">${c.name}</td><td class="px-3">${fmt(c.spent)}</td><td class="px-3">${fmt(c.gmv)}</td><td class="px-3 font-semibold">${(c.gmv/c.spent).toFixed(1)}x</td><td class="px-3">${fmt(c.gmv*0.12)}</td><td class="px-3 text-green-600">${fmt(c.gmv-c.spent-c.gmv*0.12-c.gmv*0.3)}</td></tr>`).join('')))}</div></div>`;
};

PAGES['creator-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','KOC Scorecard & Creator Ranking','Xếp hạng KOC dựa trên GMV, ROI và CVR')}
    ${renderTtsMetricsStrip('creator-analytics')}
    ${layoutPrdBadge('creator-analytics')}
    ${card('Creator Scorecards', renderCreatorScorecardGrid())}
    <p class="text-xs text-slate-500 mt-4 text-center">Quản lý pipeline → <button type="button" onclick="navigate('koc')" class="text-zzp-600 hover:underline">KOC CRM</button></p></div>`;
};

PAGES['content-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Content Intelligence & Pattern Analysis','Xác định nội dung bán hàng hiệu quả và mô hình thành công')}
    ${renderTtsMetricsStrip('content-analytics')}
    ${chartGrid([['CVR theo video', 'chart-content-cvr', 'sm'], ['Views theo video', 'chart-content-views', 'sm']])}
    ${card('Video Performance', tableWrap(['Video','KOC','Views','Orders','GMV','CTR','CVR','Pattern'],
      ZZP_DATA.content.filter(v=>v.status==='published').map(v => { const koc = ZZP_DATA.kocs.find(k=>k.id===v.koc); const cvr = v.views ? (v.orders/v.views*100).toFixed(2) : 0;
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3 text-sm font-medium">${v.title}</td><td class="px-3">${koc?.name}</td><td class="px-3">${fmt(v.views)}</td><td class="px-3">${v.orders}</td><td class="px-3">${fmt(v.gmv)}</td><td class="px-3">${v.ctr}%</td><td class="px-3">${cvr}%</td><td class="px-3">${v.type==='livestream'?'Live Sale':v.title.includes('Routine')?'Routine Format':'Review'}</td></tr>`; }).join('')))}
    <div class="mt-6">${card('Content Pattern Analysis', `
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="p-4 bg-green-50 rounded-xl"><p class="font-semibold text-green-800 flex items-center gap-2">${icon('trophy',16)} Top Pattern: Routine 3 bước</p><p class="text-sm mt-2">CVR 4.2% · Avg GMV 98M · Nên nhân rộng</p></div>
        <div class="p-4 bg-blue-50 rounded-xl"><p class="font-semibold text-blue-800 flex items-center gap-2">${icon('radio',16)} Livestream Flash Sale</p><p class="text-sm mt-2">CVR 6.8% · Peak conversion · Book thêm 2 live/tháng</p></div>
        <div class="p-4 bg-amber-50 rounded-xl"><p class="font-semibold text-amber-800">📝 Review Format</p><p class="text-sm mt-2">CVR 2.1% · Trust builder · Combine với voucher</p></div>
      </div>`)}</div></div>`;
};

PAGES['live-analytics'] = () => {
  return `<div>${pageHeader('Phân tích','Livestream Analytics & Session Performance','Phân tích hiệu quả từng phiên livestream')}
    ${renderTtsMetricsStrip('live-analytics')}
    ${card('Live Session — Per Minute API', renderTtsBreakdownTable('live-analytics'))}
    ${chartGrid([['GMV live session', 'chart-live-gmv', 'sm'], ['Đơn live', 'chart-live-orders', 'sm']])}
    ${card('Live Session Performance', tableWrap(['Session','Host','Views','Duration','Orders','GMV','GMV/giờ','Conversion'],
      ZZP_DATA.content.filter(v=>v.type==='livestream').map(v => { const koc = ZZP_DATA.kocs.find(k=>k.id===v.koc);
        return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${v.title}</td><td class="px-3">${koc?.name}</td><td class="px-3">${fmt(v.views)}</td><td class="px-3">120 phút</td><td class="px-3">${v.orders}</td><td class="px-3 font-semibold">${fmt(v.gmv)}</td><td class="px-3">${fmt(v.gmv/2)}</td><td class="px-3">${v.ctr}%</td></tr>`; }).join('')))}</div>`;
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
  return `<div>${pageHeader('Tối ưu','Quy tắc tự động','Tự động hóa báo cáo, cảnh báo và quy trình vận hành')}
    ${chartGrid([['Lần chạy quy tắc', 'chart-rule-runs', 'sm'], ['Quy tắc bật/tắt', 'chart-rule-active', 'sm']])}
    ${card('Quy tắc tự động', ZZP_DATA.automationRules.map(r => `
      <div class="flex items-center justify-between py-4 border-b border-slate-50">
        <div><p class="font-medium">${r.name}</p><p class="text-xs text-slate-500 mt-1">Khi ${humanTrigger(r.trigger)} → ${r.action}</p><p class="text-xs text-slate-400">Đã chạy ${r.runs} lần</p></div>
        <label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" ${r.active?'checked':''} onchange="toggleRule('${r.id}')" class="sr-only peer"><div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zzp-600"></div></label>
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
  return `<div>${pageHeader('Tối ưu', 'Trung tâm quy trình', 'Các quy trình tự động giúp xử lý tình huống vận hành hàng ngày')}
    <div class="grid lg:grid-cols-3 gap-4 mb-6">
      ${statCard('Quy trình', AUTOMATION_FLOWS.length)}${statCard('Quy tắc đang bật', ZZP_DATA.automationRules.filter(r=>r.active).length)}${statCard('Đã chạy', ZZP_DATA.automationRules.reduce((s,r)=>s+r.runs,0) + ' lần')}
    </div>
    <div class="space-y-4">${AUTOMATION_FLOWS.map(f => `
      <div class="bg-white rounded-xl border border-slate-200 p-5 hover:border-zzp-300 hover:shadow-sm transition-all cursor-pointer" onclick="openDetail('flow','${f.id}')">
        <div class="flex items-start justify-between gap-4">
          <div class="flex gap-3"><span class="flex shrink-0">${iconBox(FLOW_ICONS[f.id] || 'workflow', 22, 'bg-zzp-50 text-zzp-600')}</span>
            <div><p class="font-bold">${f.name}</p><p class="text-sm text-slate-500 mt-1">${f.desc}</p>
              <p class="text-xs text-amber-600 mt-2 flex items-center gap-1">${icon('zap',12)} ${humanTrigger(f.trigger)}</p>
              <div class="flex flex-wrap gap-1 mt-2" onclick="event.stopPropagation()">${f.modules.map(m => `<button type="button" onclick="navigate('${m}')" class="text-[10px] px-2 py-0.5 bg-zzp-50 text-zzp-700 rounded-full hover:bg-zzp-100">${viPage(m)}</button>`).join('')}</div>
            </div>
          </div>
          <div class="flex flex-col gap-2 shrink-0" onclick="event.stopPropagation()">
            <button type="button" onclick="openDetail('flow','${f.id}')" class="px-3 py-2 border border-slate-200 rounded-lg text-xs">Chi tiết</button>
            <button type="button" onclick="runAutomationFlow('${f.id}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm hover:bg-zzp-700 inline-flex items-center gap-1">${icon('play',14)} Chạy</button>
          </div>
        </div>
        <div class="mt-4 grid lg:grid-cols-${Math.min(f.steps.length, 6)} gap-2" onclick="event.stopPropagation()">
          ${f.steps.map((s, i) => `<button type="button" onclick="navigate('${s.module}')" class="p-2 bg-slate-50 rounded-lg text-center hover:bg-zzp-50 hover:border-zzp-200 border border-transparent"><p class="text-[10px] text-zzp-600 font-bold">${i+1}</p><p class="text-xs mt-1 leading-tight">${s.label}</p><p class="text-[10px] text-slate-400">${viPage(s.module)}</p></button>`).join('')}
        </div>
      </div>`).join('')}
    </div></div>`;
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
