/* Creator Analytics — đăng ký tab module */

MODULE_DATA_TABS['creator-analytics'] = () => [
  { label: 'Bảng điểm', icon: 'star',
    count: ZZP_DATA.kocs.length,
    meta: CREATOR_ANALYTICS_TAB_META.scorecard,
    content: () => renderCreatorAnalyticsTabScorecard() },
  { label: 'Bảng xếp hạng', icon: 'list-ordered',
    meta: CREATOR_ANALYTICS_TAB_META.ranking,
    content: () => renderCreatorAnalyticsTabRanking() }
];
