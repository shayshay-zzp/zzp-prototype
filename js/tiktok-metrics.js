/* TikTok Shop + Ads metrics — mock theo schema API
   Nguồn: tiktok_apis_export_2026-06-01.csv (340 Shop APIs)
          tiktok_apis_export_2026-06-04 (2).xlsx (532 Ads/Marketing APIs) */

const TTS_API = {
  shopPerformance: '/analytics/202509/shop/performance',
  shopHourly: '/analytics/202510/shop/performance/{date}/performance_per_hour',
  productPerformance: '/analytics/202509/shop_products/{product_id}/performance',
  skuPerformance: '/analytics/202509/shop_skus/{sku_id}/performance',
  liveOverview: '/analytics/202509/shop_lives/overview_performance',
  livePerMinute: '/analytics/202510/shop_lives/{live_id}/performance_per_minutes',
  liveCoreStats: '/analytics/202502/live_rooms/{live_room_id}/core_stats',
  videoOverview: '/analytics/202509/shop_videos/overview_performance',
  videoDetail: '/analytics/202509/shop_videos/{video_id}/performance',
  creatorPerformance: '/affiliate_seller/202508/marketplace_creators/{creator_user_id}',
  affiliateOrders: '/affiliate_seller/202410/orders/search',
  sampleApplications: '/affiliate_seller/202409/sample_applications/search',
  statements: '/finance/202309/statements',
  transactions: '/finance/202309/orders/{order_id}/statement_transactions',
  inventorySearch: '/product/202309/inventory/search',
  orderDetail: '/order/202507/orders',
  priceDetail: '/order/202407/orders/{order_id}/price_detail',
  csPerformance: '/customer_service/202407/performance',
  gmvMaxCampaign: '/open_api/v1.3/gmv_max/campaign/get/',
  adsReporting: '/open_api/v1.3/report/integrated/get/'
};

