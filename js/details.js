/* Trang chi tiết entity — drill-down 1:1 */
const DETAIL_RENDERERS = {
  product: (id) => {
    const p = getProduct(id);
    if (!p) return notFound('Sản phẩm', id);
    const m = getProductMetrics(id);
    const gmv = m ? m.gmv : p.sold30d * p.price;
    const margin = ((p.price - p.cost) / p.price * 100).toFixed(1);
    const orders = ZZP_DATA.orders.filter(o => o.product === id);
    const kocSales = ZZP_DATA.kocs.filter(k => orders.some(o => o.koc === k.id));
    const relatedContent = ZZP_DATA.content.filter(c => c.title.toLowerCase().includes(p.name.split(' ')[0].toLowerCase()) || c.title.includes(p.category));
    const alerts = ZZP_DATA.alerts.filter(a => a.desc.includes(p.name.split(' ')[0]) || (a.module === 'inventory' && p.stock < 100));
    const flows = getFlowsForModule('products').concat(getFlowsForModule('inventory'));

    return detailLayout('product', id, `<span class="inline-flex items-center gap-2">${productThumb(p, 20)} ${p.name}</span>`, 'products', `
      <div class="grid lg:grid-cols-6 gap-3 mb-6">
        ${statCard('Doanh thu gộp 30 ngày', fmt(gmv))}${statCard('Đơn hàng', m ? m.orders : p.sold30d)}
        ${statCard('CTR', m ? m.ctr + '%' : '—')}${statCard('CVR', m ? m.avgConversionRate + '%' : '—')}
        ${statCard('Lượt hiển thị', m ? fmt(m.impressions) : '—')}${statCard('Biên lợi nhuận', margin + '%')}
      </div>
      ${m ? card('API hiệu suất — GMV theo kênh nội dung', `
        <div class="grid grid-cols-3 gap-3 text-sm mb-4">
          ${['VIDEO', 'LIVE', 'PRODUCT_CARD'].map(t => `
            <div class="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <p class="text-[10px] text-slate-500 uppercase">${t === 'PRODUCT_CARD' ? 'Thẻ sản phẩm' : t}</p>
              <p class="font-bold text-zzp-700 mt-1">${fmt(m.breakdown[t].gmv)}</p>
              <p class="text-xs text-slate-500">${m.breakdown[t].itemsSold} sp · ${((m.breakdown[t].gmv / m.gmv) * 100).toFixed(0)}%</p>
            </div>`).join('')}
        </div>
        <div class="grid grid-cols-4 gap-2 text-xs">
          <div class="p-2 bg-red-50 rounded"><p class="text-slate-500">Hoàn trả</p><p class="font-bold">${m.returned}</p></div>
          <div class="p-2 bg-amber-50 rounded"><p class="text-slate-500">Đã hủy</p><p class="font-bold">${m.canceled}</p></div>
          <div class="p-2 bg-slate-50 rounded"><p class="text-slate-500">Hoàn tiền</p><p class="font-bold">${m.refunded}</p></div>
          <div class="p-2 bg-blue-50 rounded"><p class="text-slate-500">Lượt xem trang</p><p class="font-bold">${fmt(m.pageViews)}</p></div>
        </div>`) : ''}
      <div class="grid lg:grid-cols-2 gap-6">
        ${card('Thông tin SKU', `
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><span class="text-slate-500">SKU</span><p class="font-medium">${p.sku}</p></div>
            <div><span class="text-slate-500">Giá bán</span><p class="font-medium">${fmtCurrency(p.price)}</p></div>
            <div><span class="text-slate-500">Giá vốn</span><p class="font-medium">${fmtCurrency(p.cost)}</p></div>
            <div><span class="text-slate-500">Điểm tin đăng</span><p class="font-medium">${p.listingScore}% ${badge(p.status, p.status)}</p></div>
            <div><span class="text-slate-500">SKU chủ lực</span><p>${p.hero ? 'Có' : 'Không'}</p></div>
            <div><span class="text-slate-500">Kênh</span><p>${p.channels.join(', ')}</p></div>
          </div>
          <div class="mt-4 flex gap-2">
            <button onclick="openListingCheck('${p.id}')" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs">Kiểm tra tin đăng</button>
            <button onclick="navigate('product-analytics')" class="px-3 py-1.5 border rounded-lg text-xs">Phân tích →</button>
          </div>`)}
        ${card('Đơn hàng liên quan (' + orders.length + ')', orders.slice(0, 5).map(o =>
          `<div class="flex justify-between py-2 border-b border-slate-50 text-sm cursor-pointer hover:bg-slate-50 px-1 rounded" onclick="openDetail('order','${o.id}')">
            <span>${o.id} · ${o.customer}</span><span>${fmtCurrency(o.total)} ${badge(o.status, o.status)}</span>
          </div>`).join('') || '<p class="text-sm text-slate-500">Chưa có đơn</p>')}
        ${card('KOC bán sản phẩm', kocSales.map(k =>
          `<div class="flex justify-between py-2 border-b border-slate-50 text-sm cursor-pointer hover:bg-slate-50" onclick="openDetail('koc','${k.id}')">
            <span>${k.name}</span><span>${fmt(k.gmv30d)} · ROI ${k.roi}x</span></div>`).join('') || '<p class="text-sm text-slate-500">Chưa có KOC</p>')}
        ${card('Nội dung liên quan', relatedContent.map(v =>
          `<div class="py-2 border-b border-slate-50 text-sm"><p class="font-medium">${v.title}</p><p class="text-xs text-slate-500">${fmt(v.views)} lượt xem · ${fmt(v.gmv)} GMV</p></div>`).join('') || '<p class="text-sm text-slate-500">Chưa có nội dung</p>')}
      </div>
      ${alerts.length ? `<div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"><p class="font-semibold text-red-800">Cảnh báo liên quan</p>${alerts.map(a => `<p class="text-sm text-red-700 mt-1">${a.title}</p>`).join('')}</div>` : ''}
      ${renderDetailFlows(flows)}
    `);
  },

  order: (id) => {
    const o = ZZP_DATA.orders.find(x => x.id === id);
    if (!o) return notFound('Đơn hàng', id);
    const p = getProduct(o.product);
    const koc = o.koc ? ZZP_DATA.kocs.find(k => k.id === o.koc) : null;
    const ret = ZZP_DATA.returns.find(r => r.orderId === id);

    return detailLayout('order', id, `Đơn ${o.id}`, 'orders', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Tổng tiền', fmtCurrency(o.total))}${statCard('SLA', o.sla, o.sla !== 'ok' ? 'Cần xử lý' : 'Ổn định', o.sla !== 'ok' ? 'red' : 'green')}${statCard('Nguồn', o.source)}${statCard('Trạng thái', o.status)}
      </div>
      <div class="grid lg:grid-cols-2 gap-6">
        ${card('Chi tiết đơn hàng', `
          <div class="space-y-3 text-sm">
            <div class="flex justify-between"><span class="text-slate-500">Khách hàng</span><span>${o.customer}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Sản phẩm</span><button class="text-zzp-600 hover:underline" onclick="openDetail('product','${o.product}')">${o.productName}</button></div>
            <div class="flex justify-between"><span class="text-slate-500">Số lượng</span><span>${o.qty}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Thời gian</span><span>${o.created}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Nguồn doanh thu</span>${badge(o.source, 'info')}</div>
            ${koc ? `<div class="flex justify-between"><span class="text-slate-500">KOC</span><button class="text-zzp-600 hover:underline" onclick="openDetail('koc','${koc.id}')">${koc.name}</button></div>` : ''}
          </div>
          <div class="mt-4 flex gap-2">
            ${o.status === 'pending' ? `<button onclick="processOrder('${o.id}');openDetail('order','${o.id}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Xử lý đơn</button>` : ''}
            <button onclick="runAutomationFlow('FLOW_ORDER_SLA')" class="px-4 py-2 border rounded-lg text-sm">Chạy quy trình SLA →</button>
          </div>`)}
        ${card('Dòng thời gian vận hành', `
          <div class="space-y-3">
            ${['pending','processing','shipped','delivered'].map((s, i) => {
              const order = ['pending','processing','shipped','delivered','return_requested','cancelled'];
              const idx = order.indexOf(o.status);
              const sIdx = ['pending','processing','shipped','delivered'].indexOf(s);
              const done = idx >= sIdx && o.status !== 'cancelled';
              return `<div class="flex gap-3 items-center"><span class="w-8 h-8 rounded-full flex items-center justify-center text-sm ${done?'bg-green-500 text-white':'bg-slate-100'}">${done?'✓':i+1}</span><span class="text-sm ${done?'font-medium':''}">${{pending:'Chờ xử lý',processing:'Đang đóng gói',shipped:'Đang giao',delivered:'Đã giao'}[s]}</span></div>`;
            }).join('')}
          </div>`)}
        ${ret ? card('Hoàn trả / Hủy', `<p class="text-sm"><strong>${ret.id}</strong> · ${ret.reason}</p><p class="text-sm mt-2">${fmtCurrency(ret.amount)} · ${badge(ret.status, ret.status)}</p>`) : ''}
      </div>
    `);
  },

  koc: (id) => {
    const k = ZZP_DATA.kocs.find(x => x.id === id);
    if (!k) return notFound('KOC', id);
    const cm = getCreatorMetrics(id);
    const samples = ZZP_DATA.samples.filter(s => s.koc === id);
    const videos = ZZP_DATA.content.filter(c => c.koc === id);
    const orders = ZZP_DATA.orders.filter(o => o.koc === id);

    return detailLayout('koc', id, k.name, 'koc', `
      <div class="grid lg:grid-cols-6 gap-3 mb-6">
        ${statCard('Doanh thu gộp 30 ngày', fmt(cm ? cm.gmv : k.gmv30d))}${statCard('ROI', k.roi ? k.roi + 'x' : '-')}
        ${statCard('GPM', cm ? fmt(cm.gpm) : '—')}${statCard('PPS', cm ? cm.pps : k.score)}
        ${statCard('Video GMV', cm ? fmt(cm.videoGmv) : '—')}${statCard('Live GMV', cm ? fmt(cm.liveGmv) : '—')}
      </div>
      ${cm ? card('API hiệu suất nhà sáng tạo', `
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Số lượng bán</p><p class="font-bold">${cm.unitsSold}</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">GMV TB/khách</p><p class="font-bold">${fmtCurrency(cm.avgGmvPerBuyer)}</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Tỷ lệ hoa hồng</p><p class="font-bold">${cm.avgCommissionRate}%</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Tương tác EC</p><p class="font-bold">${(cm.ecLiveEngagementRate / 100).toFixed(1)}%</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Video GPM</p><p class="font-bold">${fmt(cm.videoGpm)}</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Live GPM</p><p class="font-bold">${fmt(cm.liveGpm)}</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Video EC</p><p class="font-bold">${cm.ecVideoCount}</p></div>
          <div class="p-3 rounded-lg border"><p class="text-slate-500 text-xs">Tỷ lệ đăng</p><p class="font-bold">${cm.postRate}%</p></div>
        </div>`) : ''}
      <div class="grid lg:grid-cols-2 gap-6">
        ${card('Hồ sơ nhà sáng tạo', `
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-slate-500">Hạng</span><span>${k.tier}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Người theo dõi</span><span>${fmt(k.followers)}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Vòng đời</span>${badge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info')}</div>
            <div class="flex justify-between"><span class="text-slate-500">Hoa hồng</span><span>${k.commission}%</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Video</span><span>${k.videos}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Mẫu đã gửi</span><span>${k.samplesSent}</span></div>
          </div>`)}
        ${card('Luồng vòng đời', `
          <div class="flex gap-1 mb-4">${['prospect','sample','content','revenue'].map((l, i) => {
            const stages = ['prospect','sample','content','revenue'];
            const idx = stages.indexOf(k.lifecycle);
            return `<div class="flex-1 h-2 rounded-full ${i<=idx?'bg-zzp-500':'bg-slate-100'}"></div>`;
          }).join('')}</div>
          <p class="text-xs text-slate-500">Tuyển chọn → Gửi mẫu → Nội dung → Doanh thu</p>
          <button onclick="runAutomationFlow('FLOW_SAMPLE')" class="mt-4 text-sm text-zzp-600 hover:underline">Chạy quy trình mẫu → doanh thu →</button>`)}
        ${card('Video (' + videos.length + ')', videos.map(v =>
          `<div class="py-2 border-b text-sm"><p class="font-medium">${v.title}</p><p class="text-xs text-slate-500">${fmt(v.views)} lượt xem · ${fmt(v.gmv)} GMV · ${badge(v.status, v.status)}</p></div>`).join('') || '<p class="text-sm text-slate-500">Chưa có video</p>')}
        ${card('Mẫu gửi (' + samples.length + ')', samples.map(s => {
          const prod = getProduct(s.product);
          return `<div class="py-2 border-b text-sm flex justify-between"><span>${prod?.name}</span><span>${badge(s.status, s.status==='converted'?'ok':'pending')} ROI ${s.roi?s.roi+'x':'-'}</span></div>`;
        }).join('') || '<p class="text-sm text-slate-500">Chưa gửi mẫu</p>')}
      </div>
    `);
  },

  campaign: (id) => {
    const c = ZZP_DATA.campaigns.find(x => x.id === id);
    if (!c) return notFound('Chiến dịch', id);
    const products = c.products.map(pid => getProduct(pid)).filter(Boolean);
    return detailLayout('campaign', id, c.name, 'campaigns', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Ngân sách', fmt(c.budget))}${statCard('Đã chi', fmt(c.spent))}${statCard('GMV', fmt(c.gmv))}${statCard('ROI', (c.gmv / c.spent).toFixed(1) + 'x', '', 'green')}
      </div>
      ${card('Chi tiết chiến dịch', `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-slate-500">Loại</span><span>${c.type}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Giảm giá</span><span>${c.discount ? c.discount + '%' : '-'}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Thời gian</span><span>${c.start} → ${c.end}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Trạng thái</span>${badge(c.status, 'active')}</div>
        </div>
        <p class="text-sm font-medium mt-4 mb-2">Sản phẩm tham gia:</p>
        ${products.map(p => `<button onclick="openDetail('product','${p.id}')" class="flex items-center gap-2 text-sm text-zzp-600 hover:underline">${productThumb(p,14)} ${p.name}</button>`).join('')}
      `)}
    `);
  },

  policy: (id) => {
    const pol = ZZP_DATA.policies.find(x => x.id === id);
    if (!pol) return notFound('Chính sách', id);
    return detailLayout('policy', id, pol.title, 'compliance', `
      ${card('Đánh giá tác động AI', `
        <div class="mb-4">${badge(pol.impact, pol.impact)} ${badge(pol.status, pol.status === 'action_required' ? 'critical' : 'ok')}</div>
        <p class="text-sm text-slate-600">${pol.aiSummary}</p>
        <p class="text-xs text-slate-400 mt-2">Cập nhật: ${pol.date}</p>
        <div class="mt-4 flex gap-2">
          <button onclick="runAutomationFlow('FLOW_COMPLIANCE')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Chạy quy trình tuân thủ</button>
          ${pol.affected.map(pid => `<button onclick="openDetail('product','${pid}')" class="px-3 py-2 border rounded-lg text-xs">${getProduct(pid)?.name}</button>`).join('')}
        </div>`)}
    `);
  },

  alert: (id) => {
    const a = ZZP_DATA.alerts.find(x => x.id === id);
    if (!a) return notFound('Cảnh báo', id);
    const flow = alertToFlow(id);
    const ent = ALERT_ENTITY[id];
    return detailLayout('alert', id, a.title, 'alerts', `
      <div class="grid lg:grid-cols-3 gap-4 mb-6">
        ${statCard('Mức độ', a.severity)}${statCard('Mô-đun', viPage(a.module))}${statCard('Trạng thái', a.read ? 'Đã đọc' : 'Chưa xử lý', '', a.read ? 'green' : 'red')}
      </div>
      ${card('Mô tả vấn đề', `<p class="text-sm text-slate-600">${a.desc}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          ${ent ? `<button onclick="openDetail('${ent.type}','${ent.id}')" class="px-4 py-2 border border-zzp-200 text-zzp-700 rounded-lg text-sm">Xem ${viEntityType(ent.type)}: ${ent.id}</button>` : ''}
          ${flow ? `<button onclick="runAutomationFlow('${flow}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm inline-flex items-center gap-1">${icon('play',14)} ${a.action}</button>` : ''}
          <button onclick="markAlertRead('${id}');goBack()" class="px-4 py-2 border rounded-lg text-sm">Đánh dấu đã xử lý</button>
        </div>`)}
      ${flow ? card('Tự động xử lý', `<p class="text-sm text-slate-600 mb-3">ZZP đã kích hoạt xử lý cho vấn đề này.</p>
        <div class="space-y-2">${getAutomationOutputs(a.module).map(o => `<div class="flex justify-between text-sm py-1 border-b border-slate-50"><span class="text-slate-500">${o.l}</span><span class="font-medium">${o.v}</span></div>`).join('')}
        </div>
        <button onclick="runAutomationFlow('${flow}')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm inline-flex items-center gap-1">${icon('play',14)} ${a.action}</button>`) : ''}
    `);
  },

  flow: (id) => {
    let f = AUTOMATION_FLOWS.find(x => x.id === id);
    if (!f) f = Object.values(MODULE_FLOWS).find(x => x.id === id);
    if (!f) return notFound('Quy trình', id);
    const pageId = f.pageId || (f.modules && f.modules[0]) || 'workflows';
    return detailLayout('flow', id, f.name, 'workflows', `
      <div class="flex flex-wrap items-center gap-2 mb-3">${renderPlatformBadge(f.platform || 'cross')}${getFlowRule(f) ? `<span class="text-xs text-slate-500">${getFlowRule(f).name}</span>` : ''}</div>
      <p class="text-sm text-slate-500 mb-2">${f.desc}</p>
      <p class="text-xs text-amber-700 mb-4 flex items-center gap-1">${icon('zap', 12)} ${humanTrigger(f.trigger, f.triggerType)}</p>
      ${renderFlowSyncStrip()}
      ${renderWorkflowCardInline(f, true, pageId)}
      <div class="mt-4 flex gap-2">
        <button onclick="runAutomationFlow('${id}')" class="px-5 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium inline-flex items-center gap-2">${icon('play',16)} Thực thi trên TikTok</button>
        <button onclick="navigate('workflows')" class="px-4 py-2.5 border rounded-xl text-sm">Trung tâm tích hợp</button>
      </div>
      ${card('Mô-đun liên quan', f.modules.map(m => `<button onclick="navigate('${m}')" class="mr-2 mb-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs hover:bg-zzp-100">${viPage(m)}</button>`).join(''))}
    `);
  },

  insight: (id) => {
    const i = ZZP_DATA.aiInsights.find(x => x.id === id);
    if (!i) return notFound('Gợi ý AI', id);
    const flowMap = { AI001: 'FLOW_AI_ACTION', AI002: 'FLOW_ADS', AI003: 'FLOW_STOCK', AI004: 'FLOW_OPTIMIZE' };
    return detailLayout('insight', id, i.title, 'growth-assistant', `
      <div class="grid lg:grid-cols-3 gap-4 mb-6">
        ${statCard('Ưu tiên', '#' + i.priority)}${statCard('Độ tin cậy', i.confidence + '%')}${statCard('Tác động', i.impact, '', 'green')}
      </div>
      ${card('Phân tích AI', `<p class="text-sm text-slate-600">${i.desc}</p>
        <p class="text-sm font-medium mt-4 mb-2">Hành động đề xuất:</p>
        <div class="space-y-2">${i.actions.map(a => `<button onclick="createAction('${a.replace(/'/g,"\\'")}');showToast('Đã thêm hành động')" class="block w-full text-left px-3 py-2 bg-zzp-50 rounded-lg text-sm hover:bg-zzp-100">${a}</button>`).join('')}</div>
        <button onclick="runAutomationFlow('${flowMap[id] || 'FLOW_OPTIMIZE'}')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm inline-flex items-center gap-1">${icon('play',14)} Chạy quy trình</button>`)}
    `);
  },

  ad: (id) => {
    const ad = ZZP_DATA.ads.find(x => x.id === id);
    if (!ad) return notFound('Quảng cáo', id);
    return detailLayout('ad', id, ad.name, 'ads', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Ngân sách', fmt(ad.budget))}${statCard('Đã chi', fmt(ad.spent))}${statCard('ROAS', ad.roas ? ad.roas + 'x' : '-', '', ad.roas >= 2 ? 'green' : 'red')}${statCard('Đơn hàng', ad.orders)}
      </div>
      ${card('Chi tiết chiến dịch quảng cáo', `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-slate-500">Loại</span><span>${ad.type}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Lượt hiển thị</span><span>${fmt(ad.impressions)}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Trạng thái</span>${badge(ad.status, ad.status)}</div>
        </div>
        <div class="mt-4 flex gap-2">
          ${ad.roas < 2 && ad.status === 'active' ? `<button onclick="pauseAd('${id}');openDetail('ad','${id}')" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Tạm dừng chiến dịch</button>` : ''}
          <button onclick="runAutomationFlow('FLOW_ADS')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Quy trình tối ưu quảng cáo</button>
        </div>`)}
      ${renderDetailFlows(getFlowsForModule('ads'))}
    `);
  },

  sample: (id) => {
    const s = ZZP_DATA.samples.find(x => x.id === id);
    if (!s) return notFound('Gửi mẫu', id);
    const koc = ZZP_DATA.kocs.find(k => k.id === s.koc);
    const prod = getProduct(s.product);
    return detailLayout('sample', id, `Mẫu ${id}`, 'samples', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Chi phí mẫu', fmtCurrency(s.cost))}${statCard('Doanh thu', fmt(s.revenue))}${statCard('ROI', s.roi ? s.roi + 'x' : '-', '', s.roi > 10 ? 'green' : 'amber')}${statCard('Trạng thái', s.status, '', s.status === 'converted' ? 'green' : 'amber')}
      </div>
      ${card('Thông tin gửi mẫu', `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-slate-500">KOC</span><button onclick="openDetail('koc','${s.koc}')" class="text-zzp-600 hover:underline">${koc?.name}</button></div>
          <div class="flex justify-between"><span class="text-slate-500">Sản phẩm</span><button onclick="openDetail('product','${s.product}')" class="text-zzp-600 hover:underline">${prod?.name}</button></div>
          <div class="flex justify-between"><span class="text-slate-500">Ngày gửi</span><span>${s.sentDate}</span></div>
        </div>
        <button onclick="runAutomationFlow('FLOW_SAMPLE')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm inline-flex items-center gap-1">${icon('play',14)} Quy trình gửi mẫu</button>`)}
    `);
  },

  content: (id) => {
    const v = ZZP_DATA.content.find(x => x.id === id);
    if (!v) return notFound('Nội dung', id);
    const koc = ZZP_DATA.kocs.find(k => k.id === v.koc);
    return detailLayout('content', id, v.title, 'content', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Lượt xem', fmt(v.views))}${statCard('Đơn hàng', v.orders)}${statCard('GMV', fmt(v.gmv))}${statCard('CTR', v.ctr ? v.ctr + '%' : '-')}
      </div>
      ${card('Hiệu suất nội dung', `
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-slate-500">KOC</span><button onclick="openDetail('koc','${v.koc}')" class="text-zzp-600 hover:underline">${koc?.name}</button></div>
          <div class="flex justify-between"><span class="text-slate-500">Loại</span><span>${v.type}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Ngày đăng</span><span>${v.published}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Trạng thái</span>${badge(v.status, v.status)}</div>
        </div>
        <button onclick="runAutomationFlow('FLOW_LIVE_PREP')" class="mt-4 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm">Quy trình chuẩn bị live</button>`)}
    `);
  },

  voucher: (id) => {
    const v = ZZP_DATA.vouchers.find(x => x.id === id);
    if (!v) return notFound('Voucher', id);
    return detailLayout('voucher', id, v.code, 'vouchers', `
      <div class="grid lg:grid-cols-4 gap-4 mb-6">
        ${statCard('Đã dùng', v.used + '/' + v.limit)}${statCard('Chi phí', fmt(v.cost))}${statCard('GMV', fmt(v.gmv))}${statCard('Ngưỡng kiểm soát', v.guardrail, '', v.guardrail === 'warning' ? 'amber' : 'green')}
      </div>
      ${card('Hiệu suất voucher', `<p class="text-sm">Mã ${v.code} · ${v.discount ? v.discount + '%' : fmtCurrency(v.maxDiscount)}</p>
        <div class="mt-4 flex gap-2">
          ${v.guardrail === 'warning' ? `<button onclick="runAutomationFlow('FLOW_ADS')" class="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm">Giải quyết ngưỡng kiểm soát</button>` : ''}
          <button onclick="navigate('vouchers')" class="px-4 py-2 border rounded-lg text-sm">Quản lý voucher</button>
        </div>`)}
    `);
  }
};

function notFound(type, id) {
  return `<div class="text-center py-12"><p class="text-slate-500">${type} "${id}" không tìm thấy</p><button onclick="goBack()" class="mt-4 text-zzp-600 hover:underline">← Quay lại</button></div>`;
}

function detailLayout(type, id, title, backPage, content) {
  return `
    <div>
      <div class="flex items-center gap-3 mb-6">
        <button onclick="goBack()" class="p-2 rounded-lg hover:bg-slate-100 text-slate-500">←</button>
        <div><h2 class="text-xl font-bold">${title}</h2><p class="text-xs text-slate-500">${typeof viEntityType === 'function' ? viEntityType(type) : type} · ${id}</p></div>
      </div>
      ${content}
    </div>`;
}

function renderDetailFlows(flows) {
  if (!flows.length) return '';
  const unique = [...new Map(flows.map(f => [f.id, f])).values()];
  return `<div class="mt-6">${card('Quy trình tự động liên quan', unique.slice(0, 3).map(f =>
    `<div class="flex items-center justify-between py-3 border-b border-slate-50">
      <div class="flex items-center gap-2"><button type="button" onclick="openDetail('flow','${f.id}')" class="font-medium text-sm text-zzp-600 hover:underline">${f.name}</button><p class="text-xs text-slate-500">${f.trigger}</p></div>
      <button onclick="runAutomationFlow('${f.id}')" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs">Chạy</button>
    </div>`).join(''))}</div>`;
}

function renderDetailPage(type, id) {
  const renderer = DETAIL_RENDERERS[type];
  return renderer ? renderer(id) : notFound(type, id);
}
