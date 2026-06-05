/* Flow tự động liên kết modules — UC & PRD */
const AUTOMATION_FLOWS = [
  {
    id: 'FLOW_STOCK',
    name: 'Tồn kho thấp → Nhập hàng khẩn',
    desc: 'P003 Mặt nạ Collagen: detect → alert → AI → action → notify',
    modules: ['inventory', 'alerts', 'growth-assistant', 'actions', 'forecast'],
    trigger: 'stock < 100 (P003)',
    icon: 'package-search',
    steps: [
      { id: 's1', label: 'Phát hiện tồn kho thấp', module: 'inventory', action: 'Detect P003 stock=45, velocity=40/ngày' },
      { id: 's2', label: 'Tạo Smart Alert', module: 'alerts', action: 'Alert A001 critical → notify Ops' },
      { id: 's3', label: 'AI phân tích impact', module: 'growth-assistant', action: 'Insight AI003: risk mất 15M GMV/tuần' },
      { id: 's4', label: 'Tạo Action Queue', module: 'actions', action: 'AQ002: Đặt PO 2000 sp → Trần Văn Hùng' },
      { id: 's5', label: 'Gửi thông báo đa kênh', module: 'notifications', action: 'In-App + Zalo → Affiliate Manager' },
      { id: 's6', label: 'Cập nhật Forecast', module: 'forecast', action: 'Inventory forecast: stockout T+2' }
    ]
  },
  {
    id: 'FLOW_ADS',
    name: 'ROAS thấp → Pause & chuyển ngân sách',
    desc: 'AD002 ROAS 1.2x → auto pause → redirect Affiliate',
    modules: ['ads', 'alerts', 'costs', 'affiliate', 'actions'],
    trigger: 'roas < 1.5x',
    icon: 'megaphone-off',
    steps: [
      { id: 's1', label: 'Monitor ROAS real-time', module: 'ads', action: 'AD002 ROAS 1.2x detected' },
      { id: 's2', label: 'Rule R002 kích hoạt', module: 'automation', action: 'Auto trigger: roas < 1.5' },
      { id: 's3', label: 'Tạo cảnh báo chi phí', module: 'alerts', action: 'Alert A002 warning' },
      { id: 's4', label: 'Pause campaign', module: 'ads', action: 'AD002 status → paused' },
      { id: 's5', label: 'AI đề xuất chuyển budget', module: 'growth-assistant', action: 'AI002: chuyển 8M sang Affiliate K002' },
      { id: 's6', label: 'Tạo action & audit log', module: 'actions', action: 'AQ001 pending → Lê Thị Hoa approve' }
    ]
  },
  {
    id: 'FLOW_COMPLIANCE',
    name: 'Chính sách mới → Cập nhật listing',
    desc: 'POL001 INCI → compliance → fix P006 → unlock',
    modules: ['compliance', 'products-setup', 'alerts', 'actions'],
    trigger: 'policy impact = high',
    icon: 'shield-alert',
    steps: [
      { id: 's1', label: 'AI scan Policy Hub', module: 'compliance', action: 'POL001: tiêu chuẩn ảnh INCI mới' },
      { id: 's2', label: 'Map sản phẩm ảnh hưởng', module: 'compliance', action: 'P006 Son dưỡng môi flagged' },
      { id: 's3', label: 'Compliance alert', module: 'alerts', action: 'Alert A005 critical' },
      { id: 's4', label: 'Tạo task cập nhật listing', module: 'actions', action: 'AQ003 → Phạm Đức An' },
      { id: 's5', label: 'Listing Quality re-check', module: 'products-setup', action: 'Upload ảnh INCI → score 71→85' },
      { id: 's6', label: 'Mark policy compliant', module: 'compliance', action: 'POL001 status → compliant' }
    ]
  },
  {
    id: 'FLOW_AI_ACTION',
    name: 'AI Insight → Approve → Thực thi',
    desc: 'Growth loop: insight → action queue → approve → execute',
    modules: ['growth-assistant', 'actions', 'ads', 'audit'],
    trigger: 'AI insight priority ≤ 2',
    icon: 'brain-circuit',
    steps: [
      { id: 's1', label: 'AI Engine phân tích', module: 'growth-assistant', action: 'AI001: Scale Serum VC Spark Ads' },
      { id: 's2', label: 'Tạo action tự động', module: 'actions', action: 'AQ004: Tăng budget +30%' },
      { id: 's3', label: 'Owner approve', module: 'actions', action: 'Nguyễn Minh Anh approve AQ004' },
      { id: 's4', label: 'Thực thi trên Ads', module: 'ads', action: 'AD001 budget 15M → 19.5M' },
      { id: 's5', label: 'Ghi audit log', module: 'audit', action: 'Log: Budget increased AD001' }
    ]
  },
  {
    id: 'FLOW_ORDER_SLA',
    name: 'Đơn sắp quá SLA → Xử lý tự động',
    desc: 'SLA breach risk → alert → assign → process',
    modules: ['orders', 'alerts', 'team'],
    trigger: 'order pending + sla < 4h',
    icon: 'clock-alert',
    steps: [
      { id: 's1', label: 'SLA Monitor detect', module: 'orders', action: 'ORD-88421 SLA 2h remaining' },
      { id: 's2', label: 'Operation alert', module: 'alerts', action: 'Alert A004 info' },
      { id: 's3', label: 'Auto-assign Ops', module: 'team', action: 'Assign Trần Văn Hùng' },
      { id: 's4', label: 'Process order', module: 'orders', action: 'Status pending → processing' }
    ]
  },
  {
    id: 'FLOW_LIVE_PREP',
    name: 'Chuẩn bị Mega Live tự động',
    desc: 'Live checklist → campaign → voucher → ads schedule',
    modules: ['livestream', 'campaigns', 'vouchers', 'ads', 'koc'],
    trigger: 'live session T-2 days',
    icon: 'radio-tower',
    steps: [
      { id: 's1', label: 'Live Checklist reminder', module: 'livestream', action: 'L001 checklist 6/8' },
      { id: 's2', label: 'Tạo Flash Sale campaign', module: 'campaigns', action: 'CP001 Flash Sale -20%' },
      { id: 's3', label: 'Setup live-only voucher', module: 'vouchers', action: 'LIVE15 15% max 50K' },
      { id: 's4', label: 'Schedule Live Ads', module: 'ads', action: 'AD003 scheduled 6/6 19:30' },
      { id: 's5', label: 'Notify KOC host', module: 'koc', action: '@livewithhuong briefing sent' }
    ]
  },
  {
    id: 'FLOW_SAMPLE',
    name: 'Gửi mẫu → Content → Doanh thu',
    desc: 'KOC lifecycle: sample → track → convert → score update',
    modules: ['samples', 'koc', 'content', 'affiliate-analytics'],
    trigger: 'sample sent',
    icon: 'gift',
    steps: [
      { id: 's1', label: 'Gửi mẫu cho KOC', module: 'samples', action: 'S001 → @linhskincare Serum VC' },
      { id: 's2', label: 'Track content deadline', module: 'content', action: '14-day content window' },
      { id: 's3', label: 'Video published', module: 'content', action: 'V001 Routine 3 bước → 520K views' },
      { id: 's4', label: 'Measure Sample ROI', module: 'samples', action: 'ROI 42.8x → converted' },
      { id: 's5', label: 'Update KOC score & tier', module: 'koc', action: 'K001 score 92, lifecycle revenue' }
    ]
  },
  {
    id: 'FLOW_OPTIMIZE',
    name: 'Growth Optimizer — Chạy toàn bộ',
    desc: '6 optimizers parallel → action queue batch',
    modules: ['optimization', 'growth-assistant', 'actions', 'opportunities'],
    trigger: 'manual / weekly cron',
    icon: 'trending-up',
    steps: [
      { id: 's1', label: 'Product Portfolio Optimizer', module: 'optimization', action: 'Scale P001,P005 · Fix P006 · Restock P003' },
      { id: 's2', label: 'KOC Discovery Engine', module: 'optimization', action: 'Promote @skintips_daily tier' },
      { id: 's3', label: 'Content Replication', module: 'optimization', action: 'Clone Routine format × 3 KOC' },
      { id: 's4', label: 'Campaign Budget Optimizer', module: 'optimization', action: 'Reallocate ads → affiliate' },
      { id: 's5', label: 'Batch create actions', module: 'actions', action: '4 new actions in queue' },
      { id: 's6', label: 'Update opportunities', module: 'opportunities', action: 'O003 → in_progress' }
    ]
  }
];

