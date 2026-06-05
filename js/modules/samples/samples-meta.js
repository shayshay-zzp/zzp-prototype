/* Gửi mẫu — mô tả tab (góc nhìn người bán) */

const SAMPLES_TAB_META = {
  roi_overview: sellerMeta(
    'Vận hành mẫu · ROI (tỷ suất đầu tư) tổng quan',
    'Đo hiệu quả chương trình gửi mẫu — tỷ lệ chuyển đổi và ROI (tỷ suất đầu tư) trung bình.',
    ['Phễu chuyển đổi gửi mẫu',
      'ROI (tỷ suất đầu tư) trung bình chương trình',
      'Số mẫu chưa có nội dung',
      'Biểu đồ trạng thái mẫu'],
    ['Theo dõi lại mẫu chưa có nội dung',
      'Tăng ngân sách mẫu SKU có ROI (tỷ suất đầu tư) cao',
      'Rà soát yêu cầu nội dung gửi mẫu'],
    'ROI (tỷ suất đầu tư) mẫu < 3x sau 30 ngày → cân nhắc dừng gửi SKU đó cho người sáng tạo mới.'
  ),
  pipeline: sellerMeta(
    'Vận hành mẫu · Theo dõi phễu',
    'Theo dõi từng mẫu qua các bước: gửi → nhận → nội dung → chuyển đổi.',
    ['Sơ đồ phễu mẫu',
      'Bảng cột theo trạng thái',
      'Mẫu kẹt ở từng bước',
      'Thời gian chuyển đổi trung bình'],
    ['Nhắc người sáng tạo chưa đăng nội dung',
      'Đánh dấu mẫu đã chuyển đổi',
      'Hủy mẫu quá hạn'],
    'Mẫu ở trạng thái đã gửi > 7 ngày chưa có nội dung cần nhắn người sáng tạo trong 24h.'
  ),
  table: sellerMeta(
    'Vận hành mẫu · Bảng theo dõi',
    'Tra cứu chi tiết từng mẫu: KOC, SKU, chi phí, ROI (tỷ suất đầu tư).',
    ['Mã mẫu, KOC, sản phẩm',
      'Ngày gửi, trạng thái',
      'Chi phí mẫu và ROI (tỷ suất đầu tư)',
      'Bấm mở chi tiết'],
    ['Mở chi tiết mẫu đã chuyển đổi để học thực hành tốt',
      'Đánh dấu mẫu chưa có nội dung',
      'Xuất cho kế toán'],
    'Sắp xếp theo ROI (tỷ suất đầu tư) để biết kết hợp KOC × SKU nào nên nhân rộng.'
  )
};
