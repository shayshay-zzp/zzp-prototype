/* Ads — tab Gợi ý tối ưu */

function renderAdsTabSuggestions() {
  return card('Trợ lý Spark Ads', `
    <div class="p-4 bg-green-50 rounded-xl border border-green-100"><p class="font-medium flex items-center gap-2">${icon('trending-up', 16, 'text-green-600')} Mở rộng: Spark Ads Serum VC (ROAS 3.8x)</p><p class="text-sm text-slate-600 mt-1">Tăng ngân sách 30% · Gắn video V001</p><button onclick="showToast('Đã tạo action: Tăng ngân sách AD001')" class="mt-2 text-sm text-green-700 hover:underline">Thực hiện</button></div>
    <div class="p-4 bg-red-50 rounded-xl border border-red-100 mt-3"><p class="font-medium flex items-center gap-2">${icon('pause-circle', 16, 'text-red-600')} Tạm dừng: Quảng cáo sản phẩm Mặt nạ (ROAS 1.2x)</p><p class="text-sm text-slate-600 mt-1">Chuyển ngân sách sang Affiliate K002</p><button onclick="pauseAd('AD002')" class="mt-2 text-sm text-red-700 hover:underline">Tạm dừng ngay</button></div>`);
}
