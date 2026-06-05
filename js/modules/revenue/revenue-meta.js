/* Doanh thu — mô tả tab (góc nhìn người bán) */

const REVENUE_TAB_META = {
  by_channel: sellerMeta(
    'Tài chính / Tăng trưởng · Doanh thu theo kênh',
    'Phân tích GMV (doanh thu gộp) và phân bổ nguồn theo loại nội dung/kênh.',
    ['Phân tích GMV (doanh thu gộp) theo loại nội dung',
      'Biểu đồ phân bổ nguồn',
      'Tiếp thị liên kết so với Live so với Quảng cáo',
      'Đóng góp kênh tự nhiên'],
    ['Tối ưu tỷ lệ kênh',
      'So sánh với mục tiêu tháng',
      'Đối chiếu với chi tiêu quảng cáo'],
    'Phân bổ nguồn TikTok có cửa sổ 7–14 ngày — đối chiếu với trình quản lý quảng cáo.'
  ),
  by_product: sellerMeta(
    'Trưng bày sản phẩm / Tài chính · Doanh thu theo SKU',
    'Biết SKU chủ lực kiếm tiền từ kênh nào để tối ưu trang sản phẩm và chiến dịch.',
    ['GMV (doanh thu gộp) SKU chủ lực × kênh',
      'Phân bổ Tiếp thị liên kết/Live/Quảng cáo/Tự nhiên',
      'Tổng GMV (doanh thu gộp) SKU',
      'SKU phụ thuộc 1 kênh'],
    ['Đa dạng hóa kênh cho SKU chỉ có 1 nguồn',
      'Tăng live cho SKU tiếp thị liên kết mạnh',
      'Rà soát giá theo kênh'],
    'SKU 80% GMV (doanh thu gộp) từ live → cần người dẫn live dự phòng và tồn kho trước phiên live lớn.'
  )
};
