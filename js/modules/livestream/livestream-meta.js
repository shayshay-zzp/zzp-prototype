/* Livestream — mô tả tab (seller POV) */

const LIVESTREAM_TAB_META = {
  performance: sellerMeta(
    'Live Ops · Hiệu suất live',
    'Theo dõi GMV, conversion và metrics live so với mục tiêu.',
    ['Breakdown GMV live theo session',
      'Conversion rate live',
      'AOV phiên live',
      'So sánh kỳ trước'],
    ['Scale host GMV cao',
      'Điều chỉnh SKU pin trong live',
      'Review script phiên underperform'],
    'Live conversion phụ thuộc pin SKU + voucher — chuẩn bị trước 48h.'
  ),
  sessions: sellerMeta(
    'Live Ops · Quản lý phiên',
    'Chuẩn bị và theo dõi từng phiên live: checklist, host, GMV dự kiến.',
    ['Danh sách phiên sắp/chạy/xong',
      'Checklist chuẩn bị %',
      'Host KOC và thời lượng',
      'GMV kỳ trước vs dự kiến'],
    ['Hoàn thành checklist trước live',
      'Mở profile host KOC',
      'Cập nhật GMV thực tế sau live'],
    'Checklist < 80% trước 2h live → delay hoặc chuyển host backup.'
  )
};