const TTS_METRICS = {
  shop: {
    gmv: 485000000,
    grossRevenue: 492000000,
    ordersCount: 2847,
    skuOrdersCount: 3120,
    unitsSold: 4891,
    itemsSold: 4891,
    buyers: 2412,
    avgOrderValue: 170354,
    avgCustomersCount: 82,
    avgPageViews: 14200,
    avgVisitors: 8650,
    avgConversionRate: 4.82,
    productImpressions: 892000,
    productPageViews: 156000,
    refunds: 15500000,
    cancellationsAndReturns: 156,
    returnRate: 3.2,
    gmvBreakdown: { VIDEO: 98000000, LIVE: 129000000, PRODUCT_CARD: 98000000 },
    grossRevenuePct: { VIDEO: 20.2, LIVE: 26.6, PRODUCT_CARD: 20.2 },
    syncAt: '2026-06-05 14:32'
  },

  finance: {
    settlementAmount: 187800000,
    revenueAmount: 485000000,
    feeAmount: 14550000,
    netSalesAmount: 462000000,
    shippingCostAmount: 28000000,
    platformCommission: 8720000,
    affiliateCommission: 42000000,
    affiliateAdsCommission: 6800000,
    unsettledAmount: 42300000,
    unsettledOrders: 186,
    paymentStatus: 'SETTLED'
  },

  affiliate: {
    totalGmv: 186000000,
    totalOrders: 1240,
    avgCommissionRate: 11.2,
    estimatedPaidCommission: 20800000,
    actualPaidCommission: 19200000,
    shopAdsCommissionRate: 3.5,
    openCollabProducts: 5,
    targetCollabActive: 3,
    samplePending: 2,
    sampleConverted: 2,
    settlementPending: 48,
    fullyReturnRate: 2.1
  },

  customerService: {
    conversionRate: 68.4,
    avgResponseTimeMin: 4.2,
    sessionsToday: 47,
    satisfactionScore: 4.6,
    unreadMessages: 12
  },

  inventory: {
    P001: { available: 1240, committed: 86, totalCommitted: 142, warehouses: 2 },
    P002: { available: 856, committed: 42, totalCommitted: 68, warehouses: 2 },
    P003: { available: 45, committed: 28, totalCommitted: 45, warehouses: 1 },
    P004: { available: 2100, committed: 12, totalCommitted: 24, warehouses: 2 },
    P005: { available: 680, committed: 55, totalCommitted: 72, warehouses: 2 },
    P006: { available: 3200, committed: 8, totalCommitted: 15, warehouses: 1 },
    P007: { available: 890, committed: 18, totalCommitted: 22, warehouses: 1 }
  },

  products: {
    P001: {
      gmv: 257588000, orders: 892, itemsSold: 892, unitsSold: 892,
      impressions: 245000, pageViews: 48200, avgUniquePageViews: 1606, ctr: 3.8, avgConversionRate: 5.2,
      breakdown: { VIDEO: { gmv: 98000000, itemsSold: 340 }, LIVE: { gmv: 89000000, itemsSold: 310 }, PRODUCT_CARD: { gmv: 70588000, itemsSold: 242 } },
      returned: 12, canceled: 8, refunded: 4, replacements: 2,
      ratings: { '5_STAR': 412, '4_STAR': 98, '3_STAR': 22, '2_STAR': 8, '1_STAR': 4 }
    },
    P002: {
      gmv: 130146000, orders: 654, itemsSold: 654, unitsSold: 654,
      impressions: 128000, pageViews: 24100, avgUniquePageViews: 803, ctr: 3.1, avgConversionRate: 4.4,
      breakdown: { VIDEO: { gmv: 42000000, itemsSold: 210 }, LIVE: { gmv: 38000000, itemsSold: 190 }, PRODUCT_CARD: { gmv: 50146000, itemsSold: 254 } },
      returned: 8, canceled: 5, refunded: 3, replacements: 1,
      ratings: { '5_STAR': 298, '4_STAR': 72, '3_STAR': 18, '2_STAR': 6, '1_STAR': 3 }
    },
    P003: {
      gmv: 107067000, orders: 1203, itemsSold: 1203, unitsSold: 1203,
      impressions: 312000, pageViews: 58400, avgUniquePageViews: 1946, ctr: 4.6, avgConversionRate: 6.1,
      breakdown: { VIDEO: { gmv: 32000000, itemsSold: 360 }, LIVE: { gmv: 45000000, itemsSold: 505 }, PRODUCT_CARD: { gmv: 30067000, itemsSold: 338 } },
      returned: 18, canceled: 14, refunded: 9, replacements: 4,
      ratings: { '5_STAR': 520, '4_STAR': 142, '3_STAR': 38, '2_STAR': 12, '1_STAR': 7 }
    },
    P004: {
      gmv: 66939000, orders: 421, itemsSold: 421, unitsSold: 421,
      impressions: 98000, pageViews: 18200, avgUniquePageViews: 606, ctr: 2.9, avgConversionRate: 3.8,
      breakdown: { VIDEO: { gmv: 18000000, itemsSold: 113 }, LIVE: { gmv: 22000000, itemsSold: 138 }, PRODUCT_CARD: { gmv: 26939000, itemsSold: 170 } },
      returned: 6, canceled: 4, refunded: 2, replacements: 1,
      ratings: { '5_STAR': 180, '4_STAR': 52, '3_STAR': 14, '2_STAR': 5, '1_STAR': 2 }
    },
    P005: {
      gmv: 141183000, orders: 567, itemsSold: 567, unitsSold: 567,
      impressions: 198000, pageViews: 36800, avgUniquePageViews: 1226, ctr: 4.1, avgConversionRate: 5.6,
      breakdown: { VIDEO: { gmv: 52000000, itemsSold: 209 }, LIVE: { gmv: 48000000, itemsSold: 192 }, PRODUCT_CARD: { gmv: 41183000, itemsSold: 166 } },
      returned: 7, canceled: 5, refunded: 2, replacements: 1,
      ratings: { '5_STAR': 380, '4_STAR': 88, '3_STAR': 20, '2_STAR': 4, '1_STAR': 2 }
    },
    P006: {
      gmv: 18486000, orders: 234, itemsSold: 234, unitsSold: 234,
      impressions: 42000, pageViews: 8100, avgUniquePageViews: 270, ctr: 2.2, avgConversionRate: 2.9,
      breakdown: { VIDEO: { gmv: 8000000, itemsSold: 101 }, LIVE: { gmv: 4200000, itemsSold: 53 }, PRODUCT_CARD: { gmv: 6286000, itemsSold: 80 } },
      returned: 4, canceled: 3, refunded: 2, replacements: 0,
      ratings: { '5_STAR': 68, '4_STAR': 22, '3_STAR': 8, '2_STAR': 4, '1_STAR': 6 }
    },
    P007: {
      gmv: 44055000, orders: 445, itemsSold: 445, unitsSold: 445,
      impressions: 76000, pageViews: 14200, avgUniquePageViews: 473, ctr: 3.4, avgConversionRate: 4.1,
      breakdown: { VIDEO: { gmv: 14000000, itemsSold: 141 }, LIVE: { gmv: 12000000, itemsSold: 121 }, PRODUCT_CARD: { gmv: 18055000, itemsSold: 183 } },
      returned: 5, canceled: 3, refunded: 1, replacements: 1,
      ratings: { '5_STAR': 210, '4_STAR': 48, '3_STAR': 12, '2_STAR': 3, '1_STAR': 2 }
    }
  },

  creators: {
    K001: {
      unitsSold: 892, gmv: 98000000, videoGmv: 52000000, liveGmv: 46000000,
      gpm: 188000, videoGpm: 165000, liveGpm: 212000,
      avgCommissionRate: 12, avgGmvPerBuyer: 285000, ecLiveEngagementRate: 6200,
      ecVideoCount: 28, ecLiveCount: 4, pps: 87, postRate: 92,
      followerLocation: { 'Hà Nội': 0.32, 'TP.HCM': 0.41, 'Khác': 0.27 },
      categoryGmvDistribution: { 'Mỹ phẩm': 0.78, 'Chăm sóc da': 0.22 }
    },
    K002: {
      unitsSold: 420, gmv: 42000000, videoGmv: 38000000, liveGmv: 4000000,
      gpm: 142000, videoGpm: 138000, liveGpm: 98000,
      avgCommissionRate: 10, avgGmvPerBuyer: 198000, ecLiveEngagementRate: 4100,
      ecVideoCount: 15, ecLiveCount: 1, pps: 72, postRate: 78
    },
    K003: {
      unitsSold: 1560, gmv: 156000000, videoGmv: 42000000, liveGmv: 114000000,
      gpm: 312000, videoGpm: 145000, liveGpm: 385000,
      avgCommissionRate: 15, avgGmvPerBuyer: 420000, ecLiveEngagementRate: 8400,
      ecVideoCount: 8, ecLiveCount: 12, pps: 94, postRate: 96
    },
    K004: {
      unitsSold: 95, gmv: 8500000, videoGmv: 8500000, liveGmv: 0,
      gpm: 98000, videoGpm: 98000, liveGpm: 0,
      avgCommissionRate: 8, avgGmvPerBuyer: 89000, ecLiveEngagementRate: 2800,
      ecVideoCount: 6, ecLiveCount: 0, pps: 41, postRate: 45
    },
    K005: {
      unitsSold: 380, gmv: 35000000, videoGmv: 32000000, liveGmv: 3000000,
      gpm: 156000, videoGpm: 152000, liveGpm: 88000,
      avgCommissionRate: 10, avgGmvPerBuyer: 175000, ecLiveEngagementRate: 4800,
      ecVideoCount: 22, ecLiveCount: 2, pps: 79, postRate: 82
    },
    K006: {
      unitsSold: 0, gmv: 0, videoGmv: 0, liveGmv: 0,
      gpm: 0, videoGpm: 0, liveGpm: 0,
      avgCommissionRate: 8, avgGmvPerBuyer: 0, ecLiveEngagementRate: 1200,
      ecVideoCount: 1, ecLiveCount: 0, pps: 22, postRate: 18
    }
  },

  videos: {
    V001: {
      views: 520000, impressions: 680000, ctr: 4.2, clickThroughRate: 4.2,
      orders: 342, itemSoldCount: 342, gmv: 98000000,
      anchorDisplayRate: 78.5, newFollowers: 2840, avgConversionRate: 4.2,
      contentType: 'VIDEO', productClicks: 28560
    },
    V002: {
      views: 89000, impressions: 142000, ctr: 6.8, clickThroughRate: 6.8,
      orders: 567, itemSoldCount: 567, gmv: 156000000,
      watchGpm: 1750000, showGpm: 1100000, avgPrice: 275000,
      uniqueViewers: 72000, productClicks: 9600, clickToOrderRate: 5.9,
      contentType: 'LIVE'
    },
    V003: {
      views: 125000, impressions: 168000, ctr: 2.1, clickThroughRate: 2.1,
      orders: 89, itemSoldCount: 89, gmv: 7900000,
      anchorDisplayRate: 62.3, newFollowers: 420, avgConversionRate: 2.1,
      contentType: 'VIDEO', productClicks: 3520
    },
    V004: {
      views: 45000, impressions: 58000, ctr: 1.8, clickThroughRate: 1.8,
      orders: 34, itemSoldCount: 34, gmv: 3360000,
      anchorDisplayRate: 55.0, newFollowers: 180, avgConversionRate: 1.8,
      contentType: 'VIDEO', productClicks: 1040
    },
    V005: {
      views: 0, impressions: 0, ctr: 0, orders: 0, itemSoldCount: 0, gmv: 0,
      contentType: 'VIDEO'
    }
  },

  lives: {
    L001: {
      gmv: 156000000, expectedGmv: 80000000, skuOrders: 567, mainOrders: 412,
      customers: 398, itemsSold: 612, avgPrice: 275000,
      views: 89000, uniqueViewers: 72000, impressions: 142000,
      ctr: 6.8, productClicks: 9600, clickToOrderRate: 5.9, skuOrderCtor: 5.2,
      watchGpm: 1750000, showGpm: 1100000, gpm: 1100000,
      enterRoomRate: 62.7, commentRate: 8.2, likeRate: 12.4, followRate: 3.2, shareRate: 1.8,
      newFollowers: 2280, conversion: 5.9, peakConcurrentUsers: 8400, avgWatchingDuration: 186
    },
    L002: {
      gmv: 42000000, expectedGmv: 35000000, skuOrders: 142, mainOrders: 108,
      customers: 102, itemsSold: 168, avgPrice: 198000,
      views: 42000, uniqueViewers: 35000, impressions: 68000,
      ctr: 4.2, productClicks: 2940, clickToOrderRate: 4.8, skuOrderCtor: 4.1,
      watchGpm: 1000000, showGpm: 618000, gpm: 618000,
      enterRoomRate: 58.2, commentRate: 6.8, likeRate: 9.6, followRate: 2.4, shareRate: 1.2,
      newFollowers: 840, conversion: 4.8, peakConcurrentUsers: 3200, avgWatchingDuration: 142
    }
  },

  liveCore: {
    sales: 612, localGmv: 156000000, createdOrderCount: 612, paidOrderCount: 567,
    currentVisitorCount: 8400, watchPv: 89000, clickThroughRate: 6.8,
    productReachCount: 9600, clickOrderRate: 5.9, buyerCount: 398,
    peakConcurrentUserCount: 8400, avgWatchingDuration: 186,
    accumulatedNewFollowerCount: 2280, accumulatedCommentCount: 7280
  },

  ads: {
    totalSpend: 20700000, totalGmv: 78600000, blendedRoas: 3.79, blendedCpc: 1670, blendedCpm: 23200,
    campaigns: {
      AD001: {
        spend: 12800000, gmv: 48640000, roas: 3.8, orders: 234, impressions: 890000, clicks: 12400,
        ctr: 1.39, cvr: 1.89, cpc: 1032, cpm: 14382, costPerOrder: 54700,
        campaignType: 'SPARK_ADS', optimizationGoal: 'GMV', budget: 15000000
      },
      AD002: {
        spend: 7900000, gmv: 9480000, roas: 1.2, orders: 89, impressions: 450000, clicks: 8900,
        ctr: 1.98, cvr: 1.0, cpc: 888, cpm: 17556, costPerOrder: 88764,
        campaignType: 'PRODUCT_ADS', optimizationGoal: 'CONVERSION', budget: 8000000
      },
      AD003: {
        spend: 0, gmv: 0, roas: 0, orders: 0, impressions: 0, clicks: 0,
        campaignType: 'LIVE_ADS', optimizationGoal: 'GMV', budget: 10000000
      }
    },
    gmvMax: {
      enabled: true, targetRoi: 2.5, actualRoi: 3.2, cost: 12800000, grossRevenue: 48640000
    }
  },

  samples: {
    totalCost: 249000, totalRevenue: 13990000, pipelineRoi: 56.2,
    avgDaysToContent: 8.5, fulfillmentRate: 75, contentRate: 50
  },

  orders: {
    pendingCount: 1, processingCount: 2, slaRiskCount: 2, avgFulfillmentHours: 18.4,
    cancelRate: 1.2, onTimeDeliveryRate: 96.8
  }
};

