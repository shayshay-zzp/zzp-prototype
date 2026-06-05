/* Panel chi tiết từng tab bước flow — 4 kiểu UI khác nhau theo bước */

const LAYER_BADGE = {
  data: 'bg-cyan-600 text-white',
  intelligence: 'bg-violet-600 text-white',
  action: 'bg-amber-600 text-white',
  automation: 'bg-teal-600 text-white'
};

function flowMetrics(items) {
  const n = Math.min(items.length, 4);
  const gridCls = n <= 2 ? 'grid-cols-2' : n === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4';
  return `<div class="grid ${gridCls} gap-2 mb-4">${items.map(m =>
    `<div class="ui-metric-cell"><p class="val ${m.color || ''}">${m.v}</p><p class="lbl">${m.l}</p></div>`
  ).join('')}</div>`;
}

function flowLog(lines) {
  return '';
}

function flowActions(buttons) {
  return `<div class="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">${buttons.join('')}</div>`;
}

function btnPrimary(label, onclick) {
  return `<button type="button" onclick="${onclick}" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 hover:bg-zzp-700">${icon('play', 12)} ${label}</button>`;
}

function btnSecondary(label, onclick) {
  return `<button type="button" onclick="${onclick}" class="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-white">${label}</button>`;
}

function parseEntities(action) {
  return {
    sample: action.match(/S\d+/)?.[0],
    koc: action.match(/K\d+/)?.[0],
    product: action.match(/P\d+/)?.[0],
    order: action.match(/ORD-[\d]+/)?.[0],
    ad: action.match(/AD\d+/)?.[0],
    alert: action.match(/A\d+/)?.[0],
    insight: action.match(/AI\d+/)?.[0],
    action: action.match(/AQ\d+/)?.[0],
    policy: action.match(/POL\d+/)?.[0],
    campaign: action.match(/CP\d+/)?.[0],
    opportunity: action.match(/O\d+/)?.[0]
  };
}

function renderFlowStepPanel(flow, stepIndex, pageId) {
  const step = flow.steps[stepIndex];
  if (!step) return '';
  return renderFlowStepScreen(pageId || flow.pageId, stepIndex, step, flow);
}

const STEP_KINDS = ['collect', 'analyze', 'act', 'auto'];
const STEP_KIND_UI = {
  collect: { label: 'Thu thập', border: 'border-cyan-200', bg: 'bg-cyan-50/50', icon: 'download' },
  analyze: { label: 'Phân tích', border: 'border-violet-200', bg: 'bg-violet-50/50', icon: 'search' },
  act: { label: 'Hành động', border: 'border-amber-200', bg: 'bg-amber-50/50', icon: 'check-square' },
  auto: { label: 'Tự động', border: 'border-teal-200', bg: 'bg-teal-50/50', icon: 'zap' }
};

function flowPanelShell(kind, step, flow, stepIndex, inner) {
  const K = STEP_KIND_UI[kind] || STEP_KIND_UI.collect;
  return `
    <div class="rounded-xl border-2 ${K.border} ${K.bg} overflow-hidden">
      <div class="px-4 py-3 border-b border-inherit flex flex-wrap items-center justify-between gap-2 bg-white/70">
        <p class="text-xs font-semibold text-slate-700 flex items-center gap-1">${icon(K.icon, 14)} ${K.label} · Bước ${stepIndex + 1}/${flow.steps.length}</p>
        <span class="text-[10px] text-slate-500 max-w-[140px] truncate">${step.label}</span>
      </div>
      <div class="p-4">${inner}</div>
    </div>`;
}

