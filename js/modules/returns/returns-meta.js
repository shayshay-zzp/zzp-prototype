/* Hoàn trả — mô tả tab (góc nhìn người bán) */

const RETURNS_TAB_META = {
  cases: sellerMeta(
    'Chăm sóc khách hàng · Hoàn trả & hủy đơn',
    'Xử lý hồ sơ hoàn/hủy theo dòng thời gian và giảm tỷ lệ hoàn trả.',
    ['Dòng thời gian từng hồ sơ hoàn/hủy',
      'Lý do hoàn trả',
      'Trạng thái xử lý',
      'SKU liên quan'],
    ['Phản hồi hồ sơ chờ xử lý',
      'Phân tích lý do hoàn trả theo SKU',
      'Chuyển cấp hồ sơ phức tạp'],
    'Tỷ lệ hoàn trả > 5% trên 1 SKU → kiểm tra mô tả sản phẩm và kiểm soát chất lượng lô hàng.'
  ),
  stats: sellerMeta(
    'Vận hành · Phân tích hoàn trả',
    'So sánh tỷ lệ hoàn trả shop với chuẩn ngành.',
    ['Tỷ lệ hoàn trả shop so với chuẩn 4.8%',
      'Tổng hoàn tiền',
      'Số đơn hoàn/hủy',
      'Đánh giá tốt/xấu'],
    ['Điều tra nếu vượt chuẩn',
      'Báo cáo hoàn trả theo SKU cho trưng bày sản phẩm',
      'Cải thiện mô tả sản phẩm có tỷ lệ hoàn trả cao'],
    'Tỷ lệ hoàn trả thấp hơn chuẩn giúp điểm shop TikTok — duy trì < 5%.'
  )
};
