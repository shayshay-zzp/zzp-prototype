/* Onboarding — helpers & phase grouping */

const ONBOARDING_PHASES = [
  {
    id: 'foundation',
    label: 'Nền tảng shop',
    desc: 'Kết nối TikTok Shop, xác minh pháp lý, thanh toán & vận chuyển',
    icon: 'plug-zap',
    tone: 'blue'
  },
  {
    id: 'catalog',
    label: 'Sản phẩm & gian hàng',
    desc: 'Đăng SKU chủ lực và trang trí cửa hàng trên TikTok',
    icon: 'package',
    tone: 'teal'
  },
  {
    id: 'growth',
    label: 'Mở rộng bán hàng',
    desc: 'Affiliate, tuân thủ, đào tạo người bán và đồng bộ đa kênh',
    icon: 'trending-up',
    tone: 'violet'
  }
];

const ONBOARDING_PHASE_IDS = {
  foundation: ['c1', 'c2', 'c3', 'c4'],
  catalog: ['c5', 'c6'],
  growth: ['c7', 'c8', 'c9', 'c10']
};

function getOnboardingItems(phaseId) {
  const ids = ONBOARDING_PHASE_IDS[phaseId] || [];
  return ids.map(id => ZZP_DATA.checklist.find(c => c.id === id)).filter(Boolean);
}

function getOnboardingProgress() {
  const total = ZZP_DATA.checklist.length;
  const done = ZZP_DATA.checklist.filter(c => c.done).length;
  const pending = ZZP_DATA.checklist.filter(c => !c.done);
  return { total, done, pending, pct: Math.round(done / total * 100) };
}

function getNextOnboardingStep() {
  return ZZP_DATA.checklist.find(c => !c.done) || null;
}

function getOnboardingModuleLabel(moduleId) {
  const pageId = moduleId === 'products' ? 'products-setup' : moduleId;
  const nav = NAV.flatMap(s => s.items).find(i => i.id === pageId);
  return nav?.label || moduleId;
}

function renderOnboardingHealthRing(score) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  const tone = score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626';
  return `
    <div class="ds-onboard-ring">
      <svg viewBox="0 0 128 128" class="ds-onboard-ring-svg">
        <circle cx="64" cy="64" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="10"/>
        <circle cx="64" cy="64" r="${r}" fill="none" stroke="${tone}" stroke-width="10"
          stroke-dasharray="${dash} ${c}" stroke-linecap="round" transform="rotate(-90 64 64)"/>
      </svg>
      <div class="ds-onboard-ring-center">
        <p class="ds-onboard-ring-val">${score}%</p>
        <p class="ds-onboard-ring-lbl">Sức khỏe shop</p>
      </div>
    </div>`;
}
