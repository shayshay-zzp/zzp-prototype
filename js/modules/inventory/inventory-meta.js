/* Inventory — mô tả tab (seller POV) */

const INVENTORY_TAB_META = {
  stock: sellerMeta(
    'Inventory · Tồn kho SKU',
    'Nắm mức tồn từng SKU và velocity bán để tránh stockout.',
    ['Gauge tồn kho theo SKU',
      'Velocity bán/ngày',
      'Ngày còn lại trước stockout',
      'Mức độ cảnh báo'],
    ['Tạo PO cho SKU < 7 ngày',
      'Giảm ads SKU sắp hết',
      'Đồng bộ tồn Seller Center'],
    'Hero SKU hết hàng = mất GMV live + affiliate cùng lúc — ưu tiên P001/P005.'
  ),
  alerts: sellerMeta(
    'Ops · Cảnh báo tồn kho',
    'Phát hiện SKU sắp hết hàng và kích hoạt nhập hàng ngay.',
    ['Alert critical (P003 Collagen…)',
      'SKU tồn < 200',
      'Velocity và ngày còn lại',
      'Nút chạy flow nhập hàng'],
    ['Chạy automation FLOW_STOCK',
      'Tạm pause quảng cáo SKU critical',
      'Thông báo team live/affiliate'],
    'Stockout 2 ngày có thể mất rank TikTok Shop — xử lý alert trong 24h.'
  ),
  forecast: sellerMeta(
    'Supply Chain · Dự báo nhập hàng',
    'Lên kế hoạch PO dựa trên velocity và lead time nhà cung cấp.',
    ['Dự báo ngày stockout',
      'Đề xuất số lượng PO',
      'Mức độ Critical/Low/OK',
      'Bán/ngày theo SKU'],
    ['Tạo PO theo khuyến nghị',
      'Điều chỉnh MOQ với supplier',
      'Export forecast cho kế toán'],
    'Lead time 14 ngày → đặt PO khi còn 21 ngày tồn, không đợi Critical.'
  )
};
