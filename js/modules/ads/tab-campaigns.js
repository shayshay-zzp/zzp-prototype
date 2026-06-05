/* Ads — tab Campaigns */

function renderAdsTabCampaigns() {
  return chartGrid([['ROAS theo chiến dịch', 'chart-ads-roas', 'sm'], ['Chi tiêu Ads', 'chart-ads-spend', 'sm']]) +
    card('Chiến dịch quảng cáo', renderTtsBreakdownTable('ads'));
}
