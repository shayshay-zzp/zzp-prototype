/* Products — đăng ký tab module */

MODULE_DATA_TABS.products = () => [
  { label: 'Vòng đời', icon: 'refresh-cw',
    count: ZZP_DATA.products.length,
    meta: PRODUCTS_TAB_META.lifecycle,
    content: () => renderProductsTabLifecycle() },
  { label: 'GMV SKU', icon: 'bar-chart-2',
    meta: PRODUCTS_TAB_META.gmv_sku,
    content: () => renderProductsTabGmvSku() }
];
