/* Phân tích live — mô tả tab (góc nhìn người bán) */

const LIVE_ANALYTICS_TAB_META = {
  session_metrics: sellerMeta(
    'Phân tích live · Chỉ số phiên',
    'Chỉ số chi tiết từng phiên live: người xem, chuyển đổi, GMV (doanh thu gộp).',
    ['Phân tích chỉ số theo phiên',
      'Đỉnh người xem, thời gian xem trung bình',
      'Tỷ lệ chuyển đổi live',
      'GMV (doanh thu gộp) mỗi phiên'],
    ['So sánh hiệu suất người dẫn live',
      'Tối ưu tỷ lệ SKU phiên hiệu suất thấp',
      'Lên lịch phát lại phiên hàng đầu'],
    'Chuyển đổi live 3–5% là chuẩn tốt ngành mỹ phẩm Việt Nam.'
  ),
  comparison: sellerMeta(
    'Phân tích live · Dự kiến so với thực tế',
    'So sánh GMV (doanh thu gộp) dự kiến so với thực tế để cải thiện dự báo.',
    ['GMV (doanh thu gộp) dự kiến mỗi phiên',
      'GMV (doanh thu gộp) thực tế đạt được',
      'Chênh lệch % dương/âm',
      'Xu hướng độ chính xác dự báo'],
    ['Rà soát phiên chênh lệch > -20%',
      'Điều chỉnh mô hình dự báo',
      'Khen thưởng người dẫn live vượt dự báo'],
    'Dự báo thấp liên tục → thiếu tồn kho live; dự báo cao → đội live mất động lực.'
  )
};
