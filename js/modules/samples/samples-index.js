/* Samples — đăng ký tab module */

MODULE_DATA_TABS.samples = () => [
  { label: 'Tổng quan ROI', icon: 'layout-dashboard',
    meta: SAMPLES_TAB_META.roi_overview,
    content: () => renderSamplesTabRoiOverview() },
  { label: 'Luồng mẫu', icon: 'git-branch',
    meta: SAMPLES_TAB_META.pipeline,
    content: () => renderSamplesTabPipeline() },
  { label: 'Bảng mẫu', icon: 'table',
    count: ZZP_DATA.samples.length,
    meta: SAMPLES_TAB_META.table,
    content: () => renderSamplesTabTable() }
];
