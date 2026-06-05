/* Store Optimization — mô tả chức năng thực tế từng tab (seller POV) */

const STORE_TAB_META = {
  overview: {
    sellerRole: 'Shop Owner · Khởi tạo storefront',
    goal: 'Biết shop đã sẵn sàng xuất bản chưa và còn thiếu bước nào trước khi khách vào trang TikTok Shop.',
    data: [
      'Storefront Score — mức hoàn thiện tổng thể (Brand + pin SKU + template + SEO)',
      'Trạng thái publish: Bản nháp / Đang live và thời điểm xuất bản gần nhất',
      'Checklist c6: Brand Kit, banner, Hero SKU, template',
      'Conversion Readiness — 8 tiêu chí ảnh hưởng tỷ lệ chuyển đổi trên shop',
      'Lịch sử xuất bản — ai sửa, khi nào, trạng thái sau publish'
    ],
    actions: [
      'Xem nhanh bước chưa xong và nhảy sang tab tương ứng',
      'Xuất bản storefront khi Score ≥ 60%',
      'Theo dõi ai đã publish và rollback nếu cần (qua lịch sử)'
    ],
    sellerNote: 'Seller mới thường publish sớm khi chưa pin đủ Hero SKU — tab này giúp tránh mất conversion ngay tuần đầu.'
  },
  brandKit: {
    sellerRole: 'Brand / Marketing · Nhận diện thương hiệu',
    goal: 'Đồng bộ logo, màu sắc và tone of voice lên TikTok Shop để shop trông chuyên nghiệp và nhất quán với video/live.',
    data: [
      'Logo vuông 500×500, logo ngang, favicon — trạng thái có/thiếu',
      'Màu primary & accent — dùng cho banner, CTA, widget shop',
      'Font và tone of voice — copy trên shop và mô tả sản phẩm',
      'Bảng tài sản Brand Kit — quy cách file Seller Center yêu cầu',
      'Kết quả AI Brand Consistency — gợi ý sửa trước khi sync'
    ],
    actions: [
      'Upload / thay logo và màu thương hiệu',
      'Lưu Brand Kit và đồng bộ lên Seller Center',
      'Bổ sung logo ngang hoặc guideline còn thiếu'
    ],
    sellerNote: 'TikTok Shop hiển thị avatar shop từ logo vuông — thiếu file này shop trông như tài khoản cá nhân chưa verify.'
  },
  decoration: {
    sellerRole: 'Merchandising · Trang trí cửa hàng',
    goal: 'Sắp xếp banner, sản phẩm nổi bật và các khối nội dung để khách thấy deal + SKU chủ lực ngay khi vào shop.',
    data: [
      'Banner 1200×400: tiêu đề, phụ đề, nút CTA, campaign gắn kèm',
      'Hero SKU pin: tối đa 4 SP, thứ tự hiển thị, listing score từng SKU',
      'Section Builder: banner / hero / danh mục / live / affiliate / reviews — bật/tắt',
      'Preview banner real-time khi chỉnh copy',
      'Campaign đang chạy (CP001 Flash Sale…) để đồng bộ messaging'
    ],
    actions: [
      'Sửa copy banner và CTA theo campaign đang chạy',
      'Pin 3–4 SKU có GMV cao hoặc listing score ≥ 80%',
      'Bật section Live khi có phiên Mega Live, tắt section không dùng'
    ],
    sellerNote: 'Pin SKU theo doanh thu thực (P001 Serum, P005 SPF…) — không pin SP đang review compliance để tránh khách click vào listing lỗi.'
  },
  templates: {
    sellerRole: 'Campaign Ops · Template Center',
    goal: 'Chọn layout storefront phù hợp chiến dịch (Flash Sale, Live, Affiliate) thay vì tự dựng từng khối thủ công.',
    data: [
      '4 template: Flash Sale, New Arrival, Live Countdown, Affiliate Boost',
      'Template đang active vs đề xuất AI theo campaign',
      'Campaign liên kết (CP001, CP002…) — spent, GMV, thời gian chạy',
      'Lần sử dụng gần nhất từng template',
      'Bảng so sánh nhanh tag / campaign / trạng thái'
    ],
    actions: [
      'Áp dụng template — tự cập nhật banner, CTA, section (vd: bật Live widget)',
      'Xem trước trên tab Xem trước trước khi publish',
      'Mở chi tiết campaign gắn template để kiểm tra ngân sách'
    ],
    sellerNote: 'Template Flash Sale (T1) nên dùng khi CP001 đang chạy — CTA và countdown đồng bộ giúp tăng CTR từ shop sang checkout.'
  },
  preview: {
    sellerRole: 'QA trước publish · Xem như khách hàng',
    goal: 'Kiểm tra storefront trên mobile/desktop đúng như khách thấy trên TikTok trước khi bấm Xuất bản.',
    data: [
      'Mock shop: avatar, tên shop, followers, rating',
      'Banner + CTA + widget Live (nếu bật)',
      'Hàng Hero SKU pin — ảnh, giá, thứ tự',
      'Storefront Score tổng hợp sau mọi thay đổi',
      'Template và số section đang bật'
    ],
    actions: [
      'Chuyển Mobile / Desktop để so layout',
      'Quay lại tab Trang trí nếu thấy thiếu SKU hoặc CTA yếu',
      'Xuất bản trực tiếp khi preview ổn'
    ],
    sellerNote: '90%+ traffic shop TikTok là mobile — luôn duyệt preview mobile trước; desktop chỉ để kiểm tra logo ngang nếu có.'
  },
  seo: {
    sellerRole: 'Growth · SEO shop & conversion',
    goal: 'Tối ưu tiêu đề, bio và từ khóa để shop được tìm thấy trên TikTok Search và tăng trust khi khách vào profile.',
    data: [
      'Tiêu đề shop (≥ 40 ký tự) — hiển thị trên search & profile',
      'Bio shop (≥ 80 ký tự) — mô tả category + USP thương hiệu',
      'URL slug @beautyviet-official',
      'Từ khóa SEO: serum, chống nắng, skincare…',
      'Checklist CTA + Hero + template — ảnh hưởng conversion',
      'Preview kết quả tìm kiếm TikTok'
    ],
    actions: [
      'Chỉnh tiêu đề/bio/slug và lưu SEO',
      'Thêm từ khóa AI theo category Mỹ phẩm',
      'Sửa CTA hoặc pin SKU nếu checklist conversion còn thiếu'
    ],
    sellerNote: 'Bio nên ghi rõ ngành hàng + USP (clean beauty, dermatologist…) — giúp TikTok gợi ý shop đúng audience và giảm bounce rate.'
  }
};
