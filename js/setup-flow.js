/* Luồng thiết lập shop — wizard từng bước + AI tạo sản phẩm */

const SETUP_ACTIONS = {
  c1: { type: 'modal', title: 'Kết nối TikTok Shop OAuth' },
  c2: { type: 'modal', title: 'Xác minh danh tính & giấy phép KD' },
  c3: { type: 'modal', title: 'Thiết lập thanh toán' },
  c4: { type: 'modal', title: 'Cấu hình vận chuyển & kho' },
  c5: { type: 'wizard', title: 'Tạo sản phẩm SKU chủ lực', wizard: 'product' },
  c6: { type: 'navigate', page: 'store' },
  c7: { type: 'navigate', page: 'affiliate' },
  c8: { type: 'navigate', page: 'compliance' },
  c9: { type: 'navigate', page: 'education' },
  c10: { type: 'navigate', page: 'channels' }
};

let productWizard = null;

function renderChecklistRow(c) {
  const done = c.done;
  return `
    <div class="flex items-start gap-3 py-3 border-b border-slate-50 px-2 rounded-lg ${done ? '' : 'hover:bg-zzp-50/40'} transition-colors">
      <input type="checkbox" ${done ? 'checked' : ''} onchange="toggleChecklist('${c.id}')" class="mt-1 rounded border-slate-300 text-zzp-600 focus:ring-zzp-500 shrink-0">
      <div class="flex-1 min-w-0">
        <p class="font-medium text-sm ${done ? 'line-through text-slate-400' : 'text-slate-800'}">${c.title}</p>
        <p class="text-xs text-slate-500 mt-0.5">${c.desc}</p>
      </div>
      <div class="shrink-0 ml-2">
        ${done
          ? `<span class="text-xs text-green-600 inline-flex items-center gap-1">${icon('check', 14)} Hoàn thành</span>`
          : `<button type="button" onclick="startSetup('${c.id}')" class="px-3 py-1.5 bg-zzp-600 text-white rounded-lg text-xs font-medium hover:bg-zzp-700 inline-flex items-center gap-1">${icon('settings', 12)} Thiết lập</button>`}
      </div>
    </div>`;
}

function startSetup(checklistId) {
  const item = ZZP_DATA.checklist.find(c => c.id === checklistId);
  const action = SETUP_ACTIONS[checklistId];
  if (!item || !action) return;

  if (action.type === 'wizard' && action.wizard === 'product') {
    openProductCreateWizard();
    return;
  }
  if (action.type === 'navigate') {
    navigate(action.page);
    showToast(`Bắt đầu thiết lập: ${item.title}`, 'info');
    return;
  }
  openSetupModal(checklistId);
}

