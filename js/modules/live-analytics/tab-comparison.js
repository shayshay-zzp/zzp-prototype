/* Live Analytics — tab So sánh */

function renderLiveAnalyticsTabComparison() {
  return card('GMV dự kiến vs thực tế', tableWrap(['Phiên', 'Dự kiến', 'Thực tế', 'Chênh lệch'],
    ZZP_DATA.liveSessions.map(l => {
      const gap = l.expectedGmv ? ((l.pastGmv || 0) / l.expectedGmv * 100 - 100).toFixed(0) : '—';
      return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${l.title.slice(0, 24)}</td><td class="px-3">${fmt(l.expectedGmv)}</td><td class="px-3">${fmt(l.pastGmv)}</td><td class="px-3 ${Number(gap) < 0 ? 'text-red-600' : 'text-green-600'}">${gap}%</td></tr>`;
    }).join('')));
}
