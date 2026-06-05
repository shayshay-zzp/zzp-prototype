/* Costs — tab Chi tiết */

function renderCostsTabDetail() {
  const c = ZZP_DATA.costs;
  return card('Chi tiết cấu trúc chi phí', tableWrap(['Loại chi phí', 'Số tiền', '% GMV', 'Xu hướng'],
    Object.entries({ COGS: c.cogs, 'Vận chuyển': c.shipping, 'Hoa hồng Affiliate': c.commission, 'Quảng cáo': c.ads, 'Phiếu giảm giá': c.voucher, 'Mẫu thử': c.sample, 'Phí agency': c.agency, 'Phí nền tảng': c.platform }).map(([k, v]) =>
      `<tr class="border-b border-slate-50"><td class="py-3 px-3">${k}</td><td class="px-3">${fmt(v)}</td><td class="px-3">${(v / ZZP_DATA.revenueBreakdown.total * 100).toFixed(1)}%</td><td class="px-3">${k === 'Quảng cáo' ? badge('↑ 12%', 'warning') : badge('→ ổn định', 'ok')}</td></tr>`).join('')));
}
