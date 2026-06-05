/* Tiếp thị liên kết — mô tả tab (góc nhìn người bán) */

const AFFILIATE_TAB_META = {
  overview: sellerMeta(
    'Quản lý tiếp thị liên kết · Phễu SAM (tiếp thị liên kết người bán)',
    'Theo dõi phễu Tiếp thị liên kết người bán — từ tiếp cận người sáng tạo đến GMV (doanh thu gộp) thực tế.',
    ['Phễu SAM (tiếp thị liên kết người bán): tiếp cận → gửi mẫu → nội dung → GMV (doanh thu gộp)',
      'Tỷ lệ chuyển đổi từng bước',
      'Người sáng tạo đang hoạt động so với tiềm năng',
      'GMV (doanh thu gộp) tiếp thị liên kết 30 ngày'],
    ['Xác định nút thắt phễu (gửi mẫu hay nội dung)',
      'Ưu tiên người sáng tạo có ROI (tỷ suất đầu tư) cao',
      'Mở chi tiết KOC từ phễu'],
    'Nếu bước gửi mẫu chuyển đổi thấp, kiểm tra yêu cầu nội dung và SKU gửi mẫu trước khi tăng hoa hồng.'
  ),
  creator_gmv: sellerMeta(
    'Vận hành người sáng tạo · Hiệu suất tiếp thị liên kết',
    'So sánh GMV (doanh thu gộp) và hạng người sáng tạo để biết ai đáng tăng hoa hồng hoặc gửi thêm mẫu.',
    ['Bảng phân tích GMV (doanh thu gộp) theo người sáng tạo',
      'Biểu đồ GMV (doanh thu gộp) KOC hàng đầu',
      'Phân bổ hạng (Nano/Micro/Macro)',
      'ROI (tỷ suất đầu tư) từng người sáng tạo'],
    ['Tăng quy mô người sáng tạo có ROAS (tỷ suất quảng cáo) > 5x',
      'Gửi mẫu cho người sáng tạo có lượt xem cao nhưng GMV (doanh thu gộp) thấp',
      'Mở sàn giao dịch tìm người sáng tạo mới'],
    '20% người sáng tạo hàng đầu thường mang 80% GMV (doanh thu gộp) tiếp thị liên kết — tab này giúp tập trung ngân sách đúng người.'
  ),
  campaigns: sellerMeta(
    'Vận hành chiến dịch · Chiến dịch tiếp thị liên kết',
    'Quản lý chiến dịch tiếp thị liên kết/khuyến mãi đang chạy và ROI (tỷ suất đầu tư) thực tế.',
    ['Danh sách chiến dịch tiếp thị liên kết & khuyến mãi',
      'Chi tiêu so với ngân sách, thời gian chạy',
      'ROI (tỷ suất đầu tư) và GMV (doanh thu gộp) từng chiến dịch',
      'Trạng thái đang chạy/tạm dừng'],
    ['Mở chi tiết chiến dịch để chỉnh hoa hồng',
      'Tạm dừng chiến dịch có ROI (tỷ suất đầu tư) < 2x',
      'Sao chép chiến dịch hiệu quả sang SKU mới'],
    'Chiến dịch khuyến mãi giảm giá sốc thường kéo GMV (doanh thu gộp) ngắn hạn — đối chiếu với biên lợi nhuận trước khi kéo dài.'
  )
};
