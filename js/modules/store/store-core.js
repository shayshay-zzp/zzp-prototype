/* Store — helpers & KPI strip */

function calcStorefrontScore() {
  const s = ZZP_DATA.store;
  const bk = ZZP_DATA.brandKit;
  let score = 0;
  if (bk.logo && bk.primaryColor) score += 15;
  if (bk.banner) score += 10;
  if (bk.font && bk.tone) score += 10;
  if (s.pinnedProductIds.length >= 3) score += 20;
  else score += s.pinnedProductIds.length * 5;
  if (s.activeTemplateId) score += 15;
  if (s.seo.shopTitle.length >= 30 && s.seo.shopBio.length >= 60) score += 15;
  score += s.sections.filter(x => x.enabled).length * 2;
  if (s.publishStatus === 'live') score += 5;
  return Math.min(100, score);
}

function syncStoreConversionChecks() {
  const s = ZZP_DATA.store;
  const map = {
    cc1: !!s.bannerCta,
    cc2: s.pinnedProductIds.length >= 3,
    cc3: !!s.activeTemplateId,
    cc4: s.seo.shopTitle.length >= 40,
    cc5: s.seo.shopBio.length >= 80,
    cc6: !!(ZZP_DATA.brandKit.logo && ZZP_DATA.brandKit.primaryColor),
    cc7: s.sections.find(x => x.id === 'live')?.enabled,
    cc8: ZZP_DATA.shop.oauthStatus === 'connected'
  };
  s.conversionChecks.forEach(c => { c.pass = !!map[c.id]; });
}

function getStoreChecklistProgress() {
  const steps = MODULE_GUIDES.store?.steps || [];
  const done = steps.filter(s => s.done()).length;
  return { done, total: steps.length };
}

function renderStoreKpiStrip() {
  syncStoreConversionChecks();
  const score = calcStorefrontScore();
  const s = ZZP_DATA.store;
  const prog = getStoreChecklistProgress();
  const tpl = s.templateCatalog.find(t => t.id === s.activeTemplateId);
  return `
    <div class="ds-metric-strip">
      <div class="ds-metric-strip-head">
        <p class="ds-metric-strip-label">${icon('store', 14)} Gian hàng · ${ZZP_DATA.shop.name}</p>
        <span class="ds-metric-strip-sync">${s.publishStatus === 'live' ? badge('Đang live', 'ok') : badge('Bản nháp', 'warn')} · Sửa ${s.lastEdited}</span>
      </div>
      <div class="ds-metric-strip-grid">
        <div class="ds-metric-cell ds-metric-cell--highlight">
          <p class="ds-metric-cell-val is-brand">${score}%</p>
          <p class="ds-metric-cell-lbl">Điểm gian hàng</p>
        </div>
        <div class="ds-metric-cell">
          <p class="ds-metric-cell-val">${s.pinnedProductIds.length}/4</p>
          <p class="ds-metric-cell-lbl">Pin SKU chủ lực</p>
        </div>
        <div class="ds-metric-cell">
          <p class="ds-metric-cell-val">${tpl ? tpl.name.slice(0, 12) + '…' : '—'}</p>
          <p class="ds-metric-cell-lbl">Mẫu đang dùng</p>
        </div>
        <div class="ds-metric-cell">
          <p class="ds-metric-cell-val">${prog.done}/${prog.total}</p>
          <p class="ds-metric-cell-lbl">Danh sách thiết lập</p>
        </div>
        <div class="ds-metric-cell">
          <p class="ds-metric-cell-val">${s.sections.filter(x => x.enabled).length}/${s.sections.length}</p>
          <p class="ds-metric-cell-lbl">Section bật</p>
        </div>
        <div class="ds-metric-cell">
          <p class="ds-metric-cell-val">${s.lastPublished?.slice(0, 10) || '—'}</p>
          <p class="ds-metric-cell-lbl">Xuất bản gần nhất</p>
        </div>
      </div>
    </div>`;
}
