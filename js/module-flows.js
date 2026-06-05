/* Quy trình tự động riêng từng module — 1:1 PRD, 4 lớp Data→Intelligence→Action→Automation */

function buildModFlow(pageId, name, trigger, steps, opts = {}) {
  const primary = PAGE_PRIMARY_FLOW[pageId];
  const global = primary ? AUTOMATION_FLOWS.find(f => f.id === primary) : null;
  return {
    id: `MOD_${pageId.replace(/-/g, '_').toUpperCase()}`,
    name,
    desc: opts.desc || (global ? global.desc : `Tích hợp TikTok · ${viPage(pageId)}`),
    platform: opts.platform || global?.platform || 'cross',
    triggerType: opts.triggerType || global?.triggerType || 'rule',
    modules: global ? global.modules : [pageId],
    trigger,
    icon: global ? (FLOW_ICONS[global.id] || global.icon) : 'workflow',
    pageId,
    linkedFlow: primary || null,
    ruleId: global?.ruleId || null,
    steps: steps.map((s, i) => ({
      id: `s${i + 1}`,
      phase: s.phase || global?.steps?.[i]?.phase || ['event', 'sync', 'analyze', 'execute'][Math.min(i, 3)],
      layer: s.layer || ['data', 'intelligence', 'action', 'automation'][Math.min(i, 3)],
      integration: s.integration || '',
      detail: s.detail || '',
      ...s
    }))
  };
}

