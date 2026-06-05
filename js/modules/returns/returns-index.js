/* Returns — đăng ký tab module */

MODULE_DATA_TABS.returns = () => [
  { label: 'Case hoàn/hủy', icon: 'rotate-ccw',
    count: ZZP_DATA.returns.length,
    meta: RETURNS_TAB_META.cases,
    content: () => renderReturnsTabCases() },
  { label: 'Thống kê', icon: 'bar-chart-2',
    meta: RETURNS_TAB_META.stats,
    content: () => renderReturnsTabStats() }
];
