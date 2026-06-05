/* ZZP Mock Data — TikTok Shop Seller Demo */
const ZZP_DATA = {
  shop: {
    name: 'BeautyViet Official',
    id: 'SHOP-VN-88421',
    category: 'Mỹ phẩm & Chăm sóc da',
    connected: true,
    oauthStatus: 'connected',
    lastSync: '2026-06-05 14:32',
    healthScore: 78,
    gmv30d: 485000000,
    orders30d: 2847,
    profitMargin: 22.4
  },

  checklist: [
    { id: 'c1', phase: 1, title: 'Kết nối TikTok Shop OAuth', desc: 'Liên kết Seller Center với ZZP', done: true, module: 'onboarding' },
    { id: 'c2', phase: 1, title: 'Xác minh danh tính & giấy phép KD', desc: 'Upload GPKD, CMND/CCCD', done: true, module: 'onboarding' },
    { id: 'c3', phase: 1, title: 'Thiết lập phương thức thanh toán', desc: 'Liên kết tài khoản ngân hàng', done: true, module: 'onboarding' },
    { id: 'c4', phase: 1, title: 'Cấu hình vận chuyển & kho', desc: 'GHN, GHTK, J&T Express', done: true, module: 'onboarding' },
    { id: 'c5', phase: 1, title: 'Đăng 5+ sản phẩm SKU chủ lực', desc: 'Tin đăng đạt chất lượng ≥85%', done: false, module: 'products' },
    { id: 'c6', phase: 1, title: 'Trang trí cửa hàng & bộ nhận diện', desc: 'Banner, logo, màu thương hiệu', done: false, module: 'store' },
    { id: 'c7', phase: 1, title: 'Kích hoạt chương trình tiếp thị liên kết', desc: 'Hoa hồng 10-15% cho KOC', done: true, module: 'affiliate' },
    { id: 'c8', phase: 1, title: 'Hoàn thành kiểm tra tuân thủ', desc: 'P006 thiếu ảnh INCI (POL001) — listing đang review · AQ003 xử lý', done: false, module: 'compliance' },
    { id: 'c9', phase: 1, title: 'Đọc sổ tay hướng dẫn người bán', desc: '5 mô-đun đào tạo cơ bản', done: false, module: 'education' },
    { id: 'c10', phase: 1, title: 'Đồng bộ SKU đa kênh', desc: 'Ánh xạ Shopee, Lazada', done: false, module: 'channels' }
  ],

  products: [
    { id: 'P001', sku: 'BV-SERUM-30', name: 'Serum Vitamin C 30ml', price: 289000, cost: 98000, stock: 1240, sold30d: 892, listingScore: 92, status: 'active', category: 'Serum', hero: true, channels: ['tiktok', 'shopee'] },
    { id: 'P002', sku: 'BV-CREAM-50', name: 'Kem dưỡng ẩm HA 50g', price: 199000, cost: 72000, stock: 856, sold30d: 654, listingScore: 88, status: 'active', category: 'Kem dưỡng', hero: true, channels: ['tiktok'] },
    { id: 'P003', sku: 'BV-MASK-5', name: 'Mặt nạ Collagen (hộp 5)', price: 89000, cost: 28000, stock: 45, sold30d: 1203, listingScore: 76, status: 'low_stock', category: 'Mặt nạ', hero: true, channels: ['tiktok', 'lazada'] },
    { id: 'P004', sku: 'BV-TONER-200', name: 'Toner cân bằng pH 200ml', price: 159000, cost: 55000, stock: 2100, sold30d: 421, listingScore: 85, status: 'active', category: 'Toner', hero: false, channels: ['tiktok'] },
    { id: 'P005', sku: 'BV-SUN-50', name: 'Kem chống nắng SPF50+', price: 249000, cost: 88000, stock: 680, sold30d: 567, listingScore: 94, status: 'active', category: 'Chống nắng', hero: true, channels: ['tiktok', 'shopee'] },
    { id: 'P006', sku: 'BV-LIP-3G', name: 'Son dưỡng môi Organic 3g', price: 79000, cost: 22000, stock: 3200, sold30d: 234, listingScore: 71, status: 'review', category: 'Son môi', hero: false, channels: ['tiktok'] },
    { id: 'P007', sku: 'BV-KIT-TRIAL', name: 'Bộ dùng thử Mini Kit', price: 99000, cost: 35000, stock: 890, sold30d: 445, listingScore: 82, status: 'active', category: 'Combo', hero: false, channels: ['tiktok'] }
  ],

  orders: [
    { id: 'ORD-88421', customer: 'Trần Thu Hà', product: 'P003', productName: 'Mặt nạ Collagen', qty: 3, total: 267000, status: 'pending', sla: '2h', source: 'affiliate', koc: 'K001', created: '2026-06-05 14:20' },
    { id: 'ORD-88420', customer: 'Lê Văn Đức', product: 'P001', productName: 'Serum Vitamin C', qty: 1, total: 289000, status: 'processing', sla: '4h', source: 'livestream', koc: 'K003', created: '2026-06-05 13:45' },
    { id: 'ORD-88419', customer: 'Phạm Ngọc Linh', product: 'P005', productName: 'Kem chống nắng SPF50+', qty: 2, total: 498000, status: 'shipped', sla: 'ok', source: 'ads', koc: null, created: '2026-06-05 12:10' },
    { id: 'ORD-88418', customer: 'Hoàng Minh Tú', product: 'P002', productName: 'Kem dưỡng ẩm HA', qty: 1, total: 199000, status: 'delivered', sla: 'ok', source: 'organic', koc: null, created: '2026-06-04 18:30' },
    { id: 'ORD-88417', customer: 'Võ Thị Mai', product: 'P001', productName: 'Serum Vitamin C', qty: 2, total: 578000, status: 'return_requested', sla: 'ok', source: 'affiliate', koc: 'K002', created: '2026-06-04 15:00' },
    { id: 'ORD-88416', customer: 'Đặng Quốc Bảo', product: 'P007', productName: 'Bộ dùng thử Mini Kit', qty: 1, total: 99000, status: 'cancelled', sla: 'ok', source: 'video', koc: 'K004', created: '2026-06-04 10:20' },
    { id: 'ORD-88415', customer: 'Nguyễn Thảo Vy', product: 'P003', productName: 'Mặt nạ Collagen', qty: 5, total: 445000, status: 'delivered', sla: 'ok', source: 'livestream', koc: 'K003', created: '2026-06-03 20:15' },
    { id: 'ORD-88414', customer: 'Bùi Hữu Phúc', product: 'P004', productName: 'Toner cân bằng pH', qty: 1, total: 159000, status: 'processing', sla: '6h', source: 'organic', koc: null, created: '2026-06-05 11:00' }
  ],

  returns: [
    { id: 'RET-001', orderId: 'ORD-88417', reason: 'Sản phẩm không đúng mô tả', amount: 578000, status: 'pending_review', type: 'return' },
    { id: 'RET-002', orderId: 'ORD-88416', reason: 'Khách hủy trước khi giao', amount: 99000, status: 'approved', type: 'cancel' },
    { id: 'RET-003', orderId: 'ORD-88410', reason: 'Hàng bị hư hỏng khi vận chuyển', amount: 199000, status: 'refunded', type: 'return' }
  ],

  kocs: [
    { id: 'K001', name: '@linhskincare', followers: 285000, tier: 'Macro', status: 'active', gmv30d: 98000000, roi: 4.2, cvr: 3.8, samplesSent: 12, videos: 28, commission: 12, lifecycle: 'revenue', score: 92 },
    { id: 'K002', name: '@beautybymai', followers: 89000, tier: 'Mid', status: 'active', gmv30d: 42000000, roi: 3.1, cvr: 2.9, samplesSent: 8, videos: 15, commission: 10, lifecycle: 'content', score: 78 },
    { id: 'K003', name: '@livewithhuong', followers: 520000, tier: 'Macro', status: 'active', gmv30d: 156000000, roi: 5.8, cvr: 5.2, samplesSent: 20, videos: 8, commission: 15, lifecycle: 'revenue', score: 96 },
    { id: 'K004', name: '@minibeautyvn', followers: 45000, tier: 'Micro', status: 'testing', gmv30d: 8500000, roi: 1.8, cvr: 1.5, samplesSent: 5, videos: 6, commission: 8, lifecycle: 'sample', score: 45 },
    { id: 'K005', name: '@skintips_daily', followers: 120000, tier: 'Mid', status: 'active', gmv30d: 35000000, roi: 3.5, cvr: 3.1, samplesSent: 10, videos: 22, commission: 10, lifecycle: 'revenue', score: 81 },
    { id: 'K006', name: '@newcreator_test', followers: 12000, tier: 'Nano', status: 'prospect', gmv30d: 0, roi: 0, cvr: 0, samplesSent: 2, videos: 1, commission: 8, lifecycle: 'prospect', score: 22 }
  ],

  agencies: [
    { id: 'AG001', name: 'MCN Beauty Stars', kocs: 45, fee: 15000000, gmv30d: 210000000, roi: 3.8, status: 'active' },
    { id: 'AG002', name: 'Viral Commerce Agency', kocs: 28, fee: 8000000, gmv30d: 95000000, roi: 2.9, status: 'active' },
    { id: 'AG003', name: 'KOC Connect VN', kocs: 15, fee: 5000000, gmv30d: 42000000, roi: 2.1, status: 'review' }
  ],

  samples: [
    { id: 'S001', koc: 'K001', product: 'P001', sentDate: '2026-05-20', status: 'converted', cost: 98000, revenue: 4200000, roi: 42.8 },
    { id: 'S002', koc: 'K004', product: 'P003', sentDate: '2026-05-28', status: 'pending', cost: 28000, revenue: 850000, roi: 3.0 },
    { id: 'S003', koc: 'K006', product: 'P007', sentDate: '2026-06-01', status: 'no_content', cost: 35000, revenue: 0, roi: 0 },
    { id: 'S004', koc: 'K002', product: 'P005', sentDate: '2026-05-15', status: 'converted', cost: 88000, revenue: 8900000, roi: 101.1 }
  ],

  content: [
    { id: 'V001', title: 'Routine 3 bước với Serum VC', koc: 'K001', type: 'video', views: 520000, orders: 342, gmv: 98000000, ctr: 4.2, published: '2026-05-28', status: 'published' },
    { id: 'V002', title: 'Live sale cuối tuần -50%', koc: 'K003', type: 'livestream', views: 89000, orders: 567, gmv: 156000000, ctr: 6.8, published: '2026-06-01', status: 'published' },
    { id: 'V003', title: 'Review mặt nạ collagen thật lòng', koc: 'K002', type: 'video', views: 125000, orders: 89, gmv: 7900000, ctr: 2.1, published: '2026-06-03', status: 'published' },
    { id: 'V004', title: 'Unboxing Mini Kit', koc: 'K005', type: 'video', views: 45000, orders: 34, gmv: 3360000, ctr: 1.8, published: '2026-06-04', status: 'scheduled' },
    { id: 'V005', title: 'So sánh 3 loại kem chống nắng', koc: 'K001', type: 'video', views: 0, orders: 0, gmv: 0, ctr: 0, published: '2026-06-08', status: 'draft' }
  ],

  liveSessions: [
    { id: 'L001', title: 'Mega Live 6/6 - Flash Sale', host: 'K003', date: '2026-06-06 20:00', duration: 120, checklistDone: 6, checklistTotal: 8, expectedGmv: 80000000, pastGmv: 156000000 },
    { id: 'L002', title: 'Live Q&A Skincare', host: 'K001', date: '2026-06-08 19:30', duration: 90, checklistDone: 3, checklistTotal: 8, expectedGmv: 35000000, pastGmv: 42000000 }
  ],

  campaigns: [
    { id: 'CP001', name: 'Flash Sale Cuối Tuần', type: 'promotion', discount: 20, products: ['P001', 'P003'], start: '2026-06-06', end: '2026-06-08', budget: 5000000, spent: 3200000, gmv: 45000000, status: 'active' },
    { id: 'CP002', name: 'Affiliate Boost Tháng 6', type: 'affiliate', discount: 0, products: ['P001', 'P002', 'P005'], start: '2026-06-01', end: '2026-06-30', budget: 20000000, spent: 8500000, gmv: 98000000, status: 'active' },
    { id: 'CP003', name: 'New Customer Voucher', type: 'voucher', discount: 15, products: ['P007'], start: '2026-06-01', end: '2026-06-15', budget: 3000000, spent: 2100000, gmv: 12000000, status: 'active' }
  ],

  vouchers: [
    { id: 'VC001', code: 'BEAUTY20', discount: 20, maxDiscount: 50000, used: 342, limit: 500, cost: 6800000, gmv: 28000000, guardrail: 'ok' },
    { id: 'VC002', code: 'NEW50K', discount: 50000, maxDiscount: 50000, used: 189, limit: 300, cost: 9450000, gmv: 15000000, guardrail: 'warning' },
    { id: 'VC003', code: 'FREESHIP', discount: 0, maxDiscount: 30000, used: 567, limit: 1000, cost: 8500000, gmv: 42000000, guardrail: 'ok' }
  ],

  ads: [
    { id: 'AD001', name: 'Spark Ads - Serum VC Video', type: 'spark', budget: 15000000, spent: 12800000, roas: 3.8, impressions: 890000, clicks: 12400, orders: 234, status: 'active' },
    { id: 'AD002', name: 'Product Ads - Mặt nạ Collagen', type: 'product', budget: 8000000, spent: 7900000, roas: 1.2, impressions: 450000, clicks: 8900, orders: 89, status: 'paused' },
    { id: 'AD003', name: 'Live Ads - Mega Live 6/6', type: 'live', budget: 10000000, spent: 0, roas: 0, impressions: 0, clicks: 0, orders: 0, status: 'scheduled' }
  ],

  policies: [
    { id: 'POL001', title: 'Cập nhật tiêu chuẩn hình ảnh sản phẩm mỹ phẩm', date: '2026-06-01', impact: 'high', affected: ['P006'], status: 'action_required', aiSummary: 'Yêu cầu ảnh có nhãn thành phần INCI rõ ràng. Sản phẩm P006 cần cập nhật trong 7 ngày.' },
    { id: 'POL002', title: 'Thay đổi commission cap Affiliate Q3', date: '2026-05-28', impact: 'medium', affected: [], status: 'monitoring', aiSummary: 'Commission tối đa giảm từ 20% xuống 15% cho ngành mỹ phẩm. Đánh giá lại chiến lược KOC Macro.' },
    { id: 'POL003', title: 'Quy định mới về claim "Organic"', date: '2026-05-15', impact: 'high', affected: ['P006'], status: 'compliant', aiSummary: 'Chứng nhận Organic hợp lệ. Ảnh INCI theo POL001 đang xử lý riêng (AQ003 · listing review).' }
  ],

  education: [
    { id: 'E001', title: 'Bắt đầu với TikTok Shop', duration: '15 phút', progress: 100, type: 'video' },
    { id: 'E002', title: 'Tối ưu Listing sản phẩm', duration: '20 phút', progress: 100, type: 'video' },
    { id: 'E003', title: 'Chiến lược Affiliate cho ngành Beauty', duration: '25 phút', progress: 60, type: 'playbook' },
    { id: 'E004', title: 'Livestream bán hàng hiệu quả', duration: '30 phút', progress: 0, type: 'playbook' },
    { id: 'E005', title: 'Quản lý lãi lỗ trên TikTok Shop', duration: '20 phút', progress: 0, type: 'sop' }
  ],

  channels: [
    { id: 'CH001', name: 'TikTok Shop', status: 'synced', skus: 7, lastSync: '2026-06-05 14:32' },
    { id: 'CH002', name: 'Shopee', status: 'synced', skus: 3, lastSync: '2026-06-05 12:00' },
    { id: 'CH003', name: 'Lazada', status: 'partial', skus: 1, lastSync: '2026-06-04 18:00' },
    { id: 'CH004', name: 'ERP (KiotViet)', status: 'synced', skus: 7, lastSync: '2026-06-05 14:30' }
  ],

  skuMapping: [
    { tiktok: 'P001', shopee: 'SP-BV-SERUM', lazada: '-', erp: 'ERP-001' },
    { tiktok: 'P002', shopee: '-', lazada: '-', erp: 'ERP-002' },
    { tiktok: 'P003', shopee: 'SP-BV-MASK', lazada: 'LZ-BV-MASK', erp: 'ERP-003' },
    { tiktok: 'P005', shopee: 'SP-BV-SUN', lazada: '-', erp: 'ERP-005' }
  ],

  revenueBreakdown: {
    organic: 98000000,
    affiliate: 186000000,
    ads: 72000000,
    livestream: 129000000,
    total: 485000000
  },

  costs: {
    cogs: 145000000,
    shipping: 28000000,
    commission: 42000000,
    ads: 20700000,
    voucher: 24750000,
    sample: 4200000,
    agency: 28000000,
    platform: 14550000,
    total: 297200000
  },

  customers: [
    { segment: 'VIP (>3 đơn)', count: 342, ltv: 1250000, repeatRate: 68 },
    { segment: 'Quay lại (2 đơn)', count: 890, ltv: 580000, repeatRate: 42 },
    { segment: 'Mới (1 đơn)', count: 1615, ltv: 185000, repeatRate: 12 },
    { segment: 'Nguy cơ rời bỏ (90 ngày không mua)', count: 456, ltv: 320000, repeatRate: 5 }
  ],

  team: [
    { id: 'U001', name: 'Nguyễn Minh Anh', role: 'Chủ shop', dept: 'Quản lý', status: 'active' },
    { id: 'U002', name: 'Trần Văn Hùng', role: 'Quản lý vận hành', dept: 'Vận hành', status: 'active' },
    { id: 'U003', name: 'Lê Thị Hoa', role: 'Quản lý tiếp thị liên kết', dept: 'Marketing', status: 'active' },
    { id: 'U004', name: 'Phạm Đức An', role: 'Trưởng nhóm nội dung', dept: 'Nội dung', status: 'active' },
    { id: 'U005', name: 'Võ Minh Tâm', role: 'Chuyên viên phân tích', dept: 'Dữ liệu', status: 'active' }
  ],

  alerts: [
    { id: 'A001', type: 'inventory', severity: 'critical', title: 'Sắp hết hàng: Mặt nạ Collagen', desc: 'Còn 45 sp (~2 ngày, ~40 sp/ngày) · PO-DRAFT-P003 chưa gửi NCC · AD002 đã tạm dừng nhưng push KOC vẫn cần giảm', action: 'Gửi đơn NCC & giảm push KOC', module: 'inventory', read: false },
    { id: 'A002', type: 'profit', severity: 'warning', title: 'ROAS thấp: Product Ads Mặt nạ', desc: 'AD002 ROAS 1.2x · đã pause lúc 14:20 · AQ001 chờ duyệt chuyển 8M sang Affiliate', action: 'Duyệt chuyển ngân sách', module: 'ads', read: false },
    { id: 'A003', type: 'cost', severity: 'warning', title: 'Voucher NEW50K gần vượt ngưỡng kiểm soát', desc: 'Đã sử dụng 63% ngân sách — CVR thấp hơn chuẩn ngành 40%', action: 'Giảm mức voucher', module: 'vouchers', read: false },
    { id: 'A004', type: 'operation', severity: 'info', title: '3 đơn hàng sắp quá SLA', desc: 'ORD-88421, ORD-88414 cần xử lý trong 2–6 giờ', action: 'Xử lý đơn hàng', module: 'orders', read: false },
    { id: 'A005', type: 'compliance', severity: 'critical', title: 'Tuân thủ: Son dưỡng môi thiếu ảnh INCI', desc: 'POL001 · listing đang review · AQ003 Phạm Đức An đang upload ảnh nhãn', action: 'Theo dõi cập nhật listing', module: 'compliance', read: false },
    { id: 'A006', type: 'profit', severity: 'info', title: 'Margin tăng: Serum Vitamin C', desc: 'Biên lợi nhuận tăng 3.2% nhờ giảm chi phí mẫu', action: 'Scale sản phẩm', module: 'products', read: true }
  ],

  aiInsights: [
    { id: 'AI001', priority: 1, title: 'Scale Serum Vitamin C qua Spark Ads', desc: 'ROAS 3.8x, margin 66%. Video K001 đang viral — tăng budget 30% trong 7 ngày.', impact: '+45M GMV', confidence: 89, actions: ['Tăng budget AD001', 'Gửi thêm mẫu cho K001', 'Tạo voucher bundle P001+P005'] },
    { id: 'AI002', priority: 2, title: 'Tối ưu chi phí Ads Mặt nạ Collagen', desc: 'ROAS 1.2x gây thua lỗ. Chuyển ngân sách sang Affiliate thay vì Product Ads.', impact: '+12M lợi nhuận', confidence: 92, actions: ['Pause AD002', 'Tăng commission K002 cho P003', 'Livestream flash sale P003'] },
    { id: 'AI003', priority: 3, title: 'Gửi PO khẩn Mặt nạ Collagen cho NCC', desc: 'Còn 45 sp · ~40 sp/ngày · chưa có PO xác nhận · lead time NCC ~7 ngày. Tạm dừng Ads & giảm push KOC trước khi hết hàng.', impact: 'Tránh mất ~15M GMV/tuần', confidence: 95, actions: ['Gửi PO-DRAFT-P003 cho NCC', 'Duyệt tạm dừng AD002', 'Thông báo KOC giảm push P003'] },
    { id: 'AI004', priority: 4, title: 'Phát hiện KOC tiềm năng: @skintips_daily', desc: 'ROI 3.5x, đang tăng trưởng. Mở rộng hợp tác từ Mid lên Macro tier.', impact: '+25M GMV', confidence: 78, actions: ['Tăng commission 10→12%', 'Gửi Hero SKU bundle', 'Book live session'] }
  ],

  opportunities: [
    { id: 'O001', type: 'product', title: 'Hero SKU Serum VC — Scale window', desc: 'Trending +45% views tuần này', potential: '+45M', status: 'new' },
    { id: 'O002', type: 'koc', title: 'KOC Discovery: @skintips_daily', desc: 'Match score 87% với brand', potential: '+25M', status: 'new' },
    { id: 'O003', type: 'content', title: 'Nhân rộng format "Routine 3 bước"', desc: 'CVR cao nhất trong 30 ngày', potential: '+18M', status: 'in_progress' },
    { id: 'O004', type: 'campaign', title: 'Bundle P001+P005 cho Live 6/6', desc: 'Cross-sell rate dự kiến 28%', potential: '+32M', status: 'new' }
  ],

  purchaseOrders: [
    { id: 'PO-DRAFT-P003', productId: 'P003', qty: 2000, status: 'draft', supplier: 'Nhà cung cấp Mỹ phẩm Đại Việt', orderedAt: null, eta: null, note: 'Nháp — chờ Trần Văn Hùng gửi NCC (AQ002)' }
  ],

  forecasts: {
    gmv7d: [62000000, 68000000, 71000000, 75000000, 82000000, 95000000, 88000000],
    gmvLabels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    inventory: [
      { product: 'P003', daysLeft: 2, recommendation: 'Gửi PO 2000 sp · lead time NCC ~7 ngày · tạm dừng Ads' },
      { product: 'P001', daysLeft: 14, recommendation: 'Ổn định' },
      { product: 'P002', daysLeft: 18, recommendation: 'Ổn định' }
    ]
  },

  benchmarks: {
    gmvGrowth: { shop: 28, market: 22 },
    profitMargin: { shop: 22.4, market: 18.5 },
    returnRate: { shop: 3.2, market: 4.8 },
    affiliateShare: { shop: 38.4, market: 32.1 },
    liveConversion: { shop: 5.2, market: 3.8 }
  },

  automationRules: [
    { id: 'R001', name: 'Tồn kho Shop < 100 sp', trigger: 'inventory.available < 100', action: 'Webhook → cảnh báo + tạo việc gửi PO NCC', active: true, runs: 12, platform: 'shop', flowId: 'FLOW_STOCK' },
    { id: 'R002', name: 'Pause Ads khi ROAS < 1.5x', trigger: 'campaign.roas < 1.5', action: 'Tạm dừng campaign TikTok Ads + notify', active: true, runs: 3, platform: 'ads', flowId: 'FLOW_ADS' },
    { id: 'R003', name: 'Báo cáo GMV hàng ngày 8h', trigger: 'cron 08:00', action: 'Email + Zalo · dữ liệu TikTok Shop', active: true, runs: 156, platform: 'shop', flowId: null },
    { id: 'R004', name: 'Auto duyệt sample · KOC score ≥ 80', trigger: 'creator.score >= 80', action: 'Gửi mẫu qua Affiliate Center', active: false, runs: 0, platform: 'affiliate', flowId: 'FLOW_SAMPLE' },
    { id: 'R005', name: 'SLA giao hàng < 4 giờ', trigger: 'order.sla_hours < 4', action: 'Assign Ops + cập nhật fulfillment Shop', active: true, runs: 28, platform: 'shop', flowId: 'FLOW_ORDER_SLA' }
  ],

  actionQueue: [
    { id: 'AQ001', title: 'Duyệt tạm dừng Product Ads Mặt nạ', source: 'AI002', status: 'pending', assignee: 'Lê Thị Hoa', priority: 'high' },
    { id: 'AQ002', title: 'Gửi PO 2000 sp Mặt nạ Collagen cho NCC', source: 'AI003', status: 'pending', assignee: 'Trần Văn Hùng', priority: 'critical' },
    { id: 'AQ003', title: 'Upload ảnh INCI cho P006 (POL001)', source: 'A005', status: 'in_progress', assignee: 'Phạm Đức An', priority: 'high' },
    { id: 'AQ004', title: 'Tăng budget Spark Ads +30%', source: 'AI001', status: 'approved', assignee: 'Lê Thị Hoa', priority: 'medium' }
  ],

  auditLog: [
    { time: '2026-06-05 14:20', user: 'Lê Thị Hoa', action: 'Pause campaign AD002', module: 'Ads' },
    { time: '2026-06-05 13:45', user: 'Trần Văn Hùng', action: 'Xử lý đơn ORD-88420', module: 'Orders' },
    { time: '2026-06-05 11:00', user: 'Nguyễn Minh Anh', action: 'Approve action AQ004', module: 'Decision Center' },
    { time: '2026-06-04 16:30', user: 'Phạm Đức An', action: 'Upload video V005 draft', module: 'Content' },
    { time: '2026-06-04 09:00', user: 'System', action: 'Auto alert: Stock P003 low', module: 'Automation' }
  ],

  brandKit: {
    primaryColor: '#14b8a6',
    secondaryColor: '#fe2c55',
    logo: 'BeautyViet',
    banner: 'Bộ sưu tập Summer Glow 2026',
    font: 'Inter',
    tone: 'Tươi sáng · Clean beauty · Gen Z Việt',
    templates: ['Banner flash sale', 'Hàng mới', 'Đếm ngược live', 'Khuyến mãi tiếp thị liên kết']
  },

  store: {
    publishStatus: 'draft',
    lastPublished: '2026-06-04 18:30',
    lastEdited: '2026-06-05 14:10',
    activeTemplateId: null,
    previewMode: 'mobile',
    pinnedProductIds: ['P001', 'P005', 'P003'],
    bannerCta: 'Mua ngay — Flash Sale 6/6',
    bannerSub: 'Giảm đến 30% · Freeship toàn quốc',
    sections: [
      { id: 'banner', label: 'Banner chính', desc: '1200×400 · CTA + campaign link', enabled: true, order: 1 },
      { id: 'hero', label: 'Hero SKU nổi bật', desc: 'Pin 3–4 sản phẩm chủ lực', enabled: true, order: 2 },
      { id: 'categories', label: 'Danh mục sản phẩm', desc: 'Serum · Kem dưỡng · Chống nắng', enabled: true, order: 3 },
      { id: 'live', label: 'Live đang diễn ra', desc: 'Widget Mega Live + countdown', enabled: false, order: 4 },
      { id: 'affiliate', label: 'Creator đề xuất', desc: 'Top KOC + video bán hàng', enabled: true, order: 5 },
      { id: 'reviews', label: 'Đánh giá nổi bật', desc: 'Social proof 4.9★', enabled: true, order: 6 }
    ],
    templateCatalog: [
      { id: 'T1', name: 'Banner flash sale', tag: 'Flash Sale', desc: 'Countdown đỏ + CTA nổi bật, đồng bộ campaign khuyến mãi', campaignId: 'CP001', recommended: true, lastUsed: '2026-05-28' },
      { id: 'T2', name: 'Hàng mới', tag: 'New Arrival', desc: 'Grid sản phẩm mới, badge New, ưu tiên P007 Mini Kit', campaignId: 'CP003', recommended: false, lastUsed: null },
      { id: 'T3', name: 'Đếm ngược live', tag: 'Live', desc: 'Widget live countdown + pin host KOC, voucher live-only', campaignId: null, recommended: false, lastUsed: '2026-06-01' },
      { id: 'T4', name: 'Khuyến mãi tiếp thị liên kết', tag: 'Affiliate', desc: 'Highlight commission 12% + top creator GMV', campaignId: 'CP002', recommended: false, lastUsed: null }
    ],
    seo: {
      shopTitle: 'BeautyViet Official — Skincare TikTok Shop',
      shopBio: 'Thương hiệu mỹ phẩm clean beauty hàng đầu TikTok Shop VN. Serum Vitamin C, kem chống nắng SPF50+, routine 3 bước chuẩn dermatologist.',
      keywords: ['serum vitamin c', 'kem chống nắng', 'skincare tiktok', 'beautyviet', 'mỹ phẩm clean beauty'],
      slug: 'beautyviet-official'
    },
    conversionChecks: [
      { id: 'cc1', label: 'Banner có CTA rõ ràng', weight: 15, pass: true },
      { id: 'cc2', label: '≥3 Hero SKU được pin', weight: 20, pass: false },
      { id: 'cc3', label: 'Template đồng bộ campaign', weight: 15, pass: false },
      { id: 'cc4', label: 'Tiêu đề shop SEO ≥ 40 ký tự', weight: 10, pass: true },
      { id: 'cc5', label: 'Bio shop ≥ 80 ký tự', weight: 10, pass: true },
      { id: 'cc6', label: 'Logo + màu Brand Kit', weight: 15, pass: true },
      { id: 'cc7', label: 'Section Live bật (nếu có live)', weight: 10, pass: false },
      { id: 'cc8', label: 'Đồng bộ TikTok Shop OK', weight: 15, pass: true }
    ],
    publishHistory: [
      { time: '2026-06-04 18:30', user: 'Nguyễn Minh Anh', action: 'Xuất bản storefront', status: 'live' },
      { time: '2026-06-03 11:20', user: 'Nguyễn Minh Anh', action: 'Cập nhật banner Summer Glow', status: 'draft' },
      { time: '2026-06-01 09:00', user: 'System', action: 'Template Live Countdown áp dụng', status: 'draft' }
    ]
  },

  dataSync: [
    { source: 'TikTok Shop', status: 'live', records: 12847, latency: '2s', lastSync: '14:32:05' },
    { source: 'TikTok Ads', status: 'live', records: 3421, latency: '5s', lastSync: '14:31:58' },
    { source: 'Affiliate Center', status: 'live', records: 892, latency: '3s', lastSync: '14:32:01' },
    { source: 'Livestream Hub', status: 'live', records: 156, latency: '4s', lastSync: '14:30:45' },
    { source: 'Content API', status: 'live', records: 2341, latency: '6s', lastSync: '14:28:12' },
    { source: 'ERP KiotViet', status: 'synced', records: 7845, latency: '15s', lastSync: '14:25:00' }
  ],

  gmvTrend: [42000000, 45000000, 48000000, 52000000, 49000000, 61000000, 58000000, 65000000, 62000000, 68000000, 72000000, 75000000, 71000000, 78000000],
  profitTrend: [9200000, 9800000, 10500000, 11200000, 10800000, 13500000, 12800000, 14200000, 13800000, 15200000, 16000000, 16800000, 15500000, 17200000]
};

