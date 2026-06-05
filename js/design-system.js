/* ZZP Design System v2 — component builders */

const DS_PHASE = {
  'Khởi tạo': 'init',
  'Vận hành': 'ops',
  'Phân tích': 'analytics',
  'Tối ưu': 'optimize',
  'Hệ thống': 'system'
};

function dsLabel(text) {
  return typeof viLabel === 'function' ? viLabel(text) : text;
}

function dsPage(content) {
  return `<div class="ds-page">${content}</div>`;
}

function dsPageHeader(category, title, desc) {
  const phase = DS_PHASE[category] || 'system';
  return `
    <header class="ds-page-header">
      <div class="ds-page-header-inner">
        <div>
          <span class="ds-phase-tag ds-phase-tag--${phase}">${category}</span>
          <h1 class="ds-page-title">${dsLabel(title)}</h1>
          ${desc ? `<p class="ds-page-desc">${desc}</p>` : ''}
        </div>
      </div>
    </header>`;
}

function dsHero(variant, eyebrow, title, desc, extraHtml = '') {
  return `
    <div class="ds-hero ds-hero--${variant}">
      <p class="ds-hero-eyebrow">${eyebrow}</p>
      <h2 class="ds-hero-title">${title}</h2>
      ${desc ? `<p class="ds-hero-desc">${desc}</p>` : ''}
      ${extraHtml}
    </div>`;
}

function modulePage(category, title, desc, body) {
  return dsPage(dsStack(`${pageHeader(category, title, desc)}${body}`));
}

function dsCard(title, body, opts = {}) {
  const head = title
    ? `<div class="ds-card-head"><h2 class="ds-card-title">${dsLabel(title)}</h2>${opts.action || ''}</div>`
    : '';
  const mod = [opts.highlight ? 'ds-card--highlight' : '', opts.className || ''].filter(Boolean).join(' ');
  return `<section class="ds-card ${mod}">${head}<div class="ds-card-body">${body}</div></section>`;
}

function dsStat(label, value, hint = '', tone = 'default') {
  return `
    <div class="ds-stat ds-stat--${tone}">
      <p class="ds-stat-label">${dsLabel(label)}</p>
      <p class="ds-stat-value">${value}</p>
      ${hint ? `<p class="ds-stat-hint">${hint}</p>` : ''}
    </div>`;
}

function dsStatGrid(stats) {
  return `<div class="ds-stat-grid">${stats.map(s => dsStat(s.label, s.value, s.hint, s.tone || 'default')).join('')}</div>`;
}

function dsBtn(label, onclick, variant = 'primary', size = 'md') {
  return `<button type="button" onclick="${onclick}" class="ds-btn ds-btn--${variant} ds-btn--${size}">${label}</button>`;
}

function dsBtnIcon(label, onclick, iconName, variant = 'primary', size = 'md') {
  return `<button type="button" onclick="${onclick}" class="ds-btn ds-btn--${variant} ds-btn--${size}">${icon(iconName, size === 'sm' ? 12 : 14)}<span>${label}</span></button>`;
}

function dsAlert(type, title, body, actionHtml = '') {
  return `
    <div class="ds-alert ds-alert--${type}">
      <div>
        <p class="ds-alert-title">${title}</p>
        ${body ? `<p class="ds-alert-desc">${body}</p>` : ''}
      </div>
      ${actionHtml ? `<div class="ds-checklist-action">${actionHtml}</div>` : ''}
    </div>`;
}