function openSetupModal(checklistId) {
  const item = ZZP_DATA.checklist.find(c => c.id === checklistId);
  const action = SETUP_ACTIONS[checklistId];
  const bodies = {
    c1: `
      <p class="text-sm text-slate-600 mb-4">ZZP sẽ kết nối Seller Center qua OAuth để đồng bộ đơn hàng, sản phẩm và Affiliate.</p>
      <div class="p-4 bg-green-50 rounded-xl border border-green-100 text-sm"><p class="font-medium text-green-800">BeautyViet Official · ${ZZP_DATA.shop.id}</p><p class="text-green-700 mt-1">Trạng thái: Đã kết nối</p></div>
      <button onclick="completeSetupStep('${checklistId}')" class="mt-4 w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm">Xác nhận đã kết nối</button>`,
    c2: `
      <p class="text-sm text-slate-600 mb-4">Upload giấy phép kinh doanh và CMND/CCCD chủ shop để TikTok Shop duyệt tài khoản.</p>
      <div class="space-y-2">
        <label class="flex items-center gap-3 p-3 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-zzp-400"><input type="file" class="hidden" onchange="showToast('Đã chọn GPKD')"><span class="text-2xl">📄</span><div><p class="text-sm font-medium">Giấy phép kinh doanh</p><p class="text-xs text-slate-500">PDF hoặc JPG</p></div></label>
        <label class="flex items-center gap-3 p-3 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-zzp-400"><input type="file" class="hidden" onchange="showToast('Đã chọn CMND/CCCD')"><span class="text-2xl">🪪</span><div><p class="text-sm font-medium">CMND / CCCD chủ shop</p><p class="text-xs text-slate-500">Ảnh 2 mặt</p></div></label>
      </div>
      <button onclick="completeSetupStep('${checklistId}')" class="mt-4 w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm">Gửi xác minh</button>`,
    c3: `
      <p class="text-sm text-slate-600 mb-4">Liên kết tài khoản ngân hàng để TikTok Shop thanh toán doanh thu.</p>
      <div class="space-y-3 text-sm">
        <input placeholder="Số tài khoản" class="w-full px-3 py-2 border rounded-lg" value="0123456789">
        <input placeholder="Tên ngân hàng" class="w-full px-3 py-2 border rounded-lg" value="Vietcombank">
        <input placeholder="Chủ tài khoản" class="w-full px-3 py-2 border rounded-lg" value="NGUYEN MINH ANH">
      </div>
      <button onclick="completeSetupStep('${checklistId}')" class="mt-4 w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm">Lưu & xác nhận</button>`,
    c4: `
      <p class="text-sm text-slate-600 mb-4">Chọn đơn vị vận chuyển và cấu hình kho hàng mặc định.</p>
      <div class="space-y-2">${['GHN Express', 'GHTK', 'J&T Express'].map((n, i) => `
        <label class="flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${i < 3 ? 'border-zzp-300 bg-zzp-50' : 'border-slate-200'}">
          <input type="checkbox" checked class="rounded text-zzp-600"> <span class="text-sm font-medium">${n}</span>
        </label>`).join('')}
      </div>
      <button onclick="completeSetupStep('${checklistId}')" class="mt-4 w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm">Kích hoạt vận chuyển</button>`
  };
  openModal(`
    <div class="p-6">
      <div class="flex items-center gap-2 mb-1">${iconBox('settings', 20, 'bg-zzp-100 text-zzp-700')}<h3 class="font-bold text-lg">${action.title}</h3></div>
      <p class="text-xs text-slate-500 mb-4">Bước thiết lập trên ZZP</p>
      ${bodies[checklistId] || `<button onclick="completeSetupStep('${checklistId}')" class="w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm">Hoàn thành</button>`}
      <button onclick="closeModal()" class="mt-2 w-full py-2 text-sm text-slate-500 hover:text-slate-700">Đóng</button>
    </div>`);
}

function completeSetupStep(checklistId) {
  const item = ZZP_DATA.checklist.find(c => c.id === checklistId);
  if (item && !item.done) {
    item.done = true;
    ZZP_DATA.auditLog.unshift({ time: new Date().toLocaleString('vi-VN'), user: 'Nguyễn Minh Anh', action: `Hoàn thành setup: ${item.title}`, module: 'Thiết lập' });
  }
  closeModal();
  updateHealthBadge();
  showToast(`✓ Đã hoàn thành: ${item?.title}`);
  renderCurrentView();
}

/* ===== Wizard tạo sản phẩm + AI hình ảnh ===== */
function openProductCreateWizard() {
  productWizard = {
    step: 0,
    data: {
      name: '', category: 'Serum', price: 289000, cost: 98000, stock: 500,
      sku: '', description: '', title: '',
      aiImages: [], aiVideo: false, listingScore: 0, generating: false
    }
  };
  renderProductWizardModal();
}

function renderProductWizardModal() {
  const w = productWizard;
  if (!w) return;
  const steps = ['Thông tin SP', 'AI nội dung', 'AI hình ảnh', 'Video & tuân thủ', 'Kiểm tra & đăng'];
  const progress = ((w.step + 1) / steps.length) * 100;

  openModal(`
    <div class="p-6" id="product-wizard">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-lg flex items-center gap-2">${icon('sparkles', 18, 'text-zzp-600')} Thiết lập sản phẩm trên ZZP</h3>
        <span class="text-xs text-slate-500">${w.step + 1}/${steps.length}</span>
      </div>
      <div class="h-1.5 bg-slate-100 rounded-full mb-4"><div class="h-1.5 bg-zzp-500 rounded-full transition-all" style="width:${progress}%"></div></div>
      <div class="flex gap-1 mb-5 flex-wrap">${steps.map((s, i) => `
        <span class="text-[10px] px-2 py-0.5 rounded-full ${i === w.step ? 'bg-zzp-600 text-white' : i < w.step ? 'bg-zzp-100 text-zzp-700' : 'bg-slate-100 text-slate-400'}">${i + 1}. ${s}</span>`).join('')}</div>
      ${renderProductWizardStepContent()}
    </div>`, true);
  refreshIcons(document.getElementById('product-wizard'));
}

