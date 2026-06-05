/* Revenue — tab Theo kênh */

function renderRevenueTabByChannel() {
  return card('Phân bổ GMV — loại nội dung', renderTtsBreakdownTable('revenue')) +
    card('Phân tích phân bổ nguồn', '<div class="chart-box"><canvas id="chart-attribution"></canvas></div>');
}
