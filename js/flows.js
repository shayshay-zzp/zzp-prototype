/* Quy trình tự động tích hợp TikTok Shop · Ads · Affiliate */

const FLOW_PLATFORMS = {
  shop: { label: 'TikTok Shop', icon: 'shopping-bag', chip: 'bg-slate-900 text-white', border: 'border-slate-200' },
  ads: { label: 'TikTok Ads', icon: 'megaphone', chip: 'bg-[#fe2c55] text-white', border: 'border-rose-100' },
  affiliate: { label: 'Affiliate Center', icon: 'users', chip: 'bg-teal-600 text-white', border: 'border-teal-100' },
  cross: { label: 'Đa nền tảng', icon: 'layers', chip: 'bg-zzp-600 text-white', border: 'border-zzp-100' }
};

const FLOW_PHASES = {
  event: { label: 'Sự kiện TikTok', icon: 'radio', color: 'text-rose-600 bg-rose-50' },
  sync: { label: 'Đồng bộ dữ liệu', icon: 'refresh-cw', color: 'text-cyan-700 bg-cyan-50' },
  analyze: { label: 'Phân tích ZZP', icon: 'sparkles', color: 'text-violet-700 bg-violet-50' },
  execute: { label: 'Thực thi trên TikTok', icon: 'zap', color: 'text-amber-700 bg-amber-50' },
  confirm: { label: 'Xác nhận & thông báo', icon: 'check-circle', color: 'text-green-700 bg-green-50' }
};

function ttsMetric(path, fallback) {
  try {
    if (typeof TTS_METRICS === 'undefined') return fallback;
    return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), TTS_METRICS) ?? fallback;
  } catch (_) {
    return fallback;
  }
}

