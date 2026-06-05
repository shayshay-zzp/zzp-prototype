/* Costs — mô tả tab (seller POV) */

const COSTS_TAB_META = {
  charts: sellerMeta(
    'Finance · Cost structure',
    'Visualize cơ cấu chi phí và tỷ lệ chi phí/GMV.',
    ['Pie/bar cấu trúc chi phí',
      '% chi phí trên GMV',
      'Trend ads vs COGS',
      'Benchmark ngành'],
    ['Investigate chi phí ads tăng',
      'Negotiate COGS với supplier',
      'Set cap chi phí % GMV'],
    'Ads > 15% GMV thường khó profitable trừ khi LTV cao hoặc organic mạnh.'
  ),
  detail: sellerMeta(
    'Finance · Chi tiết chi phí',
    'Tra cứu từng loại chi phí: COGS, ship, commission, ads, voucher…',
    ['8 loại chi phí chi tiết',
      'Số tiền và % GMV',
      'Trend tăng/giảm',
      'So với tháng trước'],
    ['Cắt voucher nếu ROI thấp',
      'Review agency fee',
      'Align commission với campaign'],
    'Commission affiliate + platform fee thường chiếm 15–20% GMV — factor vào pricing.'
  )
};