function dsTable(headers, rowsHtml) {
  const h = headers.map(x => dsLabel(x));
  return `
    <div class="ds-table-wrap">
      <table class="ds-table">
        <thead><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}

function dsKvRows(rows) {
  return `<div class="ds-kv">${rows.map(([l, v]) =>
    `<div class="ds-kv-row"><span class="ds-kv-label">${l}</span><span class="ds-kv-value">${v}</span></div>`
  ).join('')}</div>`;
}

function dsProgress(pct, label, tone = 'brand') {
  const fillCls = tone === 'success' ? 'ds-progress-fill--success' : tone === 'warning' ? 'ds-progress-fill--warning' : tone === 'danger' ? 'ds-progress-fill--danger' : '';
  return `
    <div class="ds-progress">
      ${label ? `<div class="ds-progress-head"><span class="ds-progress-label">${label}</span><span class="ds-progress-value">${pct}%</span></div>` : ''}
      <div class="ds-progress-track"><div class="ds-progress-fill ${fillCls}" style="width:${Math.min(100, pct)}%"></div></div>
    </div>`;
}

function dsListingScore(score) {
  const tone = score >= 85 ? 'high' : score >= 70 ? 'mid' : 'low';
  return `
    <div class="ds-score">
      <div class="ds-score-track"><div class="ds-score-fill ds-score-fill--${tone}" style="width:${score}%"></div></div>
      <span class="ds-score-val">${score}%</span>
    </div>`;
}

function dsGrid(cols, html) {
  return `<div class="ds-grid ds-grid--${cols}">${html}</div>`;
}

function dsKanbanBoard(columnsHtml) {
  return `<div class="ds-kanban">${columnsHtml}</div>`;
}

function dsKanbanColumn(label, count, tone, bodyHtml) {
  return `
    <div class="ds-kanban-col ds-kanban-col--${tone}">
      <div class="ds-kanban-col-head">
        <span class="ds-kanban-col-title">${label}</span>
        <span class="ds-kanban-col-count">${count}</span>
      </div>
      <div class="ds-kanban-col-body">${bodyHtml}</div>
    </div>`;
}

function dsStack(content, sm) {
  return `<div class="ds-stack${sm ? ' ds-stack-sm' : ''}">${content}</div>`;
}

function dsFooterLink(text, onclick) {
  return `<p class="ds-footer-link">${text} <button type="button" class="ds-text-link" onclick="${onclick}">${text.includes('→') ? '' : 'Xem thêm →'}</button></p>`;
}

function dsTip(type, title, desc, actionHtml = '') {
  return `
    <div class="ds-tip ds-tip--${type}">
      <p class="ds-tip-title">${title}</p>
      ${desc ? `<p class="ds-tip-desc">${desc}</p>` : ''}
      ${actionHtml}
    </div>`;
}

function dsChecklistItem(c, actionHtml) {
  const done = c.done;
  return `
    <div class="ds-checklist-item${done ? ' ds-checklist-item--done' : ''}">
      <input type="checkbox" ${done ? 'checked' : ''} onchange="toggleChecklist('${c.id}')" class="ds-check-input">
      <div class="ds-checklist-body">
        <p class="ds-checklist-title${done ? ' ds-checklist-title--done' : ''}">${c.title}</p>
        <p class="ds-checklist-desc">${c.desc}</p>
      </div>
      <div class="ds-checklist-action">${actionHtml}</div>
    </div>`;
}

function dsTimelineChecklist(items, renderRow) {
  const done = items.filter(c => c.done).length;
  return `
    <div class="ds-panel ds-panel--init">
      <div class="ds-panel-head">
        <div>
          <p class="ds-panel-eyebrow">${icon('list-checks', 14)} Shop Setup Checklist</p>
          <h3 class="ds-panel-title">Lộ trình thiết lập gian hàng</h3>
        </div>
        <div class="ds-panel-stat">
          <p class="ds-panel-stat-val">${done}/${items.length}</p>
          <p class="ds-panel-stat-lbl">Health ${calcHealthScore()}%</p>
        </div>
      </div>
      <div class="ds-panel-body">
        ${items.map((c, i) => {
          const isLast = i === items.length - 1;
          return `
            <div class="ds-timeline-item">
              <div class="ds-timeline-rail">
                <div class="ds-timeline-dot ${c.done ? 'ds-timeline-dot--done' : 'ds-timeline-dot--todo'}">${c.done ? icon('check', 16) : i + 1}</div>
                ${!isLast ? `<div class="ds-timeline-line ${c.done ? 'ds-timeline-line--done' : ''}"></div>` : ''}
              </div>
              <div style="min-width:0;padding-bottom:${isLast ? '0' : '8px'}">${renderRow(c)}</div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function dsConnectionCard(shop) {
  return `
    <div class="ds-connection">
      <div class="ds-connection-icon">${icon('circle-check', 32)}</div>
      <p class="ds-connection-title">TikTok Shop đã kết nối</p>
      <p class="ds-connection-sub">${shop.name} · ${shop.category}</p>
      <div style="margin-top:20px;text-align:left;max-width:340px;margin-left:auto;margin-right:auto">
        ${dsKvRows([
          ['Gian hàng', shop.name],
          ['Trạng thái', badge('Đã kết nối', 'connected')],
          ['Seller Center', `<span style="color:var(--ds-success);display:inline-flex;align-items:center;gap:4px;font-weight:600">${icon('check', 14)} Đồng bộ OK</span>`]
        ])}
      </div>
      <div style="margin-top:24px">${dsBtnIcon('Làm mới kết nối', "showToast('Đã làm mới kết nối TikTok Shop')", 'refresh-cw', 'primary', 'md')}</div>
    </div>`;
}

/* Bridge — giữ API cũ */
function pageHeader(category, title, desc, prdRef) {
  const extra = prdRef ? `<p class="ds-page-desc" style="margin-top:10px;padding:10px 14px;border-left:3px solid var(--ds-brand-muted);background:var(--ds-brand-soft);border-radius:0 8px 8px 0;font-size:12px">${prdRef}</p>` : '';
  return dsPageHeader(category, title, desc).replace('</header>', extra + '</header>');
}

function card(title, body, cls = '') {
  const isHighlight = cls.includes('highlight') || cls.includes('gradient');
  return dsCard(title, body, { className: cls, highlight: isHighlight });
}

function statCard(label, value, sub = '', color = 'zzp') {
  const toneMap = { zzp: 'brand', red: 'danger', amber: 'warning', blue: 'info', green: 'success' };
  return dsStat(label, value, sub, toneMap[color] || 'default');
}

function tableWrap(headers, rows) {
  return dsTable(headers, rows);
}
