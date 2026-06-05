/* Affiliate Analytics — đăng ký tab module */

MODULE_DATA_TABS['affiliate-analytics'] = () => [
  { label: 'Creator', icon: 'users',
    meta: AFFILIATE_ANALYTICS_TAB_META.creator,
    content: () => renderAffiliateAnalyticsTabCreator() },
  { label: 'Campaign ROI', icon: 'megaphone',
    meta: AFFILIATE_ANALYTICS_TAB_META.campaign_roi,
    content: () => renderAffiliateAnalyticsTabCampaignRoi() }
];
