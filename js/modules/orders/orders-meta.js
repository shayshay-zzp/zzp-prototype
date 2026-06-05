/* Đơn hàng — mô tả tab (góc nhìn người bán) */

const ORDERS_TAB_META = {
  sla_board: sellerMeta(
    'Vận hành đơn hàng · SLA (thời hạn xử lý) giao hàng',
    'Theo dõi đơn hàng theo SLA (thời hạn xử lý) giao/nhận để tránh phạt và hủy đơn.',
    ['Bảng cột đơn theo trạng thái SLA (thời hạn xử lý)',
      'Đơn quá hạn so với đúng hạn',
      'Nguồn đơn (tiếp thị liên kết/live/quảng cáo)',
      'Tổng đơn cần xử lý'],
    ['Ưu tiên đơn SLA (thời hạn xử lý) khẩn cấp',
      'Chạy tự động hóa nhập kho nếu thiếu hàng',
      'Mở chi tiết đơn để cập nhật vận chuyển'],
    'Đơn tiếp thị liên kết thường có giá trị đơn trung bình cao hơn — đừng để chậm giao vì ảnh hưởng điểm người sáng tạo.'
  ),
  attribution: sellerMeta(
    'Tăng trưởng · Phân bổ nguồn đơn hàng',
    'Biết kênh nào mang đơn và giá trị đơn trung bình để phân bổ ngân sách tiếp thị.',
    ['Số đơn theo kênh: Tiếp thị liên kết, Live, Quảng cáo, Tự nhiên',
      'GMV (doanh thu gộp) ước tính từng kênh',
      'Giá trị đơn trung bình',
      'Tỷ trọng % tổng GMV (doanh thu gộp)'],
    ['Tăng ngân sách kênh có giá trị đơn trung bình cao',
      'Điều tra kênh có giá trị đơn trung bình thấp',
      'So sánh với bảng điều khiển doanh thu'],
    'Kênh tự nhiên 10% GMV (doanh thu gộp) nhưng biên lợi nhuận cao nhất — đừng bỏ qua khi chỉ nhìn sản lượng.'
  ),
  list: sellerMeta(
    'Chăm sóc khách hàng / Vận hành đơn hàng · Danh sách đơn',
    'Tra cứu nhanh mọi đơn hàng, trạng thái và nguồn.',
    ['Mã đơn, khách, sản phẩm, tổng tiền',
      'Nguồn đơn và SLA (thời hạn xử lý)',
      'Trạng thái xử lý giao hàng',
      'Bấm mở chi tiết đơn'],
    ['Lọc đơn SLA (thời hạn xử lý) quá hạn',
      'Mở chi tiết đơn xử lý khiếu nại',
      'Xuất danh sách cho kho'],
    'Dùng tab Bảng SLA (thời hạn xử lý) cho xử lý hàng ngày; tab này để tra cứu và kiểm tra.'
  )
};
