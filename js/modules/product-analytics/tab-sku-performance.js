/* Product Analytics — tab SKU Performance */

function renderProductAnalyticsTabSkuPerformance() {
  return chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md'], ['Margin top SKU', 'chart-product-margin', 'sm']]) +
    card('SKU Performance', renderTtsBreakdownTable('product-analytics'));
}
