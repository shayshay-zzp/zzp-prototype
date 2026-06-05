/* Products — mô tả tab (seller POV) */

const PRODUCTS_TAB_META = {
  lifecycle: sellerMeta(
    'Merchandising · Product lifecycle',
    'Theo dõi SKU qua các giai đoạn: draft → active → hero → clearance.',
    ['Trạng thái lifecycle từng SKU',
      'Listing score và compliance',
      'Hero vs non-hero',
      'SKU cần optimize listing'],
    ['Promote SKU lên hero',
      'Fix listing compliance',
      'Clearance SKU tồn cao'],
    'SKU compliance fail vẫn hiện trên shop nếu đã publish — ưu tiên fix trước campaign.'
  ),
  gmv_sku: sellerMeta(
    'Merchandising · GMV theo SKU',
    'Biết SKU nào mang doanh thu chính để pin shop và phân bổ marketing.',
    ['Biểu đồ GMV 30d theo SKU',
      'Top vs bottom performer',
      'Trend GMV SKU hero',
      'So sánh cross-SKU'],
    ['Pin top GMV lên storefront',
      'Bundle SKU bán chậm với hero',
      'Điều chỉnh giá SKU underperform'],
    'Top 3 SKU thường > 60% GMV — đảm bảo tồn kho và listing score luôn green.'
  )
};
