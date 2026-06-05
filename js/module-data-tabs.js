/* Tab phân loại dữ liệu trên từng trang module — gom nội dung rõ ràng */

const moduleDataTabIndex = {};

function getModuleDataTab(pageId) {
  return moduleDataTabIndex[pageId] ?? 0;
}

function selectModuleDataTab(pageId, index) {
  moduleDataTabIndex[pageId] = index;
  renderCurrentView();
}

function renderModuleTabBar(pageId, tabs, active) {
  const idx = Math.min(active, tabs.length - 1);
  const activeTab = tabs[idx];
  const brief = typeof renderModuleTabBrief === 'function' && activeTab?.meta
    ? renderModuleTabBrief(activeTab.meta)
    : '';
  return `
    <div class="ds-tabs">
      ${tabs.map((t, i) => `
        <button type="button" onclick="selectModuleDataTab('${pageId}', ${i})"
          class="ds-tab${idx === i ? ' is-active' : ''}">
          ${icon(t.icon || 'folder', 14)}
          <span>${t.label}</span>
          ${t.count != null ? `<span class="ds-tab-count">${t.count}</span>` : ''}
        </button>`).join('')}
    </div>
    ${brief}
    <div class="ds-tab-panel">${activeTab.content()}</div>`;
}

function renderModuleDataTabs(pageId) {
  const builder = MODULE_DATA_TABS[pageId];
  if (!builder) return '';
  const tabs = builder();
  if (!tabs?.length) return '';
  return renderModuleTabBar(pageId, tabs, getModuleDataTab(pageId));
}

function renderKocScoreTable() {
  return tableWrap(['KOC', 'Tier', 'Score', 'GMV 30d', 'ROI', 'Lifecycle', 'Videos'],
    ZZP_DATA.kocs.map(k => `<tr ${rowClick('koc', k.id)} class="border-b border-slate-50">
      <td class="py-3 px-3 font-medium text-zzp-700">${k.name}</td>
      <td class="px-3">${k.tier}</td>
      <td class="px-3 font-bold ${k.score >= 80 ? 'text-green-600' : 'text-amber-600'}">${k.score}</td>
      <td class="px-3">${k.gmv30d ? fmt(k.gmv30d) : '—'}</td>
      <td class="px-3">${k.roi ? k.roi + 'x' : '—'}</td>
      <td class="px-3">${badge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info')}</td>
      <td class="px-3">${k.videos}</td>
    </tr>`).join(''));
}

function renderSamplesTable() {
  return tableWrap(['Mã', 'KOC', 'Sản phẩm', 'Ngày gửi', 'Trạng thái', 'Chi phí', 'ROI'],
    ZZP_DATA.samples.map(s => {
      const k = ZZP_DATA.kocs.find(x => x.id === s.koc);
      const p = getProduct(s.product);
      return `<tr ${rowClick('sample', s.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-mono text-xs">${s.id}</td>
        <td class="px-3">${k?.name}</td>
        <td class="px-3">${p?.name?.slice(0, 22)}</td>
        <td class="px-3 text-xs">${s.sentDate}</td>
        <td class="px-3">${badge(s.status, s.status === 'converted' ? 'ok' : s.status === 'no_content' ? 'critical' : 'pending')}</td>
        <td class="px-3">${fmtCurrency(s.cost)}</td>
        <td class="px-3 font-semibold ${s.roi > 10 ? 'text-green-600' : ''}">${s.roi ? s.roi + 'x' : '—'}</td>
      </tr>`;
    }).join(''));
}

function renderOrdersAttributionTable() {
  return tableWrap(['Nguồn', 'Số đơn', 'GMV ước tính', 'OAV', 'Ghi chú'],
    [['Affiliate', '1,240', fmt(186000000), fmtCurrency(170354), '38% tổng GMV'],
      ['Livestream', '892', fmt(129000000), fmtCurrency(275000), '31% tổng GMV'],
      ['Ads', '412', fmt(78600000), fmtCurrency(190000), '15% tổng GMV'],
      ['Organic', '303', fmt(91500000), fmtCurrency(145000), '10% tổng GMV']
    ].map(r => `<tr class="border-b border-slate-50">${r.map(c => `<td class="py-3 px-3">${c}</td>`).join('')}</tr>`).join(''));
}