const AUTOMATION_FLOWS = [
  {
    id: 'FLOW_STOCK',
    name: 'Tồn kho thấp → Cảnh báo & đề xuất nhập hàng',
    desc: 'TikTok Shop báo SKU sắp hết → ZZP dự báo stockout → tạo việc nhập hàng cho Ops',
    platform: 'shop',
    ruleId: 'R001',
    triggerType: 'webhook',
    trigger: 'Tồn kho TikTok Shop < 100 sp · SKU Mặt nạ Collagen',
    modules: ['inventory', 'alerts', 'growth-assistant', 'actions', 'forecast'],
    icon: 'package-search',
    steps: [
      { id: 's1', phase: 'event', label: 'Nhận webhook tồn kho từ TikTok Shop', integration: 'Inventory Sync', module: 'inventory', action: 'SKU P003 · available 45 · committed 28 · bán ~40 sp/ngày', detail: 'Sự kiện INVENTORY_LOW từ Seller Center · warehouse VN-HCM-01' },
      { id: 's2', phase: 'sync', label: 'Đối soát tồn ERP & TikTok Shop', integration: 'Đa kênh', module: 'inventory', action: 'Xác nhận lệch tồn 0 · velocity 40/ngày · còn ~1 ngày bán', detail: 'Đồng bộ 2 kho · cập nhật lúc ' + ttsMetric('shop.syncAt', '14:32') },
      { id: 's3', phase: 'analyze', label: 'Dự báo mất GMV nếu hết hàng', integration: 'ZZP Forecast', module: 'forecast', action: 'Stockout dự kiến T+2 · rủi ro ~15M GMV/tuần · ưu tiên nhập 2.000 sp', detail: 'Gợi ý PO dựa trên sold30d và lead time nhà cung cấp 5 ngày' },
      { id: 's4', phase: 'execute', label: 'Tạo việc nhập hàng & gửi cảnh báo', integration: 'Action Queue', module: 'actions', action: 'Giao Trần Văn Hùng · đặt PO 2.000 sp P003 · thông báo Affiliate Manager', detail: 'Chờ duyệt trước khi cập nhật tồn trên TikTok Shop' },
      { id: 's5', phase: 'confirm', label: 'Ghi nhận & theo dõi sau nhập', integration: 'Audit', module: 'notifications', action: 'In-App + Zalo · log quy trình · theo dõi SLA nhập hàng 48h', detail: 'Sau khi PO về, tồn TikTok Shop tự cập nhật qua ERP sync' }
    ]
  },
  {
    id: 'FLOW_ADS',
    name: 'ROAS thấp → Tạm dừng Ads & chuyển ngân sách',
    desc: 'TikTok Ads báo ROAS dưới ngưỡng → ZZP tạm dừng campaign → chuyển budget sang Affiliate',
    platform: 'ads',
    ruleId: 'R002',
    triggerType: 'rule',
    trigger: 'ROAS campaign < 1.5x · kiểm tra mỗi 15 phút',
    modules: ['ads', 'alerts', 'costs', 'affiliate', 'actions'],
    icon: 'megaphone-off',
    steps: [
      { id: 's1', phase: 'sync', label: 'Đồng bộ hiệu suất GMV Max & Product Ads', integration: 'TikTok Ads Reporting', module: 'ads', action: 'Campaign Mặt nạ Collagen · spend 8.2M · ROAS 1.2x · dưới ngưỡng lợi nhuận', detail: 'Blended ROAS shop ' + ttsMetric('ads.blendedRoas', 2.4) + 'x · campaign này kéo lệch trung bình' },
      { id: 's2', phase: 'event', label: 'Quy tắc ROAS kích hoạt', integration: 'Automation Rule R002', module: 'automation', action: 'Điều kiện roas < 1.5x · đã chạy 3 lần tháng này', detail: 'Rule đang bật · owner duyệt trước khi chuyển budget lớn' },
      { id: 's3', phase: 'analyze', label: 'So sánh hiệu quả Ads vs Affiliate', integration: 'ZZP Cost Intelligence', module: 'costs', action: 'Affiliate K002 ROI 4.1x · đề xuất chuyển 8M từ Ads sang tiếp thị liên kết', detail: 'Giữ ngân sách trên kênh có ROAS cao hơn trong 7 ngày tới' },
      { id: 's4', phase: 'execute', label: 'Tạm dừng campaign trên TikTok Ads', integration: 'Ads Manager API', module: 'ads', action: 'Pause Product Ads Mặt nạ · giữ lịch sử chi tiêu · không xóa creative', detail: 'Trạng thái campaign → Paused · budget còn lại giữ nguyên' },
      { id: 's5', phase: 'execute', label: 'Tạo việc duyệt chuyển ngân sách', integration: 'Action Queue', module: 'actions', action: 'Giao Lê Thị Hoa · chuyển 8M sang open collaboration K002 · deadline 24h', detail: 'Sau duyệt: tăng commission plan & gắn Spark Ads video hiệu quả' },
      { id: 's6', phase: 'confirm', label: 'Thông báo & ghi audit', integration: 'Audit', module: 'audit', action: 'Log thay đổi budget · báo team Marketing · cập nhật dashboard chi phí', detail: 'Theo dõi ROAS 48h sau chuyển ngân sách' }
    ]
  },
  {
    id: 'FLOW_COMPLIANCE',
    name: 'Chính sách TikTok mới → Sửa listing & mở bán',
    desc: 'Policy Hub cập nhật quy định ảnh INCI → ZZP flag SKU → sửa listing → duyệt lại trên Shop',
    platform: 'shop',
    triggerType: 'webhook',
    trigger: 'Policy impact cao · ảnh hưởng danh mục mỹ phẩm',
    modules: ['compliance', 'products-setup', 'alerts', 'actions'],
    icon: 'shield-alert',
    steps: [
      { id: 's1', phase: 'event', label: 'Nhận cập nhật Policy Hub TikTok Shop', integration: 'Compliance Webhook', module: 'compliance', action: 'Tiêu chuẩn ảnh thành phần INCI mới · hiệu lực 10/06', detail: 'Ảnh hưởng ngành Beauty & Personal Care · bắt buộc trước khi bán tiếp' },
      { id: 's2', phase: 'analyze', label: 'Quét SKU bị ảnh hưởng', integration: 'Listing Quality', module: 'compliance', action: 'P006 Son dưỡng môi · điểm listing 71% · thiếu ảnh INCI', detail: '2 SKU khác đạt chuẩn · 1 SKU cần sửa gấp' },
      { id: 's3', phase: 'execute', label: 'Tạm khóa hiển thị & gửi cảnh báo', integration: 'Product Status', module: 'alerts', action: 'P006 chuyển review · thông báo Ops & Compliance · deadline 48h', detail: 'Tránh vi phạm trong livestream và affiliate content' },
      { id: 's4', phase: 'execute', label: 'Giao task cập nhật listing', integration: 'Action Queue', module: 'actions', action: 'Phạm Đức An upload ảnh INCI + mô tả · mục tiêu điểm ≥ 85%', detail: 'Wizard AI gợi ý copy tuân thủ TikTok Shop' },
      { id: 's5', phase: 'execute', label: 'Gửi duyệt lại lên TikTok Shop', integration: 'Product Publish', module: 'products-setup', action: 'Submit listing P006 · chờ TikTok review 24-48h', detail: 'Theo dõi trạng thái ACTIVE sau duyệt' },
      { id: 's6', phase: 'confirm', label: 'Mở bán & đánh dấu tuân thủ', integration: 'Compliance', module: 'compliance', action: 'P006 active · policy compliant · ghi audit', detail: 'Thông báo Affiliate team có thể quảng bá lại SKU' }
    ]
  },
  {
    id: 'FLOW_AI_ACTION',
    name: 'Gợi ý AI → Duyệt → Thực thi trên TikTok',
    desc: 'ZZP xếp hạng cơ hội tăng trưởng → owner duyệt → cập nhật budget Ads / commission Affiliate',
    platform: 'cross',
    triggerType: 'scheduled',
    trigger: 'Insight ưu tiên cao · hoặc seller bấm "Thực hiện"',
    modules: ['growth-assistant', 'actions', 'ads', 'audit'],
    icon: 'brain-circuit',
    steps: [
      { id: 's1', phase: 'sync', label: 'Tổng hợp dữ liệu Shop + Ads + Affiliate', integration: 'Data Hub', module: 'growth-assistant', action: 'GMV 485M · blended ROAS 2.4x · affiliate 38% GMV · 4 insight ưu tiên', detail: 'Cập nhật lúc ' + ttsMetric('shop.syncAt', '14:32') },
      { id: 's2', phase: 'analyze', label: 'AI chọn hành động ROI cao nhất', integration: 'Growth Assistant', module: 'growth-assistant', action: 'Scale Spark Ads Serum VC · ROAS 3.8x · tăng budget 30% · gắn video V001', detail: 'Tác động dự kiến +12M GMV/tuần · confidence 87%' },
      { id: 's3', phase: 'execute', label: 'Chủ shop duyệt trong Action Queue', integration: 'Approval', module: 'actions', action: 'Nguyễn Minh Anh duyệt · deadline 4h · ghi lý do nếu từ chối', detail: 'RBAC: chỉ Owner/Manager mới thực thi thay đổi budget' },
      { id: 's4', phase: 'execute', label: 'Cập nhật budget trên TikTok Ads', integration: 'GMV Max API', module: 'ads', action: 'Spark Ads Serum VC · budget 15M → 19.5M · giữ target ROAS', detail: 'Không đổi creative · theo dõi ROAS 24h' },
      { id: 's5', phase: 'confirm', label: 'Ghi audit & báo kết quả', integration: 'Audit', module: 'audit', action: 'Log thay đổi · thông báo team Ads · cập nhật dashboard executive', detail: 'Review lại sau 7 ngày trong Growth Optimizer' }
    ]
  },
  {
    id: 'FLOW_ORDER_SLA',
    name: 'Đơn sắp quá SLA → Xử lý giao hàng',
    desc: 'Webhook đơn mới TikTok Shop → ZZP theo dõi SLA → giao Ops → cập nhật trạng thái trên Shop',
    platform: 'shop',
    ruleId: 'R005',
    triggerType: 'webhook',
    trigger: 'Đơn AWAITING_SHIPMENT · SLA còn < 4 giờ',
    modules: ['orders', 'alerts', 'team'],
    icon: 'clock-alert',
    steps: [
      { id: 's1', phase: 'event', label: 'Nhận đơn mới từ TikTok Shop', integration: 'Order Webhook', module: 'orders', action: 'ORD-88421 · Nguyễn Thị Lan · Serum VC · 578K · nguồn Affiliate', detail: 'Trạng thái AWAITING_SHIPMENT · ship-by countdown 2h' },
      { id: 's2', phase: 'analyze', label: 'Phân loại rủi ro SLA', integration: 'Order Center', module: 'orders', action: 'SLA risk cao · 3 đơn pending cùng kho · ưu tiên đơn Affiliate GMV lớn', detail: 'On-time rate shop ' + ttsMetric('orders.onTimeDeliveryRate', 94) + '%' },
      { id: 's3', phase: 'execute', label: 'Giao vận hành & cảnh báo', integration: 'Team + Alerts', module: 'team', action: 'Assign Trần Văn Hùng · thông báo Zalo Ops · pin đơn trên SLA board', detail: 'Escalate nếu quá 1h chưa xử lý' },
      { id: 's4', phase: 'execute', label: 'Xác nhận giao hàng lên TikTok Shop', integration: 'Fulfillment API', module: 'orders', action: 'Cập nhật IN_TRANSIT · tracking GHN · SLA OK', detail: 'Đồng bộ tracking về TikTok để tránh phạt late shipment' }
    ]
  },
  {
    id: 'FLOW_LIVE_PREP',
    name: 'Chuẩn bị Mega Live trên TikTok Shop',
    desc: 'Lịch live T-2 ngày → ZZP checklist → flash sale · voucher live · lên lịch Live Ads',
    platform: 'cross',
    triggerType: 'scheduled',
    trigger: 'Phiên live còn 2 ngày · checklist chưa hoàn tất',
    modules: ['livestream', 'campaigns', 'vouchers', 'ads', 'koc'],
    icon: 'radio-tower',
    steps: [
      { id: 's1', phase: 'event', label: 'Nhận lịch live từ TikTok Shop', integration: 'Live Calendar', module: 'livestream', action: 'Mega Live 6/6 19:30 · @livewithhuong · checklist 6/8 mục', detail: 'GMV kỳ trước 129M · dự kiến lần này 150M' },
      { id: 's2', phase: 'execute', label: 'Tạo Flash Sale trên Seller Center', integration: 'Promotion API', module: 'campaigns', action: 'Flash Sale -20% · hero P001, P005 · khung 19:30-22:00', detail: 'Đồng bộ giá live-only với tồn kho thực tế' },
      { id: 's3', phase: 'execute', label: 'Phát hành voucher chỉ dùng live', integration: 'Voucher Center', module: 'vouchers', action: 'LIVE15 · giảm 15% tối đa 50K · limit 500 lượt', detail: 'Guardrail chi phí voucher · cảnh báo nếu burn > 120%' },
      { id: 's4', phase: 'execute', label: 'Lên lịch Live Shopping Ads', integration: 'TikTok Ads', module: 'ads', action: 'Live GMV Max · start 19:15 · budget 12M · gắn room ID', detail: 'Warm-up 15 phút trước giờ vào live' },
      { id: 's5', phase: 'confirm', label: 'Brief KOC & xác nhận sẵn sàng', integration: 'Affiliate DM', module: 'koc', action: 'Gửi script · pin SKU · flash sale timing · moderator checklist', detail: 'Nhắc lại 2h và 30 phút trước live' }
    ]
  },
  {
    id: 'FLOW_SAMPLE',
    name: 'Gửi mẫu Affiliate → Content → Doanh thu',
    desc: 'Affiliate Center duyệt sample → theo dõi content → đo ROI → cập nhật tier creator',
    platform: 'affiliate',
    ruleId: 'R004',
    triggerType: 'rule',
    trigger: 'Sample approved · hoặc KOC score ≥ 80 (auto)',
    modules: ['samples', 'koc', 'content', 'affiliate-analytics'],
    icon: 'gift',
    steps: [
      { id: 's1', phase: 'execute', label: 'Duyệt & gửi mẫu qua Affiliate Center', integration: 'Sample Applications', module: 'samples', action: '@linhskincare · Serum VC · phí mẫu 350K · GHN đang giao', detail: 'Fulfillment rate ' + ttsMetric('samples.fulfillmentRate', 92) + '% · avg ' + ttsMetric('samples.avgDaysToContent', 9) + ' ngày có content' },
      { id: 's2', phase: 'sync', label: 'Theo dõi cửa sổ content 14 ngày', integration: 'Content Tracking', module: 'content', action: 'Deadline content · nhắc KOC ngày 10 · escalate nếu quá hạn', detail: '2 mẫu đang chờ · 1 mẫu quá hạn content' },
      { id: 's3', phase: 'event', label: 'Video shoppable được publish', integration: 'Shop Videos', module: 'content', action: 'Routine 3 bước · 520K views · gắn SKU P001 · CTR 4.2%', detail: 'Video xuất hiện trên TikTok Shop & FYP' },
      { id: 's4', phase: 'analyze', label: 'Đo Sample ROI & commission', integration: 'Affiliate Orders', module: 'samples', action: 'ROI 42.8x · doanh thu 15M · commission 11.2% · convert', detail: 'Pipeline ROI trung bình ' + ttsMetric('samples.pipelineRoi', 8.5) + 'x' },
      { id: 's5', phase: 'confirm', label: 'Cập nhật tier & hoa hồng creator', integration: 'Creator Marketplace', module: 'koc', action: 'KOC lên Macro+ · đề xuất tăng commission 12% → 15%', detail: 'Mời tham gia Target Collaboration campaign tiếp theo' }
    ]
  },
  {
    id: 'FLOW_OPTIMIZE',
    name: 'Growth Optimizer — Tối ưu tuần Shop + Ads + Affiliate',
    desc: 'Chạy định kỳ mỗi thứ Hai · quét toàn shop · tạo batch hành động trên TikTok',
    platform: 'cross',
    triggerType: 'scheduled',
    trigger: 'Lịch hẹn thứ Hai 08:00 · hoặc chạy thủ công',
    modules: ['optimization', 'growth-assistant', 'actions', 'opportunities'],
    icon: 'trending-up',
    steps: [
      { id: 's1', phase: 'sync', label: 'Đồng bộ toàn bộ nguồn TikTok', integration: 'Data Hub', module: 'optimization', action: 'Shop 12.8K · Ads 3.4K · Affiliate 892 bản ghi · latency 2-5s', detail: '6 nguồn live · chất lượng dữ liệu 96%' },
      { id: 's2', phase: 'analyze', label: 'Tối ưu danh mục & tồn kho', integration: 'Product Intelligence', module: 'optimization', action: 'Scale P001,P005 · restock P003 · fix listing P006', detail: 'BCG matrix · hero SKU chiếm 62% GMV' },
      { id: 's3', phase: 'analyze', label: 'Tối ưu creator & nội dung', integration: 'Affiliate Analytics', module: 'optimization', action: 'Promote @skintips_daily · nhân bản format Routine × 3 KOC', detail: 'Cắt KOC ROI < 2x · scale ROI > 4x' },
      { id: 's4', phase: 'analyze', label: 'Tối ưu ngân sách Ads vs Affiliate', integration: 'Cost Intelligence', module: 'optimization', action: 'Chuyển budget Ads ROAS thấp sang open collaboration', detail: 'Blended ROAS mục tiêu ≥ 2.5x' },
      { id: 's5', phase: 'execute', label: 'Tạo batch việc chờ duyệt', integration: 'Action Queue', module: 'actions', action: '4 hành động mới · 2 critical · giao theo RBAC', detail: 'Owner duyệt trước khi ghi ngược TikTok' },
      { id: 's6', phase: 'confirm', label: 'Cập nhật roadmap cơ hội', integration: 'Opportunities', module: 'opportunities', action: '3 cơ hội chuyển in_progress · báo cáo tuần gửi Zalo', detail: 'Review kết quả sau 7 ngày' }
    ]
  }
];

