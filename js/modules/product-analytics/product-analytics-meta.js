/* Phân tích sản phẩm — mô tả tab (góc nhìn người bán) */

const PRODUCT_ANALYTICS_TAB_META = {
  sku_performance: sellerMeta(
    'Phân tích · Hiệu suất SKU',
    'Phân tích chuyên sâu hiệu suất từng SKU: GMV (doanh thu gộp), biên lợi nhuận, tốc độ bán.',
    ['Biểu đồ GMV (doanh thu gộp) và biên SKU',
      'Bảng phân tích chi tiết',
      'SKU hàng đầu/hiệu suất thấp',
      'Tương quan điểm trang sản phẩm'],
    ['Tăng quy mô SKU biên + tốc độ bán cao',
      'Tối ưu trang sản phẩm SKU điểm thấp',
      'Ngừng SKU 10% thấp nhất'],
    'Kết hợp tốc độ bán + biên — SKU bán nhanh biên thấp vẫn có thể tăng quy mô nếu sản lượng đủ.'
  ),
  ranking: sellerMeta(
    'Phân tích · Xếp hạng SKU',
    'Xếp hạng SKU theo GMV (doanh thu gộp) để quyết định Tăng quy mô/Tối ưu/Duy trì.',
    ['Hạng GMV (doanh thu gộp) 30 ngày',
      'Số lượng, biên, tốc độ bán',
      'Điểm trang sản phẩm',
      'Nhãn hành động Tăng quy mô/Tối ưu/Duy trì'],
    ['Tăng quy mô 2 SKU hàng đầu',
      'Tối ưu SKU hạng 7',
      'Rà soát SKU Duy trì hàng quý'],
    'Hạng thay đổi sau chiến dịch lớn — làm mới hàng tuần trong mùa sale.'
  )
};
