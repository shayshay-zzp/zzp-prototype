/* Affiliate — tab Creator & GMV */

function renderAffiliateTabCreatorGmv() {
  return card('Hiệu suất Creator', renderTtsBreakdownTable('affiliate')) +
    chartGrid([['GMV theo KOC', 'chart-affiliate', 'md'], ['Phân bổ tier', 'chart-aff-tier', 'sm']]);
}
