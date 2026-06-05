#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MODULES_DIR = path.join(ROOT, 'js/modules');

function toConstPrefix(pageId) {
  return pageId.replace(/-/g, '_').toUpperCase();
}

function toRenderPrefix(pageId) {
  return pageId
    .split('-')
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join('');
}

const MODULES = [
  {
    pageId: 'affiliate',
    title: 'Affiliate',
    tabs: [
      {
        slug: 'overview',
        label: 'Tổng quan SAM',
        icon: 'target',
        render: 'renderAffiliateTabOverview',
        body: `function renderAffiliateTabOverview() {
  return renderAffiliateSamFunnel();
}`,
        meta: {
          role: 'Affiliate Manager · SAM funnel',
          goal: 'Theo dõi funnel Seller Affiliate Marketing — từ outreach creator đến GMV thực tế.',
          data: ['Funnel SAM: tiếp cận → sample → content → GMV', 'Conversion rate từng bước', 'Creator đang active vs tiềm năng', 'GMV affiliate 30 ngày'],
          actions: ['Xác định nút thắt funnel (sample hay content)', 'Ưu tiên creator có ROI cao', 'Mở chi tiết KOC từ funnel'],
          note: 'Nếu bước sample convert thấp, kiểm tra brief và SKU gửi mẫu trước khi tăng commission.'
        }
      },
      {
        slug: 'creator-gmv',
        label: 'Creator & GMV',
        icon: 'users',
        count: 'ZZP_DATA.kocs.filter(k => k.gmv30d > 0).length',
        render: 'renderAffiliateTabCreatorGmv',
        body: `function renderAffiliateTabCreatorGmv() {
  return card('Hiệu suất Creator', renderTtsBreakdownTable('affiliate')) +
    chartGrid([['GMV theo KOC', 'chart-affiliate', 'md'], ['Phân bổ tier', 'chart-aff-tier', 'sm']]);
}`,
        meta: {
          role: 'Creator Ops · Hiệu suất affiliate',
          goal: 'So sánh GMV và tier creator để biết ai đáng scale commission hoặc gửi thêm sample.',
          data: ['Bảng breakdown GMV theo creator', 'Biểu đồ GMV top KOC', 'Phân bổ tier (Nano/Micro/Macro)', 'ROI từng creator'],
          actions: ['Scale creator ROAS > 5x', 'Gửi sample cho creator có views cao nhưng GMV thấp', 'Mở marketplace tìm creator mới'],
          note: 'Top 20% creator thường mang 80% GMV affiliate — tab này giúp tập trung ngân sách đúng người.'
        }
      },
      {
        slug: 'campaigns',
        label: 'Chiến dịch',
        icon: 'megaphone',
        count: 'ZZP_DATA.campaigns.length',
        render: 'renderAffiliateTabCampaigns',
        body: `function renderAffiliateTabCampaigns() {
  return card('Chiến dịch Affiliate & Promotion', renderAffiliateCampaignCards());
}`,
        meta: {
          role: 'Campaign Ops · Chiến dịch affiliate',
          goal: 'Quản lý chiến dịch affiliate/promotion đang chạy và ROI thực tế.',
          data: ['Danh sách campaign affiliate & promotion', 'Spent vs budget, thời gian chạy', 'ROI và GMV từng campaign', 'Trạng thái active/pause'],
          actions: ['Mở chi tiết campaign để chỉnh commission', 'Pause campaign ROI < 2x', 'Clone campaign hiệu quả sang SKU mới'],
          note: 'Campaign promotion flash sale thường kéo GMV ngắn hạn — đối chiếu với margin trước khi kéo dài.'
        }
      }
    ]
  },
  {
    pageId: 'orders',
    title: 'Orders',
    tabs: [
      {
        slug: 'sla-board',
        label: 'SLA Board',
        icon: 'layout-grid',
        count: 'ZZP_DATA.orders.length',
        render: 'renderOrdersTabSlaBoard',
        body: `function renderOrdersTabSlaBoard() {
  return card('Order Center — SLA Board', renderOrderSlaBoard());
}`,
        meta: {
          role: 'Order Ops · SLA fulfillment',
          goal: 'Theo dõi đơn hàng theo SLA giao/nhận để tránh phạt và hủy đơn.',
          data: ['Kanban đơn theo trạng thái SLA', 'Đơn quá hạn vs đúng hạn', 'Nguồn đơn (affiliate/live/ads)', 'Tổng đơn cần xử lý'],
          actions: ['Ưu tiên đơn SLA critical', 'Chạy automation nhập kho nếu thiếu hàng', 'Mở chi tiết đơn để cập nhật vận chuyển'],
          note: 'Đơn affiliate thường OAV cao hơn — đừng để chậm ship vì ảnh hưởng score creator.'
        }
      },
      {
        slug: 'attribution',
        label: 'Phân loại nguồn',
        icon: 'pie-chart',
        render: 'renderOrdersTabAttribution',
        body: `function renderOrdersTabAttribution() {
  return card('Attribution theo kênh', renderOrdersAttributionTable());
}`,
        meta: {
          role: 'Growth · Attribution đơn hàng',
          goal: 'Biết kênh nào mang đơn và OAV để phân bổ ngân sách marketing.',
          data: ['Số đơn theo kênh: Affiliate, Live, Ads, Organic', 'GMV ước tính từng kênh', 'OAV trung bình', 'Tỷ trọng % tổng GMV'],
          actions: ['Tăng ngân sách kênh OAV cao', 'Điều tra kênh OAV thấp', 'So sánh với dashboard revenue'],
          note: 'Organic 10% GMV nhưng margin cao nhất — đừng bỏ qua khi chỉ nhìn volume.'
        }
      },
      {
        slug: 'list',
        label: 'Danh sách đơn',
        icon: 'list',
        render: 'renderOrdersTabList',
        body: `function renderOrdersTabList() {
  return card('Tất cả đơn hàng', renderOrdersListTable());
}`,
        meta: {
          role: 'CS / Order Ops · Danh sách đơn',
          goal: 'Tra cứu nhanh mọi đơn hàng, trạng thái và nguồn.',
          data: ['Mã đơn, khách, sản phẩm, tổng tiền', 'Nguồn đơn và SLA', 'Trạng thái fulfillment', 'Click mở chi tiết đơn'],
          actions: ['Lọc đơn SLA quá hạn', 'Mở chi tiết đơn xử lý khiếu nại', 'Export danh sách cho kho'],
          note: 'Dùng tab SLA Board cho xử lý hàng ngày; tab này để tra cứu và audit.'
        }
      }
    ]
  },
  {
    pageId: 'inventory',
    title: 'Inventory',
    tabs: [
      {
        slug: 'stock',
        label: 'Tồn kho SKU',
        icon: 'package',
        count: 'ZZP_DATA.products.length',
        render: 'renderInventoryTabStock',
        body: `function renderInventoryTabStock() {
  return card('Stock Gauge Monitor', renderInventoryGaugeCards());
}`,
        meta: {
          role: 'Inventory · Tồn kho SKU',
          goal: 'Nắm mức tồn từng SKU và velocity bán để tránh stockout.',
          data: ['Gauge tồn kho theo SKU', 'Velocity bán/ngày', 'Ngày còn lại trước stockout', 'Mức độ cảnh báo'],
          actions: ['Tạo PO cho SKU < 7 ngày', 'Giảm ads SKU sắp hết', 'Đồng bộ tồn Seller Center'],
          note: 'Hero SKU hết hàng = mất GMV live + affiliate cùng lúc — ưu tiên P001/P005.'
        }
      },
      {
        slug: 'alerts',
        label: 'Cảnh báo',
        icon: 'triangle-alert',
        count: 'ZZP_DATA.products.filter(p => p.stock < 100).length',
        render: 'renderInventoryTabAlerts',
        body: `function renderInventoryTabAlerts() {
  return \`
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 mb-4">
      \${iconBox('triangle-alert', 18, 'bg-red-100 text-red-600 shrink-0')}
      <div>
        <p class="font-semibold text-red-800">Cảnh báo: Mặt nạ Collagen (P003)</p>
        <p class="text-sm text-red-700 mt-1">Chỉ còn 45 sp — hết hàng dự kiến trong 2 ngày.
          <button onclick="runAutomationFlow('FLOW_STOCK')" class="underline font-medium ml-1 inline-flex items-center gap-1">\${icon('play', 12)} Chạy nhập hàng</button></p>
      </div>
    </div>
    \${card('SKU cần chú ý', tableWrap(['SKU', 'Tồn', 'Velocity', 'Còn'],
      ZZP_DATA.products.filter(p => p.stock < 200).map(p => {
        const d = Math.round(p.sold30d / 30);
        return \`<tr \${rowClick('product', p.id)} class="border-b border-slate-50">
          <td class="py-3 px-3">\${p.name.slice(0, 24)}</td>
          <td class="py-3 px-3 text-red-600 font-bold">\${p.stock}</td>
          <td class="px-3">\${d}/ngày</td>
          <td class="px-3">\${Math.round(p.stock / d)} ngày</td>
        </tr>\`;
      }).join('')))}\`;
}`,
        meta: {
          role: 'Ops · Cảnh báo tồn kho',
          goal: 'Phát hiện SKU sắp hết hàng và kích hoạt nhập hàng ngay.',
          data: ['Alert critical (P003 Collagen…)', 'SKU tồn < 200', 'Velocity và ngày còn lại', 'Nút chạy flow nhập hàng'],
          actions: ['Chạy automation FLOW_STOCK', 'Tạm pause quảng cáo SKU critical', 'Thông báo team live/affiliate'],
          note: 'Stockout 2 ngày có thể mất rank TikTok Shop — xử lý alert trong 24h.'
        }
      },
      {
        slug: 'forecast',
        label: 'Dự báo & PO',
        icon: 'trending-up',
        render: 'renderInventoryTabForecast',
        body: `function renderInventoryTabForecast() {
  return card('Dự báo stockout & đề xuất nhập', renderInventoryForecastTable());
}`,
        meta: {
          role: 'Supply Chain · Dự báo nhập hàng',
          goal: 'Lên kế hoạch PO dựa trên velocity và lead time nhà cung cấp.',
          data: ['Dự báo ngày stockout', 'Đề xuất số lượng PO', 'Mức độ Critical/Low/OK', 'Bán/ngày theo SKU'],
          actions: ['Tạo PO theo khuyến nghị', 'Điều chỉnh MOQ với supplier', 'Export forecast cho kế toán'],
          note: 'Lead time 14 ngày → đặt PO khi còn 21 ngày tồn, không đợi Critical.'
        }
      }
    ]
  },
  {
    pageId: 'koc',
    title: 'KOC',
    tabs: [
      {
        slug: 'pipeline',
        label: 'Pipeline CRM',
        icon: 'columns-3',
        count: 'ZZP_DATA.kocs.length',
        render: 'renderKocTabPipeline',
        body: `function renderKocTabPipeline() {
  return card('KOC Lifecycle Pipeline', renderKocCrmPipeline());
}`,
        meta: {
          role: 'KOC Manager · CRM pipeline',
          goal: 'Quản lý creator qua các giai đoạn lifecycle từ prospect đến revenue.',
          data: ['Kanban lifecycle: prospect → sample → content → revenue', 'Số KOC từng stage', 'GMV theo stage', 'Creator cần follow-up'],
          actions: ['Chuyển KOC sang stage tiếp theo', 'Gửi sample cho prospect hot', 'Archive creator không phản hồi'],
          note: 'Creator stuck ở sample > 14 ngày thường cần brief mới hoặc đổi SKU mẫu.'
        }
      },
      {
        slug: 'scoreboard',
        label: 'Bảng điểm',
        icon: 'star',
        render: 'renderKocTabScoreboard',
        body: `function renderKocTabScoreboard() {
  return card('Danh sách KOC — Score & GMV', renderKocScoreTable());
}`,
        meta: {
          role: 'KOC Manager · Score & ranking',
          goal: 'Xếp hạng creator theo score, GMV và ROI để ưu tiên hợp tác.',
          data: ['Score tổng hợp từng KOC', 'Tier, GMV 30d, ROI', 'Lifecycle stage', 'Số video đã đăng'],
          actions: ['Mở chi tiết KOC score cao', 'Renew hợp đồng top performer', 'Coaching creator score thấp'],
          note: 'Score ≥ 80 + ROI > 5x là nhóm nên tăng commission hoặc exclusive deal.'
        }
      }
    ]
  },
  {
    pageId: 'samples',
    title: 'Samples',
    tabs: [
      {
        slug: 'roi-overview',
        label: 'Tổng quan ROI',
        icon: 'layout-dashboard',
        render: 'renderSamplesTabRoiOverview',
        body: `function renderSamplesTabRoiOverview() {
  const stats = calcSamplePipelineStats();
  return chartGrid([['Conversion funnel', 'chart-sample-funnel', 'sm'], ['Sample ROI', 'chart-sample-roi', 'sm'], ['Trạng thái', 'chart-sample-status', 'sm']], 3) +
    \`<div class="ds-grid ds-grid--4">
      <div class="ds-stat ds-stat--teal"><p class="ds-stat-label">Tổng gửi mẫu</p><p class="ds-stat-value">\${stats.total}</p></div>
      <div class="ds-stat ds-stat--green"><p class="ds-stat-label">Tỷ lệ convert</p><p class="ds-stat-value">\${stats.convPct}%</p></div>
      <div class="ds-stat"><p class="ds-stat-label">ROI trung bình</p><p class="ds-stat-value">\${stats.avgRoi}x</p></div>
      <div class="ds-stat ds-stat--red"><p class="ds-stat-label">Chưa content</p><p class="ds-stat-value">\${stats.noContent.length}</p></div>
    </div>\`;
}`,
        meta: {
          role: 'Sample Ops · ROI tổng quan',
          goal: 'Đo hiệu quả chương trình gửi mẫu — convert rate và ROI trung bình.',
          data: ['Funnel conversion sample', 'ROI trung bình chương trình', 'Số mẫu chưa có content', 'Biểu đồ trạng thái mẫu'],
          actions: ['Follow-up mẫu no_content', 'Tăng budget sample SKU ROI cao', 'Review brief gửi mẫu'],
          note: 'ROI sample < 3x sau 30 ngày → cân nhắc dừng gửi SKU đó cho creator mới.'
        }
      },
      {
        slug: 'pipeline',
        label: 'Pipeline mẫu',
        icon: 'git-branch',
        render: 'renderSamplesTabPipeline',
        body: `function renderSamplesTabPipeline() {
  const stats = calcSamplePipelineStats();
  return renderSamplePipelineFlow(stats) + renderSamplePipelineKanban();
}`,
        meta: {
          role: 'Sample Ops · Pipeline tracking',
          goal: 'Theo dõi từng mẫu qua các bước: gửi → nhận → content → convert.',
          data: ['Flow diagram pipeline mẫu', 'Kanban theo trạng thái', 'Mẫu stuck ở từng bước', 'Thời gian trung bình convert'],
          actions: ['Nhắc creator chưa đăng content', 'Đánh dấu mẫu converted', 'Hủy mẫu quá hạn'],
          note: 'Mẫu ở trạng thái shipped > 7 ngày chưa content cần ping creator trong 24h.'
        }
      },
      {
        slug: 'table',
        label: 'Bảng mẫu',
        icon: 'table',
        count: 'ZZP_DATA.samples.length',
        render: 'renderSamplesTabTable',
        body: `function renderSamplesTabTable() {
  return card('Sample Tracking', renderSamplesTable());
}`,
        meta: {
          role: 'Sample Ops · Bảng tracking',
          goal: 'Tra cứu chi tiết từng mẫu: KOC, SKU, chi phí, ROI.',
          data: ['Mã mẫu, KOC, sản phẩm', 'Ngày gửi, trạng thái', 'Chi phí mẫu và ROI', 'Click mở chi tiết'],
          actions: ['Mở chi tiết mẫu converted để học best practice', 'Flag mẫu no_content', 'Export cho kế toán'],
          note: 'Sort theo ROI để biết combo KOC × SKU nào nên replicate.'
        }
      }
    ]
  },
  {
    pageId: 'content',
    title: 'Content',
    tabs: [
      {
        slug: 'calendar',
        label: 'Lịch & task',
        icon: 'calendar-days',
        count: 'ZZP_DATA.content.length',
        render: 'renderContentTabCalendar',
        body: `function renderContentTabCalendar() {
  return card('Content Operations', renderContentCalendar());
}`,
        meta: {
          role: 'Content Ops · Lịch sản xuất',
          goal: 'Lên lịch video, brief và deadline đăng content từ KOC/agency.',
          data: ['Calendar content theo tuần', 'Task pending vs published', 'KOC gắn từng video', 'Deadline và trạng thái'],
          actions: ['Thêm task content mới', 'Nhắc KOC deadline', 'Gắn Spark Ads cho video hot'],
          note: 'Publish đều 3–4 video/tuần giúp algorithm TikTok Shop ổn định hơn burst rồi im.'
        }
      },
      {
        slug: 'performance',
        label: 'Hiệu suất video',
        icon: 'video',
        render: 'renderContentTabPerformance',
        body: `function renderContentTabPerformance() {
  return card('Performance theo nội dung', tableWrap(['Video', 'KOC', 'Views', 'Đơn', 'GMV', 'CTR', 'Trạng thái'],
    ZZP_DATA.content.map(c => {
      const k = ZZP_DATA.kocs.find(x => x.id === c.koc);
      return \`<tr \${rowClick('content', c.id)} class="border-b border-slate-50">
        <td class="py-3 px-3 font-medium">\${c.title.slice(0, 28)}</td>
        <td class="px-3">\${k?.name || '—'}</td>
        <td class="px-3">\${c.views ? fmt(c.views) : '—'}</td>
        <td class="px-3">\${c.orders || '—'}</td>
        <td class="px-3">\${c.gmv ? fmt(c.gmv) : '—'}</td>
        <td class="px-3">\${c.ctr ? c.ctr + '%' : '—'}</td>
        <td class="px-3">\${badge(c.status, c.status === 'published' ? 'ok' : 'pending')}</td>
      </tr>\`;
    }).join('')));
}`,
        meta: {
          role: 'Content Analyst · Hiệu suất video',
          goal: 'Đo views, CTR, đơn và GMV từng video để scale nội dung hiệu quả.',
          data: ['Views, CTR, orders, GMV/video', 'KOC sản xuất', 'Trạng thái published/pending', 'Click mở chi tiết video'],
          actions: ['Boost video CTR > 3% bằng Spark Ads', 'Brief lại format video convert cao', 'Archive video performance thấp'],
          note: 'Video views cao nhưng CTR thấp → thường do hook yếu hoặc SKU link sai.'
        }
      }
    ]
  },
  {
    pageId: 'livestream',
    title: 'Livestream',
    tabs: [
      {
        slug: 'performance',
        label: 'Hiệu suất',
        icon: 'bar-chart-2',
        render: 'renderLivestreamTabPerformance',
        body: `function renderLivestreamTabPerformance() {
  return card('Live Performance', renderTtsBreakdownTable('livestream'));
}`,
        meta: {
          role: 'Live Ops · Hiệu suất live',
          goal: 'Theo dõi GMV, conversion và metrics live so với mục tiêu.',
          data: ['Breakdown GMV live theo session', 'Conversion rate live', 'AOV phiên live', 'So sánh kỳ trước'],
          actions: ['Scale host GMV cao', 'Điều chỉnh SKU pin trong live', 'Review script phiên underperform'],
          note: 'Live conversion phụ thuộc pin SKU + voucher — chuẩn bị trước 48h.'
        }
      },
      {
        slug: 'sessions',
        label: 'Phiên live',
        icon: 'radio',
        count: 'ZZP_DATA.liveSessions.length',
        render: 'renderLivestreamTabSessions',
        body: `function renderLivestreamTabSessions() {
  return renderLivestreamSessions();
}`,
        meta: {
          role: 'Live Ops · Quản lý phiên',
          goal: 'Chuẩn bị và theo dõi từng phiên live: checklist, host, GMV dự kiến.',
          data: ['Danh sách phiên sắp/chạy/xong', 'Checklist chuẩn bị %', 'Host KOC và thời lượng', 'GMV kỳ trước vs dự kiến'],
          actions: ['Hoàn thành checklist trước live', 'Mở profile host KOC', 'Cập nhật GMV thực tế sau live'],
          note: 'Checklist < 80% trước 2h live → delay hoặc chuyển host backup.'
        }
      }
    ]
  },
  {
    pageId: 'ads',
    title: 'Ads',
    tabs: [
      {
        slug: 'campaigns',
        label: 'Campaigns',
        icon: 'megaphone',
        count: 'ZZP_DATA.ads.length',
        render: 'renderAdsTabCampaigns',
        body: `function renderAdsTabCampaigns() {
  return chartGrid([['ROAS theo chiến dịch', 'chart-ads-roas', 'sm'], ['Chi tiêu Ads', 'chart-ads-spend', 'sm']]) +
    card('Ads Campaigns', renderTtsBreakdownTable('ads'));
}`,
        meta: {
          role: 'Performance Marketing · Ads',
          goal: 'Quản lý chiến dịch quảng cáo TikTok — ROAS, spend và scale/pause.',
          data: ['ROAS từng campaign', 'Chi tiêu vs budget', 'Breakdown ads theo loại', 'Biểu đồ spend trend'],
          actions: ['Scale campaign ROAS > 3x', 'Pause ROAS < 1.5x', 'Gắn Spark Ads video convert cao'],
          note: 'Product Ads margin thấp dễ lỗ — ưu tiên Spark Ads gắn video organic convert.'
        }
      },
      {
        slug: 'suggestions',
        label: 'Gợi ý tối ưu',
        icon: 'sparkles',
        render: 'renderAdsTabSuggestions',
        body: `function renderAdsTabSuggestions() {
  return card('Spark Ads Wizard', \`
    <div class="p-4 bg-green-50 rounded-xl border border-green-100"><p class="font-medium flex items-center gap-2">\${icon('trending-up', 16, 'text-green-600')} Scale: Spark Ads Serum VC (ROAS 3.8x)</p><p class="text-sm text-slate-600 mt-1">Tăng budget 30% · Gắn video V001</p><button onclick="showToast('Đã tạo action: Tăng budget AD001')" class="mt-2 text-sm text-green-700 hover:underline">Thực hiện</button></div>
    <div class="p-4 bg-red-50 rounded-xl border border-red-100 mt-3"><p class="font-medium flex items-center gap-2">\${icon('pause-circle', 16, 'text-red-600')} Pause: Product Ads Mặt nạ (ROAS 1.2x)</p><p class="text-sm text-slate-600 mt-1">Chuyển ngân sách sang Affiliate K002</p><button onclick="pauseAd('AD002')" class="mt-2 text-sm text-red-700 hover:underline">Pause ngay</button></div>\`);
}`,
        meta: {
          role: 'Ads Optimizer · AI gợi ý',
          goal: 'Nhận gợi ý scale/pause campaign dựa trên ROAS và video performance.',
          data: ['Gợi ý scale campaign hiệu quả', 'Cảnh báo pause campaign lỗ', 'Video gợi ý gắn Spark Ads', 'Action one-click'],
          actions: ['Thực hiện gợi ý scale', 'Pause campaign lỗ ngay', 'Chuyển budget sang kênh ROI cao hơn'],
          note: 'Review gợi ý AI với margin SKU — ROAS cao nhưng margin 15% vẫn có thể lỗ.'
        }
      }
    ]
  },
  {
    pageId: 'products',
    title: 'Products',
    tabs: [
      {
        slug: 'lifecycle',
        label: 'Lifecycle',
        icon: 'refresh-cw',
        count: 'ZZP_DATA.products.length',
        render: 'renderProductsTabLifecycle',
        body: `function renderProductsTabLifecycle() {
  return card('Product Status Monitor', renderProductLifecycleMonitor());
}`,
        meta: {
          role: 'Merchandising · Product lifecycle',
          goal: 'Theo dõi SKU qua các giai đoạn: draft → active → hero → clearance.',
          data: ['Trạng thái lifecycle từng SKU', 'Listing score và compliance', 'Hero vs non-hero', 'SKU cần optimize listing'],
          actions: ['Promote SKU lên hero', 'Fix listing compliance', 'Clearance SKU tồn cao'],
          note: 'SKU compliance fail vẫn hiện trên shop nếu đã publish — ưu tiên fix trước campaign.'
        }
      },
      {
        slug: 'gmv-sku',
        label: 'GMV SKU',
        icon: 'bar-chart-2',
        render: 'renderProductsTabGmvSku',
        body: `function renderProductsTabGmvSku() {
  return chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md']], 1);
}`,
        meta: {
          role: 'Merchandising · GMV theo SKU',
          goal: 'Biết SKU nào mang doanh thu chính để pin shop và phân bổ marketing.',
          data: ['Biểu đồ GMV 30d theo SKU', 'Top vs bottom performer', 'Trend GMV SKU hero', 'So sánh cross-SKU'],
          actions: ['Pin top GMV lên storefront', 'Bundle SKU bán chậm với hero', 'Điều chỉnh giá SKU underperform'],
          note: 'Top 3 SKU thường > 60% GMV — đảm bảo tồn kho và listing score luôn green.'
        }
      }
    ]
  },
  {
    pageId: 'returns',
    title: 'Returns',
    tabs: [
      {
        slug: 'cases',
        label: 'Case hoàn/hủy',
        icon: 'rotate-ccw',
        count: 'ZZP_DATA.returns.length',
        render: 'renderReturnsTabCases',
        body: `function renderReturnsTabCases() {
  return card('Return & Cancellation Cases', renderReturnsCaseTimeline());
}`,
        meta: {
          role: 'CS · Hoàn trả & hủy đơn',
          goal: 'Xử lý case hoàn/hủy theo timeline và giảm return rate.',
          data: ['Timeline từng case hoàn/hủy', 'Lý do return', 'Trạng thái xử lý', 'SKU liên quan'],
          actions: ['Phản hồi case pending', 'Phân tích lý do return theo SKU', 'Escalate case phức tạp'],
          note: 'Return rate > 5% trên 1 SKU → kiểm tra mô tả sản phẩm và QC lô hàng.'
        }
      },
      {
        slug: 'stats',
        label: 'Thống kê',
        icon: 'bar-chart-2',
        render: 'renderReturnsTabStats',
        body: `function renderReturnsTabStats() {
  return card('Return rate & benchmark', tableWrap(['Chỉ số', 'Shop', 'Benchmark', 'Đánh giá'],
    [['Return rate', TTS_METRICS.shop.returnRate + '%', '4.8%', badge('Tốt hơn', 'ok')],
      ['Hoàn tiền', fmt(TTS_METRICS.shop.refunds), '—', badge('Theo dõi', 'info')],
      ['Đơn hoàn', TTS_METRICS.shop.cancellationsAndReturns, '—', badge('OK', 'ok')]]
      .map(r => \`<tr class="border-b border-slate-50">\${r.map(c => \`<td class="py-3 px-3">\${c}</td>\`).join('')}</tr>\`).join('')));
}`,
        meta: {
          role: 'Ops · Return analytics',
          goal: 'So sánh return rate shop với benchmark ngành.',
          data: ['Return rate shop vs benchmark 4.8%', 'Tổng hoàn tiền', 'Số đơn hoàn/hủy', 'Đánh giá tốt/xấu'],
          actions: ['Investigate nếu vượt benchmark', 'Báo cáo return theo SKU cho merchandising', 'Cải thiện mô tả SP return cao'],
          note: 'Return rate thấp hơn benchmark giúp shop score TikTok — duy trì < 5%.'
        }
      }
    ]
  },
  {
    pageId: 'executive',
    title: 'Executive',
    tabs: [
      {
        slug: 'overview',
        label: 'Tổng quan',
        icon: 'layout-dashboard',
        render: 'renderExecutiveTabOverview',
        body: `function renderExecutiveTabOverview() {
  return card('Revenue Trend', '<div class="chart-box"><canvas id="chart-executive"></canvas></div>');
}`,
        meta: {
          role: 'CEO / GM · Executive dashboard',
          goal: 'Nắm trend doanh thu tổng thể và health business một glance.',
          data: ['Biểu đồ revenue trend', 'GMV MTD vs target', 'Growth rate', 'Key milestones'],
          actions: ['Drill-down sang revenue module', 'Share snapshot với investor', 'Set target tháng mới'],
          note: 'Executive view aggregate — chi tiết kênh xem tab Phân bổ GMV.'
        }
      },
      {
        slug: 'gmv-breakdown',
        label: 'Phân bổ GMV',
        icon: 'pie-chart',
        render: 'renderExecutiveTabGmvBreakdown',
        body: `function renderExecutiveTabGmvBreakdown() {
  return card('GMV Breakdown', renderTtsBreakdownTable('executive'));
}`,
        meta: {
          role: 'CEO / Finance · GMV breakdown',
          goal: 'Hiểu cơ cấu GMV theo kênh để ra quyết định đầu tư.',
          data: ['GMV theo kênh: Affiliate, Live, Ads, Organic', 'Tỷ trọng % từng kênh', 'Trend so kỳ trước', 'Contribution margin sơ bộ'],
          actions: ['Rebalance ngân sách marketing', 'Thảo luận với team kênh underperform', 'Export cho board meeting'],
          note: 'Diversification kênh giảm rủi ro — không nên > 50% GMV từ 1 kênh.'
        }
      }
    ]
  },
  {
    pageId: 'revenue',
    title: 'Revenue',
    tabs: [
      {
        slug: 'by-channel',
        label: 'Theo kênh',
        icon: 'pie-chart',
        render: 'renderRevenueTabByChannel',
        body: `function renderRevenueTabByChannel() {
  return card('GMV Breakdown — Content Type', renderTtsBreakdownTable('revenue')) +
    card('Attribution Analysis', '<div class="chart-box"><canvas id="chart-attribution"></canvas></div>');
}`,
        meta: {
          role: 'Finance / Growth · Revenue by channel',
          goal: 'Phân tích GMV và attribution theo loại content/kênh.',
          data: ['Breakdown GMV content type', 'Attribution chart', 'Affiliate vs Live vs Ads', 'Organic contribution'],
          actions: ['Tối ưu mix kênh', 'So sánh với target monthly', 'Align với ads spend'],
          note: 'Attribution TikTok có window 7–14 ngày — đối chiếu với ads manager.'
        }
      },
      {
        slug: 'by-product',
        label: 'Theo sản phẩm',
        icon: 'package',
        render: 'renderRevenueTabByProduct',
        body: `function renderRevenueTabByProduct() {
  return card('Revenue by Product × Source', tableWrap(['Sản phẩm', 'Organic', 'Affiliate', 'Ads', 'Live', 'Tổng'],
    ZZP_DATA.products.filter(p => p.hero).map(p => {
      const share = p.sold30d * p.price;
      return \`<tr class="border-b border-slate-50"><td class="py-3 px-3">\${p.name}</td><td class="px-3">\${fmt(share * 0.15)}</td><td class="px-3">\${fmt(share * 0.38)}</td><td class="px-3">\${fmt(share * 0.12)}</td><td class="px-3">\${fmt(share * 0.35)}</td><td class="px-3 font-semibold">\${fmt(share)}</td></tr>\`;
    }).join('')));
}`,
        meta: {
          role: 'Merchandising / Finance · Revenue by SKU',
          goal: 'Biết SKU hero kiếm tiền từ kênh nào để tối ưu listing và campaign.',
          data: ['GMV hero SKU × kênh', 'Affiliate/Live/Ads/Organic split', 'Tổng GMV SKU', 'SKU phụ thuộc 1 kênh'],
          actions: ['Đa dạng hóa kênh cho SKU single-source', 'Tăng live cho SKU affiliate mạnh', 'Review pricing theo kênh'],
          note: 'SKU 80% GMV từ live → cần backup host và tồn kho trước mega live.'
        }
      }
    ]
  },
  {
    pageId: 'profit',
    title: 'Profit',
    tabs: [
      {
        slug: 'pnl',
        label: 'P&L tổng',
        icon: 'wallet',
        render: 'renderProfitTabPnl',
        body: `function renderProfitTabPnl() {
  return card('Tài chính — Settlement & phí', renderTtsFinanceStrip()) +
    card('P&L Breakdown', '<div class="chart-box"><canvas id="chart-pnl"></canvas></div>');
}`,
        meta: {
          role: 'Finance · P&L tổng',
          goal: 'Theo dõi lợi nhuận sau COGS, phí platform và marketing.',
          data: ['Settlement strip — doanh thu thực nhận', 'P&L breakdown chart', 'Gross vs net margin', 'Phí TikTok Shop'],
          actions: ['Review phí platform tăng bất thường', 'Cắt chi phí kênh margin âm', 'Export P&L cho kế toán'],
          note: 'Net margin < 10% trên TikTok Shop cần review COGS và commission structure.'
        }
      },
      {
        slug: 'by-product',
        label: 'Theo sản phẩm',
        icon: 'package',
        render: 'renderProfitTabByProduct',
        body: `function renderProfitTabByProduct() {
  return card('Profit by Product', tableWrap(['Sản phẩm', 'GMV', 'COGS', 'Chi phí PB', 'Lợi nhuận', 'Margin'],
    ZZP_DATA.products.filter(p => p.hero).map(p => {
      const gmv = p.sold30d * p.price; const cogs = p.sold30d * p.cost; const other = gmv * 0.18; const profit = gmv - cogs - other;
      return \`<tr class="border-b border-slate-50"><td class="py-3 px-3">\${p.name}</td><td class="px-3">\${fmt(gmv)}</td><td class="px-3">\${fmt(cogs)}</td><td class="px-3">\${fmt(other)}</td><td class="px-3 font-semibold text-green-600">\${fmt(profit)}</td><td class="px-3">\${(profit / gmv * 100).toFixed(1)}%</td></tr>\`;
    }).join('')));
}`,
        meta: {
          role: 'Finance / Merchandising · Profit by SKU',
          goal: 'Xác định SKU thực sự có lãi sau mọi chi phí.',
          data: ['GMV, COGS, chi phí phân bổ', 'Lợi nhuận và margin %', 'Hero SKU profitability', 'SKU margin âm tiềm ẩn'],
          actions: ['Tăng giá SKU margin thấp', 'Giảm sample/ads SKU lỗ', 'Bundle SKU margin cao + thấp'],
          note: 'GMV cao ≠ lãi — SKU hero cần margin > 25% sau phí platform.'
        }
      }
    ]
  },
  {
    pageId: 'costs',
    title: 'Costs',
    tabs: [
      {
        slug: 'charts',
        label: 'Biểu đồ',
        icon: 'bar-chart-2',
        render: 'renderCostsTabCharts',
        body: `function renderCostsTabCharts() {
  return chartGrid([['Cấu trúc chi phí', 'chart-costs-detail', 'md'], ['% chi phí / GMV', 'chart-costs-pct', 'sm']]);
}`,
        meta: {
          role: 'Finance · Cost structure',
          goal: 'Visualize cơ cấu chi phí và tỷ lệ chi phí/GMV.',
          data: ['Pie/bar cấu trúc chi phí', '% chi phí trên GMV', 'Trend ads vs COGS', 'Benchmark ngành'],
          actions: ['Investigate chi phí ads tăng', 'Negotiate COGS với supplier', 'Set cap chi phí % GMV'],
          note: 'Ads > 15% GMV thường khó profitable trừ khi LTV cao hoặc organic mạnh.'
        }
      },
      {
        slug: 'detail',
        label: 'Chi tiết',
        icon: 'list',
        render: 'renderCostsTabDetail',
        body: `function renderCostsTabDetail() {
  const c = ZZP_DATA.costs;
  return card('Cost Structure Detail', tableWrap(['Loại chi phí', 'Số tiền', '% GMV', 'Trend'],
    Object.entries({ COGS: c.cogs, 'Vận chuyển': c.shipping, 'Commission Affiliate': c.commission, 'Quảng cáo': c.ads, Voucher: c.voucher, Sample: c.sample, 'Agency Fee': c.agency, 'Platform Fee': c.platform }).map(([k, v]) =>
      \`<tr class="border-b border-slate-50"><td class="py-3 px-3">\${k}</td><td class="px-3">\${fmt(v)}</td><td class="px-3">\${(v / ZZP_DATA.revenueBreakdown.total * 100).toFixed(1)}%</td><td class="px-3">\${k === 'Quảng cáo' ? badge('↑ 12%', 'warning') : badge('→ ổn định', 'ok')}</td></tr>\`).join('')));
}`,
        meta: {
          role: 'Finance · Chi tiết chi phí',
          goal: 'Tra cứu từng loại chi phí: COGS, ship, commission, ads, voucher…',
          data: ['8 loại chi phí chi tiết', 'Số tiền và % GMV', 'Trend tăng/giảm', 'So với tháng trước'],
          actions: ['Cắt voucher nếu ROI thấp', 'Review agency fee', 'Align commission với campaign'],
          note: 'Commission affiliate + platform fee thường chiếm 15–20% GMV — factor vào pricing.'
        }
      }
    ]
  },
  {
    pageId: 'product-analytics',
    title: 'Product Analytics',
    tabs: [
      {
        slug: 'sku-performance',
        label: 'SKU Performance',
        icon: 'bar-chart-2',
        render: 'renderProductAnalyticsTabSkuPerformance',
        body: `function renderProductAnalyticsTabSkuPerformance() {
  return chartGrid([['GMV theo SKU', 'chart-sku-gmv', 'md'], ['Margin top SKU', 'chart-product-margin', 'sm']]) +
    card('SKU Performance', renderTtsBreakdownTable('product-analytics'));
}`,
        meta: {
          role: 'Analytics · SKU performance',
          goal: 'Phân tích deep-dive hiệu suất từng SKU: GMV, margin, velocity.',
          data: ['Charts GMV và margin SKU', 'Breakdown analytics table', 'Top/bottom SKU', 'Listing score correlation'],
          actions: ['Scale SKU margin + velocity cao', 'Optimize listing SKU score thấp', 'Discontinue SKU bottom 10%'],
          note: 'Kết hợp velocity + margin — SKU bán nhanh margin thấp vẫn có thể scale nếu volume đủ.'
        }
      },
      {
        slug: 'ranking',
        label: 'Xếp hạng',
        icon: 'list-ordered',
        render: 'renderProductAnalyticsTabRanking',
        body: `function renderProductAnalyticsTabRanking() {
  return card('SKU Ranking', tableWrap(['#', 'Sản phẩm', 'GMV 30d', 'Units', 'Margin', 'Velocity', 'Score', 'Action'],
    [...ZZP_DATA.products].sort((a, b) => (b.sold30d * b.price) - (a.sold30d * a.price)).map((p, i) => {
      const gmv = p.sold30d * p.price; const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
      return \`<tr class="border-b border-slate-50"><td class="py-3 px-3 font-bold">\${i + 1}</td><td class="px-3"><div class="flex items-center gap-2">\${productThumb(p, 14)} \${p.name}</div></td><td class="px-3 font-semibold">\${fmt(gmv)}</td><td class="px-3">\${p.sold30d}</td><td class="px-3">\${margin}%</td><td class="px-3">\${Math.round(p.sold30d / 30)}/ngày</td><td class="px-3">\${p.listingScore}</td><td class="px-3">\${i < 2 ? badge('Scale', 'ok') : i === 6 ? badge('Optimize', 'warning') : badge('Maintain', 'info')}</td></tr>\`;
    }).join('')));
}`,
        meta: {
          role: 'Analytics · SKU ranking',
          goal: 'Xếp hạng SKU theo GMV để quyết định Scale/Optimize/Maintain.',
          data: ['Rank GMV 30d', 'Units, margin, velocity', 'Listing score', 'Action tag Scale/Optimize/Maintain'],
          actions: ['Scale top 2 SKU', 'Optimize SKU rank 7', 'Review Maintain SKU quarterly'],
          note: 'Rank thay đổi sau campaign lớn — refresh weekly trong mùa sale.'
        }
      }
    ]
  },
  {
    pageId: 'creator-analytics',
    title: 'Creator Analytics',
    tabs: [
      {
        slug: 'scorecard',
        label: 'Scorecard',
        icon: 'star',
        count: 'ZZP_DATA.kocs.length',
        render: 'renderCreatorAnalyticsTabScorecard',
        body: `function renderCreatorAnalyticsTabScorecard() {
  return card('Creator Scorecards', renderCreatorScorecardGrid());
}`,
        meta: {
          role: 'Creator Analytics · Scorecards',
          goal: 'Dashboard scorecard từng creator: engagement, GMV, content quality.',
          data: ['Grid scorecard KOC', 'Score, tier, lifecycle', 'GMV và ROI', 'Video output'],
          actions: ['Renew top scorecard', 'Coaching creator score trung bình', 'Archive inactive creator'],
          note: 'Scorecard giúp so sánh creator cùng tier — dùng cho quarterly review.'
        }
      },
      {
        slug: 'ranking',
        label: 'Bảng xếp hạng',
        icon: 'list-ordered',
        render: 'renderCreatorAnalyticsTabRanking',
        body: `function renderCreatorAnalyticsTabRanking() {
  return card('Ranking KOC', renderKocScoreTable());
}`,
        meta: {
          role: 'Creator Analytics · Ranking',
          goal: 'Bảng xếp hạng creator theo score và GMV.',
          data: ['Rank KOC by score', 'GMV 30d, ROI, tier', 'Lifecycle stage', 'Video count'],
          actions: ['Invite top rank vào exclusive program', 'Re-negotiate commission bottom rank', 'Export ranking report'],
          note: 'Creator rank drop 2 tháng liên tiếp → review hợp đồng trước khi renew.'
        }
      }
    ]
  },
  {
    pageId: 'affiliate-analytics',
    title: 'Affiliate Analytics',
    tabs: [
      {
        slug: 'creator',
        label: 'Creator',
        icon: 'users',
        render: 'renderAffiliateAnalyticsTabCreator',
        body: `function renderAffiliateAnalyticsTabCreator() {
  return card('Creator Marketplace Performance', renderTtsBreakdownTable('affiliate-analytics')) +
    card('Affiliate Contribution', '<div class="chart-box"><canvas id="chart-aff-contrib"></canvas></div>');
}`,
        meta: {
          role: 'Affiliate Analytics · Creator performance',
          goal: 'Đo hiệu suất creator trên marketplace và contribution GMV.',
          data: ['Marketplace performance table', 'Affiliate contribution chart', 'Top creator GMV share', 'Commission paid'],
          actions: ['Recruit creator similar to top performer', 'Adjust commission tier', 'Analyze creator churn'],
          note: 'Marketplace creator mới cần 2–4 tuần ramp — đừng judge ROI tuần đầu.'
        }
      },
      {
        slug: 'campaign-roi',
        label: 'Campaign ROI',
        icon: 'megaphone',
        render: 'renderAffiliateAnalyticsTabCampaignRoi',
        body: `function renderAffiliateAnalyticsTabCampaignRoi() {
  return card('Campaign ROI Comparison', tableWrap(['Chiến dịch', 'Spent', 'GMV', 'ROI', 'Commission', 'Net Profit'],
    ZZP_DATA.campaigns.map(c => \`<tr class="border-b border-slate-50"><td class="py-3 px-3">\${c.name}</td><td class="px-3">\${fmt(c.spent)}</td><td class="px-3">\${fmt(c.gmv)}</td><td class="px-3 font-semibold">\${(c.gmv / c.spent).toFixed(1)}x</td><td class="px-3">\${fmt(c.gmv * 0.12)}</td><td class="px-3 text-green-600">\${fmt(c.gmv - c.spent - c.gmv * 0.12 - c.gmv * 0.3)}</td></tr>\`).join('')));
}`,
        meta: {
          role: 'Affiliate Analytics · Campaign ROI',
          goal: 'So sánh ROI campaign affiliate sau commission và COGS.',
          data: ['Spent, GMV, ROI từng campaign', 'Commission payout', 'Net profit estimate', 'Campaign comparison'],
          actions: ['Scale campaign net profit dương cao', 'Pause campaign net âm', 'Clone winning campaign structure'],
          note: 'Net profit = GMV - spent - commission - COGS estimate — ROI gross có thể misleading.'
        }
      }
    ]
  },
  {
    pageId: 'content-analytics',
    title: 'Content Analytics',
    tabs: [
      {
        slug: 'charts',
        label: 'Biểu đồ',
        icon: 'bar-chart-2',
        render: 'renderContentAnalyticsTabCharts',
        body: `function renderContentAnalyticsTabCharts() {
  return chartGrid([['CVR theo video', 'chart-content-cvr', 'sm'], ['Views theo video', 'chart-content-views', 'sm']]);
}`,
        meta: {
          role: 'Content Analytics · Charts',
          goal: 'Visualize CVR và views từng video để tìm pattern content thắng.',
          data: ['Chart CVR by video', 'Chart views by video', 'Outlier detection', 'Format comparison'],
          actions: ['Replicate format video CVR cao', 'Boost views cao CVR thấp (hook issue)', 'Brief KOC theo top format'],
          note: 'CVR > 2% trên TikTok Shop content là strong — study hook 3s đầu của video đó.'
        }
      },
      {
        slug: 'video-table',
        label: 'Bảng video',
        icon: 'video',
        render: 'renderContentAnalyticsTabVideoTable',
        body: `function renderContentAnalyticsTabVideoTable() {
  return card('Content Performance', tableWrap(['Video', 'Views', 'CTR', 'Đơn', 'GMV'],
    ZZP_DATA.content.filter(c => c.views).map(c => \`<tr \${rowClick('content', c.id)} class="border-b border-slate-50">
      <td class="py-3 px-3">\${c.title.slice(0, 30)}</td><td class="px-3">\${fmt(c.views)}</td><td class="px-3">\${c.ctr}%</td><td class="px-3">\${c.orders}</td><td class="px-3">\${fmt(c.gmv)}</td></tr>\`).join('')));
}`,
        meta: {
          role: 'Content Analytics · Video table',
          goal: 'Bảng chi tiết performance video published.',
          data: ['Video title, views, CTR', 'Orders và GMV', 'Click mở chi tiết', 'Filter published only'],
          actions: ['Gắn Spark Ads top GMV video', 'Archive video GMV = 0 sau 30 ngày', 'Share best practice nội bộ'],
          note: 'Sort by GMV not views — video viral không convert vẫn tốn creator fee.'
        }
      }
    ]
  },
  {
    pageId: 'live-analytics',
    title: 'Live Analytics',
    tabs: [
      {
        slug: 'session-metrics',
        label: 'Session metrics',
        icon: 'radio',
        render: 'renderLiveAnalyticsTabSessionMetrics',
        body: `function renderLiveAnalyticsTabSessionMetrics() {
  return card('Live Session Metrics', renderTtsBreakdownTable('live-analytics'));
}`,
        meta: {
          role: 'Live Analytics · Session metrics',
          goal: 'Metrics chi tiết từng phiên live: viewers, conversion, GMV.',
          data: ['Breakdown metrics per session', 'Peak viewers, avg watch time', 'Conversion rate live', 'GMV per session'],
          actions: ['Compare host performance', 'Optimize SKU mix phiên underperform', 'Schedule replay top session'],
          note: 'Conversion live 3–5% là good benchmark beauty category VN.'
        }
      },
      {
        slug: 'comparison',
        label: 'So sánh',
        icon: 'git-compare',
        render: 'renderLiveAnalyticsTabComparison',
        body: `function renderLiveAnalyticsTabComparison() {
  return card('Expected vs Actual GMV', tableWrap(['Session', 'Expected', 'Actual', 'Gap'],
    ZZP_DATA.liveSessions.map(l => {
      const gap = l.expectedGmv ? ((l.pastGmv || 0) / l.expectedGmv * 100 - 100).toFixed(0) : '—';
      return \`<tr class="border-b border-slate-50"><td class="py-3 px-3">\${l.title.slice(0, 24)}</td><td class="px-3">\${fmt(l.expectedGmv)}</td><td class="px-3">\${fmt(l.pastGmv)}</td><td class="px-3 \${Number(gap) < 0 ? 'text-red-600' : 'text-green-600'}">\${gap}%</td></tr>\`;
    }).join('')));
}`,
        meta: {
          role: 'Live Analytics · Expected vs actual',
          goal: 'So sánh GMV dự kiến vs thực tế để cải thiện forecast.',
          data: ['Expected GMV per session', 'Actual GMV achieved', 'Gap % positive/negative', 'Forecast accuracy trend'],
          actions: ['Review phiên gap > -20%', 'Adjust forecast model', 'Reward host beat forecast'],
          note: 'Underforecast liên tục → thiếu tồn kho live; overforecast → team live demotivated.'
        }
      }
    ]
  }
];

