/* Profit — mô tả tab (seller POV) */

const PROFIT_TAB_META = {
  pnl: sellerMeta(
    'Finance · P&L tổng',
    'Theo dõi lợi nhuận sau COGS, phí platform và marketing.',
    ['Settlement strip — doanh thu thực nhận',
      'P&L breakdown chart',
      'Gross vs net margin',
      'Phí TikTok Shop'],
    ['Review phí platform tăng bất thường',
      'Cắt chi phí kênh margin âm',
      'Export P&L cho kế toán'],
    'Net margin < 10% trên TikTok Shop cần review COGS và commission structure.'
  ),
  by_product: sellerMeta(
    'Finance / Merchandising · Profit by SKU',
    'Xác định SKU thực sự có lãi sau mọi chi phí.',
    ['GMV, COGS, chi phí phân bổ',
      'Lợi nhuận và margin %',
      'Hero SKU profitability',
      'SKU margin âm tiềm ẩn'],
    ['Tăng giá SKU margin thấp',
      'Giảm sample/ads SKU lỗ',
      'Bundle SKU margin cao + thấp'],
    'GMV cao ≠ lãi — SKU hero cần margin > 25% sau phí platform.'
  )
};
