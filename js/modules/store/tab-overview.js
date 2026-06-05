/* Store — tab Tổng quan */

function renderStoreSetupChecklist() {
  const steps = MODULE_GUIDES.store.steps;
  return `<div class="ds-stack-sm">${steps.map((st, i) => {
    const ok = st.done();
    return `
      <div class="ds-section-row" style="cursor:default">
        <span class="ds-section-order">${ok ? icon('check', 14) : i + 1}</span>
        <div style="flex:1;min-width:0">
          <p style="margin:0;font-weight:600;font-size:13px;${ok ? 'color:var(--ds-text-muted);text-decoration:line-through' : ''}">${st.title}</p>
          <p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-secondary)">${st.desc}</p>
        </div>
        ${!ok && st.action === 'applyTemplate' ? dsBtn('Làm ngay', "selectModuleDataTab('store', 3)", 'primary', 'sm') : ''}
        ${!ok && st.action === 'previewStore' ? dsBtn('Pin SKU', "selectModuleDataTab('store', 2)", 'secondary', 'sm') : ''}
        ${ok ? badge('Xong', 'ok') : badge('Chưa xong', 'warn')}
      </div>`;
  }).join('')}</div>`;
}

function renderStoreConversionScorecard() {
  syncStoreConversionChecks();
  const passed = ZZP_DATA.store.conversionChecks.filter(c => c.pass).length;
  const total = ZZP_DATA.store.conversionChecks.length;
  return dsCard('Sẵn sàng chuyển đổi', `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div>
        <p style="margin:0;font-size:28px;font-weight:800;color:var(--ds-brand)">${passed}/${total}</p>
        <p style="margin:4px 0 0;font-size:12px;color:var(--ds-text-muted)">Tiêu chí conversion đạt</p>
      </div>
      ${dsProgress(Math.round(passed / total * 100), 'Điểm conversion')}
    </div>
    <div class="ds-kv">${ZZP_DATA.store.conversionChecks.map(c =>
      `<div class="ds-kv-row"><span class="ds-kv-label">${c.label}</span>${c.pass ? badge('Đạt', 'ok') : badge('Thiếu', 'warn')}</div>`
    ).join('')}</div>`);
}

function renderStoreTabOverview() {
  const s = ZZP_DATA.store;
  return `
    ${dsGrid(2, `
      ${dsCard('Lộ trình thiết lập cửa hàng (c6)', renderStoreSetupChecklist())}
      ${renderStoreConversionScorecard()}
    `)}
    ${dsCard('Hành động nhanh', `
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${dsBtnIcon('Nhận diện thương hiệu', "selectModuleDataTab('store', 1)", 'palette', 'secondary', 'md')}
        ${dsBtnIcon('Trang trí & Pin SKU', "selectModuleDataTab('store', 2)", 'layout', 'secondary', 'md')}
        ${dsBtnIcon('Chọn template', "selectModuleDataTab('store', 3)", 'layout-template', 'secondary', 'md')}
        ${dsBtnIcon('Xem trước shop', "selectModuleDataTab('store', 4)", 'smartphone', 'secondary', 'md')}
        ${dsBtnIcon('Xuất bản TikTok Shop', 'publishStorefront()', 'upload', 'primary', 'md')}
      </div>`)}
    ${dsCard('Lịch sử xuất bản', dsTable(
      ['Thời gian', 'Người thực hiện', 'Hành động', 'Trạng thái'],
      s.publishHistory.map(h =>
        `<tr><td>${h.time}</td><td>${h.user}</td><td>${h.action}</td><td>${badge(h.status === 'live' ? 'Đang live' : 'Nháp', h.status === 'live' ? 'ok' : 'warn')}</td></tr>`
      ).join('')
    ))}`;
}
