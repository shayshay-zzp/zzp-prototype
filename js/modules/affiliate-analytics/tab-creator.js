/* Affiliate Analytics — tab Creator */

function renderAffiliateAnalyticsTabCreator() {
  return card('Hiệu suất sàn nhà sáng tạo', renderTtsBreakdownTable('affiliate-analytics')) +
    card('Đóng góp Affiliate', '<div class="chart-box"><canvas id="chart-aff-contrib"></canvas></div>');
}
