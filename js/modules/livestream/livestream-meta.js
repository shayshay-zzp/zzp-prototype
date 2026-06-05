/* Livestream — mô tả tab (góc nhìn người bán) */

const LIVESTREAM_TAB_META = {
  performance: sellerMeta(
    'Vận hành live · Hiệu suất phiên live',
    'Theo dõi GMV (doanh thu gộp), chuyển đổi và chỉ số live so với mục tiêu.',
    ['Phân tích GMV (doanh thu gộp) live theo phiên',
      'Tỷ lệ chuyển đổi live',
      'Giá trị đơn trung bình phiên live',
      'So sánh kỳ trước'],
    ['Tăng quy mô người dẫn live có GMV (doanh thu gộp) cao',
      'Điều chỉnh SKU ghim trong live',
      'Rà soát kịch bản phiên hiệu suất thấp'],
    'Chuyển đổi live phụ thuộc ghim SKU + phiếu giảm giá — chuẩn bị trước 48h.'
  ),
  sessions: sellerMeta(
    'Vận hành live · Quản lý phiên',
    'Chuẩn bị và theo dõi từng phiên live: danh sách kiểm tra, người dẫn live, GMV (doanh thu gộp) dự kiến.',
    ['Danh sách phiên sắp diễn ra/đang chạy/đã xong',
      'Danh sách kiểm tra chuẩn bị %',
      'Người dẫn live KOC và thời lượng',
      'GMV (doanh thu gộp) kỳ trước so với dự kiến'],
    ['Hoàn thành danh sách kiểm tra trước live',
      'Mở hồ sơ người dẫn live KOC',
      'Cập nhật GMV (doanh thu gộp) thực tế sau live'],
    'Danh sách kiểm tra < 80% trước 2h live → hoãn hoặc chuyển người dẫn live dự phòng.'
  )
};
