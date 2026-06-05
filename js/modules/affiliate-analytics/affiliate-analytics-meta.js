/* Phân tích tiếp thị liên kết — mô tả tab (góc nhìn người bán) */

const AFFILIATE_ANALYTICS_TAB_META = {
  creator: sellerMeta(
    'Phân tích tiếp thị liên kết · Hiệu suất người sáng tạo',
    'Đo hiệu suất người sáng tạo trên sàn giao dịch và đóng góp GMV (doanh thu gộp).',
    ['Bảng hiệu suất sàn giao dịch',
      'Biểu đồ đóng góp tiếp thị liên kết',
      'Tỷ trọng GMV (doanh thu gộp) người sáng tạo hàng đầu',
      'Hoa hồng đã trả'],
    ['Tuyển người sáng tạo tương tự người hiệu suất cao nhất',
      'Điều chỉnh hạng hoa hồng',
      'Phân tích người sáng tạo rời bỏ'],
    'Người sáng tạo sàn giao dịch mới cần 2–4 tuần khởi động — đừng đánh giá ROI (tỷ suất đầu tư) tuần đầu.'
  ),
  campaign_roi: sellerMeta(
    'Phân tích tiếp thị liên kết · ROI (tỷ suất đầu tư) chiến dịch',
    'So sánh ROI (tỷ suất đầu tư) chiến dịch tiếp thị liên kết sau hoa hồng và giá vốn hàng bán.',
    ['Chi tiêu, GMV (doanh thu gộp), ROI (tỷ suất đầu tư) từng chiến dịch',
      'Chi trả hoa hồng',
      'Ước tính lợi nhuận ròng',
      'So sánh chiến dịch'],
    ['Tăng quy mô chiến dịch lợi nhuận ròng dương cao',
      'Tạm dừng chiến dịch lợi nhuận ròng âm',
      'Sao chép cấu trúc chiến dịch thắng'],
    'Lợi nhuận ròng = GMV (doanh thu gộp) - chi tiêu - hoa hồng - ước tính giá vốn hàng bán — ROI (tỷ suất đầu tư) gộp có thể gây hiểu nhầm.'
  )
};
