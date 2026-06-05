/* Content Analytics — tab Bảng video */

function renderContentAnalyticsTabVideoTable() {
  return card('Hiệu suất nội dung', tableWrap(['Video', 'Lượt xem', 'CTR', 'Đơn', 'GMV'],
    ZZP_DATA.content.filter(c => c.views).map(c => `<tr ${rowClick('content', c.id)} class="border-b border-slate-50">
      <td class="py-3 px-3">${c.title.slice(0, 30)}</td><td class="px-3">${fmt(c.views)}</td><td class="px-3">${c.ctr}%</td><td class="px-3">${c.orders}</td><td class="px-3">${fmt(c.gmv)}</td></tr>`).join('')));
}
