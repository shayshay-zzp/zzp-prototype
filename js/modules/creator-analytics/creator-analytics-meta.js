/* Phân tích người sáng tạo — mô tả tab (góc nhìn người bán) */

const CREATOR_ANALYTICS_TAB_META = {
  scorecard: sellerMeta(
    'Phân tích người sáng tạo · Bảng điểm',
    'Bảng điều khiển điểm từng người sáng tạo: tương tác, GMV (doanh thu gộp), chất lượng nội dung.',
    ['Lưới bảng điểm KOC',
      'Điểm, hạng, vòng đời',
      'GMV (doanh thu gộp) và ROI (tỷ suất đầu tư)',
      'Sản lượng video'],
    ['Gia hạn bảng điểm hàng đầu',
      'Huấn luyện người sáng tạo điểm trung bình',
      'Lưu trữ người sáng tạo không hoạt động'],
    'Bảng điểm giúp so sánh người sáng tạo cùng hạng — dùng cho rà soát hàng quý.'
  ),
  ranking: sellerMeta(
    'Phân tích người sáng tạo · Xếp hạng',
    'Bảng xếp hạng người sáng tạo theo điểm và GMV (doanh thu gộp).',
    ['Hạng KOC theo điểm',
      'GMV (doanh thu gộp) 30 ngày, ROI (tỷ suất đầu tư), hạng',
      'Giai đoạn vòng đời',
      'Số video'],
    ['Mời hạng cao nhất vào chương trình độc quyền',
      'Thương lượng lại hoa hồng hạng thấp',
      'Xuất báo cáo xếp hạng'],
    'Hạng người sáng tạo giảm 2 tháng liên tiếp → rà soát hợp đồng trước khi gia hạn.'
  )
};
