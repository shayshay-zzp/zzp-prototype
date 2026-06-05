/* Onboarding — trang thiết lập shop (UI v3) */

function renderOnboardingStepRow(c) {
  const done = c.done;
  const next = getNextOnboardingStep();
  const isNext = !done && next?.id === c.id;
  const moduleLabel = getOnboardingModuleLabel(c.module);
  const modulePage = c.module === 'products' ? 'products-setup' : c.module;
  const action = done
    ? `<span class="ds-onboard-step-done">${icon('check', 14)} Hoàn thành</span>`
    : dsBtnIcon('Thiết lập', `startSetup('${c.id}')`, 'arrow-right', 'primary', 'sm');
  return `
    <div class="ds-onboard-step${done ? ' is-done' : ''}${isNext ? ' is-next' : ''}">
      <div class="ds-onboard-step-icon${done ? ' is-done' : ''}">
        ${done ? icon('check', 16) : icon('circle', 16)}
      </div>
      <div class="ds-onboard-step-body">
        <div class="ds-onboard-step-head">
          <p class="ds-onboard-step-title">${c.title}</p>
          ${isNext ? '<span class="ui-badge ui-badge--brand">Tiếp theo</span>' : ''}
        </div>
        <p class="ds-onboard-step-desc">${c.desc}</p>
        <button type="button" class="ds-onboard-step-module" onclick="event.stopPropagation();navigate('${modulePage}')">
          ${icon('external-link', 12)} ${moduleLabel}
        </button>
      </div>
      <div class="ds-onboard-step-action">${action}</div>
    </div>`;
}

function renderOnboardingPhase(phase) {
  const items = getOnboardingItems(phase.id);
  const done = items.filter(c => c.done).length;
  const pct = Math.round(done / items.length * 100);
  const isComplete = done === items.length;
  return `
    <section class="ds-onboard-phase ds-onboard-phase--${phase.tone}${isComplete ? ' is-complete' : ''}">
      <div class="ds-onboard-phase-head">
        <div class="ds-onboard-phase-icon">${icon(phase.icon, 18)}</div>
        <div class="ds-onboard-phase-meta">
          <p class="ds-onboard-phase-label">${phase.label}</p>
          <p class="ds-onboard-phase-desc">${phase.desc}</p>
        </div>
        <div class="ds-onboard-phase-progress">
          <p class="ds-onboard-phase-pct">${done}/${items.length}</p>
          ${dsProgress(pct, '', isComplete ? 'success' : 'brand')}
        </div>
      </div>
      <div class="ds-onboard-phase-steps">
        ${items.map(c => renderOnboardingStepRow(c)).join('')}
      </div>
    </section>`;
}

function renderOnboardingHero() {
  const prog = getOnboardingProgress();
  const health = calcHealthScore();
  const next = getNextOnboardingStep();
  const shop = ZZP_DATA.shop;
  return `
    <div class="ds-onboard-hero">
      <div class="ds-onboard-hero-main">
        <p class="ds-onboard-hero-eyebrow">${icon('sparkles', 14)} Thiết lập shop TikTok</p>
        <h2 class="ds-onboard-hero-title">${shop.name}</h2>
        <p class="ds-onboard-hero-desc">${shop.category} · ${shop.id} · Đồng bộ ${shop.lastSync}</p>
        <div class="ds-onboard-hero-stats">
          <div class="ds-onboard-hero-stat">
            <p class="ds-onboard-hero-stat-val">${prog.done}/${prog.total}</p>
            <p class="ds-onboard-hero-stat-lbl">Bước hoàn thành</p>
          </div>
          <div class="ds-onboard-hero-stat">
            <p class="ds-onboard-hero-stat-val">${prog.pending.length}</p>
            <p class="ds-onboard-hero-stat-lbl">Còn lại</p>
          </div>
          <div class="ds-onboard-hero-stat">
            <p class="ds-onboard-hero-stat-val">${shop.oauthStatus === 'connected' ? 'Đang live' : 'Chưa'}</p>
            <p class="ds-onboard-hero-stat-lbl">Kết nối OAuth</p>
          </div>
        </div>
        ${next ? `
          <div class="ds-onboard-hero-cta">
            ${dsBtnIcon(`Tiếp tục: ${next.title.length > 36 ? next.title.slice(0, 36) + '…' : next.title}`, `startSetup('${next.id}')`, 'play', 'primary', 'md')}
            ${dsBtn('Xem tất cả bước', "document.getElementById('onboard-checklist')?.scrollIntoView({behavior:'smooth'})", 'ghost', 'md')}
          </div>` : `
          <div class="ds-onboard-hero-cta">
            ${dsBtnIcon('Shop đã sẵn sàng — Mở dashboard', "navigate('dashboard')", 'layout-dashboard', 'primary', 'md')}
          </div>`}
      </div>
      <div class="ds-onboard-hero-aside">
        ${renderOnboardingHealthRing(health)}
        <p class="ds-onboard-hero-health-hint">${health >= 80 ? 'Đủ điều kiện mở rộng Ads & Affiliate' : `Cần ${80 - health}% nữa để mở khóa mở rộng`}</p>
      </div>
    </div>`;
}

