/* Content Analytics — đăng ký tab module */

MODULE_DATA_TABS['content-analytics'] = () => [
  { label: 'Biểu đồ', icon: 'bar-chart-2',
    meta: CONTENT_ANALYTICS_TAB_META.charts,
    content: () => renderContentAnalyticsTabCharts() },
  { label: 'Bảng video', icon: 'video',
    meta: CONTENT_ANALYTICS_TAB_META.video_table,
    content: () => renderContentAnalyticsTabVideoTable() }
];
