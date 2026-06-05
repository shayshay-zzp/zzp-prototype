/* Affiliate Analytics — mô tả tab (seller POV) */

const AFFILIATE_ANALYTICS_TAB_META = {
  creator: sellerMeta(
    'Affiliate Analytics · Creator performance',
    'Đo hiệu suất creator trên marketplace và contribution GMV.',
    ['Marketplace performance table',
      'Affiliate contribution chart',
      'Top creator GMV share',
      'Commission paid'],
    ['Recruit creator similar to top performer',
      'Adjust commission tier',
      'Analyze creator churn'],
    'Marketplace creator mới cần 2–4 tuần ramp — đừng judge ROI tuần đầu.'
  ),
  campaign_roi: sellerMeta(
    'Affiliate Analytics · Campaign ROI',
    'So sánh ROI campaign affiliate sau commission và COGS.',
    ['Spent, GMV, ROI từng campaign',
      'Commission payout',
      'Net profit estimate',
      'Campaign comparison'],
    ['Scale campaign net profit dương cao',
      'Pause campaign net âm',
      'Clone winning campaign structure'],
    'Net profit = GMV - spent - commission - COGS estimate — ROI gross có thể misleading.'
  )
};
