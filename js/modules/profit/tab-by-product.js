/* Profit — tab Theo sản phẩm */

function renderProfitTabByProduct() {
  return card('Lợi nhuận theo sản phẩm', tableWrap(['Sản phẩm', 'GMV', 'COGS', 'Chi phí PB', 'Lợi nhuận', 'Biên lợi nhuận'],
    ZZP_DATA.products.filter(p => p.hero).map(p => {
      const gmv = p.sold30d * p.price; const cogs = p.sold30d * p.cost; const other = gmv * 0.18; const profit = gmv - cogs - other;
      return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(gmv)}</td><td class="px-3">${fmt(cogs)}</td><td class="px-3">${fmt(other)}</td><td class="px-3 font-semibold text-green-600">${fmt(profit)}</td><td class="px-3">${(profit / gmv * 100).toFixed(1)}%</td></tr>`;
    }).join('')));
}
