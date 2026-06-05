/* Samples — tab Tổng quan ROI */

function renderSamplesTabRoiOverview() {
  const stats = calcSamplePipelineStats();
  return chartGrid([['Phễu chuyển đổi', 'chart-sample-funnel', 'sm'], ['ROI mẫu', 'chart-sample-roi', 'sm'], ['Trạng thái', 'chart-sample-status', 'sm']], 3) +
    dsStatGrid([
      { label: 'Tổng gửi mẫu', value: stats.total, tone: 'info' },
      { label: 'Tỷ lệ chuyển đổi', value: stats.convPct + '%', tone: 'success' },
      { label: 'ROI trung bình', value: stats.avgRoi + 'x', tone: 'brand' },
      { label: 'Chưa có nội dung', value: stats.noContent.length, tone: 'danger' }
    ]);
}
