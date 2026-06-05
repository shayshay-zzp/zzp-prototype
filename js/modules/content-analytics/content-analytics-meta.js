/* Content Analytics — mô tả tab (seller POV) */

const CONTENT_ANALYTICS_TAB_META = {
  charts: sellerMeta(
    'Content Analytics · Charts',
    'Visualize CVR và views từng video để tìm pattern content thắng.',
    ['Chart CVR by video',
      'Chart views by video',
      'Outlier detection',
      'Format comparison'],
    ['Replicate format video CVR cao',
      'Boost views cao CVR thấp (hook issue)',
      'Brief KOC theo top format'],
    'CVR > 2% trên TikTok Shop content là strong — study hook 3s đầu của video đó.'
  ),
  video_table: sellerMeta(
    'Content Analytics · Video table',
    'Bảng chi tiết performance video published.',
    ['Video title, views, CTR',
      'Orders và GMV',
      'Click mở chi tiết',
      'Filter published only'],
    ['Gắn Spark Ads top GMV video',
      'Archive video GMV = 0 sau 30 ngày',
      'Share best practice nội bộ'],
    'Sort by GMV not views — video viral không convert vẫn tốn creator fee.'
  )
};
