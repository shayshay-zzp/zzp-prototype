/* Returns — tab Thống kê */

function renderReturnsTabStats() {
  return card('Return rate & benchmark', tableWrap(['Chỉ số', 'Shop', 'Benchmark', 'Đánh giá'],
    [['Return rate', TTS_METRICS.shop.returnRate + '%', '4.8%', badge('Tốt hơn', 'ok')],
      ['Hoàn tiền', fmt(TTS_METRICS.shop.refunds), '—', badge('Theo dõi', 'info')],
      ['Đơn hoàn', TTS_METRICS.shop.cancellationsAndReturns, '—', badge('OK', 'ok')]]
      .map(r => `<tr class="border-b border-slate-50">${r.map(c => `<td class="py-3 px-3">${c}</td>`).join('')}</tr>`).join('')));
}
