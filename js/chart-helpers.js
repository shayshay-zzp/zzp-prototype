/* Chart helpers — canvas HTML + init mở rộng theo từng trang */

function chartCanvas(id, size = 'sm') {
  const cls = { xs: 'chart-box-xs', sm: 'chart-box-sm', md: 'chart-box', lg: 'chart-box-lg' }[size] || 'chart-box-sm';
  return `<div class="${cls}"><canvas id="${id}"></canvas></div>`;
}

function chartGrid(items, cols = 2) {
  const grid = cols === 3 ? 'lg:grid-cols-3' : cols === 1 ? 'grid-cols-1' : 'lg:grid-cols-2';
  return `<div class="grid ${grid} gap-4 mb-6">${items.map(([title, id, size]) =>
    `<div class="bg-white rounded-xl border border-slate-200 shadow-sm"><div class="px-4 py-3 border-b border-slate-100"><h4 class="text-sm font-semibold text-slate-800">${title}</h4></div><div class="p-4">${chartCanvas(id, size || 'sm')}</div></div>`
  ).join('')}</div>`;
}

function initExtendedCharts(page, chartsRef, defaults) {
  const c = chartsRef;
  const d = defaults || { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } } };

  if (page === 'samples') {
    const st = calcSamplePipelineStats();
    makeBar('chart-sample-funnel', ['Gửi mẫu', 'Chờ content', 'Convert', 'ROI ≥2x', 'Scale ≥10x'],
      [st.total, st.pending.length, st.converted.length, st.roiOk.length, st.roiScale.length], 'Số lượng', '#14b8a6');
    makeBar('chart-sample-roi', ZZP_DATA.samples.map(s => s.id),
      ZZP_DATA.samples.map(s => s.roi || 0), 'Sample ROI (x)', undefined, v => v >= 10 ? '#22c55e' : v >= 2 ? '#14b8a6' : v > 0 ? '#f59e0b' : '#ef4444');
    makeDoughnut('chart-sample-status', ['Chờ content', 'Convert', 'Chưa có content'],
      [st.pending.length, st.converted.length, st.noContent.length], ['#f59e0b', '#22c55e', '#ef4444']);
  }

  if (page === 'datahub') {
    makeBar('chart-sync-latency', ZZP_DATA.dataSync.map(x => x.source.split(' ')[0]),
      ZZP_DATA.dataSync.map(x => parseInt(x.latency)), 'Latency (giây)', '#0ea5e9');
    makeBar('chart-sync-records', ZZP_DATA.dataSync.map(x => x.source.split(' ')[0]),
      ZZP_DATA.dataSync.map(x => x.records / 1000), 'Records (nghìn)', '#14b8a6');
  }

  if (page === 'inventory') {
    const prods = ZZP_DATA.products;
    makeBar('chart-stock-days', prods.map(p => p.name.slice(0, 12)),
      prods.map(p => { const v = Math.round(p.sold30d / 30) || 1; return Math.round(p.stock / v); }), 'Ngày tồn còn', undefined,
      v => v < 7 ? '#ef4444' : v < 14 ? '#f59e0b' : '#22c55e');
    makeBar('chart-velocity', prods.map(p => p.name.slice(0, 12)),
      prods.map(p => Math.round(p.sold30d / 30)), 'Bán/ngày', '#6366f1');
  }

  if (page === 'orders') {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const labels = ['Chờ xử lý', 'Đang xử lý', 'Đang giao', 'Hoàn thành'];
    makeDoughnut('chart-order-status', labels, statuses.map(s => ZZP_DATA.orders.filter(o => o.status === s).length),
      ['#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e']);
    const src = {};
    ZZP_DATA.orders.forEach(o => { src[o.source] = (src[o.source] || 0) + 1; });
    makePie('chart-order-source', Object.keys(src), Object.values(src));
  }

  if (page === 'koc') {
    const lc = { prospect: 0, sample: 0, content: 0, revenue: 0 };
    ZZP_DATA.kocs.forEach(k => { lc[k.lifecycle] = (lc[k.lifecycle] || 0) + 1; });
    makeDoughnut('chart-koc-lifecycle', ['Tuyển chọn', 'Gửi mẫu', 'Content', 'Doanh thu'],
      [lc.prospect, lc.sample, lc.content, lc.revenue], ['#94a3b8', '#f59e0b', '#3b82f6', '#22c55e']);
    makeBar('chart-koc-gmv', ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.name.replace('@', '')),
      ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => k.gmv30d / 1e6), 'GMV (triệu)', '#14b8a6');
  }

  if (page === 'content') {
    makeBar('chart-content-gmv', ZZP_DATA.content.map(v => v.title.slice(0, 18)),
      ZZP_DATA.content.map(v => v.gmv / 1e6), 'GMV (triệu)', '#8b5cf6');
    makeBar('chart-content-ctr', ZZP_DATA.content.map(v => v.title.slice(0, 18)),
      ZZP_DATA.content.map(v => v.ctr || 0), 'CTR %', '#fe2c55');
  }

  if (page === 'ads') {
    makeBar('chart-ads-roas', ZZP_DATA.ads.map(a => a.name.slice(0, 16)),
      ZZP_DATA.ads.map(a => a.roas || 0), 'ROAS', undefined, v => v >= 2 ? '#22c55e' : v > 0 ? '#ef4444' : '#94a3b8');
    makeBar('chart-ads-spend', ZZP_DATA.ads.map(a => a.name.slice(0, 16)),
      ZZP_DATA.ads.map(a => a.spent / 1e6), 'Chi tiêu (triệu)', '#fe2c55');
  }

  if (page === 'vouchers') {
    makeBar('chart-voucher-usage', ZZP_DATA.vouchers.map(v => v.code),
      ZZP_DATA.vouchers.map(v => Math.round(v.used / v.limit * 100)), '% đã dùng',
      ZZP_DATA.vouchers.map(v => v.guardrail === 'warning' ? '#f59e0b' : '#22c55e'));
    makeBar('chart-voucher-cost', ZZP_DATA.vouchers.map(v => v.code),
      ZZP_DATA.vouchers.map(v => v.cost / 1e6), 'Chi phí (triệu)', '#6366f1');
  }

  if (page === 'products' || page === 'product-analytics') {
    const sorted = [...ZZP_DATA.products].sort((a, b) => b.sold30d * b.price - a.sold30d * a.price);
    makeBar('chart-sku-gmv', sorted.map(p => p.name.slice(0, 14)),
      sorted.map(p => p.sold30d * p.price / 1e6), 'GMV 30d (triệu)', '#14b8a6');
    if (document.getElementById('chart-product-margin')) {
      makeBar('chart-product-margin', sorted.slice(0, 5).map(p => p.name.slice(0, 14)),
        sorted.slice(0, 5).map(p => ((p.price - p.cost) / p.price * 100).toFixed(0)), 'Margin %', '#22c55e');
    }
  }

  if (page === 'costs') {
    makeDoughnut('chart-costs-detail', ['Giá vốn', 'Vận chuyển', 'Hoa hồng', 'Quảng cáo', 'Voucher', 'Mẫu', 'Agency', 'Platform'],
      [ZZP_DATA.costs.cogs, ZZP_DATA.costs.shipping, ZZP_DATA.costs.commission, ZZP_DATA.costs.ads,
        ZZP_DATA.costs.voucher, ZZP_DATA.costs.sample, ZZP_DATA.costs.agency, ZZP_DATA.costs.platform]);
    makeBar('chart-costs-pct', ['Giá vốn', 'Hoa hồng', 'Quảng cáo', 'Voucher'],
      [ZZP_DATA.costs.cogs, ZZP_DATA.costs.commission, ZZP_DATA.costs.ads, ZZP_DATA.costs.voucher].map(v => v / ZZP_DATA.revenueBreakdown.total * 100),
      '% GMV', '#ef4444');
  }

  if (page === 'live-analytics') {
    const live = ZZP_DATA.content.filter(v => v.type === 'livestream');
    makeBar('chart-live-gmv', live.map(v => v.title.slice(0, 16)), live.map(v => v.gmv / 1e6), 'GMV live (triệu)', '#ec4899');
    makeBar('chart-live-orders', live.map(v => v.title.slice(0, 16)), live.map(v => v.orders), 'Đơn hàng', '#6366f1');
  }

  if (page === 'content-analytics') {
    const pub = ZZP_DATA.content.filter(v => v.status === 'published');
    makeBar('chart-content-cvr', pub.map(v => v.title.slice(0, 16)),
      pub.map(v => v.views ? (v.orders / v.views * 100).toFixed(2) : 0), 'CVR %', '#14b8a6');
    makeBar('chart-content-views', pub.map(v => v.title.slice(0, 16)),
      pub.map(v => v.views / 1000), 'Views (nghìn)', '#8b5cf6');
  }

  if (page === 'alerts') {
    const sev = { critical: 0, warning: 0, info: 0 };
    ZZP_DATA.alerts.forEach(a => { sev[a.severity]++; });
    makeDoughnut('chart-alert-severity', ['Critical', 'Warning', 'Info'],
      [sev.critical, sev.warning, sev.info], ['#ef4444', '#f59e0b', '#3b82f6']);
    const types = {};
    ZZP_DATA.alerts.forEach(a => { types[a.type] = (types[a.type] || 0) + 1; });
    makePie('chart-alert-type', Object.keys(types), Object.values(types));
  }

  if (page === 'returns') {
    const reasons = {};
    ZZP_DATA.returns.forEach(r => { reasons[r.reason] = (reasons[r.reason] || 0) + 1; });
    makePie('chart-return-reason', Object.keys(reasons).map(k => k.slice(0, 20)), Object.values(reasons));
  }

  if (page === 'growth-assistant') {
    makeBar('chart-insight-confidence', ZZP_DATA.aiInsights.map(i => '#' + i.priority),
      ZZP_DATA.aiInsights.map(i => i.confidence), 'Độ tin cậy AI %', '#14b8a6');
    makeBar('chart-insight-priority', ZZP_DATA.aiInsights.map(i => i.title.slice(0, 20)),
      ZZP_DATA.aiInsights.map(i => 5 - i.priority + 1), 'Mức ưu tiên', '#6366f1');
  }

  if (page === 'benchmark') {
    const b = ZZP_DATA.benchmarks;
    makeBar('chart-benchmark', ['GMV Growth', 'Profit Margin', 'Return Rate', 'Affiliate Share', 'Live CVR'],
      [b.gmvGrowth.shop, b.profitMargin.shop, b.returnRate.shop, b.affiliateShare.shop, b.liveConversion.shop],
      'Shop (%)', '#14b8a6');
    const ctx = document.getElementById('chart-benchmark-market');
    if (ctx) {
      c['chart-benchmark-market'] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['GMV Growth', 'Profit Margin', 'Return Rate', 'Affiliate', 'Live CVR'],
          datasets: [
            { label: 'Shop', data: [b.gmvGrowth.shop, b.profitMargin.shop, b.returnRate.shop, b.affiliateShare.shop, b.liveConversion.shop], backgroundColor: '#14b8a6', borderRadius: 4 },
            { label: 'Thị trường', data: [b.gmvGrowth.market, b.profitMargin.market, b.returnRate.market, b.affiliateShare.market, b.liveConversion.market], backgroundColor: '#94a3b8', borderRadius: 4 }
          ]
        },
        options: d
      });
    }
  }

  if (page === 'dashboard' && !isNewSeller()) {
    makePie('chart-revenue-src', ['Tự nhiên', 'Tiếp thị liên kết', 'Quảng cáo', 'Livestream'],
      [ZZP_DATA.revenueBreakdown.organic, ZZP_DATA.revenueBreakdown.affiliate, ZZP_DATA.revenueBreakdown.ads, ZZP_DATA.revenueBreakdown.livestream],
      ['#94a3b8', '#14b8a6', '#fe2c55', '#6366f1']);
    makeDoughnut('chart-dashboard-cost', ['Giá vốn', 'Hoa hồng', 'Quảng cáo', 'Voucher', 'Khác'],
      [ZZP_DATA.costs.cogs, ZZP_DATA.costs.commission, ZZP_DATA.costs.ads, ZZP_DATA.costs.voucher,
        ZZP_DATA.costs.sample + ZZP_DATA.costs.shipping + ZZP_DATA.costs.agency]);
  }

  if (page === 'affiliate') {
    makePie('chart-aff-tier', ['Macro', 'Mid', 'Micro', 'Nano'],
      ['Macro', 'Mid', 'Micro', 'Nano'].map(t => ZZP_DATA.kocs.filter(k => k.tier === t).length));
  }

  if (page === 'creator-analytics') {
    const sorted = [...ZZP_DATA.kocs].sort((a, b) => b.score - a.score);
    makeBar('chart-creator-score', sorted.map(k => k.name.replace('@', '')),
      sorted.map(k => k.score), 'KOC Score', undefined, v => v >= 80 ? '#22c55e' : v >= 50 ? '#f59e0b' : '#ef4444');
    makeBar('chart-creator-roi', sorted.filter(k => k.roi).map(k => k.name.replace('@', '')),
      sorted.filter(k => k.roi).map(k => k.roi), 'ROI', '#14b8a6');
  }

  if (page === 'automation') {
    makeBar('chart-rule-runs', ZZP_DATA.automationRules.map(r => r.name.slice(0, 18)),
      ZZP_DATA.automationRules.map(r => r.runs), 'Lần chạy', '#6366f1');
    makeDoughnut('chart-rule-active', ['Active', 'Inactive'],
      [ZZP_DATA.automationRules.filter(r => r.active).length, ZZP_DATA.automationRules.filter(r => !r.active).length],
      ['#22c55e', '#94a3b8']);
  }
}
