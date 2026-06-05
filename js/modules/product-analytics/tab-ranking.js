/* Product Analytics — tab Xếp hạng */

function renderProductAnalyticsTabRanking() {
  return card('SKU Ranking', tableWrap(['#', 'Sản phẩm', 'GMV 30d', 'Units', 'Margin', 'Velocity', 'Score', 'Action'],
    [...ZZP_DATA.products].sort((a, b) => (b.sold30d * b.price) - (a.sold30d * a.price)).map((p, i) => {
      const gmv = p.sold30d * p.price; const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
      return `<tr class="border-b border-slate-50"><td class="py-3 px-3 font-bold">${i + 1}</td><td class="px-3"><div class="flex items-center gap-2">${productThumb(p, 14)} ${p.name}</div></td><td class="px-3 font-semibold">${fmt(gmv)}</td><td class="px-3">${p.sold30d}</td><td class="px-3">${margin}%</td><td class="px-3">${Math.round(p.sold30d / 30)}/ngày</td><td class="px-3">${p.listingScore}</td><td class="px-3">${i < 2 ? badge('Scale', 'ok') : i === 6 ? badge('Optimize', 'warning') : badge('Maintain', 'info')}</td></tr>`;
    }).join('')));
}