/* —— Accessors —— */
function getProductMetrics(productId) {
  return TTS_METRICS.products[productId] || null;
}

function getCreatorMetrics(kocId) {
  return TTS_METRICS.creators[kocId] || null;
}

function getVideoMetrics(videoId) {
  return TTS_METRICS.videos[videoId] || null;
}

function getLiveMetrics(liveId) {
  return TTS_METRICS.lives[liveId] || null;
}

function getAdMetrics(adId) {
  return TTS_METRICS.ads.campaigns[adId] || null;
}

function calcAffiliateRoi(gmv, commission) {
  if (!commission) return 0;
  return (gmv / commission).toFixed(1);
}

function calcSampleRoiDetailed(sample) {
  const cost = sample.cost || 0;
  const rev = sample.revenue || 0;
  return {
    roi: cost ? (rev / cost).toFixed(1) : '0',
    margin: rev ? (((rev - cost) / rev) * 100).toFixed(1) : '0',
    paybackDays: sample.status === 'converted' ? 12 : null
  };
}

/* KPI strip theo module — dùng cho FAB, flow panel, page header */
function getModuleMetrics(pageId) {
  const s = TTS_METRICS.shop;
  const f = TTS_METRICS.finance;
  const a = TTS_METRICS.affiliate;
  const map = {
    dashboard: [
      { l: 'GMV 30d', v: fmt(s.gmv), highlight: true },
      { l: 'OAV', v: fmtCurrency(s.avgOrderValue) },
      { l: 'Đơn hàng', v: s.ordersCount.toLocaleString('vi-VN') },
      { l: 'CVR shop', v: s.avgConversionRate + '%' },
      { l: 'Hoàn/trả', v: s.returnRate + '%', color: s.returnRate > 4 ? 'text-red-600' : 'text-green-600' },
      { l: 'Buyers', v: s.buyers.toLocaleString('vi-VN') }
    ],
    executive: [
      { l: 'GMV', v: fmt(s.gmv), highlight: true },
      { l: 'Thanh toán đã nhận', v: fmt(f.settlementAmount) },
      { l: 'OAV', v: fmtCurrency(s.avgOrderValue) },
      { l: 'Số lượng bán', v: s.unitsSold.toLocaleString('vi-VN') },
      { l: 'Doanh thu gộp', v: fmt(s.grossRevenue) },
      { l: 'Phí nền tảng', v: fmt(f.feeAmount) }
    ],
    revenue: [
      { l: 'GMV tổng', v: fmt(s.gmv), highlight: true },
      { l: 'Live', v: fmt(s.gmvBreakdown.LIVE), sub: s.grossRevenuePct.LIVE + '%' },
      { l: 'Video', v: fmt(s.gmvBreakdown.VIDEO), sub: s.grossRevenuePct.VIDEO + '%' },
      { l: 'Product card', v: fmt(s.gmvBreakdown.PRODUCT_CARD) },
      { l: 'Impressions', v: fmt(s.productImpressions) },
      { l: 'Page views', v: fmt(s.productPageViews) }
    ],
    profit: [
      { l: 'Doanh thu thuần', v: fmt(f.netSalesAmount), highlight: true },
      { l: 'Thanh toán đã nhận', v: fmt(f.settlementAmount) },
      { l: 'Hoa hồng affiliate', v: fmt(f.affiliateCommission) },
      { l: 'Phí nền tảng', v: fmt(f.platformCommission) },
      { l: 'Chưa quyết toán', v: fmt(f.unsettledAmount) },
      { l: 'Biên lợi nhuận', v: calcProfit().margin + '%' }
    ],
    affiliate: [
      { l: 'Aff GMV', v: fmt(a.totalGmv), highlight: true },
      { l: 'Commission', v: fmt(a.actualPaidCommission) },
      { l: 'ROI aff', v: calcAffiliateRoi(a.totalGmv, a.actualPaidCommission) + 'x' },
      { l: 'Avg comm rate', v: a.avgCommissionRate + '%' },
      { l: 'Aff orders', v: a.totalOrders.toLocaleString('vi-VN') },
      { l: 'Settlement chờ', v: a.settlementPending + ' SKU' }
    ],
    'affiliate-analytics': [
      { l: 'Aff GMV', v: fmt(a.totalGmv), highlight: true },
      { l: 'Est. commission', v: fmt(a.estimatedPaidCommission) },
      { l: 'Actual commission', v: fmt(a.actualPaidCommission) },
      { l: 'Shop ads comm', v: a.shopAdsCommissionRate + '%' },
      { l: 'Open collab', v: a.openCollabProducts + ' SP' },
      { l: 'Return rate', v: a.fullyReturnRate + '%' }
    ],
    koc: [
      { l: 'Top PPS', v: '94', highlight: true },
      { l: 'GMV KOC', v: fmt(a.totalGmv) },
      { l: 'Avg GPM', v: fmt(188000) },
      { l: 'Active', v: ZZP_DATA.kocs.filter(k => k.status === 'active').length },
      { l: 'Video GMV', v: fmt(124000000) },
      { l: 'Live GMV', v: fmt(62000000) }
    ],
    'creator-analytics': [
      { l: 'Creators', v: ZZP_DATA.kocs.length },
      { l: 'Avg PPS', v: '66' },
      { l: 'Top GPM', v: fmt(385000), highlight: true },
      { l: 'Avg comm', v: '10.8%' },
      { l: 'Units sold', v: '3.3K' },
      { l: 'Post rate', v: '85%' }
    ],
    samples: [
      { l: 'Pipeline ROI', v: TTS_METRICS.samples.pipelineRoi + 'x', highlight: true, color: 'text-green-600' },
      { l: 'Chi phí mẫu', v: fmtCurrency(TTS_METRICS.samples.totalCost) },
      { l: 'Doanh thu', v: fmt(TTS_METRICS.samples.totalRevenue) },
      { l: 'Fulfillment', v: TTS_METRICS.samples.fulfillmentRate + '%' },
      { l: 'Content rate', v: TTS_METRICS.samples.contentRate + '%' },
      { l: 'Avg ngày→content', v: TTS_METRICS.samples.avgDaysToContent + 'd' }
    ],
    content: [
      { l: 'GMV content', v: fmt(ZZP_DATA.content.reduce((x, c) => x + c.gmv, 0)), highlight: true },
      { l: 'Top CTR', v: '6.8%' },
      { l: 'Top GPM', v: fmt(1750000) },
      { l: 'Video GMV', v: fmt(s.gmvBreakdown.VIDEO) },
      { l: 'New followers', v: '5.4K' },
      { l: 'Published', v: ZZP_DATA.content.filter(c => c.status === 'published').length }
    ],
    'content-analytics': [
      { l: 'Total views', v: fmt(779000) },
      { l: 'Total GMV', v: fmt(261360000), highlight: true },
      { l: 'Avg CTR', v: '3.7%' },
      { l: 'Avg CVR', v: '3.8%' },
      { l: 'Anchor display', v: '68.2%' },
      { l: 'Item sold', v: '1,032' }
    ],
    livestream: [
      { l: 'Live GMV', v: fmt(s.gmvBreakdown.LIVE), highlight: true },
      { l: 'Watch GPM', v: fmt(1750000) },
      { l: 'AOV live', v: fmtCurrency(275000) },
      { l: 'CTR live', v: '6.8%' },
      { l: 'Click→order', v: '5.9%' },
      { l: 'Peak viewers', v: '8.4K' }
    ],
    'live-analytics': [
      { l: 'Live GMV', v: fmt(198000000), highlight: true },
      { l: 'SKU orders', v: '709' },
      { l: 'Avg watch GPM', v: fmt(1375000) },
      { l: 'Enter room rate', v: '62.7%' },
      { l: 'Follow rate', v: '3.2%' },
      { l: 'Avg duration', v: '164s' }
    ],
    ads: [
      { l: 'Blended ROAS', v: TTS_METRICS.ads.blendedRoas + 'x', highlight: true },
      { l: 'Ads GMV', v: fmt(TTS_METRICS.ads.totalGmv) },
      { l: 'Spend', v: fmt(TTS_METRICS.ads.totalSpend) },
      { l: 'CPC', v: fmtCurrency(TTS_METRICS.ads.blendedCpc) },
      { l: 'CPM', v: fmt(TTS_METRICS.ads.blendedCpm) },
      { l: 'GMV Max ROI', v: TTS_METRICS.ads.gmvMax.actualRoi + 'x', color: 'text-green-600' }
    ],
    products: [
      { l: 'Top SKU GMV', v: fmt(TTS_METRICS.products.P001.gmv), highlight: true },
      { l: 'Units sold', v: s.unitsSold.toLocaleString('vi-VN') },
      { l: 'Avg CVR', v: '4.6%' },
      { l: 'Impressions', v: fmt(s.productImpressions) },
      { l: 'Returns', v: s.cancellationsAndReturns + ' sp' },
      { l: 'Refunds', v: fmt(s.refunds) }
    ],
    'product-analytics': [
      { l: 'SKU tracked', v: Object.keys(TTS_METRICS.products).length },
      { l: 'Top CTR', v: '4.6%' },
      { l: 'Top CVR', v: '6.1%' },
      { l: 'Live share', v: '42%' },
      { l: 'Video share', v: '36%' },
      { l: 'Card share', v: '22%' }
    ],
    orders: [
      { l: 'Orders 30d', v: s.ordersCount.toLocaleString('vi-VN') },
      { l: 'SLA risk', v: TTS_METRICS.orders.slaRiskCount, color: 'text-red-600' },
      { l: 'On-time', v: TTS_METRICS.orders.onTimeDeliveryRate + '%', color: 'text-green-600' },
      { l: 'Cancel rate', v: TTS_METRICS.orders.cancelRate + '%' },
      { l: 'Avg fulfill', v: TTS_METRICS.orders.avgFulfillmentHours + 'h' },
      { l: 'OAV', v: fmtCurrency(s.avgOrderValue) }
    ],
    inventory: [
      { l: 'SKU cảnh báo', v: 'P003', color: 'text-red-600' },
      { l: 'Available', v: '45 sp', color: 'text-red-600' },
      { l: 'Committed', v: '28 sp' },
      { l: 'Total committed', v: '45 sp' },
      { l: 'Warehouses', v: '1' },
      { l: 'Days left', v: '2', color: 'text-red-600' }
    ],
    returns: [
      { l: 'Return rate', v: s.returnRate + '%' },
      { l: 'Refunded', v: fmt(s.refunds) },
      { l: 'Cancel+return', v: s.cancellationsAndReturns + ' sp' },
      { l: 'Cases open', v: ZZP_DATA.returns.filter(r => r.status === 'pending_review').length },
      { l: 'Aff return', v: a.fullyReturnRate + '%' },
      { l: 'Benchmark', v: '4.8%', sub: '↓ tốt hơn' }
    ],
    finance: [
      { l: 'Thanh toán đã nhận', v: fmt(f.settlementAmount), highlight: true },
      { l: 'Doanh thu', v: fmt(f.revenueAmount) },
      { l: 'Phí', v: fmt(f.feeAmount) },
      { l: 'Chưa quyết toán', v: fmt(f.unsettledAmount) },
      { l: 'Hoa hồng affiliate', v: fmt(f.affiliateCommission) },
      { l: 'Phí vận chuyển', v: fmt(f.shippingCostAmount) }
    ],
    costs: [
      { l: 'COGS', v: fmt(ZZP_DATA.costs.cogs) },
      { l: 'Commission', v: fmt(ZZP_DATA.costs.commission) },
      { l: 'Ads', v: fmt(ZZP_DATA.costs.ads) },
      { l: 'Platform', v: fmt(ZZP_DATA.costs.platform) },
      { l: 'Sample', v: fmt(ZZP_DATA.costs.sample) },
      { l: '% GMV', v: (ZZP_DATA.costs.total / s.gmv * 100).toFixed(1) + '%' }
    ],
    campaigns: [
      { l: 'Active', v: ZZP_DATA.campaigns.filter(c => c.status === 'active').length },
      { l: 'Total GMV', v: fmt(ZZP_DATA.campaigns.reduce((x, c) => x + c.gmv, 0)), highlight: true },
      { l: 'Spent', v: fmt(ZZP_DATA.campaigns.reduce((x, c) => x + c.spent, 0)) },
      { l: 'Avg ROI', v: '4.2x' },
      { l: 'Flash sale', v: '1' },
      { l: 'Aff boost', v: '1' }
    ],
    vouchers: [
      { l: 'Total cost', v: fmt(ZZP_DATA.vouchers.reduce((x, v) => x + v.cost, 0)) },
      { l: 'Voucher GMV', v: fmt(ZZP_DATA.vouchers.reduce((x, v) => x + v.gmv, 0)), highlight: true },
      { l: 'Used', v: ZZP_DATA.vouchers.reduce((x, v) => x + v.used, 0) },
      { l: 'Guardrail warn', v: ZZP_DATA.vouchers.filter(v => v.guardrail === 'warning').length, color: 'text-amber-600' },
      { l: 'ROI voucher', v: '3.1x' },
      { l: 'Redemption', v: '68%' }
    ],
    agency: [
      { l: 'Agency GMV', v: fmt(ZZP_DATA.agencies.reduce((x, a) => x + a.gmv30d, 0)), highlight: true },
      { l: 'Avg ROI', v: '2.9x' },
      { l: 'Total fee', v: fmt(ZZP_DATA.agencies.reduce((x, a) => x + a.fee, 0)) },
      { l: 'KOC managed', v: ZZP_DATA.agencies.reduce((x, a) => x + a.kocs, 0) },
      { l: 'Active', v: ZZP_DATA.agencies.filter(a => a.status === 'active').length },
      { l: 'Review', v: ZZP_DATA.agencies.filter(a => a.status === 'review').length }
    ],
    'customer-analytics': [
      { l: 'Total buyers', v: s.buyers.toLocaleString('vi-VN') },
      { l: 'Repeat rate', v: '42%' },
      { l: 'Avg LTV', v: fmtCurrency(580000) },
      { l: 'VIP segment', v: '342' },
      { l: 'At-risk', v: '456', color: 'text-amber-600' },
      { l: 'CS conversion', v: TTS_METRICS.customerService.conversionRate + '%' }
    ],
    'growth-assistant': ZZP_DATA.aiInsights.slice(0, 4).map((i, idx) => ({
      l: idx === 0 ? 'Top insight' : `#${i.priority}`,
      v: idx === 0 ? i.impact : i.confidence + '%',
      highlight: idx === 0
    })),
    alerts: [
      { l: 'Unread', v: ZZP_DATA.alerts.filter(x => !x.read).length },
      { l: 'Critical', v: ZZP_DATA.alerts.filter(x => x.severity === 'critical').length, color: 'text-red-600' },
      { l: 'Stock alerts', v: 1 },
      { l: 'ROAS alerts', v: 1 },
      { l: 'Compliance', v: 1 },
      { l: 'SLA', v: 1 }
    ]
  };
  if (map[pageId]) return map[pageId];
  return [
    { l: 'GMV 30d', v: fmt(s.gmv), highlight: true },
    { l: 'OAV', v: fmtCurrency(s.avgOrderValue) },
    { l: 'Orders', v: s.ordersCount.toLocaleString('vi-VN') },
    { l: 'CVR', v: s.avgConversionRate + '%' }
  ];
}

