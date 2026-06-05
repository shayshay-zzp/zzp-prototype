/* Affiliate Analytics — tab Creator */

function renderAffiliateAnalyticsTabCreator() {
  return card('Creator Marketplace Performance', renderTtsBreakdownTable('affiliate-analytics')) +
    card('Affiliate Contribution', '<div class="chart-box"><canvas id="chart-aff-contrib"></canvas></div>');
}
