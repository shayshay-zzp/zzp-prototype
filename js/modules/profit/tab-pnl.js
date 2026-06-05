/* Profit — tab P&L tổng */

function renderProfitTabPnl() {
  return card('Tài chính — Settlement & phí', renderTtsFinanceStrip()) +
    card('P&L Breakdown', '<div class="chart-box"><canvas id="chart-pnl"></canvas></div>');
}
