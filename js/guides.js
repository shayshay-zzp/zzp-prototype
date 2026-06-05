/* Hướng dẫn 1:1 theo PRD — từng module */
const MODULE_GUIDES = {
  onboarding: {
    prd: 'Onboarding & Setup Shop · Shop Setup Checklist, OAuth Connection, Shop Health Score',
    steps: [
      { title: 'Đăng ký & tạo không gian ZZP', desc: 'Tạo tài khoản người bán, chọn ngành hàng Mỹ phẩm, mời nhóm vận hành.', done: () => true, action: null, link: null },
      { title: 'Kết nối TikTok Shop OAuth', desc: 'Ủy quyền Seller Center → ZZP đồng bộ shop ID, token, quyền API.', done: () => ZZP_DATA.shop.connected, action: 'refreshOAuth', link: 'onboarding' },
      { title: 'Xác minh danh tính & GPKD', desc: 'Tải lên giấy phép kinh doanh, CMND/CCCD chủ shop.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c2')?.done, action: 'verifyDocs', link: 'onboarding' },
      { title: 'Thiết lập thanh toán & vận chuyển', desc: 'Liên kết ngân hàng, cấu hình GHN/GHTK/J&T, ánh xạ kho.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c3')?.done && ZZP_DATA.checklist.find(c=>c.id==='c4')?.done, action: null, link: 'onboarding' },
      { title: 'Hoàn thành sức khỏe shop ≥ 80%', desc: 'Danh sách kiểm tra 10 bước → điểm sức khỏe tính tự động từ danh sách kiểm tra + tin đăng + tuân thủ.', done: () => calcHealthScore() >= 80, action: 'viewChecklist', link: 'onboarding' }
    ]
  },
  'products-setup': {
    prd: 'Product Launch · Product Management, Listing Assist, Listing Quality Checker',
    steps: [
      { title: 'Tạo sản phẩm mới trên TikTok Shop', desc: 'Nhập SKU, tiêu đề SEO, mô tả ≥200 ký tự, giá, phân loại ngành hàng.', done: () => ZZP_DATA.products.length >= 5, action: null, link: 'products-setup' },
      { title: 'Tải lên ảnh & video chuẩn TikTok', desc: 'Tối thiểu 6 ảnh 1:1, 1 video minh họa 15-30s, ảnh nhãn INCI (mỹ phẩm).', done: () => ZZP_DATA.products.filter(p=>p.listingScore>=80).length >= 5, action: 'checkListing', link: 'products-setup' },
      { title: 'Chạy công cụ kiểm tra chất lượng tin đăng', desc: 'Hệ thống chấm điểm 0-100: tiêu đề, ảnh, thuộc tính, tuân thủ.', done: () => ZZP_DATA.products.every(p=>p.listingScore>=70), action: 'runQualityCheck', link: 'products-setup' },
      { title: 'Đăng ký Hero SKU (≥85%)', desc: 'Chọn 4-5 sản phẩm chiến lược đạt điểm ≥85% để mở rộng Affiliate & Ads.', done: () => ZZP_DATA.products.filter(p=>p.hero&&p.listingScore>=85).length >= 4, action: null, link: 'portfolio' },
      { title: 'Gửi duyệt & theo dõi trạng thái', desc: 'Duyệt tin đăng thường 24-48h. Theo dõi bị từ chối và sửa ngay.', done: () => ZZP_DATA.products.filter(p=>p.status==='review').length === 0, action: null, link: 'compliance' }
    ]
  },
  store: {
    prd: 'Store Optimization · Store Decoration, Template Center, Brand Kit',
    steps: [
      { title: 'Thiết lập bộ nhận diện', desc: 'Logo, màu chính/phụ, phông chữ, giọng điệu thương hiệu.', done: () => !!ZZP_DATA.brandKit.logo, action: null, link: 'store' },
      { title: 'Tạo banner cửa hàng', desc: 'Banner 1200×400px, kêu gọi hành động rõ ràng, đồng bộ chiến dịch đang chạy.', done: () => !!ZZP_DATA.brandKit.banner, action: 'applyTemplate', link: 'store' },
      { title: 'Sắp xếp Hero SKU trên gian hàng', desc: 'Ghim 3-4 sản phẩm chủ lực lên đầu trang shop.', done: () => ZZP_DATA.store.pinnedProductIds.length >= 3, action: 'previewStore', link: 'store' },
      { title: 'Áp dụng trung tâm mẫu', desc: 'Chọn mẫu Giảm giá chớp nhoáng / Hàng mới / Đếm ngược Live.', done: () => !!ZZP_DATA.store.activeTemplateId, action: 'applyTemplate', link: 'store' }
    ]
  },
  compliance: {
    prd: 'Compliance & Policy · TikTok Policy Hub, Compliance Checker',
    steps: [
      { title: 'Theo dõi trung tâm chính sách', desc: 'ZZP AI quét chính sách mới TikTok Shop hàng ngày, đánh giá tác động.', done: () => true, action: null, link: 'compliance' },
      { title: 'Đánh giá sản phẩm bị ảnh hưởng', desc: 'Ánh xạ chính sách → SKU cụ thể (vd: POL001 → P006 thiếu INCI).', done: () => ZZP_DATA.policies.every(p=>p.affected.length===0||p.status!=='action_required'), action: 'runCompliance', link: 'compliance' },
      { title: 'Cập nhật tin đăng vi phạm', desc: 'Sửa ảnh, mô tả, tuyên bố theo yêu cầu mới trong 7 ngày.', done: () => ZZP_DATA.products.filter(p=>p.status==='review').length===0, action: 'fixListing', link: 'products-setup' },
      { title: 'Xác nhận kiểm tra tuân thủ đạt', desc: '100% sản phẩm đang bán tuân thủ → mở khóa mở rộng Ads/Affiliate.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c8')?.done, action: 'completeCompliance', link: 'compliance' }
    ]
  },
  education: {
    prd: 'Education Hub · Onboarding Playbook, SOP',
    steps: [
      { title: 'Hoàn thành mô-đun cơ bản (E001-E002)', desc: 'Bắt đầu TikTok Shop + Tối ưu tin đăng.', done: () => ZZP_DATA.education.filter(e=>['E001','E002'].includes(e.id)&&e.progress===100).length===2, action: 'startLesson', link: 'education' },
      { title: 'Đọc sách hướng dẫn Affiliate Beauty', desc: 'Chiến lược hoa hồng, tuyển KOC, khung SAM.', done: () => (ZZP_DATA.education.find(e=>e.id==='E003')?.progress||0)>=100, action: 'startLesson', link: 'education' },
      { title: 'Học SOP Livestream & P&L', desc: 'Danh sách kiểm tra Live + đọc báo cáo lợi nhuận thực.', done: () => ZZP_DATA.education.every(e=>e.progress===100), action: 'startLesson', link: 'education' }
    ]
  },
  portfolio: {
    prd: 'Product Strategy · Product Portfolio Planning, Hero SKU Selection',
    steps: [
      { title: 'Phân loại ma trận BCG', desc: 'Ngôi sao / Bò sữa / Tiềm năng / Xem xét theo GMV + biên lợi nhuận + tốc độ bán.', done: () => true, action: null, link: 'portfolio' },
      { title: 'Chọn Hero SKU chiến lược', desc: '4 sản phẩm: Serum VC, Kem HA, Mặt nạ, Kem chống nắng.', done: () => ZZP_DATA.products.filter(p=>p.hero).length>=4, action: null, link: 'portfolio' },
      { title: 'Lập kế hoạch mở rộng 90 ngày', desc: 'Ngân sách Ads + Affiliate + Live cho từng Hero SKU.', done: () => false, action: 'planScale', link: 'campaigns' }
    ]
  },
  channels: {
    prd: 'Multi-channel · Channel Integration, SKU Mapping',
    steps: [
      { title: 'Kết nối kênh bán hàng', desc: 'TikTok Shop (chính), Shopee, Lazada, ERP KiotViet.', done: () => ZZP_DATA.channels.filter(c=>c.status==='synced').length>=3, action: 'syncChannels', link: 'channels' },
      { title: 'Ánh xạ SKU đa kênh', desc: 'Ánh xạ TikTok SKU ↔ Shopee/Lazada/ERP để đồng bộ tồn kho.', done: () => ZZP_DATA.skuMapping.length>=4, action: null, link: 'channels' },
      { title: 'Bật tự động đồng bộ tồn kho', desc: 'Khi bán trên TikTok → trừ kho tất cả kênh.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c10')?.done, action: 'enableAutoSync', link: 'datahub' }
    ]
  },
  datahub: {
    prd: 'Data Synchronization · Data Hub, TikTok Shop Sync',
    steps: [
      { title: 'Kết nối 6 nguồn dữ liệu', desc: 'Cửa hàng, Ads, Affiliate, Live, Nội dung, ERP.', done: () => ZZP_DATA.dataSync.every(d=>d.status==='live'||d.status==='synced'), action: 'forceSync', link: 'datahub' },
      { title: 'Kiểm tra độ trễ < 15s', desc: 'Luồng thời gian thực, cảnh báo nếu đồng bộ thất bại.', done: () => true, action: null, link: 'datahub' },
      { title: 'Chất lượng dữ liệu ≥ 95%', desc: 'Đối soát hàng ngày 06:00.', done: () => true, action: null, link: 'settings' }
    ]
  },
  products: {
    prd: 'Product Operations · Product Management, Product Status Monitor',
    steps: [
      { title: 'Quản lý vòng đời SKU', desc: 'Nháp → Duyệt → Đang bán → Sắp hết → Ngừng kinh doanh.', done: () => true, action: null, link: 'products' },
      { title: 'Theo dõi hiệu suất bán/ngày', desc: 'Tốc độ bán, biên lợi nhuận, tỷ lệ hoàn theo SKU.', done: () => true, action: 'viewProductDetail', link: 'product-analytics' },
      { title: 'Liên kết tồn kho & đơn hàng', desc: 'Nhấn SKU → xem đơn hàng, tồn kho, GMV Affiliate.', done: () => true, action: 'openDetail', link: 'products' }
    ]
  },
  orders: {
    prd: 'Order Operations · Order Center, SLA Monitoring',
    steps: [
      { title: 'Nhận đơn thời gian thực từ TikTok Shop', desc: 'Đồng bộ qua Trung tâm dữ liệu, phân loại nguồn: tự nhiên/affiliate/ads/live.', done: () => true, action: null, link: 'orders' },
      { title: 'Xử lý đơn trong SLA', desc: 'Chờ xử lý → Đang xử lý trong 2-4h. Cảnh báo nếu sắp quá hạn.', done: () => ZZP_DATA.orders.filter(o=>o.status==='pending').length<=1, action: 'processPending', link: 'orders' },
      { title: 'Giao hàng & theo dõi', desc: 'Đang xử lý → Đã giao → Đã nhận. Đồng bộ mã theo dõi về TikTok.', done: () => true, action: null, link: 'orders' },
      { title: 'Xử lý hoàn/hủy', desc: 'Yêu cầu hoàn → xem xét → hoàn tiền. Liên kết mô-đun Hoàn hàng.', done: () => true, action: null, link: 'returns' }
    ]
  },
  inventory: {
    prd: 'Inventory Management · Inventory Monitor, Stock Alert',
    steps: [
      { title: 'Theo dõi tồn kho thời gian thực', desc: 'Đồng bộ từ ERP + TikTok Shop, cập nhật mỗi 15s.', done: () => true, action: null, link: 'inventory' },
      { title: 'Tính tốc độ bán & ngày còn lại', desc: 'bán30ng/30 = tốc độ bán. tồn kho/tốc độ bán = số ngày còn lại.', done: () => true, action: null, link: 'inventory' },
      { title: 'Cảnh báo tồn kho < ngưỡng', desc: 'Quy tắc tự động: tồn kho < 100 → cảnh báo + tạo nhiệm vụ nhập hàng.', done: () => ZZP_DATA.automationRules.find(r=>r.id==='R001')?.active, action: 'runFlowStock', link: 'inventory' },
      { title: 'Đặt PO nhập kho', desc: 'P003 cần nhập 2000 sp khẩn — chạy luồng tự động.', done: () => false, action: 'runFlowStock', link: 'forecast' }
    ]
  },
  returns: {
    prd: 'Return Management · Return & Cancellation Center',
    steps: [
      { title: 'Tiếp nhận yêu cầu hoàn/hủy', desc: 'Tự động từ TikTok Shop, phân loại lý do.', done: () => true, action: null, link: 'returns' },
      { title: 'Xem xét & phê duyệt trong 24h', desc: 'Vận hành xem xét → phê duyệt/từ chối → hoàn tiền.', done: () => ZZP_DATA.returns.filter(r=>r.status==='pending_review').length<=1, action: 'reviewReturn', link: 'returns' },
      { title: 'Phân tích nguyên nhân thất thoát', desc: 'Bảng điều khiển tỷ lệ hoàn 3.2% so với chuẩn 4.8%.', done: () => true, action: null, link: 'profit' }
    ]
  },
  affiliate: {
    prd: 'Affiliate Operations · Affiliate Center, Creator Pipeline, SAM',
    steps: [
      { title: 'Kích hoạt chương trình Affiliate', desc: 'Hoa hồng 8-15% theo hạng KOC, mở gói cho Hero SKU.', done: () => ZZP_DATA.checklist.find(c=>c.id==='c7')?.done, action: null, link: 'affiliate' },
      { title: 'Thiết lập chiến lược SAM', desc: 'Gửi mẫu → Affiliate → Macro: tuyển → gửi mẫu → đo ROI → mở rộng.', done: () => true, action: null, link: 'affiliate' },
      { title: 'Theo dõi GMV theo nguồn Affiliate', desc: '38% tổng GMV từ Affiliate — xếp hạng KOC hàng đầu.', done: () => true, action: null, link: 'affiliate-analytics' },
      { title: 'Tối ưu hoa hồng theo ROI', desc: 'Tăng hoa hồng KOC ROI > 3x, giảm KOC ROI < 2x.', done: () => false, action: 'optimizeCommission', link: 'koc' }
    ]
  },
  koc: {
    prd: 'KOC Management · KOC CRM, KOC Lifecycle Tracking',
    steps: [
      { title: 'Tiềm năng → Gửi mẫu → Nội dung → Doanh thu', desc: 'Luồng 4 giai đoạn vòng đời KOC.', done: () => true, action: null, link: 'koc' },
      { title: 'Bảng điểm đánh giá KOC', desc: 'GMV, ROI, CVR, video → điểm 0-100.', done: () => true, action: 'viewKocDetail', link: 'creator-analytics' },
      { title: 'Quyết định mở rộng/cắt', desc: 'Điểm ≥80: mở rộng · 50-79: nuôi dưỡng · <50: xem xét/cắt.', done: () => true, action: null, link: 'creator-analytics' }
    ]
  },
  agency: {
    prd: 'Agency Management · Agency ROI Tracking',
    steps: [
      { title: 'Tiếp nhận Agency & MCN', desc: 'Cơ cấu phí, nhóm KOC, tần suất báo cáo.', done: () => true, action: null, link: 'agency' },
      { title: 'Theo dõi ROI Agency vs KOC trực tiếp', desc: 'MCN Beauty Stars ROI 3.8x so với trực tiếp 4.2x.', done: () => true, action: null, link: 'agency' }
    ]
  },
  samples: {
    prd: 'Sample Management · Sample Tracking, Sample ROI',
    steps: [
      { title: 'Gửi mẫu cho KOC tiềm năng', desc: 'Tự động phê duyệt nếu điểm > 80 (quy tắc R004).', done: () => ZZP_DATA.samples.length>=4, action: 'sendSample', link: 'samples' },
      { title: 'Theo dõi chuyển đổi mẫu → nội dung', desc: 'Chờ xử lý → Đã chuyển đổi / Không có nội dung trong 14 ngày.', done: () => true, action: null, link: 'samples' },
      { title: 'Tính ROI mẫu', desc: 'Doanh thu / Chi phí mẫu. Cắt nếu ROI < 2x sau 30 ngày.', done: () => true, action: null, link: 'costs' }
    ]
  },
  content: {
    prd: 'Content Operations · Content Calendar, Content Task Manager',
    steps: [
      { title: 'Lập lịch nội dung tháng', desc: 'Lên kế hoạch video Affiliate, hạn chót, giao KOC.', done: () => true, action: null, link: 'content' },
      { title: 'Tóm tắt yêu cầu & duyệt nội dung', desc: 'Nháp → Duyệt → Đã lên lịch → Đã đăng.', done: () => true, action: null, link: 'content' },
      { title: 'Đo hiệu suất sau đăng', desc: 'Lượt xem, đơn hàng, GMV, CTR → Thông tin nội dung.', done: () => true, action: null, link: 'content-analytics' }
    ]
  },
  livestream: {
    prd: 'Livestream Operations · Live Checklist, Live Performance',
    steps: [
      { title: 'Danh sách kiểm tra Live 8 bước', desc: 'Kịch bản, giảm giá chớp nhoáng, voucher, ghim sản phẩm, thử phát trực tiếp...', done: () => ZZP_DATA.liveSessions.some(l=>l.checklistDone>=6), action: null, link: 'livestream' },
      { title: 'Thiết lập chiến dịch & voucher chỉ dùng Live', desc: 'Giảm giá chớp nhoáng + voucher chỉ dùng trong live.', done: () => false, action: 'prepLive', link: 'campaigns' },
      { title: 'Đặt Live Ads', desc: 'Lên lịch AD003 cho Mega Live 6/6.', done: () => ZZP_DATA.ads.find(a=>a.id==='AD003')?.status==='scheduled', action: null, link: 'ads' },
      { title: 'Báo cáo sau live & theo dõi GMV', desc: 'So sánh dự kiến vs thực tế, cập nhật điểm KOC.', done: () => true, action: null, link: 'live-analytics' }
    ]
  },
  campaigns: {
    prd: 'Campaign Management · Campaign Center, Promotion Center',
    steps: [
      { title: 'Tạo chiến dịch khuyến mãi', desc: 'Giảm giá chớp nhoáng, combo, ưu đãi khách mới.', done: () => ZZP_DATA.campaigns.length>=3, action: null, link: 'campaigns' },
      { title: 'Gắn sản phẩm & thời gian', desc: 'Chọn Hero SKU, đặt giảm giá, giới hạn ngân sách.', done: () => true, action: null, link: 'campaigns' },
      { title: 'Theo dõi chi tiêu vs GMV', desc: 'ROI chiến dịch, điều chỉnh giữa chiến dịch.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  vouchers: {
    prd: 'Voucher Management · Voucher Guardrail, Voucher Performance',
    steps: [
      { title: 'Tạo voucher với giới hạn an toàn', desc: 'Giảm tối đa, giới hạn lượt dùng, trần ngân sách.', done: () => true, action: null, link: 'vouchers' },
      { title: 'Giám sát lượt dùng vs giới hạn', desc: 'NEW50K 63% — cảnh báo giới hạn an toàn.', done: () => ZZP_DATA.vouchers.every(v=>v.guardrail!=='critical'), action: 'adjustVoucher', link: 'vouchers' },
      { title: 'Đo GMV/CVR theo voucher', desc: 'BEAUTY20 ROAS tốt · NEW50K CVR thấp.', done: () => true, action: null, link: 'costs' }
    ]
  },
  ads: {
    prd: 'Ads Integration · Spark Ads Wizard, Campaign Guided Setup',
    steps: [
      { title: 'Spark Ads từ video KOC', desc: 'Đẩy mạnh video lan truyền (V001) — ROAS 3.8x.', done: () => ZZP_DATA.ads.find(a=>a.id==='AD001')?.roas>=2, action: null, link: 'ads' },
      { title: 'Giám sát quảng cáo sản phẩm', desc: 'Tạm dừng nếu ROAS < 1.5x (quy tắc R002).', done: () => ZZP_DATA.ads.find(a=>a.id==='AD002')?.status==='paused', action: 'runFlowAds', link: 'ads' },
      { title: 'Kết nối dữ liệu Ads → Doanh thu', desc: 'Phân bổ: GMV ads 72M = 15% tổng.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  executive: {
    prd: 'Business Intelligence · Executive Dashboard',
    steps: [
      { title: 'Xem tổng quan GMV, P&L, Đơn hàng', desc: 'Một màn hình tổng hợp cho chủ shop.', done: () => true, action: null, link: 'executive' },
      { title: 'Khoan sâu theo mô-đun', desc: 'Nhấn chỉ số → chi tiết Doanh thu / Sản phẩm / Affiliate.', done: () => true, action: null, link: 'revenue' }
    ]
  },
  revenue: {
    prd: 'Revenue Intelligence · Revenue Breakdown, Attribution Analysis',
    steps: [
      { title: 'Phân tích nguồn GMV', desc: 'Affiliate 38% · Live 27% · Ads 15% · Tự nhiên 20%.', done: () => true, action: null, link: 'revenue' },
      { title: 'Phân bổ theo SKU × kênh', desc: 'Biết SKU nào bán qua kênh nào hiệu quả nhất.', done: () => true, action: null, link: 'product-analytics' }
    ]
  },
  profit: {
    prd: 'Profit Intelligence · P&L Dashboard, Margin Analytics',
    steps: [
      { title: 'Tính lợi nhuận thực', desc: 'GMV - giá vốn - vận chuyển - hoa hồng - ads - voucher - nền tảng.', done: () => true, action: null, link: 'profit' },
      { title: 'Biên lợi nhuận theo SKU', desc: 'Serum VC biên 66% · Mặt nạ thấp hơn do chi phí ads.', done: () => true, action: null, link: 'product-analytics' }
    ]
  },
  costs: {
    prd: 'Cost Intelligence · Sample, Commission, Voucher, Ads Cost',
    steps: [
      { title: 'Phân tích cấu trúc chi phí', desc: 'Giá vốn 30% · Hoa hồng 8.7% · Ads 4.3% · Voucher 5.1%.', done: () => true, action: null, link: 'costs' },
      { title: 'Xác định bất thường chi phí', desc: 'Chi phí ads ↑12% — điều tra AD002.', done: () => true, action: 'runFlowAds', link: 'ads' }
    ]
  },
  'product-analytics': { prd: 'Product Intelligence · Product Performance, SKU Ranking', steps: [{ title: 'Xếp hạng SKU theo GMV', desc: 'Hàng đầu: Mặt nạ, Serum, Kem CN.', done: () => true, action: null, link: 'product-analytics' }, { title: 'Hành động Mở rộng/Tối ưu/Duy trì', desc: 'AI gắn nhãn từng SKU.', done: () => true, action: null, link: 'optimization' }] },
  'affiliate-analytics': { prd: 'Affiliate Intelligence · Affiliate Contribution', steps: [{ title: 'Đóng góp theo KOC', desc: 'Biểu đồ tròn GMV theo từng KOC.', done: () => true, action: null, link: 'affiliate-analytics' }] },
  'creator-analytics': { prd: 'Creator Intelligence · KOC Scorecard, Creator Ranking', steps: [{ title: 'Xếp hạng & đề xuất hạng', desc: 'K003 điểm 96 → Macro+.', done: () => true, action: 'viewKocDetail', link: 'koc' }] },
  'content-analytics': { prd: 'Content Intelligence · Video Performance, Pattern Analysis', steps: [{ title: 'Xác định mẫu thành công', desc: 'Quy trình 3 bước CVR 4.2%.', done: () => true, action: null, link: 'optimization' }] },
  'live-analytics': { prd: 'Livestream Intelligence · Session Performance', steps: [{ title: 'GMV/giờ theo phiên', desc: 'K003 live: 78M/giờ.', done: () => true, action: null, link: 'livestream' }] },
  'customer-analytics': { prd: 'Customer Intelligence · Segmentation, LTV', steps: [{ title: 'Phân khúc VIP/Quay lại/Mới/Có nguy cơ', desc: '456 có nguy cơ → chiến dịch giành lại khách.', done: () => true, action: null, link: 'optimization' }] },
  team: { prd: 'Team Collaboration · RBAC, Workflow Center', steps: [{ title: 'Phân quyền theo vai trò', desc: 'Chủ shop/Quản lý/Vận hành/Phân tích.', done: () => true, action: null, link: 'team' }, { title: 'Luồng phê duyệt', desc: 'Tạm dừng ads >10M → chủ shop phê duyệt.', done: () => true, action: null, link: 'actions' }] },
  'growth-assistant': { prd: 'Growth Assistant · AI Insight Engine, Action Recommendation', steps: [{ title: 'AI phân tích & ưu tiên', desc: '4 thông tin chi tiết xếp hạng theo tác động.', done: () => true, action: null, link: 'growth-assistant' }, { title: 'Một nhấp → Hàng đợi hành động', desc: 'Thông tin chi tiết thành nhiệm vụ cụ thể.', done: () => true, action: 'createAction', link: 'actions' }] },
  alerts: { prd: 'Smart Alerts · Profit, Cost, Inventory, Operation Alert', steps: [{ title: 'Tự phát hiện bất thường', desc: '6 loại cảnh báo đang hoạt động.', done: () => true, action: null, link: 'alerts' }, { title: 'Luồng Cảnh báo → Hành động', desc: 'Nhấn hành động → điều hướng mô-đun + đánh dấu đã đọc.', done: () => true, action: 'handleAlert', link: 'alerts' }] },
  opportunities: { prd: 'Opportunity Engine · Growth Opportunity Detection', steps: [{ title: 'Quét sản phẩm/KOC/nội dung/chiến dịch', desc: '4 cơ hội được phát hiện.', done: () => true, action: null, link: 'opportunities' }] },
  forecast: { prd: 'Forecasting · Sales & Inventory Forecasting', steps: [{ title: 'Dự báo GMV 7 ngày', desc: 'Đỉnh T7 live 95M.', done: () => true, action: null, link: 'forecast' }, { title: 'Dự báo hết hàng P003', desc: 'Còn 2 ngày.', done: () => true, action: 'runFlowStock', link: 'inventory' }] },
  benchmark: { prd: 'Market Intelligence · Industry Benchmark', steps: [{ title: 'So sánh vs thị trường', desc: 'Biên lợi nhuận +3.9% trên thị trường.', done: () => true, action: null, link: 'benchmark' }] },
  actions: { prd: 'Decision Center · Action Center, Approval Queue', steps: [{ title: 'Thông tin chi tiết → Hành động → Phê duyệt → Thực thi', desc: '4 hành động trong hàng đợi.', done: () => true, action: 'approveAction', link: 'actions' }] },
  automation: { prd: 'Automation · Rule Engine, Growth Automation Engine', steps: [{ title: 'Cấu hình quy tắc', desc: 'Cảnh báo tồn kho, tạm dừng ROAS, báo cáo hàng ngày.', done: () => true, action: null, link: 'automation' }, { title: 'Chạy luồng tự động', desc: 'Kích hoạt → chuỗi hành động.', done: () => true, action: 'openFlowCenter', link: 'workflows' }] },
  optimization: { prd: 'Growth Optimizers · Product/Affiliate/Content/Campaign Optimization', steps: [{ title: 'Chạy tất cả bộ tối ưu', desc: '6 bộ: sản phẩm, KOC, nội dung, chiến dịch, giá, giữ chân.', done: () => true, action: 'runFlowOptimize', link: 'optimization' }] },
  workflows: { prd: 'Workflow Engine · Approval Flow, Task Assignment, Automation', steps: [{ title: 'Xem & chạy luồng tự động', desc: '8 luồng có sẵn liên kết các mô-đun.', done: () => true, action: null, link: 'workflows' }] },
  notifications: { prd: 'Notification Center · In-App, Email, Zalo, Webhook', steps: [{ title: 'Cấu hình kênh thông báo', desc: 'Cảnh báo đa kênh.', done: () => true, action: null, link: 'notifications' }] },
  audit: { prd: 'Audit & Governance · Activity Log, Change Tracking', steps: [{ title: 'Theo dõi mọi thao tác', desc: 'Người dùng, hành động, mô-đun, thời gian.', done: () => true, action: null, link: 'audit' }] },
  settings: { prd: 'User & Access · Authentication, RBAC, Data Governance', steps: [{ title: 'Cài đặt shop & tích hợp', desc: 'OAuth, ERP, chất lượng dữ liệu.', done: () => true, action: null, link: 'settings' }] },
  dashboard: { prd: 'Tổng quan vận hành TikTok Shop', steps: [{ title: 'Theo dõi chỉ số chính', desc: 'GMV, lợi nhuận, đơn hàng, cảnh báo.', done: () => true, action: null, link: 'dashboard' }, { title: 'Điều hướng mô-đun', desc: 'Thanh bên → mô-đun cụ thể.', done: () => true, action: null, link: 'onboarding' }] }
};

function getGuideProgress(pageId) {
  const g = MODULE_GUIDES[pageId];
  if (!g) return { done: 0, total: 0, pct: 0 };
  const done = g.steps.filter(s => s.done()).length;
  return { done, total: g.steps.length, pct: Math.round(done / g.steps.length * 100) };
}

function renderGuideSidebar(pageId) {
  const g = MODULE_GUIDES[pageId];
  if (!g) return '';
  const prog = getGuideProgress(pageId);
  return `
    <div class="space-y-3">
      <div class="p-3 rounded-xl bg-zzp-50 border border-zzp-100">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs text-slate-600">Tiến độ</p>
          <p class="text-lg font-bold text-zzp-700">${prog.pct}%</p>
        </div>
        <div class="h-1.5 bg-white rounded-full mt-2"><div class="h-1.5 bg-zzp-500 rounded-full" style="width:${prog.pct}%"></div></div>
        <p class="text-[10px] text-slate-500 mt-1">${prog.done}/${prog.total} bước xong</p>
      </div>
      <div class="space-y-2">
        ${g.steps.map((s, i) => {
          const done = s.done();
          return `<div class="rounded-lg border p-2.5 ${done ? 'border-green-200 bg-green-50/60' : 'border-slate-200 bg-slate-50/50'}">
            <div class="flex gap-2 items-start">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${done ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 text-slate-600'}">${done ? '✓' : i + 1}</span>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-medium leading-snug ${done ? 'text-green-800' : 'text-slate-800'}">${s.title}</p>
                <p class="text-[10px] text-slate-500 mt-0.5 line-clamp-2">${s.desc}</p>
                ${!done && s.link ? `<button type="button" onclick="navigate('${s.link}')" class="text-[10px] text-zzp-600 hover:underline mt-1">Làm ngay →</button>` : ''}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderGuidePanel(pageId) {
  return renderGuideSidebar(pageId);
}
