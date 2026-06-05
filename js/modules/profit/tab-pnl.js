/* Profit — tab P&L tổng */

function renderProfitTabPnl() {
  return card('Tài chính — Thanh toán & phí', renderTtsFinanceStrip()) +
    card('Phân tích P&L', '<div class="chart-box"><canvas id="chart-pnl"></canvas></div>');
}
