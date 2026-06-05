/* Panel mô tả tab — góc nhìn seller: mục tiêu, data cần xem, hành động */

function renderModuleTabBrief(meta) {
  if (!meta) return '';
  const dataItems = (meta.data || []).map(d => `<li>${d}</li>`).join('');
  const actionItems = (meta.actions || []).map(a => `<li>${a}</li>`).join('');
  return `
    <div class="ds-tab-brief">
      <div class="ds-tab-brief-head">
        <span class="ds-tab-brief-eyebrow">${icon('store', 14)} Góc nhìn seller</span>
        ${meta.sellerRole ? `<span class="ds-tab-brief-role">${meta.sellerRole}</span>` : ''}
      </div>
      <div class="ds-tab-brief-grid">
        <div class="ds-tab-brief-col">
          <p class="ds-tab-brief-label">${icon('target', 14)} Mục tiêu</p>
          <p class="ds-tab-brief-text">${meta.goal}</p>
        </div>
        <div class="ds-tab-brief-col">
          <p class="ds-tab-brief-label">${icon('database', 14)} Dữ liệu cần xem</p>
          <ul class="ds-tab-brief-list">${dataItems}</ul>
        </div>
        <div class="ds-tab-brief-col">
          <p class="ds-tab-brief-label">${icon('mouse-pointer-click', 14)} Hành động trên tab này</p>
          <ul class="ds-tab-brief-list">${actionItems}</ul>
        </div>
      </div>
      ${meta.sellerNote ? `<p class="ds-tab-brief-note">${icon('lightbulb', 14)} ${meta.sellerNote}</p>` : ''}
    </div>`;
}
