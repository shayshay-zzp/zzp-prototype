/* Điều hành — mô tả tab (góc nhìn người bán) */

const EXECUTIVE_TAB_META = {
  overview: sellerMeta(
    'Tổng giám đốc · Bảng điều khiển điều hành',
    'Nắm xu hướng doanh thu tổng thể và sức khỏe kinh doanh trong một cái nhìn.',
    ['Biểu đồ xu hướng doanh thu',
      'GMV (doanh thu gộp) tháng hiện tại so với mục tiêu',
      'Tốc độ tăng trưởng',
      'Cột mốc quan trọng'],
    ['Khoan sâu sang module doanh thu',
      'Chia sẻ ảnh chụp nhanh với nhà đầu tư',
      'Đặt mục tiêu tháng mới'],
    'Góc nhìn điều hành là tổng hợp — chi tiết kênh xem tab Phân bổ GMV (doanh thu gộp).'
  ),
  gmv_breakdown: sellerMeta(
    'Tổng giám đốc / Tài chính · Phân bổ GMV (doanh thu gộp)',
    'Hiểu cơ cấu GMV (doanh thu gộp) theo kênh để ra quyết định đầu tư.',
    ['GMV (doanh thu gộp) theo kênh: Tiếp thị liên kết, Live, Quảng cáo, Tự nhiên',
      'Tỷ trọng % từng kênh',
      'Xu hướng so kỳ trước',
      'Biên đóng góp sơ bộ'],
    ['Cân lại ngân sách tiếp thị',
      'Thảo luận với team kênh hiệu suất thấp',
      'Xuất cho cuộc họp hội đồng'],
    'Đa dạng hóa kênh giảm rủi ro — không nên > 50% GMV (doanh thu gộp) từ 1 kênh.'
  )
};
