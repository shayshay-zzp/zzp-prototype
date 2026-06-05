/* Tab phân loại dữ liệu trên từng trang module — gom nội dung rõ ràng */

const moduleDataTabIndex = {};
const MODULE_DATA_TABS = {};

function getModuleDataTab(pageId) {
  return moduleDataTabIndex[pageId] ?? 0;
}

function selectModuleDataTab(pageId, index) {
  moduleDataTabIndex[pageId] = index;
  renderCurrentView();
}

function renderModuleTabBar(pageId, tabs, active) {
  const idx = Math.min(active, tabs.length - 1);
  const activeTab = tabs[idx];
  const brief = typeof renderModuleTabBrief === 'function' && activeTab?.meta
    ? renderModuleTabBrief(activeTab.meta)
    : '';
  return `
    <div class="ds-tabs">
      ${tabs.map((t, i) => `
        <button type="button" onclick="selectModuleDataTab('${pageId}', ${i})"
          class="ds-tab${idx === i ? ' is-active' : ''}">
          ${icon(t.icon || 'folder', 14)}
          <span>${t.label}</span>
          ${t.count != null ? `<span class="ds-tab-count">${t.count}</span>` : ''}
        </button>`).join('')}
    </div>
    ${brief}
    <div class="ds-tab-panel">${activeTab.content()}</div>`;
}

function renderModuleDataTabs(pageId) {
  const builder = MODULE_DATA_TABS[pageId];
  if (!builder) return '';
  const tabs = builder();
  if (!tabs?.length) return '';
  return renderModuleTabBar(pageId, tabs, getModuleDataTab(pageId));
}