let activeFlowRun = null;

function getFlowsForModule(pageId) {
  return AUTOMATION_FLOWS.filter(f => f.modules.includes(pageId));
}

function executeFlowStep(flow, stepIndex) {
  return new Promise(resolve => {
    setTimeout(resolve, 800);
  });
}

async function runAutomationFlow(flowId) {
  const flow = AUTOMATION_FLOWS.find(f => f.id === flowId);
  if (!activeFlowRun) activeFlowRun = { flowId, step: 0, status: 'running' };

  openFlowRunner(flow, 0);

  for (let i = 0; i < flow.steps.length; i++) {
    activeFlowRun.step = i;
    updateFlowRunnerUI(flow, i, 'running');
    await executeFlowStep(flow, i);

    // Apply side effects on last steps for demo
    applyFlowEffects(flow, i);
    updateFlowRunnerUI(flow, i, 'done');
  }

  activeFlowRun.status = 'completed';
  updateFlowRunnerUI(flow, flow.steps.length - 1, 'complete');
  ZZP_DATA.auditLog.unshift({
    time: new Date().toLocaleString('vi-VN'),
    user: 'System',
    action: `Flow completed: ${flow.name}`,
    module: 'Automation'
  });
  showToast(`✓ Flow hoàn tất: ${flow.name}`);
}

