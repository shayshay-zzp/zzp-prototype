/* Live Analytics — mô tả tab (seller POV) */

const LIVE_ANALYTICS_TAB_META = {
  session_metrics: sellerMeta(
    'Live Analytics · Session metrics',
    'Metrics chi tiết từng phiên live: viewers, conversion, GMV.',
    ['Breakdown metrics per session',
      'Peak viewers, avg watch time',
      'Conversion rate live',
      'GMV per session'],
    ['Compare host performance',
      'Optimize SKU mix phiên underperform',
      'Schedule replay top session'],
    'Conversion live 3–5% là good benchmark beauty category VN.'
  ),
  comparison: sellerMeta(
    'Live Analytics · Expected vs actual',
    'So sánh GMV dự kiến vs thực tế để cải thiện forecast.',
    ['Expected GMV per session',
      'Actual GMV achieved',
      'Gap % positive/negative',
      'Forecast accuracy trend'],
    ['Review phiên gap > -20%',
      'Adjust forecast model',
      'Reward host beat forecast'],
    'Underforecast liên tục → thiếu tồn kho live; overforecast → team live demotivated.'
  )
};
