/* Kiến trúc 4 lớp PRD — Data → Intelligence → Action → Automation */

const DATA_LAYER_PAGES = new Set([
  'samples', 'orders', 'inventory', 'products', 'datahub', 'affiliate', 'koc', 'content', 'ads', 'vouchers',
  'returns', 'campaigns', 'livestream', 'growth-assistant', 'alerts', 'actions', 'automation', 'optimization',
  'executive', 'revenue', 'profit', 'costs', 'product-analytics', 'affiliate-analytics', 'creator-analytics',
  'content-analytics', 'live-analytics', 'forecast', 'opportunities', 'compliance', 'products-setup'
]);

const LAYER_META = [
  { key: 'data', num: 1, title: 'Data Layer', sub: 'Thu thập · đồng bộ · chuẩn hóa', color: 'from-cyan-500 to-cyan-600', border: 'border-cyan-200', bg: 'bg-cyan-50/60', icon: 'database' },
  { key: 'intelligence', num: 2, title: 'Intelligence Layer', sub: 'Phân tích · insight · scorecard', color: 'from-violet-500 to-violet-600', border: 'border-violet-200', bg: 'bg-violet-50/60', icon: 'brain-circuit' },
  { key: 'action', num: 3, title: 'Action Layer', sub: 'Khuyến nghị · action queue · quyết định', color: 'from-amber-500 to-amber-600', border: 'border-amber-200', bg: 'bg-amber-50/60', icon: 'target' },
  { key: 'automation', num: 4, title: 'Automation Layer', sub: 'Flow · rule · alert · tự động hóa', color: 'from-teal-500 to-teal-600', border: 'border-teal-200', bg: 'bg-teal-50/60', icon: 'workflow' }
];

function getModuleLayerData(pageId) {
  const flowId = PAGE_PRIMARY_FLOW[pageId];
  const flow = AUTOMATION_FLOWS.find(f => f.id === flowId);
  const issues = getModuleIssues(pageId).slice(0, 2);
  const insights = pageId === 'growth-assistant'
    ? ZZP_DATA.aiInsights.slice(0, 2)
    : ZZP_DATA.aiInsights.filter(i =>
        (pageId === 'ads' && i.id === 'AI002') || (pageId === 'inventory' && i.id === 'AI003') ||
        (pageId === 'products' && i.id === 'AI001') || (pageId === 'affiliate' && i.id === 'AI004') ||
        (pageId === 'samples' && i.id === 'AI004')
      ).slice(0, 2);
  const actions = ZZP_DATA.actionQueue.filter(a => {
    const mod = { ads: 'AI002', inventory: 'AI003', products: 'products', compliance: 'A005', orders: 'A004' };
    return a.source === mod[pageId] || a.source?.includes?.('AI') || issues.some(i => i.id === a.source);
  }).slice(0, 2);
  if (!actions.length) actions.push(...ZZP_DATA.actionQueue.slice(0, 2));

  const dataItems = getDataLayerItems(pageId);
  const intelItems = getIntelLayerItems(pageId, insights);
  const actionItems = getActionLayerItems(pageId, actions, issues);
  const autoItems = getAutoLayerItems(pageId, flow);

  return { data: dataItems, intelligence: intelItems, action: actionItems, automation: autoItems, flow };
}

function getDataLayerItems(pageId) {
  const map = {
    samples: () => [`${ZZP_DATA.samples.length} gói mẫu`, `${ZZP_DATA.kocs.length} KOC`, 'Sample Tracking API'],
    orders: () => [`${ZZP_DATA.orders.length} đơn sync`, 'TikTok Shop Orders', 'SLA real-time'],
    inventory: () => [ZZP_DATA.products.map(p => `${p.stock} ${p.sku}`).slice(0, 2).join(' · '), 'ERP KiotViet', 'Velocity 15s'],
    products: () => [`${ZZP_DATA.products.length} SKU`, 'Listing Quality', 'Product API'],
    datahub: () => ZZP_DATA.dataSync.slice(0, 3).map(d => `${d.source} · ${d.latency}`),
    affiliate: () => [`GMV ${fmt(ZZP_DATA.kocs.reduce((s, k) => s + k.gmv30d, 0))}`, 'Affiliate Center', 'Commission sync'],
    koc: () => ZZP_DATA.kocs.slice(0, 3).map(k => k.name),
    content: () => [`${ZZP_DATA.content.length} video/live`, 'Content API', 'Views + GMV'],
    ads: () => ZZP_DATA.ads.slice(0, 2).map(a => `${a.name.slice(0, 20)} · ROAS ${a.roas}x`),
    executive: () => [`GMV ${fmt(ZZP_DATA.shop.gmv30d)}`, `${ZZP_DATA.shop.orders30d} đơn`, 'Data Warehouse'],
    revenue: () => Object.entries(ZZP_DATA.revenueBreakdown).filter(([k]) => k !== 'total').map(([k, v]) => `${k}: ${fmt(v)}`),
    profit: () => [`Margin ${calcProfit().margin}%`, `Profit ${fmt(calcProfit().profit)}`]
  };
  return (map[pageId]?.() || ['TikTok Shop Sync', 'Data Hub', 'Real-time pipeline']).slice(0, 4);
}

function getIntelLayerItems(pageId, insights) {
  const extra = {
    samples: [`Convert ${calcSamplePipelineStats().convPct}%`, `ROI TB ${calcSamplePipelineStats().avgRoi}x`],
    inventory: ['P003 stockout T+2', 'Velocity 40/ngày'],
    orders: [`${ZZP_DATA.orders.filter(o => o.sla !== 'ok').length} SLA risk`, 'Return 3.2%'],
    koc: ['Scorecard 0–100', 'Lifecycle pipeline'],
    ads: ['ROAS monitor', 'Cost vs GMV'],
    'product-analytics': ['SKU Ranking', 'Scale/Optimize tags']
  };
  const fromAi = insights.map(i => i.title.slice(0, 32));
  return [...(extra[pageId] || ['Business Intelligence']), ...fromAi].slice(0, 4);
}

function getActionLayerItems(pageId, actions, issues) {
  const fromQueue = actions.map(a => a.title.slice(0, 36));
  const fromIssues = issues.map(i => i.title.slice(0, 36));
  return [...fromQueue, ...fromIssues].slice(0, 4);
}

function getAutoLayerItems(pageId, flow) {
  const rules = ZZP_DATA.automationRules.filter(r => r.active).slice(0, 2).map(r => r.name.slice(0, 28));
  const items = flow ? [`Flow: ${flow.name.slice(0, 28)}`, `Trigger: ${flow.trigger.slice(0, 24)}`] : [];
  return [...items, ...rules].slice(0, 4);
}

function renderDataLayerStack(pageId) {
  return '';
}