function renderTtsMetricsStrip(pageId, opts = {}) {
  const metrics = getModuleMetrics(pageId).slice(0, opts.limit || 6);
  return `
    <div class="ds-metric-strip">
      <div class="ds-metric-strip-head">
        <p class="ds-metric-strip-label">${icon('bar-chart-2', 14)} Chỉ số TikTok Shop · ${viPage(pageId)}</p>
        <span class="ds-metric-strip-sync">Sync ${TTS_METRICS.shop.syncAt}</span>
      </div>
      <div class="ds-metric-strip-grid">
        ${metrics.map(m => `
          <div class="ds-metric-cell${m.highlight ? ' ds-metric-cell--highlight' : ''}">
            <p class="ds-metric-cell-val${m.highlight || m.color ? ' is-brand' : ''}">${m.v}</p>
            <p class="ds-metric-cell-lbl">${typeof viMetric === 'function' ? viMetric(m.l) : m.l}</p>
            ${m.sub ? `<p class="ds-metric-cell-sub">${m.sub}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>`;
}

function renderTtsBreakdownTable(pageId) {
  if (pageId === 'revenue' || pageId === 'executive' || pageId === 'dashboard') {
    const b = TTS_METRICS.shop.gmvBreakdown;
    const pct = TTS_METRICS.shop.grossRevenuePct;
    return `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="border-b border-slate-100 text-slate-500">
            <th class="text-left py-2 px-3">Kênh content</th><th class="text-left py-2 px-3">GMV</th><th class="text-left py-2 px-3">% doanh thu</th><th class="text-left py-2 px-3">Xu hướng</th>
          </tr></thead>
          <tbody>
            ${['VIDEO', 'LIVE', 'PRODUCT_CARD'].map(t => `
              <tr class="border-b border-slate-50">
                <td class="py-2 px-3 font-medium">${t === 'PRODUCT_CARD' ? 'Product Card' : t === 'LIVE' ? 'Livestream' : 'Video'}</td>
                <td class="py-2 px-3">${fmt(b[t])}</td>
                <td class="py-2 px-3">${pct[t]}%</td>
                <td class="py-2 px-3 text-xs text-slate-500">${pct[t] >= 25 ? '↑ Mạnh' : '→ Ổn định'}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }
  if (pageId === 'product-analytics' || pageId === 'products') {
    return `
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-slate-100 text-slate-500">
            <th class="text-left py-2 px-2">SKU</th><th class="py-2 px-2">GMV</th><th class="py-2 px-2">Orders</th><th class="py-2 px-2">CTR</th><th class="py-2 px-2">CVR</th><th class="py-2 px-2">Impressions</th><th class="py-2 px-2">Live GMV</th><th class="py-2 px-2">Video GMV</th>
          </tr></thead>
          <tbody>
            ${ZZP_DATA.products.map(p => {
              const m = getProductMetrics(p.id);
              if (!m) return '';
              return `<tr class="border-b border-slate-50 hover:bg-zzp-50/30 cursor-pointer" onclick="openDetail('product','${p.id}')">
                <td class="py-2 px-2 font-medium">${p.name.slice(0, 22)}</td>
                <td class="py-2 px-2">${fmt(m.gmv)}</td>
                <td class="py-2 px-2">${m.orders}</td>
                <td class="py-2 px-2">${m.ctr}%</td>
                <td class="py-2 px-2">${m.avgConversionRate}%</td>
                <td class="py-2 px-2">${fmt(m.impressions)}</td>
                <td class="py-2 px-2">${fmt(m.breakdown.LIVE.gmv)}</td>
                <td class="py-2 px-2">${fmt(m.breakdown.VIDEO.gmv)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }
  if (pageId === 'live-analytics' || pageId === 'livestream') {
    return `
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-slate-100 text-slate-500">
            <th class="text-left py-2 px-2">Session</th><th class="py-2 px-2">GMV</th><th class="py-2 px-2">AOV</th><th class="py-2 px-2">Watch GPM</th><th class="py-2 px-2">CTR</th><th class="py-2 px-2">Click→Order</th><th class="py-2 px-2">Peak CCU</th><th class="py-2 px-2">Followers+</th>
          </tr></thead>
          <tbody>
            ${Object.entries(TTS_METRICS.lives).map(([id, m]) => {
              const ls = ZZP_DATA.liveSessions.find(l => l.id === id);
              return `<tr class="border-b border-slate-50">
                <td class="py-2 px-2 font-medium">${ls?.title?.slice(0, 24) || id}</td>
                <td class="py-2 px-2">${fmt(m.gmv || m.expectedGmv)}</td>
                <td class="py-2 px-2">${fmtCurrency(m.avgPrice)}</td>
                <td class="py-2 px-2">${fmt(m.watchGpm)}</td>
                <td class="py-2 px-2">${m.ctr}%</td>
                <td class="py-2 px-2">${m.clickToOrderRate}%</td>
                <td class="py-2 px-2">${fmt(m.peakConcurrentUsers)}</td>
                <td class="py-2 px-2">${fmt(m.newFollowers)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }
  if (pageId === 'creator-analytics' || pageId === 'koc' || pageId === 'affiliate') {
    return `
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-slate-100 text-slate-500">
            <th class="text-left py-2 px-2">Creator</th><th class="py-2 px-2">GMV</th><th class="py-2 px-2">Video GMV</th><th class="py-2 px-2">Live GMV</th><th class="py-2 px-2">GPM</th><th class="py-2 px-2">PPS</th><th class="py-2 px-2">Comm %</th><th class="py-2 px-2">Units</th>
          </tr></thead>
          <tbody>
            ${ZZP_DATA.kocs.filter(k => k.gmv30d > 0).map(k => {
              const m = getCreatorMetrics(k.id);
              if (!m) return '';
              return `<tr class="border-b border-slate-50 hover:bg-zzp-50/30 cursor-pointer" onclick="openDetail('koc','${k.id}')">
                <td class="py-2 px-2 font-medium text-zzp-700">${k.name}</td>
                <td class="py-2 px-2">${fmt(m.gmv)}</td>
                <td class="py-2 px-2">${fmt(m.videoGmv)}</td>
                <td class="py-2 px-2">${fmt(m.liveGmv)}</td>
                <td class="py-2 px-2">${fmt(m.gpm)}</td>
                <td class="py-2 px-2">${m.pps}</td>
                <td class="py-2 px-2">${m.avgCommissionRate}%</td>
                <td class="py-2 px-2">${m.unitsSold}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }
  if (pageId === 'ads') {
    return `
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-slate-100 text-slate-500">
            <th class="text-left py-2 px-2">Campaign</th><th class="py-2 px-2">Spend</th><th class="py-2 px-2">GMV</th><th class="py-2 px-2">ROAS</th><th class="py-2 px-2">Orders</th><th class="py-2 px-2">CTR</th><th class="py-2 px-2">CPC</th><th class="py-2 px-2">CPM</th><th class="py-2 px-2">Cost/order</th>
          </tr></thead>
          <tbody>
            ${ZZP_DATA.ads.map(a => {
              const m = getAdMetrics(a.id);
              if (!m || !m.spend) return `<tr class="border-b border-slate-50"><td class="py-2 px-2">${a.name.slice(0, 20)}</td><td colspan="8" class="py-2 px-2 text-slate-400">Scheduled</td></tr>`;
              return `<tr class="border-b border-slate-50 hover:bg-zzp-50/30 cursor-pointer" onclick="openDetail('ad','${a.id}')">
                <td class="py-2 px-2 font-medium">${a.name.slice(0, 22)}</td>
                <td class="py-2 px-2">${fmt(m.spend)}</td>
                <td class="py-2 px-2">${fmt(m.gmv)}</td>
                <td class="py-2 px-2 font-bold ${m.roas >= 2 ? 'text-green-600' : 'text-red-600'}">${m.roas}x</td>
                <td class="py-2 px-2">${m.orders}</td>
                <td class="py-2 px-2">${m.ctr}%</td>
                <td class="py-2 px-2">${fmtCurrency(m.cpc)}</td>
                <td class="py-2 px-2">${fmt(m.cpm)}</td>
                <td class="py-2 px-2">${fmtCurrency(m.costPerOrder)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }
  return '';
}

function renderTtsFinanceStrip() {
  const f = TTS_METRICS.finance;
  return dsStatGrid([
    { label: 'Thanh toán đã nhận', value: fmt(f.settlementAmount), hint: 'Quyết toán kỳ gần nhất', tone: 'brand' },
    { label: 'Phí nền tảng', value: fmt(f.platformCommission), tone: 'warning' },
    { label: 'Hoa hồng affiliate', value: fmt(f.affiliateCommission), tone: 'info' },
    { label: 'Chưa quyết toán', value: fmt(f.unsettledAmount), hint: f.unsettledOrders + ' đơn chờ', tone: 'danger' }
  ]);
}