const NAV = [
  { section: 'Tổng quan', items: [
    { id: 'dashboard', label: 'Tổng quan', icon: 'layout-dashboard', phase: 0 }
  ]},
  { section: 'Khởi tạo', phase: 1, items: [
    { id: 'onboarding', label: 'Thiết lập shop', icon: 'plug-zap' },
    { id: 'products-setup', label: 'Ra mắt sản phẩm', icon: 'package-plus' },
    { id: 'store', label: 'Tối ưu cửa hàng', icon: 'store' },
    { id: 'compliance', label: 'Tuân thủ & chính sách', icon: 'shield-check' },
    { id: 'education', label: 'Đào tạo seller', icon: 'graduation-cap' },
    { id: 'portfolio', label: 'Chiến lược sản phẩm', icon: 'crosshair' },
    { id: 'channels', label: 'Đa kênh', icon: 'share-2' }
  ]},
  { section: 'Vận hành', phase: 2, items: [
    { id: 'products', label: 'Vận hành sản phẩm', icon: 'boxes' },
    { id: 'orders', label: 'Trung tâm đơn hàng', icon: 'shopping-bag' },
    { id: 'inventory', label: 'Quản lý tồn kho', icon: 'warehouse' },
    { id: 'returns', label: 'Hoàn & hủy đơn', icon: 'rotate-ccw' },
    { id: 'affiliate', label: 'Tiếp thị liên kết', icon: 'handshake' },
    { id: 'koc', label: 'Quản lý KOC', icon: 'star' },
    { id: 'agency', label: 'Quản lý agency', icon: 'building-2' },
    { id: 'samples', label: 'Theo dõi gửi mẫu', icon: 'gift' },
    { id: 'content', label: 'Lịch nội dung', icon: 'clapperboard' },
    { id: 'livestream', label: 'Vận hành livestream', icon: 'radio' },
    { id: 'campaigns', label: 'Trung tâm chiến dịch', icon: 'megaphone' },
    { id: 'vouchers', label: 'Quản lý voucher', icon: 'ticket' },
    { id: 'ads', label: 'Quảng cáo Spark', icon: 'mouse-pointer-click' }
  ]},
  { section: 'Phân tích', phase: 3, items: [
    { id: 'executive', label: 'Bảng điều hành', icon: 'line-chart' },
    { id: 'revenue', label: 'Phân tích doanh thu', icon: 'circle-dollar-sign' },
    { id: 'profit', label: 'Lãi lỗ & biên LN', icon: 'trending-up' },
    { id: 'costs', label: 'Phân tích chi phí', icon: 'wallet' },
    { id: 'product-analytics', label: 'Phân tích sản phẩm', icon: 'bar-chart-2' },
    { id: 'affiliate-analytics', label: 'Phân tích tiếp thị LH', icon: 'pie-chart' },
    { id: 'creator-analytics', label: 'Bảng điểm KOC', icon: 'award' },
    { id: 'content-analytics', label: 'Phân tích nội dung', icon: 'film' },
    { id: 'live-analytics', label: 'Phân tích livestream', icon: 'activity' },
    { id: 'customer-analytics', label: 'Phân tích khách hàng', icon: 'users' },
    { id: 'team', label: 'Quản lý nhóm', icon: 'user-cog' }
  ]},
  { section: 'Tối ưu', phase: 4, items: [
    { id: 'growth-assistant', label: 'Trợ lý AI tăng trưởng', icon: 'bot' },
    { id: 'alerts', label: 'Cảnh báo thông minh', icon: 'bell-ring' },
    { id: 'opportunities', label: 'Cơ hội tăng trưởng', icon: 'lightbulb' },
    { id: 'forecast', label: 'Dự báo', icon: 'chart-line' },
    { id: 'benchmark', label: 'So sánh thị trường', icon: 'gauge' },
    { id: 'actions', label: 'Trung tâm quyết định', icon: 'list-checks' },
    { id: 'workflows', label: 'Trung tâm quy trình', icon: 'workflow' },
    { id: 'optimization', label: 'Tối ưu tăng trưởng', icon: 'rocket' }
  ]},
  { section: 'Hệ thống', items: [
    { id: 'notifications', label: 'Trung tâm thông báo', icon: 'bell' },
    { id: 'settings', label: 'Cài đặt & phân quyền', icon: 'settings' }
  ]}
];

