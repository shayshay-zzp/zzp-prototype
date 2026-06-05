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
    { id: 'c5', phase: 1, title: 'Đăng 5+ sản phẩm Hero SKU', desc: 'Listing đạt chất lượng ≥85%', done: false, module: 'products' },
    { id: 'c6', phase: 1, title: 'Trang trí cửa hàng & Brand Kit', desc: 'Banner, logo, màu thương hiệu', done: false, module: 'store' },
    { id: 'c7', phase: 1, title: 'Kích hoạt Affiliate Program', desc: 'Commission 10-15% cho KOC', done: true, module: 'affiliate' },
    { id: 'c8', phase: 1, title: 'Hoàn thành Compliance Check', desc: 'Không vi phạm chính sách', done: false, module: 'compliance' },
    { id: 'c9', phase: 1, title: 'Đọc Onboarding Playbook', desc: '5 module đào tạo cơ bản', done: false, module: 'education' },
    { id: 'c10', phase: 1, title: 'Đồng bộ SKU đa kênh', desc: 'Shopee, Lazada mapping', done: false, module: 'channels' }
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
    { id: 'POL003', title: 'Quy định mới về claim "Organic"', date: '2026-05-15', impact: 'high', affected: ['P006'], status: 'compliant', aiSummary: 'Sản phẩm P006 đã có chứng nhận. Duy trì compliance.' }
  ],

  education: [
    { id: 'E001', title: 'Bắt đầu với TikTok Shop', duration: '15 phút', progress: 100, type: 'video' },
    { id: 'E002', title: 'Tối ưu Listing sản phẩm', duration: '20 phút', progress: 100, type: 'video' },
    { id: 'E003', title: 'Chiến lược Affiliate cho ngành Beauty', duration: '25 phút', progress: 60, type: 'playbook' },
    { id: 'E004', title: 'Livestream bán hàng hiệu quả', duration: '30 phút', progress: 0, type: 'playbook' },
    { id: 'E005', title: 'Quản lý P&L trên TikTok Shop', duration: '20 phút', progress: 0, type: 'sop' }
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
    { segment: 'Returning (2 đơn)', count: 890, ltv: 580000, repeatRate: 42 },
    { segment: 'New (1 đơn)', count: 1615, ltv: 185000, repeatRate: 12 },
    { segment: 'At Risk (90d inactive)', count: 456, ltv: 320000, repeatRate: 5 }
  ],

  team: [
    { id: 'U001', name: 'Nguyễn Minh Anh', role: 'Owner', dept: 'Management', status: 'active' },
    { id: 'U002', name: 'Trần Văn Hùng', role: 'Operations Manager', dept: 'Operations', status: 'active' },
    { id: 'U003', name: 'Lê Thị Hoa', role: 'Affiliate Manager', dept: 'Marketing', status: 'active' },
    { id: 'U004', name: 'Phạm Đức An', role: 'Content Lead', dept: 'Content', status: 'active' },
    { id: 'U005', name: 'Võ Minh Tâm', role: 'Analyst', dept: 'Data', status: 'active' }
  ],

  alerts: [
    { id: 'A001', type: 'inventory', severity: 'critical', title: 'Tồn kho thấp: Mặt nạ Collagen', desc: 'Chỉ còn 45 sp — dự kiến hết hàng trong 2 ngày với tốc độ bán hiện tại', action: 'Đặt hàng nhập kho', module: 'inventory', read: false },
    { id: 'A002', type: 'profit', severity: 'warning', title: 'ROAS thấp: Product Ads Mặt nạ', desc: 'ROAS 1.2x — chi phí ads vượt ngưỡng lợi nhuận 2.0x', action: 'Tạm dừng chiến dịch', module: 'ads', read: false },
    { id: 'A003', type: 'cost', severity: 'warning', title: 'Voucher NEW50K gần vượt guardrail', desc: 'Đã sử dụng 63% ngân sách — CVR thấp hơn benchmark 40%', action: 'Giảm mức voucher', module: 'vouchers', read: false },
    { id: 'A004', type: 'operation', severity: 'info', title: '3 đơn hàng sắp quá SLA', desc: 'ORD-88421, ORD-88414 cần xử lý trong 2-6 giờ', action: 'Xử lý đơn hàng', module: 'orders', read: false },
    { id: 'A005', type: 'compliance', severity: 'critical', title: 'Vi phạm tiềm ẩn: P006 Listing', desc: 'Thiếu ảnh nhãn INCI theo chính sách mới POL001', action: 'Cập nhật listing', module: 'compliance', read: false },
    { id: 'A006', type: 'profit', severity: 'info', title: 'Margin tăng: Serum Vitamin C', desc: 'Biên lợi nhuận tăng 3.2% nhờ giảm chi phí mẫu', action: 'Scale sản phẩm', module: 'products', read: true }
  ],

  aiInsights: [
    { id: 'AI001', priority: 1, title: 'Scale Serum Vitamin C qua Spark Ads', desc: 'ROAS 3.8x, margin 66%. Video K001 đang viral — tăng budget 30% trong 7 ngày.', impact: '+45M GMV', confidence: 89, actions: ['Tăng budget AD001', 'Gửi thêm mẫu cho K001', 'Tạo voucher bundle P001+P005'] },
    { id: 'AI002', priority: 2, title: 'Tối ưu chi phí Ads Mặt nạ Collagen', desc: 'ROAS 1.2x gây thua lỗ. Chuyển ngân sách sang Affiliate thay vì Product Ads.', impact: '+12M lợi nhuận', confidence: 92, actions: ['Pause AD002', 'Tăng commission K002 cho P003', 'Livestream flash sale P003'] },
    { id: 'AI003', priority: 3, title: 'Nhập kho khẩn Mặt nạ Collagen', desc: 'Stock 45, velocity 40/sp/ngày. Risk mất 15M GMV/tuần nếu hết hàng.', impact: 'Tránh mất doanh thu', confidence: 95, actions: ['Đặt PO 2000 sp', 'Thông báo KOC giảm push', 'Kích hoạt pre-order'] },
    { id: 'AI004', priority: 4, title: 'Phát hiện KOC tiềm năng: @skintips_daily', desc: 'ROI 3.5x, đang tăng trưởng. Mở rộng hợp tác từ Mid lên Macro tier.', impact: '+25M GMV', confidence: 78, actions: ['Tăng commission 10→12%', 'Gửi Hero SKU bundle', 'Book live session'] }
  ],

  opportunities: [
    { id: 'O001', type: 'product', title: 'Hero SKU Serum VC — Scale window', desc: 'Trending +45% views tuần này', potential: '+45M', status: 'new' },
    { id: 'O002', type: 'koc', title: 'KOC Discovery: @skintips_daily', desc: 'Match score 87% với brand', potential: '+25M', status: 'new' },
    { id: 'O003', type: 'content', title: 'Nhân rộng format "Routine 3 bước"', desc: 'CVR cao nhất trong 30 ngày', potential: '+18M', status: 'in_progress' },
    { id: 'O004', type: 'campaign', title: 'Bundle P001+P005 cho Live 6/6', desc: 'Cross-sell rate dự kiến 28%', potential: '+32M', status: 'new' }
  ],

  forecasts: {
    gmv7d: [62000000, 68000000, 71000000, 75000000, 82000000, 95000000, 88000000],
    gmvLabels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    inventory: [
      { product: 'P003', daysLeft: 2, recommendation: 'Nhập khẩn 2000 sp' },
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
    { id: 'R001', name: 'Cảnh báo tồn kho < 100 sp', trigger: 'stock < 100', action: 'Gửi alert + tạo task nhập hàng', active: true, runs: 12 },
    { id: 'R002', name: 'Pause Ads khi ROAS < 1.5x', trigger: 'roas < 1.5', action: 'Tạm dừng campaign + notify', active: true, runs: 3 },
    { id: 'R003', name: 'Báo cáo GMV hàng ngày 8h', trigger: 'cron 08:00', action: 'Email + Zalo report', active: true, runs: 156 },
    { id: 'R004', name: 'Auto-approve sample cho KOC score > 80', trigger: 'koc.score > 80', action: 'Gửi mẫu tự động', active: false, runs: 0 }
  ],

  actionQueue: [
    { id: 'AQ001', title: 'Pause Product Ads Mặt nạ', source: 'AI002', status: 'pending', assignee: 'Lê Thị Hoa', priority: 'high' },
    { id: 'AQ002', title: 'Đặt PO nhập kho P003', source: 'AI003', status: 'pending', assignee: 'Trần Văn Hùng', priority: 'critical' },
    { id: 'AQ003', title: 'Cập nhật ảnh INCI cho P006', source: 'A005', status: 'in_progress', assignee: 'Phạm Đức An', priority: 'high' },
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
    banner: 'Summer Glow Collection 2026',
    templates: ['Flash Sale Banner', 'New Arrival', 'Live Countdown', 'Affiliate Promo']
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
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', phase: 0 }
  ]},
  { section: 'Khởi tạo', phase: 1, items: [
    { id: 'onboarding', label: 'Onboarding & Setup', icon: 'plug-zap' },
    { id: 'products-setup', label: 'Product Launch', icon: 'package-plus' },
    { id: 'store', label: 'Store Optimization', icon: 'store' },
    { id: 'compliance', label: 'Compliance & Policy', icon: 'shield-check' },
    { id: 'education', label: 'Education Hub', icon: 'graduation-cap' },
    { id: 'portfolio', label: 'Product Strategy', icon: 'crosshair' },
    { id: 'channels', label: 'Multi-channel', icon: 'share-2' }
  ]},
  { section: 'Vận hành', phase: 2, items: [
    { id: 'datahub', label: 'Data Hub & Sync', icon: 'database' },
    { id: 'products', label: 'Product Operations', icon: 'boxes' },
    { id: 'orders', label: 'Order Center', icon: 'shopping-bag' },
    { id: 'inventory', label: 'Inventory', icon: 'warehouse' },
    { id: 'returns', label: 'Returns & Cancel', icon: 'rotate-ccw' },
    { id: 'affiliate', label: 'Affiliate Center', icon: 'handshake' },
    { id: 'koc', label: 'KOC CRM', icon: 'star' },
    { id: 'agency', label: 'Agency Management', icon: 'building-2' },
    { id: 'samples', label: 'Sample Tracking', icon: 'gift' },
    { id: 'content', label: 'Content Calendar', icon: 'clapperboard' },
    { id: 'livestream', label: 'Livestream Ops', icon: 'radio' },
    { id: 'campaigns', label: 'Campaign Center', icon: 'megaphone' },
    { id: 'vouchers', label: 'Voucher Management', icon: 'ticket' },
    { id: 'ads', label: 'Spark Ads', icon: 'mouse-pointer-click' }
  ]},
  { section: 'Phân tích', phase: 3, items: [
    { id: 'executive', label: 'Executive Dashboard', icon: 'line-chart' },
    { id: 'revenue', label: 'Revenue Intelligence', icon: 'circle-dollar-sign' },
    { id: 'profit', label: 'P&L Dashboard', icon: 'trending-up' },
    { id: 'costs', label: 'Cost Intelligence', icon: 'wallet' },
    { id: 'product-analytics', label: 'Product Intelligence', icon: 'bar-chart-2' },
    { id: 'affiliate-analytics', label: 'Affiliate Analytics', icon: 'pie-chart' },
    { id: 'creator-analytics', label: 'Creator Scorecard', icon: 'award' },
    { id: 'content-analytics', label: 'Content Intelligence', icon: 'film' },
    { id: 'live-analytics', label: 'Livestream Analytics', icon: 'activity' },
    { id: 'customer-analytics', label: 'Customer Intelligence', icon: 'users' },
    { id: 'team', label: 'Team & RBAC', icon: 'user-cog' }
  ]},
  { section: 'Tối ưu', phase: 4, items: [
    { id: 'growth-assistant', label: 'Growth Assistant AI', icon: 'bot' },
    { id: 'alerts', label: 'Smart Alerts', icon: 'bell-ring' },
    { id: 'opportunities', label: 'Opportunity Engine', icon: 'lightbulb' },
    { id: 'forecast', label: 'Forecasting', icon: 'chart-line' },
    { id: 'benchmark', label: 'Market Benchmark', icon: 'gauge' },
    { id: 'actions', label: 'Decision Center', icon: 'list-checks' },
    { id: 'automation', label: 'Automation Engine', icon: 'cog' },
    { id: 'workflows', label: 'Workflow Center', icon: 'workflow' },
    { id: 'optimization', label: 'Growth Optimizers', icon: 'rocket' }
  ]},
  { section: 'Hệ thống', items: [
    { id: 'notifications', label: 'Notification Center', icon: 'bell' },
    { id: 'audit', label: 'Audit & Governance', icon: 'scroll-text' },
    { id: 'settings', label: 'Settings & Access', icon: 'settings' }
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
