/* Store Optimization — đăng ký tab module */

MODULE_DATA_TABS.store = () => [
  { label: 'Tổng quan', icon: 'layout-dashboard', meta: STORE_TAB_META.overview, content: () => renderStoreTabOverview() },
  { label: 'Brand Kit', icon: 'palette', meta: STORE_TAB_META.brandKit, content: () => renderStoreTabBrandKit() },
  { label: 'Trang trí', icon: 'layout', count: ZZP_DATA.store.pinnedProductIds.length, meta: STORE_TAB_META.decoration, content: () => renderStoreTabDecoration() },
  { label: 'Template', icon: 'layout-template', count: ZZP_DATA.store.templateCatalog.length, meta: STORE_TAB_META.templates, content: () => renderStoreTabTemplates() },
  { label: 'Xem trước', icon: 'smartphone', meta: STORE_TAB_META.preview, content: () => renderStoreTabPreview() },
  { label: 'SEO & CTA', icon: 'search', meta: STORE_TAB_META.seo, content: () => renderStoreTabSeo() }
];
