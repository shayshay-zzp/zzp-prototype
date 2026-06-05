/* KOC — mô tả tab (seller POV) */

const KOC_TAB_META = {
  pipeline: sellerMeta(
    'KOC Manager · CRM pipeline',
    'Quản lý creator qua các giai đoạn lifecycle từ prospect đến revenue.',
    ['Kanban lifecycle: prospect → sample → content → revenue',
      'Số KOC từng stage',
      'GMV theo stage',
      'Creator cần follow-up'],
    ['Chuyển KOC sang stage tiếp theo',
      'Gửi sample cho prospect hot',
      'Archive creator không phản hồi'],
    'Creator stuck ở sample > 14 ngày thường cần brief mới hoặc đổi SKU mẫu.'
  ),
  scoreboard: sellerMeta(
    'KOC Manager · Score & ranking',
    'Xếp hạng creator theo score, GMV và ROI để ưu tiên hợp tác.',
    ['Score tổng hợp từng KOC',
      'Tier, GMV 30d, ROI',
      'Lifecycle stage',
      'Số video đã đăng'],
    ['Mở chi tiết KOC score cao',
      'Renew hợp đồng top performer',
      'Coaching creator score thấp'],
    'Score ≥ 80 + ROI > 5x là nhóm nên tăng commission hoặc exclusive deal.'
  )
};
