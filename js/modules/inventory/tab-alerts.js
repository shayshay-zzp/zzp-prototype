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
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 mb-4">
      ${iconBox('triangle-alert', 18, 'bg-red-100 text-red-600 shrink-0')}
      <div>
        <p class="font-semibold text-red-800">Sắp hết hàng: Mặt nạ Collagen (P003)</p>
        <p class="text-sm text-red-700 mt-1">Còn ${p?.stock} sp (~${daysLeft} ngày) · ${poLine}</p>
        <p class="text-sm text-red-700 mt-2">Hàng chưa về kho — cần gửi PO cho NCC và tạm giảm push bán (Ads/KOC) trước khi hết tồn.</p>
        <div class="flex flex-wrap gap-2 mt-3">
          ${aq ? `<button onclick="navigate('actions')" class="px-3 py-1.5 bg-white border border-red-200 rounded-lg text-xs font-medium text-red-800 hover:bg-red-100">${icon('clipboard-list', 12)} ${aq.title}</button>` : ''}
          <button onclick="runAutomationFlow('FLOW_STOCK')" class="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 hover:bg-red-800">${icon('play', 12)} Quy trình gửi PO NCC</button>
          <button onclick="openDetail('product','P003')" class="px-3 py-1.5 border border-red-200 rounded-lg text-xs text-red-800 hover:bg-red-100">Chi tiết SKU</button>
        </div>
      </div>
    </div>
    ${card('SKU cần chú ý', tableWrap(['SKU', 'Tồn', 'Tốc độ bán', 'Còn'],
      ZZP_DATA.products.filter(p => p.stock < 200).map(p => {
        const d = getProductDailyVelocity(p);
        const left = getProductStockDays(p);
        return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
          <td class="py-3 px-3">${p.name.slice(0, 24)}</td>
          <td class="py-3 px-3 ${left <= 3 ? 'text-red-600 font-bold' : left <= 7 ? 'text-amber-600 font-bold' : ''}">${p.stock}</td>
          <td class="px-3">${d}/ngày</td>
          <td class="px-3">${left} ngày</td>
        </tr>`;
      }).join('')))}`;
}
