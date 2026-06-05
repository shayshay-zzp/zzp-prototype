/* Content — tab Hiệu suất video */

function renderContentTabPerformance() {
  return card('Performance theo nội dung', tableWrap(['Video', 'KOC', 'Views', 'Đơn', 'GMV', 'CTR', 'Trạng thái'],
    ZZP_DATA.content.map(c => {
      const k = ZZP_DATA.kocs.find(x => x.id === c.koc);
      return `<tr ${rowClick('content', c.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-medium">${c.title.slice(0, 28)}</td>
        <td class="px-3">${k?.name || '—'}</td>
        <td class="px-3">${c.views ? fmt(c.views) : '—'}</td>
        <td class="px-3">${c.orders || '—'}</td>
        <td class="px-3">${c.gmv ? fmt(c.gmv) : '—'}</td>
        <td class="px-3">${c.ctr ? c.ctr + '%' : '—'}</td>
        <td class="px-3">${badge(c.status, c.status === 'published' ? 'ok' : 'pending')}</td>
      </tr>`;
    }).join('')));
}
