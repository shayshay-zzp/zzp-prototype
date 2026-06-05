/* Tối ưu cửa hàng — mô tả chức năng thực tế từng tab (góc nhìn người bán) */

const STORE_TAB_META = {
  overview: {
    sellerRole: 'Chủ shop · Khởi tạo trang cửa hàng',
    goal: 'Biết shop đã sẵn sàng xuất bản chưa và còn thiếu bước nào trước khi khách vào trang TikTok Shop.',
    data: [
      'Điểm hoàn thiện trang shop — mức hoàn thiện tổng thể (thương hiệu + ghim SKU chủ lực + mẫu giao diện + SEO)',
      'Trạng thái xuất bản: Bản nháp / Đang hoạt động và thời điểm xuất bản gần nhất',
      'Danh sách kiểm tra 6 mục: Bộ nhận diện thương hiệu, biểu ngữ, SKU chủ lực, mẫu giao diện',
      'Mức sẵn sàng chuyển đổi — 8 tiêu chí ảnh hưởng tỷ lệ chuyển đổi trên shop',
      'Lịch sử xuất bản — ai sửa, khi nào, trạng thái sau khi xuất bản'
    ],
    actions: [
      'Xem nhanh bước chưa xong và nhảy sang tab tương ứng',
      'Xuất bản trang cửa hàng khi điểm hoàn thiện ≥ 60%',
      'Theo dõi ai đã xuất bản và hoàn tác nếu cần (qua lịch sử)'
    ],
    sellerNote: 'Người bán mới thường xuất bản sớm khi chưa ghim đủ SKU chủ lực — tab này giúp tránh mất chuyển đổi ngay tuần đầu.'
  },
  brandKit: {
    sellerRole: 'Thương hiệu / Tiếp thị · Nhận diện thương hiệu',
    goal: 'Đồng bộ logo, màu sắc và giọng điệu thương hiệu lên TikTok Shop để shop trông chuyên nghiệp và nhất quán với video/phiên live.',
    data: [
      'Logo vuông 500×500, logo ngang, biểu tượng tab trình duyệt — trạng thái có/thiếu',
      'Màu chính & màu nhấn — dùng cho biểu ngữ, nút kêu gọi hành động, tiện ích shop',
      'Phông chữ và giọng điệu thương hiệu — nội dung trên shop và mô tả sản phẩm',
      'Bảng tài sản bộ nhận diện thương hiệu — quy cách file Seller Center yêu cầu',
      'Kết quả AI kiểm tra nhất quán thương hiệu — gợi ý sửa trước khi đồng bộ'
    ],
    actions: [
      'Tải lên / thay logo và màu thương hiệu',
      'Lưu bộ nhận diện thương hiệu và đồng bộ lên Seller Center',
      'Bổ sung logo ngang hoặc hướng dẫn còn thiếu'
    ],
    sellerNote: 'TikTok Shop hiển thị ảnh đại diện shop từ logo vuông — thiếu file này shop trông như tài khoản cá nhân chưa xác minh.'
  },
  decoration: {
    sellerRole: 'Trưng bày sản phẩm · Trang trí cửa hàng',
    goal: 'Sắp xếp biểu ngữ, sản phẩm nổi bật và các khối nội dung để khách thấy ưu đãi + SKU chủ lực ngay khi vào shop.',
    data: [
      'Biểu ngữ 1200×400: tiêu đề, phụ đề, nút kêu gọi hành động, chiến dịch gắn kèm',
      'Ghim SKU chủ lực: tối đa 4 sản phẩm, thứ tự hiển thị, điểm trang sản phẩm từng SKU',
      'Trình tạo khối: biểu ngữ / SKU chủ lực / danh mục / live / tiếp thị liên kết / đánh giá — bật/tắt',
      'Xem trước biểu ngữ theo thời gian thực khi chỉnh nội dung',
      'Chiến dịch đang chạy (CP001 Giảm giá sốc…) để đồng bộ thông điệp'
    ],
    actions: [
      'Sửa nội dung biểu ngữ và nút kêu gọi hành động theo chiến dịch đang chạy',
      'Ghim 3–4 SKU có GMV (doanh thu gộp) cao hoặc điểm trang sản phẩm ≥ 80%',
      'Bật khối Live khi có phiên live lớn, tắt khối không dùng'
    ],
    sellerNote: 'Ghim SKU theo doanh thu thực (P001 Serum, P005 Kem chống nắng…) — không ghim sản phẩm đang bị kiểm tra tuân thủ để tránh khách bấm vào trang sản phẩm lỗi.'
  },
  templates: {
    sellerRole: 'Vận hành chiến dịch · Trung tâm mẫu giao diện',
    goal: 'Chọn bố cục trang shop phù hợp chiến dịch (Giảm giá sốc, Live, Tiếp thị liên kết) thay vì tự dựng từng khối thủ công.',
    data: [
      '4 mẫu: Giảm giá sốc, Hàng mới, Đếm ngược Live, Tăng tốc tiếp thị liên kết',
      'Mẫu đang dùng so với đề xuất AI theo chiến dịch',
      'Chiến dịch liên kết (CP001, CP002…) — chi tiêu, GMV (doanh thu gộp), thời gian chạy',
      'Lần sử dụng gần nhất từng mẫu',
      'Bảng so sánh nhanh nhãn / chiến dịch / trạng thái'
    ],
    actions: [
      'Áp dụng mẫu — tự cập nhật biểu ngữ, nút kêu gọi hành động, khối (vd: bật tiện ích Live)',
      'Xem trước trên tab Xem trước trước khi xuất bản',
      'Mở chi tiết chiến dịch gắn mẫu để kiểm tra ngân sách'
    ],
    sellerNote: 'Mẫu Giảm giá sốc (T1) nên dùng khi CP001 đang chạy — nút kêu gọi hành động và đếm ngược đồng bộ giúp tăng tỷ lệ nhấp từ shop sang thanh toán.'
  },
  preview: {
    sellerRole: 'Kiểm tra trước xuất bản · Xem như khách hàng',
    goal: 'Kiểm tra trang cửa hàng trên di động/máy tính đúng như khách thấy trên TikTok trước khi bấm Xuất bản.',
    data: [
      'Shop mô phỏng: ảnh đại diện, tên shop, người theo dõi, đánh giá',
      'Biểu ngữ + nút kêu gọi hành động + tiện ích Live (nếu bật)',
      'Hàng SKU chủ lực đã ghim — ảnh, giá, thứ tự',
      'Điểm hoàn thiện trang shop tổng hợp sau mọi thay đổi',
      'Mẫu giao diện và số khối đang bật'
    ],
    actions: [
      'Chuyển Di động / Máy tính để so bố cục',
      'Quay lại tab Trang trí nếu thấy thiếu SKU hoặc nút kêu gọi hành động yếu',
      'Xuất bản trực tiếp khi xem trước ổn'
    ],
    sellerNote: '90%+ lưu lượng shop TikTok là di động — luôn duyệt xem trước trên di động trước; máy tính chỉ để kiểm tra logo ngang nếu có.'
  },
  seo: {
    sellerRole: 'Tăng trưởng · SEO shop & chuyển đổi',
    goal: 'Tối ưu tiêu đề, giới thiệu và từ khóa để shop được tìm thấy trên Tìm kiếm TikTok và tăng độ tin cậy khi khách vào hồ sơ.',
    data: [
      'Tiêu đề shop (≥ 40 ký tự) — hiển thị trên tìm kiếm & hồ sơ',
      'Giới thiệu shop (≥ 80 ký tự) — mô tả ngành hàng + điểm bán hàng độc nhất',
      'Đường dẫn rút gọn @beautyviet-official',
      'Từ khóa SEO: serum, chống nắng, chăm sóc da…',
      'Danh sách kiểm tra nút kêu gọi hành động + SKU chủ lực + mẫu giao diện — ảnh hưởng chuyển đổi',
      'Xem trước kết quả tìm kiếm TikTok'
    ],
    actions: [
      'Chỉnh tiêu đề/giới thiệu/đường dẫn rút gọn và lưu SEO',
      'Thêm từ khóa AI theo ngành Mỹ phẩm',
      'Sửa nút kêu gọi hành động hoặc ghim SKU nếu danh sách kiểm tra chuyển đổi còn thiếu'
    ],
    sellerNote: 'Giới thiệu nên ghi rõ ngành hàng + điểm bán hàng độc nhất (mỹ phẩm sạch, được bác sĩ da liễu khuyên dùng…) — giúp TikTok gợi ý shop đúng đối tượng và giảm tỷ lệ thoát.'
  }
};
