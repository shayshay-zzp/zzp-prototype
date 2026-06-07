/* Affiliate Analytics — tab Campaign ROI */

function renderAffiliateAnalyticsTabCampaignRoi() {
  return card('So sánh ROI chiến dịch', tableWrap(['Chiến dịch', 'Chi tiêu', 'GMV', 'ROI', 'Hoa hồng', 'Lợi nhuận ròng'],
    ZZP_DATA.campaigns.map(c => `<tr class="border-b border-slate-50"><td class="py-3 px-3">${c.name}</td><td class="px-3">${fmt(c.spent)}</td><td class="px-3">${fmt(c.gmv)}</td><td class="px-3 font-semibold">${(c.gmv / c.spent).toFixed(1)}x</td><td class="px-3">${fmt(c.gmv * 0.12)}</td><td class="px-3 font-semibold">${fmt(c.gmv - c.spent - c.gmv * 0.12 - c.gmv * 0.3)}</td></tr>`).join('')));
}
