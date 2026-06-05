/* Revenue — mô tả tab (seller POV) */

const REVENUE_TAB_META = {
  by_channel: sellerMeta(
    'Finance / Growth · Revenue by channel',
    'Phân tích GMV và attribution theo loại content/kênh.',
    ['Breakdown GMV content type',
      'Attribution chart',
      'Affiliate vs Live vs Ads',
      'Organic contribution'],
    ['Tối ưu mix kênh',
      'So sánh với target monthly',
      'Align với ads spend'],
    'Attribution TikTok có window 7–14 ngày — đối chiếu với ads manager.'
  ),
  by_product: sellerMeta(
    'Merchandising / Finance · Revenue by SKU',
    'Biết SKU hero kiếm tiền từ kênh nào để tối ưu listing và campaign.',
    ['GMV hero SKU × kênh',
      'Affiliate/Live/Ads/Organic split',
      'Tổng GMV SKU',
      'SKU phụ thuộc 1 kênh'],
    ['Đa dạng hóa kênh cho SKU single-source',
      'Tăng live cho SKU affiliate mạnh',
      'Review pricing theo kênh'],
    'SKU 80% GMV từ live → cần backup host và tồn kho trước mega live.'
  )
};