function renderProductWizardStepContent() {
  const w = productWizard;
  const d = w.data;

  if (w.step === 0) {
    return `
      <p class="text-sm text-slate-600 mb-4">Nhập thông tin cơ bản — ZZP sẽ tối ưu tin đăng TikTok Shop tự động.</p>
      <div class="space-y-3 text-sm">
        <div><label class="text-xs text-slate-500">Tên sản phẩm</label>
          <input id="pw-name" class="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="VD: Serum Vitamin C 30ml" value="${d.name}" oninput="productWizard.data.name=this.value"></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs text-slate-500">Danh mục</label>
            <select id="pw-cat" class="w-full mt-1 px-3 py-2 border rounded-lg" onchange="productWizard.data.category=this.value">
              ${['Serum', 'Kem dưỡng', 'Mặt nạ', 'Toner', 'Chống nắng', 'Son môi', 'Combo'].map(c => `<option ${d.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select></div>
          <div><label class="text-xs text-slate-500">Giá bán (VND)</label>
            <input id="pw-price" type="number" class="w-full mt-1 px-3 py-2 border rounded-lg" value="${d.price}" oninput="productWizard.data.price=+this.value"></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs text-slate-500">Giá vốn</label>
            <input type="number" class="w-full mt-1 px-3 py-2 border rounded-lg" value="${d.cost}" oninput="productWizard.data.cost=+this.value"></div>
          <div><label class="text-xs text-slate-500">Tồn kho ban đầu</label>
            <input type="number" class="w-full mt-1 px-3 py-2 border rounded-lg" value="${d.stock}" oninput="productWizard.data.stock=+this.value"></div>
        </div>
        <label class="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 cursor-pointer">
          <input type="checkbox" checked class="rounded text-zzp-600"> <span class="text-sm">Đánh dấu <strong>SKU chủ lực</strong> (Hero)</span>
        </label>
      </div>
      <button onclick="productWizardNext()" class="mt-5 w-full py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium">Tiếp — AI tạo nội dung →</button>`;
  }

  if (w.step === 1) {
    if (!d.title && d.name) {
      d.title = `[Chính hãng] ${d.name} — Dưỡng da sáng khỏe | TikTok Shop`;
      d.description = `${d.name} — công thức ${d.category.toLowerCase()} cao cấp, phù hợp mọi loại da. ✓ Hàng chính hãng ✓ Giao nhanh 2h ✓ Đổi trả 15 ngày. Thành phần an toàn, không paraben. Hướng dẫn: thoa đều sáng tối sau bước làm sạch.`;
    }
    return `
      <p class="text-sm text-slate-600 mb-3 flex items-center gap-2">${icon('sparkles', 14, 'text-zzp-600')} AI Listing Assist đã tạo tiêu đề & mô tả SEO</p>
      <div class="space-y-3">
        <div class="p-3 bg-zzp-50 rounded-xl border border-zzp-100">
          <p class="text-[10px] uppercase text-zzp-600 font-semibold mb-1">Tiêu đề tin đăng</p>
          <p class="text-sm font-medium">${d.title || '—'}</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p class="text-[10px] uppercase text-slate-500 font-semibold mb-1">Mô tả (${(d.description || '').length} ký tự)</p>
          <p class="text-sm text-slate-600 leading-relaxed">${d.description || '—'}</p>
        </div>
        <div class="flex flex-wrap gap-2">${['SEO tối ưu', 'Hashtag TikTok', 'Bullet benefits', 'INCI ready'].map(t => `<span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">${icon('check', 10)} ${t}</span>`).join('')}</div>
      </div>
      <div class="flex gap-2 mt-5">
        <button onclick="productWizardPrev()" class="flex-1 py-2.5 border rounded-xl text-sm">← Quay lại</button>
        <button onclick="productWizardNext()" class="flex-1 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium">Tiếp — AI tạo hình ảnh →</button>
      </div>`;
  }

  if (w.step === 2) {
    const imgs = d.aiImages.length ? d.aiImages : null;
    return `
      <p class="text-sm text-slate-600 mb-3">AI Product Studio — tạo bộ 6 ảnh chuẩn TikTok Shop (1:1, nền sạch, nhãn INCI)</p>
      ${!imgs ? `
        <div id="ai-gen-area" class="text-center py-8 border-2 border-dashed border-zzp-200 rounded-2xl bg-zzp-50/50">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-zzp-100 flex items-center justify-center text-zzp-600 mb-3">${icon('image', 28)}</div>
          <p class="text-sm font-medium">Chưa có ảnh — bấm để AI tạo</p>
          <p class="text-xs text-slate-500 mt-1">Hero shot · Flat lay · Texture · INCI label · Size ref · Lifestyle</p>
          <button onclick="generateAiProductImages()" class="mt-4 px-6 py-2.5 bg-gradient-to-r from-zzp-600 to-blue-600 text-white rounded-xl text-sm font-medium inline-flex items-center gap-2">${icon('sparkles', 16)} Tạo 6 ảnh bằng AI</button>
        </div>` : `
        <div class="grid grid-cols-3 gap-2 mb-3">
          ${d.aiImages.map((img, i) => `
            <div class="aspect-square rounded-xl overflow-hidden border border-slate-200 relative group" style="background:${img.bg}">
              <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-2 text-center">
                <span class="text-2xl mb-1">${img.emoji}</span>
                <span class="text-[10px] font-medium opacity-90">${img.label}</span>
              </div>
              <span class="absolute top-1 right-1 w-5 h-5 bg-green-500 text-white rounded-full text-[10px] flex items-center justify-center">${icon('check', 10)}</span>
            </div>`).join('')}
        </div>
        <p class="text-xs text-green-600 flex items-center gap-1">${icon('check', 12)} 6/6 ảnh đạt chuẩn TikTok Shop · 1:1 · ≥1000px</p>
        <button onclick="generateAiProductImages()" class="mt-2 text-xs text-zzp-600 hover:underline">Tạo lại bộ ảnh</button>`}
      <div class="flex gap-2 mt-5">
        <button onclick="productWizardPrev()" class="flex-1 py-2.5 border rounded-xl text-sm">← Quay lại</button>
        <button onclick="productWizardNext()" ${!imgs ? 'disabled class="flex-1 py-2.5 bg-slate-200 text-slate-400 rounded-xl text-sm cursor-not-allowed"' : 'class="flex-1 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium"'}>${imgs ? 'Tiếp — Video & tuân thủ →' : 'Cần tạo ảnh trước'}</button>
      </div>`;
  }

  if (w.step === 3) {
    return `
      <p class="text-sm text-slate-600 mb-4">Bổ sung video demo và kiểm tra tuân thủ ngành mỹ phẩm.</p>
      <div class="space-y-3">
        <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-zzp-300 ${d.aiVideo ? 'border-green-300 bg-green-50' : ''}">
          <input type="checkbox" ${d.aiVideo ? 'checked' : ''} onchange="productWizard.data.aiVideo=this.checked;renderProductWizardModal()" class="rounded text-zzp-600">
          <div><p class="text-sm font-medium">Video demo 15–30s</p><p class="text-xs text-slate-500">AI gợi ý script + storyboard (Routine 3 bước)</p></div>
        </label>
        <div class="p-3 rounded-xl border border-slate-200 space-y-2 text-sm">
          <p class="font-medium text-xs text-slate-500 uppercase">Compliance mỹ phẩm</p>
          ${[['Ảnh nhãn INCI', true], ['Không claim y tế', true], ['Ảnh thật sản phẩm', true], ['Giá & SKU khớp', true]].map(([t, ok]) => `
            <div class="flex items-center gap-2 ${ok ? 'text-green-700' : 'text-red-600'}">${icon(ok ? 'check' : 'x', 14)} ${t}</div>`).join('')}
        </div>
      </div>
      <div class="flex gap-2 mt-5">
        <button onclick="productWizardPrev()" class="flex-1 py-2.5 border rounded-xl text-sm">← Quay lại</button>
        <button onclick="productWizardNext()" class="flex-1 py-2.5 bg-zzp-600 text-white rounded-xl text-sm font-medium">Tiếp — Kiểm tra & đăng →</button>
      </div>`;
  }

  if (w.step === 4) {
    const score = calcWizardListingScore();
    d.listingScore = score;
    return `
      <div class="text-center mb-4">
        <p class="text-sm text-slate-600">Listing Quality Score</p>
        <p class="text-4xl font-bold ${score >= 85 ? 'text-green-600' : 'text-amber-600'}">${score}%</p>
        ${score >= 85 ? `<p class="text-xs text-green-600 mt-1">${icon('check', 12)} Đủ điều kiện SKU chủ lực</p>` : `<p class="text-xs text-amber-600 mt-1">Cần ≥85% để đánh dấu Hero</p>`}
      </div>
      <div class="space-y-2 text-sm mb-4">
        ${[['Tiêu đề SEO', 95], ['Mô tả ≥200 ký tự', 100], ['6 ảnh AI', d.aiImages.length >= 6 ? 100 : 0], ['Video demo', d.aiVideo ? 90 : 40], ['Compliance', 88]].map(([k, v]) => `
          <div class="flex justify-between items-center py-1 border-b border-slate-50">
            <span>${k}</span><span class="font-medium ${v >= 85 ? 'text-green-600' : 'text-amber-600'}">${v}%</span>
          </div>`).join('')}
      </div>
      <button onclick="publishProductFromWizard()" class="w-full py-3 bg-gradient-to-r from-zzp-600 to-teal-600 text-white rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2">${icon('upload', 16)} Đăng lên TikTok Shop</button>
      <button onclick="productWizardPrev()" class="mt-2 w-full py-2 text-sm text-slate-500">← Quay lại</button>`;
  }
  return '';
}

function calcWizardListingScore() {
  const d = productWizard?.data;
  if (!d) return 0;
  let s = 0;
  if (d.title) s += 20;
  if ((d.description || '').length >= 200) s += 20;
  if (d.aiImages.length >= 6) s += 35;
  if (d.aiVideo) s += 15;
  else s += 5;
  s += 10;
  return Math.min(98, s);
}

async function generateAiProductImages() {
  const area = document.getElementById('ai-gen-area');
  if (area) {
    area.innerHTML = `<div class="py-8"><div class="w-10 h-10 mx-auto border-2 border-zzp-600 border-t-transparent rounded-full animate-spin mb-3"></div><p class="text-sm text-zzp-700 font-medium">AI đang tạo hình ảnh...</p><p class="text-xs text-slate-500 mt-1" id="ai-gen-status">Phân tích sản phẩm</p></div>`;
  }
  const labels = ['Hero shot', 'Flat lay', 'Texture', 'Nhãn INCI', 'Size ref', 'Lifestyle'];
  const bgs = ['linear-gradient(135deg,#14b8a6,#0d9488)', 'linear-gradient(135deg,#f0fdfa,#99f6e4)', 'linear-gradient(135deg,#fef3c7,#fde68a)', 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', 'linear-gradient(135deg,#fce7f3,#fbcfe8)', 'linear-gradient(135deg,#ecfdf5,#a7f3d0)'];
  const emojis = ['✨', '🧴', '💧', '🏷️', '📏', '🌿'];
  productWizard.data.aiImages = [];
  for (let i = 0; i < 6; i++) {
    await new Promise(r => setTimeout(r, 450));
    const st = document.getElementById('ai-gen-status');
    if (st) st.textContent = `Tạo ảnh ${i + 1}/6: ${labels[i]}`;
    productWizard.data.aiImages.push({ label: labels[i], bg: bgs[i], emoji: emojis[i] });
  }
  showToast('AI đã tạo 6 ảnh sản phẩm');
  renderProductWizardModal();
}

function productWizardNext() {
  if (productWizard.step === 0 && !productWizard.data.name.trim()) {
    showToast('Vui lòng nhập tên sản phẩm', 'error');
    return;
  }
  if (productWizard.step === 2 && productWizard.data.aiImages.length < 6) return;
  productWizard.step++;
  renderProductWizardModal();
}

function productWizardPrev() {
  if (productWizard.step > 0) { productWizard.step--; renderProductWizardModal(); }
}

function publishProductFromWizard() {
  const d = productWizard.data;
  const id = 'P' + String(ZZP_DATA.products.length + 1).padStart(3, '0');
  const sku = 'BV-' + d.category.substring(0, 4).toUpperCase().replace(/\s/g, '') + '-' + Date.now().toString().slice(-4);
  const newProduct = {
    id, sku, name: d.name, price: d.price, cost: d.cost, stock: d.stock,
    sold30d: 0, listingScore: d.listingScore, status: 'active',
    category: d.category, hero: d.listingScore >= 85, channels: ['tiktok']
  };
  ZZP_DATA.products.push(newProduct);
  ZZP_DATA.auditLog.unshift({ time: new Date().toLocaleString('vi-VN'), user: 'Nguyễn Minh Anh', action: `Đăng SP mới: ${d.name} (${d.listingScore}%)`, module: 'Ra mắt sản phẩm' });

  const heroes = ZZP_DATA.products.filter(p => p.hero && p.listingScore >= 85);
  const c5 = ZZP_DATA.checklist.find(c => c.id === 'c5');
  if (c5 && heroes.length >= 5) c5.done = true;

  closeModal();
  productWizard = null;
  updateHealthBadge();
  showToast(`✓ Đã đăng "${d.name}" lên TikTok Shop · Score ${d.listingScore}%`);
  navigate('products-setup');
}

function renderRecommendedSteps(compact) {
  const pending = ZZP_DATA.checklist.filter(c => !c.done);
  const next = pending[0];
  const steps = [
    { n: 1, title: 'Thiết lập SKU chủ lực (AI)', desc: 'Wizard tạo SP + 6 ảnh AI · điểm tin đăng ≥ 85%', action: 'openProductCreateWizard()', cta: 'Bắt đầu', highlight: true },
    { n: 2, title: 'Tiếp thị liên kết + gửi mẫu KOC', desc: 'Kích hoạt chương trình & gửi mẫu creator', action: "navigate('affiliate')", cta: 'Thiết lập' },
    { n: 3, title: 'Chạy Mega Live đầu tiên', desc: 'Quy trình chuẩn bị live + chiến dịch flash sale', action: "runAutomationFlow('FLOW_LIVE_PREP')", cta: 'Chạy quy trình' }
  ];
  if (compact) {
    return card('Bước tiếp theo được đề xuất', `
      <ol class="space-y-3 text-sm">${steps.map(s => `
        <li class="flex gap-3 items-start">
          <span class="w-7 h-7 rounded-full ${s.highlight ? 'bg-zzp-600 text-white' : 'bg-zzp-100 text-zzp-700'} flex items-center justify-center text-xs font-bold shrink-0">${s.n}</span>
          <div class="flex-1 min-w-0"><button type="button" onclick="${s.action}" class="font-medium text-zzp-600 hover:underline text-left">${s.title}</button><p class="text-xs text-slate-500">${s.desc}</p></div>
          <button type="button" onclick="${s.action}" class="text-xs px-2.5 py-1 border border-zzp-200 text-zzp-700 rounded-lg hover:bg-zzp-50 shrink-0">${s.cta}</button>
        </li>`).join('')}</ol>`);
  }
  return `
    <div class="mb-6 rounded-2xl border border-zzp-200 bg-white shadow-sm overflow-hidden">
      <div class="px-5 py-4 bg-gradient-to-r from-zzp-50 to-white border-b border-zzp-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-zzp-600 flex items-center gap-1">${icon('route', 14)} Lộ trình đề xuất</p>
          <h3 class="font-bold text-slate-800 mt-0.5">3 bước tiếp theo để bắt đầu bán</h3>
        </div>
        ${next ? `<button type="button" onclick="startSetup('${next.id}')" class="px-4 py-2 bg-zzp-600 text-white rounded-xl text-sm font-medium inline-flex items-center gap-2 hover:bg-zzp-700">${icon('play', 14)} Làm ngay: ${next.title.length > 28 ? next.title.slice(0, 28) + '…' : next.title}</button>` : ''}
      </div>
      <div class="p-5 grid md:grid-cols-3 gap-4">
        ${steps.map(s => `
          <button type="button" onclick="${s.action}" class="text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${s.highlight ? 'border-zzp-400 bg-zzp-50/80 ring-1 ring-zzp-200' : 'border-slate-200 hover:border-zzp-300 bg-white'}">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-full ${s.highlight ? 'bg-zzp-600 text-white' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-sm font-bold">${s.n}</span>
              ${s.highlight ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-zzp-600 text-white font-medium">Ưu tiên</span>` : ''}
            </div>
            <p class="font-semibold text-sm text-slate-800">${s.title}</p>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">${s.desc}</p>
            <span class="inline-flex items-center gap-1 text-xs text-zzp-600 font-medium mt-3">${s.cta} ${icon('arrow-right', 12)}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function renderSetupBanner() {
  const pending = ZZP_DATA.checklist.filter(c => !c.done);
  if (!pending.length) return '';
  return `
    <div class="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
      <div><p class="font-medium text-amber-900">Còn ${pending.length} bước thiết lập chưa hoàn thành</p>
        <p class="text-sm text-amber-700">Bấm <strong>Thiết lập</strong> từng mục hoặc chạy wizard tạo sản phẩm AI</p></div>
      <button type="button" onclick="startSetup('${pending[0].id}')" class="px-4 py-2 bg-zzp-600 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2">${icon('play', 14)} Tiếp tục thiết lập</button>
    </div>`;
}
