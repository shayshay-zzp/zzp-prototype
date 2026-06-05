/* Khởi tạo — trang theo ZZP Design System */

PAGES.onboarding = () => {
  const done = ZZP_DATA.checklist.filter(c => c.done).length;
  const banner = renderSetupBanner();
  const grid2 = banner
    ? dsGrid(2, banner + dsCard('Kết nối TikTok Shop', dsConnectionCard(ZZP_DATA.shop)))
    : dsCard('Kết nối TikTok Shop', dsConnectionCard(ZZP_DATA.shop));
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Onboarding & Setup Shop', 'Thiết lập gian hàng, kết nối TikTok Shop và đánh giá mức độ sẵn sàng vận hành')}
    ${dsStatGrid([
      { label: 'Shop Health', value: calcHealthScore() + '%', hint: `${done}/${ZZP_DATA.checklist.length} bước`, tone: 'brand' },
      { label: 'Kết nối shop', value: ZZP_DATA.shop.oauthStatus === 'connected' ? 'Đã kết nối' : 'Chưa kết nối', hint: ZZP_DATA.shop.name, tone: 'success' },
      { label: 'Cập nhật gần nhất', value: ZZP_DATA.shop.lastSync, hint: 'Đồng bộ tự động', tone: 'default' }
    ])}
    ${renderOnboardingTimeline()}
    ${grid2}
  `));
};

PAGES['products-setup'] = () => {
  const c5 = ZZP_DATA.checklist.find(c => c.id === 'c5');
  const heroes = ZZP_DATA.products.filter(p => p.hero && p.listingScore >= 85);
  const wizardBanner = !c5?.done ? dsCard('', `
      <div class="ds-flex-between">
        <div style="min-width:0">
          <p class="ds-panel-eyebrow" style="color:var(--ds-brand)">${icon('sparkles', 16)} Thiết lập sản phẩm trên ZZP</p>
          <h3 class="ds-panel-title">Tạo SKU chủ lực với AI</h3>
          <p class="ds-page-desc" style="max-width:none;margin-top:8px">Wizard 5 bước: thông tin → AI nội dung → AI 6 ảnh → video & tuân thủ → đăng TikTok Shop</p>
          <p class="ds-list-card-desc">${heroes.length}/5 SKU chủ lực đạt ≥85% · ${c5?.done ? 'Hoàn thành' : 'Chưa xong'}</p>
        </div>
        ${dsBtnIcon('Thiết lập sản phẩm mới', 'openProductCreateWizard()', 'plus', 'primary', 'lg')}
      </div>`, { highlight: true }) : '';
  const listingRows = ZZP_DATA.products.map(p => `<tr ${rowClick('product', p.id)}>
    <td><span style="display:inline-flex;align-items:center;gap:8px">${productThumb(p, 16)}<span style="font-weight:500">${p.name}</span>${p.hero ? ' <span class="ui-badge ui-badge--warn">Hero</span>' : ''}</span></td>
    <td>${fmtCurrency(p.price)}</td>
    <td>${dsListingScore(p.listingScore)}</td>
    <td>${badge(p.status, p.status)}</td>
    <td onclick="event.stopPropagation()"><button type="button" class="ds-text-link" onclick="openListingCheck('${p.id}')">Kiểm tra</button></td>
  </tr>`).join('');
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Product Launch', 'Tạo và tối ưu listing, kiểm tra chất lượng và tăng tỷ lệ duyệt')}
    ${wizardBanner}
    ${dsCard('Listing Quality Checker', dsTable(['Sản phẩm', 'Giá', 'Listing Score', 'Trạng thái', 'Hành động'], listingRows))}
    ${dsCard('Listing Assist — Gợi ý tối ưu', `
      <div class="ds-stack-sm">
        ${dsTip('warning', 'P006 — Son dưỡng môi', `${icon('alert-circle', 12)} Thiếu ảnh INCI · ${icon('alert-circle', 12)} Mô tả ngắn · ${icon('check', 12)} Giá OK`, `<button type="button" class="ds-text-link" style="margin-top:8px;font-size:12px" onclick="navigate('compliance')">Xem compliance →</button>`)}
        ${dsTip('success', 'P005 — Kem chống nắng SPF50+', 'Listing 94% · 8 ảnh chuẩn · Video demo · Sẵn sàng scale')}
      </div>`)}
  `));
};

