/* Live Analytics — đăng ký tab module */

MODULE_DATA_TABS['live-analytics'] = () => [
  { label: 'Chỉ số phiên', icon: 'radio',
    meta: LIVE_ANALYTICS_TAB_META.session_metrics,
    content: () => renderLiveAnalyticsTabSessionMetrics() },
  { label: 'So sánh', icon: 'git-compare',
    meta: LIVE_ANALYTICS_TAB_META.comparison,
    content: () => renderLiveAnalyticsTabComparison() }
];
