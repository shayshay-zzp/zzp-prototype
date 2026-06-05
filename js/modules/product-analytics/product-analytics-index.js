/* Product Analytics — đăng ký tab module */

MODULE_DATA_TABS['product-analytics'] = () => [
  { label: 'SKU Performance', icon: 'bar-chart-2',
    meta: PRODUCT_ANALYTICS_TAB_META.sku_performance,
    content: () => renderProductAnalyticsTabSkuPerformance() },
  { label: 'Xếp hạng', icon: 'list-ordered',
    meta: PRODUCT_ANALYTICS_TAB_META.ranking,
    content: () => renderProductAnalyticsTabRanking() }
];