function getFlowStepContent(pageId, stepIndex, step, flow) {
  const out = { metrics: [], body: '', actions: [] };
  const pid = pageId || flow.pageId || step.module;

  const baseActions = [
    btnSecondary(`Mở ${viPage(step.module)}`, `navigate('${step.module}')`),
    stepIndex === flow.steps.length - 1 && flow.linkedFlow ? btnPrimary('Chạy quy trình', `runAutomationFlow('${flow.linkedFlow}')`) : ''
  ].filter(Boolean);

  switch (pid) {
    case 'samples':
      if (stepIndex === 0) {
        const s = ZZP_DATA.samples[0];
        const k = ZZP_DATA.kocs.find(x => x.id === s.koc);
        out.metrics = [{ l: 'Gói gửi', v: ZZP_DATA.samples.length }, { l: 'KOC', v: k?.name?.slice(0, 10) || '—' }];
        out.body = `<div class="p-3 bg-white rounded-lg border text-sm">Đăng ký gửi mẫu · ${getProduct(s.product)?.name} · phí ${fmtCurrency(s.cost)}</div>`;
      } else if (stepIndex === 1) {
        out.metrics = [{ l: 'Chờ video', v: ZZP_DATA.samples.filter(s => s.status === 'pending').length }, { l: 'Quá hạn', v: ZZP_DATA.samples.filter(s => s.status === 'no_content').length, color: 'text-red-600' }];
        out.body = `<ul class="text-xs space-y-1">${ZZP_DATA.samples.filter(s => s.status !== 'converted').map(s => `<li class="p-2 bg-white rounded border">${ZZP_DATA.kocs.find(k=>k.id===s.koc)?.name} · ${s.status === 'no_content' ? 'Quá hạn' : 'Đang chờ'}</li>`).join('')}</ul>`;
      } else if (stepIndex === 2) {
        const best = ZZP_DATA.samples.find(s => s.roi > 10);
        out.metrics = [{ l: 'ROI cao nhất', v: best.roi + 'x', color: 'text-green-600' }, { l: 'Doanh thu', v: fmt(best.revenue) }];
        out.body = `<p class="text-sm">So sánh chi phí mẫu vs GMV video — ngưỡng chuyển đổi 2x</p>`;
      } else {
        out.body = `<p class="text-sm">Cập nhật hạng KOC sau convert · đề xuất tăng hoa hồng</p>`;
        out.actions.push(btnPrimary('Chạy quy trình mẫu', `runAutomationFlow('FLOW_SAMPLE')`));
      }
      break;
    case 'inventory':
      if (stepIndex === 0) {
        const p = getProduct('P003');
        out.metrics = [{ l: 'Tồn', v: p.stock, color: 'text-red-600' }, { l: 'SKU', v: 'P003' }];
        out.body = `<div class="h-2 bg-slate-200 rounded-full"><div class="h-2 bg-red-500 rounded-full" style="width:15%"></div></div><p class="text-xs mt-2 text-red-700">${p.name} · còn ${p.stock} sp</p>`;
      } else if (stepIndex === 1) {
        out.metrics = [{ l: 'Hết hàng', v: 'T+2', color: 'text-red-600' }, { l: 'Mất GMV/tuần', v: '15M' }];
        out.body = `<p class="text-sm">Dự báo stockout nếu không nhập thêm 2000 sp</p>`;
      } else if (stepIndex === 2) {
        const a = ZZP_DATA.alerts.find(x => x.id === 'A001');
        out.body = `<div class="p-3 rounded-lg border border-red-200 bg-red-50 text-sm">${a.title}</div>`;
        out.actions.push(btnPrimary('Tạo đơn nhập', `approveAction('AQ002')`));
      } else {
        out.actions.push(btnPrimary('Đặt nhập hàng', `runAutomationFlow('FLOW_STOCK')`));
        out.body = `<ol class="text-xs list-decimal list-inside space-y-1 text-slate-600"><li>Tạo PO 2000 sp</li><li>Gửi duyệt Ops</li><li>Cập nhật tồn đa kênh</li></ol>`;
      }
      break;
    case 'orders':
      if (stepIndex === 0) {
        const pending = ZZP_DATA.orders.filter(o => o.status === 'pending').length;
        out.metrics = [{ l: 'Chờ xử lý', v: pending }, { l: 'SLA risk', v: ZZP_DATA.orders.filter(o => o.sla !== 'ok').length }];
        out.body = `<p class="text-sm">Đơn mới đổ về từ affiliate, live, ads</p>`;
      } else if (stepIndex === 1) {
        const o = ZZP_DATA.orders.find(x => x.id === 'ORD-88421');
        out.body = `<div class="p-3 bg-white border rounded-lg text-sm"><strong>${o.customer}</strong> · ${o.productName} · SLA ${o.sla}</div>`;
      } else if (stepIndex === 2) {
        out.body = `<p class="text-sm">Giao cho Trần Văn Hùng · ưu tiên đơn SLA &lt; 4h</p>`;
        out.actions.push(btnPrimary('Xử lý đơn', `processOrder('ORD-88421')`));
      } else {
        out.actions.push(btnPrimary('Quy trình SLA', `runAutomationFlow('FLOW_ORDER_SLA')`));
      }
      break;
    case 'ads':
      if (stepIndex === 0) {
        out.body = `<div class="space-y-1">${ZZP_DATA.ads.map(a => `<div class="flex justify-between text-xs p-2 bg-white rounded border"><span>${a.name.slice(0, 22)}</span><span class="${a.roas >= 2 ? 'text-green-600' : 'text-red-600'}">${a.roas}x</span></div>`).join('')}</div>`;
      } else if (stepIndex === 1) {
        out.body = `<div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">Mặt nạ ROAS 1.2x — dưới ngưỡng lợi nhuận</div>`;
      } else if (stepIndex === 2) {
        out.body = `<p class="text-sm">Chuyển 8 triệu sang KOC @beautybymai · tạo việc duyệt</p>`;
      } else {
        out.actions.push(btnPrimary('Tối ưu quảng cáo', `runAutomationFlow('FLOW_ADS')`));
      }
      break;
    case 'alerts':
      if (stepIndex === 0) {
        out.metrics = [{ l: 'Tổng', v: ZZP_DATA.alerts.length }, { l: 'Chưa đọc', v: ZZP_DATA.alerts.filter(a => !a.read).length }];
      } else if (stepIndex === 1) {
        out.body = `<div class="space-y-1">${ZZP_DATA.alerts.slice(0, 3).map(a => `<div class="text-xs p-2 rounded border ${a.severity === 'critical' ? 'border-red-200 bg-red-50' : 'bg-white'}">${a.title}</div>`).join('')}</div>`;
      } else if (stepIndex === 2) {
        out.body = `<div class="text-xs space-y-1">${ZZP_DATA.alerts.slice(3).map(a => `<div class="p-2 bg-white border rounded">${a.title} → ${viPage(a.module)}</div>`).join('')}</div>`;
      } else {
        out.actions.push(btnSecondary('Trung tâm quy trình', `navigate('workflows')`));
      }
      break;
    case 'actions':
      if (stepIndex === 0) {
        out.metrics = [{ l: 'Hàng đợi', v: ZZP_DATA.actionQueue.length }, { l: 'Chờ duyệt', v: ZZP_DATA.actionQueue.filter(a => a.status === 'pending').length }];
      } else if (stepIndex === 1) {
        out.body = `<div class="space-y-1">${ZZP_DATA.actionQueue.filter(a => a.priority === 'critical' || a.priority === 'high').map(a => `<div class="text-xs p-2 border rounded bg-white">${a.title}</div>`).join('')}</div>`;
      } else if (stepIndex === 2) {
        const pending = ZZP_DATA.actionQueue.filter(a => a.status === 'pending');
        out.body = `<div class="space-y-2">${pending.map(a => `<div class="p-2 bg-amber-50 border border-amber-200 rounded text-xs flex justify-between"><span>${a.title}</span><button type="button" onclick="approveAction('${a.id}')" class="text-zzp-600 font-medium">Duyệt</button></div>`).join('')}</div>`;
      } else {
        out.body = `<p class="text-sm">Thực thi trên module đích sau khi owner duyệt</p>`;
      }
      break;
    case 'koc':
      if (stepIndex === 0) {
        out.body = `<div class="grid grid-cols-4 gap-1 text-[10px]">${['prospect', 'sample', 'content', 'revenue'].map(s => `<div class="text-center p-2 bg-white rounded border"><p class="font-bold">${ZZP_DATA.kocs.filter(k => k.lifecycle === s).length}</p><p class="text-slate-400">${s}</p></div>`).join('')}</div>`;
      } else if (stepIndex === 1) {
        out.body = `<div class="space-y-1">${ZZP_DATA.kocs.slice(0, 3).map(k => `<div class="flex justify-between text-xs p-2 bg-white border rounded"><span>${k.name}</span><strong>${k.score}</strong></div>`).join('')}</div>`;
      } else if (stepIndex === 2) {
        out.body = `<p class="text-sm">Scale K001 · Nurture K004 · Cắt K006</p>`;
        out.actions.push(btnPrimary('Xem K001', `openDetail('koc','K001')`));
      } else {
        out.body = `<p class="text-sm">Tự gửi mẫu khi điểm KOC ≥ 80</p>`;
      }
      break;
    case 'content':
      if (stepIndex === 0) {
        out.body = `<div class="flex gap-1 flex-wrap">${ZZP_DATA.content.map(c => `<span class="text-[10px] px-2 py-1 rounded-full border ${c.status === 'published' ? 'bg-green-50 border-green-200' : 'bg-slate-50'}">${c.status}</span>`).join('')}</div>`;
      } else if (stepIndex === 1) {
        out.body = `<p class="text-sm">Brief & duyệt draft trước khi lên lịch</p>`;
      } else if (stepIndex === 2) {
        const v = ZZP_DATA.content.find(c => c.id === 'V001');
        out.metrics = [{ l: 'Views', v: fmt(v.views) }, { l: 'GMV', v: fmt(v.gmv) }];
      } else {
        out.body = `<p class="text-sm">Đo hiệu quả sau publish · gắn tag sản phẩm</p>`;
      }
      break;
    default:
      if (stepIndex === 0) {
        out.metrics = getModuleMetrics(pid).slice(0, 4);
        out.body = `<p class="text-sm text-slate-600">Đồng bộ từ TikTok · cập nhật ${TTS_METRICS.shop.syncAt}</p>${renderTtsBreakdownTable(pid) ? `<div class="mt-3">${renderTtsBreakdownTable(pid)}</div>` : ''}`;
      } else if (stepIndex === 1) {
        out.metrics = getModuleMetrics(pid).slice(4, 8).length ? getModuleMetrics(pid).slice(4, 8) : getModuleMetrics(pid).slice(0, 4);
        out.body = `<p class="text-sm text-slate-600">${step.label} — phân tích từ dữ liệu Shop & Affiliate</p>`;
      } else if (stepIndex === 2) {
        out.body = `<p class="text-sm text-slate-600">Chuẩn bị việc cần làm: ${step.label}</p>`;
      } else {
        out.body = `<p class="text-sm text-slate-600">Tự động hoàn tất: ${step.label}</p>`;
        if (flow.linkedFlow) out.actions.push(btnPrimary('Chạy tự động', `runAutomationFlow('${flow.linkedFlow}')`));
      }
  }

  out.actions = [...out.actions, ...baseActions];
  return out;
}

