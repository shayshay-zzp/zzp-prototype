/* Revenue — tab Theo sản phẩm */

function renderRevenueTabByProduct() {
  return card('Doanh thu theo sản phẩm × nguồn', tableWrap(['Sản phẩm', 'Tự nhiên', 'Affiliate', 'Quảng cáo', 'Live', 'Tổng'],
    ZZP_DATA.products.filter(p => p.hero).map(p => {
      const share = p.sold30d * p.price;
      return `<tr class="border-b border-slate-50"><td class="py-3 px-3">${p.name}</td><td class="px-3">${fmt(share * 0.15)}</td><td class="px-3">${fmt(share * 0.38)}</td><td class="px-3">${fmt(share * 0.12)}</td><td class="px-3">${fmt(share * 0.35)}</td><td class="px-3 font-semibold">${fmt(share)}</td></tr>`;
    }).join('')));
}
