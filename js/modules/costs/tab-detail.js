/* Costs — tab Chi tiết */

function renderCostsTabDetail() {
  const c = ZZP_DATA.costs;
  return card('Cost Structure Detail', tableWrap(['Loại chi phí', 'Số tiền', '% GMV', 'Trend'],
    Object.entries({ COGS: c.cogs, 'Vận chuyển': c.shipping, 'Commission Affiliate': c.commission, 'Quảng cáo': c.ads, Voucher: c.voucher, Sample: c.sample, 'Agency Fee': c.agency, 'Platform Fee': c.platform }).map(([k, v]) =>
      `<tr class="border-b border-slate-50"><td class="py-3 px-3">${k}</td><td class="px-3">${fmt(v)}</td><td class="px-3">${(v / ZZP_DATA.revenueBreakdown.total * 100).toFixed(1)}%</td><td class="px-3">${k === 'Quảng cáo' ? badge('↑ 12%', 'warning') : badge('→ ổn định', 'ok')}</td></tr>`).join('')));
}
