/* Panel mô tả tab — góc nhìn seller (gọn, 1 khối) */

function renderModuleTabBrief(meta) {
  if (!meta) return '';
  const data = (meta.data || []).slice(0, 3).join(' · ');
  const actions = (meta.actions || []).slice(0, 2).join(' · ');
  const role = meta.sellerRole ? ` · ${meta.sellerRole}` : '';
  return `
    <div class="ds-tab-brief ds-tab-brief--compact">
      <p class="ds-tab-brief-line"><strong>${meta.goal}</strong>${role}</p>
      <p class="ds-tab-brief-meta">${data ? `<strong>Xem:</strong> ${data}` : ''}${actions ? `${data ? ' · ' : ''}<strong>Làm:</strong> ${actions}` : ''}${meta.sellerNote ? ` · ${meta.sellerNote}` : ''}</p>
    </div>`;
}
