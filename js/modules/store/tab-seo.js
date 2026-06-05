/* Store — tab SEO & CTA */

function renderStoreTabSeo() {
  const seo = ZZP_DATA.store.seo;
  return `
    ${dsGrid(2, `
      ${dsCard('SEO & Thông tin shop', `
        <div class="ds-seo-field">
          <label class="ds-seo-label">Tiêu đề shop (hiển thị trên TikTok)</label>
          <input class="ds-seo-input" value="${seo.shopTitle}" maxlength="80" onchange="updateStoreSeo('shopTitle', this.value)" />
          <p style="margin:6px 0 0;font-size:11px;color:var(--ds-text-muted)">${seo.shopTitle.length}/80 ký tự · ${seo.shopTitle.length >= 40 ? badge('Đạt', 'ok') : badge('Quá ngắn', 'warn')}</p>
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">Bio / mô tả shop</label>
          <textarea class="ds-seo-input" rows="3" onchange="updateStoreSeo('shopBio', this.value)">${seo.shopBio}</textarea>
          <p style="margin:6px 0 0;font-size:11px;color:var(--ds-text-muted)">${seo.shopBio.length} ký tự · ${seo.shopBio.length >= 80 ? badge('Đạt', 'ok') : badge('Cần dài hơn', 'warn')}</p>
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">URL slug</label>
          <input class="ds-seo-input" value="${seo.slug}" onchange="updateStoreSeo('slug', this.value)" />
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">Từ khóa SEO</label>
          <div class="ds-seo-tags">${seo.keywords.map(k => `<span class="ui-badge ui-badge--muted">${k}</span>`).join('')}</div>
          ${dsBtn('Thêm từ khóa AI', "showToast('AI đề xuất: kem dưỡng ẩm, serum HA, mặt nạ collagen')", 'ghost', 'sm')}
        </div>
        <div style="margin-top:12px">${dsBtn('Lưu SEO', 'saveStoreSeo()', 'primary', 'md')}</div>`)}
      ${dsCard('Chuyển đổi & CTA', `
        ${dsTip('success', 'CTA banner', `Nút "${ZZP_DATA.store.bannerCta}" — rõ ràng, có urgency`)}
        <div style="margin-top:12px">${dsTip(ZZP_DATA.store.pinnedProductIds.length >= 3 ? 'success' : 'warning', 'Hiển thị Hero SKU', ZZP_DATA.store.pinnedProductIds.length >= 3 ? 'Đủ 3+ hero trên fold đầu' : `Cần pin thêm ${3 - ZZP_DATA.store.pinnedProductIds.length} SKU`)}</div>
        <div style="margin-top:12px">${dsTip(ZZP_DATA.store.activeTemplateId ? 'success' : 'warning', 'Mẫu chiến dịch', ZZP_DATA.store.activeTemplateId ? 'Mẫu đồng bộ chiến dịch' : 'Chưa áp dụng mẫu — chọn tab Trung tâm mẫu giao diện')}</div>
        <div style="margin-top:16px">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600">Danh sách kiểm tra chuyển đổi</p>
          ${dsKvRows(ZZP_DATA.store.conversionChecks.slice(0, 4).map(c => [c.label, c.pass ? badge('OK', 'ok') : badge('Sửa', 'warn')]))}
        </div>`)}
    `)}
    ${dsCard('Xem trước kết quả tìm kiếm TikTok', `
      <div style="padding:16px;border:1px solid var(--ds-border);border-radius:12px;background:var(--ds-bg-subtle)">
        <p style="margin:0;font-size:11px;color:var(--ds-text-muted)">Xem trước tìm kiếm TikTok Shop</p>
        <p style="margin:8px 0 0;font-size:15px;font-weight:700;color:var(--ds-brand)">${seo.shopTitle}</p>
        <p style="margin:6px 0 0;font-size:12px;color:var(--ds-text-secondary);line-height:1.5">${seo.shopBio.slice(0, 120)}…</p>
        <p style="margin:8px 0 0;font-size:11px;color:var(--ds-text-muted)">tiktok.com/@${seo.slug}</p>
      </div>`)}`;
}
