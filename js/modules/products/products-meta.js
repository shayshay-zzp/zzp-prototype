/* Sản phẩm — mô tả tab (góc nhìn người bán) */

const PRODUCTS_TAB_META = {
  lifecycle: sellerMeta(
    'Trưng bày sản phẩm · Vòng đời sản phẩm',
    'Theo dõi SKU qua các giai đoạn: nháp → đang bán → chủ lực → thanh lý.',
    ['Trạng thái vòng đời từng SKU',
      'Điểm trang sản phẩm và tuân thủ',
      'Chủ lực so với không chủ lực',
      'SKU cần tối ưu trang sản phẩm'],
    ['Đưa SKU lên chủ lực',
      'Sửa trang sản phẩm vi phạm tuân thủ',
      'Thanh lý SKU tồn cao'],
    'SKU vi phạm tuân thủ vẫn hiện trên shop nếu đã xuất bản — ưu tiên sửa trước chiến dịch.'
  ),
  gmv_sku: sellerMeta(
    'Trưng bày sản phẩm · GMV (doanh thu gộp) theo SKU',
    'Biết SKU nào mang doanh thu chính để ghim shop và phân bổ tiếp thị.',
    ['Biểu đồ GMV (doanh thu gộp) 30 ngày theo SKU',
      'Top so với hiệu suất thấp',
      'Xu hướng GMV (doanh thu gộp) SKU chủ lực',
      'So sánh chéo SKU'],
    ['Ghim GMV (doanh thu gộp) cao nhất lên trang cửa hàng',
      'Gộp SKU bán chậm với chủ lực',
      'Điều chỉnh giá SKU hiệu suất thấp'],
    '3 SKU hàng đầu thường > 60% GMV (doanh thu gộp) — đảm bảo tồn kho và điểm trang sản phẩm luôn xanh.'
  )
};