function renderOrdersListTable() {
  return tableWrap(['Mã đơn', 'Khách', 'Sản phẩm', 'Tổng', 'Nguồn', 'SLA', 'Trạng thái'],
    ZZP_DATA.orders.map(o => `<tr ${rowClick('order', o.id)} class="border-b border-slate-50">
      <td class="py-3 px-3 font-mono text-xs text-zzp-600">${o.id}</td>
      <td class="px-3">${o.customer}</td>
      <td class="px-3">${o.productName?.slice(0, 20)}</td>
      <td class="px-3 font-semibold">${fmtCurrency(o.total)}</td>
      <td class="px-3">${o.source}</td>
      <td class="px-3">${badge(o.sla === 'ok' ? 'OK' : o.sla, o.sla === 'ok' ? 'ok' : 'critical')}</td>
      <td class="px-3">${badge(o.status, o.status)}</td>
    </tr>`).join(''));
}

function renderInventoryForecastTable() {
  return tableWrap(['SKU', 'Tồn', 'Bán/ngày', 'Còn (ngày)', 'Khuyến nghị', 'Mức độ'],
    ZZP_DATA.products.map(p => {
      const daily = Math.round(p.sold30d / 30) || 1;
      const days = Math.round(p.stock / daily);
      return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-medium">${p.name.slice(0, 24)}</td>
        <td class="px-3 ${days < 7 ? 'text-red-600 font-bold' : ''}">${p.stock}</td>
        <td class="px-3">${daily}</td>
        <td class="px-3">${days} ngày</td>
        <td class="px-3">${days < 7 ? 'PO ' + Math.max(500, daily * 14) + ' sp' : '—'}</td>
        <td class="px-3">${badge(days < 3 ? 'Critical' : days < 7 ? 'Low' : 'OK', days < 3 ? 'critical' : days < 7 ? 'warning' : 'ok')}</td>
      </tr>`;
    }).join(''));
}

function renderAffiliateCampaignCards() {
  return `<div class="grid lg:grid-cols-2 gap-4">${ZZP_DATA.campaigns.filter(c => c.type === 'affiliate' || c.type === 'promotion').map(c => `
    <button type="button" onclick="openDetail('campaign','${c.id}')" class="text-left p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-sm transition-all flex justify-between items-center gap-3">
      <div><p class="font-medium">${c.name}</p><p class="text-xs text-slate-500 mt-1">${fmt(c.spent)} / ${fmt(c.budget)} · ${c.start} → ${c.end}</p></div>
      <div class="text-right shrink-0"><p class="text-lg font-bold text-green-600">${(c.gmv / c.spent).toFixed(1)}x</p><p class="text-xs text-slate-500">${fmt(c.gmv)} GMV</p></div>
    </button>`).join('')}</div>`;
}

function renderLivestreamSessions() {
  return ZZP_DATA.liveSessions.map(l => {
    const koc = ZZP_DATA.kocs.find(k => k.id === l.host);
    return card(l.title, `
      <div class="grid lg:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-slate-500">Host: <button type="button" onclick="openDetail('koc','${l.host}')" class="text-zzp-600 hover:underline font-medium">${koc?.name}</button> · ${l.date} · ${l.duration} phút</p>
          <p class="mt-2">Checklist: <span class="font-semibold">${l.checklistDone}/${l.checklistTotal}</span></p>
          <div class="mt-2 h-2 bg-slate-100 rounded-full"><div class="h-2 bg-zzp-500 rounded-full" style="width:${l.checklistDone / l.checklistTotal * 100}%"></div></div>
        </div>
        <div class="text-center p-4 bg-slate-50 rounded-xl">
          <p class="text-sm text-slate-500">GMV trước</p><p class="text-2xl font-bold text-zzp-700">${fmt(l.pastGmv)}</p>
          <p class="text-sm text-slate-500 mt-3">Dự kiến</p><p class="text-xl font-bold">${fmt(l.expectedGmv)}</p>
        </div>
      </div>`);
  }).join('');
}

const MODULE_DATA_TABS = {
  affiliate: () => [
    { label: 'Tổng quan SAM', icon: 'target', content: () => renderAffiliateSamFunnel() },
    { label: 'Creator & GMV', icon: 'users', count: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).length, content: () =>
      card('Hiệu suất Creator', renderTtsBreakdownTable('affiliate')) +
      chartGrid([['GMV theo KOC', 'chart-affiliate', 'md'], ['Phân bổ tier', 'chart-aff-tier', 'sm']]) },
    { label: 'Chiến dịch', icon: 'megaphone', count: ZZP_DATA.campaigns.length, content: () =>
      card('Chiến dịch Affiliate & Promotion', renderAffiliateCampaignCards()) }
  ],

  orders: () => [
    { label: 'SLA Board', icon: 'layout-grid', count: ZZP_DATA.orders.length, content: () =>
      card('Order Center — SLA Board', renderOrderSlaBoard()) },
    { label: 'Phân loại nguồn', icon: 'pie-chart', content: () =>
      card('Attribution theo kênh', renderOrdersAttributionTable()) },
    { label: 'Danh sách đơn', icon: 'list', content: () =>
      card('Tất cả đơn hàng', renderOrdersListTable()) }
  ],

  inventory: () => [
    { label: 'Tồn kho SKU', icon: 'package', count: ZZP_DATA.products.length, content: () =>
      card('Stock Gauge Monitor', renderInventoryGaugeCards()) },
    { label: 'Cảnh báo', icon: 'triangle-alert', count: ZZP_DATA.products.filter(p => p.stock < 100).length, content: () => `
      <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 mb-4">
        ${iconBox('triangle-alert', 18, 'bg-red-100 text-red-600 shrink-0')}
        <div>
          <p class="font-semibold text-red-800">Cảnh báo: Mặt nạ Collagen (P003)</p>
          <p class="text-sm text-red-700 mt-1">Chỉ còn 45 sp — hết hàng dự kiến trong 2 ngày.
            <button onclick="runAutomationFlow('FLOW_STOCK')" class="underline font-medium ml-1 inline-flex items-center gap-1">${icon('play', 12)} Chạy nhập hàng</button></p>
        </div>
      </div>
      ${card('SKU cần chú ý', tableWrap(['SKU', 'Tồn', 'Velocity', 'Còn'],
        ZZP_DATA.products.filter(p => p.stock < 200).map(p => {
          const d = Math.round(p.sold30d / 30);
          return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
            <td class="py-3 px-3">${p.name.slice(0, 24)}</td>
            <td class="py-3 px-3 text-red-600 font-bold">${p.stock}</td>
            <td class="px-3">${d}/ngày</td>
            <td class="px-3">${Math.round(p.stock / d)} ngày</td>
          </tr>`;
        }).join('')))}` },
    { label: 'Dự báo & PO', icon: 'trending-up', content: () =>
      card('Dự báo stockout & đề xuất nhập', renderInventoryForecastTable()) }
  ],

  koc: () => [
    { label: 'Pipeline CRM', icon: 'columns-3', count: ZZP_DATA.kocs.length, content: () =>
      card('KOC Lifecycle Pipeline', renderKocCrmPipeline()) },
    { label: 'Bảng điểm', icon: 'star', content: () =>
      card('Danh sách KOC — Score & GMV', renderKocScoreTable()) }
  ],

  samples: () => [
    { label: 'Tổng quan ROI', icon: 'layout-dashboard', content: () => {
      const stats = calcSamplePipelineStats();
      return chartGrid([['Conversion funnel', 'chart-sample-funnel', 'sm'], ['Sample ROI', 'chart-sample-roi', 'sm'], ['Trạng thái', 'chart-sample-status', 'sm']], 3) +
        `<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl border bg-teal-50 border-teal-100"><p class="text-[10px] uppercase font-semibold text-slate-500">Tổng gửi mẫu</p><p class="text-xl font-bold mt-1 text-teal-900">${stats.total}</p></div>
          <div class="p-3 rounded-xl border bg-green-50 border-green-100"><p class="text-[10px] uppercase font-semibold text-slate-500">Tỷ lệ convert</p><p class="text-xl font-bold mt-1 text-green-900">${stats.convPct}%</p></div>
          <div class="p-3 rounded-xl border bg-white border-slate-200"><p class="text-[10px] uppercase font-semibold text-slate-500">ROI trung bình</p><p class="text-xl font-bold mt-1 text-zzp-700">${stats.avgRoi}x</p></div>
          <div class="p-3 rounded-xl border bg-red-50 border-red-100"><p class="text-[10px] uppercase font-semibold text-slate-500">Chưa content</p><p class="text-xl font-bold mt-1 text-red-900">${stats.noContent.length}</p></div>
        </div>`;
    }},
    { label: 'Pipeline mẫu', icon: 'git-branch', content: () => {
      const stats = calcSamplePipelineStats();
      return renderSamplePipelineFlow(stats) + renderSamplePipelineKanban();
    }},
    { label: 'Bảng mẫu', icon: 'table', count: ZZP_DATA.samples.length, content: () =>
      card('Sample Tracking', renderSamplesTable()) }
  ],

  content: () => [
    { label: 'Lịch & task', icon: 'calendar-days', count: ZZP_DATA.content.length, content: () =>
      card('Content Operations', renderContentCalendar()) },
    { label: 'Hiệu suất video', icon: 'video', content: () =>
      card('Performance theo nội dung', tableWrap(['Video', 'KOC', 'Views', 'Đơn', 'GMV', 'CTR', 'Trạng thái'],
        ZZP_DATA.content.map(c => {
          const k = ZZP_DATA.kocs.find(x => x.id === c.koc);
          return `<tr ${rowClick('content', c.id)} class="border-b border-slate-50">
            <td class="py-3 px-3 font-medium">${c.title.slice(0, 28)}</td>
            <td class="px-3">${k?.name || '—'}</td>
            <td class="px-3">${c.views ? fmt(c.views) : '—'}</td>
            <td class="px-3">${c.orders || '—'}</td>
            <td class="px-3">${c.gmv ? fmt(c.gmv) : '—'}</td>
            <td class="px-3">${c.ctr ? c.ctr + '%' : '—'}</td>
            <td class="px-3">${badge(c.status, c.status === 'published' ? 'ok' : 'pending')}</td>
          </tr>`;
        }).join(''))) }
  ],

  livestream: () => [
    { label: 'Hiệu suất', icon: 'bar-chart-2', content: () =>
      card('Live Performance', renderTtsBreakdownTable('livestream')) },
    { label: 'Phiên live', icon: 'radio', count: ZZP_DATA.liveSessions.length, content: () => renderLivestreamSessions() }
  ],

  ads: () => [
    { label: 'Campaigns', icon: 'megaphone', count: ZZP_DATA.ads.length, content: () =>
      chartGrid([['ROAS theo chiến dịch', 'chart-ads-roas', 'sm'], ['Chi tiêu Ads', 'chart-ads-spend', 'sm']]) +
      card('Ads Campaigns', renderTtsBreakdownTable('ads')) },
    { label: 'Gợi ý tối ưu', icon: 'sparkles', content: () => card('Spark Ads Wizard', `
      <div class="p-4 bg-green-50 rounded-xl border border-green-100"><p class="font-medium flex items-center gap-2">${icon('trending-up', 16, 'text-green-600')} Scale: Spark Ads Serum VC (ROAS 3.8x)</p><p class="text-sm text-slate-600 mt-1">Tăng budget 30% · Gắn video V001</p><button onclick="showToast('Đã tạo action: Tăng budget AD001')" class="mt-2 text-sm text-green-700 hover:underline">Thực hiện</button></div>
      <div class="p-4 bg-red-50 rounded-xl border border-red-100 mt-3"><p class="font-medium flex items-center gap-2">${icon('pause-circle', 16, 'text-red-600')} Pause: Product Ads Mặt nạ (ROAS 1.2x)</p><p class="text-sm text-slate-600 mt-1">Chuyển ngân sách sang Affiliate K002</p><button onclick="pauseAd('AD002')" class="mt-2 text-sm text-red-700 hover:underline">Pause ngay</button></div>`) }
  ],

  products: () => [
    { label: 'Lifecycle', icon: 'refresh-cw', count: ZZP_DATA.products.length, content: () =>
      card('Product Status Monitor', renderProductLifecycleMonitor()) },
    { label: 'GMV SKU', icon: 'bar-chart-2', content: () =>
      chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md']], 1) }
  ],

  returns: () => [
    { label: 'Case hoàn/hủy', icon: 'rotate-ccw', count: ZZP_DATA.returns.length, content: () =>
      card('Return & Cancellation Cases', renderReturnsCaseTimeline()) },
    { label: 'Thống kê', icon: 'bar-chart-2', content: () =>
      card('Return rate & benchmark', tableWrap(['Chỉ số', 'Shop', 'Benchmark', 'Đánh giá'],
        [['Return rate', TTS_METRICS.shop.returnRate + '%', '4.8%', badge('Tốt hơn', 'ok')],
          ['Hoàn tiền', fmt(TTS_METRICS.shop.refunds), '—', badge('Theo dõi', 'info')],
          ['Đơn hoàn', TTS_METRICS.shop.cancellationsAndReturns, '—', badge('OK', 'ok')]]
          .map(r => `<tr class="border-b border-slate-50">${r.map(c => `<td class="py-3 px-3">${c}</td>`).join('')}</tr>`).join(''))) }
  ],

  executive: () => [
    { label: 'Tổng quan', icon: 'layout-dashboard', content: () =>
      card('Revenue Trend', '<div class="chart-box"><canvas id="chart-executive"></canvas></div>') },
    { label: 'Phân bổ GMV', icon: 'pie-chart', content: () =>
      card('GMV Breakdown', renderTtsBreakdownTable('executive')) }
  ],

  revenue: () => [
    { label: 'Theo kênh', icon: 'pie-chart', content: () =>
      card('GMV Breakdown — Content Type', renderTtsBreakdownTable('revenue')) +
      card('Attribution Analysis', '<div class="chart-box"><canvas id="chart-attribution"></canvas></div>') },
    { label: 'Theo sản phẩm', icon: 'package', content: () =>
      card('Revenue by Product × Source', tableWrap(['Sản phẩm', 'Organic', 'Affiliate', 'Ads', 'Live', 'Tổng'],
        ZZP_DATA.products.filter(p => p.hero).map(p => {
          const share = p.sold30d * p.price;
          return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(share * 0.15)}</td><td class="px-3">${fmt(share * 0.38)}</td><td class="px-3">${fmt(share * 0.12)}</td><td class="px-3">${fmt(share * 0.35)}</td><td class="px-3 font-semibold">${fmt(share)}</td></tr>`;
        }).join(''))) }
  ],

  profit: () => [
    { label: 'P&L tổng', icon: 'wallet', content: () =>
      card('Tài chính — Settlement & phí', renderTtsFinanceStrip()) +
      card('P&L Breakdown', '<div class="chart-box"><canvas id="chart-pnl"></canvas></div>') },
    { label: 'Theo sản phẩm', icon: 'package', content: () =>
      card('Profit by Product', tableWrap(['Sản phẩm', 'GMV', 'COGS', 'Chi phí PB', 'Lợi nhuận', 'Margin'],
        ZZP_DATA.products.filter(p => p.hero).map(p => {
          const gmv = p.sold30d * p.price; const cogs = p.sold30d * p.cost; const other = gmv * 0.18; const profit = gmv - cogs - other;
          return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(gmv)}</td><td class="px-3">${fmt(cogs)}</td><td class="px-3">${fmt(other)}</td><td class="px-3 font-semibold text-green-600">${fmt(profit)}</td><td class="px-3">${(profit / gmv * 100).toFixed(1)}%</td></tr>`;
        }).join(''))) }
  ],

  costs: () => [
    { label: 'Biểu đồ', icon: 'bar-chart-2', content: () =>
      chartGrid([['Cấu trúc chi phí', 'chart-costs-detail', 'md'], ['% chi phí / GMV', 'chart-costs-pct', 'sm']]) },
    { label: 'Chi tiết', icon: 'list', content: () => {
      const c = ZZP_DATA.costs;
      return card('Cost Structure Detail', tableWrap(['Loại chi phí', 'Số tiền', '% GMV', 'Trend'],
        Object.entries({ COGS: c.cogs, 'Vận chuyển': c.shipping, 'Commission Affiliate': c.commission, 'Quảng cáo': c.ads, Voucher: c.voucher, Sample: c.sample, 'Agency Fee': c.agency, 'Platform Fee': c.platform }).map(([k, v]) =>
          `<tr class="border-b border-slate-50"><td class="py-3 px-3">${k}</td><td class="px-3">${fmt(v)}</td><td class="px-3">${(v / ZZP_DATA.revenueBreakdown.total * 100).toFixed(1)}%</td><td class="px-3">${k === 'Quảng cáo' ? badge('↑ 12%', 'warning') : badge('→ ổn định', 'ok')}</td></tr>`).join('')));
    }}
  ],

  'product-analytics': () => [
    { label: 'SKU Performance', icon: 'bar-chart-2', content: () =>
      chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md'], ['Margin top SKU', 'chart-product-margin', 'sm']]) +
      card('SKU Performance', renderTtsBreakdownTable('product-analytics')) },
    { label: 'Xếp hạng', icon: 'list-ordered', content: () =>
      card('SKU Ranking', tableWrap(['#', 'Sản phẩm', 'GMV 30d', 'Units', 'Margin', 'Velocity', 'Score', 'Action'],
        [...ZZP_DATA.products].sort((a, b) => (b.sold30d * b.price) - (a.sold30d * a.price)).map((p, i) => {
          const gmv = p.sold30d * p.price; const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
          return `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-bold">${i + 1}</td><td class="px-3"><div class="flex items-center gap-2">${productThumb(p, 14)} ${p.name}</div></td><td class="px-3 font-semibold">${fmt(gmv)}</td><td class="px-3">${p.sold30d}</td><td class="px-3">${margin}%</td><td class="px-3">${Math.round(p.sold30d / 30)}/ngày</td><td class="px-3">${p.listingScore}</td><td class="px-3">${i < 2 ? badge('Scale', 'ok') : i === 6 ? badge('Optimize', 'warning') : badge('Maintain', 'info')}</td></tr>`;
        }).join(''))) }
  ],

  'creator-analytics': () => [
    { label: 'Scorecard', icon: 'star', count: ZZP_DATA.kocs.length, content: () =>
      card('Creator Scorecards', renderCreatorScorecardGrid()) },
    { label: 'Bảng xếp hạng', icon: 'list-ordered', content: () =>
      card('Ranking KOC', renderKocScoreTable()) }
  ],

  'affiliate-analytics': () => [
    { label: 'Creator', icon: 'users', content: () =>
      card('Creator Marketplace Performance', renderTtsBreakdownTable('affiliate-analytics')) +
      card('Affiliate Contribution', '<div class="chart-box"><canvas id="chart-aff-contrib"></canvas></div>') },
    { label: 'Campaign ROI', icon: 'megaphone', content: () =>
      card('Campaign ROI Comparison', tableWrap(['Chiến dịch', 'Spent', 'GMV', 'ROI', 'Commission', 'Net Profit'],
        ZZP_DATA.campaigns.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3">${c.name}</td><td class="px-3">${fmt(c.spent)}</td><td class="px-3">${fmt(c.gmv)}</td><td class="px-3 font-semibold">${(c.gmv / c.spent).toFixed(1)}x</td><td class="px-3">${fmt(c.gmv * 0.12)}</td><td class="px-3 text-green-600">${fmt(c.gmv - c.spent - c.gmv * 0.12 - c.gmv * 0.3)}</td></tr>`).join(''))) }
  ],

  'content-analytics': () => [
    { label: 'Biểu đồ', icon: 'bar-chart-2', content: () =>
      chartGrid([['CVR theo video', 'chart-content-cvr', 'sm'], ['Views theo video', 'chart-content-views', 'sm']]) },
    { label: 'Bảng video', icon: 'video', content: () =>
      card('Content Performance', tableWrap(['Video', 'Views', 'CTR', 'Đơn', 'GMV'],
        ZZP_DATA.content.filter(c => c.views).map(c => `<tr ${rowClick('content', c.id)} class="border-b border-slate-50">
          <td class="py-3 px-3">${c.title.slice(0, 30)}</td><td class="px-3">${fmt(c.views)}</td><td class="px-3">${c.ctr}%</td><td class="px-3">${c.orders}</td><td class="px-3">${fmt(c.gmv)}</td></tr>`).join(''))) }
  ],

  'live-analytics': () => [
    { label: 'Session metrics', icon: 'radio', content: () =>
      card('Live Session Metrics', renderTtsBreakdownTable('live-analytics')) },
    { label: 'So sánh', icon: 'git-compare', content: () =>
      card('Expected vs Actual GMV', tableWrap(['Session', 'Expected', 'Actual', 'Gap'],
        ZZP_DATA.liveSessions.map(l => {
          const gap = l.expectedGmv ? ((l.pastGmv || 0) / l.expectedGmv * 100 - 100).toFixed(0) : '—';
          return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${l.title.slice(0, 24)}</td><td class="px-3">${fmt(l.expectedGmv)}</td><td class="px-3">${fmt(l.pastGmv)}</td><td class="px-3 ${Number(gap) < 0 ? 'text-red-600' : 'text-green-600'}">${gap}%</td></tr>`;
        }).join(''))) }
  ]
};
