/* Lợi nhuận — mô tả tab (góc nhìn người bán) */

const PROFIT_TAB_META = {
  pnl: sellerMeta(
    'Tài chính · Báo cáo lãi lỗ tổng',
    'Theo dõi lợi nhuận sau giá vốn hàng bán, phí nền tảng và tiếp thị.',
    ['Dải thanh toán — doanh thu thực nhận',
      'Biểu đồ phân tích báo cáo lãi lỗ',
      'Biên gộp so với biên ròng',
      'Phí TikTok Shop'],
    ['Rà soát phí nền tảng tăng bất thường',
      'Cắt chi phí kênh biên âm',
      'Xuất báo cáo lãi lỗ cho kế toán'],
    'Biên ròng < 10% trên TikTok Shop cần rà soát giá vốn hàng bán và cơ cấu hoa hồng.'
  ),
  by_product: sellerMeta(
    'Tài chính / Trưng bày sản phẩm · Lợi nhuận theo SKU',
    'Xác định SKU thực sự có lãi sau mọi chi phí.',
    ['GMV (doanh thu gộp), giá vốn hàng bán, chi phí phân bổ',
      'Lợi nhuận và biên %',
      'Lợi nhuận SKU chủ lực',
      'SKU biên âm tiềm ẩn'],
    ['Tăng giá SKU biên thấp',
      'Giảm mẫu/quảng cáo SKU lỗ',
      'Gộp SKU biên cao + biên thấp'],
    'GMV (doanh thu gộp) cao ≠ lãi — SKU chủ lực cần biên > 25% sau phí nền tảng.'
  )
};
