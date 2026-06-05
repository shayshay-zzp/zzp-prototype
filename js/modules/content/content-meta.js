/* Nội dung — mô tả tab (góc nhìn người bán) */

const CONTENT_TAB_META = {
  calendar: sellerMeta(
    'Vận hành nội dung · Lịch sản xuất',
    'Lên lịch video, yêu cầu nội dung và hạn đăng nội dung từ KOC/đại lý.',
    ['Lịch nội dung theo tuần',
      'Nhiệm vụ chờ xử lý so với đã đăng',
      'KOC gắn từng video',
      'Hạn chót và trạng thái'],
    ['Thêm nhiệm vụ nội dung mới',
      'Nhắc KOC hạn chót',
      'Gắn Spark Ads cho video đang nổi'],
    'Đăng đều 3–4 video/tuần giúp thuật toán TikTok Shop ổn định hơn đăng ồ ạt rồi im lặng.'
  ),
  performance: sellerMeta(
    'Phân tích nội dung · Hiệu suất video',
    'Đo lượt xem, tỷ lệ nhấp, đơn và GMV (doanh thu gộp) từng video để tăng quy mô nội dung hiệu quả.',
    ['Lượt xem, tỷ lệ nhấp, đơn hàng, GMV (doanh thu gộp)/video',
      'KOC sản xuất',
      'Trạng thái đã đăng/chờ xử lý',
      'Bấm mở chi tiết video'],
    ['Tăng tốc video có tỷ lệ nhấp > 3% bằng Spark Ads',
      'Gửi lại yêu cầu nội dung định dạng video chuyển đổi cao',
      'Lưu trữ video hiệu suất thấp'],
    'Video lượt xem cao nhưng tỷ lệ nhấp thấp → thường do mở đầu yếu hoặc liên kết SKU sai.'
  )
};
