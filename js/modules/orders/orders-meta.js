/* Orders — mô tả tab (seller POV) */

const ORDERS_TAB_META = {
  sla_board: sellerMeta(
    'Order Ops · SLA fulfillment',
    'Theo dõi đơn hàng theo SLA giao/nhận để tránh phạt và hủy đơn.',
    ['Kanban đơn theo trạng thái SLA',
      'Đơn quá hạn vs đúng hạn',
      'Nguồn đơn (affiliate/live/ads)',
      'Tổng đơn cần xử lý'],
    ['Ưu tiên đơn SLA critical',
      'Chạy automation nhập kho nếu thiếu hàng',
      'Mở chi tiết đơn để cập nhật vận chuyển'],
    'Đơn affiliate thường OAV cao hơn — đừng để chậm ship vì ảnh hưởng score creator.'
  ),
  attribution: sellerMeta(
    'Growth · Attribution đơn hàng',
    'Biết kênh nào mang đơn và OAV để phân bổ ngân sách marketing.',
    ['Số đơn theo kênh: Affiliate, Live, Ads, Organic',
      'GMV ước tính từng kênh',
      'OAV trung bình',
      'Tỷ trọng % tổng GMV'],
    ['Tăng ngân sách kênh OAV cao',
      'Điều tra kênh OAV thấp',
      'So sánh với dashboard revenue'],
    'Organic 10% GMV nhưng margin cao nhất — đừng bỏ qua khi chỉ nhìn volume.'
  ),
  list: sellerMeta(
    'CS / Order Ops · Danh sách đơn',
    'Tra cứu nhanh mọi đơn hàng, trạng thái và nguồn.',
    ['Mã đơn, khách, sản phẩm, tổng tiền',
      'Nguồn đơn và SLA',
      'Trạng thái fulfillment',
      'Click mở chi tiết đơn'],
    ['Lọc đơn SLA quá hạn',
      'Mở chi tiết đơn xử lý khiếu nại',
      'Export danh sách cho kho'],
    'Dùng tab SLA Board cho xử lý hàng ngày; tab này để tra cứu và audit.'
  )
};
