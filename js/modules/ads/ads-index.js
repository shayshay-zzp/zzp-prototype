/* Ads — đăng ký tab module */

MODULE_DATA_TABS.ads = () => [
  { label: 'Campaigns', icon: 'megaphone',
    count: ZZP_DATA.ads.length,
    meta: ADS_TAB_META.campaigns,
    content: () => renderAdsTabCampaigns() },
  { label: 'Gợi ý tối ưu', icon: 'sparkles',
    meta: ADS_TAB_META.suggestions,
    content: () => renderAdsTabSuggestions() }
];
