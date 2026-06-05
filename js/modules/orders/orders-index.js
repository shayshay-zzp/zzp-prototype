/* Orders — đăng ký tab module */

MODULE_DATA_TABS.orders = () => [
  { label: 'Bảng SLA', icon: 'layout-grid',
    count: ZZP_DATA.orders.length,
    meta: ORDERS_TAB_META.sla_board,
    content: () => renderOrdersTabSlaBoard() },
  { label: 'Phân loại nguồn', icon: 'pie-chart',
    meta: ORDERS_TAB_META.attribution,
    content: () => renderOrdersTabAttribution() },
  { label: 'Danh sách đơn', icon: 'list',
    meta: ORDERS_TAB_META.list,
    content: () => renderOrdersTabList() }
];
