/* Samples — tab Tổng quan ROI */

function renderSamplesTabRoiOverview() {
  const stats = calcSamplePipelineStats();
  return dsStatGrid([
    { label: 'Tổng gửi mẫu', value: stats.total, tone: 'info' },
    { label: 'Tỷ lệ chuyển đổi', value: stats.convPct + '%', hint: `${stats.converted.length}/${stats.total} có doanh thu`, tone: 'success' },
    { label: 'ROI trung bình', value: stats.avgRoi + 'x', hint: `${fmt(stats.totalRev)} / ${fmt(stats.totalCost)}`, tone: 'brand' },
    { label: 'Chưa có nội dung', value: stats.noContent.length, hint: 'Cần theo dõi hoặc cắt', tone: 'danger' }
  ]) + chartGrid([['Phễu chuyển đổi', 'chart-sample-funnel', 'sm'], ['ROI mẫu', 'chart-sample-roi', 'sm']], 2);
}
