/* Store — tab Template Center */

function renderStoreTemplateCard(t) {
  const s = ZZP_DATA.store;
  const active = s.activeTemplateId === t.id;
  const camp = t.campaignId ? ZZP_DATA.campaigns.find(c => c.id === t.campaignId) : null;
  const gradients = { T1: `linear-gradient(135deg, ${ZZP_DATA.brandKit.secondaryColor}, #f97316)`, T2: `linear-gradient(135deg, #6366f1, #8b5cf6)`, T3: `linear-gradient(135deg, #ec4899, ${ZZP_DATA.brandKit.secondaryColor})`, T4: `linear-gradient(135deg, ${ZZP_DATA.brandKit.primaryColor}, #059669)` };
  return `
    <div class="ds-template-card${active ? ' is-active' : ''}${t.recommended ? ' is-recommended' : ''}">
      <div class="ds-template-preview" style="background:${gradients[t.id] || gradients.T1}">
        ${t.recommended ? '<span class="ui-badge ui-badge--ads" style="position:absolute;top:8px;right:8px">Đề xuất</span>' : ''}
        ${t.tag}
      </div>
      <div class="ds-template-body">
        <p class="ds-template-name">${t.name}</p>
        <p class="ds-template-desc">${t.desc}</p>
        ${camp ? `<p style="margin:8px 0 0;font-size:11px;color:var(--ds-text-muted)">Chiến dịch: ${camp.name}</p>` : ''}
        ${t.lastUsed ? `<p style="margin:4px 0 0;font-size:11px;color:var(--ds-text-muted)">Dùng gần nhất: ${t.lastUsed}</p>` : ''}
        <div class="ds-template-actions">
          ${active ? badge('Đang áp dụng', 'ok') : dsBtn('Áp dụng', `applyStoreTemplate('${t.id}')`, 'primary', 'sm')}
          ${dsBtn('Xem trước', `previewStoreTemplate('${t.id}')`, 'secondary', 'sm')}
          ${camp ? dsBtn('Chiến dịch', `openDetail('campaign','${camp.id}')`, 'ghost', 'sm') : ''}
        </div>
      </div>
    </div>`;
}

function renderStoreTabTemplates() {
  const catalog = ZZP_DATA.store.templateCatalog;
  return `
    ${dsAlert('info', 'Trung tâm mẫu giao diện', 'Chọn mẫu phù hợp chiến dịch đang chạy. Áp dụng sẽ cập nhật banner, section và CTA trên gian hàng.')}
    <div class="ds-template-grid">${catalog.map(t => renderStoreTemplateCard(t)).join('')}</div>
    ${dsCard('So sánh mẫu giao diện', dsTable(
      ['Mẫu giao diện', 'Nhãn', 'Chiến dịch', 'Lần dùng', 'Trạng thái'],
      catalog.map(t => {
        const camp = t.campaignId ? ZZP_DATA.campaigns.find(c => c.id === t.campaignId)?.name : '—';
        const st = ZZP_DATA.store.activeTemplateId === t.id ? badge('Đang dùng', 'ok') : t.recommended ? badge('Đề xuất', 'warn') : badge('Sẵn sàng', 'muted');
        return `<tr><td>${t.name}</td><td>${badge(t.tag, 'brand')}</td><td>${camp}</td><td>${t.lastUsed || '—'}</td><td>${st}</td></tr>`;
      }).join('')
    ))}`;
}
