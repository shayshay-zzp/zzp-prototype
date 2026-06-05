/* Samples — tab Tổng quan ROI */

function renderSamplesTabRoiOverview() {
  const stats = calcSamplePipelineStats();
  return chartGrid([['Conversion funnel', 'chart-sample-funnel', 'sm'], ['Sample ROI', 'chart-sample-roi', 'sm'], ['Trạng thái', 'chart-sample-status', 'sm']], 3) +
    dsStatGrid([
      { label: 'Tổng gửi mẫu', value: stats.total, tone: 'info' },
      { label: 'Tỷ lệ convert', value: stats.convPct + '%', tone: 'success' },
      { label: 'ROI trung bình', value: stats.avgRoi + 'x', tone: 'brand' },
      { label: 'Chưa content', value: stats.noContent.length, tone: 'danger' }
    ]);
}
