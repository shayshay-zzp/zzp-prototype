/* Store — tab Trang trí (banner, pin SKU, section builder) */

function renderStoreBannerEditor() {
  const bk = ZZP_DATA.brandKit;
  const s = ZZP_DATA.store;
  return `
    ${dsGrid(2, `
      ${dsCard('Cấu hình banner', `
        <div class="ds-seo-field">
          <label class="ds-seo-label">Tiêu đề banner</label>
          <input class="ds-seo-input" value="${bk.banner}" onchange="updateStoreBannerTitle(this.value)" />
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">Phụ đề</label>
          <input class="ds-seo-input" value="${s.bannerSub}" onchange="updateStoreBannerSub(this.value)" />
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">Nút CTA</label>
          <input class="ds-seo-input" value="${s.bannerCta}" onchange="updateStoreBannerCta(this.value)" />
        </div>
        <div class="ds-seo-field">
          <label class="ds-seo-label">Liên kết campaign</label>
          <select class="ds-seo-input" onchange="showToast('Gắn campaign: ' + this.value)">
            <option>Flash Sale Cuối Tuần (CP001)</option>
            <option>Affiliate Boost Tháng 6 (CP002)</option>
            <option>Không liên kết</option>
          </select>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px">
          ${dsBtnIcon('Upload ảnh 1200×400', "showToast('Mở media library')", 'image', 'secondary', 'sm')}
          ${dsBtnIcon('Tạo bằng AI', "showToast('AI đang tạo banner…')", 'sparkles', 'primary', 'sm')}
        </div>`)}
      ${dsCard('Xem trước banner', `
        <div class="ds-store-banner-mock" style="background:linear-gradient(135deg, ${bk.primaryColor}, ${bk.secondaryColor});border-radius:12px">
          <p style="margin:0;font-size:11px;opacity:.85">Banner chính · 1200×400</p>
          <p style="margin:8px 0 0;font-size:18px;font-weight:800">${bk.banner}</p>
          <p style="margin:6px 0 0;font-size:12px;opacity:.9">${s.bannerSub}</p>
          <span class="ds-store-banner-cta">${s.bannerCta}</span>
        </div>`)}
    `)}`;
}

function renderStoreHeroPinManager() {
  const heroes = ZZP_DATA.products.filter(p => p.hero || p.listingScore >= 80);
  return dsCard('Quản lý Hero SKU trên gian hàng', `
    <p style="margin:0 0 14px;font-size:13px;color:var(--ds-text-secondary)">Pin 3–4 sản phẩm chủ lực lên đầu trang shop. Thứ tự = thứ tự hiển thị.</p>
    <div class="ds-pin-grid">${heroes.map(p => {
      const pinned = ZZP_DATA.store.pinnedProductIds.includes(p.id);
      const order = ZZP_DATA.store.pinnedProductIds.indexOf(p.id);
      return `
        <div class="ds-pin-card${pinned ? ' is-pinned' : ''}" onclick="toggleStorePin('${p.id}')">
          <div style="display:flex;align-items:center;gap:10px">
            ${productThumb(p, 36)}
            <div style="min-width:0;flex:1">
              <p style="margin:0;font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</p>
              <p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-muted)">${fmtCurrency(p.price)} · Điểm ${p.listingScore}%</p>
            </div>
            ${pinned ? `<span class="ui-badge ui-badge--brand">#${order + 1}</span>` : ''}
          </div>
          <p style="margin:10px 0 0;font-size:11px;color:var(--ds-text-muted)">${pinned ? 'Bấm để bỏ pin' : 'Bấm để pin lên gian hàng'}</p>
        </div>`;
    }).join('')}</div>
    <p style="margin:14px 0 0;font-size:12px;color:var(--ds-text-muted)">Đang pin: <strong>${ZZP_DATA.store.pinnedProductIds.length}/4</strong> · ${ZZP_DATA.store.pinnedProductIds.map(id => getProduct(id)?.name?.slice(0, 16)).join(' · ')}</p>`);
}

function renderStoreSectionBuilder() {
  const sections = [...ZZP_DATA.store.sections].sort((a, b) => a.order - b.order);
  return dsCard('Trình tạo section — Bố cục gian hàng', `
    <p style="margin:0 0 14px;font-size:13px;color:var(--ds-text-secondary)">Bật/tắt và sắp xếp các khối nội dung trên trang shop TikTok.</p>
    ${sections.map(sec => `
      <div class="ds-section-row${sec.enabled ? '' : ' is-off'}">
        <span class="ds-section-order">${sec.order}</span>
        <div style="flex:1;min-width:0">
          <p style="margin:0;font-weight:600;font-size:13px">${sec.label}</p>
          <p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-secondary)">${sec.desc}</p>
        </div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;font-weight:600">
          <input type="checkbox" ${sec.enabled ? 'checked' : ''} onchange="toggleStoreSection('${sec.id}')" style="accent-color:var(--ds-brand);width:16px;height:16px">
          ${sec.enabled ? 'Bật' : 'Tắt'}
        </label>
      </div>`).join('')}
    <div style="margin-top:14px">${dsBtn('Lưu bố cục', "showToast('Đã lưu bố cục gian hàng')", 'primary', 'sm')}</div>`);
}

function renderStoreTabDecoration() {
  return `
    ${renderStoreBannerEditor()}
    ${renderStoreHeroPinManager()}
    ${renderStoreSectionBuilder()}`;
}
