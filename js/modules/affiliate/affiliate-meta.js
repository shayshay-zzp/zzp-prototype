/* Affiliate — mô tả tab (seller POV) */

const AFFILIATE_TAB_META = {
  overview: sellerMeta(
    'Affiliate Manager · SAM funnel',
    'Theo dõi funnel Seller Affiliate Marketing — từ outreach creator đến GMV thực tế.',
    ['Funnel SAM: tiếp cận → sample → content → GMV',
      'Conversion rate từng bước',
      'Creator đang active vs tiềm năng',
      'GMV affiliate 30 ngày'],
    ['Xác định nút thắt funnel (sample hay content)',
      'Ưu tiên creator có ROI cao',
      'Mở chi tiết KOC từ funnel'],
    'Nếu bước sample convert thấp, kiểm tra brief và SKU gửi mẫu trước khi tăng commission.'
  ),
  creator_gmv: sellerMeta(
    'Creator Ops · Hiệu suất affiliate',
    'So sánh GMV và tier creator để biết ai đáng scale commission hoặc gửi thêm sample.',
    ['Bảng breakdown GMV theo creator',
      'Biểu đồ GMV top KOC',
      'Phân bổ tier (Nano/Micro/Macro)',
      'ROI từng creator'],
    ['Scale creator ROAS > 5x',
      'Gửi sample cho creator có views cao nhưng GMV thấp',
      'Mở marketplace tìm creator mới'],
    'Top 20% creator thường mang 80% GMV affiliate — tab này giúp tập trung ngân sách đúng người.'
  ),
  campaigns: sellerMeta(
    'Campaign Ops · Chiến dịch affiliate',
    'Quản lý chiến dịch affiliate/promotion đang chạy và ROI thực tế.',
    ['Danh sách campaign affiliate & promotion',
      'Spent vs budget, thời gian chạy',
      'ROI và GMV từng campaign',
      'Trạng thái active/pause'],
    ['Mở chi tiết campaign để chỉnh commission',
      'Pause campaign ROI < 2x',
      'Clone campaign hiệu quả sang SKU mới'],
    'Campaign promotion flash sale thường kéo GMV ngắn hạn — đối chiếu với margin trước khi kéo dài.'
  )
};
