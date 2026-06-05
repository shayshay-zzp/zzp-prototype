/* Store — tab Xem trước storefront */

function renderStorefrontMock(mode) {
  const bk = ZZP_DATA.brandKit;
  const s = ZZP_DATA.store;
  const pinned = s.pinnedProductIds.map(id => getProduct(id)).filter(Boolean);
  const enabledSections = s.sections.filter(x => x.enabled).sort((a, b) => a.order - b.order);

  const bannerHtml = enabledSections.some(x => x.id === 'banner') ? `
    <div class="ds-store-banner-mock" style="background:linear-gradient(135deg, ${bk.primaryColor}, ${bk.secondaryColor})">
      <p style="margin:0;font-size:10px;opacity:.85">${bk.logo}</p>
      <p style="margin:6px 0 0;font-size:${mode === 'mobile' ? '14px' : '18px'};font-weight:800">${bk.banner}</p>
      <p style="margin:4px 0 0;font-size:11px;opacity:.9">${s.bannerSub}</p>
      <span class="ds-store-banner-cta">${s.bannerCta}</span>
    </div>` : '';

  const heroHtml = enabledSections.some(x => x.id === 'hero') && pinned.length ? `
    <div style="padding:8px 12px 4px;font-size:11px;font-weight:700;color:var(--ds-text-muted)">SẢN PHẨM NỔI BẬT</div>
    <div class="ds-store-product-row">${pinned.map(p => `
      <div class="ds-store-product-cell" onclick="openDetail('product','${p.id}')">
        ${productThumb(p, mode === 'mobile' ? 48 : 56)}
        <p class="ds-product-preview-name">${p.name.slice(0, 22)}</p>
        <p class="ds-product-preview-price">${fmtCurrency(p.price)}</p>
      </div>`).join('')}</div>` : '';

  const liveHtml = enabledSections.some(x => x.id === 'live') ? `
    <div style="margin:8px 12px;padding:10px;background:linear-gradient(90deg,#fce7f3,#fff);border-radius:10px;border:1px solid #fbcfe8">
      <p style="margin:0;font-size:11px;font-weight:700;color:var(--ds-accent)">${icon('radio', 12)} LIVE · Mega Live 6/6</p>
      <p style="margin:4px 0 0;font-size:11px;color:var(--ds-text-secondary)">@skintips_daily · Bắt đầu 20:00</p>
    </div>` : '';

  const shopHead = `
    <div class="ds-store-shop-head">
      <div class="ds-store-shop-avatar" style="background:${bk.primaryColor}">BV</div>
      <div style="min-width:0">
        <p style="margin:0;font-size:13px;font-weight:700">${s.seo.shopTitle.slice(0, 28)}…</p>
        <p style="margin:2px 0 0;font-size:11px;color:var(--ds-text-muted)">${fmt(128000)} người theo dõi · 4.9★</p>
      </div>
      ${badge(s.publishStatus === 'live' ? 'Shop đang live' : 'Bản nháp', s.publishStatus === 'live' ? 'ok' : 'warn')}
    </div>`;

  const inner = shopHead + bannerHtml + liveHtml + heroHtml;

  if (mode === 'mobile') {
    return `
      <div class="ds-store-phone">
        <div class="ds-store-phone-notch"><span></span></div>
        <div class="ds-store-phone-screen">${inner}</div>
      </div>`;
  }
  return `
    <div class="ds-store-desktop">
      <div class="ds-store-desktop-bar"><span></span><span></span><span></span></div>
      <div style="max-width:720px;margin:0 auto">${inner}</div>
    </div>`;
}

function renderStoreTabPreview() {
  const mode = ZZP_DATA.store.previewMode;
  return `
    <div class="ds-flex-between" style="margin-bottom:16px">
      <div class="ds-preview-toggle">
        <button type="button" class="${mode === 'mobile' ? 'is-active' : ''}" onclick="setStorePreviewMode('mobile')">${icon('smartphone', 14)} Di động</button>
        <button type="button" class="${mode === 'desktop' ? 'is-active' : ''}" onclick="setStorePreviewMode('desktop')">${icon('monitor', 14)} Máy tính</button>
      </div>
      <div style="display:flex;gap:10px">
        ${dsBtnIcon('Mở tab Trang trí', "selectModuleDataTab('store', 2)", 'layout', 'secondary', 'sm')}
        ${dsBtnIcon('Xuất bản', 'publishStorefront()', 'upload', 'primary', 'sm')}
      </div>
    </div>
    ${renderStorefrontMock(mode)}
    ${dsCard('Thông tin xem trước', `
      ${dsKvRows([
        ['Mẫu giao diện', ZZP_DATA.store.templateCatalog.find(t => t.id === ZZP_DATA.store.activeTemplateId)?.name || 'Mặc định'],
        ['Pin hero', `${ZZP_DATA.store.pinnedProductIds.length} SKU`],
        ['Section bật', `${ZZP_DATA.store.sections.filter(x => x.enabled).length} khối`],
        ['Điểm gian hàng', calcStorefrontScore() + '%']
      ])}`)}`;
}