function renderFlowStepLayout(kind, step, content) {
  if (kind === 'collect') {
    return `
      <p class="text-sm font-semibold text-slate-800 mb-3">${step.label}</p>
      ${content.metrics.length ? flowMetrics(content.metrics) : ''}
      ${content.body}
      ${flowActions(content.actions)}`;
  }
  if (kind === 'analyze') {
    return `
      <div class="grid sm:grid-cols-5 gap-3 mb-3">
        <div class="sm:col-span-2 p-3 rounded-xl bg-violet-100/80 border border-violet-200">
          <p class="text-[10px] font-bold text-violet-700 uppercase">Insight</p>
          <p class="text-sm font-semibold mt-1">${step.label}</p>
        </div>
        <div class="sm:col-span-3 p-3 rounded-xl bg-white border border-violet-100">${content.body || '<p class="text-sm text-slate-500">Phân tích dữ liệu vừa thu thập</p>'}</div>
      </div>
      ${content.metrics.length ? flowMetrics(content.metrics) : ''}
      ${flowActions(content.actions)}`;
  }
  if (kind === 'act') {
    return `
      <p class="text-sm font-semibold text-amber-900 mb-2">${step.label}</p>
      <div class="p-3 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 mb-3">${content.body || '<p class="text-sm">Quyết định và giao việc</p>'}</div>
      ${content.metrics.length ? flowMetrics(content.metrics) : ''}
      ${flowActions(content.actions)}`;
  }
  return `
    <p class="text-sm font-semibold text-teal-900 mb-2">${step.label}</p>
    <div class="space-y-2 mb-3">${(content.body ? [content.body] : ['<p class="text-sm text-slate-600">Hoàn tất chuỗi tự động</p>']).map((b, i) => `<div class="flex gap-2 items-start text-sm"><span class="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] shrink-0">${i + 1}</span><div class="flex-1">${b}</div></div>`).join('')}</div>
    ${flowActions(content.actions)}`;
}

