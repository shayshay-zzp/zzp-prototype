/* Shared table/card helpers cho module tabs — tách khỏi registry */

function renderKocScoreTable() {
  return tableWrap(['KOC', 'Hạng', 'Điểm', 'GMV 30d', 'ROI', 'Vòng đời', 'Video'],
    ZZP_DATA.kocs.map(k => `<tr ${rowClick('koc', k.id)} class="border-b border-slate-50">
      <td class="py-3 px-3 font-medium text-zzp-700">${k.name}</td>
      <td class="px-3">${k.tier}</td>
      <td class="px-3 font-bold ${k.score >= 80 ? 'text-green-600' : 'text-amber-600'}">${k.score}</td>
      <td class="px-3">${k.gmv30d ? fmt(k.gmv30d) : '—'}</td>
      <td class="px-3">${k.roi ? k.roi + 'x' : '—'}</td>
      <td class="px-3">${badge(k.lifecycle, k.lifecycle === 'revenue' ? 'ok' : 'info')}</td>
      <td class="px-3">${k.videos}</td>
    </tr>`).join(''));
}

function renderSamplesTable() {
  return tableWrap(['Mã', 'KOC', 'Sản phẩm', 'Ngày gửi', 'Trạng thái', 'Chi phí', 'ROI'],
    ZZP_DATA.samples.map(s => {
      const k = ZZP_DATA.kocs.find(x => x.id === s.koc);
      const p = getProduct(s.product);
      return `<tr ${rowClick('sample', s.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-mono text-xs">${s.id}</td>
        <td class="px-3">${k?.name}</td>
        <td class="px-3">${p?.name?.slice(0, 22)}</td>
        <td class="px-3 text-xs">${s.sentDate}</td>
        <td class="px-3">${badge(s.status, s.status === 'converted' ? 'ok' : s.status === 'no_content' ? 'critical' : 'pending')}</td>
        <td class="px-3">${fmtCurrency(s.cost)}</td>
        <td class="px-3 font-semibold ${s.roi > 10 ? 'text-green-600' : ''}">${s.roi ? s.roi + 'x' : '—'}</td>
      </tr>`;
    }).join(''));
}

function renderOrdersAttributionTable() {
  return tableWrap(['Nguồn', 'Số đơn', 'GMV ước tính', 'OAV', 'Ghi chú'],
    [['Affiliate', '1,240', fmt(186000000), fmtCurrency(170354), '38% tổng GMV'],
      ['Livestream', '892', fmt(129000000), fmtCurrency(275000), '31% tổng GMV'],
      ['Quảng cáo', '412', fmt(78600000), fmtCurrency(190000), '15% tổng GMV'],
      ['Tự nhiên', '303', fmt(91500000), fmtCurrency(145000), '10% tổng GMV']
    ].map(r => `<tr class="border-b border-slate-50">${r.map(c => `<td class="py-3 px-3">${c}</td>`).join('')}</tr>`).join(''));
}

function renderOrdersListTable() {
  return tableWrap(['Mã đơn', 'Khách', 'Sản phẩm', 'Tổng', 'Nguồn', 'SLA', 'Trạng thái'],
    ZZP_DATA.orders.map(o => `<tr ${rowClick('order', o.id)} class="border-b border-slate-50">
      <td class="py-3 px-3 font-mono text-xs text-zzp-600">${o.id}</td>
      <td class="px-3">${o.customer}</td>
      <td class="px-3">${o.productName?.slice(0, 20)}</td>
      <td class="px-3 font-semibold">${fmtCurrency(o.total)}</td>
      <td class="px-3">${o.source}</td>
      <td class="px-3">${badge(o.sla === 'ok' ? 'OK' : o.sla, o.sla === 'ok' ? 'ok' : 'critical')}</td>
      <td class="px-3">${badge(o.status, o.status)}</td>
    </tr>`).join(''));
}

function renderInventoryForecastTable() {
  return tableWrap(['SKU', 'Tồn', 'Bán/ngày', 'Còn (ngày)', 'Khuyến nghị', 'Mức độ'],
    ZZP_DATA.products.map(p => {
      const daily = Math.round(p.sold30d / 30) || 1;
      const days = Math.round(p.stock / daily);
      return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-medium">${p.name.slice(0, 24)}</td>
        <td class="px-3 ${days < 7 ? 'text-red-600 font-bold' : ''}">${p.stock}</td>
        <td class="px-3">${daily}</td>
        <td class="px-3">${days} ngày</td>
        <td class="px-3">${days < 7 ? 'PO ' + Math.max(500, daily * 14) + ' sp' : '—'}</td>
        <td class="px-3">${badge(days < 3 ? 'Nguy cấp' : days < 7 ? 'Thấp' : 'OK', days < 3 ? 'critical' : days < 7 ? 'warning' : 'ok')}</td>
      </tr>`;
    }).join(''));
}

function renderAffiliateCampaignCards() {
  return `<div class="ds-grid ds-grid--2">${ZZP_DATA.campaigns.filter(c => c.type === 'affiliate' || c.type === 'promotion').map(c => `
    <button type="button" onclick="openDetail('campaign','${c.id}')" class="ds-kanban-card" style="display:flex;justify-content:space-between;align-items:center;gap:12px">
      <div style="min-width:0"><p style="margin:0;font-weight:600">${c.name}</p><p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-muted)">${fmt(c.spent)} / ${fmt(c.budget)}</p></div>
      <div style="text-align:right;flex-shrink:0"><p style="margin:0;font-size:18px;font-weight:800;color:var(--ds-success)">${(c.gmv / c.spent).toFixed(1)}x</p><p style="margin:4px 0 0;font-size:11px;color:var(--ds-text-muted)">${fmt(c.gmv)} GMV</p></div>
    </button>`).join('')}</div>`;
}

function renderLivestreamSessions() {
  return ZZP_DATA.liveSessions.map(l => {
    const koc = ZZP_DATA.kocs.find(k => k.id === l.host);
    return dsCard(l.title, `
      ${dsGrid(2, `
        <div>
          <p style="font-size:13px;color:var(--ds-text-secondary)">Người dẫn: <button type="button" class="ds-text-link" onclick="openDetail('koc','${l.host}')">${koc?.name}</button> · ${l.date}</p>
          <p style="margin-top:8px">Danh sách kiểm tra: <strong>${l.checklistDone}/${l.checklistTotal}</strong></p>
          ${dsProgress(Math.round(l.checklistDone / l.checklistTotal * 100), 'Chuẩn bị live')}
        </div>
        <div style="text-align:center;padding:16px;background:var(--ds-bg-subtle);border-radius:12px">
          <p style="margin:0;font-size:12px;color:var(--ds-text-muted)">GMV kỳ trước</p>
          <p style="margin:4px 0 0;font-size:22px;font-weight:800;color:var(--ds-brand)">${fmt(l.pastGmv)}</p>
          <p style="margin:12px 0 0;font-size:12px;color:var(--ds-text-muted)">Dự kiến</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:700">${fmt(l.expectedGmv)}</p>
        </div>`)}
    `);
  }).join('');
}
