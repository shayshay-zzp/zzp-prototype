/* Costs — đăng ký tab module */

MODULE_DATA_TABS.costs = () => [
  { label: 'Biểu đồ', icon: 'bar-chart-2',
    meta: COSTS_TAB_META.charts,
    content: () => renderCostsTabCharts() },
  { label: 'Chi tiết', icon: 'list',
    meta: COSTS_TAB_META.detail,
    content: () => renderCostsTabDetail() }
];
