/* Store — tab Brand Kit */

function renderStoreTabBrandKit() {
  const bk = ZZP_DATA.brandKit;
  return `
    ${dsGrid(2, `
      ${dsCard('Nhận diện thương hiệu', `
        <div class="ds-flex-between" style="margin-bottom:20px">
          <div style="display:flex;gap:16px;align-items:center">
            <div class="ds-brand-logo" style="background:${bk.primaryColor}">BV</div>
            <div>
              <p style="margin:0;font-size:18px;font-weight:800">${bk.logo}</p>
              <p style="margin:4px 0 0;font-size:13px;color:var(--ds-text-secondary)">${bk.tone}</p>
            </div>
          </div>
          ${dsBtnIcon('Tải logo mới', "showToast('Mở trình upload logo 500×500px')", 'upload', 'secondary', 'sm')}
        </div>
        ${dsKvRows([
          ['Font chính', bk.font],
          ['Tone of voice', bk.tone],
          ['Màu primary', `<span style="display:inline-flex;align-items:center;gap:8px"><span style="width:16px;height:16px;border-radius:4px;background:${bk.primaryColor}"></span>${bk.primaryColor}</span>`],
          ['Màu accent', `<span style="display:inline-flex;align-items:center;gap:8px"><span style="width:16px;height:16px;border-radius:4px;background:${bk.secondaryColor}"></span>${bk.secondaryColor}</span>`]
        ])}
        <div style="display:flex;gap:12px;margin-top:16px">
          <div class="ds-brand-swatch" style="background:${bk.primaryColor}">Primary</div>
          <div class="ds-brand-swatch" style="background:${bk.secondaryColor}">Accent TikTok</div>
        </div>`)}
      ${dsCard('Tài sản Brand Kit', `
        ${dsTable(['Tài sản', 'Quy cách', 'Trạng thái', 'Hành động'], [
          ['Logo vuông', '500×500 PNG', badge('Đã có', 'ok'), `<button class="ds-text-link" onclick="showToast('Tải logo')">Tải</button>`],
          ['Logo ngang', '800×200 PNG', badge('Thiếu', 'warn'), `<button class="ds-text-link" onclick="showToast('Tạo logo ngang')">Tạo</button>`],
          ['Banner shop', '1200×400 JPG', badge('Đã có', 'ok'), `<button class="ds-text-link" onclick="selectModuleDataTab('store', 2)">Sửa</button>`],
          ['Icon favicon', '128×128', badge('Đã có', 'ok'), `<button class="ds-text-link">Tải</button>`],
          ['Brand guideline PDF', 'A4', badge('Nháp', 'warn'), `<button class="ds-text-link">Xem</button>`]
        ].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join(''))}
        <div style="margin-top:16px;display:flex;gap:10px">
          ${dsBtn('Lưu Brand Kit', 'saveStoreBrandKit()', 'primary', 'md')}
          ${dsBtn('Đồng bộ Seller Center', "showToast('Đã đồng bộ Brand Kit lên TikTok Shop')", 'secondary', 'md')}
        </div>`)}
    `)}
    ${dsCard('AI Brand Consistency Check', `
      ${dsTip('brand', `${icon('sparkles', 14)} Đánh giá AI`, 'Màu primary #14b8a6 phù hợp ngành beauty · Banner đồng bộ campaign Flash Sale · Gợi ý: thêm logo ngang cho header desktop.')}
      <div style="margin-top:12px">${dsBtn('Chạy kiểm tra đầy đủ', "showToast('AI đang quét Brand Kit…')", 'ghost', 'sm')}</div>`)}`;
}
