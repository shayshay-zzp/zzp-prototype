/* Creator Analytics — mô tả tab (seller POV) */

const CREATOR_ANALYTICS_TAB_META = {
  scorecard: sellerMeta(
    'Creator Analytics · Scorecards',
    'Dashboard scorecard từng creator: engagement, GMV, content quality.',
    ['Grid scorecard KOC',
      'Score, tier, lifecycle',
      'GMV và ROI',
      'Video output'],
    ['Renew top scorecard',
      'Coaching creator score trung bình',
      'Archive inactive creator'],
    'Scorecard giúp so sánh creator cùng tier — dùng cho quarterly review.'
  ),
  ranking: sellerMeta(
    'Creator Analytics · Ranking',
    'Bảng xếp hạng creator theo score và GMV.',
    ['Rank KOC by score',
      'GMV 30d, ROI, tier',
      'Lifecycle stage',
      'Video count'],
    ['Invite top rank vào exclusive program',
      'Re-negotiate commission bottom rank',
      'Export ranking report'],
    'Creator rank drop 2 tháng liên tiếp → review hợp đồng trước khi renew.'
  )
};