const created = [];

for (const mod of MODULES) {
  const dir = path.join(MODULES_DIR, mod.pageId);
  fs.mkdirSync(dir, { recursive: true });

  const prefix = toConstPrefix(mod.pageId);
  const metaConst = `${prefix}_TAB_META`;

  // meta file
  const metaEntries = mod.tabs.map(t => {
    const m = t.meta;
    const dataLines = m.data.map(d => `'${d.replace(/'/g, "\\'")}'`).join(',\n      ');
    const actionLines = m.actions.map(a => `'${a.replace(/'/g, "\\'")}'`).join(',\n      ');
    return `  ${t.slug.replace(/-/g, '_')}: sellerMeta(
    '${m.role.replace(/'/g, "\\'")}',
    '${m.goal.replace(/'/g, "\\'")}',
    [${dataLines}],
    [${actionLines}],
    '${m.note.replace(/'/g, "\\'")}'
  )`;
  });

  const metaFile = `/* ${mod.title} — mô tả tab (seller POV) */

const ${metaConst} = {
${metaEntries.join(',\n')}
};
`;
  const metaPath = path.join(dir, `${mod.pageId}-meta.js`);
  fs.writeFileSync(metaPath, metaFile);
  created.push(metaPath);

  // tab files
  for (const tab of mod.tabs) {
    const tabFile = `/* ${mod.title} — tab ${tab.label} */

${tab.body}
`;
    const tabPath = path.join(dir, `tab-${tab.slug}.js`);
    fs.writeFileSync(tabPath, tabFile);
    created.push(tabPath);
  }

  // index file
  const tabRegs = mod.tabs.map(t => {
    const metaKey = t.slug.replace(/-/g, '_');
    const countLine = t.count ? `\n    count: ${t.count},` : '';
    return `  { label: '${t.label}', icon: '${t.icon}',${countLine}
    meta: ${metaConst}.${metaKey},
    content: () => ${t.render}() }`;
  });

  const pageKey = mod.pageId.includes('-') ? `['${mod.pageId}']` : `.${mod.pageId}`;
  const indexFile = `/* ${mod.title} — đăng ký tab module */

MODULE_DATA_TABS${pageKey} = () => [
${tabRegs.join(',\n')}
];
`;
  const indexPath = path.join(dir, `${mod.pageId}-index.js`);
  fs.writeFileSync(indexPath, indexFile);
  created.push(indexPath);
}

