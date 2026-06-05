/* Inventory — tab Cảnh báo */

function renderInventoryTabAlerts() {
  return `
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 mb-4">
      ${iconBox('triangle-alert', 18, 'bg-red-100 text-red-600 shrink-0')}
      <div>
        <p class="font-semibold text-red-800">Cảnh báo: Mặt nạ Collagen (P003)</p>
        <p class="text-sm text-red-700 mt-1">Chỉ còn 45 sp — hết hàng dự kiến trong 2 ngày.
          <button onclick="runAutomationFlow('FLOW_STOCK')" class="underline font-medium ml-1 inline-flex items-center gap-1">${icon('play', 12)} Chạy nhập hàng</button></p>
      </div>
    </div>
    ${card('SKU cần chú ý', tableWrap(['SKU', 'Tồn', 'Tốc độ bán', 'Còn'],
      ZZP_DATA.products.filter(p => p.stock < 200).map(p => {
        const d = Math.round(p.sold30d / 30);
        return `<tr ${rowClick('product', p.id)} class="border-b border-slate-50">
          <td class="py-3 px-3">${p.name.slice(0, 24)}</td>
          <td class="py-3 px-3 text-red-600 font-bold">${p.stock}</td>
          <td class="px-3">${d}/ngày</td>
          <td class="px-3">${Math.round(p.stock / d)} ngày</td>
        </tr>`;
      }).join('')))}`;
}
