/* Module tab scripts — load order documentation
 * Shared deps (load once before modules):
 *   js/modules/shared/module-meta-base.js
 *   js/modules/shared/data-tab-helpers.js
 *
 * Per-module order: {module}-meta.js → tab-*.js → {module}-index.js
 */

const MODULE_TAB_SCRIPTS = [
  // Affiliate
  'js/modules/affiliate/affiliate-meta.js',
  'js/modules/affiliate/tab-overview.js',
  'js/modules/affiliate/tab-creator-gmv.js',
  'js/modules/affiliate/tab-campaigns.js',
  'js/modules/affiliate/affiliate-index.js',
  // Orders
  'js/modules/orders/orders-meta.js',
  'js/modules/orders/tab-sla-board.js',
  'js/modules/orders/tab-attribution.js',
  'js/modules/orders/tab-list.js',
  'js/modules/orders/orders-index.js',
  // Inventory
  'js/modules/inventory/inventory-meta.js',
  'js/modules/inventory/tab-stock.js',
  'js/modules/inventory/tab-alerts.js',
  'js/modules/inventory/tab-forecast.js',
  'js/modules/inventory/inventory-index.js',
  // KOC
  'js/modules/koc/koc-meta.js',
  'js/modules/koc/tab-pipeline.js',
  'js/modules/koc/tab-scoreboard.js',
  'js/modules/koc/koc-index.js',
  // Samples
  'js/modules/samples/samples-meta.js',
  'js/modules/samples/tab-roi-overview.js',
  'js/modules/samples/tab-pipeline.js',
  'js/modules/samples/tab-table.js',
  'js/modules/samples/samples-index.js',
  // Content
  'js/modules/content/content-meta.js',
  'js/modules/content/tab-calendar.js',
  'js/modules/content/tab-performance.js',
  'js/modules/content/content-index.js',
  // Livestream
  'js/modules/livestream/livestream-meta.js',
  'js/modules/livestream/tab-performance.js',
  'js/modules/livestream/tab-sessions.js',
  'js/modules/livestream/livestream-index.js',
  // Ads
  'js/modules/ads/ads-meta.js',
  'js/modules/ads/tab-campaigns.js',
  'js/modules/ads/tab-suggestions.js',
  'js/modules/ads/ads-index.js',
  // Products
  'js/modules/products/products-meta.js',
  'js/modules/products/tab-lifecycle.js',
  'js/modules/products/tab-gmv-sku.js',
  'js/modules/products/products-index.js',
  // Returns
  'js/modules/returns/returns-meta.js',
  'js/modules/returns/tab-cases.js',
  'js/modules/returns/tab-stats.js',
  'js/modules/returns/returns-index.js',
  // Executive
  'js/modules/executive/executive-meta.js',
  'js/modules/executive/tab-overview.js',
  'js/modules/executive/tab-gmv-breakdown.js',
  'js/modules/executive/executive-index.js',
  // Revenue
  'js/modules/revenue/revenue-meta.js',
  'js/modules/revenue/tab-by-channel.js',
  'js/modules/revenue/tab-by-product.js',
  'js/modules/revenue/revenue-index.js',
  // Profit
  'js/modules/profit/profit-meta.js',
  'js/modules/profit/tab-pnl.js',
  'js/modules/profit/tab-by-product.js',
  'js/modules/profit/profit-index.js',
  // Costs
  'js/modules/costs/costs-meta.js',
  'js/modules/costs/tab-charts.js',
  'js/modules/costs/tab-detail.js',
  'js/modules/costs/costs-index.js',
  // Product Analytics
  'js/modules/product-analytics/product-analytics-meta.js',
  'js/modules/product-analytics/tab-sku-performance.js',
  'js/modules/product-analytics/tab-ranking.js',
  'js/modules/product-analytics/product-analytics-index.js',
  // Creator Analytics
  'js/modules/creator-analytics/creator-analytics-meta.js',
  'js/modules/creator-analytics/tab-scorecard.js',
  'js/modules/creator-analytics/tab-ranking.js',
  'js/modules/creator-analytics/creator-analytics-index.js',
  // Affiliate Analytics
  'js/modules/affiliate-analytics/affiliate-analytics-meta.js',
  'js/modules/affiliate-analytics/tab-creator.js',
  'js/modules/affiliate-analytics/tab-campaign-roi.js',
  'js/modules/affiliate-analytics/affiliate-analytics-index.js',
  // Content Analytics
  'js/modules/content-analytics/content-analytics-meta.js',
  'js/modules/content-analytics/tab-charts.js',
  'js/modules/content-analytics/tab-video-table.js',
  'js/modules/content-analytics/content-analytics-index.js',
  // Live Analytics
  'js/modules/live-analytics/live-analytics-meta.js',
  'js/modules/live-analytics/tab-session-metrics.js',
  'js/modules/live-analytics/tab-comparison.js',
  'js/modules/live-analytics/live-analytics-index.js',
];
