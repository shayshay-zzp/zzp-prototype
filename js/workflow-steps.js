/* Tab xem trước từng bước quy trình — bấm step hiện panel bên dưới */

const workflowStepTabs = {};

function getWorkflowStepIndex(flowId) {
  return workflowStepTabs[flowId] ?? 0;
}

function selectWorkflowStep(flowId, stepIndex) {
  workflowStepTabs[flowId] = stepIndex;
  renderCurrentView();
}

function renderWorkflowStepTabs(flow, pageId) {
  const active = getWorkflowStepIndex(flow.id);
  const rule = typeof getFlowRule === 'function' ? getFlowRule(flow) : null;
  return `
    <div class="px-5 py-4">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        ${typeof renderPlatformBadge === 'function' ? renderPlatformBadge(flow.platform || 'cross') : ''}
        ${rule ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${rule.name}</span>` : ''}
      </div>
      <p class="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Tích hợp TikTok · ${flow.name}</p>
      <p class="text-xs text-slate-500 mb-3">${humanTrigger(flow.trigger, flow.triggerType)} — bấm từng bước để xem chi tiết thực thi</p>
      <div class="flex flex-wrap gap-2">
        ${flow.steps.map((s, i) => `
          <button type="button" onclick="selectWorkflowStep('${flow.id}', ${i})" class="group flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all max-w-[200px] ${active === i ? 'border-zzp-500 bg-zzp-50 ring-1 ring-zzp-200 shadow-sm' : 'border-slate-200 bg-white hover:border-zzp-400 hover:bg-zzp-50'}">
            <span class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${active === i ? 'bg-zzp-600 text-white' : 'bg-slate-100 group-hover:bg-zzp-500 group-hover:text-white'}">${i + 1}</span>
            <span class="text-xs min-w-0">
              <span class="font-medium block truncate">${s.label}</span>
              <span class="text-slate-400 truncate block">${s.integration || viPage(s.module)}</span>
            </span>
          </button>`).join('')}
      </div>
    </div>
    <div class="px-5 pb-5 border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
      ${renderWorkflowStepPreview(flow, active, pageId)}
    </div>`;
}

function renderWorkflowStepPreview(flow, stepIndex, pageId) {
  const step = flow.steps[stepIndex];
  if (!step) return '';
  return `
    <div class="pt-4">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p class="text-xs font-semibold text-zzp-700 flex items-center gap-1">${icon('clipboard-list', 14)} Chi tiết bước ${stepIndex + 1}/${flow.steps.length}</p>
        <div class="flex gap-2">
          ${flow.linkedFlow ? `<button type="button" onclick="runAutomationFlow('${flow.linkedFlow}')" class="text-xs px-2.5 py-1 bg-teal-600 text-white rounded-lg inline-flex items-center gap-1">${icon('play', 12)} Chạy quy trình</button>` : ''}
          <button type="button" onclick="navigate('${step.module}')" class="text-xs text-zzp-600 hover:underline inline-flex items-center gap-1">${icon('external-link', 12)} ${viPage(step.module)}</button>
        </div>
      </div>
      ${renderFlowIntegrationStep(flow, stepIndex)}
      <div class="mt-4">${renderModuleStepBody(step.module, step, flow)}</div>
    </div>`;
}

function renderModuleStepBody(mod, step, flow) {
  const action = step.action || '';
  switch (mod) {
    case 'samples': return renderStepSamples(action);
    case 'content': return renderStepContent(action);
    case 'koc': return renderStepKoc(action);
    case 'inventory': return renderStepInventory(action);
    case 'alerts': return renderStepAlert(action, flow);
    case 'growth-assistant': return renderStepInsight(action);
    case 'actions': return renderStepAction(action);
    case 'orders': return renderStepOrder(action);
    case 'ads': return renderStepAds(action);
    case 'compliance': return renderStepCompliance(action);
    case 'products-setup': return renderStepListing(action);
    case 'campaigns': return renderStepCampaign(action);
    case 'vouchers': return renderStepVoucher(action);
    case 'livestream': return renderStepLive(action);
    case 'affiliate':
    case 'affiliate-analytics': return renderStepAffiliate(action);
    case 'automation': return renderStepRule(action);
    case 'forecast': return renderStepForecast(action);
    case 'notifications': return renderStepNotify(action);
    case 'team': return renderStepTeam(action);
    case 'audit': return renderStepAudit(action);
    case 'optimization': return renderStepOptimize(action);
    case 'opportunities': return renderStepOpportunity(action);
    case 'costs': return renderStepCosts(action);
    default: return renderStepGeneric(step);
  }
}

function stepActionBox(step) {
  return `<div class="p-3 rounded-lg bg-white border border-slate-200 text-sm"><p class="text-xs text-slate-400 mb-1">Hành động hệ thống</p><p class="text-slate-700">${step.action}</p></div>`;
}

function renderStepGeneric(step) {
  return stepActionBox(step);
}

function renderStepSamples(action) {
  const id = action.match(/S\d+/)?.[0];
  const s = ZZP_DATA.samples.find(x => x.id === id) || ZZP_DATA.samples[0];
  const koc = ZZP_DATA.kocs.find(k => k.id === s.koc);
  const prod = getProduct(s.product);
  const days = daysSinceSample(s.sentDate);
  const stageLabel = s.status === 'converted' ? 'Convert · đo ROI' : s.status === 'no_content' ? 'Chưa có content' : 'Chờ content';
  return `
    <div class="grid md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl border border-teal-200 bg-teal-50/40">
        <p class="text-xs text-teal-700 font-semibold mb-2 flex items-center gap-1">${icon('gift', 14)} ${stageLabel}</p>
        <p class="font-medium">${koc?.name} · ${prod?.name}</p>
        <p class="text-xs text-slate-500 mt-1">${s.id} · Gửi ${s.sentDate} (${days} ngày)</p>
        <div class="grid grid-cols-3 gap-2 mt-3 text-center text-[10px]">
          <div class="p-2 bg-white rounded-lg"><p class="font-bold">${fmtCurrency(s.cost)}</p><p class="text-slate-400">Chi phí mẫu</p></div>
          <div class="p-2 bg-white rounded-lg"><p class="font-bold text-green-600">${s.revenue ? fmt(s.revenue) : '—'}</p><p class="text-slate-400">Doanh thu</p></div>
          <div class="p-2 bg-white rounded-lg"><p class="font-bold">${s.roi ? s.roi + 'x' : '—'}</p><p class="text-slate-400">Sample ROI</p></div>
        </div>
        ${badge(s.status === 'converted' ? 'Convert' : s.status === 'no_content' ? 'Chưa có content' : 'Chờ content', s.status === 'converted' ? 'ok' : s.status === 'no_content' ? 'critical' : 'pending')}
      </div>
      ${stepActionBox({ action })}
    </div>`;
}

function renderStepContent(action) {
  const v = ZZP_DATA.content.find(c => action.includes(c.id)) || ZZP_DATA.content[0];
  const koc = ZZP_DATA.kocs.find(k => k.id === v.koc);
  return `
    <div class="p-4 rounded-xl border border-violet-200 bg-violet-50/40">
      <div class="flex gap-3">
        <span class="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">${icon(v.type === 'livestream' ? 'radio' : 'video', 22)}</span>
        <div class="flex-1">
          <p class="font-medium">${v.title}</p>
          <p class="text-xs text-slate-500">${koc?.name} · ${v.published}</p>
          <div class="flex gap-4 mt-3 text-xs">
            <span><strong>${fmt(v.views)}</strong> views</span>
            <span><strong>${v.orders}</strong> đơn</span>
            <span class="text-green-600"><strong>${fmt(v.gmv)}</strong> GMV</span>
            <span>CTR <strong>${v.ctr}%</strong></span>
          </div>
        </div>
      </div>
      ${action.includes('deadline') ? `<p class="mt-3 text-xs text-amber-700 flex items-center gap-1">${icon('clock', 12)} Cửa sổ content: còn 9 ngày</p>` : ''}
    </div>`;
}

function renderStepKoc(action) {
  const id = action.match(/K\d+/)?.[0];
  const k = ZZP_DATA.kocs.find(x => action.includes(x.id) || x.id === id) || ZZP_DATA.kocs[0];
  return `
    <div class="p-4 rounded-xl border border-green-200 bg-green-50/40 flex flex-wrap gap-4 items-center">
      <div class="text-center">
        <p class="text-3xl font-black text-green-600">${k.score}</p>
        <p class="text-[10px] text-slate-500">Score</p>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-bold">${k.name}</p>
        <p class="text-xs text-slate-500">${k.tier} · Lifecycle: ${badge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info')}</p>
        <p class="text-sm mt-2">GMV 30d: <strong>${fmt(k.gmv30d)}</strong> · ROI <strong>${k.roi}x</strong></p>
      </div>
    </div>`;
}

function renderStepInventory(action) {
  const p = ZZP_DATA.products.find(x => action.includes(x.id)) || getProduct('P003');
  const daily = Math.round(p.sold30d / 30);
  const days = Math.round(p.stock / daily);
  return `
    <div class="p-4 rounded-xl border border-red-200 bg-red-50/50">
      <div class="flex items-center gap-3">
        ${productThumb(p, 20)}
        <div>
          <p class="font-semibold">${p.name}</p>
          <p class="text-sm text-red-700">Tồn: <strong>${p.stock}</strong> · Velocity: ${daily}/ngày · Còn <strong>${days} ngày</strong></p>
        </div>
      </div>
      <button type="button" onclick="runAutomationFlow('FLOW_STOCK')" class="mt-3 text-xs text-red-700 hover:underline inline-flex items-center gap-1">${icon('play', 12)} Chạy quy trình nhập hàng</button>
    </div>`;
}

function renderStepAlert(action, flow) {
  const id = action.match(/A\d+/)?.[0];
  const a = ZZP_DATA.alerts.find(x => x.id === id) || ZZP_DATA.alerts[0];
  return `
    <div class="p-4 rounded-xl border ${a.severity === 'critical' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}">
      <div class="flex gap-2 items-start">${badge(a.type, a.severity)} ${!a.read ? badge('Mới', 'new') : ''}</div>
      <p class="font-medium mt-2">${a.title}</p>
      <p class="text-sm text-slate-600">${a.desc}</p>
      <button type="button" onclick="openDetail('alert','${a.id}')" class="mt-2 text-xs text-zzp-600 hover:underline">Chi tiết cảnh báo →</button>
    </div>`;
}

function renderStepInsight(action) {
  const id = action.match(/AI\d+/)?.[0];
  const i = ZZP_DATA.aiInsights.find(x => x.id === id) || ZZP_DATA.aiInsights[0];
  return `
    <div class="p-4 rounded-xl border border-zzp-200 bg-zzp-50/50">
      <p class="text-xs text-zzp-600 font-semibold flex items-center gap-1">${icon('sparkles', 14)} AI Insight #${i.priority}</p>
      <p class="font-medium mt-1">${i.title}</p>
      <p class="text-sm text-slate-600 mt-1">${i.desc}</p>
      <p class="text-sm text-green-600 mt-2">Tác động: ${i.impact}</p>
    </div>`;
}

function renderStepAction(action) {
  const id = action.match(/AQ\d+/)?.[0];
  const a = ZZP_DATA.actionQueue.find(x => x.id === id) || ZZP_DATA.actionQueue[0];
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-white">
      <p class="font-medium">${a.title}</p>
      <p class="text-xs text-slate-500 mt-1">${a.source} · ${a.assignee}</p>
      <div class="flex gap-2 mt-3">${badge(a.priority, a.priority === 'critical' ? 'critical' : 'warning')} ${badge(a.status, a.status)}</div>
    </div>`;
}

