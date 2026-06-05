/* Affiliate — tab Creator & GMV */

function renderAffiliateTabCreatorGmv() {
  return card('Hiệu suất nhà sáng tạo', renderTtsBreakdownTable('affiliate')) +
    chartGrid([['GMV theo KOC', 'chart-affiliate', 'md'], ['Phân bổ hạng', 'chart-aff-tier', 'sm']]);
}
