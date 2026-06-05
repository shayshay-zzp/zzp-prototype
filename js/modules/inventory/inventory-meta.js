/* Tồn kho — mô tả tab (góc nhìn người bán) */

const INVENTORY_TAB_META = {
  stock: sellerMeta(
    'Tồn kho · Tồn kho SKU',
    'Nắm mức tồn từng SKU và tốc độ bán để tránh hết hàng.',
    ['Đồng hồ tồn kho theo SKU',
      'Tốc độ bán/ngày',
      'Số ngày còn lại trước khi hết hàng',
      'Mức độ cảnh báo'],
    ['Tạo đơn đặt hàng cho SKU < 7 ngày',
      'Giảm quảng cáo SKU sắp hết',
      'Đồng bộ tồn Seller Center'],
    'SKU chủ lực hết hàng = mất GMV (doanh thu gộp) live + tiếp thị liên kết cùng lúc — ưu tiên P001/P005.'
  ),
  alerts: sellerMeta(
    'Vận hành · Cảnh báo tồn kho',
    'Phát hiện SKU sắp hết hàng và kích hoạt nhập hàng ngay.',
    ['Cảnh báo khẩn cấp (P003 Collagen…)',
      'SKU tồn < 200',
      'Tốc độ bán và số ngày còn lại',
      'Nút chạy quy trình nhập hàng'],
    ['Chạy tự động hóa FLOW_STOCK',
      'Tạm dừng quảng cáo SKU khẩn cấp',
      'Thông báo team live/tiếp thị liên kết'],
    'Hết hàng 2 ngày có thể mất thứ hạng TikTok Shop — xử lý cảnh báo trong 24h.'
  ),
  forecast: sellerMeta(
    'Chuỗi cung ứng · Dự báo nhập hàng',
    'Lên kế hoạch đơn đặt hàng dựa trên tốc độ bán và thời gian giao hàng nhà cung cấp.',
    ['Dự báo ngày hết hàng',
      'Đề xuất số lượng đơn đặt hàng',
      'Mức độ Khẩn cấp/Thấp/Ổn',
      'Bán/ngày theo SKU'],
    ['Tạo đơn đặt hàng theo khuyến nghị',
      'Điều chỉnh số lượng đặt tối thiểu với nhà cung cấp',
      'Xuất dự báo cho kế toán'],
    'Thời gian giao hàng 14 ngày → đặt hàng khi còn 21 ngày tồn, không đợi mức Khẩn cấp.'
  )
};
