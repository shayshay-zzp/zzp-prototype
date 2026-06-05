/* Store — actions (pin, template, publish, SEO…) */

function toggleStorePin(productId) {
  const s = ZZP_DATA.store;
  const idx = s.pinnedProductIds.indexOf(productId);
  if (idx >= 0) {
    s.pinnedProductIds.splice(idx, 1);
    showToast('Đã bỏ pin sản phẩm khỏi gian hàng');
  } else if (s.pinnedProductIds.length >= 4) {
    showToast('Tối đa 4 SKU chủ lực trên gian hàng', 'warning');
    return;
  } else {
    s.pinnedProductIds.push(productId);
    showToast('Đã pin sản phẩm lên gian hàng');
  }
  syncStoreConversionChecks();
  if (s.pinnedProductIds.length >= 3) {
    const c6 = ZZP_DATA.checklist.find(c => c.id === 'c6');
    if (c6 && s.activeTemplateId) c6.done = true;
  }
  updateHealthBadge();
  renderCurrentView();
}

function toggleStoreSection(sectionId) {
  const sec = ZZP_DATA.store.sections.find(s => s.id === sectionId);
  if (sec) {
    sec.enabled = !sec.enabled;
    showToast(`${sec.enabled ? 'Bật' : 'Tắt'} section: ${sec.label}`);
    syncStoreConversionChecks();
    renderCurrentView();
  }
}

function applyStoreTemplate(templateId) {
  const t = ZZP_DATA.store.templateCatalog.find(x => x.id === templateId);
  if (!t) return;
  ZZP_DATA.store.activeTemplateId = templateId;
  t.lastUsed = new Date().toISOString().slice(0, 10);
  const bk = ZZP_DATA.brandKit;
  if (t.id === 'T1') { bk.banner = 'Flash Sale Cuối Tuần — Giảm 30%'; ZZP_DATA.store.bannerCta = 'Săn deal ngay'; }
  if (t.id === 'T3') { ZZP_DATA.store.sections.find(s => s.id === 'live').enabled = true; }
  if (ZZP_DATA.store.pinnedProductIds.length >= 3) {
    const c6 = ZZP_DATA.checklist.find(c => c.id === 'c6');
    if (c6) c6.done = true;
  }
  syncStoreConversionChecks();
  updateHealthBadge();
  showToast(`✓ Đã áp dụng template "${t.name}"`);
  renderCurrentView();
}

function previewStoreTemplate(templateId) {
  applyStoreTemplate(templateId);
  selectModuleDataTab('store', 4);
}

function setStorePreviewMode(mode) {
  ZZP_DATA.store.previewMode = mode;
  renderCurrentView();
}

function updateStoreBannerTitle(v) { ZZP_DATA.brandKit.banner = v; syncStoreConversionChecks(); }
function updateStoreBannerSub(v) { ZZP_DATA.store.bannerSub = v; }
function updateStoreBannerCta(v) { ZZP_DATA.store.bannerCta = v; syncStoreConversionChecks(); }

function updateStoreSeo(field, v) {
  ZZP_DATA.store.seo[field] = v;
  syncStoreConversionChecks();
}

function saveStoreBrandKit() {
  showToast('✓ Brand Kit đã lưu · đồng bộ Seller Center');
  ZZP_DATA.store.lastEdited = new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function saveStoreSeo() {
  syncStoreConversionChecks();
  showToast('✓ SEO shop đã lưu');
  ZZP_DATA.store.lastEdited = new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function publishStorefront() {
  const score = calcStorefrontScore();
  if (score < 60) {
    showToast(`Storefront Score ${score}% — hoàn thiện thêm trước khi xuất bản`, 'warning');
    return;
  }
  ZZP_DATA.store.publishStatus = 'live';
  ZZP_DATA.store.lastPublished = new Date().toISOString().slice(0, 16).replace('T', ' ');
  ZZP_DATA.store.publishHistory.unshift({
    time: ZZP_DATA.store.lastPublished,
    user: 'Nguyễn Minh Anh',
    action: 'Xuất bản gian hàng lên TikTok Shop',
    status: 'live'
  });
  const c6 = ZZP_DATA.checklist.find(c => c.id === 'c6');
  if (c6) c6.done = true;
  updateHealthBadge();
  showToast('✓ Storefront đã xuất bản lên TikTok Shop');
  renderCurrentView();
}
