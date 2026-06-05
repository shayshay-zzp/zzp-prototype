/* Hướng dẫn 1:1 theo PRD — từng module */
const MODULE_GUIDES = {
  onboarding: {
    prd: 'Onboarding & Setup Shop · Shop Setup Checklist, OAuth Connection, Shop Health Score',
    steps: [
      { title: 'Đăng ký & tạo workspace ZZP', desc: 'Tạo tài khoản seller, chọn ngành hàng Mỹ phẩm, mời team vận hành.', done: () => true, action: null, link: null },
      { title: 'Kết nối TikTok Shop OAuth', desc: 'Authorize Seller Center → ZZP đồng bộ shop ID, token, quyền API.', done: () => ZZP_DATA.shop.connected, action: 'refreshOAuth', link: 'onboarding' },
      { title: 'Xác minh danh tính & GPKD', desc: 'Upload giấy phép kinh doanh, CMND/CCCD chủ shop.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c2')?.done, action: 'verifyDocs', link: 'onboarding' },
      { title: 'Thiết lập thanh toán & vận chuyển', desc: 'Liên kết ngân hàng, cấu hình GHN/GHTK/J&T, mapping kho.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c3')?.done && ZZP_DATA.checklist.find(c=>c.id==='c4')?.done, action: null, link: 'onboarding' },
      { title: 'Hoàn thành Shop Health ≥ 80%', desc: 'Checklist 10 bước → Health Score tính tự động từ checklist + listing + compliance.', done: () => calcHealthScore() >= 80, action: 'viewChecklist', link: 'onboarding' }
    ]
  },
  'products-setup': {
    prd: 'Product Launch · Product Management, Listing Assist, Listing Quality Checker',
    steps: [
      { title: 'Tạo sản phẩm mới trên TikTok Shop', desc: 'Nhập SKU, tiêu đề SEO, mô tả ≥200 ký tự, giá, phân loại ngành hàng.', done: () => ZZP_DATA.products.length >= 5, action: null, link: 'products-setup' },
      { title: 'Upload ảnh & video chuẩn TikTok', desc: 'Tối thiểu 6 ảnh 1:1, 1 video demo 15-30s, ảnh nhãn INCI (mỹ phẩm).', done: () => ZZP_DATA.products.filter(p=>p.listingScore>=80).length >= 5, action: 'checkListing', link: 'products-setup' },
      { title: 'Chạy Listing Quality Checker', desc: 'Hệ thống chấm điểm 0-100: tiêu đề, ảnh, thuộc tính, compliance.', done: () => ZZP_DATA.products.every(p=>p.listingScore>=70), action: 'runQualityCheck', link: 'products-setup' },
      { title: 'Đăng ký Hero SKU (≥85%)', desc: 'Chọn 4-5 sản phẩm chiến lược đạt score ≥85% để scale Affiliate & Ads.', done: () => ZZP_DATA.products.filter(p=>p.hero&&p.listingScore>=85).length >= 4, action: null, link: 'portfolio' },
      { title: 'Submit duyệt & theo dõi trạng thái', desc: 'Listing review thường 24-48h. Theo dõi rejected và sửa ngay.', done: () => ZZP_DATA.products.filter(p=>p.status==='review').length === 0, action: null, link: 'compliance' }
    ]
  },
  store: {
    prd: 'Store Optimization · Store Decoration, Template Center, Brand Kit',
    steps: [
      { title: 'Thiết lập Brand Kit', desc: 'Logo, màu primary/secondary, font, tone of voice thương hiệu.', done: () => !!ZZP_DATA.brandKit.logo, action: null, link: 'store' },
      { title: 'Tạo banner cửa hàng', desc: 'Banner 1200×400px, CTA rõ ràng, đồng bộ campaign đang chạy.', done: () => !!ZZP_DATA.brandKit.banner, action: 'applyTemplate', link: 'store' },
      { title: 'Sắp xếp Hero SKU trên storefront', desc: 'Pin 3-4 sản phẩm chủ lực lên đầu trang shop.', done: () => false, action: 'previewStore', link: 'store' },
      { title: 'Áp dụng Template Center', desc: 'Chọn template Flash Sale / New Arrival / Live Countdown.', done: () => false, action: 'applyTemplate', link: 'store' }
    ]
  },
  compliance: {
    prd: 'Compliance & Policy · TikTok Policy Hub, Compliance Checker',
    steps: [
      { title: 'Theo dõi Policy Hub', desc: 'ZZP AI quét chính sách mới TikTok Shop hàng ngày, đánh giá impact.', done: () => true, action: null, link: 'compliance' },
      { title: 'Đánh giá sản phẩm bị ảnh hưởng', desc: 'Map policy → SKU cụ thể (vd: POL001 → P006 thiếu INCI).', done: () => ZZP_DATA.policies.every(p=>p.affected.length===0||p.status!=='action_required'), action: 'runCompliance', link: 'compliance' },
      { title: 'Cập nhật listing vi phạm', desc: 'Sửa ảnh, mô tả, claim theo yêu cầu mới trong 7 ngày.', done: () => ZZP_DATA.products.filter(p=>p.status==='review').length===0, action: 'fixListing', link: 'products-setup' },
      { title: 'Xác nhận Compliance Check pass', desc: '100% sản phẩm active tuân thủ → unlock scale Ads/Affiliate.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c8')?.done, action: 'completeCompliance', link: 'compliance' }
    ]
  },
  education: {
    prd: 'Education Hub · Onboarding Playbook, SOP',
    steps: [
      { title: 'Hoàn thành module cơ bản (E001-E002)', desc: 'Bắt đầu TikTok Shop + Tối ưu Listing.', done: () => ZZP_DATA.education.filter(e=>['E001','E002'].includes(e.id)&&e.progress===100).length===2, action: 'startLesson', link: 'education' },
      { title: 'Đọc Playbook Affiliate Beauty', desc: 'Chiến lược commission, tuyển KOC, SAM framework.', done: () => (ZZP_DATA.education.find(e=>e.id==='E003')?.progress||0)>=100, action: 'startLesson', link: 'education' },
      { title: 'Học SOP Livestream & P&L', desc: 'Live checklist + đọc báo cáo lợi nhuận thực.', done: () => ZZP_DATA.education.every(e=>e.progress===100), action: 'startLesson', link: 'education' }
    ]
  },
  portfolio: {
    prd: 'Product Strategy · Product Portfolio Planning, Hero SKU Selection',
    steps: [
      { title: 'Phân loại ma trận BCG', desc: 'Star / Cash Cow / Potential / Review theo GMV + margin + velocity.', done: () => true, action: null, link: 'portfolio' },
      { title: 'Chọn Hero SKU chiến lược', desc: '4 sản phẩm: Serum VC, Kem HA, Mặt nạ, Kem chống nắng.', done: () => ZZP_DATA.products.filter(p=>p.hero).length>=4, action: null, link: 'portfolio' },
      { title: 'Lập kế hoạch scale 90 ngày', desc: 'Budget Ads + Affiliate + Live cho từng Hero SKU.', done: () => false, action: 'planScale', link: 'campaigns' }
    ]
  },
  channels: {
    prd: 'Multi-channel · Channel Integration, SKU Mapping',
    steps: [
      { title: 'Kết nối kênh bán hàng', desc: 'TikTok Shop (primary), Shopee, Lazada, ERP KiotViet.', done: () => ZZP_DATA.channels.filter(c=>c.status==='synced').length>=3, action: 'syncChannels', link: 'channels' },
      { title: 'Mapping SKU đa kênh', desc: 'Map TikTok SKU ↔ Shopee/Lazada/ERP để đồng bộ tồn kho.', done: () => ZZP_DATA.skuMapping.length>=4, action: null, link: 'channels' },
      { title: 'Bật auto-sync tồn kho', desc: 'Khi bán trên TikTok → trừ kho tất cả kênh.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c10')?.done, action: 'enableAutoSync', link: 'datahub' }
    ]
  },
  datahub: {
    prd: 'Data Synchronization · Data Hub, TikTok Shop Sync',
    steps: [
      { title: 'Kết nối 6 nguồn dữ liệu', desc: 'Shop, Ads, Affiliate, Live, Content, ERP.', done: () => ZZP_DATA.dataSync.every(d=>d.status==='live'||d.status==='synced'), action: 'forceSync', link: 'datahub' },
      { title: 'Kiểm tra latency < 15s', desc: 'Real-time pipeline, alert nếu sync fail.', done: () => true, action: null, link: 'datahub' },
      { title: 'Data Quality ≥ 95%', desc: 'Reconciliation hàng ngày 06:00.', done: () => true, action: null, link: 'settings' }
    ]
  },
  products: {
    prd: 'Product Operations · Product Management, Product Status Monitor',
    steps: [
      { title: 'Quản lý vòng đời SKU', desc: 'Draft → Review → Active → Low Stock → Discontinued.', done: () => true, action: null, link: 'products' },
      { title: 'Theo dõi hiệu suất bán/ngày', desc: 'Velocity, margin, return rate theo SKU.', done: () => true, action: 'viewProductDetail', link: 'product-analytics' },
      { title: 'Liên kết tồn kho & đơn hàng', desc: 'Click SKU → xem orders, inventory, affiliate GMV.', done: () => true, action: 'openDetail', link: 'products' }
    ]
  },
  orders: {
    prd: 'Order Operations · Order Center, SLA Monitoring',
    steps: [
      { title: 'Nhận đơn real-time từ TikTok Shop', desc: 'Đồng bộ qua Data Hub, phân loại nguồn: organic/affiliate/ads/live.', done: () => true, action: null, link: 'orders' },
      { title: 'Xử lý đơn trong SLA', desc: 'Pending → Processing trong 2-4h. Cảnh báo nếu sắp quá hạn.', done: () => ZZP_DATA.orders.filter(o=>o.status==='pending').length<=1, action: 'processPending', link: 'orders' },
      { title: 'Giao hàng & tracking', desc: 'Processing → Shipped → Delivered. Sync tracking về TikTok.', done: () => true, action: null, link: 'orders' },
      { title: 'Xử lý hoàn/hủy', desc: 'Return requested → review → refund. Link Returns module.', done: () => true, action: null, link: 'returns' }
    ]
  },
  inventory: {
    prd: 'Inventory Management · Inventory Monitor, Stock Alert',
    steps: [
      { title: 'Theo dõi tồn kho real-time', desc: 'Sync từ ERP + TikTok Shop, cập nhật mỗi 15s.', done: () => true, action: null, link: 'inventory' },
      { title: 'Tính velocity & ngày còn lại', desc: 'sold30d/30 = velocity. stock/velocity = days left.', done: () => true, action: null, link: 'inventory' },
      { title: 'Cảnh báo stock < ngưỡng', desc: 'Rule auto: stock < 100 → alert + tạo task nhập hàng.', done: () => ZZP_DATA.automationRules.find(r=>r.id==='R001')?.active, action: 'runFlowStock', link: 'inventory' },
      { title: 'Đặt PO nhập kho', desc: 'P003 cần nhập 2000 sp khẩn — chạy flow tự động.', done: () => false, action: 'runFlowStock', link: 'forecast' }
    ]
  },
  returns: {
    prd: 'Return Management · Return & Cancellation Center',
    steps: [
      { title: 'Tiếp nhận yêu cầu hoàn/hủy', desc: 'Tự động từ TikTok Shop, phân loại lý do.', done: () => true, action: null, link: 'returns' },
      { title: 'Review & approve trong 24h', desc: 'Ops review → approve/reject → refund.', done: () => ZZP_DATA.returns.filter(r=>r.status==='pending_review').length<=1, action: 'reviewReturn', link: 'returns' },
      { title: 'Phân tích nguyên nhân thất thoát', desc: 'Dashboard return rate 3.2% vs benchmark 4.8%.', done: () => true, action: null, link: 'profit' }
    ]
  },
  affiliate: {
    prd: 'Affiliate Operations · Affiliate Center, Creator Pipeline, SAM',
    steps: [
      { title: 'Kích hoạt Affiliate Program', desc: 'Commission 8-15% theo tier KOC, open plan cho Hero SKU.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c7')?.done, action: null, link: 'affiliate' },
      { title: 'Thiết lập chiến lược SAM', desc: 'Sample → Affiliate → Macro: tuyển → gửi mẫu → đo ROI → scale.', done: () => true, action: null, link: 'affiliate' },
      { title: 'Theo dõi GMV theo nguồn Affiliate', desc: '38% tổng GMV từ Affiliate — top KOC ranking.', done: () => true, action: null, link: 'affiliate-analytics' },
      { title: 'Tối ưu commission theo ROI', desc: 'Tăng commission KOC ROI > 3x, giảm KOC ROI < 2x.', done: () => false, action: 'optimizeCommission', link: 'koc' }
    ]
  },
  koc: {
    prd: 'KOC Management · KOC CRM, KOC Lifecycle Tracking',
    steps: [
      { title: 'Prospect → Sample → Content → Revenue', desc: 'Pipeline 4 giai đoạn vòng đời KOC.', done: () => true, action: null, link: 'koc' },
      { title: 'Scorecard đánh giá KOC', desc: 'GMV, ROI, CVR, videos → score 0-100.', done: () => true, action: 'viewKocDetail', link: 'creator-analytics' },
      { title: 'Quyết định scale/cut', desc: 'Score ≥80: scale · 50-79: nurture · <50: review/cut.', done: () => true, action: null, link: 'creator-analytics' }
    ]
  },
  agency: {
    prd: 'Agency Management · Agency ROI Tracking',
    steps: [
      { title: 'Onboard Agency & MCN', desc: 'Fee structure, KOC pool, reporting cadence.', done: () => true, action: null, link: 'agency' },
      { title: 'Track ROI Agency vs direct KOC', desc: 'MCN Beauty Stars ROI 3.8x vs direct 4.2x.', done: () => true, action: null, link: 'agency' }
    ]
  },
  samples: {
    prd: 'Sample Management · Sample Tracking, Sample ROI',
    steps: [
      { title: 'Gửi mẫu cho KOC prospect', desc: 'Auto-approve nếu score > 80 (rule R004).', done: () => ZZP_DATA.samples.length>=4, action: 'sendSample', link: 'samples' },
      { title: 'Theo dõi conversion mẫu → content', desc: 'Pending → Converted / No content trong 14 ngày.', done: () => true, action: null, link: 'samples' },
      { title: 'Tính Sample ROI', desc: 'Revenue / Sample cost. Cut nếu ROI < 2x sau 30 ngày.', done: () => true, action: null, link: 'costs' }
    ]
  },
  content: {
    prd: 'Content Operations · Content Calendar, Content Task Manager',
    steps: [
      { title: 'Lập Content Calendar tháng', desc: 'Plan video Affiliate, deadline, KOC assign.', done: () => true, action: null, link: 'content' },
      { title: 'Brief & approve content', desc: 'Draft → Review → Scheduled → Published.', done: () => true, action: null, link: 'content' },
      { title: 'Đo hiệu suất post-publish', desc: 'Views, orders, GMV, CTR → Content Intelligence.', done: () => true, action: null, link: 'content-analytics' }
    ]
  },
  livestream: {
    prd: 'Livestream Operations · Live Checklist, Live Performance',
    steps: [
      { title: 'Live Checklist 8 bước', desc: 'Script, flash sale, voucher, pin product, test stream...', done: () => ZZP_DATA.liveSessions.some(l=>l.checklistDone>=6), action: null, link: 'livestream' },
      { title: 'Setup campaign & voucher live-only', desc: 'Flash sale + voucher chỉ dùng trong live.', done: () => false, action: 'prepLive', link: 'campaigns' },
      { title: 'Book Live Ads', desc: 'Schedule AD003 cho Mega Live 6/6.', done: () => ZZP_DATA.ads.find(a=>a.id==='AD003')?.status==='scheduled', action: null, link: 'ads' },
      { title: 'Post-live report & GMV tracking', desc: 'So sánh expected vs actual, update KOC score.', done: () => true, action: null, link: 'live-analytics' }
    ]
  },
  campaigns: {
    prd: 'Campaign Management · Campaign Center, Promotion Center',
    steps: [
      { title: 'Tạo chiến dịch khuyến mãi', desc: 'Flash sale, bundle, new customer promo.', done: () => ZZP_DATA.campaigns.length>=3, action: null, link: 'campaigns' },
      { title: 'Gắn sản phẩm & thời gian', desc: 'Chọn Hero SKU, set discount, budget cap.', done: () => true, action: null, link: 'campaigns' },
      { title: 'Theo dõi spent vs GMV', desc: 'ROI campaign, adjust mid-flight.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  vouchers: {
    prd: 'Voucher Management · Voucher Guardrail, Voucher Performance',
    steps: [
      { title: 'Tạo voucher với guardrail', desc: 'Max discount, usage limit, budget cap.', done: () => true, action: null, link: 'vouchers' },
      { title: 'Monitor usage vs limit', desc: 'NEW50K 63% — cảnh báo guardrail.', done: () => ZZP_DATA.vouchers.every(v=>v.guardrail!=='critical'), action: 'adjustVoucher', link: 'vouchers' },
      { title: 'Đo GMV/CVR per voucher', desc: 'BEAUTY20 ROAS tốt · NEW50K CVR thấp.', done: () => true, action: null, link: 'costs' }
    ]
  },
  ads: {
    prd: 'Ads Integration · Spark Ads Wizard, Campaign Guided Setup',
    steps: [
      { title: 'Spark Ads từ video KOC', desc: 'Boost video viral (V001) — ROAS 3.8x.', done: () => ZZP_DATA.ads.find(a=>a.id==='AD001')?.roas>=2, action: null, link: 'ads' },
      { title: 'Product Ads monitoring', desc: 'Pause nếu ROAS < 1.5x (rule R002).', done: () => ZZP_DATA.ads.find(a=>a.id==='AD002')?.status==='paused', action: 'runFlowAds', link: 'ads' },
      { title: 'Kết nối Ads data → Revenue', desc: 'Attribution: ads GMV 72M = 15% tổng.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  executive: {
    prd: 'Business Intelligence · Executive Dashboard',
    steps: [
      { title: 'Xem tổng quan GMV, P&L, Orders', desc: 'Single pane of glass cho Owner.', done: () => true, action: null, link: 'executive' },
      { title: 'Drill-down theo module', desc: 'Click metric → Revenue / Product / Affiliate detail.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  revenue: {
    prd: 'Revenue Intelligence · Revenue Breakdown, Attribution Analysis',
    steps: [
      { title: 'Phân tích nguồn GMV', desc: 'Affiliate 38% · Live 27% · Ads 15% · Organic 20%.', done: () => true, action: null, link: 'revenue' },
      { title: 'Attribution theo SKU × kênh', desc: 'Biết SKU nào bán qua kênh nào hiệu quả nhất.', done: () => true, action: null, link: 'product-analytics' }
    ]
  },
  profit: {
    prd: 'Profit Intelligence · P&L Dashboard, Margin Analytics',
    steps: [
      { title: 'Tính lợi nhuận thực', desc: 'GMV - COGS - shipping - commission - ads - voucher - platform.', done: () => true, action: null, link: 'profit' },
      { title: 'Margin theo SKU', desc: 'Serum VC margin 66% · Mặt nạ thấp hơn do ads cost.', done: () => true, action: null, link: 'product-analytics' }
    ]
  },
  costs: {
    prd: 'Cost Intelligence · Sample, Commission, Voucher, Ads Cost',
    steps: [
      { title: 'Breakdown cấu trúc chi phí', desc: 'COGS 30% · Commission 8.7% · Ads 4.3% · Voucher 5.1%.', done: () => true, action: null, link: 'costs' },
      { title: 'Identify cost anomalies', desc: 'Ads cost ↑12% — investigate AD002.', done: () => true, action: 'runFlowAds', link: 'ads' }
    ]
  },
  'product-analytics': { prd: 'Product Intelligence · Product Performance, SKU Ranking', steps: [{ title: 'SKU Ranking theo GMV', desc: 'Top: Mặt nạ, Serum, Kem CN.', done: () => true, action: null, link: 'product-analytics' }, { title: 'Scale/Optimize/Maintain action', desc: 'AI label từng SKU.', done: () => true, action: null, link: 'optimization' }] },
  'affiliate-analytics': { prd: 'Affiliate Intelligence · Affiliate Contribution', steps: [{ title: 'Contribution by KOC', desc: 'Pie chart GMV per creator.', done: () => true, action: null, link: 'affiliate-analytics' }] },
  'creator-analytics': { prd: 'Creator Intelligence · KOC Scorecard, Creator Ranking', steps: [{ title: 'Ranking & tier recommendation', desc: 'K003 score 96 → Macro+.', done: () => true, action: 'viewKocDetail', link: 'koc' }] },
  'content-analytics': { prd: 'Content Intelligence · Video Performance, Pattern Analysis', steps: [{ title: 'Identify winning patterns', desc: 'Routine 3 bước CVR 4.2%.', done: () => true, action: null, link: 'optimization' }] },
  'live-analytics': { prd: 'Livestream Intelligence · Session Performance', steps: [{ title: 'GMV/giờ per session', desc: 'K003 live: 78M/giờ.', done: () => true, action: null, link: 'livestream' }] },
  'customer-analytics': { prd: 'Customer Intelligence · Segmentation, LTV', steps: [{ title: 'Segment VIP/Returning/New/At Risk', desc: '456 At Risk → win-back campaign.', done: () => true, action: null, link: 'optimization' }] },
  team: { prd: 'Team Collaboration · RBAC, Workflow Center', steps: [{ title: 'Phân quyền theo vai trò', desc: 'Owner/Manager/Operator/Analyst.', done: () => true, action: null, link: 'team' }, { title: 'Approval workflows', desc: 'Pause ads >10M → Owner approve.', done: () => true, action: null, link: 'actions' }] },
  'growth-assistant': { prd: 'Growth Assistant · AI Insight Engine, Action Recommendation', steps: [{ title: 'AI phân tích & ưu tiên', desc: '4 insights ranked by impact.', done: () => true, action: null, link: 'growth-assistant' }, { title: 'One-click → Action Queue', desc: 'Insight thành task cụ thể.', done: () => true, action: 'createAction', link: 'actions' }] },
  alerts: { prd: 'Smart Alerts · Profit, Cost, Inventory, Operation Alert', steps: [{ title: 'Auto-detect anomalies', desc: '6 alert types active.', done: () => true, action: null, link: 'alerts' }, { title: 'Alert → Action flow', desc: 'Click action → navigate module + mark read.', done: () => true, action: 'handleAlert', link: 'alerts' }] },
  opportunities: { prd: 'Opportunity Engine · Growth Opportunity Detection', steps: [{ title: 'Scan products/KOC/content/campaigns', desc: '4 opportunities detected.', done: () => true, action: null, link: 'opportunities' }] },
  forecast: { prd: 'Forecasting · Sales & Inventory Forecasting', steps: [{ title: 'GMV forecast 7 ngày', desc: 'Peak T7 live 95M.', done: () => true, action: null, link: 'forecast' }, { title: 'Stockout prediction P003', desc: '2 ngày còn lại.', done: () => true, action: 'runFlowStock', link: 'inventory' }] },
  benchmark: { prd: 'Market Intelligence · Industry Benchmark', steps: [{ title: 'So sánh vs thị trường', desc: 'Margin +3.9% above market.', done: () => true, action: null, link: 'benchmark' }] },
  actions: { prd: 'Decision Center · Action Center, Approval Queue', steps: [{ title: 'Insight → Action → Approve → Execute', desc: '4 actions in queue.', done: () => true, action: 'approveAction', link: 'actions' }] },
  automation: { prd: 'Automation · Rule Engine, Growth Automation Engine', steps: [{ title: 'Cấu hình rules', desc: 'Stock alert, ROAS pause, daily report.', done: () => true, action: null, link: 'automation' }, { title: 'Chạy flow tự động', desc: 'Trigger → chain actions.', done: () => true, action: 'openFlowCenter', link: 'workflows' }] },
  optimization: { prd: 'Growth Optimizers · Product/Affiliate/Content/Campaign Optimization', steps: [{ title: 'Chạy tất cả optimizers', desc: '6 engines: product, KOC, content, campaign, pricing, retention.', done: () => true, action: 'runFlowOptimize', link: 'optimization' }] },
  workflows: { prd: 'Workflow Engine · Approval Flow, Task Assignment, Automation', steps: [{ title: 'Xem & chạy flow tự động', desc: '8 pre-built flows liên kết modules.', done: () => true, action: null, link: 'workflows' }] },
  notifications: { prd: 'Notification Center · In-App, Email, Zalo, Webhook', steps: [{ title: 'Cấu hình kênh thông báo', desc: 'Multi-channel alerts.', done: () => true, action: null, link: 'notifications' }] },
  audit: { prd: 'Audit & Governance · Activity Log, Change Tracking', steps: [{ title: 'Theo dõi mọi thao tác', desc: 'User, action, module, timestamp.', done: () => true, action: null, link: 'audit' }] },
  settings: { prd: 'User & Access · Authentication, RBAC, Data Governance', steps: [{ title: 'Shop settings & integrations', desc: 'OAuth, ERP, data quality.', done: () => true, action: null, link: 'settings' }] },
  dashboard: { prd: 'Tổng quan vận hành TikTok Shop', steps: [{ title: 'Theo dõi KPI chính', desc: 'GMV, profit, orders, alerts.', done: () => true, action: null, link: 'dashboard' }, { title: 'Điều hướng module', desc: 'Sidebar → module cụ thể.', done: () => true, action: null, link: 'onboarding' }] }
};

function getGuideProgress(pageId) {
  const g = MODULE_GUIDES[pageId];
  if (!g) return { done: 0, total: 0, pct: 0 };
  const done = g.steps.filter(s => s.done()).length;
  return { done, total: g.steps.length, pct: Math.round(done / g.steps.length * 100) };
}

function renderGuidePanel(pageId) {
  const g = MODULE_GUIDES[pageId];
  if (!g) return '<p class="text-slate-500">Chưa có hướng dẫn cho module này.</p>';
  const prog = getGuideProgress(pageId);
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between p-4 bg-zzp-50 rounded-xl border border-zzp-100">
        <div><p class="font-semibold text-zzp-800">Hướng dẫn từng bước — 1:1 PRD</p><p class="text-xs text-zzp-600 mt-1">${g.prd}</p></div>
        <div class="text-right"><p class="text-2xl font-bold text-zzp-700">${prog.pct}%</p><p class="text-xs text-slate-500">${prog.done}/${prog.total} bước</p></div>
      </div>
      <div class="space-y-3">
        ${g.steps.map((s, i) => {
          const done = s.done();
          return `<div class="flex gap-4 p-4 rounded-xl border ${done ? 'border-green-200 bg-green-50/50' : 'border-slate-200 bg-white'}">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold ${done ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'}">${done ? '✓' : i + 1}</div>
            <div class="flex-1 min-w-0">
              <p class="font-medium ${done ? 'text-green-800' : ''}">${s.title}</p>
              <p class="text-sm text-slate-500 mt-1">${s.desc}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                ${s.link ? `<button onclick="navigate('${s.link}')" class="text-xs px-3 py-1.5 bg-zzp-600 text-white rounded-lg">Đi tới module →</button>` : ''}
                ${s.action === 'runFlowStock' ? `<button onclick="runAutomationFlow('FLOW_STOCK')" class="text-xs px-3 py-1.5 border border-zzp-300 text-zzp-700 rounded-lg">▶ Chạy flow tự động</button>` : ''}
                ${s.action === 'runFlowAds' ? `<button onclick="runAutomationFlow('FLOW_ADS')" class="text-xs px-3 py-1.5 border border-zzp-300 text-zzp-700 rounded-lg">▶ Chạy flow tự động</button>` : ''}
                ${s.action === 'runFlowOptimize' ? `<button onclick="runAutomationFlow('FLOW_OPTIMIZE')" class="text-xs px-3 py-1.5 border border-zzp-300 text-zzp-700 rounded-lg">▶ Chạy flow tự động</button>` : ''}
                ${s.action === 'viewKocDetail' ? `<button onclick="openDetail('koc','K003')" class="text-xs px-3 py-1.5 border rounded-lg">Xem KOC mẫu →</button>` : ''}
                ${s.action === 'checkListing' ? `<button onclick="openListingCheck('P006')" class="text-xs px-3 py-1.5 border rounded-lg">Kiểm tra listing →</button>` : ''}
                ${s.action === 'completeCompliance' ? `<button onclick="runAutomationFlow('FLOW_COMPLIANCE')" class="text-xs px-3 py-1.5 border border-red-300 text-red-700 rounded-lg">▶ Flow compliance</button>` : ''}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}