function applyFlowEffects(flow, stepIndex) {
  const step = flow.steps[stepIndex];
  if (flow.id === 'FLOW_STOCK' && stepIndex === 3) {
    if (!ZZP_DATA.actionQueue.find(a => a.id === 'AQ002')) {
      ZZP_DATA.actionQueue.unshift({ id: 'AQ002', title: 'Đặt PO nhập kho P003 — 2000 sp', source: 'FLOW_STOCK', status: 'pending', assignee: 'Trần Văn Hùng', priority: 'critical' });
    }
  }
  if (flow.id === 'FLOW_ADS' && stepIndex === 3) {
    const ad = ZZP_DATA.ads.find(a => a.id === 'AD002');
    if (ad) ad.status = 'paused';
  }
  if (flow.id === 'FLOW_ORDER_SLA' && stepIndex === 3) {
    const order = ZZP_DATA.orders.find(o => o.id === 'ORD-88421');
    if (order && order.status === 'pending') order.status = 'processing';
  }
  if (flow.id === 'FLOW_AI_ACTION' && stepIndex === 3) {
    const ad = ZZP_DATA.ads.find(a => a.id === 'AD001');
    if (ad) ad.budget = Math.round(ad.budget * 1.3);
    const aq = ZZP_DATA.actionQueue.find(a => a.id === 'AQ004');
    if (aq) aq.status = 'approved';
  }
  if (flow.id === 'FLOW_COMPLIANCE' && stepIndex === 4) {
    const p = ZZP_DATA.products.find(p => p.id === 'P006');
    if (p) { p.listingScore = 85; p.status = 'active'; }
    const pol = ZZP_DATA.policies.find(p => p.id === 'POL001');
    if (pol) pol.status = 'compliant';
  }
}

function openFlowRunner(flow, currentStep) {
  const html = renderFlowRunner(flow, currentStep, 'running');
  openModal(html);
}

function updateFlowRunnerUI(flow, currentStep, phase) {
  const body = document.getElementById('modal-body');
  if (body) body.innerHTML = renderFlowRunner(flow, currentStep, phase);
}