function renderOnboardingShopPanel() {
  const shop = ZZP_DATA.shop;
  const connected = shop.oauthStatus === 'connected';
  return `
    <div class="ds-onboard-shop-card">
      <div class="ds-onboard-shop-head">
        <div class="ds-onboard-shop-avatar">BV</div>
        <div>
          <p class="ds-onboard-shop-name">${shop.name}</p>
          <p class="ds-onboard-shop-sub">${shop.category}</p>
        </div>
        ${badge(connected ? 'Đã kết nối' : 'Chưa kết nối', connected ? 'ok' : 'warn')}
      </div>
      ${dsKvRows([
        ['ID shop', `<span style="font-family:ui-monospace;font-size:12px">${shop.id}</span>`],
        ['OAuth', connected ? badge('Seller Center OK', 'ok') : badge('Cần xác thực', 'warn')],
        ['Điểm sức khỏe', `<strong>${calcHealthScore()}%</strong>`],
        ['Đồng bộ cuối', shop.lastSync]
      ])}
      <div class="ds-onboard-shop-actions">
        ${dsBtnIcon('Làm mới kết nối', "showToast('Đã làm mới token OAuth TikTok Shop')", 'refresh-cw', 'secondary', 'sm')}
        ${dsBtn('Seller Center', "showToast('Mở TikTok Seller Center')", 'ghost', 'sm')}
      </div>
    </div>`;
}

function renderOnboardingLaunchPath() {
  const steps = [
    { n: 1, title: 'Tạo SKU chủ lực với AI', desc: 'Trình 5 bước · điểm listing ≥ 85%', icon: 'sparkles', action: 'openProductCreateWizard()', highlight: true },
    { n: 2, title: 'Trang trí gian hàng', desc: 'Nhận diện thương hiệu, pin Hero SKU, xuất bản shop', icon: 'store', action: "navigate('store')" },
    { n: 3, title: 'Chuẩn bị Mega Live đầu tiên', desc: 'Danh sách kiểm tra live + flash sale + voucher', icon: 'radio', action: "runAutomationFlow('FLOW_LIVE_PREP')" }
  ];
  return `
    <div class="ds-onboard-launch">
      <p class="ds-onboard-launch-title">${icon('rocket', 16)} Lộ trình ra mắt nhanh</p>
      <p class="ds-onboard-launch-sub">3 bước seller mới nên làm ngay sau khi kết nối shop</p>
      <div class="ds-onboard-launch-grid">
        ${steps.map(s => `
          <button type="button" class="ds-onboard-launch-card${s.highlight ? ' is-highlight' : ''}" onclick="${s.action}">
            <span class="ds-onboard-launch-num">${s.n}</span>
            <span class="ds-onboard-launch-icon">${icon(s.icon, 18)}</span>
            <p class="ds-onboard-launch-card-title">${s.title}</p>
            <p class="ds-onboard-launch-card-desc">${s.desc}</p>
            <span class="ds-onboard-launch-link">Bắt đầu ${icon('arrow-right', 12)}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function renderOnboardingSyncStrip() {
  const sources = ZZP_DATA.dataSync.slice(0, 4);
  return `
    <div class="ds-onboard-sync">
      <p class="ds-onboard-sync-title">${icon('database', 14)} Trạng thái đồng bộ</p>
      <div class="ds-onboard-sync-grid">
        ${sources.map(d => `
          <div class="ds-onboard-sync-item">
            <span class="ds-onboard-sync-dot${d.status === 'live' ? ' is-live' : ''}"></span>
            <div>
              <p class="ds-onboard-sync-name">${d.source}</p>
              <p class="ds-onboard-sync-meta">${d.latency} · ${d.lastSync}</p>
            </div>
          </div>`).join('')}
      </div>
      <button type="button" class="ds-text-link" style="margin-top:12px;font-size:12px" onclick="navigate('datahub')">Xem trung tâm dữ liệu →</button>
    </div>`;
}

function renderOnboardingPage() {
  return dsPage(dsStack(`
    ${pageHeader('Khởi tạo', 'Thiết lập shop', 'Hoàn thiện danh sách kiểm tra để shop sẵn sàng bán trên TikTok — seller biết còn thiếu gì và làm ở đâu')}
    ${renderOnboardingHero()}
    ${dsGrid(2, `
      <div id="onboard-checklist" class="ds-stack-sm">
        ${ONBOARDING_PHASES.map(p => renderOnboardingPhase(p)).join('')}
      </div>
      <div class="ds-stack-sm">
        ${renderOnboardingShopPanel()}
        ${renderOnboardingLaunchPath()}
        ${renderOnboardingSyncStrip()}
      </div>
    `)}
  `));
}