PAGES.store = () => modulePage(
  'Khởi tạo',
  'Store Optimization',
  'Trang trí storefront TikTok Shop — seller xem score, pin SKU, chọn template và xuất bản khi đủ điều kiện',
  `${renderStoreKpiStrip()}${renderModuleDataTabs('store')}`
);

PAGES.compliance = () => {
  const policies = ZZP_DATA.policies.map(p => {
    const isAction = p.status === 'action_required';
    return `
      <div class="ds-card" style="margin-bottom:12px;cursor:pointer;border-color:${isAction ? '#fecaca' : 'var(--ds-border)'}" onclick="openDetail('policy','${p.id}')">
        <div class="ds-card-body">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
            <div style="min-width:0">
              <p style="margin:0;font-weight:600;font-size:14px">${p.title}</p>
              <p style="margin:6px 0 0;font-size:12px;color:var(--ds-text-muted)">${p.date} · Ảnh hưởng: ${badge(p.impact, p.impact)}</p>
            </div>
            ${badge(isAction ? 'Cần xử lý' : p.status === 'compliant' ? 'Tuân thủ' : 'Theo dõi', isAction ? 'critical' : p.status === 'compliant' ? 'ok' : 'warning')}
          </div>
          <div style="margin-top:12px;padding:12px;background:#fafbfc;border:1px solid var(--ds-border);border-radius:8px" onclick="event.stopPropagation()">
            <p style="margin:0;font-size:12px;font-weight:600;color:var(--ds-brand);display:flex;align-items:center;gap:4px">${icon('sparkles', 12)} AI Assessment</p>
            <p style="margin:6px 0 0;font-size:13px;color:var(--ds-text-secondary);line-height:1.5">${p.aiSummary}</p>
          </div>
          ${p.affected.length ? `<p style="margin:12px 0 0;font-size:12px;color:var(--ds-text-secondary)">Sản phẩm ảnh hưởng: ${p.affected.map(id => `<button type="button" class="ds-text-link" onclick="event.stopPropagation();openDetail('product','${id}')">${getProduct(id)?.name || id}</button>`).join(', ')}</p>` : ''}
          <div style="margin-top:12px;display:flex;gap:12px" onclick="event.stopPropagation()">
            <button type="button" class="ds-text-link" onclick="openDetail('policy','${p.id}')">Chi tiết →</button>
            ${isAction ? `<button type="button" class="ds-text-link" style="color:var(--ds-danger)" onclick="runAutomationFlow('FLOW_COMPLIANCE')">${icon('play', 12)} Giải quyết</button>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Compliance & Policy Hub', 'Theo dõi chính sách TikTok Shop, đánh giá rủi ro bằng AI')}
    ${dsCard('TikTok Policy Hub — AI Impact Analysis', policies)}
    ${dsCard('Compliance Checker', dsStatGrid([
      { label: 'Sản phẩm tuân thủ', value: '5/7', tone: 'success' },
      { label: 'Cần cập nhật', value: '2', tone: 'danger' },
      { label: 'Chính sách mới', value: '1', tone: 'warning' }
    ]))}
  `));
};

PAGES.education = () => {
  const avg = Math.round(ZZP_DATA.education.reduce((s, e) => s + e.progress, 0) / ZZP_DATA.education.length);
  const cards = ZZP_DATA.education.map(e => `
    <div class="ds-card">
      <div class="ds-card-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div style="min-width:0">
            <span class="ui-badge ui-badge--muted">${e.type}</span>
            <p style="margin:8px 0 0;font-weight:600;font-size:14px">${e.title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-muted)">${e.duration}</p>
          </div>
          <span style="font-size:20px;font-weight:700;color:var(--ds-brand)">${e.progress}%</span>
        </div>
        ${dsProgress(e.progress, 'Tiến độ')}
        <button type="button" class="ds-text-link" style="margin-top:12px;font-size:13px" onclick="showToast('Đang mở: ${e.title}')">${e.progress === 100 ? 'Xem lại' : 'Tiếp tục học'} →</button>
      </div>
    </div>`).join('');
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Education Hub & Playbook', 'Tài liệu đào tạo, SOP và lộ trình phát triển cho seller mới')}
    ${dsStatGrid([{ label: 'Tiến độ học tập', value: avg + '%', hint: `${ZZP_DATA.education.filter(e => e.progress === 100).length}/${ZZP_DATA.education.length} hoàn thành`, tone: 'brand' }])}
    <div class="ds-grid ds-grid--2">${cards}</div>
  `));
};