function renderSmartFlowPanel(step, flow, pageId, stepIndex) {
  const kind = STEP_KINDS[Math.min(stepIndex, STEP_KINDS.length - 1)];
  const content = getFlowStepContent(pageId, stepIndex, step, flow);
  const inner = renderFlowStepLayout(kind, step, content);
  return flowPanelShell(kind, step, flow, stepIndex, inner);
}

/* Panel tuỳ biến sâu — override khi cần UI đặc biệt hơn smart panel */
const FLOW_STEP_PANELS = {
  'MOD_SAMPLES:s1': (step, flow, pageId, i) => {
    const s = ZZP_DATA.samples.find(x => x.id === 'S001');
    const koc = ZZP_DATA.kocs.find(k => k.id === s.koc);
    const p = getProduct(s.product);
    return flowPanelShell(STEP_KINDS[i] || 'collect', step, flow, i, `
      <p class="font-semibold">Gói mẫu đã gửi cho KOC</p>
      <p class="text-xs text-slate-500 mt-1">Tự duyệt vì điểm KOC ${koc.score} đạt ngưỡng ưu tiên</p>
      ${flowMetrics([{ l: 'Chi phí mẫu', v: fmtCurrency(s.cost) }, { l: 'Điểm KOC', v: koc.score }, { l: 'Sản phẩm', v: p.name.slice(0, 12) }])}
      <div class="p-3 bg-white rounded-lg border flex justify-between items-center">
        <div><p class="font-medium">${koc.name}</p><p class="text-xs text-slate-500">${p.name}</p></div>
        <span class="text-xs text-slate-400">Đã gửi 20/05</span>
      </div>
      <p class="text-xs text-slate-500 mt-2">KOC xác nhận đã nhận mẫu · GHN đang giao</p>
      ${flowActions([btnSecondary('Xem mẫu', `openDetail('sample','S001')`), btnSecondary('Xem KOC', `openDetail('koc','K001')`)])}`);
  },
  'MOD_SAMPLES:s2': (step, flow, pageId, i) => {
    const pending = ZZP_DATA.samples.filter(s => s.status === 'pending');
    return flowPanelShell(STEP_KINDS[i] || 'analyze', step, flow, i, `
      <p class="font-semibold">Theo dõi cửa sổ content 14 ngày</p>
      ${flowMetrics([{ l: 'Chờ content', v: pending.length }, { l: 'S002 còn', v: '6 ngày' }, { l: 'S003', v: 'Quá hạn', color: 'text-red-600' }])}
      <div class="space-y-2">${pending.map(s => {
        const k = ZZP_DATA.kocs.find(x => x.id === s.koc);
        const days = daysSinceSample(s.sentDate);
        return `<div class="p-2 bg-white rounded border text-xs flex justify-between"><span>${k?.name}</span><span class="${14 - days < 3 ? 'text-amber-600 font-bold' : ''}">${14 - days} ngày còn</span></div>`;
      }).join('')}</div>
      ${flowActions([btnPrimary('Nhắc KOC', `showToast('Đã gửi nhắc content qua TikTok DM')`), btnSecondary('Lịch nội dung', `navigate('content')`)])}`);
  },
  'MOD_SAMPLES:s3': (step, flow, pageId, i) => {
    const s = ZZP_DATA.samples.find(x => x.id === 'S001');
    const v = ZZP_DATA.content.find(c => c.id === 'V001');
    const roi = calcSampleRoiDetailed(s);
    return flowPanelShell(STEP_KINDS[i] || 'act', step, flow, i, `
      <p class="font-semibold">Đo Sample ROI · Convert</p>
      ${flowMetrics([
        { l: 'ROI', v: roi.roi + 'x', color: 'text-green-600' },
        { l: 'Margin', v: roi.margin + '%' },
        { l: 'Doanh thu', v: fmt(s.revenue) },
        { l: 'Chi phí', v: fmtCurrency(s.cost) },
        { l: 'Payback', v: roi.paybackDays ? roi.paybackDays + ' ngày' : '—' },
        { l: 'Pipeline ROI', v: TTS_METRICS.samples.pipelineRoi + 'x', color: 'text-green-600' }
      ])}
      <p class="text-sm mt-2">Video liên kết: <strong>${v.title}</strong> · ${fmt(v.gmv)} GMV · CTR ${getVideoMetrics('V001')?.ctr || v.ctr}%</p>
      ${flowActions([btnPrimary('Chạy quy trình mẫu', `runAutomationFlow('FLOW_SAMPLE')`), btnSecondary('Chi tiết', `openDetail('sample','S001')`)])}`);
  },
  'MOD_SAMPLES:s4': (step, flow, pageId, i) => {
    const k = ZZP_DATA.kocs.find(x => x.id === 'K001');
    return flowPanelShell(STEP_KINDS[i] || 'auto', step, flow, i, `
      <p class="font-semibold">Cập nhật điểm & hạng KOC</p>
      <div class="flex gap-4 items-center mt-3">
        <div class="text-center"><p class="text-3xl font-black text-green-600">${k.score}</p><p class="text-[10px]">Điểm</p></div>
        <div><p class="font-bold">${k.name}</p><p class="text-sm">${k.tier} → <strong>Macro+</strong></p><p class="text-xs text-slate-500">Giai đoạn: Doanh thu</p></div>
      </div>
      <p class="text-xs text-slate-500 mt-2">Đề xuất tăng hoa hồng 12% → 15%</p>
      ${flowActions([btnPrimary('Chạy quy trình', `runAutomationFlow('FLOW_SAMPLE')`), btnSecondary('Bảng điểm', `navigate('creator-analytics')`)])}`);
  },
  'MOD_INVENTORY:s1': (step, flow, pageId, i) => {
    const p = getProduct('P003');
    const daily = Math.round(p.sold30d / 30);
    return flowPanelShell(STEP_KINDS[i] || 'collect', step, flow, i, `
      <p class="font-semibold">Phát hiện tồn kho thấp — ${p.name}</p>
      ${flowMetrics([{ l: 'Tồn', v: p.stock, color: 'text-red-600' }, { l: 'Bán/ngày', v: daily + ' sp' }, { l: 'Còn', v: Math.round(p.stock / daily) + ' ngày', color: 'text-red-600' }])}
      <div class="h-3 bg-slate-100 rounded-full mt-2"><div class="h-3 bg-red-500 rounded-full" style="width:${Math.min(100, p.stock / 10)}%"></div></div>
      ${flowActions([btnPrimary('Đặt nhập hàng', `runAutomationFlow('FLOW_STOCK')`), btnSecondary('Chi tiết SP', `openDetail('product','P003')`)])}`);
  },
  'MOD_INVENTORY:s3': (step, flow, pageId, i) => {
    const a = ZZP_DATA.alerts.find(x => x.id === 'A001');
    const ai = ZZP_DATA.aiInsights.find(x => x.id === 'AI003');
    return flowPanelShell(STEP_KINDS[i] || 'act', step, flow, i, `
      <p class="font-semibold">Smart Alert + AI Impact</p>
      <div class="grid md:grid-cols-2 gap-3 mt-2">
        <div class="p-3 rounded-lg border border-red-200 bg-red-50"><p class="text-xs font-bold text-red-700">${a.title}</p><p class="text-[10px] text-slate-600 mt-1">${a.desc}</p></div>
        <div class="p-3 rounded-lg border border-zzp-200 bg-zzp-50"><p class="text-xs font-bold text-zzp-700">${ai.title}</p><p class="text-[10px] text-green-600 mt-1">${ai.impact}</p></div>
      </div>
      ${flowActions([btnPrimary('Tạo PO', `approveAction('AQ002')`), btnSecondary('Forecast', `navigate('forecast')`)])}`);
  },
  'MOD_ORDERS:s1': (step, flow, pageId, i) => {
    const o = ZZP_DATA.orders.find(x => x.id === 'ORD-88421');
    return flowPanelShell(STEP_KINDS[i] || 'collect', step, flow, i, `
      <p class="font-semibold">SLA Monitor · Đơn sắp quá hạn</p>
      ${flowMetrics([{ l: 'Mã đơn', v: o.id.slice(-5) }, { l: 'SLA còn', v: o.sla, color: 'text-red-600' }, { l: 'Tổng', v: fmtCurrency(o.total) }])}
      <p class="text-sm">${o.customer} · ${o.productName} · Nguồn ${o.source}</p>
      ${flowActions([btnPrimary('Xử lý ngay', `processOrder('ORD-88421')`), btnPrimary('Chạy quy trình SLA', `runAutomationFlow('FLOW_ORDER_SLA')`)])}`);
  },
  'MOD_ADS:s4': (step, flow, pageId, i) => {
    return flowPanelShell(STEP_KINDS[i] || 'auto', step, flow, i, `
      <p class="font-semibold">Thực hiện tối ưu quảng cáo</p>
      <ol class="text-sm space-y-2 mt-2 list-decimal list-inside text-slate-700">
        <li>Tạm dừng quảng cáo Mặt nạ (ROAS 1.2x)</li>
        <li>Chuyển 8 triệu sang tiếp thị liên kết</li>
        <li>Gửi duyệt cho Lê Thị Hoa</li>
        <li>Lưu lại lịch sử thay đổi</li>
      </ol>
      ${flowActions([btnPrimary('Chạy quy trình', `runAutomationFlow('FLOW_ADS')`), btnSecondary('Chi phí', `navigate('costs')`)])}`);
  },
  'MOD_GROWTH_ASSISTANT:s2': (step, flow, pageId, i) => {
    return flowPanelShell(STEP_KINDS[i] || 'analyze', step, flow, i, `
      <p class="font-semibold mb-3">4 insight AI xếp hạng ưu tiên</p>
      <div class="space-y-2">${ZZP_DATA.aiInsights.map(ins => `
        <button type="button" onclick="openDetail('insight','${ins.id}')" class="w-full text-left p-3 bg-white rounded-lg border hover:border-zzp-300 flex gap-3">
          <span class="w-7 h-7 rounded-full bg-zzp-100 text-zzp-700 flex items-center justify-center text-xs font-bold">${ins.priority}</span>
          <div class="flex-1 min-w-0"><p class="text-sm font-medium truncate">${ins.title}</p><p class="text-xs text-green-600">${ins.impact} · ${ins.confidence}%</p></div>
        </button>`).join('')}
      </div>
      ${flowActions([btnPrimary('Thực hiện gợi ý', `runAutomationFlow('FLOW_AI_ACTION')`)])}`);
  },
  'MOD_COMPLIANCE:s1': (step, flow, pageId, i) => {
    const pol = ZZP_DATA.policies.find(p => p.id === 'POL001');
    return flowPanelShell(STEP_KINDS[i] || 'collect', step, flow, i, `
      <p class="font-semibold">${pol.title}</p>
      <p class="text-sm text-slate-600 mt-2">${pol.aiSummary}</p>
      <p class="text-xs mt-2">Ảnh hưởng: ${pol.affected.map(id => getProduct(id)?.name).join(', ')}</p>
      ${flowActions([btnPrimary('Xử lý tuân thủ', `runAutomationFlow('FLOW_COMPLIANCE')`), btnSecondary('Chính sách', `navigate('compliance')`)])}`);
  },
  'MOD_ONBOARDING:s3': (step, flow, pageId, i) => {
    const health = calcHealthScore();
    const done = ZZP_DATA.checklist.filter(c => c.done).length;
    return flowPanelShell(STEP_KINDS[i] || 'analyze', step, flow, i, `
      <p class="font-semibold">Shop Health Score</p>
      ${flowMetrics([{ l: 'Điểm shop', v: health + '%', color: health >= 80 ? 'text-green-600' : 'text-amber-600' }, { l: 'Checklist', v: done + '/10' }, { l: 'Listing', v: '+18' }])}
      <div class="h-3 bg-slate-100 rounded-full"><div class="h-3 bg-zzp-500 rounded-full" style="width:${health}%"></div></div>
      ${flowActions([btnSecondary('Checklist', `navigate('onboarding')`), btnPrimary('Bước tiếp', `startSetup('c5')`)])}`);
  },
  'MOD_PRODUCTS_SETUP:s3': (step, flow, pageId, i) => {
    return flowPanelShell(STEP_KINDS[i] || 'act', step, flow, i, `
      <p class="font-semibold">Wizard AI · SKU chủ lực</p>
      <p class="text-sm text-slate-600 mt-1">5 bước: thông tin → AI nội dung → 6 ảnh AI → video & tuân thủ → đăng TikTok Shop</p>
      ${flowMetrics([{ l: 'Hero ≥85%', v: ZZP_DATA.products.filter(p => p.hero && p.listingScore >= 85).length + '/5' }, { l: 'c5', v: ZZP_DATA.checklist.find(c => c.id === 'c5')?.done ? 'Xong' : 'Chưa' }])}
      ${flowActions([btnPrimary('Mở wizard', `openProductCreateWizard()`), btnSecondary('Listing check', `openListingCheck('P006')`)])}`);
  }
};