function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + ' tỷ';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + ' tr';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toLocaleString('vi-VN');
}

function fmtCurrency(n) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);
}

function getProduct(id) {
  return ZZP_DATA.products.find(p => p.id === id);
}

function getProductDailyVelocity(product) {
  return Math.max(1, Math.round((product?.sold30d || 0) / 30));
}

function getProductStockDays(product) {
  if (!product) return 0;
  return Math.floor(product.stock / getProductDailyVelocity(product));
}

function getProductPurchaseOrder(productId) {
  return (ZZP_DATA.purchaseOrders || []).find(po => po.productId === productId && po.status !== 'received');
}

function getStockIssueCopy(product) {
  const velocity = getProductDailyVelocity(product);
  const daysLeft = getProductStockDays(product);
  const po = getProductPurchaseOrder(product.id);
  const pendingPo = ZZP_DATA.actionQueue.find(a =>
    a.status !== 'approved' && (a.title.includes(product.id) || a.title.includes(product.name.split(' ').slice(-2).join(' ')))
  );

  if (po?.status === 'in_transit' || po?.status === 'awaiting_supplier') {
    return {
      title: `Chờ hàng về: ${product.name}`,
      desc: `${po.id}: ${po.qty} sp · ETA ${po.eta || 'chưa xác nhận'} · còn ${product.stock} sp (~${daysLeft} ngày) · tạm giảm push bán`,
      action: 'Theo dõi PO & giảm push KOC',
      flow: null,
      module: 'inventory'
    };
  }

  if (po?.status === 'draft' || pendingPo) {
    const ref = po?.id || pendingPo?.id;
    return {
      title: `Sắp hết hàng: ${product.name}`,
      desc: `Còn ${product.stock} sp (~${daysLeft} ngày, ${velocity}/ngày) · ${ref} chưa gửi NCC · Ads vẫn có thể đang chạy`,
      action: 'Gửi đơn NCC & tạm dừng Ads',
      flow: 'FLOW_STOCK',
      module: 'inventory'
    };
  }

  return {
    title: `Sắp hết hàng: ${product.name}`,
    desc: `Còn ${product.stock} sp (~${daysLeft} ngày) · chưa lên đơn NCC · lead time ~7 ngày`,
    action: 'Tạo đơn đặt hàng NCC',
    flow: 'FLOW_STOCK',
    module: 'inventory'
  };
}

function calcHealthScore() {
  const done = ZZP_DATA.checklist.filter(c => c.done).length;
  const base = Math.round((done / ZZP_DATA.checklist.length) * 60);
  const listingBonus = Math.round(ZZP_DATA.products.filter(p => p.listingScore >= 85).length / ZZP_DATA.products.length * 20);
  const compliancePenalty = ZZP_DATA.policies.filter(p => p.status === 'action_required').length * 5;
  return Math.min(100, Math.max(0, base + listingBonus + 18 - compliancePenalty));
}

function calcProfit() {
  const rev = ZZP_DATA.revenueBreakdown.total;
  const cost = ZZP_DATA.costs.total;
  return { revenue: rev, cost, profit: rev - cost, margin: ((rev - cost) / rev * 100).toFixed(1) };
}