PAGES.portfolio = () => {
  const heroes = ZZP_DATA.products.filter(p => p.hero);
  const matrix = `
    <div class="ds-grid ds-grid--2">
      <div class="ds-quadrant ds-quadrant--star">
        <p style="margin:0;font-weight:600;color:var(--ds-brand);display:flex;align-items:center;gap:6px">${icon('star', 14)} Star — Scale</p>
        ${heroes.filter(p => p.listingScore >= 85 && p.sold30d > 400).map(p => `<p style="margin:8px 0 0;font-size:13px;display:flex;align-items:center;gap:8px">${productThumb(p, 14)} ${p.name} — ${fmt(p.sold30d * p.price)} GMV</p>`).join('')}
      </div>
      <div class="ds-quadrant ds-quadrant--cash">
        <p style="margin:0;font-weight:600;color:var(--ds-warning);display:flex;align-items:center;gap:6px">${icon('coins', 14)} Cash Cow</p>
        ${heroes.filter(p => p.sold30d > 500).map(p => `<p style="margin:8px 0 0;font-size:13px;display:flex;align-items:center;gap:8px">${productThumb(p, 14)} ${p.name} — Velocity cao</p>`).join('')}
      </div>
      <div class="ds-quadrant ds-quadrant--potential">
        <p style="margin:0;font-weight:600;color:var(--ds-info);display:flex;align-items:center;gap:6px">${icon('sprout', 14)} Potential</p>
        <p style="margin:8px 0 0;font-size:13px;display:flex;align-items:center;gap:8px">${productThumb(getProduct('P007'), 14)} Bộ dùng thử Mini Kit — CVR tốt</p>
      </div>
      <div class="ds-quadrant ds-quadrant--review">
        <p style="margin:0;font-weight:600;color:var(--ds-danger);display:flex;align-items:center;gap:6px">${icon('alert-triangle', 14)} Review</p>
        <p style="margin:8px 0 0;font-size:13px;display:flex;align-items:center;gap:8px">${productThumb(getProduct('P006'), 14)} Son dưỡng môi — compliance risk</p>
      </div>
    </div>`;
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Product Strategy & Hero SKU', 'Xác định sản phẩm chủ lực và chiến lược danh mục')}
    ${dsStatGrid([
      { label: 'Hero SKU', value: heroes.length, hint: 'Sản phẩm chiến lược', tone: 'brand' },
      { label: 'Tiềm năng Scale', value: '2', hint: 'Serum VC, Kem chống nắng', tone: 'success' },
      { label: 'Cần tối ưu', value: '1', hint: 'Son dưỡng môi P006', tone: 'warning' }
    ])}
    ${dsCard('Product Portfolio Matrix', matrix)}
  `));
};

PAGES.channels = () => {
  const channelRows = ZZP_DATA.channels.map(ch =>
    `<div class="ds-kv-row"><div><p style="margin:0;font-weight:500;font-size:14px">${ch.name}</p><p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-muted)">${ch.skus} SKU · Sync: ${ch.lastSync}</p></div>${badge(ch.status, ch.status)}</div>`
  ).join('');
  const skuRows = ZZP_DATA.skuMapping.map(m =>
    `<tr><td style="font-weight:500">${getProduct(m.tiktok)?.name || m.tiktok}</td><td>${m.shopee}</td><td>${m.lazada}</td><td>${m.erp}</td></tr>`
  ).join('');
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Multi-channel & SKU Mapping', 'Chuẩn hóa dữ liệu và đồng bộ sản phẩm giữa nhiều hệ thống')}
    ${dsCard('Channel Integration', `<div class="ds-kv">${channelRows}</div>`)}
    ${dsCard('SKU Mapping', dsTable(['TikTok Shop', 'Shopee', 'Lazada', 'ERP'], skuRows))}
  `));
};
