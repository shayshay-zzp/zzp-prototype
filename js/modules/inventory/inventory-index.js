/* Inventory — đăng ký tab module */

MODULE_DATA_TABS.inventory = () => [
  { label: 'Tồn kho SKU', icon: 'package',
    count: ZZP_DATA.products.length,
    meta: INVENTORY_TAB_META.stock,
    content: () => renderInventoryTabStock() },
  { label: 'Cảnh báo', icon: 'triangle-alert',
    count: ZZP_DATA.products.filter(p => p.stock < 100).length,
    meta: INVENTORY_TAB_META.alerts,
    content: () => renderInventoryTabAlerts() },
  { label: 'Dự báo & PO', icon: 'trending-up',
    meta: INVENTORY_TAB_META.forecast,
    content: () => renderInventoryTabForecast() }
];
