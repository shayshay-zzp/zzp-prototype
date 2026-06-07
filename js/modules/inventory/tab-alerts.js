/* Inventory — tab Cảnh báo */

function renderInventoryTabAlerts() {
  const p = getProduct('P003');
  const po = getProductPurchaseOrder('P003');
  const daysLeft = getProductStockDays(p);
  const aq = ZZP_DATA.actionQueue.find(a => a.id === 'AQ002');
  const poLine = po
    ? `${po.id} (${po.status === 'draft' ? 'nháp' : po.status}) · ${po.qty} sp · ${po.note || ''}`
    : 'Chưa có đơn NCC xác nhận';
  return `
    <div class="ds-issue-list mb-4">
      <div class="ds-issue-row ds-issue-row--critical" onclick="openDetail('product','P003')">
        <span class="ds-issue-dot" aria-hidden="true"></span>
        <div class="ds-issue-body">
          <p class="ds-issue-row-title">Sắp hết hàng: Mặt nạ Collagen (P003)</p>
          <p class="ds-issue-row-sub">Còn ${p?.stock} sp (~${daysLeft} ngày) · ${poLine}</p>
        </div>
        <div class="ds-issue-row-actions" onclick="event.stopPropagation()">
          ${aq ? `<button type="button" class="ds-issue-btn" onclick="navigate('actions')" title="${aq.title}">${icon('clipboard-list', 12)}</button>` : ''}
          <button type="button" class="ds-issue-btn ds-issue-btn--primary" onclick="runAutomationFlow('FLOW_STOCK')" title="Quy trình gửi PO NCC">${icon('play', 12)}</button>
        </div>
      </div>
    </div>
    ${card('SKU cần chú ý', tableWrap(['SKU', 'Tồn', 'Tốc độ bán', 'Còn'],
      ZZP_DATA.products.filter(p => p.stock < 200).map(p => {
        const d = getProductDailyVelocity(p);
        const left = getProductStockDays(p);
        return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
          <td class="py-3 px-3">${p.name.slice(0, 24)}</td>
          <td class="py-3 px-3 ${left <= 7 ? 'font-bold' : ''}">${p.stock}</td>
          <td class="px-3">${d}/ngày</td>
          <td class="px-3">${left} ngày</td>
        </tr>`;
      }).join('')))}`;
}