function renderStepOrder(action) {
  const id = action.match(/ORD-[\d]+/)?.[0];
  const o = ZZP_DATA.orders.find(x => x.id === id) || ZZP_DATA.orders[0];
  return `
    <div class="p-4 rounded-xl border ${o.sla !== 'ok' ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}">
      <p class="font-mono text-xs text-zzp-600">${o.id}</p>
      <p class="font-medium mt-1">${o.customer} · ${o.productName}</p>
      <p class="text-sm mt-2">${fmtCurrency(o.total)} · SLA: <strong class="${o.sla !== 'ok' ? 'text-red-600' : ''}">${o.sla}</strong></p>
      ${o.status === 'pending' ? `<button type="button" onclick="processOrder('${o.id}')" class="mt-2 px-3 py-1 bg-zzp-600 text-white rounded-lg text-xs">Xử lý đơn</button>` : ''}
    </div>`;
}

function renderStepAds(action) {
  const id = action.match(/AD\d+/)?.[0];
  const a = ZZP_DATA.ads.find(x => x.id === id) || ZZP_DATA.ads[0];
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-white">
      <p class="font-medium text-sm">${a.name}</p>
      <div class="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
        <div class="p-2 bg-slate-50 rounded"><p class="font-bold">${fmt(a.budget)}</p><p class="text-slate-400">Budget</p></div>
        <div class="p-2 bg-slate-50 rounded"><p class="font-bold ${a.roas >= 2 ? 'text-green-600' : 'text-red-600'}">${a.roas}x</p><p class="text-slate-400">ROAS</p></div>
        <div class="p-2 bg-slate-50 rounded">${badge(a.status, a.status)}</div>
      </div>
    </div>`;
}

function renderStepCompliance(action) {
  const polId = action.match(/POL\d+/)?.[0];
  const prodId = action.match(/P\d+/)?.[0];
  const pol = polId ? ZZP_DATA.policies.find(p => p.id === polId) : null;
  const prod = prodId ? getProduct(prodId) : null;
  if (pol) {
    return `<div class="p-4 rounded-xl border border-red-200 bg-red-50/50"><p class="font-medium">${pol.title}</p><p class="text-sm text-slate-600 mt-1">${pol.aiSummary}</p></div>`;
  }
  if (prod) {
    return `<div class="p-4 rounded-xl border border-purple-200 bg-purple-50/50"><p class="font-medium">${prod.name}</p><p class="text-sm">Listing score: <strong>${prod.listingScore}%</strong> · ${badge(prod.status, prod.status)}</p></div>`;
  }
  return stepActionBox({ action });
}

function renderStepListing(action) {
  const p = getProduct('P006');
  return `
    <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
      <p class="font-medium">${p.name} — Listing Quality</p>
      <div class="flex items-center gap-2 mt-2"><div class="flex-1 h-2 bg-slate-200 rounded-full"><div class="h-2 bg-amber-500 rounded-full" style="width:${p.listingScore}%"></div></div><span class="font-bold">${p.listingScore}%</span></div>
      <p class="text-xs text-amber-700 mt-2">${icon('alert-circle', 12)} Cần upload ảnh INCI → mục tiêu 85%</p>
    </div>`;
}

function renderStepCampaign(action) {
  const c = ZZP_DATA.campaigns.find(x => action.includes(x.id)) || ZZP_DATA.campaigns[0];
  return `
    <div class="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
      <p class="font-medium">${c.name}</p>
      <p class="text-xs text-slate-500">${c.start} → ${c.end} · Giảm ${c.discount || 0}%</p>
      <p class="text-sm mt-2">Budget ${fmt(c.budget)} · GMV <strong class="text-green-600">${fmt(c.gmv)}</strong></p>
    </div>`;
}

function renderStepVoucher(action) {
  const v = ZZP_DATA.vouchers[0];
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-white">
      <p class="font-mono font-bold text-zzp-700">${v.code}</p>
      <p class="text-sm text-slate-600 mt-1">Đã dùng ${v.used}/${v.limit} · Chi phí ${fmt(v.cost)}</p>
      ${badge(v.guardrail === 'warning' ? 'Cảnh báo' : 'OK', v.guardrail === 'warning' ? 'warning' : 'ok')}
    </div>`;
}

