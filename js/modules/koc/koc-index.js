/* KOC — đăng ký tab module */

MODULE_DATA_TABS.koc = () => [
  { label: 'Pipeline CRM', icon: 'columns-3',
    count: ZZP_DATA.kocs.length,
    meta: KOC_TAB_META.pipeline,
    content: () => renderKocTabPipeline() },
  { label: 'Bảng điểm', icon: 'star',
    meta: KOC_TAB_META.scoreboard,
    content: () => renderKocTabScoreboard() }
];