// module-scripts.js
const scriptLines = ['/* Module tab scripts — load order (before render.js) */', ''];
for (const mod of MODULES) {
  scriptLines.push(`  /* ${mod.title} */`);
  scriptLines.push(`  js/modules/shared/module-meta-base.js`);
  scriptLines.push(`  js/modules/shared/data-tab-helpers.js`);
  scriptLines.push(`  js/modules/${mod.pageId}/${mod.pageId}-meta.js`);
  for (const tab of mod.tabs) {
    scriptLines.push(`  js/modules/${mod.pageId}/tab-${tab.slug}.js`);
  }
  scriptLines.push(`  js/modules/${mod.pageId}/${mod.pageId}-index.js`);
  scriptLines.push('');
}

// dedupe shared at top
const moduleScriptsContent = `/* Module tab scripts — load order documentation
 * Shared deps (load once before modules):
 *   js/modules/shared/module-meta-base.js
 *   js/modules/shared/data-tab-helpers.js
 *
 * Per-module order: {module}-meta.js → tab-*.js → {module}-index.js
 */

const MODULE_TAB_SCRIPTS = [
${MODULES.flatMap(mod => {
  const lines = [`  // ${mod.title}`, `  'js/modules/${mod.pageId}/${mod.pageId}-meta.js',`];
  for (const tab of mod.tabs) lines.push(`  'js/modules/${mod.pageId}/tab-${tab.slug}.js',`);
  lines.push(`  'js/modules/${mod.pageId}/${mod.pageId}-index.js',`);
  return lines;
}).join('\n')}
];
`;

fs.writeFileSync(path.join(MODULES_DIR, 'module-scripts.js'), moduleScriptsContent);
created.push(path.join(MODULES_DIR, 'module-scripts.js'));

console.log('Created', created.length, 'files');
console.log(created.map(f => path.relative(ROOT, f)).join('\n'));
