/* Revenue — đăng ký tab module */

MODULE_DATA_TABS.revenue = () => [
  { label: 'Theo kênh', icon: 'pie-chart',
    meta: REVENUE_TAB_META.by_channel,
    content: () => renderRevenueTabByChannel() },
  { label: 'Theo sản phẩm', icon: 'package',
    meta: REVENUE_TAB_META.by_product,
    content: () => renderRevenueTabByProduct() }
];