function renderStepLive(action) {
  const l = ZZP_DATA.liveSessions[0];
  return `
    <div class="p-4 rounded-xl border border-pink-200 bg-pink-50/40">
      <p class="font-medium">${l.title}</p>
      <p class="text-xs text-slate-500">${l.date} · Checklist ${l.checklistDone}/${l.checklistTotal}</p>
      <div class="h-2 bg-slate-200 rounded-full mt-2"><div class="h-2 bg-pink-500 rounded-full" style="width:${l.checklistDone / l.checklistTotal * 100}%"></div></div>
    </div>`;
}

function renderStepAffiliate(action) {
  const total = ZZP_DATA.kocs.reduce((s, k) => s + k.gmv30d, 0);
  return `
    <div class="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
      <p class="text-sm">Affiliate GMV 30d: <strong>${fmt(total)}</strong></p>
      <p class="text-xs text-slate-500 mt-1">${(total / ZZP_DATA.revenueBreakdown.total * 100).toFixed(0)}% tổng GMV · Top: @livewithhuong</p>
    </div>`;
}

function renderStepRule(action) {
  const r = ZZP_DATA.automationRules.find(x => action.includes(x.id)) || ZZP_DATA.automationRules.find(x => action.includes('ROAS')) || ZZP_DATA.automationRules[1];
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-white">
      <div class="flex flex-wrap items-center gap-2 mb-2">${renderPlatformBadge(r.platform || 'cross')}${badge(r.active ? 'Đang bật' : 'Tắt', r.active ? 'ok' : 'info')}</div>
      <p class="font-medium text-sm">${r.name}</p>
      <p class="text-xs text-slate-500 mt-1">Kích hoạt: ${r.trigger}</p>
      <p class="text-xs text-slate-600 mt-1">→ ${r.action}</p>
      ${r.flowId ? `<button type="button" onclick="runAutomationFlow('${r.flowId}')" class="mt-3 text-xs text-zzp-600 hover:underline inline-flex items-center gap-1">${icon('play', 12)} Chạy quy trình liên kết</button>` : ''}
    </div>`;
}

function renderStepForecast(action) {
  const f = ZZP_DATA.forecasts.inventory[0];
  const p = getProduct(f.product);
  return `
    <div class="p-4 rounded-xl border border-cyan-200 bg-cyan-50/40">
      <p class="font-medium">${p?.name}</p>
      <p class="text-sm text-red-600 mt-1">Stockout dự kiến: ${f.daysLeft} ngày · ${f.recommendation}</p>
    </div>`;
}

function renderStepNotify(action) {
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
      ${['In-App', 'Zalo'].map(ch => `<div class="flex items-center gap-2 text-sm"><span class="w-2 h-2 rounded-full bg-green-500"></span> ${ch}: đã gửi thông báo</div>`).join('')}
      <p class="text-xs text-slate-500">${action}</p>
    </div>`;
}

