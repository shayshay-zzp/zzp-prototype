/* Lucide Icons — stroke icons thống nhất, không dùng emoji */
function icon(name, size = 16, cls = '') {
  return `<i data-lucide="${name}" class="lucide-icon ${cls}" style="width:${size}px;height:${size}px"></i>`;
}

function iconBox(name, size = 18, boxCls = 'bg-slate-100 text-slate-600', iconCls = '') {
  const dim = size + 14;
  return `<span class="ui-icon-box ${boxCls}" style="width:${dim}px;height:${dim}px;min-width:${dim}px;min-height:${dim}px">${icon(name, size, iconCls)}</span>`;
}

function refreshIcons(root) {
  if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'stroke-width': 1.75 }, nameAttr: 'data-lucide', root: root || document });
}

const PRODUCT_ICON_MAP = {
  P001: { name: 'flask-conical', bg: 'bg-amber-50', text: 'text-amber-600' },
  P002: { name: 'droplets', bg: 'bg-sky-50', text: 'text-sky-600' },
  P003: { name: 'scan-face', bg: 'bg-violet-50', text: 'text-violet-600' },
  P004: { name: 'beaker', bg: 'bg-cyan-50', text: 'text-cyan-600' },
  P005: { name: 'sun', bg: 'bg-orange-50', text: 'text-orange-600' },
  P006: { name: 'sparkles', bg: 'bg-pink-50', text: 'text-pink-600' },
  P007: { name: 'package-open', bg: 'bg-teal-50', text: 'text-teal-600' }
};

function productThumb(product, size = 18) {
  const meta = PRODUCT_ICON_MAP[product.id] || { name: 'box', bg: 'bg-slate-100', text: 'text-slate-500' };
  return iconBox(meta.name, size, `${meta.bg} ${meta.text}`);
}

const FLOW_ICONS = {
  FLOW_STOCK: 'package-search',
  FLOW_ADS: 'megaphone-off',
  FLOW_COMPLIANCE: 'shield-alert',
  FLOW_AI_ACTION: 'brain-circuit',
  FLOW_ORDER_SLA: 'clock-alert',
  FLOW_LIVE_PREP: 'radio-tower',
  FLOW_SAMPLE: 'gift',
  FLOW_OPTIMIZE: 'trending-up'
};

const ALERT_DOT = {
  critical: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500'
};

function alertDot(severity) {
  return `<span class="inline-block w-2 h-2 rounded-full shrink-0 mt-1.5 ${ALERT_DOT[severity] || ALERT_DOT.info}"></span>`;
}

const DASHBOARD_MODULES = [
  { l: 'Khởi tạo', icon: 'rocket', pg: 'onboarding', color: 'text-blue-600 bg-blue-50' },
  { l: 'Vận hành', icon: 'settings-2', pg: 'orders', color: 'text-emerald-600 bg-emerald-50' },
  { l: 'Phân tích', icon: 'bar-chart-3', pg: 'executive', color: 'text-amber-600 bg-amber-50' },
  { l: 'Tối ưu', icon: 'zap', pg: 'growth-assistant', color: 'text-rose-600 bg-rose-50' }
];