function initFlowStepCharts(flow, stepIndex) {
  const step = flow.steps[stepIndex];
  if (!step) return;
  const canvas = document.querySelector(`canvas[data-flow-chart="${flow.id}:${step.id}"]`);
  if (!canvas || typeof Chart === 'undefined') return;
  const id = `fc-${flow.id}-${step.id}`;
  canvas.id = id;
  if (step.layer === 'data' && step.module === 'datahub') {
    new Chart(canvas, { type: 'bar', data: { labels: ZZP_DATA.dataSync.map(d => d.source.split(' ')[0]), datasets: [{ data: ZZP_DATA.dataSync.map(d => d.records / 1000), backgroundColor: '#14b8a6', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
  } else if (step.layer === 'intelligence') {
    new Chart(canvas, { type: 'doughnut', data: { labels: ['Affiliate', 'Live', 'Ads', 'Organic'], datasets: [{ data: [ZZP_DATA.revenueBreakdown.affiliate, ZZP_DATA.revenueBreakdown.livestream, ZZP_DATA.revenueBreakdown.ads, ZZP_DATA.revenueBreakdown.organic].map(v => v / 1e6), backgroundColor: ['#14b8a6', '#6366f1', '#fe2c55', '#94a3b8'] }] }, options: { responsive: true, maintainAspectRatio: false } });
  }
}