function renderFlowPanel(pageId) {
  const flows = getFlowsForModule(pageId);
  if (!flows.length) return `<div class="text-center py-12 bg-slate-50 rounded-xl"><p class="text-slate-500">Module này chưa có flow tự động liên kết.</p><button onclick="navigate('workflows')" class="mt-3 text-sm text-zzp-600 hover:underline">Xem tất cả flows →</button></div>`;
  return `
    <div class="space-y-4">
      <p class="text-sm text-slate-500">${flows.length} flow tự động liên kết module này với các module khác. Nhấn "Chạy flow" để xem từng bước thực thi.</p>
      ${flows.map(f => `
        <div class="p-5 bg-white rounded-xl border border-slate-200 hover:border-zzp-300 transition-colors">
          <div class="flex items-start justify-between gap-4">
            <div class="flex gap-3">
              <span class="flex shrink-0">${iconBox(FLOW_ICONS[f.id] || f.icon || 'workflow', 20, 'bg-zzp-50 text-zzp-600')}</span>
              <div><p class="font-semibold">${f.name}</p><p class="text-sm text-slate-500 mt-1">${f.desc}</p>
                <p class="text-xs text-slate-400 mt-2">Trigger: ${f.trigger}</p>
                <div class="flex flex-wrap gap-1 mt-2">${f.modules.map(m => `<span class="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full">${m}</span>`).join('')}</div>
              </div>
            </div>
            <button onclick="runAutomationFlow('${f.id}')" class="shrink-0 px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm hover:bg-zzp-700">▶ Chạy flow</button>
          </div>
          <div class="mt-4 pl-4 border-l-2 border-zzp-200 space-y-2">
            ${f.steps.map((s, i) => `<div class="text-xs text-slate-600"><span class="font-semibold text-zzp-600">${i + 1}.</span> ${s.label} <span class="text-slate-400">→ ${s.module}</span></div>`).join('')}
          </div>
        </div>`).join('')}
      <button onclick="navigate('workflows')" class="w-full py-3 border border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-zzp-400 hover:text-zzp-600">Xem Workflow Center — ${AUTOMATION_FLOWS.length} flows →</button>
    </div>`;
}

function renderFlowRunner(flow, currentStep, phase) {
  return `
    <div class="p-6" id="flow-runner">
      <div class="flex items-center gap-3 mb-4">
        <span class="flex shrink-0">${iconBox(FLOW_ICONS[flow.id] || flow.icon || 'workflow', 24, 'bg-zzp-50 text-zzp-600')}</span>
        <div><h3 class="font-bold text-lg">${flow.name}</h3><p class="text-sm text-slate-500">${flow.desc}</p></div>
      </div>
      <p class="text-xs text-slate-400 mb-4">Trigger: ${flow.trigger}</p>
      <div class="space-y-2 mb-6">
        ${flow.steps.map((s, i) => {
          let cls = 'border-slate-200 bg-slate-50';
          let icon = '○';
          if (i < currentStep || (i === currentStep && phase === 'done') || phase === 'complete') { cls = 'border-green-200 bg-green-50'; icon = '✓'; }
          else if (i === currentStep && phase === 'running') { cls = 'border-zzp-300 bg-zzp-50 ring-2 ring-zzp-200'; icon = '▶'; }
          return `<div class="flex gap-3 p-3 rounded-xl border ${cls} transition-all">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${icon==='✓'?'bg-green-500 text-white':icon==='▶'?'bg-zzp-500 text-white animate-pulse':'bg-slate-200'}">${icon}</span>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">${s.label}</p>
              <p class="text-xs text-slate-500">${s.module} · ${s.action}</p>
            </div>
            ${s.module ? `<button onclick="closeModal();navigate('${s.module}')" class="text-xs text-zzp-600 hover:underline shrink-0">Xem →</button>` : ''}
          </div>`;
        }).join('')}
      </div>
      ${phase === 'complete' ? `
        <div class="p-4 bg-green-50 rounded-xl text-center mb-4">
          <p class="font-semibold text-green-800">✓ Flow hoàn tất thành công</p>
          <p class="text-xs text-green-600 mt-1">Đã cập nhật dữ liệu & audit log</p>
        </div>
        <button onclick="closeModal()" class="w-full px-4 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium">Đóng</button>
      ` : `<div class="flex items-center gap-2 justify-center text-sm text-zzp-600"><span class="w-4 h-4 border-2 border-zzp-600 border-t-transparent rounded-full animate-spin"></span> Đang chạy flow tự động...</div>`}
    </div>`;
}