const MODULE_FLOWS = {
  dashboard: buildModFlow('dashboard', 'Tổng quan shop → Hành động ưu tiên', 'health < 85% hoặc alert mới', [
    { layer: 'data', label: 'Thu thập KPI real-time', module: 'executive', action: 'Sync GMV, orders, profit, alerts từ Data Hub' },
    { layer: 'intelligence', label: 'AI xếp hạng vấn đề', module: 'growth-assistant', action: 'AI001-AI004 priority scoring' },
    { layer: 'action', label: 'Gợi ý 3 việc ưu tiên', module: 'actions', action: 'Action queue: AQ001-AQ004' },
    { layer: 'automation', label: 'Chạy Growth Optimizer', module: 'optimization', action: 'FLOW_OPTIMIZE weekly batch' }
  ]),
  onboarding: buildModFlow('onboarding', 'OAuth → Checklist → Shop Health', 'seller mới đăng ký', [
    { layer: 'data', label: 'Kết nối TikTok Shop OAuth', module: 'onboarding', action: 'Authorize Seller Center · shop SHOP-VN-88421' },
    { layer: 'data', label: 'Đồng bộ shop profile', module: 'datahub', action: 'Pull shop, category, payment status' },
    { layer: 'intelligence', label: 'Tính Shop Health Score', module: 'onboarding', action: 'Checklist + listing + compliance → 78%' },
    { layer: 'action', label: 'Gợi ý bước tiếp theo', module: 'onboarding', action: 'c5 SKU hero · c6 store · c8 compliance' },
    { layer: 'automation', label: 'Nhắc checklist hàng ngày', module: 'notifications', action: 'Email + In-App nếu health < 80%' }
  ]),
  'products-setup': buildModFlow('products-setup', 'Tạo listing → AI → Duyệt TikTok', 'wizard hoặc listing < 85%', [
    { layer: 'data', label: 'Nhập SKU & thuộc tính', module: 'products-setup', action: 'SKU, giá, phân loại ngành hàng mỹ phẩm' },
    { layer: 'intelligence', label: 'AI Listing Quality', module: 'products-setup', action: 'Chấm điểm tiêu đề, ảnh, INCI, video' },
    { layer: 'action', label: 'Wizard AI 6 ảnh + nội dung', module: 'products-setup', action: 'openProductCreateWizard() → score ≥ 85%' },
    { layer: 'automation', label: 'Submit & theo dõi duyệt', module: 'compliance', action: 'FLOW_COMPLIANCE nếu bị flag' }
  ]),
  store: buildModFlow('store', 'Brand Kit → Template → Preview', 'c6 checklist chưa xong', [
    { layer: 'data', label: 'Load Brand Kit', module: 'store', action: 'Logo, màu #14b8a6, banner Summer Glow' },
    { layer: 'intelligence', label: 'Đánh giá storefront', module: 'store', action: 'Hero SKU visibility · CTA clarity' },
    { layer: 'action', label: 'Áp dụng template Flash Sale', module: 'store', action: 'Pin P001, P005 hero trên storefront' },
    { layer: 'automation', label: 'Đồng bộ campaign banner', module: 'campaigns', action: 'Auto-update banner theo CP001' }
  ]),
  compliance: buildModFlow('compliance', 'Policy scan → Fix listing → Unlock', 'POL impact high', [
    { layer: 'data', label: 'AI quét Policy Hub', module: 'compliance', action: 'POL001 tiêu chuẩn ảnh INCI mới' },
    { layer: 'intelligence', label: 'Map SKU bị ảnh hưởng', module: 'compliance', action: 'P006 Son dưỡng môi flagged' },
    { layer: 'action', label: 'Task cập nhật listing', module: 'actions', action: 'AQ003 → Phạm Đức An upload INCI' },
    { layer: 'automation', label: 'Re-check & mark compliant', module: 'compliance', action: 'FLOW_COMPLIANCE full chain' }
  ]),
  education: buildModFlow('education', 'Playbook → Học → Chứng nhận', 'seller mới hoặc tiến độ < 100%', [
    { layer: 'data', label: 'Load curriculum E001-E005', module: 'education', action: '5 module đào tạo · avg progress' },
    { layer: 'intelligence', label: 'Gợi ý module tiếp theo', module: 'education', action: 'E003 Affiliate Playbook 60%' },
    { layer: 'action', label: 'Mở bài học ưu tiên', module: 'education', action: 'Tiếp tục SOP Livestream & P&L' },
    { layer: 'automation', label: 'Tick checklist c9', module: 'onboarding', action: 'Auto khi 5/5 module 100%' }
  ]),
  portfolio: buildModFlow('portfolio', 'BCG Matrix → Hero SKU → Scale plan', 'review danh mục 90 ngày', [
    { layer: 'data', label: 'Pull GMV, margin, velocity', module: 'product-analytics', action: '7 SKU · sold30d · listing score' },
    { layer: 'intelligence', label: 'Phân loại Star/Cash/Potential', module: 'portfolio', action: 'BCG matrix 4 ô' },
    { layer: 'action', label: 'Chọn Hero SKU scale', module: 'portfolio', action: 'P001 Serum, P005 Kem CN ≥ 85%' },
    { layer: 'automation', label: 'Budget plan 90 ngày', module: 'campaigns', action: 'Ads + Affiliate + Live per hero' }
  ]),
  channels: buildModFlow('channels', 'Kết nối kênh → Map SKU → Sync tồn', 'c10 chưa xong', [
    { layer: 'data', label: 'Kết nối Shopee, Lazada, ERP', module: 'channels', action: '3/4 kênh synced' },
    { layer: 'data', label: 'SKU mapping đa kênh', module: 'channels', action: 'TikTok ↔ Shopee ↔ ERP' },
    { layer: 'intelligence', label: 'Đối soát tồn kho lệch', module: 'inventory', action: 'Coverage mapping 85%' },
    { layer: 'automation', label: 'Bật auto-sync bán đa kênh', module: 'datahub', action: 'Bán TikTok → trừ kho all channels' }
  ]),
  datahub: buildModFlow('datahub', 'Sync 6 nguồn → Warehouse → Quality', 'latency > 15s hoặc cron 15p', [
    { layer: 'data', label: 'Pull TikTok Shop + Ads', module: 'datahub', action: 'Shop 12.8k · Ads 3.4k records · 2-5s' },
    { layer: 'data', label: 'Affiliate + Live + Content', module: 'datahub', action: '892 affiliate · 156 live · 2.3k content' },
    { layer: 'intelligence', label: 'Data Quality check', module: 'settings', action: 'Quality score 96% · reconcile 06:00' },
    { layer: 'automation', label: 'Alert nếu sync fail', module: 'alerts', action: 'Rule: latency > 15s → notify Ops' }
  ]),
  products: buildModFlow('products', 'Lifecycle monitor → Low stock → Action', 'status change hoặc stock alert', [
    { layer: 'data', label: 'Sync SKU lifecycle', module: 'products', action: '7 SKU: active, low_stock, review' },
    { layer: 'intelligence', label: 'Velocity & margin scan', module: 'product-analytics', action: 'P003 velocity cao · P006 margin OK' },
    { layer: 'action', label: 'Flag SKU cần xử lý', module: 'products', action: 'P003 restock · P006 fix listing' },
    { layer: 'automation', label: 'Trigger FLOW_STOCK', module: 'inventory', action: 'stock < 100 → FLOW_STOCK' }
  ]),
  orders: buildModFlow('orders', 'SLA monitor → Assign → Process', 'pending + sla < 4h', [
    { layer: 'data', label: 'Nhận đơn real-time', module: 'orders', action: 'ORD-88421 pending · SLA 2h' },
    { layer: 'intelligence', label: 'Phân loại nguồn & SLA risk', module: 'orders', action: 'affiliate/live/ads/organic attribution' },
    { layer: 'action', label: 'Alert & assign Ops', module: 'team', action: 'A004 → Trần Văn Hùng' },
    { layer: 'automation', label: 'Auto process hoặc escalate', module: 'orders', action: 'FLOW_ORDER_SLA' }
  ]),
  inventory: buildModFlow('inventory', 'Stock detect → Forecast → PO', 'stock < ngưỡng hoặc days < 7', [
    { layer: 'data', label: 'Sync tồn kho ERP + TikTok', module: 'inventory', action: 'P003 stock=45 · velocity 40/ngày' },
    { layer: 'intelligence', label: 'Tính days-left & stockout', module: 'forecast', action: 'P003 stockout T+2 · mất 15M GMV/tuần' },
    { layer: 'action', label: 'Smart Alert + AI insight', module: 'alerts', action: 'A001 critical · AI003' },
    { layer: 'automation', label: 'Tạo PO & notify', module: 'actions', action: 'FLOW_STOCK → AQ002 2000 sp' }
  ]),
  returns: buildModFlow('returns', 'Return intake → Review → Refund', 'return_requested mới', [
    { layer: 'data', label: 'Tiếp nhận yêu cầu hoàn', module: 'returns', action: 'RET-001 ORD-88417 · 578K' },
    { layer: 'intelligence', label: 'Phân loại nguyên nhân', module: 'returns', action: 'Return rate 3.2% vs benchmark 4.8%' },
    { layer: 'action', label: 'Ops review 24h', module: 'returns', action: 'pending_review → approve/reject' },
    { layer: 'automation', label: 'Refund & cập nhật P&L', module: 'profit', action: 'Sync refund → margin analytics' }
  ]),
  affiliate: buildModFlow('affiliate', 'SAM: Sample → Affiliate → Macro', 'program activate hoặc ROI review', [
    { layer: 'data', label: 'Kích hoạt commission plan', module: 'affiliate', action: 'Hero SKU 8-15% · c7 done' },
    { layer: 'intelligence', label: 'GMV attribution affiliate', module: 'affiliate-analytics', action: '38% tổng GMV · top K003' },
    { layer: 'action', label: 'Scale KOC ROI > 3x', module: 'koc', action: 'K001, K003 tier review' },
    { layer: 'automation', label: 'Cut KOC ROI < 2x', module: 'samples', action: 'FLOW_SAMPLE lifecycle' }
  ]),
  koc: buildModFlow('koc', 'Prospect → Sample → Content → Revenue', 'KOC score change', [
    { layer: 'data', label: 'CRM pipeline update', module: 'koc', action: '6 KOC · 4 lifecycle stages' },
    { layer: 'intelligence', label: 'Scorecard GMV/ROI/CVR', module: 'creator-analytics', action: 'K003 score 96 · K006 score 22' },
    { layer: 'action', label: 'Scale / nurture / cut', module: 'koc', action: '≥80 scale · 50-79 nurture · <50 cut' },
    { layer: 'automation', label: 'Gửi mẫu auto rule R004', module: 'samples', action: 'score > 80 → auto sample' }
  ]),
  agency: buildModFlow('agency', 'Onboard MCN → Track ROI → Renew/Cut', 'agency review cycle', [
    { layer: 'data', label: 'Sync agency fee & KOC pool', module: 'agency', action: 'MCN Beauty Stars · 45 KOC · 15M fee' },
    { layer: 'intelligence', label: 'ROI vs direct KOC', module: 'agency', action: 'Agency 3.8x vs direct 4.2x' },
    { layer: 'action', label: 'Renegotiate hoặc shift direct', module: 'koc', action: 'Viral Commerce ROI 2.9x review' },
    { layer: 'automation', label: 'Báo cáo tháng cho brand', module: 'notifications', action: 'Scheduled PDF → Email' }
  ]),
  samples: buildModFlow('samples', 'Gửi mẫu → Content → ROI → Score', 'sample sent', [
    { layer: 'data', label: 'Gửi mẫu cho KOC', module: 'samples', action: 'S001 → @linhskincare Serum VC' },
    { layer: 'intelligence', label: 'Track deadline 14 ngày', module: 'content', action: 'S002 còn 6 ngày · S003 no content' },
    { layer: 'action', label: 'Đo Sample ROI', module: 'samples', action: 'S001 ROI 42.8x · S004 101.1x' },
    { layer: 'automation', label: 'Update KOC score & tier', module: 'koc', action: 'FLOW_SAMPLE full chain' }
  ]),
  content: buildModFlow('content', 'Calendar → Brief → Publish → Measure', 'content task due', [
    { layer: 'data', label: 'Content calendar tuần', module: 'content', action: '7 slot · V001-V005 pipeline' },
    { layer: 'intelligence', label: 'Brief & approve draft', module: 'content', action: 'Draft → Review → Scheduled' },
    { layer: 'action', label: 'Publish & tag product', module: 'content', action: 'V001 Routine 520K views' },
    { layer: 'automation', label: 'Push to Content Intelligence', module: 'content-analytics', action: 'Auto CVR/GMV tracking post-publish' }
  ]),
  livestream: buildModFlow('livestream', 'Checklist → Campaign → Ads → Go live', 'live T-2 days', [
    { layer: 'data', label: 'Live checklist 8 bước', module: 'livestream', action: 'L001 Mega Live 6/8 done' },
    { layer: 'action', label: 'Flash sale + voucher live', module: 'campaigns', action: 'CP001 -20% · LIVE15 15%' },
    { layer: 'action', label: 'Schedule Live Ads', module: 'ads', action: 'AD003 6/6 19:30' },
    { layer: 'automation', label: 'Notify host & run live', module: 'koc', action: 'FLOW_LIVE_PREP · @livewithhuong' }
  ]),
  campaigns: buildModFlow('campaigns', 'Create → Launch → Monitor → Optimize', 'campaign start hoặc overspend', [
    { layer: 'data', label: 'Tạo chiến dịch khuyến mãi', module: 'campaigns', action: '3 active · Flash sale, affiliate' },
    { layer: 'intelligence', label: 'Gắn Hero SKU & cap budget', module: 'campaigns', action: 'spent/budget ratio monitor' },
    { layer: 'action', label: 'Adjust mid-flight', module: 'campaigns', action: 'ROI < target → giảm discount' },
    { layer: 'automation', label: 'Sync revenue attribution', module: 'revenue', action: 'GMV per campaign real-time' }
  ]),
  vouchers: buildModFlow('vouchers', 'Create → Guardrail → Monitor → Adjust', 'usage > 60% limit', [
    { layer: 'data', label: 'Tạo voucher + guardrail', module: 'vouchers', action: 'BEAUTY20, NEW50K limits' },
    { layer: 'intelligence', label: 'Monitor usage vs cap', module: 'vouchers', action: 'NEW50K 63% · guardrail warning' },
    { layer: 'action', label: 'Adjust hoặc pause', module: 'vouchers', action: 'Giảm NEW50K 50K→30K' },
    { layer: 'automation', label: 'Cost alert → FLOW_ADS', module: 'alerts', action: 'A003 → voucher cost control' }
  ]),
  ads: buildModFlow('ads', 'Monitor ROAS → Rule → Pause → Reallocate', 'roas < 1.5x', [
    { layer: 'data', label: 'Sync Ads Manager data', module: 'ads', action: 'AD001 ROAS 3.8x · AD002 1.2x' },
    { layer: 'intelligence', label: 'Rule R002 trigger', module: 'automation', action: 'roas < 1.5 → auto evaluate' },
    { layer: 'action', label: 'Pause thua lỗ + AI reallocate', module: 'growth-assistant', action: 'AI002 chuyển 8M sang Affiliate' },
    { layer: 'automation', label: 'Execute FLOW_ADS', module: 'ads', action: 'Pause AD002 · AQ001 approve' }
  ]),
  executive: buildModFlow('executive', 'Consolidate → Visualize → Drill-down', 'daily 8h hoặc on-demand', [
    { layer: 'data', label: 'Consolidate all modules', module: 'executive', action: 'GMV 485M · profit 22.4% · 2847 orders' },
    { layer: 'intelligence', label: 'Trend & anomaly', module: 'executive', action: 'GMV ↑28% · cost structure shift' },
    { layer: 'action', label: 'Drill-down module', module: 'revenue', action: 'Click metric → attribution' },
    { layer: 'automation', label: 'Scheduled executive report', module: 'automation', action: 'Rule R003 cron 08:00' }
  ]),
  revenue: buildModFlow('revenue', 'Collect → Attribute → Report', 'sync hoặc end-of-day', [
    { layer: 'data', label: 'Merge revenue sources', module: 'revenue', action: 'Affiliate 38% · Live 27% · Ads 15%' },
    { layer: 'intelligence', label: 'Attribution SKU × kênh', module: 'revenue', action: 'Hero SKU channel mix' },
    { layer: 'action', label: 'Identify growth driver', module: 'product-analytics', action: 'Top: Serum VC affiliate+live' },
    { layer: 'automation', label: 'Push insight Growth AI', module: 'growth-assistant', action: 'Auto insight nếu shift > 10%' }
  ]),
  profit: buildModFlow('profit', 'Revenue → Deduct costs → Margin', 'daily P&L close', [
    { layer: 'data', label: 'Load revenue & COGS', module: 'profit', action: 'GMV - COGS - all opex' },
    { layer: 'intelligence', label: 'Margin by SKU', module: 'profit', action: 'Serum 66% · Mặt nạ thấp do ads' },
    { layer: 'action', label: 'Flag margin erosion', module: 'alerts', action: 'A002 ads cost on P003' },
    { layer: 'automation', label: 'Trigger cost optimizer', module: 'optimization', action: 'FLOW_ADS + pricing review' }
  ]),
  costs: buildModFlow('costs', 'Track → Benchmark → Alert → Cut', 'cost spike > 10%', [
    { layer: 'data', label: 'Breakdown chi phí', module: 'costs', action: 'COGS 30% · Ads 4.3% · Voucher 5.1%' },
    { layer: 'intelligence', label: 'Anomaly detection', module: 'costs', action: 'Ads ↑12% · investigate AD002' },
    { layer: 'action', label: 'Recommend cut/shift', module: 'growth-assistant', action: 'AI002 pause ads → affiliate' },
    { layer: 'automation', label: 'FLOW_ADS execute', module: 'ads', action: 'Auto pause + audit log' }
  ]),
  'product-analytics': buildModFlow('product-analytics', 'Rank → Label → Recommend', 'weekly SKU review', [
    { layer: 'data', label: 'SKU ranking GMV/units', module: 'product-analytics', action: 'Top: Mặt nạ, Serum, Kem CN' },
    { layer: 'intelligence', label: 'Scale/Optimize/Maintain', module: 'product-analytics', action: 'AI labels per SKU' },
    { layer: 'action', label: 'Push to optimizer', module: 'optimization', action: 'Scale P001,P005 · Fix P006' },
    { layer: 'automation', label: 'Create action batch', module: 'actions', action: 'FLOW_OPTIMIZE step 1' }
  ]),
  'affiliate-analytics': buildModFlow('affiliate-analytics', 'Contribution → ROI → Tier', 'affiliate GMV sync', [
    { layer: 'data', label: 'GMV per KOC/campaign', module: 'affiliate-analytics', action: 'Pie contribution chart' },
    { layer: 'intelligence', label: 'Campaign ROI compare', module: 'affiliate-analytics', action: 'SAM campaign performance' },
    { layer: 'action', label: 'Commission optimize', module: 'affiliate', action: 'Adjust tier commission' },
    { layer: 'automation', label: 'FLOW_SAMPLE scale winners', module: 'samples', action: 'Auto sample top KOC' }
  ]),
  'creator-analytics': buildModFlow('creator-analytics', 'Score → Rank → Tier rec', 'scorecard refresh', [
    { layer: 'data', label: 'Aggregate KOC metrics', module: 'creator-analytics', action: 'GMV, ROI, CVR, videos' },
    { layer: 'intelligence', label: 'Ranking & tier rec', module: 'creator-analytics', action: 'K003 #1 → Macro+' },
    { layer: 'action', label: 'Update CRM lifecycle', module: 'koc', action: 'Promote/demote tier' },
    { layer: 'automation', label: 'Notify affiliate manager', module: 'notifications', action: 'Tier change alert' }
  ]),
  'content-analytics': buildModFlow('content-analytics', 'Performance → Pattern → Replicate', 'weekly content review', [
    { layer: 'data', label: 'Video performance pull', module: 'content-analytics', action: 'Views, orders, GMV, CVR' },
    { layer: 'intelligence', label: 'Pattern analysis', module: 'content-analytics', action: 'Routine 3 bước CVR 4.2%' },
    { layer: 'action', label: 'Replication plan', module: 'optimization', action: 'Clone × 3 KOC' },
    { layer: 'automation', label: 'Content calendar auto-fill', module: 'content', action: 'FLOW_OPTIMIZE step 3' }
  ]),
  'live-analytics': buildModFlow('live-analytics', 'Session GMV → Benchmark → Book next', 'post-live 1h', [
    { layer: 'data', label: 'Session metrics', module: 'live-analytics', action: 'GMV/giờ · conversion · orders' },
    { layer: 'intelligence', label: 'vs expected GMV', module: 'live-analytics', action: 'K003 156M vs 180M expected' },
    { layer: 'action', label: 'Update KOC score', module: 'koc', action: 'Live performance → score' },
    { layer: 'automation', label: 'Book next live slot', module: 'livestream', action: 'Calendar reminder T-2' }
  ]),
  'customer-analytics': buildModFlow('customer-analytics', 'Segment → LTV → Campaign', 'cohort weekly', [
    { layer: 'data', label: 'Segment VIP/New/At Risk', module: 'customer-analytics', action: '456 At Risk customers' },
    { layer: 'intelligence', label: 'LTV & repeat rate', module: 'customer-analytics', action: 'VIP LTV 2.4M · repeat 68%' },
    { layer: 'action', label: 'Win-back campaign', module: 'optimization', action: 'FREESHIP + Mini Kit 99K' },
    { layer: 'automation', label: 'Personalization engine', module: 'optimization', action: 'Auto voucher At Risk segment' }
  ]),
  team: buildModFlow('team', 'Assign → Approve → Execute', 'approval required', [
    { layer: 'data', label: 'RBAC & team roster', module: 'team', action: '5 members · roles mapped' },
    { layer: 'intelligence', label: 'Route task by rule', module: 'team', action: 'Ads >10M → Owner approve' },
    { layer: 'action', label: 'Approval queue', module: 'actions', action: 'AQ001 pending Lê Thị Hoa' },
    { layer: 'automation', label: 'Workflow assignment', module: 'workflows', action: 'Auto-assign by dept' }
  ]),
  'growth-assistant': buildModFlow('growth-assistant', 'Analyze → Insight → Action → Execute', 'AI priority ≤ 2', [
    { layer: 'data', label: 'AI Engine ingest all data', module: 'growth-assistant', action: 'Products, ads, KOC, inventory' },
    { layer: 'intelligence', label: 'Generate ranked insights', module: 'growth-assistant', action: 'AI001-AI004 confidence 78-95%' },
    { layer: 'action', label: 'One-click → Action Queue', module: 'actions', action: 'Create AQ from insight' },
    { layer: 'automation', label: 'FLOW_AI_ACTION execute', module: 'ads', action: 'Approve → budget change → audit' }
  ]),
  alerts: buildModFlow('alerts', 'Detect → Classify → Route → Resolve', 'anomaly detected', [
    { layer: 'data', label: 'Monitor all metrics', module: 'alerts', action: '6 alerts · 5 unread' },
    { layer: 'intelligence', label: 'Severity & root cause', module: 'alerts', action: 'Critical 2 · Warning 2 · Info 2' },
    { layer: 'action', label: 'Route to module owner', module: 'actions', action: 'Alert → task assignee' },
    { layer: 'automation', label: 'Trigger linked flow', module: 'workflows', action: 'A001→FLOW_STOCK · A002→FLOW_ADS' }
  ]),
  opportunities: buildModFlow('opportunities', 'Scan → Score → Activate', 'opportunity engine cron', [
    { layer: 'data', label: 'Scan products/KOC/content', module: 'opportunities', action: '4 opportunities detected' },
    { layer: 'intelligence', label: 'Score potential GMV', module: 'opportunities', action: 'O001 +45M · O002 +25M' },
    { layer: 'action', label: 'Link Growth Assistant', module: 'growth-assistant', action: 'Deep dive + action plan' },
    { layer: 'automation', label: 'FLOW_AI_ACTION', module: 'actions', action: 'O003 → in_progress auto' }
  ]),
  forecast: buildModFlow('forecast', 'Historical → Model → Predict → PO', 'daily forecast run', [
    { layer: 'data', label: 'Load 30d sales history', module: 'forecast', action: 'GMV trend · velocity per SKU' },
    { layer: 'intelligence', label: 'GMV forecast 7 ngày', module: 'forecast', action: 'Peak T7 live 95M' },
    { layer: 'action', label: 'Inventory forecast', module: 'forecast', action: 'P003 stockout T+2' },
    { layer: 'automation', label: 'FLOW_STOCK if risk', module: 'inventory', action: 'Auto PO recommendation' }
  ]),
  benchmark: buildModFlow('benchmark', 'Compare → Gap → Action plan', 'monthly benchmark', [
    { layer: 'data', label: 'Pull market benchmarks', module: 'benchmark', action: 'Industry beauty VN averages' },
    { layer: 'intelligence', label: 'Shop vs market gap', module: 'benchmark', action: 'Margin +3.9% · Return -1.6%' },
    { layer: 'action', label: 'Improvement targets', module: 'optimization', action: 'Focus live CVR + affiliate' },
    { layer: 'automation', label: 'Monthly benchmark report', module: 'notifications', action: 'Email report 1st of month' }
  ]),
  actions: buildModFlow('actions', 'Insight → Queue → Approve → Execute', 'new action created', [
    { layer: 'data', label: 'Collect from AI/alerts/flows', module: 'actions', action: '4 items AQ001-AQ004' },
    { layer: 'intelligence', label: 'Priority sort', module: 'actions', action: 'Critical 1 · High 2 · Medium 1' },
    { layer: 'action', label: 'Owner approve', module: 'actions', action: 'Nguyễn Minh Anh approve AQ004' },
    { layer: 'automation', label: 'Execute on target module', module: 'ads', action: 'FLOW_AI_ACTION chain' }
  ]),
  automation: buildModFlow('automation', 'Rule config → Trigger → Chain → Log', 'rule trigger fired', [
    { layer: 'data', label: 'Load active rules', module: 'automation', action: 'R001-R004 · 3 active' },
    { layer: 'intelligence', label: 'Evaluate condition', module: 'automation', action: 'Match trigger against live data' },
    { layer: 'action', label: 'Fire linked flow', module: 'workflows', action: 'Chain to FLOW_*' },
    { layer: 'automation', label: 'Audit & notify', module: 'audit', action: 'Log run · notify channel' }
  ]),
  optimization: buildModFlow('optimization', '6 Optimizers parallel → Batch actions', 'manual hoặc weekly', [
    { layer: 'intelligence', label: 'Product Portfolio Optimizer', module: 'optimization', action: 'Scale P001,P005 · Fix P006' },
    { layer: 'intelligence', label: 'KOC + Content + Campaign', module: 'optimization', action: 'Discovery · Replication · Budget' },
    { layer: 'action', label: 'Batch create actions', module: 'actions', action: '4 new actions in queue' },
    { layer: 'automation', label: 'FLOW_OPTIMIZE full', module: 'opportunities', action: 'Update opportunity status' }
  ]),
  workflows: buildModFlow('workflows', 'Trung tâm tích hợp TikTok', 'Kích hoạt thủ công hoặc theo quy tắc', [
    { phase: 'sync', label: 'Kiểm tra kết nối TikTok Shop & Ads', integration: 'OAuth + Webhook', module: 'settings', action: '3 nguồn live · độ trễ 2-5 giây · token còn hạn', detail: 'Seller Center · Ads Manager · Affiliate Center' },
    { phase: 'analyze', label: 'Chọn quy trình theo tình huống', integration: 'Workflow Catalog', module: 'workflows', action: '8 luồng tích hợp · shop / ads / affiliate', detail: 'Mỗi luồng gắn quy tắc tự động hoặc lịch hẹn' },
    { phase: 'execute', label: 'Thực thi từng bước trên TikTok', integration: 'Write-back', module: 'workflows', action: 'Pause Ads · cập nhật tồn · fulfillment · sample', detail: 'Chờ duyệt owner trước thay đổi budget lớn' },
    { phase: 'confirm', label: 'Ghi audit & thông báo hoàn tất', integration: 'Audit', module: 'audit', action: 'Log · Zalo/In-App · cập nhật dashboard', detail: 'Theo dõi KPI 24-48h sau thực thi' }
  ], { platform: 'cross', triggerType: 'scheduled' }),
  notifications: buildModFlow('notifications', 'Event → Route channel → Deliver', 'alert or system event', [
    { layer: 'data', label: 'Receive event payload', module: 'notifications', action: 'Alert, flow complete, report' },
    { layer: 'intelligence', label: 'Route by severity', module: 'notifications', action: 'Critical→Zalo · Info→In-App' },
    { layer: 'action', label: 'Deliver multi-channel', module: 'notifications', action: 'In-App, Email, Zalo, Webhook' },
    { layer: 'automation', label: 'Mark read & link action', module: 'alerts', action: 'Deep link to module' }
  ]),
  audit: buildModFlow('audit', 'Capture → Store → Search → Export', 'any system change', [
    { layer: 'data', label: 'Capture activity log', module: 'audit', action: 'User, action, module, timestamp' },
    { layer: 'intelligence', label: 'Filter & search', module: 'audit', action: 'By user, module, date range' },
    { layer: 'action', label: 'Compliance review', module: 'audit', action: 'Approval history trace' },
    { layer: 'automation', label: 'Export governance report', module: 'settings', action: 'CSV/PDF accounting export' }
  ]),
  settings: buildModFlow('settings', 'Configure → Integrate → Govern', 'settings change', [
    { layer: 'data', label: 'Shop & integration config', module: 'settings', action: 'OAuth, ERP, timezone VND' },
    { layer: 'intelligence', label: 'Data quality score', module: 'settings', action: '96% quality · 85% mapping' },
    { layer: 'action', label: 'RBAC role assignment', module: 'settings', action: 'Owner/Manager/Operator/Analyst' },
    { layer: 'automation', label: 'Scheduled reconciliation', module: 'datahub', action: 'Daily 06:00 reconcile job' }
  ])
};

function getModuleFlow(pageId) {
  if (MODULE_FLOWS[pageId]) return MODULE_FLOWS[pageId];
  const primaryId = PAGE_PRIMARY_FLOW[pageId];
  if (primaryId) {
    const global = AUTOMATION_FLOWS.find(f => f.id === primaryId);
    if (global) return { ...global, pageId, linkedFlow: primaryId };
  }
  const linked = AUTOMATION_FLOWS.find(f => f.modules.includes(pageId));
  if (linked) return { ...linked, pageId, linkedFlow: linked.id };
  return AUTOMATION_FLOWS.find(f => f.id === 'FLOW_OPTIMIZE');
}

function runModuleFlow(pageId) {
  const flow = getModuleFlow(pageId);
  if (flow.linkedFlow && flow.id.startsWith('MOD_')) {
    runAutomationFlow(flow.linkedFlow);
  } else if (flow.id.startsWith('MOD_')) {
    runAutomationFlow(flow.id);
  } else {
    runAutomationFlow(flow.id);
  }
}
