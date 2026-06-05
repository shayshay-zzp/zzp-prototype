/* Content — đăng ký tab module */

MODULE_DATA_TABS.content = () => [
  { label: 'Lịch & task', icon: 'calendar-days',
    count: ZZP_DATA.content.length,
    meta: CONTENT_TAB_META.calendar,
    content: () => renderContentTabCalendar() },
  { label: 'Hiệu suất video', icon: 'video',
    meta: CONTENT_TAB_META.performance,
    content: () => renderContentTabPerformance() }
];
