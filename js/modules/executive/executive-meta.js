/* Executive — mô tả tab (seller POV) */

const EXECUTIVE_TAB_META = {
  overview: sellerMeta(
    'CEO / GM · Executive dashboard',
    'Nắm trend doanh thu tổng thể và health business một glance.',
    ['Biểu đồ revenue trend',
      'GMV MTD vs target',
      'Growth rate',
      'Key milestones'],
    ['Drill-down sang revenue module',
      'Share snapshot với investor',
      'Set target tháng mới'],
    'Executive view aggregate — chi tiết kênh xem tab Phân bổ GMV.'
  ),
  gmv_breakdown: sellerMeta(
    'CEO / Finance · GMV breakdown',
    'Hiểu cơ cấu GMV theo kênh để ra quyết định đầu tư.',
    ['GMV theo kênh: Affiliate, Live, Ads, Organic',
      'Tỷ trọng % từng kênh',
      'Trend so kỳ trước',
      'Contribution margin sơ bộ'],
    ['Rebalance ngân sách marketing',
      'Thảo luận với team kênh underperform',
      'Export cho board meeting'],
    'Diversification kênh giảm rủi ro — không nên > 50% GMV từ 1 kênh.'
  )
};
