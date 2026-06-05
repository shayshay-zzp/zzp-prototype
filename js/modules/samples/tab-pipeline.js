/* Samples — tab Pipeline mẫu */

function renderSamplesTabPipeline() {
  const stats = calcSamplePipelineStats();
  return renderSamplePipelineFlow(stats) + renderSamplePipelineKanban();
}
