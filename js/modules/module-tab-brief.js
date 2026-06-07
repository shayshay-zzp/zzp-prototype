/* Panel mô tả tab — góc nhìn seller */

function renderModuleTabBrief(meta) {
  if (!meta) return '';
  const dataItems = meta.data || [];
  const actionItems = meta.actions || [];
  const hasCols = dataItems.length || actionItems.length;
  return `
    <div class="ds-tab-brief">
      <header class="ds-tab-brief-head">
        <h4 class="ds-tab-brief-goal">${meta.goal}</h4>
        ${meta.sellerRole ? `<p class="ds-tab-brief-role">${meta.sellerRole}</p>` : ''}
      </header>
      ${hasCols ? `
        <div class="ds-tab-brief-cols">
          <div class="ds-tab-brief-col">
            <p class="ds-tab-brief-label">Xem</p>
            <ul class="ds-tab-brief-items">${dataItems.length
              ? dataItems.map(d => `<li>${d}</li>`).join('')
              : '<li class="ds-tab-brief-empty">Không có mục</li>'}</ul>
          </div>
          <div class="ds-tab-brief-col">
            <p class="ds-tab-brief-label">Làm</p>
            <ul class="ds-tab-brief-items">${actionItems.length
              ? actionItems.map(a => `<li>${a}</li>`).join('')
              : '<li class="ds-tab-brief-empty">Không có mục</li>'}</ul>
          </div>
        </div>` : ''}
      ${meta.sellerNote ? `<p class="ds-tab-brief-note">${meta.sellerNote}</p>` : ''}
    </div>`;
}
