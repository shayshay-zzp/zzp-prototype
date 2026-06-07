/* Ads — tab Gợi ý tối ưu */

function renderAdsTabSuggestions() {
  return dsCard('Trợ lý Spark Ads', `
    <div class="ds-stack-sm">
      ${dsTip('success', `${icon('trending-up', 14)} Mở rộng: Spark Ads Serum VC (ROAS 3.8x)`, 'Tăng ngân sách 30% · Gắn video V001', `<button type="button" class="ds-text-link" style="margin-top:8px;font-size:12px" onclick="showToast('Đã tạo action: Tăng ngân sách AD001')">Thực hiện →</button>`)}
      ${dsTip('danger', `${icon('pause-circle', 14)} Tạm dừng: Quảng cáo sản phẩm Mặt nạ (ROAS 1.2x)`, 'Chuyển ngân sách sang Affiliate K002', `<button type="button" class="ds-text-link" style="margin-top:8px;font-size:12px" onclick="pauseAd('AD002')">Tạm dừng ngay →</button>`)}
    </div>`);
}