let activeFlowRun = null;

function getFlowRule(flow) {
  if (!flow?.ruleId) return null;
  return ZZP_DATA.automationRules.find(r => r.id === flow.ruleId);
}

function getFlowsForModule(pageId) {
  return AUTOMATION_FLOWS.filter(f => f.modules.includes(pageId));
}

function humanTrigger(trigger, triggerType) {
  if (!trigger) return 'Theo tình huống vận hành';
  const typeLabel = { webhook: 'Webhook TikTok', rule: 'Quy tắc tự động', scheduled: 'Lịch hẹn' }[triggerType] || '';
  const text = String(trigger)
    .replace(/cron/gi, 'lịch hẹn')
    .replace(/manual/gi, 'thủ công')
    .replace(/roas/gi, 'ROAS')
    .replace(/FLOW_[A-Z_]+/g, '')
    .replace(/\//g, ' · ')
    .trim();
  return typeLabel ? `${typeLabel} · ${text}` : text;
}

function renderPlatformBadge(platformKey, size) {
  const p = FLOW_PLATFORMS[platformKey] || FLOW_PLATFORMS.cross;
  const tone = platformKey === 'shop' ? 'dark' : platformKey === 'ads' ? 'ads' : platformKey === 'affiliate' ? 'affiliate' : 'brand';
  return `<span class="ui-badge ui-badge--${tone}">${icon(p.icon, size || 12)} ${p.label}</span>`;
}

function renderPhaseBadge(phaseKey) {
  const ph = FLOW_PHASES[phaseKey] || FLOW_PHASES.sync;
  const tone = phaseKey === 'event' ? 'critical' : phaseKey === 'execute' ? 'warn' : phaseKey === 'confirm' ? 'ok' : phaseKey === 'analyze' ? 'purple' : 'info';
  return `<span class="ui-badge ui-badge--${tone}">${icon(ph.icon, 10)} ${ph.label}</span>`;
}

function renderFlowSyncStrip() {
  const syncs = ZZP_DATA.dataSync.slice(0, 3);
  return `
    <div class="flex flex-wrap gap-2 mb-5">
      ${syncs.map(d => `
        <div class="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs">
          <span class="w-2 h-2 rounded-full ${d.status === 'live' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}"></span>
          <span class="font-medium text-slate-700">${d.source}</span>
          <span class="text-slate-400">${d.latency}</span>
          <span class="text-slate-400">· ${d.lastSync}</span>
        </div>`).join('')}
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl border border-zzp-100 bg-zzp-50 text-xs text-zzp-700">
        ${icon('refresh-cw', 12)}
        <span>Đồng bộ lần cuối ${ttsMetric('shop.syncAt', '14:32')}</span>
      </div>
    </div>`;
}

function renderFlowPipelineMini(flow) {
  const phases = [...new Set(flow.steps.map(s => s.phase).filter(Boolean))];
  const keys = phases.length ? phases : ['sync', 'analyze', 'execute', 'confirm'];
  return `
    <div class="flex flex-wrap items-center gap-1 mt-3">
      ${keys.map((k, i) => {
        const ph = FLOW_PHASES[k] || FLOW_PHASES.sync;
        return `${i ? `<span class="text-slate-300 text-xs">→</span>` : ''}<span class="text-[10px] px-2 py-0.5 rounded-full ${ph.color}">${ph.label}</span>`;
      }).join('')}
    </div>`;
}

function renderWorkflowListCard(f) {
  const rule = getFlowRule(f);
  return `
    <div class="bg-white rounded-xl border ${FLOW_PLATFORMS[f.platform]?.border || 'border-slate-200'} p-5 hover:shadow-md transition-all">
      <div class="flex items-start justify-between gap-4">
        <div class="flex gap-3 min-w-0">
          <span class="flex shrink-0">${iconBox(FLOW_ICONS[f.id] || f.icon || 'workflow', 22, 'bg-zzp-50 text-zzp-600')}</span>
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              ${renderPlatformBadge(f.platform)}
              ${rule ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${rule.name}</span>` : ''}
            </div>
            <p class="font-bold text-slate-900">${f.name}</p>
            <p class="text-sm text-slate-500 mt-1">${f.desc}</p>
            <p class="text-xs text-amber-700 mt-2 flex items-center gap-1">${icon('zap', 12)} ${humanTrigger(f.trigger, f.triggerType)}</p>
            ${renderFlowPipelineMini(f)}
          </div>
        </div>
        <div class="flex flex-col gap-2 shrink-0">
          <button type="button" onclick="openDetail('flow','${f.id}')" class="px-3 py-2 border border-slate-200 rounded-lg text-xs hover:bg-slate-50">Chi tiết</button>
          <button type="button" onclick="runAutomationFlow('${f.id}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm hover:bg-zzp-700 inline-flex items-center gap-1">${icon('play', 14)} Chạy</button>
        </div>
      </div>
      <div class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-${Math.min(f.steps.length, 4)}">
        ${f.steps.map((s, i) => `
          <div class="p-2.5 rounded-lg border border-slate-100 bg-slate-50/80 text-left min-w-0">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-bold text-zzp-600">${i + 1}</span>
              ${renderPhaseBadge(s.phase || 'sync')}
            </div>
            <p class="text-xs font-medium text-slate-800 leading-snug line-clamp-2">${s.label}</p>
            ${s.integration ? `<p class="text-[10px] text-slate-400 mt-1 truncate-safe">${s.integration}</p>` : ''}
          </div>`).join('')}
      </div>
      <div class="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-100">
        ${f.modules.slice(0, 5).map(m => `<button type="button" onclick="navigate('${m}')" class="text-[10px] px-2 py-0.5 bg-zzp-50 text-zzp-700 rounded-full hover:bg-zzp-100">${viPage(m)}</button>`).join('')}
      </div>
    </div>`;
}

function executeFlowStep(flow, stepIndex) {
  return new Promise(resolve => setTimeout(resolve, 900));
}

async function runAutomationFlow(flowId) {
  let flow = AUTOMATION_FLOWS.find(f => f.id === flowId);
  if (!flow && flowId.startsWith('MOD_')) {
    flow = Object.values(MODULE_FLOWS).find(f => f.id === flowId);
  }
  if (!flow) return;
  activeFlowRun = { flowId, step: 0, status: 'running' };
  openFlowRunner(flow, 0);

  for (let i = 0; i < flow.steps.length; i++) {
    activeFlowRun.step = i;
    updateFlowRunnerUI(flow, i, 'running');
    await executeFlowStep(flow, i);
    applyFlowEffects(flow, i);
    updateFlowRunnerUI(flow, i, 'done');
  }

  activeFlowRun = { flowId, step: flow.steps.length - 1, status: 'completed' };
  updateFlowRunnerUI(flow, flow.steps.length - 1, 'complete');
  ZZP_DATA.auditLog.unshift({
    time: new Date().toLocaleString('vi-VN'),
    user: 'Tích hợp TikTok',
    action: `Hoàn tất: ${flow.name}`,
    module: 'Tự động hóa'
  });
  showToast(`Đã thực thi trên TikTok · ${flow.name}`);
  updateNotifPanel();
  updateHealthBadge();
  activeFlowRun = null;
  if (!currentDetail) renderCurrentView();
}

function applyFlowEffects(flow, stepIndex) {
  if (flow.id === 'FLOW_STOCK' && stepIndex === 3) {
    if (!ZZP_DATA.actionQueue.find(a => a.id === 'AQ002')) {
      ZZP_DATA.actionQueue.unshift({ id: 'AQ002', title: 'Gửi PO 2000 sp Mặt nạ Collagen cho NCC', source: 'FLOW_STOCK', status: 'pending', assignee: 'Trần Văn Hùng', priority: 'critical' });
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
  if (flow.id === 'FLOW_COMPLIANCE' && stepIndex === 5) {
    const p = ZZP_DATA.products.find(p => p.id === 'P006');
    if (p) { p.listingScore = 85; p.status = 'active'; }
    const pol = ZZP_DATA.policies.find(p => p.id === 'POL001');
    if (pol) pol.status = 'compliant';
  }
}

function openFlowRunner(flow, currentStep) {
  openModal(renderFlowRunner(flow, currentStep, 'running'));
}

function updateFlowRunnerUI(flow, currentStep, phase) {
  const body = document.getElementById('modal-body');
  if (body) body.innerHTML = renderFlowRunner(flow, currentStep, phase);
}

function renderFlowPanel(pageId) {
  const flows = getFlowsForModule(pageId);
  if (!flows.length) return `<div class="text-center py-12 bg-slate-50 rounded-xl"><p class="text-slate-500">Chưa có quy trình TikTok liên kết mô-đun này.</p><button onclick="navigate('workflows')" class="mt-3 text-sm text-zzp-600 hover:underline">Xem trung tâm tích hợp →</button></div>`;
  return `
    <div class="space-y-4">
      <p class="text-sm text-slate-500">Quy trình tự động nhận sự kiện từ TikTok Shop / Ads / Affiliate, xử lý trên ZZP và ghi ngược lên TikTok khi được duyệt.</p>
      ${flows.map(f => renderWorkflowListCard(f)).join('')}
      <button onclick="navigate('workflows')" class="w-full py-3 border border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-zzp-400 hover:text-zzp-600">Trung tâm tích hợp TikTok — ${AUTOMATION_FLOWS.length} quy trình →</button>
    </div>`;
}

function renderFlowRunner(flow, currentStep, phase) {
  const rule = getFlowRule(flow);
  const done = phase === 'complete' || (currentStep === flow.steps.length - 1 && phase === 'done');
  return `
    <div class="p-6" id="flow-runner">
      <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div class="flex gap-3">
          <span class="flex shrink-0">${iconBox(FLOW_ICONS[flow.id] || flow.icon || 'workflow', 24, 'bg-zzp-50 text-zzp-600')}</span>
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1">${renderPlatformBadge(flow.platform)}${rule ? `<span class="text-[10px] text-slate-500">${rule.name}</span>` : ''}</div>
            <h3 class="font-bold text-lg">${flow.name}</h3>
            <p class="text-sm text-slate-500 mt-0.5">${flow.desc}</p>
          </div>
        </div>
      </div>
      <p class="text-xs text-slate-500 mb-4 flex items-center gap-1">${icon('zap', 12, 'text-amber-600')} ${humanTrigger(flow.trigger, flow.triggerType)}</p>
      ${renderFlowSyncStrip()}
      <div class="space-y-2 mb-6">
        ${flow.steps.map((s, i) => {
          let cls = 'border-slate-200 bg-white';
          let stepIcon = String(i + 1);
          let iconCls = 'bg-slate-100 text-slate-500';
          if (i < currentStep || (i === currentStep && phase === 'done') || phase === 'complete') {
            cls = 'border-green-200 bg-green-50/60'; stepIcon = '✓'; iconCls = 'bg-green-500 text-white';
          } else if (i === currentStep && phase === 'running') {
            cls = 'border-zzp-300 bg-zzp-50 ring-2 ring-zzp-200'; iconCls = 'bg-zzp-500 text-white animate-pulse';
          }
          return `<div class="flex gap-3 p-3 rounded-xl border ${cls} transition-all">
            <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${iconCls}">${stepIcon}</span>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">${renderPhaseBadge(s.phase || 'sync')}${s.integration ? `<span class="text-[10px] text-slate-400">${s.integration}</span>` : ''}</div>
              <p class="font-medium text-sm text-slate-800">${s.label}</p>
              <p class="text-xs text-slate-500 mt-1">${s.action || ''}</p>
              ${s.detail ? `<p class="text-[10px] text-slate-400 mt-1">${s.detail}</p>` : ''}
            </div>
            ${i <= currentStep && s.module ? `<button onclick="closeModal();navigate('${s.module}')" class="text-xs text-zzp-600 hover:underline shrink-0 self-center">${icon('external-link', 12)}</button>` : ''}
          </div>`;
        }).join('')}
      </div>
      ${done ? `
        <div class="p-4 bg-green-50 rounded-xl border border-green-100 text-center mb-4">
          <p class="font-semibold text-green-800 flex items-center justify-center gap-2">${icon('check-circle', 18)} Hoàn tất tích hợp TikTok</p>
          <p class="text-xs text-green-700 mt-1">Đã đồng bộ thay đổi · ghi audit · thông báo team</p>
        </div>
        <button onclick="closeModal()" class="w-full px-4 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium">Đóng</button>
      ` : `<div class="flex items-center gap-2 justify-center text-sm text-zzp-600 py-2"><span class="w-4 h-4 border-2 border-zzp-600 border-t-transparent rounded-full animate-spin"></span> Đang thực thi trên TikTok… bước ${currentStep + 1}/${flow.steps.length}</div>`}
    </div>`;
}

function renderFlowIntegrationStep(flow, stepIndex) {
  const step = flow.steps[stepIndex];
  if (!step) return '';
  const rule = getFlowRule(flow);
  return `
    <div class="rounded-xl border border-slate-200 overflow-hidden">
      <div class="px-4 py-3 bg-slate-50 border-b flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap items-center gap-2">
          ${renderPlatformBadge(flow.platform)}
          ${renderPhaseBadge(step.phase || 'sync')}
        </div>
        ${rule ? `<span class="text-[10px] text-slate-500">${rule.name}</span>` : ''}
      </div>
      <div class="p-4">
        <p class="font-semibold text-slate-900">${step.label}</p>
        ${step.integration ? `<p class="text-xs text-slate-500 mt-1 flex items-center gap-1">${icon('link', 12)} ${step.integration}</p>` : ''}
        ${step.detail ? `<p class="text-sm text-slate-600 mt-3 leading-relaxed">${step.detail}</p>` : ''}
        <div class="mt-4 p-3 rounded-lg bg-white border border-slate-100">
          <p class="text-[10px] uppercase tracking-wide text-slate-400 mb-1">Kết quả bước này</p>
          <p class="text-sm text-slate-700">${step.action || '—'}</p>
        </div>
      </div>
    </div>`;
}
