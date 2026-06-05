/* Livestream — đăng ký tab module */

MODULE_DATA_TABS.livestream = () => [
  { label: 'Hiệu suất', icon: 'bar-chart-2',
    meta: LIVESTREAM_TAB_META.performance,
    content: () => renderLivestreamTabPerformance() },
  { label: 'Phiên live', icon: 'radio',
    count: ZZP_DATA.liveSessions.length,
    meta: LIVESTREAM_TAB_META.sessions,
    content: () => renderLivestreamTabSessions() }
];
