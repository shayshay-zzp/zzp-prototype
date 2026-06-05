/* Product Analytics — mô tả tab (seller POV) */

const PRODUCT_ANALYTICS_TAB_META = {
  sku_performance: sellerMeta(
    'Analytics · SKU performance',
    'Phân tích deep-dive hiệu suất từng SKU: GMV, margin, velocity.',
    ['Charts GMV và margin SKU',
      'Breakdown analytics table',
      'Top/bottom SKU',
      'Listing score correlation'],
    ['Scale SKU margin + velocity cao',
      'Optimize listing SKU score thấp',
      'Discontinue SKU bottom 10%'],
    'Kết hợp velocity + margin — SKU bán nhanh margin thấp vẫn có thể scale nếu volume đủ.'
  ),
  ranking: sellerMeta(
    'Analytics · SKU ranking',
    'Xếp hạng SKU theo GMV để quyết định Scale/Optimize/Maintain.',
    ['Rank GMV 30d',
      'Units, margin, velocity',
      'Listing score',
      'Action tag Scale/Optimize/Maintain'],
    ['Scale top 2 SKU',
      'Optimize SKU rank 7',
      'Review Maintain SKU quarterly'],
    'Rank thay đổi sau campaign lớn — refresh weekly trong mùa sale.'
  )
};
