/* KOC — mô tả tab (góc nhìn người bán) */

const KOC_TAB_META = {
  pipeline: sellerMeta(
    'Quản lý KOC · Phễu quản lý quan hệ khách hàng',
    'Quản lý người sáng tạo qua các giai đoạn vòng đời từ tiềm năng đến doanh thu.',
    ['Bảng cột vòng đời: tiềm năng → gửi mẫu → nội dung → doanh thu',
      'Số KOC từng giai đoạn',
      'GMV (doanh thu gộp) theo giai đoạn',
      'Người sáng tạo cần theo dõi lại'],
    ['Chuyển KOC sang giai đoạn tiếp theo',
      'Gửi mẫu cho tiềm năng nóng',
      'Lưu trữ người sáng tạo không phản hồi'],
    'Người sáng tạo kẹt ở gửi mẫu > 14 ngày thường cần yêu cầu nội dung mới hoặc đổi SKU mẫu.'
  ),
  scoreboard: sellerMeta(
    'Quản lý KOC · Điểm & xếp hạng',
    'Xếp hạng người sáng tạo theo điểm, GMV (doanh thu gộp) và ROI (tỷ suất đầu tư) để ưu tiên hợp tác.',
    ['Điểm tổng hợp từng KOC',
      'Hạng, GMV (doanh thu gộp) 30 ngày, ROI (tỷ suất đầu tư)',
      'Giai đoạn vòng đời',
      'Số video đã đăng'],
    ['Mở chi tiết KOC điểm cao',
      'Gia hạn hợp đồng người hiệu suất cao nhất',
      'Huấn luyện người sáng tạo điểm thấp'],
    'Điểm ≥ 80 + ROI (tỷ suất đầu tư) > 5x là nhóm nên tăng hoa hồng hoặc ưu đãi độc quyền.'
  )
};
