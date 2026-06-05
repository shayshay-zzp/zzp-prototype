/* Product Analytics — tab SKU Performance */

function renderProductAnalyticsTabSkuPerformance() {
  return chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md'], ['Biên lợi nhuận SKU hàng đầu', 'chart-product-margin', 'sm']]) +
    card('Hiệu suất SKU', renderTtsBreakdownTable('product-analytics'));
}
