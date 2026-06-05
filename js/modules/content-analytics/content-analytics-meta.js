/* Phân tích nội dung — mô tả tab (góc nhìn người bán) */

const CONTENT_ANALYTICS_TAB_META = {
  charts: sellerMeta(
    'Phân tích nội dung · Biểu đồ',
    'Trực quan hóa tỷ lệ chuyển đổi và lượt xem từng video để tìm mẫu nội dung thắng.',
    ['Biểu đồ tỷ lệ chuyển đổi theo video',
      'Biểu đồ lượt xem theo video',
      'Phát hiện ngoại lệ',
      'So sánh định dạng'],
    ['Nhân rộng định dạng video tỷ lệ chuyển đổi cao',
      'Tăng tốc lượt xem cao tỷ lệ chuyển đổi thấp (vấn đề mở đầu)',
      'Gửi yêu cầu nội dung cho KOC theo định dạng hàng đầu'],
    'Tỷ lệ chuyển đổi > 2% trên nội dung TikTok Shop là mạnh — nghiên cứu 3 giây mở đầu của video đó.'
  ),
  video_table: sellerMeta(
    'Phân tích nội dung · Bảng video',
    'Bảng chi tiết hiệu suất video đã đăng.',
    ['Tiêu đề video, lượt xem, tỷ lệ nhấp',
      'Đơn hàng và GMV (doanh thu gộp)',
      'Bấm mở chi tiết',
      'Lọc chỉ video đã đăng'],
    ['Gắn Spark Ads video GMV (doanh thu gộp) cao nhất',
      'Lưu trữ video GMV (doanh thu gộp) = 0 sau 30 ngày',
      'Chia sẻ thực hành tốt nội bộ'],
    'Sắp xếp theo GMV (doanh thu gộp) không phải lượt xem — video lan truyền không chuyển đổi vẫn tốn phí người sáng tạo.'
  )
};
