/* Executive — đăng ký tab module */

MODULE_DATA_TABS.executive = () => [
  { label: 'Tổng quan', icon: 'layout-dashboard',
    meta: EXECUTIVE_TAB_META.overview,
    content: () => renderExecutiveTabOverview() },
  { label: 'Phân bổ GMV', icon: 'pie-chart',
    meta: EXECUTIVE_TAB_META.gmv_breakdown,
    content: () => renderExecutiveTabGmvBreakdown() }
];
