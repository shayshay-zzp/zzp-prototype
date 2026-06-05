/* Content — mô tả tab (seller POV) */

const CONTENT_TAB_META = {
  calendar: sellerMeta(
    'Content Ops · Lịch sản xuất',
    'Lên lịch video, brief và deadline đăng content từ KOC/agency.',
    ['Calendar content theo tuần',
      'Task pending vs published',
      'KOC gắn từng video',
      'Deadline và trạng thái'],
    ['Thêm task content mới',
      'Nhắc KOC deadline',
      'Gắn Spark Ads cho video hot'],
    'Publish đều 3–4 video/tuần giúp algorithm TikTok Shop ổn định hơn burst rồi im.'
  ),
  performance: sellerMeta(
    'Content Analyst · Hiệu suất video',
    'Đo views, CTR, đơn và GMV từng video để scale nội dung hiệu quả.',
    ['Views, CTR, orders, GMV/video',
      'KOC sản xuất',
      'Trạng thái published/pending',
      'Click mở chi tiết video'],
    ['Boost video CTR > 3% bằng Spark Ads',
      'Brief lại format video convert cao',
      'Archive video performance thấp'],
    'Video views cao nhưng CTR thấp → thường do hook yếu hoặc SKU link sai.'
  )
};
