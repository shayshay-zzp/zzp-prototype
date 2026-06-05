/* Samples — mô tả tab (seller POV) */

const SAMPLES_TAB_META = {
  roi_overview: sellerMeta(
    'Sample Ops · ROI tổng quan',
    'Đo hiệu quả chương trình gửi mẫu — convert rate và ROI trung bình.',
    ['Funnel conversion sample',
      'ROI trung bình chương trình',
      'Số mẫu chưa có content',
      'Biểu đồ trạng thái mẫu'],
    ['Follow-up mẫu no_content',
      'Tăng budget sample SKU ROI cao',
      'Review brief gửi mẫu'],
    'ROI sample < 3x sau 30 ngày → cân nhắc dừng gửi SKU đó cho creator mới.'
  ),
  pipeline: sellerMeta(
    'Sample Ops · Pipeline tracking',
    'Theo dõi từng mẫu qua các bước: gửi → nhận → content → convert.',
    ['Flow diagram pipeline mẫu',
      'Kanban theo trạng thái',
      'Mẫu stuck ở từng bước',
      'Thời gian trung bình convert'],
    ['Nhắc creator chưa đăng content',
      'Đánh dấu mẫu converted',
      'Hủy mẫu quá hạn'],
    'Mẫu ở trạng thái shipped > 7 ngày chưa content cần ping creator trong 24h.'
  ),
  table: sellerMeta(
    'Sample Ops · Bảng tracking',
    'Tra cứu chi tiết từng mẫu: KOC, SKU, chi phí, ROI.',
    ['Mã mẫu, KOC, sản phẩm',
      'Ngày gửi, trạng thái',
      'Chi phí mẫu và ROI',
      'Click mở chi tiết'],
    ['Mở chi tiết mẫu converted để học best practice',
      'Flag mẫu no_content',
      'Export cho kế toán'],
    'Sort theo ROI để biết combo KOC × SKU nào nên replicate.'
  )
};
