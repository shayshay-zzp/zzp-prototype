/* Returns — mô tả tab (seller POV) */

const RETURNS_TAB_META = {
  cases: sellerMeta(
    'CS · Hoàn trả & hủy đơn',
    'Xử lý case hoàn/hủy theo timeline và giảm return rate.',
    ['Timeline từng case hoàn/hủy',
      'Lý do return',
      'Trạng thái xử lý',
      'SKU liên quan'],
    ['Phản hồi case pending',
      'Phân tích lý do return theo SKU',
      'Escalate case phức tạp'],
    'Return rate > 5% trên 1 SKU → kiểm tra mô tả sản phẩm và QC lô hàng.'
  ),
  stats: sellerMeta(
    'Ops · Return analytics',
    'So sánh return rate shop với benchmark ngành.',
    ['Return rate shop vs benchmark 4.8%',
      'Tổng hoàn tiền',
      'Số đơn hoàn/hủy',
      'Đánh giá tốt/xấu'],
    ['Investigate nếu vượt benchmark',
      'Báo cáo return theo SKU cho merchandising',
      'Cải thiện mô tả SP return cao'],
    'Return rate thấp hơn benchmark giúp shop score TikTok — duy trì < 5%.'
  )
};
