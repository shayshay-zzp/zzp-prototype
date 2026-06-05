/* Chi phí — mô tả tab (góc nhìn người bán) */

const COSTS_TAB_META = {
  charts: sellerMeta(
    'Tài chính · Cơ cấu chi phí',
    'Trực quan hóa cơ cấu chi phí và tỷ lệ chi phí/GMV (doanh thu gộp).',
    ['Biểu đồ tròn/cột cấu trúc chi phí',
      '% chi phí trên GMV (doanh thu gộp)',
      'Xu hướng quảng cáo so với giá vốn hàng bán',
      'Chuẩn ngành'],
    ['Điều tra chi phí quảng cáo tăng',
      'Thương lượng giá vốn hàng bán với nhà cung cấp',
      'Đặt trần chi phí % GMV (doanh thu gộp)'],
    'Quảng cáo > 15% GMV (doanh thu gộp) thường khó có lãi trừ khi giá trị vòng đời khách cao hoặc kênh tự nhiên mạnh.'
  ),
  detail: sellerMeta(
    'Tài chính · Chi tiết chi phí',
    'Tra cứu từng loại chi phí: giá vốn hàng bán, vận chuyển, hoa hồng, quảng cáo, phiếu giảm giá…',
    ['8 loại chi phí chi tiết',
      'Số tiền và % GMV (doanh thu gộp)',
      'Xu hướng tăng/giảm',
      'So với tháng trước'],
    ['Cắt phiếu giảm giá nếu ROI (tỷ suất đầu tư) thấp',
      'Rà soát phí đại lý',
      'Đối chiếu hoa hồng với chiến dịch'],
    'Hoa hồng tiếp thị liên kết + phí nền tảng thường chiếm 15–20% GMV (doanh thu gộp) — tính vào giá bán.'
  )
};