function renderStepTeam(action) {
  const u = ZZP_DATA.team.find(t => action.includes(t.name.split(' ').pop())) || ZZP_DATA.team[1];
  return `
    <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
      <p class="font-medium">${u.name}</p>
      <p class="text-xs text-slate-500">${u.role} · ${u.dept}</p>
      <p class="text-sm mt-2">${action}</p>
    </div>`;
}

function renderStepAudit(action) {
  return `
    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs">
      <p class="text-slate-400">${new Date().toLocaleString('vi-VN')}</p>
      <p class="mt-1">System · ${action}</p>
    </div>`;
}

function renderStepOptimize(action) {
  return `
    <div class="p-4 rounded-xl border border-zzp-200 bg-zzp-50/40">
      <p class="text-sm font-medium text-zzp-800">${icon('zap', 14)} Growth Optimizer</p>
      <p class="text-sm text-slate-600 mt-2">${action}</p>
    </div>`;
}

function renderStepOpportunity(action) {
  const o = ZZP_DATA.opportunities.find(x => action.includes(x.id)) || ZZP_DATA.opportunities[0];
  return `
    <div class="p-4 rounded-xl border border-green-200 bg-green-50/40">
      <p class="font-medium">${o.title}</p>
      <p class="text-sm text-green-600 mt-1">Tiềm năng: ${o.potential}</p>
    </div>`;
}

function renderStepCosts(action) {
  return `
    <div class="p-4 rounded-xl border border-red-200 bg-red-50/40">
      <p class="text-sm">Chi phí quảng cáo tháng: <strong>${fmt(ZZP_DATA.costs.ads)}</strong></p>
      <p class="text-xs text-red-600 mt-1">${action}</p>
    </div>`;
}
