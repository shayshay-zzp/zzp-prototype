/* Profit — đăng ký tab module */

MODULE_DATA_TABS.profit = () => [
  { label: 'P&L tổng', icon: 'wallet',
    meta: PROFIT_TAB_META.pnl,
    content: () => renderProfitTabPnl() },
  { label: 'Theo sản phẩm', icon: 'package',
    meta: PROFIT_TAB_META.by_product,
    content: () => renderProfitTabByProduct() }
];
