/* Affiliate — đăng ký tab module */

MODULE_DATA_TABS.affiliate = () => [
  { label: 'Tổng quan SAM', icon: 'target',
    meta: AFFILIATE_TAB_META.overview,
    content: () => renderAffiliateTabOverview() },
  { label: 'Creator & GMV', icon: 'users',
    count: ZZP_DATA.kocs.filter(k => k.gmv30d > 0).length,
    meta: AFFILIATE_TAB_META.creator_gmv,
    content: () => renderAffiliateTabCreatorGmv() },
  { label: 'Chiến dịch', icon: 'megaphone',
    count: ZZP_DATA.campaigns.length,
    meta: AFFILIATE_TAB_META.campaigns,
    content: () => renderAffiliateTabCampaigns() }
];
