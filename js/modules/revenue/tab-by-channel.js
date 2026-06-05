/* Revenue — tab Theo kênh */

function renderRevenueTabByChannel() {
  return card('GMV Breakdown — Content Type', renderTtsBreakdownTable('revenue')) +
    card('Attribution Analysis', '<div class="chart-box"><canvas id="chart-attribution"></canvas></div>');
}
